'use client';
import { Shield, ArrowRight, Eye, Cpu, Lock, Zap, AlertTriangle, Monitor, Camera, FileWarning } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function WhatIsVideoIdentityFraudPage() {
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
            Video Identity Fraud and Deepfake Attacks
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '40px' }}>
            Video identity fraud is the use of manipulated or synthetic video to bypass identity verification systems.
            Attackers use deepfakes, face swaps, replay attacks, and video injection to impersonate real people during KYC verification.
          </p>
        </div>
      </section>

      {/* What is Video Identity Fraud */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px' }}>
            What is Video Identity Fraud?
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '16px' }}>
            Video identity fraud occurs when an attacker uses manipulated video content to pass identity verification checks.
            This includes using AI-generated deepfakes, pre-recorded videos, face swap software, or virtual camera injection
            to impersonate another person during a video KYC session.
          </p>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '16px' }}>
            As video-based identity verification becomes the standard for KYC compliance, video identity fraud has grown
            by over 300% since 2023. Traditional verification systems that rely on single-frame analysis are unable to
            detect these sophisticated attacks.
          </p>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#10b981', lineHeight: '1.8', fontWeight: '600' }}>
            FrameSentinel is an AI platform that detects video KYC fraud, deepfake identity attacks, replay attacks and face swaps
            in real-time through frame-by-frame video analysis.
          </p>
        </div>
      </section>

      {/* Types of Video Identity Fraud */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px', textAlign: 'center' }}>
            Types of Video Identity Fraud
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', textAlign: 'center', marginBottom: '48px' }}>
            Understanding the different types of deepfake identity attacks used against KYC systems
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              {
                title: 'Deepfake Identity Attacks',
                desc: 'Attackers use AI to generate realistic synthetic faces or manipulate existing video to create a convincing fake identity. Deepfake identity attacks can fool traditional KYC systems that only analyze single frames.',
                icon: Eye,
                severity: 'Critical',
              },
              {
                title: 'Replay Attacks',
                desc: 'Pre-recorded videos or screen recordings of a real person are played back during a live verification session. The attacker presents a video of the victim instead of being physically present.',
                icon: Monitor,
                severity: 'High',
              },
              {
                title: 'Face Swap Attacks',
                desc: 'Real-time face replacement software overlays a stolen identity onto the attacker\'s face during a live video KYC session. The attacker\'s movements control the swapped face.',
                icon: Lock,
                severity: 'Critical',
              },
              {
                title: 'Video Injection Attacks',
                desc: 'Virtual camera software or video stream injection tools bypass the device camera entirely, feeding pre-made or AI-generated video directly into the verification application.',
                icon: Camera,
                severity: 'High',
              },
              {
                title: 'Metadata Tampering',
                desc: 'Attackers modify video file metadata to hide evidence of editing, change timestamps, or remove software signatures that would indicate the video was manipulated.',
                icon: FileWarning,
                severity: 'Medium',
              },
              {
                title: 'Synthetic Identity Fraud',
                desc: 'Combining real and fake information to create entirely new identities that don\'t belong to any real person. AI-generated faces are used with fabricated documents for KYC verification.',
                icon: Cpu,
                severity: 'Critical',
              },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '32px', background: 'rgba(26, 31, 46, 0.6)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <item.icon size={32} color="#10b981" />
                  <span style={{
                    padding: '4px 10px',
                    background: item.severity === 'Critical' ? 'rgba(239, 68, 68, 0.15)' : item.severity === 'High' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: item.severity === 'Critical' ? '#ef4444' : item.severity === 'High' ? '#f59e0b' : '#10b981',
                    borderRadius: '6px', fontSize: '11px', fontWeight: '700',
                  }}>{item.severity}</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Detect */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px', textAlign: 'center' }}>
            How to Detect Video Identity Fraud
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', textAlign: 'center', marginBottom: '40px' }}>
            Detecting video identity fraud requires AI-powered analysis that goes beyond single-frame checks
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { step: '1', title: 'Frame-by-Frame Analysis', desc: 'Extract multiple frames from the video and analyze each one for signs of manipulation, rather than relying on a single snapshot.' },
              { step: '2', title: 'Temporal Consistency Checks', desc: 'Analyze how facial features change across frames. Deepfakes often show inconsistencies in micro-expressions and skin texture over time.' },
              { step: '3', title: 'Multi-Module Detection', desc: 'Run multiple specialized AI models in parallel — deepfake, replay, face swap, injection, and metadata — for comprehensive coverage.' },
              { step: '4', title: 'Risk Score Calculation', desc: 'Combine results from all detection modules into a single authenticity score and risk level for automated decision-making.' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', padding: '24px 0', borderBottom: idx < 3 ? '1px solid rgba(16, 185, 129, 0.1)' : 'none' }}>
                <div style={{ minWidth: '48px', height: '48px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{item.step}</div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#e8eaed', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '40px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'What is video identity fraud?', a: 'Video identity fraud is the use of manipulated or synthetic video to bypass identity verification systems. This includes deepfake identity attacks, replay attacks, face swaps, and video injection during KYC verification.' },
            { q: 'What is a deepfake identity attack?', a: 'A deepfake identity attack uses AI-generated or manipulated video to impersonate a real person during identity verification. Attackers create synthetic faces or alter existing video to pass KYC checks.' },
            { q: 'How common is video KYC fraud?', a: 'Video KYC fraud has increased by over 300% since 2023. Financial services lose an estimated $4.2 billion annually to identity fraud, with 72% of traditional KYC systems failing to detect AI-generated video attacks.' },
            { q: 'How can I prevent video identity fraud?', a: 'Use AI-powered video fraud detection like FrameSentinel that analyzes videos frame-by-frame with multiple detection modules. FrameSentinel detects deepfakes, replay attacks, face swaps, injection, and metadata tampering in under 2 seconds.' },
            { q: 'What tools detect video identity fraud?', a: 'FrameSentinel is an AI platform specifically designed to detect video identity fraud. It runs 5 parallel detection modules and provides results via REST API. Other tools include Reality Defender and Sensity AI for broader media detection.' },
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
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px' }}>Protect Against Video Identity Fraud</h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', marginBottom: '32px' }}>Start detecting deepfake identity attacks with FrameSentinel. 200 free analyses per month.</p>
          <Link href="/signup" style={{ padding: '16px 48px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#e8eaed', borderRadius: '12px', fontWeight: '600', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
