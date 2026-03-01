export const theme = {
  colors: {
    // Base Dark Theme with Green Gradient
    background: {
      primary: 'linear-gradient(135deg, #0a1f0f 0%, #0f1419 50%, #1a1f2e 100%)',
      secondary: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, #1a1f2e 100%)',
      tertiary: '#252b3b',
      elevated: '#2d3548',
      solid: '#0f1419',
    },
    // Text
    text: {
      primary: '#e8eaed',
      secondary: '#9ca3af',
      tertiary: '#6b7280',
      inverse: '#0f1419',
    },
    // Accent Colors - Green Theme
    accent: {
      green: '#10b981',
      lightGreen: '#34d399',
      cyan: '#06b6d4',
      amber: '#f59e0b',
      red: '#ef4444',
      purple: '#8b5cf6',
    },
    // Risk Levels
    risk: {
      verified: '#10b981',
      suspicious: '#f59e0b',
      high: '#ef4444',
      critical: '#dc2626',
    },
    // UI Elements
    border: {
      default: '#374151',
      hover: '#4b5563',
      focus: '#06b6d4',
    },
    // Status
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    glow: {
      cyan: '0 0 20px rgba(6, 182, 212, 0.3)',
      amber: '0 0 20px rgba(245, 158, 11, 0.3)',
      red: '0 0 20px rgba(239, 68, 68, 0.3)',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    secondary: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    background: 'linear-gradient(135deg, #0a1f0f 0%, #0f1419 50%, #1a1f2e 100%)',
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
