'use client';
import { Shield, Upload, CheckCircle, AlertCircle, Loader, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function DemoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);
      
      // Get video duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        setVideoDuration(duration);
        
        if (duration > 15) {
          setError(`Video is ${duration.toFixed(1)}s long. Demo limit is 15 seconds. Please use a shorter clip.`);
        }
      };
      video.src = URL.createObjectURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch(`${API_URL}/api/v1/demo/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle structured error messages
        if (errorData.detail && typeof errorData.detail === 'object') {
          const detail = errorData.detail;
          setError(detail.message || detail.error || 'Upload failed');
        } else {
          setError(errorData.detail || 'Upload failed');
        }
        
        setUploading(false);
        return;
      }

      const data = await response.json();
      setSessionId(data.session_id);
      setAttemptsRemaining(data.limitations?.attempts_remaining);

      // Poll for result
      pollResult(data.session_id);
    } catch (err: any) {
      setError(err.message);
      setUploading(false);
    }
  };

  const pollResult = async (sid: string) => {
    const maxAttempts = 60; // 60 seconds max
    let attempts = 0;

    const poll = setInterval(async () => {
      attempts++;

      try {
        const response = await fetch(`${API_URL}/api/v1/demo/result/${sid}`);
        const data = await response.json();

        if (data.state === 'COMPLETED' || data.state === 'FAILED') {
          clearInterval(poll);
          setResult(data);
          setUploading(false);
        }

        if (attempts >= maxAttempts) {
          clearInterval(poll);
          setError('Processing timeout. Please try again.');
          setUploading(false);
        }
      } catch (err) {
        clearInterval(poll);
        setError('Failed to get result');
        setUploading(false);
      }
    }, 1000);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'VERIFIED': return '#10b981';
      case 'SUSPICIOUS': return '#f59e0b';
      case 'REJECTED': return '#ef4444';
      default: return '#9ca3af';
    }
  };

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
          <Link href="/signup" style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#e8eaed',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
          }}>
            Sign Up
          </Link>
        </div>
      </nav>

      <section style={{ marginTop: '80px', padding: '60px 40px', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '16px',
            textAlign: 'center',
            color: '#e8eaed',
          }}>
            Try FrameSentinel Free
          </h1>
          <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '40px', textAlign: 'center' }}>
            Upload a short video (max 15 seconds) to see our AI fraud detection in action
          </p>

          {/* Demo Limitations */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
          }}>
            <h3 style={{ color: '#10b981', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
              Demo Limitations:
            </h3>
            <ul style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>2 attempts per hour per IP address</li>
              <li>Maximum 15 seconds video duration</li>
              <li>Maximum 10MB file size</li>
              <li>Partial results only (score + flags, no frame timeline)</li>
              {attemptsRemaining !== null && (
                <li style={{ color: '#10b981', fontWeight: '600' }}>
                  Attempts remaining: {attemptsRemaining}
                </li>
              )}
            </ul>
          </div>

          {/* Upload Section */}
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '40px',
          }}>
            {!result && (
              <>
                <div style={{
                  border: '2px dashed rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '60px 40px',
                  textAlign: 'center',
                  marginBottom: '24px',
                  background: 'rgba(16, 185, 129, 0.05)',
                }}>
                  <Upload size={48} color="#10b981" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '18px', color: '#e8eaed', marginBottom: '12px' }}>
                    {file ? (
                      <>
                        {file.name}
                        {videoDuration && (
                          <span style={{ 
                            display: 'block', 
                            fontSize: '14px', 
                            color: videoDuration > 15 ? '#ef4444' : '#10b981',
                            marginTop: '8px'
                          }}>
                            Duration: {videoDuration.toFixed(1)}s {videoDuration > 15 ? '(Too long for demo)' : '✓'}
                          </span>
                        )}
                      </>
                    ) : (
                      'Upload verification video'
                    )}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
                    Supported: MP4, AVI, MOV, WEBM (max 10MB, 15 seconds)
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="video-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="video-upload" style={{
                    padding: '12px 32px',
                    background: uploading ? '#6b7280' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#e8eaed',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    display: 'inline-block',
                  }}>
                    {uploading ? 'Processing...' : 'Choose Video'}
                  </label>
                </div>

                {file && !uploading && (!videoDuration || videoDuration <= 15) && (
                  <button
                    onClick={handleUpload}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#e8eaed',
                      borderRadius: '10px',
                      fontWeight: '600',
                      fontSize: '16px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    Analyze Video
                    <ArrowRight size={20} />
                  </button>
                )}

                {uploading && (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Loader size={40} color="#10b981" style={{ animation: 'spin 1s linear infinite' }} />
                    <p style={{ color: '#10b981', marginTop: '16px', fontSize: '16px' }}>
                      Analyzing your video...
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <AlertCircle size={24} color="#ef4444" />
                <p style={{ color: '#ef4444', fontSize: '14px' }}>{error}</p>
              </div>
            )}

            {/* Result */}
            {result && result.state === 'COMPLETED' && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 31, 15, 0.3) 100%)',
                  borderRadius: '12px',
                  padding: '32px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}>
                  <CheckCircle size={64} color="#10b981" style={{ marginBottom: '16px' }} />
                  <h2 style={{ fontSize: '32px', color: '#e8eaed', marginBottom: '8px' }}>
                    Analysis Complete
                  </h2>
                  <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                    {result.message}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
                  <div style={{
                    background: 'rgba(26, 31, 46, 0.8)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}>
                    <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>Authenticity Score</p>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>
                      {(result.authenticity_score * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(26, 31, 46, 0.8)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}>
                    <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>Risk Level</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: getRiskColor(result.risk_level) }}>
                      {result.risk_level}
                    </p>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(26, 31, 46, 0.8)',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  marginBottom: '24px',
                }}>
                  <h3 style={{ color: '#e8eaed', fontSize: '18px', marginBottom: '16px', fontWeight: '600' }}>
                    Detection Flags
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {Object.entries(result.detection_flags || {}).map(([key, value]: [string, any]) => (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {value ? (
                          <AlertCircle size={16} color="#ef4444" />
                        ) : (
                          <CheckCircle size={16} color="#10b981" />
                        )}
                        <span style={{ color: value ? '#ef4444' : '#10b981', fontSize: '14px' }}>
                          {key.replace(/_/g, ' ')}: {value ? 'Detected' : 'Clear'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                }}>
                  <p style={{ color: '#10b981', fontSize: '16px', marginBottom: '16px', fontWeight: '600' }}>
                    Want full analysis with frame-by-frame timeline?
                  </p>
                  <Link href="/signup" style={{
                    padding: '12px 32px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#e8eaed',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    Sign Up for Free
                    <ArrowRight size={20} />
                  </Link>
                </div>

                <button
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                    setSessionId(null);
                    setError(null);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(45, 53, 72, 0.8)',
                    color: '#e8eaed',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '14px',
                    border: '1px solid #374151',
                    cursor: 'pointer',
                    marginTop: '16px',
                  }}
                >
                  Try Another Video
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
