import { ChevronDown } from 'lucide-react';
import { theme, selectStyles } from '@/styles/theme';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export function Select({ value, onChange, options, placeholder, required }: SelectProps) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{
          ...selectStyles,
          appearance: 'none',
          paddingRight: '40px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#10b981';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = theme.colors.border.default;
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: '#10b981',
      }}>
        <ChevronDown size={20} />
      </div>
    </div>
  );
}
