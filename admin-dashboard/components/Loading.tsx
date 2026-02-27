export function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div style={{
      display: 'inline-block',
      width: `${size}px`,
      height: `${size}px`,
      border: '3px solid rgba(16, 185, 129, 0.1)',
      borderTop: '3px solid #10b981',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  );
}

export function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    }}>
      <LoadingSpinner size={48} />
      <div style={{ color: '#9ca3af', fontSize: '14px' }}>{message}</div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
