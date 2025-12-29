'use client';

import { useToast, type Toast, type ToastType } from './useToast';
import { cn } from '@/lib/utils';
import { Check, X, Info } from 'lucide-react';

function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case 'success':
      return <Check className="h-4 w-4" />;
    case 'error':
      return <X className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
}

function ToastItem({ toast }: { toast: Toast }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg transition-all',
        'animate-in slide-in-from-bottom-5 fade-in duration-200',
        toast.type === 'success' && 'bg-primary text-primary-foreground',
        toast.type === 'error' && 'bg-destructive text-destructive-foreground',
        toast.type === 'info' && 'bg-muted text-muted-foreground'
      )}
    >
      <ToastIcon type={toast.type} />
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}

