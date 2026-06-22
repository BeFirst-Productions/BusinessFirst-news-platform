'use client';

import React, { useState } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  RotateCcw, 
  X, 
  ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastBaseProps {
  t: Toast;
  icon: React.ReactNode;
  iconBgClass: string;
  borderColorClass: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

function ToastBase({
  t,
  icon,
  iconBgClass,
  borderColorClass,
  title,
  description,
  actions,
}: ToastBaseProps) {
  return (
    <div
      className={cn(
        'max-w-md w-full bg-white dark:bg-slate-900 shadow-xl rounded-xl pointer-events-auto flex border border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-all duration-300',
        borderColorClass,
        t.visible ? 'animate-fade-in translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      )}
      style={{ borderLeftWidth: '5px' }}
    >
      <div className="flex-1 p-4">
        <div className="flex items-start">
          {/* Status Icon Indicator */}
          <div className={cn('flex-shrink-0 p-1.5 rounded-lg text-white', iconBgClass)}>
            {icon}
          </div>
          
          {/* Content Block */}
          <div className="ml-3 flex-1 pt-0.5">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {title}
            </p>
            {description && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-normal">
                {description}
              </p>
            )}
            
            {/* Action buttons area */}
            {actions && <div className="mt-3 flex items-center gap-2">{actions}</div>}
          </div>
        </div>
      </div>
      
      {/* Dismiss Button */}
      <div className="flex border-l border-slate-100 dark:border-slate-800">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Custom Error Toast Component with optional details expander
interface ErrorToastProps {
  t: Toast;
  title: string;
  description?: string;
  details?: string;
  onRetry?: () => void;
}

function ErrorToast({ t, title, description, details, onRetry }: ErrorToastProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ToastBase
      t={t}
      title={title}
      description={description}
      icon={<AlertCircle className="h-5 w-5" />}
      iconBgClass="bg-rose-500"
      borderColorClass="border-l-rose-500"
      actions={
        (onRetry || details) && (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
              {onRetry && (
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    onRetry();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retry Action
                </button>
              )}
              {details && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors py-1.5 px-2"
                >
                  {showDetails ? 'Hide Error Details' : 'View Error Details'}
                </button>
              )}
            </div>
            {showDetails && details && (
              <pre className="text-[10px] font-mono p-2 bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-600 dark:text-slate-400 max-h-[100px] overflow-y-auto w-full whitespace-pre-wrap select-all">
                {details}
              </pre>
            )}
          </div>
        )
      }
    />
  );
}

export const showToast = {
  /**
   * Triggers a styled Success Toast notification
   */
  success: (title: string, description?: string) => {
    toast.custom(
      (t) => (
        <ToastBase
          t={t}
          title={title}
          description={description}
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconBgClass="bg-emerald-500"
          borderColorClass="border-l-emerald-500"
        />
      ),
      { id: title } // Avoid duplicate toast for same message
    );
  },

  /**
   * Triggers a styled Error Toast notification with optional details expander and retry handler
   */
  error: (
    title: string,
    description?: string,
    options?: { details?: string; onRetry?: () => void }
  ) => {
    toast.custom((t) => (
      <ErrorToast
        t={t}
        title={title}
        description={description}
        details={options?.details}
        onRetry={options?.onRetry}
      />
    ));
  },

  /**
   * Triggers an interactive Action Toast (with custom action callback)
   */
  action: (
    title: string,
    actionLabel: string,
    onAction: () => void,
    description?: string
  ) => {
    toast.custom((t) => (
      <ToastBase
        t={t}
        title={title}
        description={description}
        icon={<Info className="h-5 w-5" />}
        iconBgClass="bg-blue-500"
        borderColorClass="border-l-blue-500"
        actions={
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onAction();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        }
      />
    ));
  },

  /**
   * Triggers an Interactive Undo deletion style toast
   */
  undo: (title: string, onUndo: () => void, description?: string) => {
    toast.custom((t) => (
      <ToastBase
        t={t}
        title={title}
        description={description}
        icon={<RotateCcw className="h-5 w-5" />}
        iconBgClass="bg-amber-500"
        borderColorClass="border-l-amber-500"
        actions={
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onUndo();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5 animate-spin-once" />
            Undo Action
          </button>
        }
      />
    ));
  },

  /**
   * Triggers an Info/Warning Banner toast
   */
  warning: (title: string, description?: string) => {
    toast.custom((t) => (
      <ToastBase
        t={t}
        title={title}
        description={description}
        icon={<AlertTriangle className="h-5 w-5" />}
        iconBgClass="bg-amber-500 animate-pulse"
        borderColorClass="border-l-amber-500"
      />
    ));
  },
};
