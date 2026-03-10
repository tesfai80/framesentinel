'use client';
import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
    }}>
      <div style={{
        background: '#161B22',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <AlertTriangle size={24} color="#ef4444" />
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#e8eaed' }}>{title}</h3>
        </div>
        
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
          {message}
        </p>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              background: '#111827',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#e8eaed',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#e8eaed',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

let confirmFn: ((title: string, message: string) => Promise<boolean>) | null = null;

export const confirm = (title: string, message: string): Promise<boolean> => {
  if (confirmFn) {
    return confirmFn(title, message);
  }
  return Promise.resolve(window.confirm(message));
};

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<{ title: string; message: string; resolve: (value: boolean) => void } | null>(null);

  useEffect(() => {
    confirmFn = (title: string, message: string) => {
      return new Promise<boolean>((resolve) => {
        setDialog({ title, message, resolve });
      });
    };
  }, []);

  const handleConfirm = () => {
    dialog?.resolve(true);
    setDialog(null);
  };

  const handleCancel = () => {
    dialog?.resolve(false);
    setDialog(null);
  };

  return (
    <>
      {children}
      <ConfirmDialog
        isOpen={!!dialog}
        title={dialog?.title || ''}
        message={dialog?.message || ''}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
