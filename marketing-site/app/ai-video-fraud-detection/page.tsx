'use client';
import { Shield, Zap, Lock, CheckCircle, ArrowRight, Eye, Cpu, Target, BarChart3, Globe, AlertTriangle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';
import type { Metadata } from 'next';

export default function AIVideoFraudDetectionPage() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}

      {/* Hero */}
      <section style={{
        marginTop: isMobile ? '60px' : '80px',
        padding: isMobile ? '60px 20px' : '100px 40px',
        textAlign: 'center',
        position: 'relative',
        backgroundImage: `
          radial-gradient(circle at 30% 20%, rgba(16,185,129,0.15), transparent 40%),
          radial-gradient(circle at 70% 60%, rgba(239,68,68,0.08), transparent 40%)
        `,
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#10b981',
            fontWeight: '600',
            marginBottom: '24px',
          }}>
            AI-Powered Fraud Detection for Video KYC
          </div>
          <h1 style={{
            fontSize: isMobile ? '32px' : '56px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
            lineHeight: '1.2',
          }}>
            AI Video Fraud Detection{isMobile ? ' ' : <br />}for Identity Verification
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            marginBottom: '40px',
            lineHeight: '1.8',
          }}>
            Deepfake detection, replay attack prevention, and face swap identification — all in a single API call.
            FrameSentinel analyzes video KYC sessions in under 2 seconds with 99.7% accuracy.
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
            <Link href="/demo" style={{
              padding: '16px 40px',
              background: 'rgba(45, 53, 72, 0.8)',
              color: '#e8eaed',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #374151',
            }}>
              Try Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section style={{
        padding: isMobile ? '60px 20px' : '80px 40px',
        background: 'rgba(239, 68, 68, 0.03)',
        borderTop: '1px solid rgba(239, 68, 68, 0.1)',
        borderBottom: '1px solid rgba(239, 68, 68, 0.1)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
            <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
            <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px' }}>
              Video KYC Fraud Is Growing Fast
            </h2>
            <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8' }}>
              As video-based identity verification becomes the standard, attackers are using increasingly sophisticated methods to bypass it.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { stat: '300%', label: 'Increase in deepfake attacks on KYC systems since 2023' },
              { stat: '$4.2B', label: 'Annual losses from identity fraud in financial services' },
              { stat: '72%', label: 'Of traditional KYC systems fail to detect AI-generated videos' },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.8)',
                borderRadius: '16px',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: isMobile ? '36px' : '48px', fontWeight: 'bold', color: '#ef4444', marginBottom: '12px' }}>
                  {item.stat}
                </div>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is AI Video Fraud Detection */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '24px', textAlign: 'center' }}>
            What Is AI Video Fraud Detection?
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', lineHeight: '1.8', textAlign: 'center', marginBottom: '48px', maxWidth: '800px', margin: '0 auto 48px' }}>
            AI video fraud detection uses machine learning models to analyze video streams and identify signs of manipulation — 
            including deepfakes, face swaps, replay attacks, and injected video feeds. 
            It is a critical layer for any identity verification or KYC workflow that relies on video.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { title: 'Deepfake Detection', desc: 'Identifies AI-generated or manipulated faces in video streams using neural network analysis of facial micro-expressions, skin texture, and temporal consistency.', icon: Eye },
              { title: 'Replay Attack Prevention', desc: 'Detects pre-recorded videos, screen recordings, and looped footage being presented as live verification sessions.', icon: Shield },
              { title: 'Face Swap Detection', desc: 'Identifies real-time face replacement attacks where an attacker overlays a different identity onto their own face during verification.', icon: Lock },
              { title: 'Injection Detection', desc: 'Detects virtual camera software and video stream injection tools that bypass the device camera entirely.', icon: Cpu },
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

      {/* How FrameSentinel Works */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px', textAlign: 'center' }}>
            How FrameSentinel Detects Video Fraud
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', textAlign: 'center', marginBottom: '48px' }}>
            5 detection modules running in parallel, results in under 2 seconds
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { step: '1', title: 'Video Upload', desc: 'Upload a verification video via REST API. Supports MP4, AVI, MOV, WEBM up to 100MB.' },
              { step: '2', title: 'Frame Extraction', desc: 'Up to 15 key frames are extracted from the video for analysis.' },
              { step: '3', title: 'Parallel AI Analysis', desc: '5 detection models run simultaneously: deepfake, replay, injection, face swap, and metadata integrity.' },
              { step: '4', title: 'Risk Scoring', desc: 'Each frame receives individual scores. A weighted authenticity score and risk level are calculated.' },
              { step: '5', title: 'Result Delivery', desc: 'Full results returned via API response or webhook — including frame-level timeline and detection flags.' },
            ].map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start',
                padding: '24px 0',
                borderBottom: idx < 4 ? '1px solid rgba(16, 185, 129, 0.1)' : 'none',
              }}>
                <div style={{
                  minWidth: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#e8eaed', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '48px', textAlign: 'center' }}>
            Detection Performance
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { value: '99.7%', label: 'Deepfake Detection Accuracy' },
              { value: '<2s', label: 'Processing Time' },
              { value: '5', label: 'Parallel Detection Modules' },
              { value: '15', label: 'Frames Analyzed Per Video' },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '32px 20px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: isMobile ? '32px' : '40px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
                  {item.value}
                </div>
                <p style={{ color: '#9ca3af', fontSize: '13px' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px', textAlign: 'center' }}>
            Who Uses AI Video Fraud Detection?
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', textAlign: 'center', marginBottom: '48px' }}>
            Any platform that uses video for identity verification needs fraud detection
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { title: 'Fintech & Neobanks', desc: 'Protect customer onboarding from deepfake identity attacks. Comply with KYC/AML regulations while maintaining fast verification.' },
              { title: 'Crypto Exchanges', desc: 'Prevent synthetic identity fraud and replay attacks during mandatory KYC verification for trading accounts.' },
              { title: 'Identity Verification Providers', desc: 'Add AI fraud detection as a layer in your existing IDV pipeline. Integrate via API in minutes.' },
              { title: 'Marketplaces & Gig Platforms', desc: 'Verify seller and driver identities. Prevent account takeover and multi-accounting fraud.' },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Example */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px', textAlign: 'center' }}>
            Simple API Integration
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', textAlign: 'center', marginBottom: '40px' }}>
            Add video fraud detection to your KYC flow in 3 lines of code
          </p>
          <div style={{
            background: '#0d1117',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: isMobile ? '20px' : '32px',
            overflow: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: '12px', fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>fraud-detection.js</span>
            </div>
            <pre style={{ fontSize: isMobile ? '12px' : '14px', lineHeight: '1.8', margin: 0, fontFamily: '"Fira Code", "Consolas", monospace' }}>
              <span style={{ color: '#8b949e' }}>{'// Upload video and get fraud analysis'}</span>{'\n'}
              <span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#79c0ff' }}>result</span> <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#ff7b72' }}>await</span> <span style={{ color: '#d2a8ff' }}>framesentinel</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#d2a8ff' }}>verify</span><span style={{ color: '#e8eaed' }}>(</span><span style={{ color: '#79c0ff' }}>videoFile</span><span style={{ color: '#e8eaed' }}>)</span><span style={{ color: '#ff7b72' }}>;</span>{'\n\n'}
              <span style={{ color: '#8b949e' }}>{'// Check results'}</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>authenticity_score</span>  <span style={{ color: '#8b949e' }}>{'// 0.95 (0-1 scale)'}</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>risk_level</span>          <span style={{ color: '#8b949e' }}>{'// "VERIFIED" | "SUSPICIOUS" | "REJECTED"'}</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>detection_flags</span>     <span style={{ color: '#8b949e' }}>{'// { deepfake: false, replay: false, ... }'}</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>frame_timeline</span>      <span style={{ color: '#8b949e' }}>{'// Per-frame analysis with timestamps'}</span>
            </pre>
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
            { q: 'What types of video fraud can FrameSentinel detect?', a: 'FrameSentinel detects deepfakes, face swaps, replay attacks, video injection, and metadata tampering. All 5 detection modules run in parallel on every video.' },
            { q: 'How fast is the analysis?', a: 'Average processing time is under 2 seconds. This includes frame extraction, parallel AI analysis across 5 models, and risk score calculation.' },
            { q: 'What video formats are supported?', a: 'MP4, AVI, MOV, and WEBM formats are supported, with a maximum file size of 100MB per video.' },
            { q: 'Does FrameSentinel store the videos?', a: 'No. Videos are automatically deleted immediately after processing. No permanent storage of user videos.' },
            { q: 'How do I integrate FrameSentinel?', a: 'FrameSentinel provides a REST API and TypeScript SDK. Upload a video, receive a fraud analysis result. Most integrations take less than 30 minutes.' },
            { q: 'Does FrameSentinel make approval decisions?', a: 'No. FrameSentinel provides authenticity scores, risk levels, and detection flags. Your system remains in control of the final approval decision.' },
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
            Start Detecting Video Fraud Today
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', marginBottom: '32px' }}>
            Free trial includes 100 video analyses. No credit card required.
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
      <footer style={{
        padding: isMobile ? '40px 20px' : '60px 40px',
        borderTop: '1px solid rgba(16, 185, 129, 0.2)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '32px' : '40px',
        }}>
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
        <div style={{
          maxWidth: '1200px',
          margin: '40px auto 0',
          paddingTop: '40px',
          borderTop: '1px solid rgba(16, 185, 129, 0.2)',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px',
        }}>
          © {new Date().getFullYear()} FrameSentinel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
