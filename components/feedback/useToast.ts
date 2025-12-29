'use client';

import { useCallback, useSyncExternalStore } from 'react';

// ============================================================================
// Toast Types
// ============================================================================

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// ============================================================================
// Toast Store (Simple External Store)
// ============================================================================

type Listener = () => void;

let toasts: Toast[] = [];
let listeners: Set<Listener> = new Set();

function emitChange() {
  listeners.forEach(listener => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return toasts;
}

function addToast(toast: Omit<Toast, 'id'>) {
  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const newToast: Toast = {
    id,
    duration: 3000,
    ...toast,
  };

  toasts = [...toasts, newToast];
  emitChange();

  // Auto-remove after duration
  setTimeout(() => {
    removeToast(id);
  }, newToast.duration);

  return id;
}

function removeToast(id: string) {
  toasts = toasts.filter(t => t.id !== id);
  emitChange();
}

// ============================================================================
// Hook
// ============================================================================

export function useToast() {
  const currentToasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    return addToast({ message, type });
  }, []);

  const success = useCallback((message: string = 'Salvo') => {
    return addToast({ message, type: 'success' });
  }, []);

  const error = useCallback((message: string = 'Nao foi possivel salvar') => {
    return addToast({ message, type: 'error' });
  }, []);

  const dismiss = useCallback((id: string) => {
    removeToast(id);
  }, []);

  return {
    toasts: currentToasts,
    toast,
    success,
    error,
    dismiss,
  };
}

