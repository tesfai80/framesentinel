'use client';
import { Shield, Lock, Key, Cloud, FileCheck, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function SecurityPage() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}

      <section style={{
        marginTop: isMobile ? '60px' : '80px',
        padding: isMobile ? '60px 20px' : '100px 40px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: isMobile ? '36px' : '56px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
          }}>
            Security & Compliance
          </h1>
          <p style={{
            fontSize: isMobile ? '18px' : '24px',
            color: '#10b981',
            marginBottom: '40px',
          }}>
            Enterprise-grade security for your video KYC data
          </p>
        </div>
      </section>

      {/* Data Security */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Data Security
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            marginBottom: '40px',
          }}>
            How we protect your sensitive video verification data
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '20px' : '24px' }}>
            {[
              {
                icon: Lock,
                title: 'Encrypted video uploads',
                description: 'All video uploads use TLS 1.3 encryption in transit and AES-256 encryption at rest',
              },
              {
                icon: Database,
                title: 'Short data retention policies',
                description: 'Videos are automatically deleted after 30 days. Configurable retention policies available for Enterprise plans',
              },
              {
                icon: Key,
                title: 'Secure API authentication',
                description: 'API key authentication with rate limiting, IP whitelisting, and webhook signature verification',
              },
              {
                icon: Cloud,
                title: 'GDPR-aligned data handling',
                description: 'EU data residency options, data deletion on request, and full GDPR compliance',
              },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <item.icon size={40} color="#10b981" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: isMobile ? '18px' : '20px', color: '#e8eaed', marginBottom: '12px', fontWeight: '600' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Handling FAQ */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '40px',
            color: '#e8eaed',
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                question: 'Is the video saved?',
                answer: 'Yes, videos are temporarily stored for processing and audit purposes. They are automatically deleted after 30 days unless you configure a different retention policy.',
              },
              {
                question: 'How long is data retained?',
                answer: 'By default, videos are retained for 30 days. Analysis results and metadata are kept for 90 days. Enterprise customers can configure custom retention policies.',
              },
              {
                question: 'Is there encryption?',
                answer: 'Yes. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. API keys are hashed and never stored in plain text.',
              },
              {
                question: 'Where is data stored?',
                answer: 'Data is stored in secure cloud infrastructure with options for US, EU, or custom regional data residency for Enterprise customers.',
              },
              {
                question: 'Can I delete data on request?',
                answer: 'Yes. You can delete any video or session data at any time via API or dashboard. We support GDPR right-to-deletion requests.',
              },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '24px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <h3 style={{ fontSize: isMobile ? '16px' : '18px', color: '#10b981', marginBottom: '12px', fontWeight: '600' }}>
                  {item.question}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px', lineHeight: '1.6' }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Compliance & Standards
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            marginBottom: '40px',
          }}>
            Built to meet enterprise security requirements
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '20px' : '24px' }}>
            {[
              { icon: '🔒', title: 'SOC 2 Ready', description: 'Security controls aligned with SOC 2 Type II' },
              { icon: '🛡️', title: 'ISO 27001 Aligned', description: 'Information security management practices' },
              { icon: '🌍', title: 'GDPR Compliant', description: 'Full compliance with EU data protection' },
              { icon: '🔐', title: 'CCPA Ready', description: 'California privacy law compliance' },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '24px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: isMobile ? '40px' : '48px', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: isMobile ? '16px' : '18px', color: '#e8eaed', marginBottom: '8px', fontWeight: '600' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '14px' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Transparency */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Detection Transparency
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            marginBottom: '32px',
            lineHeight: '1.8',
          }}>
            FrameSentinel does not make automatic approval or rejection decisions. Instead, we provide detailed fraud detection data that your system uses to make informed decisions.
          </p>
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: isMobile ? '24px' : '32px',
          }}>
            <h3 style={{ fontSize: isMobile ? '18px' : '20px', color: '#10b981', marginBottom: '20px', fontWeight: '600' }}>
              What you receive:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Authenticity score (0-1 scale)',
                'Risk level classification (VERIFIED, SUSPICIOUS, REJECTED)',
                'Frame-by-frame tamper timeline',
                'Detection flags for each fraud type',
                'Confidence scores for each detection',
              ].map((item, idx) => (
                <li key={idx} style={{
                  color: '#e8eaed',
                  fontSize: isMobile ? '14px' : '16px',
                  marginBottom: '12px',
                  paddingLeft: '24px',
                  position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: '#10b981' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{
              fontSize: isMobile ? '15px' : '16px',
              color: '#10b981',
              marginTop: '24px',
              fontWeight: '600',
            }}>
              Your system remains in full control of the final decision.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)',
        borderTop: '1px solid rgba(16, 185, 129, 0.2)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
          }}>
            Questions about security?
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            marginBottom: '40px',
          }}>
            Contact our security team for detailed information
          </p>
          <Link href="/contact" style={{
            padding: isMobile ? '16px 40px' : '18px 48px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#e8eaed',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: isMobile ? '16px' : '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
          }}>
            Contact Security Team
            <ArrowRight size={isMobile ? 20 : 24} />
          </Link>
        </div>
      </section>

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
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>
              Enterprise-grade AI fraud detection for video KYC
            </p>
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
