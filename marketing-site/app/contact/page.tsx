'use client';
import { Shield, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function ContactPage() {
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
            Contact Us
          </h1>
          <p style={{
            fontSize: isMobile ? '18px' : '24px',
            color: '#10b981',
            marginBottom: '40px',
          }}>
            Get in touch with our team
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '24px' : '32px' }}>
            {[
              {
                icon: Mail,
                title: 'Sales & General Inquiries',
                email: 'sales@framesentinel.com',
                description: 'Questions about pricing, features, or demos',
              },
              {
                icon: Shield,
                title: 'Security & Compliance',
                email: 'security@framesentinel.com',
                description: 'Security questionnaires and compliance information',
              },
              {
                icon: MessageSquare,
                title: 'Technical Support',
                email: 'support@framesentinel.com',
                description: 'API integration help and technical questions',
              },
              {
                icon: Mail,
                title: 'Partnerships',
                email: 'partnerships@framesentinel.com',
                description: 'Integration partnerships and collaborations',
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
                <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px', marginBottom: '16px', lineHeight: '1.6' }}>
                  {item.description}
                </p>
                <a href={`mailto:${item.email}`} style={{
                  color: '#10b981',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}>
                  {item.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
          }}>
            Enterprise customers
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            marginBottom: '32px',
            lineHeight: '1.8',
          }}>
            For enterprise plans, custom integrations, or volume pricing, contact our sales team directly.
          </p>
          <a href="mailto:enterprise@framesentinel.com" style={{
            padding: isMobile ? '14px 32px' : '16px 40px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#e8eaed',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: isMobile ? '16px' : '18px',
            display: 'inline-block',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
          }}>
            Contact Enterprise Sales
          </a>
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
