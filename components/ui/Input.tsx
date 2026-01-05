import React from 'react';
import { colors } from '@/lib/colors';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = '',
  icon,
}) => {
  return (
    <div style={{ marginBottom: '20px' }} className={className}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: colors.text.primary,
          marginBottom: '8px',
        }}>
          {label}
          {required && <span style={{ color: colors.status.error, marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: colors.text.light,
          }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{
            width: '100%',
            padding: icon ? '12px 16px 12px 40px' : '12px 16px',
            fontSize: '14px',
            border: `1px solid ${error ? colors.status.error : colors.border.light}`,
            borderRadius: '12px',
            outline: 'none',
            transition: 'border-color 0.2s',
            backgroundColor: error ? '#FEF2F2' : colors.background.main,
            color: colors.text.primary,
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = error ? colors.status.error : colors.primary.purple}
          onBlur={(e) => e.currentTarget.style.borderColor = error ? colors.status.error : colors.border.light}
        />
      </div>
      {error && <p style={{ color: colors.status.error, fontSize: '13px', marginTop: '6px' }}>{error}</p>}
    </div>
  );
};
