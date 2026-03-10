'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
let addToastFn: ((message: string, type: ToastType) => void) | null = null;

export const toast = {
  success: (message: string) => addToastFn?.(message, 'success'),
  error: (message: string) => addToastFn?.(message, 'error'),
  warning: (message: string) => addToastFn?.(message, 'warning'),
  info: (message: string) => addToastFn?.(message, 'info'),
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (message: string, type: ToastType) => {
      const id = toastId++;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'error': return <XCircle size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'info': return <Info size={20} />;
    }
  };

  const getColors = (type: ToastType) => {
    switch (type) {
      case 'success': return { bg: 'rgba(16, 185, 129, 0.1)', border: '#10b981', text: '#10b981' };
      case 'error': return { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#ef4444' };
      case 'warning': return { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', text: '#f59e0b' };
      case 'info': return { bg: 'rgba(6, 182, 212, 0.1)', border: '#06b6d4', text: '#06b6d4' };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {toasts.map((toast) => {
        const colors = getColors(toast.type);
        return (
          <div
            key={toast.id}
            style={{
              background: colors.bg,
              border: `2px solid ${colors.border}`,
              color: colors.text,
              padding: '16px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: '300px',
              maxWidth: '500px',
              animation: 'slideIn 0.3s ease-out',
            }}
          >
            {getIcon(toast.type)}
            <span style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={16} color={colors.text} />
            </button>
          </div>
        );
      })}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
