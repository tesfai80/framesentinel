'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function CustomSelect({ value, onChange, options, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '14px',
          background: '#2d3548',
          color: '#e8eaed',
          border: '1px solid #374151',
          borderRadius: '10px',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#10b981';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#374151';
        }}
      >
        <span>{selectedOption?.label || placeholder || 'Select...'}</span>
        <ChevronDown 
          size={20} 
          color="#10b981" 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }} 
        />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: '#1a1f2e',
          border: '1px solid #374151',
          borderRadius: '10px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          maxHeight: '300px',
          overflowY: 'auto',
        }}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              style={{
                padding: '14px 16px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: option.value === value ? '#10b981' : '#e8eaed',
                fontWeight: option.value === value ? '600' : '400',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = option.value === value ? '#10b981' : '#e8eaed';
              }}
            >
              <span>{option.label}</span>
              {option.value === value && <Check size={16} color="#10b981" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
