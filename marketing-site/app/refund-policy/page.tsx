'use client';
import { Shield, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function RefundPolicyPage() {
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
          <RotateCcw size={48} color="#10b981" style={{ marginBottom: '24px' }} />
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Refund Policy
          </h1>
          <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '40px' }}>
            Last updated: January 2025
          </p>

          <div style={{ color: '#e8eaed', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              1. 14-Day Money-Back Guarantee
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              All paid plans (Starter, Growth, and Pro) include a 14-day money-back guarantee from the date of your initial purchase. If you are not satisfied with FrameSentinel for any reason, you may request a full refund within this period — no questions asked.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              2. Eligible Plans
            </h2>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Free ($0/mo) — No refund applicable</li>
              <li style={{ marginBottom: '8px' }}>Starter ($19/mo) — Eligible for 14-day refund</li>
              <li style={{ marginBottom: '8px' }}>Growth ($59/mo) — Eligible for 14-day refund</li>
              <li style={{ marginBottom: '8px' }}>Pro ($149/mo) — Eligible for 14-day refund</li>
              <li style={{ marginBottom: '8px' }}>Enterprise (Custom) — Governed by individual contract terms</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              3. After the 14-Day Period
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              After the initial 14-day window, subscriptions are non-refundable. When you cancel your plan, you will retain access to all features until the end of your current billing period. No partial refunds are issued for unused time within a billing cycle.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              4. Overage Charges
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Per-verification overage charges (e.g., $0.02, $0.015, $0.01, or $0.008 depending on your plan) are non-refundable once the verifications have been processed.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              5. Plan Downgrades
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              If you downgrade to a lower plan, the change takes effect at the start of your next billing cycle. No refund or credit is issued for the difference between plans during the current cycle.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              6. Service Outages
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              If FrameSentinel fails to meet the uptime commitment defined in your plan's SLA, you may be eligible for service credits as outlined in our <Link href="/terms" style={{ color: '#10b981' }}>Terms of Service</Link>. SLA credits are applied to future invoices and are not issued as cash refunds.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              7. How to Request a Refund
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              To request a refund within the 14-day guarantee period, contact our team at <a href="mailto:support@framesentinel.com" style={{ color: '#10b981', fontWeight: 'bold', textDecoration: 'none' }}>support@framesentinel.com</a> with your account email and reason for the request. Refunds are processed within 5–10 business days to the original payment method.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              8. Exceptions
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Refunds will not be granted in cases of:
            </p>
            <ul style={{ color: '#9ca3af', marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Violation of our Terms of Service or Acceptable Use Policy</li>
              <li style={{ marginBottom: '8px' }}>Account suspension due to abuse or fraudulent activity</li>
              <li style={{ marginBottom: '8px' }}>Requests made after the 14-day guarantee period</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#10b981' }}>
              9. Contact
            </h2>
            <p style={{ color: '#9ca3af' }}>
              Questions about refunds or billing? Contact us at:
              <br />
              <a href="mailto:support@framesentinel.com" style={{ color: '#10b981', fontWeight: 'bold', textDecoration: 'none' }}>support@framesentinel.com</a>
              <br />
              FrameSentinel Inc., San Francisco, CA
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
