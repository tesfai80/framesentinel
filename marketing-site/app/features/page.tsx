'use client';
import { Shield, Zap, Lock, CheckCircle, BarChart3, Globe, Eye, FileCheck, Activity } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
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
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/#features" style={{ color: '#10b981', fontSize: '16px', fontWeight: '600' }}>Features</Link>
            <Link href="/pricing" style={{ color: '#e8eaed', fontSize: '16px' }}>Pricing</Link>
            <Link href="/docs" style={{ color: '#e8eaed', fontSize: '16px' }}>Docs</Link>
            <Link href="/login" style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#e8eaed',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
            }}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <section style={{ marginTop: '80px', padding: '80px 40px 60px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Comprehensive Fraud Detection
        </h1>
        <p style={{ fontSize: '20px', color: '#9ca3af', maxWidth: '800px', margin: '0 auto' }}>
          5 AI-powered detection modules working together to protect your KYC process
        </p>
      </section>

      <section style={{ padding: '40px 40px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {[
            { icon: Shield, title: 'Deepfake Detection', description: 'Advanced neural networks detect AI-generated faces and synthetic media with 99.7% accuracy' },
            { icon: Zap, title: 'Replay Attack Prevention', description: 'Identify screen recordings and pre-recorded videos attempting to bypass live verification' },
            { icon: Lock, title: 'Face Swap Detection', description: 'Real-time detection of face replacement and identity swap attacks' },
            { icon: CheckCircle, title: 'Injection Detection', description: 'Detect video stream manipulation and injection attacks at the source' },
            { icon: BarChart3, title: 'Metadata Integrity', description: 'Verify file authenticity through comprehensive metadata analysis' },
            { icon: Globe, title: 'Real-time Processing', description: 'Sub-2-second analysis with instant webhook notifications' },
            { icon: Eye, title: 'Liveness Detection', description: 'Ensure the person is physically present during verification' },
            { icon: FileCheck, title: 'Document Verification', description: 'Cross-reference video with ID documents for complete verification' },
            { icon: Activity, title: 'Risk Scoring', description: 'Comprehensive risk assessment with detailed fraud indicators' },
          ].map((feature, idx) => (
            <div key={idx} style={{
              padding: '32px',
              background: 'rgba(26, 31, 46, 0.6)',
              borderRadius: '16px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              transition: 'all 0.3s',
            }}>
              <feature.icon size={40} color="#10b981" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#e8eaed' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
