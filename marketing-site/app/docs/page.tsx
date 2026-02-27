'use client';
import { Shield, Code, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
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
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/#features" style={{ color: '#e8eaed', fontSize: '16px' }}>Features</Link>
            <Link href="/pricing" style={{ color: '#e8eaed', fontSize: '16px' }}>Pricing</Link>
            <Link href="/docs" style={{ color: '#10b981', fontSize: '16px', fontWeight: '600' }}>Docs</Link>
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

      <section style={{ marginTop: '80px', padding: '80px 40px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{
              fontSize: '56px',
              fontWeight: 'bold',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              API Documentation
            </h1>
            <p style={{ fontSize: '20px', color: '#9ca3af' }}>
              Complete guide to integrate FrameSentinel fraud detection
            </p>
          </div>

          {/* Quick Start */}
          <div style={{
            padding: '40px',
            background: 'rgba(26, 31, 46, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Zap size={32} color="#10b981" />
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e8eaed' }}>Quick Start</h2>
            </div>
            
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', marginBottom: '16px' }}>1. Get Your API Key</h3>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>Sign up and get your API key from the dashboard:</p>
            <pre style={{
              background: '#1a1f2e',
              padding: '20px',
              borderRadius: '8px',
              color: '#10b981',
              fontSize: '14px',
              overflowX: 'auto',
              marginBottom: '32px',
            }}>
              {`API_KEY=your-api-key-here
API_URL=https://api.framesentinel.com/v1`}
            </pre>

            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', marginBottom: '16px' }}>2. Install SDK</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
              <div>
                <p style={{ color: '#9ca3af', marginBottom: '12px' }}>TypeScript/JavaScript:</p>
                <pre style={{
                  background: '#1a1f2e',
                  padding: '16px',
                  borderRadius: '8px',
                  color: '#10b981',
                  fontSize: '14px',
                }}>
                  npm install @framesentinel/sdk
                </pre>
              </div>
              <div>
                <p style={{ color: '#9ca3af', marginBottom: '12px' }}>Python:</p>
                <pre style={{
                  background: '#1a1f2e',
                  padding: '16px',
                  borderRadius: '8px',
                  color: '#10b981',
                  fontSize: '14px',
                }}>
                  pip install framesentinel
                </pre>
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', marginBottom: '16px' }}>3. Basic Usage</h3>
            <pre style={{
              background: '#1a1f2e',
              padding: '20px',
              borderRadius: '8px',
              color: '#e8eaed',
              fontSize: '14px',
              overflowX: 'auto',
              lineHeight: '1.6',
            }}>
{`import { FrameSentinelClient } from '@framesentinel/sdk';

const client = new FrameSentinelClient({
  apiKey: 'your-api-key',
  apiUrl: 'https://api.framesentinel.com/v1'
});

// Create verification session
const session = await client.createSession('user-123');

// Upload video
await client.uploadVideo(session.session_id, videoFile);

// Get results
const result = await client.pollUntilComplete(session.session_id);

console.log('Risk Level:', result.risk_level);
console.log('Score:', result.authenticity_score);`}
            </pre>
          </div>

          {/* API Endpoints */}
          <div style={{
            padding: '40px',
            background: 'rgba(26, 31, 46, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Code size={32} color="#10b981" />
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e8eaed' }}>API Endpoints</h2>
            </div>

            {[
              {
                method: 'POST',
                endpoint: '/api/v1/sessions',
                description: 'Create a new verification session',
                request: `{
  "user_id": "user-123",
  "metadata": {
    "ip_address": "192.168.1.1"
  }
}`,
                response: `{
  "session_id": "sess_abc123",
  "state": "PENDING",
  "created_at": "2024-01-15T10:30:00Z"
}`
              },
              {
                method: 'POST',
                endpoint: '/api/v1/sessions/{id}/upload',
                description: 'Upload video for analysis',
                request: 'multipart/form-data with video file',
                response: `{
  "session_id": "sess_abc123",
  "state": "PROCESSING",
  "upload_complete": true
}`
              },
              {
                method: 'GET',
                endpoint: '/api/v1/sessions/{id}/result',
                description: 'Get verification results',
                request: 'No body required',
                response: `{
  "session_id": "sess_abc123",
  "state": "COMPLETED",
  "authenticity_score": 0.95,
  "risk_level": "VERIFIED",
  "detection_flags": {
    "deepfake_detected": false,
    "replay_detected": false,
    "injection_detected": false,
    "face_swap_detected": false,
    "metadata_anomaly": false
  }
}`
              },
            ].map((endpoint, idx) => (
              <div key={idx} style={{
                marginBottom: '32px',
                paddingBottom: '32px',
                borderBottom: idx < 2 ? '1px solid rgba(16, 185, 129, 0.2)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: '#10b981',
                    color: '#0a1f0f',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                  }}>
                    {endpoint.method}
                  </span>
                  <code style={{ color: '#10b981', fontSize: '16px', fontWeight: '600' }}>
                    {endpoint.endpoint}
                  </code>
                </div>
                <p style={{ color: '#9ca3af', marginBottom: '16px' }}>{endpoint.description}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <p style={{ color: '#e8eaed', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Request:</p>
                    <pre style={{
                      background: '#1a1f2e',
                      padding: '16px',
                      borderRadius: '8px',
                      color: '#e8eaed',
                      fontSize: '12px',
                      overflowX: 'auto',
                      lineHeight: '1.5',
                    }}>
                      {endpoint.request}
                    </pre>
                  </div>
                  <div>
                    <p style={{ color: '#e8eaed', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Response:</p>
                    <pre style={{
                      background: '#1a1f2e',
                      padding: '16px',
                      borderRadius: '8px',
                      color: '#e8eaed',
                      fontSize: '12px',
                      overflowX: 'auto',
                      lineHeight: '1.5',
                    }}>
                      {endpoint.response}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Authentication */}
          <div style={{
            padding: '40px',
            background: 'rgba(26, 31, 46, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Shield size={32} color="#10b981" />
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e8eaed' }}>Authentication</h2>
            </div>
            
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              All API requests require authentication using your API key in the header:
            </p>
            <pre style={{
              background: '#1a1f2e',
              padding: '20px',
              borderRadius: '8px',
              color: '#10b981',
              fontSize: '14px',
              marginBottom: '20px',
            }}>
              X-API-Key: your-api-key-here
            </pre>
            <p style={{ color: '#9ca3af' }}>
              Keep your API key secure. Never expose it in client-side code or public repositories.
            </p>
          </div>

          {/* Error Codes */}
          <div style={{
            padding: '40px',
            background: 'rgba(26, 31, 46, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Terminal size={32} color="#10b981" />
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e8eaed' }}>Error Codes</h2>
            </div>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { code: '400', name: 'Bad Request', desc: 'Invalid request parameters' },
                { code: '401', name: 'Unauthorized', desc: 'Invalid or missing API key' },
                { code: '403', name: 'Forbidden', desc: 'API key lacks required permissions' },
                { code: '404', name: 'Not Found', desc: 'Session not found' },
                { code: '413', name: 'Payload Too Large', desc: 'Video exceeds 100MB limit' },
                { code: '429', name: 'Too Many Requests', desc: 'Rate limit exceeded (100 req/min)' },
                { code: '500', name: 'Internal Server Error', desc: 'Server error, contact support' },
              ].map((error, idx) => (
                <div key={idx} style={{
                  padding: '16px',
                  background: '#1a1f2e',
                  borderRadius: '8px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                  <span style={{
                    padding: '8px 16px',
                    background: '#10b981',
                    color: '#0a1f0f',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '700',
                    minWidth: '60px',
                    textAlign: 'center',
                  }}>
                    {error.code}
                  </span>
                  <div>
                    <div style={{ color: '#e8eaed', fontWeight: '600', marginBottom: '4px' }}>{error.name}</div>
                    <div style={{ color: '#9ca3af', fontSize: '14px' }}>{error.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
