'use client';
import { Check, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';
import { useState } from 'react';

export default function PricingPage() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for testing and small projects',
      features: [
        '200 video verifications/month',
        'All 5 detection modules',
        'API access',
        'Email support',
        '$0.02 per extra verification',
      ],
      cta: 'Get Started Free',
      popular: false,
      variantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_FREE_VARIANT_ID,
    },
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      description: 'For startups and small teams',
      features: [
        '2,000 video verifications/month',
        'All 5 detection modules',
        'API access',
        'Webhook notifications',
        'Email support',
        '$0.015 per extra verification',
      ],
      cta: 'Start Free Trial',
      popular: false,
      variantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STARTER_VARIANT_ID,
    },
    {
      name: 'Growth',
      price: '$59',
      period: '/month',
      description: 'For growing businesses',
      features: [
        '10,000 video verifications/month',
        'All 5 detection modules',
        'Priority API access',
        'Webhook notifications',
        'Priority support',
        '$0.01 per extra verification',
      ],
      cta: 'Start Free Trial',
      popular: true,
      variantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_GROWTH_VARIANT_ID,
    },
    {
      name: 'Pro',
      price: '$149',
      period: '/month',
      description: 'For high-volume operations',
      features: [
        '50,000 video verifications/month',
        'All 5 detection modules',
        'Priority API access',
        'Webhook notifications',
        'Priority support',
        '99.9% SLA',
        '$0.008 per extra verification',
      ],
      cta: 'Start Free Trial',
      popular: false,
      variantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_VARIANT_ID,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale operations',
      features: [
        'Custom volume',
        'All 5 detection modules',
        'Dedicated infrastructure',
        'Custom SLA (up to 99.99%)',
        '24/7 phone support',
        'On-premise deployment option',
        'Custom pricing',
      ],
      cta: 'Contact Sales',
      popular: false,
      variantId: null,
    },
  ];

  const handleCheckout = async (plan: typeof plans[0]) => {
    if (plan.name === 'Enterprise') {
      window.location.href = '/contact';
      return;
    }

    if (plan.name === 'Free') {
      window.location.href = '/signup';
      return;
    }

    if (!plan.variantId) {
      alert('This plan is not configured yet. Please contact support.');
      return;
    }

    setLoading(plan.name);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId: plan.variantId,
          customData: {
            plan: plan.name,
          },
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || 'Failed to create checkout');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to start checkout');
      setLoading(null);
    }
  };

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}

      <section style={{
        marginTop: isMobile ? '60px' : '80px',
        padding: isMobile ? '60px 20px 40px' : '80px 40px 60px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: isMobile ? '36px' : '56px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{
          fontSize: isMobile ? '16px' : '20px',
          color: '#9ca3af',
          marginBottom: '16px',
          padding: isMobile ? '0 10px' : '0',
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

      <section style={{ padding: isMobile ? '20px' : '40px 40px 100px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '24px' : '30px',
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

              <button
                onClick={() => handleCheckout(plan)}
                disabled={loading === plan.name}
                style={{
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
                  cursor: loading === plan.name ? 'wait' : 'pointer',
                  opacity: loading === plan.name ? 0.7 : 1,
                  width: '100%',
                }}
              >
                {loading === plan.name ? 'Loading...' : plan.cta}
                <ArrowRight size={18} />
              </button>

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
                a: 'We\'ll notify you when you reach 80% of your limit. You can upgrade anytime or pay for extra verifications at the per-verification rate for your plan.',
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
