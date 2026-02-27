'use client';
import { Shield, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
          <FileText size={48} color="#10b981" style={{ marginBottom: '24px' }} />
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '40px' }}>
            Last updated: January 2024
          </p>

          <div style={{ color: '#e8eaed', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              By accessing and using FrameSentinel's video KYC fraud detection platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Service.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              2. Service Description
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              FrameSentinel provides AI-powered fraud detection for video KYC verification, including:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Deepfake detection</li>
              <li style={{ marginBottom: '8px' }}>Replay attack prevention</li>
              <li style={{ marginBottom: '8px' }}>Face swap detection</li>
              <li style={{ marginBottom: '8px' }}>Injection detection</li>
              <li style={{ marginBottom: '8px' }}>Metadata integrity verification</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              3. API Usage & Limits
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Your subscription includes specific usage limits:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Starter: 1,000 verifications/month</li>
              <li style={{ marginBottom: '8px' }}>Professional: 10,000 verifications/month</li>
              <li style={{ marginBottom: '8px' }}>Enterprise: Unlimited (custom agreement)</li>
              <li style={{ marginBottom: '8px' }}>Rate limit: 100 requests per minute</li>
              <li style={{ marginBottom: '8px' }}>Max video size: 100MB per file</li>
            </ul>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Exceeding limits may result in additional charges or temporary service suspension.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              4. Acceptable Use Policy
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              You agree NOT to:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Reverse engineer or attempt to extract our AI models</li>
              <li style={{ marginBottom: '8px' }}>Use the Service for illegal activities</li>
              <li style={{ marginBottom: '8px' }}>Share API keys or credentials</li>
              <li style={{ marginBottom: '8px' }}>Overload our systems with excessive requests</li>
              <li style={{ marginBottom: '8px' }}>Resell the Service without authorization</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              5. Payment Terms
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Billing is monthly in advance. You authorize us to charge your payment method automatically. Refunds are provided within 14 days of initial purchase only. Cancellation takes effect at the end of the current billing period.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              6. Service Level Agreement (SLA)
            </h2>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Starter: 99.5% uptime</li>
              <li style={{ marginBottom: '8px' }}>Professional: 99.9% uptime</li>
              <li style={{ marginBottom: '8px' }}>Enterprise: Up to 99.99% uptime (custom)</li>
            </ul>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              SLA credits are provided for downtime exceeding these thresholds.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              7. Intellectual Property
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              All AI models, algorithms, and technology remain the exclusive property of FrameSentinel. You retain ownership of your uploaded videos and data.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              8. Limitation of Liability
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              FrameSentinel provides fraud detection as a tool. We are not liable for:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>False positives or false negatives in detection</li>
              <li style={{ marginBottom: '8px' }}>Decisions made based on our analysis</li>
              <li style={{ marginBottom: '8px' }}>Indirect or consequential damages</li>
            </ul>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Maximum liability is limited to fees paid in the last 12 months.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              9. Termination
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Either party may terminate with 30 days notice. We may suspend service immediately for violations of these terms.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              10. Changes to Terms
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              We may update these terms with 30 days notice. Continued use constitutes acceptance.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              11. Governing Law
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              These terms are governed by the laws of California, USA. Disputes will be resolved through binding arbitration.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              12. Contact
            </h2>
            <p style={{ color: '#9ca3af' }}>
              Questions about these terms? Contact us at:
              <br />
              <strong style={{ color: '#10b981' }}>legal@framesentinel.com</strong>
              <br />
              FrameSentinel Inc., San Francisco, CA
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
