'use client';
import { Shield, Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DemoPage() {
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
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            See FrameSentinel in Action
          </h1>
          <p style={{ fontSize: '20px', color: '#9ca3af', marginBottom: '48px' }}>
            Watch how our AI detects fraud in real-time
          </p>

          <div style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            aspectRatio: '16/9',
            background: 'rgba(26, 31, 46, 0.8)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '48px',
          }}>
            <Play size={80} color="#10b981" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '60px' }}>
            {[
              'Real-time fraud detection',
              '99.7% accuracy rate',
              'Sub-2-second processing',
            ].map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                <CheckCircle size={20} color="#10b981" />
                <span style={{ color: '#e8eaed', fontSize: '16px' }}>{feature}</span>
              </div>
            ))}
          </div>

          <Link href="/signup" style={{
            marginTop: '48px',
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#e8eaed',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '18px',
            display: 'inline-block',
          }}>
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
