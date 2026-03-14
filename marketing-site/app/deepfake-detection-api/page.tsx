'use client';
import { Shield, ArrowRight, Code, Zap, Lock, CheckCircle, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '../utils/useIsMobile';
import { MobileNav, DesktopNav } from '../components/Navigation';

export default function DeepfakeDetectionAPIPage() {
  const isMobile = useIsMobile();

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
          <h1 style={{ fontSize: isMobile ? '32px' : '56px', fontWeight: 'bold', marginBottom: '24px', color: '#e8eaed', lineHeight: '1.2' }}>
            Deepfake Detection API for Video Verification
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#9ca3af', lineHeight: '1.8', marginBottom: '40px' }}>
            FrameSentinel provides a deepfake detection API that detects AI video manipulation, face swaps, replay attacks,
            and video injection. Integrate video fraud detection into your KYC workflow with a single API call.
          </p>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', justifyContent: 'center' }}>
            <Link href="/signup" style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#e8eaed', borderRadius: '12px', fontWeight: '600', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
              Get API Key Free <ArrowRight size={20} />
            </Link>
            <Link href="/docs" style={{ padding: '16px 40px', background: 'rgba(45, 53, 72, 0.8)', color: '#e8eaed', borderRadius: '12px', fontWeight: '600', fontSize: '16px', border: '1px solid #374151' }}>
              API Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* API Code Example */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px', textAlign: 'center' }}>
            Deepfake Detection in 3 Lines of Code
          </h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', textAlign: 'center', marginBottom: '40px' }}>
            The deepfake detection API is designed for developers. Upload a video, get fraud analysis results.
          </p>
          <div style={{ background: '#0d1117', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)', padding: isMobile ? '20px' : '32px', overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: '12px', fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>deepfake-detection.ts</span>
            </div>
            <pre style={{ fontSize: isMobile ? '12px' : '14px', lineHeight: '1.8', margin: 0, fontFamily: '"Fira Code", "Consolas", monospace' }}>
              <span style={{ color: '#8b949e' }}>{'// Initialize the deepfake detection API'}</span>{'\n'}
              <span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#79c0ff' }}>client</span> <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>FrameSentinel</span><span style={{ color: '#e8eaed' }}>(</span><span style={{ color: '#a5d6ff' }}>{'{ apiKey: \'your-key\' }'}</span><span style={{ color: '#e8eaed' }}>)</span><span style={{ color: '#ff7b72' }}>;</span>{'\n\n'}
              <span style={{ color: '#8b949e' }}>{'// Upload video for deepfake detection'}</span>{'\n'}
              <span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#79c0ff' }}>result</span> <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#ff7b72' }}>await</span> <span style={{ color: '#79c0ff' }}>client</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#d2a8ff' }}>verify</span><span style={{ color: '#e8eaed' }}>(</span><span style={{ color: '#79c0ff' }}>videoFile</span><span style={{ color: '#e8eaed' }}>)</span><span style={{ color: '#ff7b72' }}>;</span>{'\n\n'}
              <span style={{ color: '#8b949e' }}>{'// API response'}</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>authenticity_score</span>  <span style={{ color: '#8b949e' }}>{'// 0.95'}</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>risk_level</span>          <span style={{ color: '#8b949e' }}>{'// "VERIFIED"'}</span>{'\n'}
              <span style={{ color: '#79c0ff' }}>result</span><span style={{ color: '#ff7b72' }}>.</span><span style={{ color: '#79c0ff' }}>detection_flags</span>     <span style={{ color: '#8b949e' }}>{'// { deepfake: false, replay: false, ... }'}</span>
            </pre>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '48px', textAlign: 'center' }}>
            Deepfake Detection API Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { title: 'REST API', desc: 'Simple REST endpoints for video upload, session management, and result retrieval. OpenAPI spec available.', icon: Code },
              { title: 'TypeScript SDK', desc: 'Type-safe client library with built-in polling, error handling, and progress tracking.', icon: Terminal },
              { title: 'Sub-2s Response', desc: 'Deepfake detection API returns results in under 2 seconds with 5 parallel detection modules.', icon: Zap },
              { title: 'Webhook Support', desc: 'Receive real-time notifications when video fraud detection analysis is complete.', icon: Shield },
              { title: 'No Video Storage', desc: 'Videos are automatically deleted after processing. The deepfake detection API never stores user videos.', icon: Lock },
              { title: 'Free Tier', desc: '200 free API calls per month. No credit card required to start using the deepfake detection API.', icon: CheckCircle },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '28px', background: 'rgba(26, 31, 46, 0.6)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <item.icon size={32} color="#10b981" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'rgba(26, 31, 46, 0.4)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '40px', textAlign: 'center' }}>
            API Endpoints
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { method: 'POST', path: '/api/v1/sessions', desc: 'Create verification session' },
              { method: 'POST', path: '/api/v1/sessions/{id}/upload', desc: 'Upload video for deepfake detection' },
              { method: 'GET', path: '/api/v1/sessions/{id}/result', desc: 'Get fraud detection results' },
              { method: 'GET', path: '/api/v1/sessions/{id}/status', desc: 'Check processing status' },
            ].map((ep, idx) => (
              <div key={idx} style={{ padding: '20px', background: 'rgba(26, 31, 46, 0.6)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ padding: '6px 14px', background: '#10b981', color: '#0a1f0f', borderRadius: '6px', fontSize: '12px', fontWeight: '700', minWidth: '50px', textAlign: 'center' }}>{ep.method}</span>
                <code style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>{ep.path}</code>
                <span style={{ color: '#9ca3af', fontSize: '14px', marginLeft: 'auto' }}>{ep.desc}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/docs" style={{ color: '#10b981', fontSize: '16px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Full API Documentation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '40px', textAlign: 'center' }}>
            Deepfake Detection API FAQ
          </h2>
          {[
            { q: 'What is a deepfake detection API?', a: 'A deepfake detection API is a programmatic interface that analyzes videos to detect AI-generated or manipulated content. FrameSentinel\'s deepfake detection API runs 5 parallel detection modules and returns results via REST API in under 2 seconds.' },
            { q: 'How do I integrate the deepfake detection API?', a: 'Install the TypeScript SDK or call the REST API directly. Create a session, upload a video, and receive fraud detection results. Most integrations take less than 30 minutes.' },
            { q: 'What does the AI video fraud detection API detect?', a: 'The API detects deepfakes, replay attacks, face swaps, video injection, and metadata tampering. All 5 detection modules run in parallel on every video.' },
            { q: 'Is there a free deepfake detection API?', a: 'Yes. FrameSentinel offers 200 free API calls per month with no credit card required. Paid plans start at $19/month for higher volumes.' },
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '24px', marginBottom: '16px', background: 'rgba(26, 31, 46, 0.6)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#e8eaed', marginBottom: '12px' }}>{item.q}</h3>
              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)', borderTop: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '16px' }}>Get Your Free API Key</h2>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9ca3af', marginBottom: '32px' }}>200 free deepfake detection API calls per month. No credit card required.</p>
          <Link href="/signup" style={{ padding: '16px 48px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#e8eaed', borderRadius: '12px', fontWeight: '600', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
