'use client';
import { Shield, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(15, 20, 25, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
        zIndex: 1000,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={32} color="#10b981" />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>FrameSentinel</span>
          </Link>
        </div>
      </nav>

      <section style={{ marginTop: '80px', padding: '80px 40px', textAlign: 'center' }}>
        <Lock size={64} color="#10b981" style={{ margin: '0 auto 24px' }} />
        <h1 style={{
          fontSize: '56px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Enterprise Security
        </h1>
        <p style={{ fontSize: '20px', color: '#9ca3af', maxWidth: '800px', margin: '0 auto' }}>
          Your data security is our top priority
        </p>
      </section>

      <section style={{ padding: '40px 40px 100px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
          {[
            'SOC 2 Type II Certified',
            'End-to-end encryption',
            'GDPR compliant',
            'Regular security audits',
            'Data isolation',
            '99.99% uptime SLA',
          ].map((feature, idx) => (
            <div key={idx} style={{
              padding: '24px',
              background: 'rgba(26, 31, 46, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <CheckCircle size={24} color="#10b981" />
              <span style={{ color: '#e8eaed', fontSize: '18px', fontWeight: '600' }}>{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
