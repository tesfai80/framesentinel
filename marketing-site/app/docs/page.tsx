'use client';
import { Shield, Code, Terminal, Zap, Copy, Check, CheckCircle, AlertTriangle, AlertOctagon, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Syntax highlighting for JSON
  const highlightJSON = (code: string) => {
    if (language !== 'json') return code;
    
    return code
      .replace(/"([^"]+)":/g, '<span style="color: #79c0ff">"$1"</span>:') // keys
      .replace(/: "([^"]+)"/g, ': <span style="color: #a5d6ff">"$1"</span>') // string values
      .replace(/: (true|false)/g, ': <span style="color: #79c0ff">$1</span>') // booleans
      .replace(/: (\d+\.?\d*)/g, ': <span style="color: #79c0ff">$1</span>') // numbers
      .replace(/\/\/ (.+)/g, '<span style="color: #8b949e">// $1</span>'); // comments
  };

  // Syntax highlighting for TypeScript
  const highlightTypeScript = (code: string) => {
    if (language !== 'typescript') return code;
    
    return code
      .replace(/\b(import|from|const|await|new)\b/g, '<span style="color: #ff7b72">$1</span>') // keywords
      .replace(/\b(FrameSentinelClient|createSession|uploadVideo|pollUntilComplete)\b/g, '<span style="color: #d2a8ff">$1</span>') // methods
      .replace(/\'([^\']+)\'/g, '<span style="color: #a5d6ff">\' $1\'</span>') // strings
      .replace(/\/\/ (.+)/g, '<span style="color: #8b949e">// $1</span>'); // comments
  };

  // Syntax highlighting for bash
  const highlightBash = (code: string) => {
    if (language !== 'bash') return code;
    
    return code
      .replace(/\b(npm|pip|install)\b/g, '<span style="color: #ff7b72">$1</span>'); // commands
  };

  // Syntax highlighting for env
  const highlightEnv = (code: string) => {
    if (language !== 'env') return code;
    
    return code
      .replace(/^([A-Z_]+)=/gm, '<span style="color: #79c0ff">$1</span>=') // keys
      .replace(/=(.+)$/gm, '=<span style="color: #a5d6ff">$1</span>'); // values
  };

  // Syntax highlighting for http
  const highlightHTTP = (code: string) => {
    if (language !== 'http') return code;
    
    return code
      .replace(/^([A-Za-z-]+):/gm, '<span style="color: #79c0ff">$1</span>:') // headers
      .replace(/: (.+)$/gm, ': <span style="color: #a5d6ff">$1</span>'); // values
  };

  const getHighlightedCode = () => {
    let highlighted = code;
    highlighted = highlightJSON(highlighted);
    highlighted = highlightTypeScript(highlighted);
    highlighted = highlightBash(highlighted);
    highlighted = highlightEnv(highlighted);
    highlighted = highlightHTTP(highlighted);
    return highlighted;
  };

  return (
    <div style={{
      position: 'relative',
      background: '#0d1117',
      borderRadius: '12px',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'rgba(26, 31, 46, 0.8)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ marginLeft: '8px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{language}</span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(45, 53, 72, 0.8)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '6px',
            color: copied ? '#10b981' : '#9ca3af',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
              e.currentTarget.style.color = '#10b981';
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(45, 53, 72, 0.8)';
              e.currentTarget.style.color = '#9ca3af';
            }
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre style={{
        padding: '20px',
        margin: 0,
        fontSize: '13px',
        lineHeight: '1.6',
        color: '#e8eaed',
        fontFamily: '"Fira Code", "Consolas", monospace',
        overflowX: 'auto',
      }}>
        <div dangerouslySetInnerHTML={{ __html: getHighlightedCode() }} />
      </pre>
    </div>
  );
}

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
            <CodeBlock
              code={`API_KEY=your-api-key-here
API_URL=https://framesentinel-341068003893.europe-west3.run.app`}
              language="env"
            />

            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', marginBottom: '16px', marginTop: '32px' }}>2. Install SDK</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
              <div>
                <p style={{ color: '#9ca3af', marginBottom: '12px' }}>TypeScript/JavaScript:</p>
                <CodeBlock code="npm install @framesentinel/sdk" language="bash" />
              </div>
              <div>
                <p style={{ color: '#9ca3af', marginBottom: '12px' }}>Python:</p>
                <CodeBlock code="pip install framesentinel" language="bash" />
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', marginBottom: '16px' }}>3. Basic Usage</h3>
            <CodeBlock
              code={`import { FrameSentinelClient } from '@framesentinel/sdk';

const client = new FrameSentinelClient({
  apiKey: 'your-api-key',
  apiUrl: 'https://framesentinel-341068003893.europe-west3.run.app'
});

// Create verification session
const session = await client.createSession('user-123');

// Upload video
await client.uploadVideo(session.session_id, videoFile);

// Get results
const result = await client.pollUntilComplete(session.session_id);

console.log('Risk Level:', result.risk_level);
console.log('Score:', result.authenticity_score);`}
              language="typescript"
            />
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
                    <CodeBlock code={endpoint.request} language="json" />
                  </div>
                  <div>
                    <p style={{ color: '#e8eaed', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Response:</p>
                    <CodeBlock code={endpoint.response} language="json" />
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
            <CodeBlock code="X-API-Key: your-api-key-here" language="http" />
            <p style={{ color: '#9ca3af', marginBottom: '20px', marginTop: '20px' }}>
              Keep your API key secure. Never expose it in client-side code or public repositories.
            </p>
          </div>

          {/* Risk Scoring & Decision Logic */}
          <div style={{
            padding: '40px',
            background: 'rgba(26, 31, 46, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Shield size={32} color="#10b981" />
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e8eaed' }}>Risk Scoring & Decision Logic</h2>
            </div>
            
            <p style={{ color: '#9ca3af', marginBottom: '32px', fontSize: '16px', lineHeight: '1.6' }}>
              FrameSentinel analyzes videos through 5 parallel detection modules and calculates an authenticity score (0-100%). 
              The system automatically categorizes results into risk levels to guide your decision-making.
            </p>

            {/* Risk Levels */}
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#10b981', marginBottom: '20px' }}>Risk Levels</h3>
            <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
              {[
                {
                  level: 'VERIFIED',
                  score: '85-100%',
                  color: '#10b981',
                  bgColor: 'rgba(16, 185, 129, 0.1)',
                  icon: CheckCircle,
                  decision: 'Approve',
                  description: 'Video is authentic with high confidence. All detection modules passed. Safe to proceed with verification.'
                },
                {
                  level: 'REVIEW',
                  score: '70-84%',
                  color: '#f59e0b',
                  bgColor: 'rgba(245, 158, 11, 0.1)',
                  icon: AlertTriangle,
                  decision: 'Manual Review',
                  description: 'Minor anomalies detected. Requires human analyst review before making final decision.'
                },
                {
                  level: 'SUSPICIOUS',
                  score: '50-69%',
                  color: '#f97316',
                  bgColor: 'rgba(249, 115, 22, 0.1)',
                  icon: AlertOctagon,
                  decision: 'Likely Reject',
                  description: 'Multiple fraud indicators detected. High probability of manipulation. Recommend rejection unless strong evidence suggests otherwise.'
                },
                {
                  level: 'REJECTED',
                  score: '0-49%',
                  color: '#ef4444',
                  bgColor: 'rgba(239, 68, 68, 0.1)',
                  icon: XCircle,
                  decision: 'Reject',
                  description: 'Strong fraud signals detected across multiple modules. Video is likely fake or manipulated. Reject verification immediately.'
                },
              ].map((risk, idx) => (
                <div key={idx} style={{
                  padding: '24px',
                  background: risk.bgColor,
                  borderRadius: '12px',
                  border: `2px solid ${risk.color}`,
                  display: 'grid',
                  gridTemplateColumns: '80px 120px 1fr',
                  gap: '20px',
                  alignItems: 'center',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                      <risk.icon size={36} color={risk.color} strokeWidth={2} />
                    </div>
                    <div style={{ color: risk.color, fontWeight: '700', fontSize: '14px' }}>{risk.score}</div>
                  </div>
                  <div>
                    <div style={{ color: risk.color, fontWeight: '700', fontSize: '18px', marginBottom: '4px' }}>
                      {risk.level}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '600' }}>
                      {risk.decision}
                    </div>
                  </div>
                  <div style={{ color: '#e8eaed', fontSize: '14px', lineHeight: '1.5' }}>
                    {risk.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Detection Modules */}
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#10b981', marginBottom: '20px' }}>Detection Modules</h3>
            <p style={{ color: '#9ca3af', marginBottom: '20px', fontSize: '14px' }}>
              Each video is analyzed by 5 specialized AI modules running in parallel:
            </p>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '40px' }}>
              {[
                { name: 'Deepfake Detection', desc: 'Identifies AI-generated or synthetically modified faces using deep learning models' },
                { name: 'Replay Attack Detection', desc: 'Detects videos recorded from screens or pre-recorded content being played back' },
                { name: 'Injection Detection', desc: 'Identifies videos injected into the camera stream via virtual cameras or software' },
                { name: 'Face Swap Detection', desc: 'Detects face replacement techniques and morphing attacks' },
                { name: 'Metadata Integrity', desc: 'Analyzes video file metadata for signs of tampering or manipulation' },
              ].map((module, idx) => (
                <div key={idx} style={{
                  padding: '16px 20px',
                  background: '#1a1f2e',
                  borderRadius: '8px',
                  borderLeft: '4px solid #10b981',
                }}>
                  <div style={{ color: '#10b981', fontWeight: '600', marginBottom: '4px' }}>{module.name}</div>
                  <div style={{ color: '#9ca3af', fontSize: '13px' }}>{module.desc}</div>
                </div>
              ))}
            </div>

            {/* Score Calculation */}
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#10b981', marginBottom: '20px' }}>How Scores Are Calculated</h3>
            <div style={{
              padding: '24px',
              background: '#1a1f2e',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}>
              <ol style={{ color: '#e8eaed', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#10b981' }}>Frame Analysis:</strong> System extracts up to 15 frames evenly distributed across the video
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#10b981' }}>Parallel Detection:</strong> All 5 modules analyze each frame simultaneously (2-4 seconds total)
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#10b981' }}>Detection Rate:</strong> Calculates percentage of frames flagged by each module
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#10b981' }}>Score Reduction:</strong> Each detection reduces the authenticity score proportionally
                </li>
                <li>
                  <strong style={{ color: '#10b981' }}>Final Score:</strong> Combines all module results into single authenticity score (0-100%)
                </li>
              </ol>
            </div>

            {/* Example Response */}
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#10b981', marginTop: '40px', marginBottom: '20px' }}>Example Response</h3>
            <CodeBlock
              code={`{
  "session_id": "sess_abc123",
  "state": "COMPLETED",
  "authenticity_score": 0.42,  // 42% - REJECTED
  "risk_level": "REJECTED",
  "detection_flags": {
    "deepfake_detected": true,   // AI-generated face detected
    "replay_detected": false,
    "injection_detected": true,  // Virtual camera detected
    "face_swap_detected": false,
    "metadata_anomaly": true     // File metadata tampered
  },
  "frame_timeline": [
    {
      "frame_number": 5,
      "timestamp": 0.167,
      "flags": ["deepfake", "injection"],
      "confidence": 0.89
    }
  ],
  "processed_at": "2024-01-15T10:30:45Z"
}`}
              language="json"
            />
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
