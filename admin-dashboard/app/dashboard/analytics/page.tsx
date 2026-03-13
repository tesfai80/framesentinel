'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Activity, Shield } from 'lucide-react';
import { Loading } from '@/components/Loading';

export default function FraudAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: () => api.getAnalytics({ time_range: timeRange }),
  });

  const { data: detectionTrend = [] } = useQuery({
    queryKey: ['detectionTrend', timeRange],
    queryFn: () => api.getDetectionTrend({ days: timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 7 }),
  });

  if (isLoading) {
    return <Loading message="Loading analytics..." />;
  }

  const fraudStats = analytics || {
    fraud_rate: 0,
    fraud_rate_change: 0,
    detection_breakdown: { deepfake: 0, replay: 0, injection: 0, face_swap: 0 },
    false_positive_rate: 0,
    false_positive_change: 0,
    manual_review_rate: 0,
    manual_review_change: 0,
    total_sessions: 0,
    fraud_detected: 0,
    auto_approved: 0,
    manual_reviews: 0,
  };

  const maxValue = detectionTrend.length > 0 ? Math.max(...detectionTrend.map((d: any) => d.deepfake + d.replay + d.injection + d.face_swap)) : 1;

  return (
    <div>
      {/* Enterprise Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <Shield size={16} color="#10b981" />
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>AI Fraud Detection Engine</span>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>• Powered by FrameSentinel</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#e8eaed' }}>Fraud Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={{
            padding: '10px 16px',
            background: '#111827',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '8px',
            color: '#e8eaed',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          background: '#161B22',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>Fraud Rate</div>
            <AlertTriangle size={20} color="#ef4444" />
          </div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>
            {fraudStats.fraud_rate}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <TrendingDown size={16} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: '600' }}>{Math.abs(fraudStats.fraud_rate_change)}%</span>
            <span style={{ color: '#9ca3af' }}>vs last period</span>
          </div>
        </div>

        <div style={{
          background: '#161B22',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>False Positive Rate</div>
            <XCircle size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
            {fraudStats.false_positive_rate}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <TrendingDown size={16} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: '600' }}>{Math.abs(fraudStats.false_positive_change)}%</span>
            <span style={{ color: '#9ca3af' }}>improvement</span>
          </div>
        </div>

        <div style={{
          background: '#161B22',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>Manual Review Rate</div>
            <Activity size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
            {fraudStats.manual_review_rate}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <TrendingUp size={16} color="#ef4444" />
            <span style={{ color: '#ef4444', fontWeight: '600' }}>{fraudStats.manual_review_change}%</span>
            <span style={{ color: '#9ca3af' }}>vs last period</span>
          </div>
        </div>

        <div style={{
          background: '#161B22',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>Total Sessions</div>
            <CheckCircle size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#e8eaed', marginBottom: '8px' }}>
            {fraudStats.total_sessions.toLocaleString()}
          </div>
          <div style={{ fontSize: '13px', color: '#9ca3af' }}>
            {fraudStats.fraud_detected} fraud detected
          </div>
        </div>
      </div>

      {/* Detection Types Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          background: '#161B22',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Detection Types</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(fraudStats.detection_breakdown).map(([type, count]) => {
              const total = (Object.values(fraudStats.detection_breakdown) as number[]).reduce((a, b) => a + b, 0);
              const percentage = (((count as number) / total) * 100).toFixed(1);
              const colors: any = {
                deepfake: '#ef4444',
                replay: '#f59e0b',
                injection: '#8b5cf6',
                face_swap: '#ec4899',
              };
              return (
                <div key={type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#e8eaed', textTransform: 'capitalize' }}>
                      {type.replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: colors[type] }}>
                      {count as number} ({percentage}%)
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#374151', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${percentage}%`,
                      background: colors[type],
                      transition: 'width 0.5s',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          background: '#161B22',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Session Outcomes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid #10b981' }}>
              <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Auto Approved</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
                {fraudStats.auto_approved.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                {((fraudStats.auto_approved / fraudStats.total_sessions) * 100).toFixed(1)}% of total
              </div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Manual Reviews</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
                {fraudStats.manual_reviews.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                {((fraudStats.manual_reviews / fraudStats.total_sessions) * 100).toFixed(1)}% of total
              </div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid #ef4444' }}>
              <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Fraud Detected</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>
                {fraudStats.fraud_detected.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                {((fraudStats.fraud_detected / fraudStats.total_sessions) * 100).toFixed(1)}% of total
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detection Trend Chart */}
      <div style={{
        background: '#161B22',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Detection Trend (Last {timeRange === '7d' ? '7' : '30'} Days)</h2>
        {detectionTrend.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
            <Activity size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>No detection data available for this period</p>
          </div>
        ) : (
          <>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px 0' }}>
              {detectionTrend.map((day: any, idx: number) => {
                const total = day.deepfake + day.replay + day.injection + day.face_swap;
                const heightPercent = (total / maxValue) * 100;
                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '100%', height: '240px', display: 'flex', flexDirection: 'column-reverse', gap: '2px' }}>
                      <div
                        title={`Deepfake: ${day.deepfake}`}
                        style={{
                          width: '100%',
                          height: `${(day.deepfake / total) * heightPercent}%`,
                          background: '#ef4444',
                          borderRadius: '4px 4px 0 0',
                          cursor: 'pointer',
                        }}
                      />
                      <div
                        title={`Replay: ${day.replay}`}
                        style={{
                          width: '100%',
                          height: `${(day.replay / total) * heightPercent}%`,
                          background: '#f59e0b',
                          cursor: 'pointer',
                        }}
                      />
                      <div
                        title={`Injection: ${day.injection}`}
                        style={{
                          width: '100%',
                          height: `${(day.injection / total) * heightPercent}%`,
                          background: '#8b5cf6',
                          cursor: 'pointer',
                        }}
                      />
                      <div
                        title={`Face Swap: ${day.face_swap}`}
                        style={{
                          width: '100%',
                          height: `${(day.face_swap / total) * heightPercent}%`,
                          background: '#ec4899',
                          borderRadius: '0 0 4px 4px',
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>{day.date}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>{total}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} />
                <span style={{ fontSize: '13px', color: '#e8eaed' }}>Deepfake</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: '#f59e0b', borderRadius: '3px' }} />
                <span style={{ fontSize: '13px', color: '#e8eaed' }}>Replay</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: '#8b5cf6', borderRadius: '3px' }} />
                <span style={{ fontSize: '13px', color: '#e8eaed' }}>Injection</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: '#ec4899', borderRadius: '3px' }} />
                <span style={{ fontSize: '13px', color: '#e8eaed' }}>Face Swap</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
