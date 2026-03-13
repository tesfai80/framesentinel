'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Session } from '@/types';
import { CheckCircle, Eye, UserPlus, Check, X, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/Toast';
import { Loading } from '@/components/Loading';

export default function ReviewQueuePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      const data = await api.getSessions({ limit: 50 });
      setSessions(data.filter((s: Session) => s.risk_level === 'SUSPICIOUS' && s.state === 'COMPLETED'));
    } catch (error) {
      console.error('Failed to load review queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (sessionId: string) => {
    try {
      toast.success('Session assigned to you');
      loadQueue();
    } catch (error: any) {
      toast.error(error.message || 'Failed to assign session');
    }
  };

  const handleApprove = async (sessionId: string) => {
    try {
      toast.success('Session approved');
      loadQueue();
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve session');
    }
  };

  const handleReject = async (sessionId: string) => {
    try {
      toast.success('Session rejected');
      loadQueue();
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject session');
    }
  };

  const handleEscalate = async (sessionId: string) => {
    try {
      toast.success('Session escalated to senior analyst');
      loadQueue();
    } catch (error: any) {
      toast.error(error.message || 'Failed to escalate session');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#e8eaed' }}>Review Queue</h1>
      <p style={{ color: '#9ca3af', marginBottom: '30px' }}>
        Sessions flagged as SUSPICIOUS requiring manual review
      </p>

      {/* Case Management Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '30px' }}>
        <div style={{
          background: '#161B22',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>Pending Cases</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{sessions.length}</div>
        </div>
        <div style={{
          background: '#161B22',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>Avg Review Time</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>2.4m</div>
        </div>
        <div style={{
          background: '#161B22',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>Approved Today</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>42</div>
        </div>
        <div style={{
          background: '#161B22',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>Rejected Today</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>8</div>
        </div>
      </div>

      <div style={{
        background: '#161B22',
        backdropFilter: 'blur(10px)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      }}>
        {loading ? (
          <Loading message="Loading review queue..." />
        ) : sessions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={48} color="#10b981" />
            <span>No sessions pending review</span>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #374151' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Session ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>User ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Score</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Detection Flags</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Created</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.session_id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: '#e8eaed' }}>
                    {session.session_id.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{session.user_id}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      color: '#f59e0b',
                      border: '1px solid #f59e0b',
                      fontWeight: '600',
                    }}>
                      {session.authenticity_score ? (session.authenticity_score * 100).toFixed(0) + '%' : '-'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#ef4444' }}>Deepfake:</span>
                        <span style={{ color: '#e8eaed', fontWeight: '600' }}>Yes</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#10b981' }}>Replay:</span>
                        <span style={{ color: '#e8eaed', fontWeight: '600' }}>No</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#ef4444' }}>Injection:</span>
                        <span style={{ color: '#e8eaed', fontWeight: '600' }}>Yes</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      border: '1px solid #10b981',
                    }}>
                      Pending Review
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#9ca3af' }}>
                    {new Date(session.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleApprove(session.session_id)}
                      title="Approve"
                      style={{
                        padding: '8px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#e8eaed',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => handleReject(session.session_id)}
                      title="Reject"
                      style={{
                        padding: '8px',
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: '#e8eaed',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <X size={14} />
                    </button>
                    <button
                      onClick={() => handleEscalate(session.session_id)}
                      title="Escalate"
                      style={{
                        padding: '8px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#0f1419',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <AlertTriangle size={14} />
                    </button>
                    <button
                      onClick={() => handleAssign(session.session_id)}
                      title="Assign"
                      style={{
                        padding: '8px',
                        background: '#374151',
                        color: '#e8eaed',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <UserPlus size={14} />
                    </button>
                    <button
                      onClick={() => router.push(`/dashboard/sessions/${session.session_id}`)}
                      title="Review"
                      style={{
                        padding: '8px',
                        background: '#374151',
                        color: '#e8eaed',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
