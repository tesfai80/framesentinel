'use client';
import { Shield, Zap, Lock, CheckCircle, ArrowRight, Play, BarChart3, Globe, Upload, Image, Cpu, Target, Bell, Key, Clock, Database, FileCheck, Award, Cloud, ShieldCheck, Building2, Coins, ShoppingCart, Users } from 'lucide-react';
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
        backgroundImage: `
          radial-gradient(circle at 30% 20%, rgba(16,185,129,0.15), transparent 40%),
          radial-gradient(circle at 70% 60%, rgba(59,130,246,0.10), transparent 40%),
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, auto, 40px 40px, 40px 40px',
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
            fontSize: isMobile ? '18px' : '28px',
            color: '#10b981',
            marginBottom: '16px',
            fontWeight: '600',
          }}>
            Developer-first fraud detection API
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '24px',
            color: '#9ca3af',
            marginBottom: '48px',
            lineHeight: '1.6',
            padding: isMobile ? '0 10px' : '0',
          }}>
            AI fraud detection platform for video KYC and identity verification.{isMobile ? ' ' : <br />}
            Infrastructure for detecting AI identity fraud in modern KYC systems.
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

      {/* Ecosystem Section */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px 40px',
        textAlign: 'center',
        background: 'rgba(26, 31, 46, 0.4)',
      }}>
        <p style={{ color: '#10b981', fontSize: isMobile ? '13px' : '14px', marginBottom: '20px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Built by the team behind multiple security platforms
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '16px' : '24px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { name: 'FrameSentinel', desc: 'AI fraud detection for video KYC' },
            { name: 'SaaSRX', desc: 'SaaS security intelligence platform' },
            { name: 'GenDetect', desc: 'AI media authenticity detection' },
          ].map((product) => (
            <div key={product.name} style={{
              padding: '20px',
              background: 'rgba(26, 31, 46, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}>
              <div style={{ color: '#10b981', fontSize: isMobile ? '16px' : '18px', fontWeight: '600', marginBottom: '8px' }}>
                {product.name}
              </div>
              <div style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '14px' }}>
                {product.desc}
              </div>
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
            <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>Advanced AI Detection</div>
            <div style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '14px' }}>5 detection modules</div>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>Sub-2s Processing</div>
            <div style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '14px' }}>Real-time results</div>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>API-First Platform</div>
            <div style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '14px' }}>REST API + SDKs</div>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>Built for Modern KYC</div>
            <div style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '14px' }}>Enterprise ready</div>
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
            padding: isMobile ? '12px' : '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}>
            <img 
              src="/framesentinel-admin-dashboard.png" 
              alt="FrameSentinel Dashboard - Real-time fraud detection analytics"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Built for modern identity platforms
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            FrameSentinel powers fraud detection for fintech, crypto exchanges, marketplaces and identity providers
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '24px' : '32px' }}>
            {[
              {
                icon: Building2,
                title: 'Fintech Onboarding',
                description: 'Detect deepfake identity verification attempts',
              },
              {
                icon: Coins,
                title: 'Crypto KYC',
                description: 'Prevent replay attacks in video verification',
              },
              {
                icon: ShoppingCart,
                title: 'Marketplaces',
                description: 'Stop account takeover and synthetic identity fraud',
              },
              {
                icon: Users,
                title: 'Identity Platforms',
                description: 'Add AI fraud detection to your KYC workflow',
              },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                transition: 'all 0.3s',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 40px rgba(16,185,129,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(16,185,129,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4), 0 0 40px rgba(16,185,129,0.08)';
              }}>
                <item.icon size={isMobile ? 40 : 48} color="#10b981" strokeWidth={2} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: isMobile ? '20px' : '24px', color: '#e8eaed', marginBottom: '12px', fontWeight: '600' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: isMobile ? '15px' : '16px', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: isMobile ? '40px' : '60px', textAlign: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? '16px' : '24px', maxWidth: '900px', margin: '0 auto' }}>
              {[
                'Detect deepfake identity attacks',
                'Prevent replay video verification bypass',
                'Analyze video authenticity in real time',
                'Integrate in minutes via API',
              ].map((feature, idx) => (
                <div key={idx} style={{
                  padding: '20px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <CheckCircle size={16} />
                  {feature}
                </div>
              ))}
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
            How the detection pipeline works
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Enterprise-grade fraud detection infrastructure
          </p>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '0' : '24px', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { step: '1', title: 'Video Upload', icon: Upload, color: '#10b981' },
              { step: '2', title: 'Frame Extraction', icon: Image, color: '#10b981' },
              { step: '3', title: '5 AI Detection Models', icon: Cpu, color: '#10b981' },
              { step: '4', title: 'Risk Scoring Engine', icon: Target, color: '#10b981' },
              { step: '5', title: 'Webhook Response', icon: Bell, color: '#10b981' },
            ].map((item, idx) => (
              <div key={item.step} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '0', width: isMobile ? '100%' : 'auto' }}>
                <div style={{
                  padding: isMobile ? '24px' : '28px',
                  background: 'rgba(26, 31, 46, 0.8)',
                  borderRadius: '16px',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  textAlign: 'center',
                  minWidth: isMobile ? '100%' : '180px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}>
                    <item.icon size={isMobile ? 36 : 44} color={item.color} strokeWidth={2} />
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#10b981',
                    fontWeight: '700',
                    marginBottom: '10px',
                    letterSpacing: '1px',
                  }}>
                    STEP {item.step}
                  </div>
                  <div style={{ fontSize: isMobile ? '14px' : '15px', color: '#e8eaed', fontWeight: '600', lineHeight: '1.4' }}>
                    {item.title}
                  </div>
                </div>
                {idx < 4 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: isMobile ? '12px 0' : '0 16px',
                  }}>
                    <ArrowRight size={isMobile ? 28 : 32} color="#10b981" strokeWidth={2.5} />
                  </div>
                )}
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
                boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 40px rgba(16,185,129,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(16,185,129,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4), 0 0 40px rgba(16,185,129,0.08)';
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

      {/* Integration Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Integrates with your existing stack
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Works with modern infrastructure
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: isMobile ? '16px' : '24px', maxWidth: '900px', margin: '0 auto' }}>
            {['REST API', 'Webhooks', 'AWS', 'GCP', 'Azure', 'Kubernetes', 'Serverless', 'Cloud Storage', 'Identity Providers', 'Fraud Systems'].map((tech) => (
              <div key={tech} style={{
                padding: isMobile ? '16px' : '20px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                textAlign: 'center',
                color: '#10b981',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
              }}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px' }}>
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
            Simple 3-step integration
          </p>
          
          {/* 3 Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '20px' : '32px', marginBottom: isMobile ? '40px' : '60px' }}>
            {[
              { step: '1', title: 'Upload verification video', icon: Upload },
              { step: '2', title: 'FrameSentinel analyzes the video', icon: Cpu },
              { step: '3', title: 'Receive fraud score via API or webhook', icon: Bell },
            ].map((item) => (
              <div key={item.step} style={{
                padding: '28px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <item.icon size={isMobile ? 40 : 48} color="#10b981" strokeWidth={2} />
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#10b981',
                  fontWeight: '700',
                  marginBottom: '12px',
                  letterSpacing: '1px',
                }}>
                  STEP {item.step}
                </div>
                <h3 style={{ fontSize: isMobile ? '16px' : '18px', color: '#e8eaed', fontWeight: '600', lineHeight: '1.4' }}>
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Code Example */}
          <div style={{
            background: '#0d1117',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: isMobile ? '20px' : '32px',
            overflow: 'auto',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: '12px', fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>api-integration.js</span>
            </div>
            <pre style={{
              fontSize: isMobile ? '12px' : '14px',
              lineHeight: '1.7',
              margin: 0,
              fontFamily: '"Fira Code", "Consolas", monospace',
            }}>
              <span style={{ color: '#8b949e' }}>// Simple API integration</span>{'\n'}
              <span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#79c0ff' }}>result</span> <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#ff7b72' }}>await</span> <span style={{ color: '#d2a8ff' }}>framesentinel</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#d2a8ff' }}>verify</span><span style={{ color: '#e8eaed' }}>(</span><span style={{ color: '#79c0ff' }}>video</span><span style={{ color: '#e8eaed' }}>)</span><span style={{ color: '#ff7b72' }}>;</span>{'\n\n'}
              <span style={{ color: '#79c0ff' }}>console</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#d2a8ff' }}>log</span><span style={{ color: '#e8eaed' }}>(</span><span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>authenticity_score</span><span style={{ color: '#e8eaed' }}>)</span><span style={{ color: '#ff7b72' }}>;</span>  <span style={{ color: '#8b949e' }}>// 0.95</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>console</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#d2a8ff' }}>log</span><span style={{ color: '#e8eaed' }}>(</span><span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>risk_level</span><span style={{ color: '#e8eaed' }}>)</span><span style={{ color: '#ff7b72' }}>;</span>          <span style={{ color: '#8b949e' }}>// "VERIFIED"</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>console</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#d2a8ff' }}>log</span><span style={{ color: '#e8eaed' }}>(</span><span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>detection_flags</span><span style={{ color: '#e8eaed' }}>)</span><span style={{ color: '#ff7b72' }}>;</span>     <span style={{ color: '#8b949e' }}>// {'{'} deepfake: false, ... {'}'}</span>
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

      {/* Security & Compliance Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Enterprise-grade security & compliance
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            Your data security is our top priority
          </p>
          
          {/* Data Security */}
          <div style={{ marginBottom: isMobile ? '40px' : '60px' }}>
            <h3 style={{
              fontSize: isMobile ? '24px' : '28px',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '32px',
              color: '#10b981',
            }}>
              Data Security
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '20px' : '24px' }}>
              {[
                { icon: Lock, title: 'Encrypted video uploads', description: 'TLS 1.3 in transit + AES-256 storage encryption' },
                { icon: Clock, title: 'Short data retention', description: 'Videos deleted after 30 days, configurable retention policies' },
                { icon: Key, title: 'Secure API authentication', description: 'API key authentication with rate limiting and IP whitelisting' },
                { icon: Database, title: 'GDPR-aligned data handling', description: 'EU data residency options, data deletion on request' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '24px',
                  background: 'rgba(26, 31, 46, 0.6)',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ flexShrink: 0 }}>
                    <item.icon size={isMobile ? 32 : 36} color="#10b981" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: isMobile ? '16px' : '18px', color: '#e8eaed', marginBottom: '8px', fontWeight: '600' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detection Transparency */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: isMobile ? '32px 20px' : '48px',
            textAlign: 'center',
          }}>
            <h3 style={{
              fontSize: isMobile ? '24px' : '28px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#10b981',
            }}>
              Detection Transparency
            </h3>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#e8eaed',
              marginBottom: '24px',
              lineHeight: '1.8',
            }}>
              FrameSentinel does not make automatic approval decisions.
            </p>
            <p style={{
              fontSize: isMobile ? '15px' : '16px',
              color: '#9ca3af',
              marginBottom: '32px',
              lineHeight: '1.8',
            }}>
              Instead, it provides:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? '16px' : '20px', maxWidth: '900px', margin: '0 auto' }}>
              {[
                'Authenticity score',
                'Risk level classification',
                'Tamper timeline',
                'Detection flags',
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '16px',
                  background: 'rgba(26, 31, 46, 0.6)',
                  borderRadius: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: '600',
                }}>
                  {item}
                </div>
              ))}
            </div>
            <p style={{
              fontSize: isMobile ? '15px' : '16px',
              color: '#10b981',
              marginTop: '32px',
              fontWeight: '600',
            }}>
              Your system remains in control of the final decision.
            </p>
          </div>

          {/* Compliance Badges */}
          <div style={{ marginTop: isMobile ? '40px' : '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '24px' : '32px' }}>
              {[
                { icon: FileCheck, title: 'SOC 2 Ready' },
                { icon: Cloud, title: 'Cloud Security' },
                { icon: ShieldCheck, title: 'End-to-end Encryption' },
                { icon: Award, title: 'ISO 27001 Aligned' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '24px',
                  background: 'rgba(26, 31, 46, 0.6)',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  textAlign: 'center',
                }}>
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                    <item.icon size={isMobile ? 40 : 48} color="#10b981" strokeWidth={2} />
                  </div>
                  <h4 style={{ fontSize: isMobile ? '16px' : '18px', color: '#e8eaed', fontWeight: '600' }}>
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
          }}>
            Our mission
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            lineHeight: '1.8',
            marginBottom: '24px',
          }}>
            FrameSentinel was created to solve the growing problem of AI-powered identity fraud.
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            lineHeight: '1.8',
            marginBottom: '24px',
          }}>
            As video verification becomes the standard for KYC, attackers are increasingly using deepfakes, replay attacks and synthetic identities.
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#10b981',
            lineHeight: '1.8',
            fontWeight: '600',
          }}>
            FrameSentinel provides infrastructure for detecting these threats in real-time through an API-first platform designed for modern identity systems.
          </p>
        </div>
      </section>

      {/* Roadmap Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#e8eaed',
          }}>
            Product roadmap
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
          }}>
            What we're building next
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '24px' : '32px' }}>
            {[
              {
                quarter: 'Q2 2026',
                items: ['Advanced deepfake detection models', 'SDK improvements', 'Enhanced webhook system'],
              },
              {
                quarter: 'Q3 2026',
                items: ['Real-time streaming verification', 'Additional fraud detection modules', 'Mobile SDK'],
              },
              {
                quarter: 'Q4 2026',
                items: ['Enterprise risk engine', 'Expanded integrations', 'Advanced analytics dashboard'],
              },
            ].map((roadmap) => (
              <div key={roadmap.quarter} style={{
                padding: '32px',
                background: 'rgba(26, 31, 46, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}>
                <div style={{
                  color: '#10b981',
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  marginBottom: '20px',
                }}>
                  {roadmap.quarter}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {roadmap.items.map((item, idx) => (
                    <li key={idx} style={{
                      color: '#9ca3af',
                      fontSize: isMobile ? '14px' : '15px',
                      marginBottom: '12px',
                      paddingLeft: '20px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#10b981',
                      }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
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

      {/* Final CTA */}
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
            Start protecting your users from AI identity fraud today
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
          <p style={{ marginTop: '20px', color: '#6b7280', fontSize: isMobile ? '13px' : '14px' }}>
            No credit card required • 14-day free trial
          </p>
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
