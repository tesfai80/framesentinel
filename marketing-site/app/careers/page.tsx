'use client';
import { Shield, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
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

      <section style={{ marginTop: '80px', padding: '100px 40px', textAlign: 'center' }}>
        <Briefcase size={64} color="#10b981" style={{ margin: '0 auto 24px' }} />
        <h1 style={{
          fontSize: '56px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Join Our Team
        </h1>
        <p style={{ fontSize: '20px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto 48px' }}>
          Help us build the future of secure video verification
        </p>
        <Link href="/contact" style={{
          padding: '16px 40px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#e8eaed',
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '18px',
          display: 'inline-block',
        }}>
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
