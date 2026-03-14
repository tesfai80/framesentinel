'use client';
import { Shield, ArrowRight, Eye, Cpu, Lock, Zap, Target, CheckCircle, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function WhatIsFrameSentinelPage() {
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
          <h1 style={{
            fontSize: isMobile ? '32px' : '56px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
            lineHeight: '1.2',
          }}>
            What is FrameSentinel?
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            lineHeight: '1.8',
            marginBottom: '40px',
          }}>
            FrameSentinel is an AI fraud detection platform that detects deepfakes, replay attacks and face swaps during video KYC verification.
            It provides a REST API and TypeScript SDK for real-time video authenticity analysis.
          </p>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', justifyContent: 'center' }}>
            <Link href="/signup" style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#e8eaed',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
            }}>
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <Link href="/docs" style={{
              padding: '16px 40px',
              background: 'rgba(45, 53, 72, 0.8)',
              color: '#e8eaed',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px',
              border: '1px solid #374151',
            }}>
              View API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* What is FrameSentinel */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px' }}>
            What is FrameSentinel?
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '16px' }}>
            FrameSentinel is an AI-powered video fraud detection platform designed for identity verification and KYC workflows.
            It analyzes video streams to detect deepfakes, replay attacks, face swaps, video injection, and metadata tampering.
          </p>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '16px' }}>
            Unlike traditional KYC tools that rely on static image checks, FrameSentinel performs frame-by-frame video analysis
            using 5 parallel AI detection modules — delivering results in under 2 seconds.
          </p>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#10b981', lineHeight: '1.8', fontWeight: '600' }}>
            FrameSentinel is an API-first platform. You upload a video, and receive a fraud analysis result with authenticity score,
            risk level, and detection flags.
          </p>
        </div>
      </section>

      {/* How FrameSentinel Detects Deepfakes */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px', textAlign: 'center' }}>
            How FrameSentinel Detects Deepfakes
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', textAlign: 'center', marginBottom: '48px', maxWidth: '800px', margin: '0 auto 48px' }}>
            FrameSentinel runs 5 specialized AI detection modules in parallel on every video
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { title: 'Deepfake Detection', desc: 'Neural network analysis of facial micro-expressions, skin texture, and temporal consistency to identify AI-generated or manipulated faces.', icon: Eye },
              { title: 'Replay Attack Detection', desc: 'Detects pre-recorded videos, screen recordings, and looped footage being presented as live verification sessions.', icon: Shield },
              { title: 'Face Swap Detection', desc: 'Identifies real-time face replacement attacks where an attacker overlays a different identity during verification.', icon: Lock },
              { title: 'Injection Detection', desc: 'Detects virtual camera software and video stream injection tools that bypass the device camera entirely.', icon: Cpu },
              { title: 'Metadata Integrity', desc: 'Analyzes video file metadata for signs of tampering, editing software artifacts, and manipulation indicators.', icon: Target },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <item.icon size={36} color="#10b981" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FrameSentinel Use Cases */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px', textAlign: 'center' }}>
            FrameSentinel Use Cases
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px', marginTop: '40px' }}>
            {[
              { title: 'Fintech & Neobanks', desc: 'Protect customer onboarding from deepfake identity attacks. Comply with KYC/AML regulations.' },
              { title: 'Crypto Exchanges', desc: 'Prevent synthetic identity fraud and replay attacks during mandatory KYC verification.' },
              { title: 'Identity Verification Providers', desc: 'Add AI fraud detection as a layer in your existing IDV pipeline. Integrate via API in minutes.' },
              { title: 'Marketplaces & Gig Platforms', desc: 'Verify seller and driver identities. Prevent account takeover and multi-accounting fraud.' },
              { title: 'Insurance Companies', desc: 'Detect fraudulent video claims and synthetic identity submissions during onboarding.' },
              { title: 'Government & Public Sector', desc: 'Secure digital identity verification for citizen services and e-government platforms.' },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '28px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#10b981', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FrameSentinel vs Other KYC Fraud Detection Tools */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px', textAlign: 'center' }}>
            FrameSentinel vs Other KYC Fraud Detection Tools
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', textAlign: 'center', marginBottom: '40px' }}>
            How FrameSentinel compares to traditional identity verification platforms
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(16, 185, 129, 0.3)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#e8eaed', fontSize: '15px' }}>Feature</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#10b981', fontSize: '15px', fontWeight: '700' }}>FrameSentinel</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '15px' }}>Traditional KYC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Deepfake Detection', '✅ AI-powered', '❌ Not available'],
                  ['Replay Attack Detection', '✅ Built-in', '❌ Limited'],
                  ['Face Swap Detection', '✅ Real-time', '❌ Not available'],
                  ['Processing Time', '✅ Under 2 seconds', '⚠️ 10-30 seconds'],
                  ['API-First', '✅ REST API + SDK', '⚠️ Dashboard only'],
                  ['Video Analysis', '✅ Frame-by-frame', '⚠️ Single frame'],
                  ['Pricing', '✅ From $0/month', '⚠️ Enterprise only'],
                  ['No Video Storage', '✅ Auto-deleted', '⚠️ Stored 30+ days'],
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>
                    <td style={{ padding: '14px 16px', color: '#e8eaed', fontSize: '14px' }}>{row[0]}</td>
                    <td style={{ padding: '14px 16px', color: '#10b981', fontSize: '14px', textAlign: 'center' }}>{row[1]}</td>
                    <td style={{ padding: '14px 16px', color: '#9ca3af', fontSize: '14px', textAlign: 'center' }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who Should Use FrameSentinel */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px', textAlign: 'center' }}>
            Who Should Use FrameSentinel?
          </h2>
          <div style={{ display: 'grid', gap: '16px', marginTop: '40px' }}>
            {[
              'Identity verification providers looking to add AI fraud detection to their pipeline',
              'Fintech companies that need to detect deepfake attacks during video KYC',
              'Crypto exchanges requiring robust video verification for regulatory compliance',
              'Any platform that uses video for identity verification and needs fraud prevention',
              'Developers building KYC workflows who need a simple fraud detection API',
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '20px 24px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0 }} />
                <p style={{ color: '#e8eaed', fontSize: '15px', lineHeight: '1.6' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FrameSentinel Pricing */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px', textAlign: 'center' }}>
            FrameSentinel Pricing
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', textAlign: 'center', marginBottom: '40px' }}>
            Start free. Scale as you grow. No credit card required.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { name: 'Free', price: '$0', videos: '200 videos/mo' },
              { name: 'Starter', price: '$19', videos: '2,000 videos/mo' },
              { name: 'Growth', price: '$59', videos: '10,000 videos/mo', popular: true },
              { name: 'Pro', price: '$149', videos: '50,000 videos/mo' },
            ].map((plan) => (
              <div key={plan.name} style={{
                padding: '28px',
                background: (plan as any).popular ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)' : 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: (plan as any).popular ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.2)',
                textAlign: 'center',
              }}>
                <h3 style={{ fontSize: '18px', color: '#e8eaed', marginBottom: '8px', fontWeight: '600' }}>{plan.name}</h3>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
                  {plan.price}<span style={{ fontSize: '14px', color: '#9ca3af' }}>/mo</span>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>{plan.videos}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/pricing" style={{ color: '#10b981', fontSize: '16px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View detailed pricing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '48px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'What is FrameSentinel?', a: 'FrameSentinel is an AI fraud detection platform that detects deepfakes, replay attacks and face swaps during video KYC verification. It provides a REST API and TypeScript SDK for integration.' },
            { q: 'What is video KYC fraud detection?', a: 'Video KYC fraud detection is the process of analyzing video identity verification sessions to detect manipulation attempts such as deepfakes, face swaps, replay attacks, and video injection.' },
            { q: 'How to detect deepfake identity fraud?', a: 'FrameSentinel uses AI neural networks to analyze facial micro-expressions, skin texture, and temporal consistency across video frames to detect deepfake identity fraud with 99.7% accuracy.' },
            { q: 'What tools detect video identity fraud?', a: 'FrameSentinel is an AI platform specifically designed to detect video identity fraud. It runs 5 parallel detection modules including deepfake detection, replay attack prevention, face swap detection, injection detection, and metadata integrity checks.' },
            { q: 'How fast is FrameSentinel?', a: 'FrameSentinel processes videos in under 2 seconds. It extracts up to 15 frames and runs all 5 detection modules in parallel.' },
            { q: 'Does FrameSentinel store videos?', a: 'No. Videos are automatically deleted immediately after processing. FrameSentinel does not permanently store user videos.' },
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '24px',
              marginBottom: '16px',
              background: 'rgba(26, 31, 46, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.15)',
            }}>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.q}</h3>
              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: isMobile ? '60px 20px' : '80px 40px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)',
        borderTop: '1px solid rgba(16, 185, 129, 0.2)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px' }}>
            Try FrameSentinel Free
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', marginBottom: '32px' }}>
            200 free video analyses per month. No credit card required.
          </p>
          <Link href="/signup" style={{
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#e8eaed',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
          }}>
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: isMobile ? '40px 20px' : '60px 40px', borderTop: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? '32px' : '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Shield size={28} color="#10b981" />
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>FrameSentinel</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>AI fraud detection for video KYC</p>
          </div>
          <div>
            <h4 style={{ color: '#e8eaed', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/features" style={{ color: '#9ca3af', fontSize: '14px' }}>Features</Link>
              <Link href="/pricing" style={{ color: '#9ca3af', fontSize: '14px' }}>Pricing</Link>
              <Link href="/docs" style={{ color: '#9ca3af', fontSize: '14px' }}>Documentation</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#e8eaed', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/about" style={{ color: '#9ca3af', fontSize: '14px' }}>About</Link>
              <Link href="/contact" style={{ color: '#9ca3af', fontSize: '14px' }}>Contact</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#e8eaed', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/privacy" style={{ color: '#9ca3af', fontSize: '14px' }}>Privacy</Link>
              <Link href="/terms" style={{ color: '#9ca3af', fontSize: '14px' }}>Terms</Link>
              <Link href="/security" style={{ color: '#9ca3af', fontSize: '14px' }}>Security</Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '40px auto 0', paddingTop: '40px', borderTop: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
          © {new Date().getFullYear()} FrameSentinel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
