'use client';
import { useState } from 'react';
import { Shield, Mail, Lock, User, Building, ArrowRight, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { CustomSelect } from '../components/CustomSelect';
import { useIsMobile } from '../utils/useIsMobile';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    plan: 'starter',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
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

      alert('Sign up successful! Redirecting to dashboard...');
      
      // Auto-login after registration
      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        localStorage.setItem('user', JSON.stringify(loginData.user));
        localStorage.setItem('token', loginData.token);
        const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001';
        window.location.href = `${dashboardUrl}/dashboard`;
      } else {
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <Shield size={32} color="#10b981" />
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>FrameSentinel</span>
        </Link>

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
              onChange={(value) => setFormData({ ...formData, plan: value })}
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
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)',
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
          padding: '24px',
          background: 'rgba(26, 31, 46, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <p style={{
            fontSize: '14px',
            color: '#9ca3af',
            fontStyle: 'italic',
            marginBottom: '12px',
          }}>
            "FrameSentinel helped us reduce fraud by 95% in the first month. The integration was seamless and the support team is outstanding."
          </p>
          <p style={{
            fontSize: '14px',
            color: '#e8eaed',
            fontWeight: '600',
          }}>
            Sarah Chen, CTO at TechCorp
          </p>
        </div>
      </div>
      )}
    </div>
  );
}
