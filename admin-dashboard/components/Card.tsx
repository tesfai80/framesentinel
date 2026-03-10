import { ReactNode, CSSProperties } from 'react';
import { theme } from '@/styles/theme';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  hover?: boolean;
  glow?: 'cyan' | 'amber' | 'red' | 'none';
}

export function Card({ children, style, hover = false, glow = 'none' }: CardProps) {
  const baseStyle: CSSProperties = {
    background: 'linear-gradient(135deg, rgba(42, 52, 65, 0.6) 0%, rgba(35, 45, 58, 0.7) 100%)',
    backdropFilter: 'blur(10px)',
    padding: '24px',
    borderRadius: '12px',
    border: `1px solid rgba(16, 185, 129, 0.25)`,
    boxShadow: glow !== 'none' ? theme.shadows.glow[glow] : '0 2px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    overflow: 'hidden',
    ...style,
  };

  return (
    <div
      style={baseStyle}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3), 0 0 12px rgba(16, 185, 129, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.25)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = glow !== 'none' ? theme.shadows.glow[glow] : '0 2px 8px rgba(0, 0, 0, 0.2)';
        }
      }}
    >
      {children}
    </div>
  );
}
