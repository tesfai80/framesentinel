'use client';
import { useState, useEffect } from 'react';
import { Shield, Mail, Lock, User, Building, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { CustomSelect } from '../components/CustomSelect';
import { useIsMobile } from '../utils/useIsMobile';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from '../components/Toast';
import { supabase } from '../../lib/supabase';
import './signup.css';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    plan: 'free',
  });
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    // Check if user just signed up with OAuth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        toast.success('Sign up successful! Redirecting...');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
    });
  }, [router]);

  const handleOAuthSignup = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/signup`,
          scopes: provider === 'github' ? 'read:user user:email' : undefined,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || `${provider} signup failed`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('Submitting with plan:', formData.plan);
    
    try {
      // Create tenant with admin user
      const tenantResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tenants/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.company,
          admin_email: formData.email,
          admin_password: formData.password,
          plan: formData.plan,
        }),
      });

      if (!tenantResponse.ok) {
        const data = await tenantResponse.json();
        throw new Error(data.detail || 'Registration failed');
      }

      const tenantData = await tenantResponse.json();
      console.log('Tenant created:', tenantData);
      
      toast.success('Sign up successful! Redirecting to dashboard...');
      
      // Wait a bit before redirect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to login page instead of auto-login to avoid CORS
      router.push('/login');
      
    } catch (err: any) {
      console.error('Signup error:', err);
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      <div style={{
        flex: 1,
        padding: isMobile ? '40px 20px' : '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: isMobile ? '100%' : '600px',
        margin: '0 auto',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Shield size={32} color="#10b981" />
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>FrameSentinel</span>
        </Link>

        {/* Trust Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          padding: '16px 24px',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <p style={{ fontSize: '14px', color: '#10b981', fontWeight: '600', marginBottom: '6px' }}>
            Built by security engineers focused on stopping AI identity fraud.
          </p>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            Created by the team behind SaaSRX and GenDetect.
          </p>
        </div>

        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '12px',
          color: '#e8eaed',
        }}>
          Start your free trial
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#9ca3af',
          marginBottom: '32px',
        }}>
          No credit card required • 14-day free trial • Cancel anytime
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => handleOAuthSignup('google')}
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
              onClick={() => handleOAuthSignup('github')}
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
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#e8eaed',
            }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={20} color="#9ca3af" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
              }} />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                className="signup-input"
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#e8eaed',
            }}>
              Work Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} color="#9ca3af" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
              }} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="signup-input"
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#e8eaed',
            }}>
              Company Name
            </label>
            <div style={{ position: 'relative' }}>
              <Building size={20} color="#9ca3af" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
              }} />
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Inc."
                className="signup-input"
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#e8eaed',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} color="#9ca3af" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
              }} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="signup-input"
              />
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
              Must be at least 8 characters
            </p>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#e8eaed',
            }}>
              Select Plan
            </label>
            <CustomSelect
              value={formData.plan}
              onChange={(value) => {
                console.log('Plan changed to:', value);
                setFormData({ ...formData, plan: value });
              }}
              options={[
                { value: 'free', label: 'Free - $0/month' },
                { value: 'starter', label: 'Starter - $19/month' },
                { value: 'growth', label: 'Growth - $59/month' },
                { value: 'pro', label: 'Pro - $149/month' },
                { value: 'enterprise', label: 'Enterprise - Custom' },
              ]}
              placeholder="Select a plan"
            />
          </div>

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
              marginTop: '8px',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 16px rgba(16, 185, 129, 0.3)';
            }}
          >
            {loading ? 'Creating account...' : 'Start Free Trial'}
            {!loading && <ArrowRight size={20} />}
          </button>

          <p style={{
            fontSize: '14px',
            color: '#9ca3af',
            textAlign: 'center',
          }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#10b981', fontWeight: '600' }}>
              Sign in
            </Link>
          </p>
        </form>

        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          marginTop: '32px',
          textAlign: 'center',
        }}>
          By signing up, you agree to our{' '}
          <Link href="/terms" style={{ color: '#10b981' }}>Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" style={{ color: '#10b981' }}>Privacy Policy</Link>
        </p>
      </div>

      {!isMobile && (
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(10, 31, 15, 0.2) 100%)',
        padding: '80px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '32px',
          color: '#e8eaed',
        }}>
          Why FrameSentinel?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            {
              title: '99.7% Detection Accuracy',
              description: 'Industry-leading AI models trained on millions of videos',
            },
            {
              title: 'Real-time Processing',
              description: 'Get results in under 2 seconds with instant webhooks',
            },
            {
              title: 'Enterprise Security',
              description: 'SOC 2 compliant with end-to-end encryption',
            },
            {
              title: 'Easy Integration',
              description: 'Simple REST API with SDKs for all major languages',
            },
            {
              title: '24/7 Support',
              description: 'Dedicated support team ready to help you succeed',
            },
          ].map((benefit, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Check size={18} color="#10b981" />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#e8eaed',
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  lineHeight: '1.5',
                }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '48px',
          padding: '32px',
          background: 'rgba(26, 31, 46, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}>
          <p style={{
            fontSize: '15px',
            color: '#9ca3af',
            lineHeight: '1.6',
            marginBottom: '16px',
          }}>
            "FrameSentinel was created to solve the growing problem of AI fraud in identity verification."
          </p>
          <p style={{
            fontSize: '14px',
            color: '#10b981',
            fontWeight: '600',
          }}>
            Built by the team behind SaaSRX and GenDetect.
          </p>
        </div>

        {/* Security Badges */}
        <div style={{
          marginTop: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {[
            { icon: '🔒', text: 'SOC2 Ready' },
            { icon: '🛡️', text: 'GDPR Compliant' },
            { icon: '🔐', text: 'End-to-End Encryption' },
          ].map((badge, idx) => (
            <div key={idx} style={{
              padding: '12px',
              background: 'rgba(26, 31, 46, 0.6)',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{badge.icon}</div>
              <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600' }}>{badge.text}</p>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
    </>
  );
}
