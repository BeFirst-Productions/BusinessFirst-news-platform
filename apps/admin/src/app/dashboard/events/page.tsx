'use client';

import React, { useState, useRef } from 'react';
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
import { Plus, Edit, Trash2, Calendar, GripVertical, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePermission } from '@/hooks/usePermission';
import { useConfirmModalStore } from '@/store/confirm-modal.store';
import imageCompression from 'browser-image-compression';

export default function EventsPage() {
  const queryClient = useQueryClient();
  const { hasPermission } = usePermission();
  const confirmModal = useConfirmModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: string;
    compressedSize: string;
    savings: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    badge: '',
    image: '',
    linkUrl: '',
    linkText: '',
    isActive: true,
  });

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await apiClient.get('/events');
      return response.data.data;
    },
  });

  const createEvent = useMutation({
    mutationFn: (data: any) => apiClient.post('/events', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created');
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to create event';
      toast.error(msg);
    },
  });

  const updateEvent = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.put(`/events/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event updated');
      setEditingEvent(null);
      resetForm();
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to update event';
      toast.error(msg);
    },
  });

  const deleteEvent = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted');
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to delete event';
      toast.error(msg);
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      badge: '',
      image: '',
      linkUrl: '',
      linkText: '',
      isActive: true,
    });
    setCompressionStats(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setCompressionStats(null);
    try {
      const originalSize = (file.size / 1024 / 1024).toFixed(2);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      
      let uploadFile = file;
      try {
        const compressedFile = await imageCompression(file, options);
        const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2);
        const savings = (((file.size - compressedFile.size) / file.size) * 100).toFixed(0);
        
        setCompressionStats({
          originalSize: `${originalSize} MB`,
          compressedSize: `${compressedSize} MB`,
          savings: `${savings}%`
        });
        uploadFile = compressedFile;
      } catch (err) {
        console.error('Error compressing image:', err);
        toast.error('Failed to compress image, uploading original');
      }

      const uploadFormData = new FormData();
      uploadFormData.append('files', uploadFile);

      // Using the same endpoint used in articles for custom file naming. 
      // If no customName is provided, it handles it safely or we can use the title.
      const customName = formData.title ? `event-${formData.title.trim()}` : `event-image`;
      const response = await apiClient.post(`/media/upload?customName=${encodeURIComponent(customName)}`, uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.data?.[0]?.url) {
        setFormData({ ...formData, image: response.data.data[0].url });
        toast.success('Image uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = () => {
    if (editingEvent) {
      updateEvent.mutate({ id: editingEvent.id, data: formData });
    } else {
      createEvent.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Events Coverage</h1>
          <p className="text-muted-foreground mt-1">Manage event coverage banners</p>
        </div>
        {hasPermission('EVENTS', 'create') && (
          <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto" leftIcon={<Plus className="h-4 w-4" />}>
            Add Event
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {events?.map((event: any, index: number) => (
          <Card key={event.id}>
            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 sm:px-6">
              <div className="flex items-start gap-3 w-full">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move mt-1 flex-shrink-0" />
                <div className="flex items-center justify-center bg-muted text-muted-foreground rounded-md w-7 h-7 font-mono text-xs font-bold flex-shrink-0 select-none border">
                  {index + 1}
                </div>
                {event.image && (
                  <img src={event.image} alt={event.title} className="w-16 h-12 object-cover rounded" />
                )}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                    <h3 className="font-semibold truncate max-w-md">{event.title}</h3>
                    {!event.isActive && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Redirect to: {event.linkUrl}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                {hasPermission('EVENTS', 'edit') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingEvent(event);
                      setFormData({
                        title: event.title,
                        badge: event.badge || '',
                        image: event.image || '',
                        linkUrl: event.linkUrl || '',
                        linkText: event.linkText || '',
                        isActive: event.isActive,
                      });
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {hasPermission('EVENTS', 'delete') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      confirmModal.open({
                        title: 'Delete Event',
                        message: 'Are you sure you want to delete this event coverage item?',
                        confirmText: 'Delete',
                        variant: 'danger',
                        onConfirm: async () => {
                          deleteEvent.mutate(event.id);
                        },
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {events?.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-lg bg-card text-muted-foreground">
            No events found. Create one to display on the website!
          </div>
        )}
      </div>

      <Dialog
        open={isCreateOpen || !!editingEvent}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingEvent(null);
            resetForm();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Image</label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image: '' });
                        setCompressionStats(null);
                      }}
                      className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{isUploadingImage ? 'Uploading...' : 'Click to upload image'}</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploadingImage}
                    />
                  </label>
                )}
              </div>
              {compressionStats && (
                <div className="mt-4 p-3 bg-muted/50 rounded-md flex justify-between items-center text-sm border">
                  <span className="text-muted-foreground">Original: <span className="font-semibold text-foreground">{compressionStats.originalSize}</span></span>
                  <span className="text-muted-foreground">Compressed: <span className="font-semibold text-green-600">{compressionStats.compressedSize}</span></span>
                  <span className="text-muted-foreground">Saved: <span className="font-semibold text-blue-600">{compressionStats.savings}</span></span>
                </div>
              )}
            </div>

            <Input
              label="Redirect Link"
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              placeholder="e.g. /news?category=Events"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <label htmlFor="isActive" className="text-sm font-medium">Active (Visible on website)</label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setEditingEvent(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={createEvent.isPending || updateEvent.isPending}
            >
              {editingEvent ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
