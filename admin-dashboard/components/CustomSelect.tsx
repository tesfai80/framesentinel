import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function CustomSelect({ value, onChange, options }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '10px 14px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '8px',
          fontSize: '14px',
          background: '#111827',
          color: '#e8eaed',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{selectedOption?.label || 'Select...'}</span>
        <ChevronDown size={16} color="#10b981" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          background: '#1F2937',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          overflow: 'hidden',
        }}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              style={{
                padding: '12px 16px',
                fontSize: '14px',
                color: value === option.value ? '#10B981' : '#E5E7EB',
                background: value === option.value ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: value === option.value ? '600' : '500',
              }}
              onMouseEnter={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                  e.currentTarget.style.color = '#10B981';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#E5E7EB';
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
