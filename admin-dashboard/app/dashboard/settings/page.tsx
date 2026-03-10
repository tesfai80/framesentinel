'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { TenantSettings } from '@/types';
import { Save } from 'lucide-react';
import { toast } from '@/components/Toast';
import { Loading } from '@/components/Loading';

export default function SettingsPage() {
  const [settings, setSettings] = useState<TenantSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tenantId, setTenantId] = useState('default');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setTenantId(user.tenant || 'default');
  }, []);

  useEffect(() => {
    if (tenantId) loadSettings();
  }, [tenantId]);

  const loadSettings = async () => {
    try {
      const data = await api.getTenantSettings(tenantId);
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Failed to load settings. Creating default settings...');
      setSettings({
        tenant_id: tenantId,
        verified_threshold: 0.75,
        suspicious_threshold: 0.50,
        retention_days: 30,
        max_video_size_mb: 100,
        allowed_formats: ['mp4', 'avi', 'mov', 'webm'],
        webhook_url: '',
        webhook_enabled: false,
        deepfake_threshold: 0.70,
        replay_threshold: 0.65,
        injection_threshold: 0.60,
        face_swap_threshold: 0.75,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await api.updateTenantSettings(tenantId, settings);
      toast.success('Settings saved successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading message="Loading settings..." />;
  if (!settings) return <div style={{ textAlign: 'center', padding: '50px', color: '#9ca3af' }}>Settings not found</div>;

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#e8eaed' }}>Settings</h1>

      <div style={{
        background: 'rgba(42, 52, 65, 0.5)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Risk Mapping Configuration</h2>
        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '20px' }}>
          Define how authenticity scores map to risk decisions
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(16, 185, 129, 0.2)' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Score Range</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Risk Level</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Outcome</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <td style={{ padding: '12px', fontSize: '14px', color: '#e8eaed' }}>0 - 60%</td>
              <td style={{ padding: '12px' }}>
                <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }}>
                  HIGH_RISK
                </span>
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#ef4444', fontWeight: '600' }}>Auto Reject</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <td style={{ padding: '12px', fontSize: '14px', color: '#e8eaed' }}>61 - 80%</td>
              <td style={{ padding: '12px' }}>
                <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid #f59e0b' }}>
                  SUSPICIOUS
                </span>
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#f59e0b', fontWeight: '600' }}>Manual Review</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', fontSize: '14px', color: '#e8eaed' }}>81 - 100%</td>
              <td style={{ padding: '12px' }}>
                <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid #10b981' }}>
                  VERIFIED
                </span>
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#10b981', fontWeight: '600' }}>Auto Approve</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        background: 'rgba(42, 52, 65, 0.5)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Webhook Configuration</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.webhook_enabled}
              onChange={(e) => setSettings({ ...settings, webhook_enabled: e.target.checked })}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: '#10b981',
              }}
            />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Enable Webhook</span>
          </label>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
            Webhook URL
          </label>
          <input
            type="url"
            value={settings.webhook_url || ''}
            onChange={(e) => setSettings({ ...settings, webhook_url: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '8px',
              fontSize: '14px',
              background: '#111827',
              color: '#e8eaed',
            }}
            placeholder="https://your-domain.com/webhook"
          />
          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
            Receive notifications when sessions are completed
          </p>
        </div>
      </div>

      <div style={{
        background: 'rgba(42, 52, 65, 0.5)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Detection Thresholds</h2>
        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '20px' }}>
          Adjust sensitivity for fraud detection modules (0.0 - 1.0)
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
              Deepfake Threshold
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSettings({ ...settings, deepfake_threshold: Math.max(0, settings.deepfake_threshold - 0.05) })}
                style={{
                  padding: '10px 16px',
                  background: '#1F2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >−</button>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={settings.deepfake_threshold}
                onChange={(e) => setSettings({ ...settings, deepfake_threshold: parseFloat(e.target.value) })}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                  textAlign: 'center',
                }}
              />
              <button
                onClick={() => setSettings({ ...settings, deepfake_threshold: Math.min(1, settings.deepfake_threshold + 0.05) })}
                style={{
                  padding: '10px 16px',
                  background: '#1F2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >+</button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
              Replay Attack Threshold
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSettings({ ...settings, replay_threshold: Math.max(0, settings.replay_threshold - 0.05) })}
                style={{
                  padding: '10px 16px',
                  background: '#1F2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >−</button>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={settings.replay_threshold}
                onChange={(e) => setSettings({ ...settings, replay_threshold: parseFloat(e.target.value) })}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                  textAlign: 'center',
                }}
              />
              <button
                onClick={() => setSettings({ ...settings, replay_threshold: Math.min(1, settings.replay_threshold + 0.05) })}
                style={{
                  padding: '10px 16px',
                  background: '#1F2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >+</button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
              Injection Threshold
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSettings({ ...settings, injection_threshold: Math.max(0, settings.injection_threshold - 0.05) })}
                style={{
                  padding: '10px 16px',
                  background: '#1F2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >−</button>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={settings.injection_threshold}
                onChange={(e) => setSettings({ ...settings, injection_threshold: parseFloat(e.target.value) })}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                  textAlign: 'center',
                }}
              />
              <button
                onClick={() => setSettings({ ...settings, injection_threshold: Math.min(1, settings.injection_threshold + 0.05) })}
                style={{
                  padding: '10px 16px',
                  background: '#1F2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >+</button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
              Face Swap Threshold
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSettings({ ...settings, face_swap_threshold: Math.max(0, settings.face_swap_threshold - 0.05) })}
                style={{
                  padding: '10px 16px',
                  background: '#1F2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >−</button>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={settings.face_swap_threshold}
                onChange={(e) => setSettings({ ...settings, face_swap_threshold: parseFloat(e.target.value) })}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                  textAlign: 'center',
                }}
              />
              <button
                onClick={() => setSettings({ ...settings, face_swap_threshold: Math.min(1, settings.face_swap_threshold + 0.05) })}
                style={{
                  padding: '10px 16px',
                  background: '#1F2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >+</button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          padding: '14px 32px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#e8eaed',
          border: 'none',
          borderRadius: '8px',
          cursor: saving ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          opacity: saving ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Save size={18} />
        <span>{saving ? 'Saving...' : 'Save Settings'}</span>
      </button>
    </div>
  );
}
