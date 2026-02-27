'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarChart3, Video, Search, Webhook, FileText, Settings, Users, LogOut } from 'lucide-react';
import { ToastContainer } from '@/components/Toast';
import { ConfirmProvider } from '@/components/ConfirmDialog';
import { FrameSentinelLogo } from '@/components/Logo';
import { theme } from '@/styles/theme';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: BarChart3 },
    { path: '/dashboard/sessions', label: 'Sessions', icon: Video },
    { path: '/dashboard/review', label: 'Review Queue', icon: Search },
    { path: '/dashboard/webhooks', label: 'Webhooks', icon: Webhook },
    { path: '/dashboard/audit', label: 'Audit Logs', icon: FileText },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
    { path: '/dashboard/users', label: 'Users', icon: Users },
  ];

  return (
    <ConfirmProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: 'rgba(15, 20, 25, 0.95)',
        backdropFilter: 'blur(10px)',
        color: theme.colors.text.primary,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid rgba(16, 185, 129, 0.2)`,
      }}>
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FrameSentinelLogo size={32} />
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '2px', color: '#10b981' }}>FrameSentinel</h2>
            <p style={{ fontSize: '11px', color: theme.colors.text.tertiary, letterSpacing: '0.5px' }}>FRAUD COMMAND CENTER</p>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
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
              </a>
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
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {children}
      </div>
      
      <ToastContainer />
    </div>
    </ConfirmProvider>
  );
}
