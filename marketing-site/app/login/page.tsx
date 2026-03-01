'use client';
import { useState } from 'react';
import { Shield, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      // Redirect to Admin Dashboard after successful login
      window.location.href = 'http://localhost:3001/dashboard';
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
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

          {error && (
            <div style={{
              padding: '12px 16px',
              marginBottom: '20px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
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
  );
}
