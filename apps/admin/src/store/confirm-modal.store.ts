import { create } from 'zustand';

interface ConfirmModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  variant: 'danger' | 'warning' | 'info' | 'success';
  isLoading: boolean;
  onConfirm: (() => void | Promise<void>) | null;
  onCancel: (() => void) | null;
  open: (options: ConfirmModalOptions) => void;
  close: () => void;
  setLoading: (loading: boolean) => void;
}

export const useConfirmModalStore = create<ConfirmModalState>((set) => ({
  isOpen: false,
  title: 'Are you sure?',
  message: 'This action cannot be undone.',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'info',
  isLoading: false,
  onConfirm: null,
  onCancel: null,
  open: (options) => set({
    isOpen: true,
    title: options.title,
    message: options.message,
    confirmText: options.confirmText || 'Confirm',
    cancelText: options.cancelText || 'Cancel',
    variant: options.variant || 'info',
    onConfirm: options.onConfirm,
    onCancel: options.onCancel || null,
    isLoading: false,
  }),
  close: () => set({
    isOpen: false,
    onConfirm: null,
    onCancel: null,
    isLoading: false,
  }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
