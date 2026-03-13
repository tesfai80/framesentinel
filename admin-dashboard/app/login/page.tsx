'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FrameSentinelLogo } from '@/components/Logo';
import { theme } from '@/styles/theme';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user just logged in with OAuth
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        try {
          // Check if user exists in backend, if not create tenant
          const email = session.user.email!;
          const fullName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || email.split('@')[0];
          
          // Try to login first to see if user exists
          let backendUser;
          try {
            const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/oauth-login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                email,
                provider: session.user.app_metadata.provider,
                provider_id: session.user.id,
              }),
            });
            
            if (loginResponse.ok) {
              backendUser = await loginResponse.json();
            }
          } catch (err) {
            // User doesn't exist, create tenant
            const tenantResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tenants/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                company_name: fullName + "'s Organization",
                admin_email: email,
                admin_password: session.user.id, // Use OAuth ID as password
                plan: 'free',
              }),
            });
            
            if (tenantResponse.ok) {
              backendUser = await tenantResponse.json();
            }
          }
          
          // Store user data
          const userData = backendUser?.user || {
            email,
            username: fullName,
            tenant: backendUser?.tenant || 'default',
            role: 'admin',
            id: session.user.id,
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('token', backendUser?.token || session.access_token);
          router.push('/dashboard');
        } catch (error) {
          console.error('OAuth login error:', error);
          setError('Failed to complete login. Please try again.');
        }
      }
    });
  }, [router]);

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/login`,
          scopes: provider === 'github' ? 'read:user user:email' : undefined,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || `${provider} login failed`);
    }
  };

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
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              style={{
                flex: 1,
                padding: '12px',
                background: '#fff',
                color: '#1f2937',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.borderColor = theme.colors.accent.cyan;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuthLogin('github')}
              style={{
                flex: 1,
                padding: '12px',
                background: '#24292e',
                color: '#fff',
                border: '1px solid #24292e',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2f363d';
                e.currentTarget.style.borderColor = theme.colors.accent.cyan;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#24292e';
                e.currentTarget.style.borderColor = '#24292e';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: theme.colors.border.default }} />
            <span style={{ fontSize: '12px', color: theme.colors.text.tertiary }}>or use email</span>
            <div style={{ flex: 1, height: '1px', background: theme.colors.border.default }} />
          </div>
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
