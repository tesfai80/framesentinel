'use client';
import { Check, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for startups and small teams',
      features: [
        '1,000 video verifications/month',
        'All 5 detection modules',
        'API access',
        'Webhook notifications',
        'Email support',
        '99.5% SLA',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$499',
      period: '/month',
      description: 'For growing businesses',
      features: [
        '10,000 video verifications/month',
        'All 5 detection modules',
        'Priority API access',
        'Webhook notifications',
        'Priority support',
        '99.9% SLA',
        'Custom integration support',
        'Dedicated account manager',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale operations',
      features: [
        'Unlimited verifications',
        'All 5 detection modules',
        'Dedicated infrastructure',
        'Custom SLA (up to 99.99%)',
        '24/7 phone support',
        'On-premise deployment option',
        'Custom model training',
        'Compliance assistance',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div>
      {/* Navigation */}
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
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/#features" style={{ color: '#e8eaed', fontSize: '16px' }}>Features</Link>
            <Link href="/pricing" style={{ color: '#10b981', fontSize: '16px', fontWeight: '600' }}>Pricing</Link>
            <Link href="/docs" style={{ color: '#e8eaed', fontSize: '16px' }}>Docs</Link>
            <Link href="/login" style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#e8eaed',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
            }}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        marginTop: '80px',
        padding: '80px 40px 60px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#9ca3af',
          marginBottom: '16px',
        }}>
          Choose the plan that fits your needs. All plans include 14-day free trial.
        </p>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
        }}>
          No credit card required • Cancel anytime • Pay as you grow
        </p>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '40px 40px 100px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
        }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{
              padding: '40px',
              background: plan.popular 
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(26, 31, 46, 0.8) 100%)'
                : 'rgba(26, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: plan.popular ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.2)',
              position: 'relative',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '6px 20px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#e8eaed',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Most Popular
                </div>
              )}
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#e8eaed',
              }}>
                {plan.name}
              </h3>
              <p style={{
                color: '#9ca3af',
                fontSize: '14px',
                marginBottom: '24px',
              }}>
                {plan.description}
              </p>
              
              <div style={{ marginBottom: '32px' }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#10b981',
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontSize: '18px',
                  color: '#9ca3af',
                }}>
                  {plan.period}
                </span>
              </div>

              <Link href="/signup" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: plan.popular 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'rgba(45, 53, 72, 0.8)',
                color: '#e8eaed',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '16px',
                marginBottom: '32px',
                border: plan.popular ? 'none' : '1px solid #374151',
              }}>
                {plan.cta}
                <ArrowRight size={18} />
              </Link>

              <div style={{
                paddingTop: '32px',
                borderTop: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#e8eaed', marginBottom: '16px' }}>
                  What's included:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}>
                      <Check size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: '#9ca3af', fontSize: '14px' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{
        padding: '80px 40px',
        background: 'rgba(26, 31, 46, 0.6)',
        borderTop: '1px solid rgba(16, 185, 129, 0.2)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '48px',
            color: '#e8eaed',
          }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                q: 'What happens after the free trial?',
                a: 'After your 14-day free trial, you\'ll be automatically moved to your selected plan. You can cancel anytime before the trial ends with no charges.',
              },
              {
                q: 'Can I change plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the charges.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, Amex) and wire transfers for Enterprise plans.',
              },
              {
                q: 'Is there a setup fee?',
                a: 'No setup fees for any plan. You only pay for what you use.',
              },
              {
                q: 'What if I exceed my plan limits?',
                a: 'We\'ll notify you when you reach 80% of your limit. You can upgrade anytime or purchase additional verifications at $0.10 per video.',
              },
            ].map((faq, idx) => (
              <div key={idx} style={{
                padding: '24px',
                background: 'rgba(15, 20, 25, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#e8eaed',
                }}>
                  {faq.q}
                </h3>
                <p style={{
                  color: '#9ca3af',
                  lineHeight: '1.6',
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#e8eaed',
        }}>
          Still have questions?
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#9ca3af',
          marginBottom: '32px',
        }}>
          Our team is here to help you choose the right plan
        </p>
        <Link href="/contact" style={{
          padding: '14px 32px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#e8eaed',
          borderRadius: '10px',
          fontWeight: '600',
          fontSize: '16px',
          display: 'inline-block',
        }}>
          Contact Sales
        </Link>
      </section>
    </div>
  );
}
