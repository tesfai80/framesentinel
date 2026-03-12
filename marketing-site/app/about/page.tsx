'use client';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function AboutPage() {
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
            About FrameSentinel
          </h1>
          <p style={{
            fontSize: isMobile ? '18px' : '24px',
            color: '#10b981',
            marginBottom: '40px',
          }}>
            Infrastructure for detecting AI identity fraud
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
          }}>
            Our mission
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            lineHeight: '1.8',
            marginBottom: '24px',
          }}>
            FrameSentinel was created to solve the growing problem of AI-powered identity fraud.
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            lineHeight: '1.8',
            marginBottom: '24px',
          }}>
            As video verification becomes the standard for KYC, attackers are increasingly using deepfakes, replay attacks and synthetic identities to bypass security systems.
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            lineHeight: '1.8',
          }}>
            FrameSentinel provides infrastructure for detecting these threats in real-time through an API-first platform designed for modern identity systems.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
          }}>
            Built by security engineers
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            lineHeight: '1.8',
            marginBottom: '24px',
          }}>
            Our team has built multiple security platforms including SaaSRX and GenDetect, serving thousands of companies worldwide.
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#9ca3af',
            lineHeight: '1.8',
          }}>
            We're focused on stopping AI identity fraud and making video KYC verification secure for fintech, crypto exchanges, and identity platforms.
          </p>
        </div>
      </section>

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
            Start protecting your KYC
          </h2>
          <Link href="/signup" style={{
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
            Start Free Trial
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
