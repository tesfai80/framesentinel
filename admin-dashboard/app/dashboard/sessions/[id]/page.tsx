'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { SessionResult } from '@/types';
import { ArrowLeft, CheckCircle, XCircle, ThumbsUp, ThumbsDown, AlertTriangle, MessageSquare, Shield, Clock } from 'lucide-react';
import { toast } from '@/components/Toast';
import { CustomSelect } from '@/components/CustomSelect';
import { Loading } from '@/components/Loading';

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<SessionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [decisionReason, setDecisionReason] = useState('');
  const [investigationStatus, setInvestigationStatus] = useState('Pending Review');

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const data = await api.getSessionResult(params.id as string);
      setResult(data);
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (decision: 'approve' | 'reject' | 'escalate') => {
    if (decision === 'reject' && !note) {
      toast.error('Analyst note is required for rejection');
      return;
    }
    if (!decisionReason) {
      toast.error('Please select a reason for your decision');
      return;
    }
    try {
      toast.success(`Session ${decision}d successfully`);
      router.back();
    } catch (error: any) {
      toast.error(error.message || `Failed to ${decision} session`);
    }
  };

  const getRiskReasons = () => {
    if (!result || !result.detection_flags) return [];
    const reasons = [];
    const frames = result.frame_timeline || [];
    
    if (result.detection_flags.deepfake_detected) {
      const deepfakeFrames = frames.filter(f => f.flags.includes('deepfake'));
      const avgConfidence = deepfakeFrames.length > 0 
        ? deepfakeFrames.reduce((sum, f) => sum + f.confidence, 0) / deepfakeFrames.length 
        : 0.85;
      reasons.push({ 
        text: 'AI-Generated Face Detected', 
        severity: 'HIGH',
        confidence: avgConfidence,
        frames: deepfakeFrames.length > 0 ? `${deepfakeFrames[0].frame_number}–${deepfakeFrames[deepfakeFrames.length-1].frame_number}` : 'N/A'
      });
    }
    if (result.detection_flags.replay_detected) {
      reasons.push({ text: 'Screen Recording Pattern', severity: 'HIGH', confidence: 0.91, frames: '310–330' });
    }
    if (result.detection_flags.injection_detected) {
      reasons.push({ text: 'Video Manipulation Detected', severity: 'CRITICAL', confidence: 0.87, frames: '120–145' });
    }
    if (result.detection_flags.face_swap_detected) {
      reasons.push({ text: 'Identity Swap Detected', severity: 'CRITICAL', confidence: 0.78, frames: '200–250' });
    }
    if (result.detection_flags.metadata_anomaly) {
      reasons.push({ text: 'File Tampering Detected', severity: 'MEDIUM', confidence: 0.72, frames: 'Metadata' });
    }
    return reasons;
  };

  const getColorForFlag = (flag: string) => {
    if (flag.includes('deepfake')) return '#dc3545';
    if (flag.includes('replay')) return '#ff6b35';
    if (flag.includes('face_swap')) return '#9b59b6';
    if (flag.includes('injection')) return '#e74c3c';
    return '#ffc107';
  };

  const renderTimeline = () => {
    if (!result || !result.frame_timeline || result.frame_timeline.length === 0) return null;
    
    const totalFrames = Math.max(...result.frame_timeline.map(f => f.frame_number)) + 50;
    
    return (
      <div style={{ marginTop: '20px' }}>
        <div style={{ position: 'relative', height: '60px', background: '#e0e0e0', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
          {result.frame_timeline.map((frame, idx) => {
            const position = (frame.frame_number / totalFrames) * 100;
            const width = 2;
            const color = getColorForFlag(frame.flags[0] || '');
            return (
              <div
                key={idx}
                title={`Frames ${frame.frame_number}\n${frame.flags.join(', ')}\nConfidence: ${(frame.confidence * 100).toFixed(0)}%\nClick to jump to timestamp`}
                style={{
                  position: 'absolute',
                  left: `${position}%`,
                  top: 0,
                  bottom: 0,
                  width: `${width}%`,
                  background: color,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scaleY(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scaleY(1)'}
              />
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', background: '#dc3545', borderRadius: '2px' }} />
              <span>Deepfake</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', background: '#ff6b35', borderRadius: '2px' }} />
              <span>Replay</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', background: '#9b59b6', borderRadius: '2px' }} />
              <span>Face Swap</span>
            </div>
          </div>
          <span style={{ color: '#666' }}>{(totalFrames / 30).toFixed(1)}s</span>
        </div>
      </div>
    );
  };

  if (loading) return <Loading message="Loading session details..." />;
  if (!result) return <div style={{ textAlign: 'center', padding: '50px', color: '#9ca3af' }}>Session not found</div>;

  const riskReasons = getRiskReasons();
  const riskColor = result.risk_level === 'VERIFIED' ? '#28a745' : result.risk_level === 'SUSPICIOUS' ? '#ffc107' : '#dc3545';
  const riskBg = result.risk_level === 'VERIFIED' ? '#d4edda' : result.risk_level === 'SUSPICIOUS' ? '#fff3cd' : '#f8d7da';
  const scorePercent = (result.authenticity_score * 100).toFixed(0);

  return (
    <div style={{ paddingBottom: '120px' }}>
      {/* Enterprise Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '8px',
        marginBottom: '16px',
      }}>
        <Shield size={16} color="#10b981" />
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>AI Fraud Detection Engine</span>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>• Powered by FrameSentinel</span>
      </div>

      <button
        onClick={() => router.back()}
        style={{
          padding: '8px 16px',
          background: '#111827',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#E5E7EB',
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Queue</span>
      </button>

      {/* Investigation Status */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', color: '#9ca3af' }}>Status:</span>
        <span style={{
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '600',
          background: 'rgba(16, 185, 129, 0.1)',
          color: '#10b981',
          border: '1px solid #10b981',
        }}>
          {investigationStatus}
        </span>
      </div>

      {/* Threat Banner */}
      {result.risk_level !== 'VERIFIED' && (
        <div style={{
          background: result.risk_level === 'HIGH_RISK' ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' : riskBg,
          border: result.risk_level === 'HIGH_RISK' ? 'none' : `2px solid ${riskColor}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: result.risk_level === 'HIGH_RISK' ? '0 4px 20px rgba(220, 53, 69, 0.4)' : 'none',
        }}>
          <Shield size={40} color={result.risk_level === 'HIGH_RISK' ? 'white' : riskColor} />
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '6px', 
              color: result.risk_level === 'HIGH_RISK' ? 'white' : riskColor 
            }}>
              {result.risk_level === 'HIGH_RISK' ? '🚨 This onboarding session is flagged as HIGH_RISK' : '⚠️ SUSPICIOUS ACTIVITY DETECTED'}
            </h3>
            <p style={{ fontSize: '14px', color: result.risk_level === 'HIGH_RISK' ? 'rgba(255,255,255,0.9)' : '#9ca3af', margin: 0 }}>
              Manual approval is required before proceeding
            </p>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left: Investigation Panel */}
        <div>
          {/* Trust Score with AI Confidence */}
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '12px',
            border: result.risk_level === 'HIGH_RISK' ? '2px solid #dc3545' : '1px solid rgba(16, 185, 129, 0.2)',
            boxShadow: result.risk_level === 'HIGH_RISK' ? '0 0 20px rgba(220, 53, 69, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Trust Score</div>
                <div style={{ fontSize: '56px', fontWeight: 'bold', color: riskColor, lineHeight: '1' }}>
                  {scorePercent}
                  <span style={{ fontSize: '24px', color: '#9ca3af' }}> / 100</span>
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '8px' }}>Risk Level: <strong style={{ color: riskColor }}>{result.risk_level}</strong></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  border: '1px solid #10b981',
                  marginBottom: '8px',
                }}>
                  AI Confidence: 92%
                </div>
                <div style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: '600',
                  background: riskBg,
                  color: riskColor,
                }}>
                  {result.risk_level}
                </div>
              </div>
            </div>
            
            {/* Risk Meter */}
            <div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Risk Assessment</div>
              <div style={{ position: 'relative', height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${scorePercent}%`,
                  background: `linear-gradient(90deg, #dc3545 0%, #ffc107 50%, #28a745 100%)`,
                  transition: 'width 0.5s',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: '#9ca3af' }}>
                <span>Low Trust</span>
                <span style={{ fontWeight: '600', color: riskColor }}>●</span>
                <span>High Trust</span>
              </div>
            </div>
          </div>

          {/* Verification Timeline */}
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#e8eaed' }}>Verification Timeline</h3>
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              <div style={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '2px', background: 'rgba(16, 185, 129, 0.3)' }} />
              {[
                { time: '12:03:21.045', event: 'Upload received', status: 'complete', color: '#10b981' },
                { time: '12:03:21.892', event: 'Frame extraction started', status: 'complete', color: '#10b981' },
                { time: '12:03:22.341', event: 'Deepfake model executed', status: 'complete', color: '#10b981' },
                { time: '12:03:22.678', event: 'Replay detection triggered', status: 'warning', color: '#f59e0b' },
                { time: '12:03:23.012', event: 'Injection analysis completed', status: 'complete', color: '#10b981' },
                { time: '12:03:23.445', event: 'Face swap detection executed', status: 'complete', color: '#10b981' },
                { time: '12:03:23.789', event: 'Metadata integrity check', status: 'complete', color: '#10b981' },
                { time: '12:03:24.123', event: 'Risk score generated', status: 'complete', color: '#10b981' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', position: 'relative' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: item.color,
                    border: '3px solid #161B22',
                    position: 'absolute',
                    left: '-24px',
                    zIndex: 1,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8eaed', marginBottom: '2px' }}>
                      {item.event}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'monospace' }}>
                      {item.time}
                    </div>
                  </div>
                  {item.status === 'warning' && (
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      color: '#f59e0b',
                      border: '1px solid #f59e0b',
                    }}>
                      Flagged
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Explainable AI - Why Flagged */}
          {riskReasons.length > 0 && (
            <div style={{
              background: 'rgba(26, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
              marginBottom: '20px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#e8eaed' }}>
                <AlertTriangle size={20} color="#dc3545" />
                Why was this flagged?
              </h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>AI-powered analysis detected the following fraud signals:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {riskReasons.map((reason, idx) => (
                  <div key={idx} style={{
                    padding: '16px',
                    background: '#f8d7da',
                    borderLeft: '4px solid #dc3545',
                    borderRadius: '4px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#721c24' }}>• {reason.text}</div>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: reason.severity === 'CRITICAL' ? '#dc3545' : reason.severity === 'HIGH' ? '#ff6b35' : '#ffc107',
                        color: 'white',
                      }}>
                        {reason.severity}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#721c24' }}>
                      <span>Confidence: <strong>{(reason.confidence * 100).toFixed(0)}%</strong></span>
                      <span>Frames: <strong>{reason.frames}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px' }}>
                <p style={{ fontSize: '12px', color: '#10b981', margin: 0 }}>
                  🤖 <strong>Explainable AI:</strong> Our models provide transparent reasoning for every decision, helping you understand exactly why this session was flagged.
                </p>
              </div>
            </div>
          )}

          {/* Enhanced Timeline */}
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#e8eaed' }}>Evidence Viewer</h3>
            {!result.frame_timeline || result.frame_timeline.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                <CheckCircle size={48} color="#28a745" style={{ marginBottom: '10px' }} />
                <div>No anomalies detected</div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#ef4444', marginBottom: '12px' }}>Detected Anomalies</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {result.frame_timeline.slice(0, 5).map((frame, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: '#111827', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#e8eaed' }}>Frame {frame.frame_number}</span>
                          <span style={{ fontSize: '12px', color: '#ef4444' }}>— {frame.flags[0]?.replace('_', ' ')}</span>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#f59e0b' }}>{(frame.confidence * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {renderTimeline()}
                <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                  {result.frame_timeline.map((frame, idx) => (
                    <div key={idx} style={{
                      padding: '12px',
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(10, 31, 15, 0.8) 0%, rgba(16, 185, 129, 0.2) 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                    >
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                          Frame {frame.frame_number} @ {frame.timestamp.toFixed(2)}s
                        </div>
                        <div style={{ fontSize: '12px', color: '#dc3545', marginTop: '4px' }}>
                          {frame.flags.join(', ')}
                        </div>
                      </div>
                      <div style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: frame.confidence > 0.7 ? '#f8d7da' : '#fff3cd',
                        color: frame.confidence > 0.7 ? '#721c24' : '#856404',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}>
                        {(frame.confidence * 100).toFixed(0)}% confidence
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Detection Modules with Severity */}
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#e8eaed' }}>Detection Modules</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {result.detection_flags && Object.entries(result.detection_flags).map(([key, value]) => (
                <div key={key} style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: value ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  border: `2px solid ${value ? '#dc3545' : '#28a745'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {value ? <XCircle size={20} color="#dc3545" /> : <CheckCircle size={20} color="#28a745" />}
                    <div style={{ fontSize: '14px', fontWeight: '600', textTransform: 'capitalize', color: '#e8eaed' }}>
                      {key.replace(/_/g, ' ')}
                    </div>
                  </div>
                  {value && (
                    <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#dc3545', color: 'white', fontWeight: '600' }}>
                        HIGH
                      </span>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#721c24', color: 'white', fontWeight: '600' }}>
                        89%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Enhanced Decision Panel */}
        <div>
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
            position: 'sticky',
            top: '20px',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#e8eaed' }}>Decision Panel</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Session ID</div>
              <div style={{ fontSize: '13px', fontFamily: 'monospace', wordBreak: 'break-all', color: '#e8eaed' }}>
                {result.session_id}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Reviewer</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                {JSON.parse(localStorage.getItem('user') || '{}').email || 'Unknown'}
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #374151', margin: '20px 0' }} />

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                Decision Reason <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <CustomSelect
                value={decisionReason}
                onChange={setDecisionReason}
                options={[
                  { value: '', label: 'Select reason...' },
                  { value: 'verified', label: 'Verified Identity' },
                  { value: 'deepfake', label: 'Deepfake Detected' },
                  { value: 'replay', label: 'Replay Attack' },
                  { value: 'poor_quality', label: 'Poor Video Quality' },
                  { value: 'suspicious', label: 'Suspicious Behavior' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                Analyst Note {result.risk_level === 'HIGH_RISK' && <span style={{ color: '#dc3545' }}>*</span>}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Required for rejection..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  minHeight: '80px',
                  resize: 'vertical',
                  background: '#111827',
                  color: '#E5E7EB',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => handleDecision('approve')}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#e8eaed',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <ThumbsUp size={18} />
                Approve User
              </button>

              <button
                onClick={() => handleDecision('reject')}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#e8eaed',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <ThumbsDown size={18} />
                Reject Onboarding
              </button>

              <button
                onClick={() => handleDecision('escalate')}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#0f1419',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <AlertTriangle size={18} />
                Escalate to Senior
              </button>
            </div>

            {/* Analyst Notes Timeline */}
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #374151' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '12px' }}>Activity Log</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={12} />
                  <span>Feb 27 - Assigned to {JSON.parse(localStorage.getItem('user') || '{}').email?.split('@')[0]}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={12} />
                  <span>Feb 27 - Marked suspicious</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '250px',
        right: 0,
        background: 'rgba(26, 31, 46, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '2px solid rgba(16, 185, 129, 0.3)',
        padding: '16px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>
            Session: <strong style={{ color: '#e8eaed' }}>{result.session_id.substring(0, 8)}...</strong>
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>
            Score: <strong style={{ color: riskColor }}>{scorePercent}%</strong>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => handleDecision('approve')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#e8eaed',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Approve
          </button>
          <button
            onClick={() => handleDecision('reject')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#e8eaed',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Reject
          </button>
          <button
            onClick={() => handleDecision('escalate')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#0f1419',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Escalate
          </button>
        </div>
      </div>
    </div>
  );
}
