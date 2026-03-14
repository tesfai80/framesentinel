'use client';
import { Shield, ArrowRight, Eye, Cpu, Lock, Zap, CheckCircle, Target } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function DeepfakeKYCDetectionPage() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}

      {/* Hero */}
      <section style={{
        marginTop: isMobile ? '60px' : '80px',
        padding: isMobile ? '60px 20px' : '100px 40px',
        textAlign: 'center',
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(16,185,129,0.15), transparent 40%)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: isMobile ? '32px' : '56px', fontWeight: 'bold', marginBottom: '24px', color: '#e8eaed', lineHeight: '1.2' }}>
            Detect Deepfake Attacks in KYC Verification
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '40px' }}>
            FrameSentinel provides AI-powered deepfake KYC detection that prevents identity verification fraud.
            Detect deepfake identity attacks, replay attacks, and face swaps with 99.7% accuracy in under 2 seconds.
          </p>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', justifyContent: 'center' }}>
            <Link href="/signup" style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#e8eaed', borderRadius: '12px', fontWeight: '600', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <Link href="/docs" style={{ padding: '16px 40px', background: 'rgba(45, 53, 72, 0.8)', color: '#e8eaed', borderRadius: '12px', fontWeight: '600', fontSize: '16px', border: '1px solid #374151' }}>
              View API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* What is Deepfake KYC Detection */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px' }}>
            What is Deepfake KYC Detection?
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '16px' }}>
            Deepfake KYC detection is the process of identifying AI-generated or manipulated video content during
            identity verification workflows. As deepfake technology becomes more accessible, identity verification
            fraud detection has become critical for any platform that uses video-based KYC.
          </p>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '16px' }}>
            Traditional KYC systems analyze a single frame and compare it to an ID document. This approach fails
            against modern deepfake identity attacks that can generate photorealistic synthetic faces in real-time.
          </p>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#10b981', lineHeight: '1.8', fontWeight: '600' }}>
            FrameSentinel solves this with AI identity fraud detection that analyzes up to 15 frames per video
            using 5 parallel detection modules — delivering results in under 2 seconds.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '48px', textAlign: 'center' }}>
            How Deepfake KYC Detection Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { title: 'Deepfake Detection', desc: 'Neural network analysis of facial micro-expressions, skin texture, and temporal consistency identifies AI-generated faces in KYC video sessions.', icon: Eye },
              { title: 'Replay Attack Prevention', desc: 'Detects pre-recorded videos and screen recordings being presented as live identity verification sessions.', icon: Shield },
              { title: 'Face Swap Detection', desc: 'Identifies real-time face replacement attacks where attackers overlay stolen identities during KYC verification.', icon: Lock },
              { title: 'Injection Detection', desc: 'Detects virtual camera software and video stream injection that bypass the device camera in identity verification flows.', icon: Cpu },
              { title: 'Metadata Integrity', desc: 'Analyzes video file metadata for signs of editing, tampering, or manipulation that indicate identity verification fraud.', icon: Target },
              { title: 'Risk Scoring', desc: 'Combines all detection results into a single authenticity score and risk level for automated identity verification fraud detection.', icon: Zap },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '28px', background: 'rgba(26, 31, 46, 0.6)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <item.icon size={32} color="#10b981" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '48px', textAlign: 'center' }}>
            Deepfake KYC Detection Performance
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { value: '99.7%', label: 'Deepfake Detection Accuracy' },
              { value: '<2s', label: 'Processing Time' },
              { value: '5', label: 'Detection Modules' },
              { value: '$0', label: 'Free Tier Available' },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '32px 20px', background: 'rgba(26, 31, 46, 0.6)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '32px' : '40px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>{item.value}</div>
                <p style={{ color: '#9ca3af', fontSize: '13px' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '40px', textAlign: 'center' }}>
            Deepfake KYC Detection FAQ
          </h2>
          {[
            { q: 'What is deepfake KYC detection?', a: 'Deepfake KYC detection is the process of identifying AI-generated or manipulated video during identity verification. It uses AI models to analyze facial features, temporal consistency, and video metadata to detect deepfake identity attacks.' },
            { q: 'Why is identity verification fraud detection important?', a: 'Identity verification fraud has increased 300% since 2023. Without AI identity fraud detection, platforms are vulnerable to deepfake attacks, synthetic identities, and replay attacks that bypass traditional KYC systems.' },
            { q: 'How accurate is FrameSentinel deepfake KYC detection?', a: 'FrameSentinel achieves 99.7% accuracy in deepfake KYC detection by running 5 parallel AI detection modules and analyzing up to 15 frames per video.' },
            { q: 'Can deepfake KYC detection work in real-time?', a: 'Yes. FrameSentinel processes deepfake KYC detection in under 2 seconds, making it suitable for real-time identity verification workflows via REST API.' },
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '24px', marginBottom: '16px', background: 'rgba(26, 31, 46, 0.6)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.q}</h3>
              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)', borderTop: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px' }}>Start Deepfake KYC Detection Today</h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', marginBottom: '32px' }}>200 free video analyses per month. No credit card required.</p>
          <Link href="/signup" style={{ padding: '16px 48px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#e8eaed', borderRadius: '12px', fontWeight: '600', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
