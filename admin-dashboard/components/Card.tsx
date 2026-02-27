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
    background: 'rgba(26, 31, 46, 0.6)',
    backdropFilter: 'blur(10px)',
    padding: '24px',
    borderRadius: '12px',
    border: `1px solid ${glow === 'none' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.4)'}`,
    boxShadow: glow !== 'none' ? theme.shadows.glow[glow] : theme.shadows.md,
    transition: 'all 0.2s',
    ...style,
  };

  return (
    <div
      style={baseStyle}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = theme.colors.border.hover;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = theme.colors.border.default;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </div>
  );
}
