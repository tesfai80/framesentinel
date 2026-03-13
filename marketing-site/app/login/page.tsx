'use client';
import { useState, useEffect } from 'react';
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from '../components/Toast';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user just logged in with OAuth
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        try {
          const email = session.user.email!;
          const fullName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || email.split('@')[0];
          
          // Try to login first
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
            // User doesn't exist, create tenant with free plan
            const tenantResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tenants/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                company_name: fullName + "'s Organization",
                admin_email: email,
                admin_password: session.user.id,
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
          
          // Encode user data and token for URL transfer
          const userEncoded = encodeURIComponent(JSON.stringify(userData));
          const tokenEncoded = encodeURIComponent(backendUser?.token || session.access_token);
          
          // Redirect to dashboard
          const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001';
          setTimeout(() => {
            window.location.href = `${dashboardUrl}/auth-callback?user=${userEncoded}&token=${tokenEncoded}`;
          }, 500);
        } catch (error) {
          console.error('OAuth login error:', error);
          toast.error('Failed to complete login. Please try again.');
        }
      }
    });
  }, []);

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
      toast.error(err.message || `${provider} login failed`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      // Encode user data and token for URL transfer
      const userEncoded = encodeURIComponent(JSON.stringify(data.user));
      const tokenEncoded = encodeURIComponent(data.token);
      
      toast.success('Login successful! Redirecting...');
      
      // Redirect to Admin Dashboard with auth data
      const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001';
      setTimeout(() => {
        window.location.href = `${dashboardUrl}/auth-callback?user=${userEncoded}&token=${tokenEncoded}`;
      }, 1000);
    } catch (err) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', justifyContent: 'center' }}>
          <Shield size={40} color="#10b981" />
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>FrameSentinel</span>
        </Link>

        <div style={{
          padding: '40px',
          background: 'rgba(26, 31, 46, 0.8)',
          borderRadius: '16px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px', color: '#e8eaed', textAlign: 'center' }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '32px', textAlign: 'center' }}>
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#fff',
                  color: '#1f2937',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  fontSize: '15px',
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
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
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
                  padding: '14px',
                  background: '#24292e',
                  color: '#fff',
                  border: '1px solid #24292e',
                  borderRadius: '10px',
                  fontSize: '15px',
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
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#24292e';
                  e.currentTarget.style.borderColor = '#24292e';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#374151' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>or continue with email</span>
              <div style={{ flex: 1, height: '1px', background: '#374151' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 48px',
                    background: '#2d3548',
                    border: '1px solid #374151',
                    borderRadius: '10px',
                    color: '#e8eaed',
                    fontSize: '16px',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 48px',
                    background: '#2d3548',
                    border: '1px solid #374151',
                    borderRadius: '10px',
                    color: '#e8eaed',
                    fontSize: '16px',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
                </button>
              </div>
            </div>

            <Link href="/forgot-password" style={{ fontSize: '14px', color: '#10b981', textAlign: 'right' }}>
              Forgot password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '16px',
                background: loading ? '#6b7280' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#e8eaed',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={20} />}
            </button>

            <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link href="/signup" style={{ color: '#10b981', fontWeight: '600' }}>
                Start free trial
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
