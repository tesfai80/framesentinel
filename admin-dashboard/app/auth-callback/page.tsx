'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const user = searchParams.get('user');
    const token = searchParams.get('token');

    if (user && token) {
      try {
        const userDecoded = decodeURIComponent(user);
        const tokenDecoded = decodeURIComponent(token);
        
        localStorage.setItem('user', userDecoded);
        localStorage.setItem('token', tokenDecoded);
        
        router.push('/dashboard');
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router, searchParams]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f1419',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(16, 185, 129, 0.2)',
          borderTopColor: '#10b981',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px',
        }} />
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>Completing authentication...</p>
      </div>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f1419',
      }}>
        <div style={{ color: '#9ca3af' }}>Loading...</div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
