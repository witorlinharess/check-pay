'use client';

import React from 'react';
import { colors } from '@/lib/colors';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  const baseStyle: React.CSSProperties = {
    padding: '14px 24px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: `linear-gradient(45deg, ${colors.gradient.one}, ${colors.gradient.two})`,
    color: colors.primary.white,
  };

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: colors.background.gray,
    color: colors.text.primary,
    border: `1px solid ${colors.border.light}`,
  };

  const buttonStyle = variant === 'primary' ? primaryStyle : secondaryStyle;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.currentTarget.style.opacity = '0.9';
          } else {
            e.currentTarget.style.backgroundColor = '#EEEEEE';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.currentTarget.style.opacity = '1';
          } else {
            e.currentTarget.style.backgroundColor = colors.background.gray;
          }
        }
      }}
    >
      {children}
    </button>
  );
};
