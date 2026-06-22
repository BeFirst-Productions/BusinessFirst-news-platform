'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Modal';
import { Plus, Edit, Trash2, Tag, Tags, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePermission } from '@/hooks/usePermission';
import { useConfirmModalStore } from '@/store/confirm-modal.store';

export default function TagsPage() {
  const queryClient = useQueryClient();
  const { hasPermission } = usePermission();
  const confirmModal = useConfirmModalStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await apiClient.get('/tags');
      return response.data.data;
    },
  });

  const createTag = useMutation({
    mutationFn: (data: any) => apiClient.post('/tags', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Tag created');
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create tag';
      toast.error(message);
    },
  });

  const updateTag = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.put(`/tags/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Tag updated');
      setEditingTag(null);
      resetForm();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update tag';
      toast.error(message);
    },
  });

  const deleteTag = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/tags/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Tag deleted');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete tag';
      toast.error(message);
    },
  });

  const resetForm = () => {
    setFormData({ name: '', description: '' });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error('Tag name is required');
      return;
    }
    if (editingTag) {
      updateTag.mutate({ id: editingTag.id, data: formData });
    } else {
      createTag.mutate(formData);
    }
  };

  const filteredTags = tags?.filter((tag: any) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tag.description && tag.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tags</h1>
          <p className="text-muted-foreground mt-1">Manage article tags for categorization</p>
        </div>
        {hasPermission('TAGS', 'create') && (
          <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto" leftIcon={<Plus className="h-4 w-4" />}>
            Add Tag
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 max-w-md bg-card rounded-lg border px-3 py-1.5 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none text-sm outline-none placeholder:text-muted-foreground text-foreground"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTags?.map((tag: any) => (
            <Card key={tag.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Tag className="h-4 w-4 text-primary flex-shrink-0" />
                      <h3 className="font-semibold truncate text-foreground">{tag.name}</h3>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono max-w-[100px] truncate flex-shrink-0">
                      {tag.slug}
                    </Badge>
                  </div>
                  {tag.description ? (
                    <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">{tag.description}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground/40 italic min-h-[32px]">No description provided</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                  <span className="text-xs text-muted-foreground font-medium">
                    {tag._count?.articles || 0} articles
                  </span>
                  <div className="flex items-center gap-1">
                    {hasPermission('TAGS', 'edit') && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setEditingTag(tag);
                          setFormData({
                            name: tag.name,
                            description: tag.description || '',
                          });
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {hasPermission('TAGS', 'delete') && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          confirmModal.open({
                            title: 'Delete Tag',
                            message: `Are you sure you want to delete the tag "${tag.name}"? This action will remove it from all associated articles and cannot be undone.`,
                            confirmText: 'Delete',
                            variant: 'danger',
                            onConfirm: async () => {
                              await deleteTag.mutateAsync(tag.id);
                            },
                          });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredTags?.length === 0 && (
            <div className="col-span-full text-center py-12 bg-card rounded-lg border border-dashed">
              <Tags className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">No tags found</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try searching for something else or create a new tag.</p>
            </div>
          )}
        </div>
      )}

      <Dialog
        open={isCreateOpen || !!editingTag}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingTag(null);
            resetForm();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTag ? 'Edit Tag' : 'Create Tag'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              label="Tag Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Artificial Intelligence"
              required
            />
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Description</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of the tag"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setEditingTag(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={createTag.isPending || updateTag.isPending}
            >
              {editingTag ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
