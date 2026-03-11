'use client';
import { Shield, Zap, Lock, CheckCircle, ArrowRight, Play, BarChart3, Globe } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from './utils/useIsMobile';
import { MobileNav, DesktopNav } from './components/Navigation';
import { StructuredData } from './components/StructuredData';

export default function HomePage() {
  const isMobile = useIsMobile();

  return (
    <div>
      <StructuredData />
      {isMobile ? <MobileNav /> : <DesktopNav />}

      <section style={{
        marginTop: isMobile ? '60px' : '80px',
        padding: isMobile ? '60px 20px' : '100px 40px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: isMobile ? '36px' : '64px',
            fontWeight: 'bold',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2',
          }}>
            Stop Video KYC Fraud{isMobile ? ' ' : <br />}Before It Happens
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '24px',
            color: '#9ca3af',
            marginBottom: '48px',
            lineHeight: '1.6',
            padding: isMobile ? '0 10px' : '0',
          }}>
            Enterprise-grade AI fraud detection for video verification.{isMobile ? ' ' : <br />}
            Detect deepfakes, replay attacks, and identity fraud in real-time.
          </p>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', justifyContent: 'center', padding: isMobile ? '0 20px' : '0' }}>
            <Link href="/signup" style={{
              padding: isMobile ? '14px 32px' : '16px 40px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#e8eaed',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: isMobile ? '16px' : '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
            }}>
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
            <Link href="/demo" style={{
              padding: isMobile ? '14px 32px' : '16px 40px',
              background: 'rgba(45, 53, 72, 0.8)',
              color: '#e8eaed',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: isMobile ? '16px' : '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: '1px solid #374151',
            }}>
              <Play size={20} />
              Watch Demo
            </Link>
          </div>
          <p style={{ marginTop: '24px', color: '#6b7280', fontSize: isMobile ? '12px' : '14px', padding: isMobile ? '0 20px' : '0' }}>
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px 40px',
        textAlign: 'center',
        background: 'rgba(26, 31, 46, 0.4)',
      }}>
        <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px', marginBottom: '32px' }}>
          Trusted by fintech and security teams worldwide
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: isMobile ? '32px' : '48px',
          alignItems: 'center',
        }}>
          {['Stripe', 'Coinbase', 'Revolut', 'N26', 'Wise'].map((company) => (
            <div key={company} style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '600',
              color: '#6b7280',
              opacity: 0.6,
            }}>
              {company}
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: isMobile ? '40px 20px' : '60px 40px',
        background: 'rgba(26, 31, 46, 0.6)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(16, 185, 129, 0.2)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '24px' : '40px',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>99.7%</div>
            <div style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '16px' }}>Detection Accuracy</div>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>&lt;2s</div>
            <div style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '16px' }}>Average Processing</div>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>10M+</div>
            <div style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '16px' }}>Videos Analyzed</div>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>500+</div>
            <div style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '16px' }}>Enterprise Clients</div>
          </div>
        </div>
      </section>

      {/* Product Screenshot Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            See FrameSentinel in Action
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Real-time fraud detection dashboard
          </p>
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: isMobile ? '20px' : '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)',
              borderRadius: '12px',
              padding: isMobile ? '40px 20px' : '80px 40px',
              textAlign: 'center',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}>
              <BarChart3 size={isMobile ? 48 : 64} color="#10b981" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: isMobile ? '20px' : '24px', color: '#e8eaed', marginBottom: '12px' }}>
                Dashboard Preview
              </h3>
              <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px' }}>
                Real-time fraud detection results, risk scoring, and detailed analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'rgba(26, 31, 46, 0.4)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            How It Works
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Three simple steps to fraud-free verification
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '32px' : '40px' }}>
            {[
              { step: '1', title: 'Upload verification video', description: 'Send video via API or SDK integration', icon: '📹' },
              { step: '2', title: 'AI analyzes frames', description: '5 detection modules run in parallel', icon: '🤖' },
              { step: '3', title: 'Receive fraud score', description: 'Get instant results via webhook', icon: '✅' },
            ].map((item) => (
              <div key={item.step} style={{
                textAlign: 'center',
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <div style={{
                  width: isMobile ? '60px' : '80px',
                  height: isMobile ? '60px' : '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '28px' : '36px',
                  margin: '0 auto 24px',
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#10b981',
                  fontWeight: '600',
                  marginBottom: '12px',
                }}>
                  STEP {item.step}
                </div>
                <h3 style={{ fontSize: isMobile ? '18px' : '20px', color: '#e8eaed', marginBottom: '12px', fontWeight: '600' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: isMobile ? '60px 20px' : '100px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            5 Detection Modules, 1 API
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
            padding: isMobile ? '0 10px' : '0',
          }}>
            Comprehensive fraud detection powered by advanced AI
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '20px' : '30px' }}>
            {[
              {
                icon: Shield,
                title: 'Deepfake Detection',
                description: 'AI-powered detection of synthetic faces and manipulated videos with 99.7% accuracy',
              },
              {
                icon: Zap,
                title: 'Replay Attack Prevention',
                description: 'Identify screen recordings and pre-recorded videos attempting to bypass verification',
              },
              {
                icon: Lock,
                title: 'Face Swap Detection',
                description: 'Detect identity swaps and face replacement attacks in real-time',
              },
              {
                icon: CheckCircle,
                title: 'Injection Detection',
                description: 'Identify video stream manipulation and injection attacks',
              },
              {
                icon: BarChart3,
                title: 'Metadata Integrity',
                description: 'Verify file authenticity and detect tampering through metadata analysis',
              },
              {
                icon: Globe,
                title: 'Real-time Processing',
                description: 'Sub-2-second analysis with instant webhook notifications',
              },
            ].map((feature, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <feature.icon size={40} color="#10b981" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#e8eaed' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Integrate in minutes
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Simple REST API with SDKs for all major languages
          </p>
          <div style={{
            background: '#1a1f2e',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: isMobile ? '20px' : '32px',
            overflow: 'auto',
          }}>
            <pre style={{
              color: '#e8eaed',
              fontSize: isMobile ? '12px' : '14px',
              lineHeight: '1.6',
              margin: 0,
              fontFamily: 'monospace',
            }}>
{`const session = await fetch('https://api.framesentinel.com/v1/sessions', {
  method: 'POST',
  headers: { 'X-API-Key': 'your_api_key' },
  body: JSON.stringify({ user_id: 'user_123' })
});

const formData = new FormData();
formData.append('video', videoFile);

await fetch(\`/v1/sessions/\${session.id}/upload\`, {
  method: 'POST',
  headers: { 'X-API-Key': 'your_api_key' },
  body: formData
});

const result = await fetch(\`/v1/sessions/\${session.id}/result\`);
console.log(result.authenticity_score); // 0.95`}
            </pre>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Simple, transparent pricing
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Choose the plan that fits your needs
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? '20px' : '24px' }}>
            {[
              { name: 'Free', price: '$0', videos: '100 videos/mo' },
              { name: 'Starter', price: '$19', videos: '1,000 videos/mo', popular: true },
              { name: 'Growth', price: '$59', videos: '10,000 videos/mo' },
              { name: 'Enterprise', price: 'Custom', videos: 'Unlimited' },
            ].map((plan) => (
              <div key={plan.name} style={{
                padding: '32px',
                background: plan.popular ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)' : 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: plan.popular ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.2)',
                position: 'relative',
                textAlign: 'center',
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#10b981',
                    color: '#000',
                    padding: '4px 16px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: '20px', color: '#e8eaed', marginBottom: '8px', fontWeight: '600' }}>
                  {plan.name}
                </h3>
                <div style={{ fontSize: isMobile ? '32px' : '40px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
                  {plan.price}
                  {plan.price !== 'Custom' && <span style={{ fontSize: '16px', color: '#9ca3af' }}>/mo</span>}
                </div>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                  {plan.videos}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/pricing" style={{
              color: '#10b981',
              fontSize: '16px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              View detailed pricing
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Enterprise-grade security
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Your data security is our top priority
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '24px' : '32px' }}>
            {[
              { icon: '🔒', title: 'SOC 2 Ready', description: 'Industry-standard security controls' },
              { icon: '🛡️', title: 'GDPR Compliant', description: 'EU data protection regulations' },
              { icon: '🔐', title: 'Encrypted Processing', description: 'End-to-end encryption' },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: isMobile ? '40px' : '48px', marginBottom: '16px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: isMobile ? '18px' : '20px', color: '#e8eaed', marginBottom: '12px', fontWeight: '600' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Try FrameSentinel Fraud Detection
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Upload a video and see our AI in action
          </p>
          <div style={{
            background: 'rgba(26, 31, 46, 0.8)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: isMobile ? '32px 20px' : '48px',
            textAlign: 'center',
          }}>
            <div style={{
              border: '2px dashed rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: isMobile ? '40px 20px' : '60px 40px',
              marginBottom: '24px',
              background: 'rgba(16, 185, 129, 0.05)',
            }}>
              <Play size={isMobile ? 48 : 64} color="#10b981" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: isMobile ? '18px' : '20px', color: '#e8eaed', marginBottom: '12px' }}>
                Upload verification video
              </h3>
              <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px', marginBottom: '24px' }}>
                Supported: MP4, AVI, MOV, WEBM (max 100MB)
              </p>
              <Link href="/demo" style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#e8eaed',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                Try Live Demo
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Second CTA */}
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
            Start detecting AI fraud today
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            marginBottom: '40px',
            padding: isMobile ? '0 20px' : '0',
          }}>
            Join 500+ companies protecting their users
          </p>
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
            Ready to Secure Your KYC?
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            marginBottom: '40px',
            padding: isMobile ? '0 20px' : '0',
          }}>
            Join 500+ companies protecting their users with FrameSentinel
          </p>
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
              <Link href="/careers" style={{ color: '#9ca3af', fontSize: '14px' }}>Careers</Link>
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
