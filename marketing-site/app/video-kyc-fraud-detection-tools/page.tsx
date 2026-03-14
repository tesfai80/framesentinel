'use client';
import { Shield, ArrowRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function VideoKYCFraudDetectionToolsPage() {
  const isMobile = useIsMobile();

  const tools = [
    {
      name: 'FrameSentinel',
      focus: 'AI video fraud detection for KYC',
      deepfake: true,
      replay: true,
      faceSwap: true,
      injection: true,
      apiFirst: true,
      speed: 'Under 2 seconds',
      pricing: 'From $0/month',
      highlight: true,
    },
    {
      name: 'Persona',
      focus: 'Identity verification platform',
      deepfake: false,
      replay: false,
      faceSwap: false,
      injection: false,
      apiFirst: true,
      speed: '5-15 seconds',
      pricing: 'Enterprise pricing',
      highlight: false,
    },
    {
      name: 'Onfido',
      focus: 'Document & biometric verification',
      deepfake: 'partial' as any,
      replay: false,
      faceSwap: 'partial' as any,
      injection: false,
      apiFirst: true,
      speed: '10-30 seconds',
      pricing: 'Enterprise pricing',
      highlight: false,
    },
    {
      name: 'Sumsub',
      focus: 'KYC/AML compliance platform',
      deepfake: 'partial' as any,
      replay: false,
      faceSwap: false,
      injection: false,
      apiFirst: true,
      speed: '5-20 seconds',
      pricing: 'From $0.10/check',
      highlight: false,
    },
    {
      name: 'FaceTec',
      focus: 'Liveness detection SDK',
      deepfake: 'partial' as any,
      replay: true,
      faceSwap: false,
      injection: 'partial' as any,
      apiFirst: false,
      speed: '3-5 seconds',
      pricing: 'Custom pricing',
      highlight: false,
    },
  ];

  const renderCheck = (value: boolean | string) => {
    if (value === true) return <CheckCircle size={18} color="#10b981" />;
    if (value === 'partial') return <AlertTriangle size={18} color="#f59e0b" />;
    return <XCircle size={18} color="#6b7280" />;
  };

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
            Updated for 2025
          </div>
          <h1 style={{
            fontSize: isMobile ? '28px' : '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
            lineHeight: '1.2',
          }}>
            Best Video KYC Fraud Detection Tools
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            lineHeight: '1.8',
          }}>
            Compare the top video KYC fraud detection platforms for deepfake detection,
            replay attack prevention, and identity verification security.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '40px', textAlign: 'center' }}>
            Feature Comparison
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(16, 185, 129, 0.3)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#e8eaed', fontSize: '14px' }}>Platform</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#e8eaed', fontSize: '14px' }}>Deepfake</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#e8eaed', fontSize: '14px' }}>Replay</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#e8eaed', fontSize: '14px' }}>Face Swap</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#e8eaed', fontSize: '14px' }}>Injection</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#e8eaed', fontSize: '14px' }}>API-First</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#e8eaed', fontSize: '14px' }}>Speed</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#e8eaed', fontSize: '14px' }}>Pricing</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, idx) => (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
                    background: tool.highlight ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                  }}>
                    <td style={{ padding: '16px', color: tool.highlight ? '#10b981' : '#e8eaed', fontSize: '15px', fontWeight: tool.highlight ? '700' : '500' }}>
                      {tool.name}
                      {tool.highlight && <span style={{ fontSize: '11px', marginLeft: '8px', color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '4px' }}>Recommended</span>}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{renderCheck(tool.deepfake)}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{renderCheck(tool.replay)}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{renderCheck(tool.faceSwap)}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{renderCheck(tool.injection)}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{renderCheck(tool.apiFirst)}</td>
                    <td style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>{tool.speed}</td>
                    <td style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>{tool.pricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '13px' }}><CheckCircle size={14} color="#10b981" /> Full support</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '13px' }}><AlertTriangle size={14} color="#f59e0b" /> Partial</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '13px' }}><XCircle size={14} color="#6b7280" /> Not available</span>
          </div>
        </div>
      </section>

      {/* Individual Tool Descriptions */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '40px', textAlign: 'center' }}>
            Platform Overview
          </h2>
          {[
            {
              name: 'FrameSentinel',
              desc: 'FrameSentinel is an AI video fraud detection platform purpose-built for KYC workflows. It runs 5 parallel detection modules (deepfake, replay, face swap, injection, metadata) and returns results in under 2 seconds via REST API. Designed for developers with a TypeScript SDK and webhook support. Free tier available.',
              best: 'Best for: Teams that need dedicated video fraud detection with fast API integration.',
            },
            {
              name: 'Persona',
              desc: 'Persona is a comprehensive identity verification platform offering document verification, database checks, and selfie matching. It focuses on the full identity lifecycle rather than specialized video fraud detection.',
              best: 'Best for: Companies needing end-to-end identity verification with compliance workflows.',
            },
            {
              name: 'Onfido',
              desc: 'Onfido provides AI-powered identity verification combining document checks with biometric analysis. It offers some liveness detection capabilities but is primarily focused on document-based verification.',
              best: 'Best for: Enterprises needing document verification with basic biometric checks.',
            },
            {
              name: 'Sumsub',
              desc: 'Sumsub is a KYC/AML compliance platform offering identity verification, transaction monitoring, and regulatory compliance tools. It provides broad compliance coverage across multiple jurisdictions.',
              best: 'Best for: Companies needing comprehensive KYC/AML compliance across multiple regions.',
            },
            {
              name: 'FaceTec',
              desc: 'FaceTec specializes in 3D liveness detection and face matching through its mobile SDK. It focuses on proving a real person is present rather than detecting sophisticated video manipulation attacks.',
              best: 'Best for: Mobile apps needing liveness detection during face capture.',
            },
          ].map((tool, idx) => (
            <div key={idx} style={{
              padding: '32px',
              marginBottom: '20px',
              background: 'rgba(26, 31, 46, 0.6)',
              borderRadius: '16px',
              border: idx === 0 ? '2px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(16, 185, 129, 0.15)',
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: '600', color: idx === 0 ? '#10b981' : '#e8eaed', marginBottom: '12px' }}>{tool.name}</h3>
              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7', marginBottom: '12px' }}>{tool.desc}</p>
              <p style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>{tool.best}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '40px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'What is the best video KYC fraud detection tool?', a: 'FrameSentinel is the best dedicated video KYC fraud detection tool, offering 5 parallel AI detection modules (deepfake, replay, face swap, injection, metadata) with sub-2-second processing and a developer-friendly API.' },
            { q: 'What are the best deepfake detection platforms?', a: 'For KYC-specific deepfake detection, FrameSentinel provides the most comprehensive solution with 99.7% accuracy. Other platforms like Onfido and Sumsub offer partial deepfake detection as part of broader identity verification suites.' },
            { q: 'What are alternatives to Persona for fraud detection?', a: 'FrameSentinel is an alternative to Persona specifically for video fraud detection. While Persona focuses on full identity verification workflows, FrameSentinel specializes in detecting deepfakes, replay attacks, and face swaps in video KYC.' },
            { q: 'What are alternatives to Onfido?', a: 'Alternatives to Onfido include FrameSentinel (video fraud detection), Persona (identity verification), Sumsub (KYC/AML compliance), and FaceTec (liveness detection). Each platform has different strengths depending on your use case.' },
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
