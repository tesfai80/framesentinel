'use client';
import { Shield, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
        </div>
      </nav>

      <section style={{ marginTop: '80px', padding: '80px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Lock size={48} color="#10b981" style={{ marginBottom: '24px' }} />
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '40px' }}>
            Last updated: January 2024
          </p>

          <div style={{ color: '#e8eaed', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              1. Information We Collect
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              We collect information necessary to provide our video KYC fraud detection services:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Video files uploaded for verification analysis</li>
              <li style={{ marginBottom: '8px' }}>Account information (name, email, company details)</li>
              <li style={{ marginBottom: '8px' }}>API usage data and session metadata</li>
              <li style={{ marginBottom: '8px' }}>Technical data (IP address, browser type, device information)</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              2. How We Use Your Information
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Your data is used exclusively for:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Processing video verification requests through our AI detection modules</li>
              <li style={{ marginBottom: '8px' }}>Improving fraud detection accuracy and model performance</li>
              <li style={{ marginBottom: '8px' }}>Providing customer support and technical assistance</li>
              <li style={{ marginBottom: '8px' }}>Sending service updates and security notifications</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              3. Data Security & Encryption
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              We implement enterprise-grade security measures:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>End-to-end encryption for all video uploads (AES-256)</li>
              <li style={{ marginBottom: '8px' }}>SOC 2 Type II certified infrastructure</li>
              <li style={{ marginBottom: '8px' }}>Data isolation with dedicated storage per customer</li>
              <li style={{ marginBottom: '8px' }}>Regular security audits and penetration testing</li>
              <li style={{ marginBottom: '8px' }}>Automatic video deletion after 30 days (configurable)</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              4. Data Retention
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Video files are retained for 30 days by default and then permanently deleted. Analysis results and metadata are kept for 12 months for compliance purposes. You can request immediate deletion at any time.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              5. Third-Party Sharing
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              We do not sell, rent, or share your data with third parties. Limited data may be shared with:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Cloud infrastructure providers (AWS) under strict data processing agreements</li>
              <li style={{ marginBottom: '8px' }}>Law enforcement when legally required</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              6. GDPR & Compliance
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              We are fully GDPR compliant. You have the right to:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Access your personal data</li>
              <li style={{ marginBottom: '8px' }}>Request data deletion (right to be forgotten)</li>
              <li style={{ marginBottom: '8px' }}>Data portability</li>
              <li style={{ marginBottom: '8px' }}>Opt-out of marketing communications</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              7. Cookies & Tracking
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              We use essential cookies for authentication and session management. No third-party tracking or advertising cookies are used.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              8. Contact Us
            </h2>
            <p style={{ color: '#9ca3af' }}>
              For privacy concerns or data requests, contact our Data Protection Officer at:
              <br />
              <a href="mailto:privacy@framesentinel.com" style={{ color: '#10b981', fontWeight: 'bold', textDecoration: 'none' }}>privacy@framesentinel.com</a>
              <br />
              Response time: Within 48 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
