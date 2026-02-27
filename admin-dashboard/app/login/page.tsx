'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FrameSentinelLogo } from '@/components/Logo';
import { theme } from '@/styles/theme';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.colors.background.primary,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />
      
      <div style={{
        background: theme.colors.background.secondary,
        padding: '40px',
        borderRadius: '16px',
        boxShadow: theme.shadows.xl,
        width: '420px',
        border: `1px solid ${theme.colors.border.default}`,
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
          <FrameSentinelLogo size={48} />
          <h1 style={{ fontSize: '28px', marginTop: '16px', color: theme.colors.text.primary }}>FrameSentinel</h1>
          <p style={{ color: theme.colors.text.tertiary, marginTop: '4px', fontSize: '12px', letterSpacing: '1px' }}>FRAUD COMMAND CENTER</p>
        </div>
        
        {error && (
          <div style={{
            padding: '12px 16px',
            marginBottom: '20px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${theme.colors.risk.high}`,
            borderRadius: '8px',
            fontSize: '14px',
            color: theme.colors.risk.high,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.colors.text.primary, fontSize: '14px' }}>
              <Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${theme.colors.border.default}`,
                borderRadius: '8px',
                fontSize: '14px',
                background: theme.colors.background.elevated,
                color: theme.colors.text.primary,
                transition: 'all 0.2s',
              }}
              placeholder="admin@example.com"
              required
              disabled={loading}
              onFocus={(e) => e.currentTarget.style.borderColor = theme.colors.accent.cyan}
              onBlur={(e) => e.currentTarget.style.borderColor = theme.colors.border.default}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.colors.text.primary, fontSize: '14px' }}>
              <Lock size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${theme.colors.border.default}`,
                borderRadius: '8px',
                fontSize: '14px',
                background: theme.colors.background.elevated,
                color: theme.colors.text.primary,
                transition: 'all 0.2s',
              }}
              placeholder="Enter password"
              required
              disabled={loading}
              onFocus={(e) => e.currentTarget.style.borderColor = theme.colors.accent.cyan}
              onBlur={(e) => e.currentTarget.style.borderColor = theme.colors.border.default}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? theme.colors.background.elevated : theme.gradients.primary,
              color: theme.colors.text.primary,
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: theme.shadows.md,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? 'Authenticating...' : 'Access System'}
          </button>
        </form>
      </div>
    </div>
  );
}
