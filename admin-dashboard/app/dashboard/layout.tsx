'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BarChart3, Video, Search, Webhook, FileText, Settings, Users, LogOut, Key, Menu, X, Coins, Building2, TrendingUp } from 'lucide-react';
import { ToastContainer } from '@/components/Toast';
import { ConfirmProvider } from '@/components/ConfirmDialog';
import { FrameSentinelLogo } from '@/components/Logo';
import { theme } from '@/styles/theme';
import { api } from '@/lib/api';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
      loadCredits();
    }
  }, [router]);

  const loadCredits = async () => {
    try {
      const data = await api.getCredits();
      setCredits(data.remaining_credits);
    } catch (error) {
      console.error('Failed to load credits:', error);
    }
  };

  const handleLogout = async () => {
    // Clear Supabase session
    const { supabase } = await import('@/lib/supabase');
    await supabase.auth.signOut();
    
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    router.push('/login');
  };

  if (!user) return null;

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: BarChart3 },
    { path: '/dashboard/sessions', label: 'Sessions', icon: Video },
    { path: '/dashboard/review', label: 'Review Queue', icon: Search },
    { path: '/dashboard/analytics', label: 'Fraud Analytics', icon: TrendingUp },
    { path: '/dashboard/organizations', label: 'Organizations', icon: Building2 },
    { path: '/dashboard/users', label: 'Users', icon: Users },
    { path: '/dashboard/api-keys', label: 'API Keys', icon: Key },
    { path: '/dashboard/webhooks', label: 'Webhooks', icon: Webhook },
    { path: '/dashboard/audit', label: 'Audit Logs', icon: FileText },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <ConfirmProvider>
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
      
      {/* Mobile Header */}
      <div className={styles.mobileHeader} style={{
        padding: '16px',
        background: 'rgba(15, 20, 25, 0.95)',
        borderBottom: `1px solid rgba(16, 185, 129, 0.2)`,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FrameSentinelLogo size={28} />
          <span style={{ color: '#10b981', fontWeight: '600' }}>FrameSentinel</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer' }}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : styles.sidebarClosed}`} style={{
        width: '250px',
        background: '#161B22',
        backdropFilter: 'blur(10px)',
        color: theme.colors.text.primary,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid rgba(16, 185, 129, 0.2)`,
      }}>
        <div className={styles.desktopLogo} style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FrameSentinelLogo size={32} />
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '2px', color: '#10b981' }}>FrameSentinel</h2>
            <p style={{ fontSize: '11px', color: theme.colors.text.tertiary, letterSpacing: '0.5px' }}>FRAUD COMMAND CENTER</p>
          </div>
        </div>

        {credits !== null && (
          <div style={{
            padding: '12px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <Coins size={20} color="#10b981" />
            <div>
              <div style={{ fontSize: '11px', color: theme.colors.text.tertiary }}>Credits</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>{credits.toLocaleString()}</div>
            </div>
          </div>
        )}

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  background: pathname === item.path ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  color: pathname === item.path ? '#10b981' : theme.colors.text.secondary,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: pathname === item.path ? '1px solid #10b981' : '1px solid transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.path) {
                    e.currentTarget.style.background = theme.colors.background.tertiary;
                    e.currentTarget.style.borderColor = theme.colors.border.hover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.path) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{
          padding: '16px',
          background: theme.colors.background.elevated,
          borderRadius: '8px',
          marginBottom: '10px',
          border: `1px solid ${theme.colors.border.default}`,
        }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: theme.colors.text.primary }}>{user.email || user.username}</div>
          <div style={{ fontSize: '12px', color: theme.colors.text.tertiary }}>{user.tenant}</div>
          <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px', fontWeight: '600' }}>{user.role}</div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            background: theme.gradients.danger,
            color: theme.colors.text.primary,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%',
            fontWeight: '600',
          }}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent} style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {children}
      </div>
      </div>
      
      <ToastContainer />
    </div>
    </ConfirmProvider>
  );
}
