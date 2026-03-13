import { Calendar } from 'lucide-react';

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CustomDatePicker({ value, onChange, placeholder = 'Select date' }: CustomDatePickerProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Calendar 
        size={16} 
        style={{ 
          position: 'absolute', 
          left: '14px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: '#10b981',
          pointerEvents: 'none',
          zIndex: 1,
        }} 
      />
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 14px 10px 40px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '8px',
          fontSize: '14px',
          background: '#111827',
          color: '#e8eaed',
          cursor: 'pointer',
          colorScheme: 'dark',
        }}
      />
    </div>
  );
}
