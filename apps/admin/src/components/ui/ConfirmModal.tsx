'use client';

import React from 'react';
import { useConfirmModalStore } from '@/store/confirm-modal.store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertCircle, AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ConfirmModal() {
  const {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    variant,
    isLoading,
    onConfirm,
    onCancel,
    close,
    setLoading,
  } = useConfirmModalStore();

  const handleConfirm = async () => {
    if (!onConfirm) return;
    try {
      setLoading(true);
      await onConfirm();
      close();
    } catch (error) {
      console.error('Error in confirm action:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    close();
  };

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertCircle className="h-6 w-6 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="h-6 w-6 text-emerald-500" />;
      default:
        return <HelpCircle className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent size="sm" className="sm:max-w-[400px] gap-0">
        <div className="flex gap-4 p-1">
          {/* Status Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          
          <div className="flex-1 space-y-1.5 text-left">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-50">
                {title}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              {message}
            </DialogDescription>
          </div>
        </div>

        <DialogFooter className="mt-6 sm:space-x-2 border-t pt-4 flex flex-row-reverse justify-start">
          <Button
            variant={variant === 'danger' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            loading={isLoading}
            disabled={isLoading}
            className="flex-1 sm:flex-none min-w-[80px]"
          >
            {confirmText}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 sm:flex-none min-w-[80px]"
          >
            {cancelText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
