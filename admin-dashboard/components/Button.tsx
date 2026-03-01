import { ReactNode } from 'react';
import { buttonStyles } from '@/styles/theme';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'warning' | 'success' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled, 
  type = 'button',
  icon,
  fullWidth 
}: ButtonProps) {
  const styles = {
    ...buttonStyles.base,
    ...buttonStyles[variant],
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.6)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        const styles = buttonStyles[variant] as any;
        e.currentTarget.style.boxShadow = styles.boxShadow || '';
      }}
    >
      {icon}
      {children}
    </button>
  );
}
