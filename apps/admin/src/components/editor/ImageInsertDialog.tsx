'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Upload, Link as LinkIcon, X, Image as ImageIcon, Columns2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/constants';

interface ImageEntry {
  src: string;
  alt: string;
}

interface ImageInsertDialogProps {
  open: boolean;
  onClose: () => void;
  onInsert: (images: ImageEntry[], layout: 'single' | 'duo') => void;
}

type Tab = 'upload' | 'url';
type Layout = 'single' | 'duo';

export function ImageInsertDialog({ open, onClose, onInsert }: ImageInsertDialogProps) {
  const [tab, setTab] = useState<Tab>('upload');
  const [layout, setLayout] = useState<Layout>('single');

  // Upload tab state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // URL tab state
  const [urlEntries, setUrlEntries] = useState<ImageEntry[]>([{ src: '', alt: '' }]);

  // Shared alt for upload mode
  const [uploadAlt, setUploadAlt] = useState('');

  const maxImages = layout === 'duo' ? 2 : 1;

  const onDrop = useCallback((accepted: File[]) => {
    const remaining = maxImages - uploadedFiles.length;
    const toAdd = accepted.slice(0, remaining);
    if (toAdd.length < accepted.length) {
      toast.error(`Max ${maxImages} image${maxImages > 1 ? 's' : ''} for this layout.`);
    }
    const newPreviews = toAdd.map(f => URL.createObjectURL(f));
    setUploadedFiles(p => [...p, ...toAdd]);
    setPreviews(p => [...p, ...newPreviews]);
  }, [uploadedFiles, maxImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    multiple: maxImages > 1,
    maxSize: 10 * 1024 * 1024,
    disabled: uploadedFiles.length >= maxImages,
  });

  const removeFile = (i: number) => {
    setUploadedFiles(p => p.filter((_, j) => j !== i));
    setPreviews(p => {
      URL.revokeObjectURL(p[i]!);
      return p.filter((_, j) => j !== i);
    });
  };

  const handleLayoutChange = (l: Layout) => {
    setLayout(l);
    // Reset state if switching to single and had 2 files
    if (l === 'single') {
      if (uploadedFiles.length > 1) {
        URL.revokeObjectURL(previews[1]!);
        setUploadedFiles(p => [p[0]!]);
        setPreviews(p => [p[0]!]);
      }
      if (urlEntries.length > 1) setUrlEntries(p => [p[0]!]);
    }
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      uploadedFiles.forEach(f => formData.append('files', f));
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API_URL}/media/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      if (data.success && data.data) {
        const urls: string[] = Array.isArray(data.data) ? data.data.map((f: any) => f.url) : [data.data.url];
        const images: ImageEntry[] = urls.map((src, i) => ({ src, alt: uploadAlt || `Image ${i + 1}` }));
        toast.success(`${images.length} image${images.length > 1 ? 's' : ''} uploaded`);
        onInsert(images, layout);
        handleClose();
      }
    } catch {
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInsertUrl = () => {
    const valid = urlEntries.filter(e => e.src.trim());
    if (valid.length === 0) { toast.error('Please enter at least one image URL'); return; }
    onInsert(valid, layout);
    handleClose();
  };

  const handleClose = () => {
    setUploadedFiles([]);
    setPreviews([]);
    setUploadAlt('');
    setUrlEntries([{ src: '', alt: '' }]);
    setLayout('single');
    setTab('upload');
    onClose();
  };

  const addUrlEntry = () => {
    if (urlEntries.length >= maxImages) return;
    setUrlEntries(p => [...p, { src: '', alt: '' }]);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Insert Image
          </DialogTitle>
          <DialogDescription>
            Upload images or insert from URL. Choose single or side-by-side layout.
          </DialogDescription>
        </DialogHeader>

        {/* Layout picker */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleLayoutChange('single')}
            className={cn(
              'flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm font-medium',
              layout === 'single'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border text-muted-foreground hover:border-muted-foreground'
            )}
          >
            <div className="w-16 h-10 bg-current/20 rounded flex items-center justify-center">
              <ImageIcon className="h-5 w-5" />
            </div>
            Single Image
          </button>
          <button
            type="button"
            onClick={() => handleLayoutChange('duo')}
            className={cn(
              'flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm font-medium',
              layout === 'duo'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border text-muted-foreground hover:border-muted-foreground'
            )}
          >
            <div className="w-16 h-10 flex gap-1 items-center justify-center">
              <div className="flex-1 h-8 bg-current/20 rounded" />
              <div className="flex-1 h-8 bg-current/20 rounded" />
            </div>
            Side-by-Side (2)
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b">
          {(['upload', 'url'] as Tab[]).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize',
                tab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'upload' ? <Upload className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
              {t === 'upload' ? 'Upload' : 'From URL'}
            </button>
          ))}
        </div>

        {/* Upload tab */}
        {tab === 'upload' && (
          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={cn(
                'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
                isDragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border hover:border-primary/50 hover:bg-muted/30',
                uploadedFiles.length >= maxImages && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">
                  {isDragActive ? 'Drop here!' : `Drag & drop ${layout === 'duo' ? 'up to 2 images' : 'an image'} here`}
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WebP — up to 10MB each</p>
                {uploadedFiles.length >= maxImages && (
                  <p className="text-xs text-amber-600 font-medium">Max images selected</p>
                )}
              </div>
            </div>

            {/* Previews */}
            {previews.length > 0 && (
              <div className={cn('grid gap-3', layout === 'duo' && previews.length > 1 ? 'grid-cols-2' : 'grid-cols-1')}>
                {previews.map((src, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border bg-muted/30">
                    <img src={src} alt="" className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="p-1.5 bg-destructive text-white rounded-full hover:bg-destructive/80 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1">
                      {uploadedFiles[i]?.name}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Input
              label="Alt text (optional)"
              placeholder="Describe the image(s) for accessibility"
              value={uploadAlt}
              onChange={e => setUploadAlt(e.target.value)}
            />
          </div>
        )}

        {/* URL tab */}
        {tab === 'url' && (
          <div className="space-y-4">
            {urlEntries.map((entry, i) => (
              <div key={i} className="space-y-2 p-3 border rounded-lg bg-muted/20">
                <p className="text-xs font-medium text-muted-foreground">
                  {layout === 'duo' ? `Image ${i + 1}` : 'Image URL'}
                </p>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={entry.src}
                  onChange={e => setUrlEntries(p => p.map((x, j) => j === i ? { ...x, src: e.target.value } : x))}
                />
                <Input
                  placeholder="Alt text (optional)"
                  value={entry.alt}
                  onChange={e => setUrlEntries(p => p.map((x, j) => j === i ? { ...x, alt: e.target.value } : x))}
                />
                {entry.src && (
                  <img
                    src={entry.src}
                    alt=""
                    className="w-full h-32 object-cover rounded-md border"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
              </div>
            ))}
            {layout === 'duo' && urlEntries.length < 2 && (
              <button
                type="button"
                onClick={addUrlEntry}
                className="w-full py-2 text-sm border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                + Add second image
              </button>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          {tab === 'upload' ? (
            <Button
              onClick={handleUpload}
              disabled={uploadedFiles.length === 0}
              loading={isUploading}
              leftIcon={<Upload className="h-4 w-4" />}
            >
              Upload & Insert
            </Button>
          ) : (
            <Button
              onClick={handleInsertUrl}
              disabled={urlEntries.every(e => !e.src.trim())}
              leftIcon={<ImageIcon className="h-4 w-4" />}
            >
              Insert Image{layout === 'duo' ? 's' : ''}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
