'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Modal';
import { Plus, Edit, Trash2, FolderTree, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePermission } from '@/hooks/usePermission';

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const { hasPermission } = usePermission();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentId: '',
  });

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('/categories');
      return response.data.data;
    },
  });

  const createCategory = useMutation({
    mutationFn: (data: any) => apiClient.post('/categories', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created');
      setIsCreateOpen(false);
      resetForm();
    },
    onError: () => toast.error('Failed to create category'),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.put(`/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated');
      setEditingCategory(null);
      resetForm();
    },
    onError: () => toast.error('Failed to update category'),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted');
    },
    onError: () => toast.error('Failed to delete category'),
  });

  const resetForm = () => {
    setFormData({ name: '', description: '', parentId: '' });
  };

  const handleSubmit = () => {
    if (editingCategory) {
      updateCategory.mutate({ id: editingCategory.id, data: formData });
    } else {
      createCategory.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-1">Manage article categories</p>
        </div>
        {hasPermission('CATEGORIES', 'create') && (
          <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto" leftIcon={<Plus className="h-4 w-4" />}>
            Add Category
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {categories?.map((category: any) => (
          <Card key={category.id}>
            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 sm:px-6">
              <div className="flex items-start gap-3 w-full">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move mt-1 flex-shrink-0" />
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <FolderTree className="h-5 w-5 text-primary flex-shrink-0" />
                    <h3 className="font-semibold truncate">{category.name}</h3>
                    <Badge variant="outline" className="text-xs truncate max-w-[120px]">{category.slug}</Badge>
                    {!category.isActive && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                  {category.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {category._count?.articles || 0} articles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                {hasPermission('CATEGORIES', 'edit') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingCategory(category);
                      setFormData({
                        name: category.name,
                        description: category.description || '',
                        parentId: category.parentId || '',
                      });
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {hasPermission('CATEGORIES', 'delete') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm('Delete this category?')) {
                        deleteCategory.mutate(category.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={isCreateOpen || !!editingCategory}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingCategory(null);
            resetForm();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Edit Category' : 'Create Category'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              label="Category Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name"
            />
            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Category description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setEditingCategory(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={createCategory.isPending || updateCategory.isPending}
            >
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}