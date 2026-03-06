export const theme = {
  colors: {
    // Cybersecurity Dark Theme - Black & Green
    background: {
      primary: '#0B0F14',
      secondary: '#161B22',
      tertiary: 'rgba(16, 185, 129, 0.05)',
      elevated: '#161B22',
      solid: '#0B0F14',
    },
    // Text
    text: {
      primary: '#E5E7EB',
      secondary: '#9CA3AF',
      tertiary: '#6B7280',
      inverse: '#0B0F14',
    },
    // Accent Colors - Green Cybersecurity Theme
    accent: {
      green: '#10B981',
      lightGreen: '#22C55E',
      cyan: '#34D399',
      amber: '#F59E0B',
      red: '#EF4444',
      purple: '#8B5CF6',
    },
    // Risk Levels
    risk: {
      verified: '#10B981',
      suspicious: '#F59E0B',
      high: '#EF4444',
      critical: '#DC2626',
    },
    // Roles
    role: {
      admin: '#10B981',
      analyst: '#F59E0B',
      viewer: '#6B7280',
    },
    // UI Elements
    border: {
      default: 'rgba(16, 185, 129, 0.2)',
      hover: 'rgba(16, 185, 129, 0.4)',
      focus: '#22C55E',
    },
    // Status
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#34D399',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.8)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.8)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8)',
    glow: {
      cyan: '0 0 30px rgba(52, 211, 153, 0.4)',
      amber: '0 0 30px rgba(245, 158, 11, 0.4)',
      red: '0 0 30px rgba(239, 68, 68, 0.4)',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    secondary: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)',
    danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    background: 'linear-gradient(135deg, #0B0F14 0%, #111827 100%)',
  },
};

export const buttonStyles = {
  base: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  primary: {
    background: theme.gradients.primary,
    color: theme.colors.text.primary,
    boxShadow: theme.shadows.md,
  },
  danger: {
    background: theme.gradients.danger,
    color: theme.colors.text.primary,
    boxShadow: theme.shadows.md,
  },
  warning: {
    background: theme.gradients.warning,
    color: theme.colors.text.inverse,
    boxShadow: theme.shadows.md,
  },
  success: {
    background: theme.gradients.success,
    color: theme.colors.text.primary,
    boxShadow: theme.shadows.md,
  },
  secondary: {
    background: theme.colors.background.elevated,
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border.default}`,
    boxShadow: 'none',
  },
};

export const selectStyles = {
  width: '100%',
  padding: '12px',
  background: theme.colors.background.elevated,
  color: theme.colors.text.primary,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all 0.2s',
};

export const inputStyles = {
  width: '100%',
  padding: '12px',
  background: theme.colors.background.elevated,
  color: theme.colors.text.primary,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: '8px',
  fontSize: '14px',
  transition: 'all 0.2s',
};

export const cardStyles = {
  background: theme.colors.background.secondary,
  padding: '24px',
  borderRadius: '12px',
  border: `1px solid ${theme.colors.border.default}`,
  boxShadow: theme.shadows.md,
};
