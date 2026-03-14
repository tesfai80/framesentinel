'use client';
import { Shield, ArrowRight, Eye, Cpu, Lock, Zap, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function VideoKYCFraudDetectionPage() {
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
            AI Video KYC Fraud Detection Platform
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '40px' }}>
            FrameSentinel is an AI platform for video KYC fraud detection. It detects deepfake identity attacks,
            replay attacks, face swaps, and video injection in real-time — all through a single API call.
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

      {/* Problem */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(239, 68, 68, 0.03)', borderTop: '1px solid rgba(239, 68, 68, 0.1)', borderBottom: '1px solid rgba(239, 68, 68, 0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
            <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px' }}>
              Why Video KYC Fraud Detection Matters
            </h2>
            <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8' }}>
              Video identity fraud detection is critical as attackers use AI to bypass traditional KYC systems.
              Deepfake KYC detection prevents synthetic identities from passing verification.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { stat: '300%', label: 'Increase in deepfake attacks on video KYC systems since 2023' },
              { stat: '$4.2B', label: 'Annual losses from video identity fraud in financial services' },
              { stat: '72%', label: 'Of traditional KYC systems fail to detect AI-generated video fraud' },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '32px', background: 'rgba(26, 31, 46, 0.8)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '36px' : '48px', fontWeight: 'bold', color: '#ef4444', marginBottom: '12px' }}>{item.stat}</div>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Modules */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px', textAlign: 'center' }}>
            How Video KYC Fraud Detection Works
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', textAlign: 'center', marginBottom: '48px' }}>
            FrameSentinel runs 5 AI detection modules in parallel for comprehensive video identity fraud detection
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { title: 'Deepfake KYC Detection', desc: 'AI neural networks analyze facial micro-expressions and skin texture to detect deepfake identity attacks in video KYC sessions.', icon: Eye },
              { title: 'Replay Attack Detection', desc: 'Identifies pre-recorded videos and screen recordings being used to bypass live video identity verification.', icon: Shield },
              { title: 'Face Swap Detection', desc: 'Detects real-time face replacement attacks during video KYC where attackers overlay a stolen identity.', icon: Lock },
              { title: 'Video Injection Detection', desc: 'Identifies virtual cameras and video stream injection tools that bypass the device camera in KYC flows.', icon: Cpu },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '32px', background: 'rgba(26, 31, 46, 0.6)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <item.icon size={36} color="#10b981" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '48px', textAlign: 'center' }}>
            Video KYC Fraud Detection Performance
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { value: '99.7%', label: 'Deepfake Detection Accuracy' },
              { value: '<2s', label: 'Processing Time' },
              { value: '5', label: 'Parallel Detection Modules' },
              { value: '15', label: 'Frames Analyzed Per Video' },
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
            Video KYC Fraud Detection FAQ
          </h2>
          {[
            { q: 'What is video KYC fraud detection?', a: 'Video KYC fraud detection is the process of using AI to analyze video identity verification sessions and detect manipulation attempts including deepfakes, replay attacks, face swaps, and video injection.' },
            { q: 'How does FrameSentinel detect video identity fraud?', a: 'FrameSentinel runs 5 parallel AI detection modules on every video: deepfake detection, replay attack detection, face swap detection, injection detection, and metadata integrity analysis. Results are returned in under 2 seconds.' },
            { q: 'What is deepfake KYC detection?', a: 'Deepfake KYC detection identifies AI-generated or manipulated faces in video identity verification sessions. FrameSentinel uses neural networks to analyze facial micro-expressions, skin texture, and temporal consistency to detect deepfake identity attacks.' },
            { q: 'How fast is video KYC fraud detection with FrameSentinel?', a: 'FrameSentinel processes video KYC fraud detection in under 2 seconds, analyzing up to 15 frames with all 5 detection modules running in parallel.' },
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
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px' }}>Start Detecting Video KYC Fraud Today</h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', marginBottom: '32px' }}>200 free video analyses per month. No credit card required.</p>
          <Link href="/signup" style={{ padding: '16px 48px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#e8eaed', borderRadius: '12px', fontWeight: '600', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
