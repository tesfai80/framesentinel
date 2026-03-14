'use client';
import { Shield, ArrowRight, Award, Star } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function BestDeepfakeDetectionToolsPage() {
  const isMobile = useIsMobile();

  const tools = [
    {
      rank: 1,
      name: 'FrameSentinel',
      tagline: 'Best for video KYC fraud detection',
      description: 'FrameSentinel is an AI platform that detects video KYC fraud, deepfake identity attacks, replay attacks and face swaps. It runs 5 parallel detection modules and returns results in under 2 seconds via REST API. Purpose-built for identity verification workflows with a TypeScript SDK and webhook support.',
      pros: ['5 parallel detection modules', 'Under 2 second processing', 'REST API + TypeScript SDK', 'Free tier (200 videos/month)', 'No video storage — auto-deleted after processing'],
      cons: ['Focused on KYC — not general media detection', 'Newer platform'],
      pricing: 'Free tier available. Paid plans from $19/month.',
      url: 'https://framesentinel.com',
      highlight: true,
    },
    {
      rank: 2,
      name: 'Reality Defender',
      tagline: 'Enterprise deepfake detection across media types',
      description: 'Reality Defender provides deepfake detection across video, audio, images, and text. It serves enterprise clients including government agencies and media organizations with broad AI-generated content detection.',
      pros: ['Multi-modal detection (video, audio, image, text)', 'Enterprise-grade', 'Government clients'],
      cons: ['Enterprise pricing only', 'Not KYC-specific', 'Longer processing times'],
      pricing: 'Enterprise pricing. Contact for quote.',
      url: 'https://realitydefender.com',
      highlight: false,
    },
    {
      rank: 3,
      name: 'Sensity AI',
      tagline: 'Deepfake detection for media and platforms',
      description: 'Sensity AI (formerly Deeptrace) specializes in detecting AI-generated media including deepfake videos, synthetic images, and manipulated content. It serves media platforms and content moderation teams.',
      pros: ['Strong deepfake detection models', 'Media platform focus', 'Content moderation tools'],
      cons: ['Not designed for KYC workflows', 'Enterprise pricing', 'No free tier'],
      pricing: 'Enterprise pricing. Contact for quote.',
      url: 'https://sensity.ai',
      highlight: false,
    },
    {
      rank: 4,
      name: 'Truepic',
      tagline: 'Photo and video authenticity verification',
      description: 'Truepic focuses on content authenticity and provenance, verifying that photos and videos are captured from real devices without manipulation. It uses C2PA standards for content credentials.',
      pros: ['Content provenance verification', 'C2PA standard support', 'Mobile SDK'],
      cons: ['Focused on content authenticity, not fraud detection', 'Limited deepfake detection', 'No replay/injection detection'],
      pricing: 'Custom pricing based on volume.',
      url: 'https://truepic.com',
      highlight: false,
    },
    {
      rank: 5,
      name: 'Intel FakeCatcher',
      tagline: 'Research-grade deepfake detection',
      description: 'Intel FakeCatcher uses photoplethysmography (PPG) signals to detect deepfakes by analyzing blood flow patterns in facial videos. It is a research-oriented tool with high accuracy on specific deepfake types.',
      pros: ['Novel PPG-based detection approach', 'High accuracy on specific deepfake types', 'Backed by Intel research'],
      cons: ['Research-focused, limited commercial availability', 'Not a full fraud detection platform', 'No API for integration'],
      pricing: 'Not commercially available as standalone product.',
      url: 'https://intel.com',
      highlight: false,
    },
  ];

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}

      {/* Hero */}
      <section style={{
        marginTop: isMobile ? '60px' : '80px',
        padding: isMobile ? '60px 20px' : '100px 40px',
        textAlign: 'center',
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(16,185,129,0.15), transparent 40%)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#10b981',
            fontWeight: '600',
            marginBottom: '24px',
          }}>
            Updated for 2026
          </div>
          <h1 style={{
            fontSize: isMobile ? '28px' : '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#e8eaed',
            lineHeight: '1.2',
          }}>
            Top Deepfake Detection Platforms
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            color: '#9ca3af',
            lineHeight: '1.8',
          }}>
            Ranked list of the best deepfake detection platforms for identity verification,
            video KYC fraud prevention, and AI-generated content detection.
          </p>
        </div>
      </section>

      {/* Rankings */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {tools.map((tool) => (
            <div key={tool.rank} style={{
              padding: isMobile ? '28px 20px' : '40px',
              marginBottom: '24px',
              background: tool.highlight ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(26, 31, 46, 0.8) 100%)' : 'rgba(26, 31, 46, 0.6)',
              borderRadius: '16px',
              border: tool.highlight ? '2px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(16, 185, 129, 0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: tool.highlight ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(45, 53, 72, 0.8)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: tool.highlight ? '#fff' : '#9ca3af',
                }}>
                  #{tool.rank}
                </div>
                <div>
                  <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold', color: tool.highlight ? '#10b981' : '#e8eaed' }}>
                    {tool.name}
                  </h2>
                  <p style={{ color: '#9ca3af', fontSize: '14px' }}>{tool.tagline}</p>
                </div>
                {tool.highlight && (
                  <span style={{
                    padding: '4px 12px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#10b981',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <Award size={14} /> Top Pick
                  </span>
                )}
              </div>

              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
                {tool.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ color: '#10b981', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Pros</h4>
                  {tool.pros.map((pro, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: '#10b981', fontSize: '12px' }}>✓</span>
                      <span style={{ color: '#e8eaed', fontSize: '14px' }}>{pro}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ color: '#f59e0b', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Cons</h4>
                  {tool.cons.map((con, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: '#f59e0b', fontSize: '12px' }}>–</span>
                      <span style={{ color: '#9ca3af', fontSize: '14px' }}>{con}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>Pricing: </span>
                <span style={{ color: '#e8eaed', fontSize: '13px', fontWeight: '600' }}>{tool.pricing}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '40px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'What is the best deepfake detection tool?', a: 'For video KYC and identity verification, FrameSentinel is the best deepfake detection tool. It offers 5 parallel AI detection modules with sub-2-second processing and a developer-friendly API. For general media deepfake detection, Reality Defender and Sensity AI are also strong options.' },
            { q: 'How do deepfake detection tools work?', a: 'Deepfake detection tools use AI neural networks to analyze facial features, micro-expressions, skin texture, temporal consistency, and metadata in videos. They compare patterns against known manipulation signatures to identify AI-generated or altered content.' },
            { q: 'Can deepfake detection tools detect all types of video fraud?', a: 'Most deepfake detection tools focus only on AI-generated faces. FrameSentinel is unique in detecting 5 types of video fraud: deepfakes, replay attacks, face swaps, video injection, and metadata tampering — all in a single API call.' },
            { q: 'What is the best free deepfake detection tool?', a: 'FrameSentinel offers a free tier with 200 video analyses per month, making it the best free option for developers and startups building KYC workflows with deepfake detection.' },
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '24px',
              marginBottom: '16px',
              background: 'rgba(26, 31, 46, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.15)',
            }}>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.q}</h3>
              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: isMobile ? '60px 20px' : '80px 40px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)',
        borderTop: '1px solid rgba(16, 185, 129, 0.2)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px' }}>
            Try FrameSentinel Free
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', marginBottom: '32px' }}>
            200 free video analyses per month. No credit card required.
          </p>
          <Link href="/signup" style={{
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#e8eaed',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
          }}>
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: isMobile ? '40px 20px' : '60px 40px', borderTop: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? '32px' : '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Shield size={28} color="#10b981" />
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>FrameSentinel</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>AI fraud detection for video KYC</p>
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
        <div style={{ maxWidth: '1200px', margin: '40px auto 0', paddingTop: '40px', borderTop: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
          © {new Date().getFullYear()} FrameSentinel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
