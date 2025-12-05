'use client';

import React from 'react';
import { PersonalData } from '@/lib/types/checkout';
import { colors } from '@/lib/colors';

interface PersonalDataFormProps {
  personalData: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
  errors?: {
    fullName?: string;
    email?: string;
    phone?: string;
    cpf?: string;
  };
}

export const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  personalData,
  onChange,
  errors = {},
}) => {
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    onChange('phone', formatted);
  };

  const getInputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '14px 16px',
    fontSize: '14px',
    border: `1px solid ${hasError ? '#DC2626' : colors.border.light}`,
    borderRadius: '8px',
    backgroundColor: colors.background.main,
    color: colors.text.primary,
    outline: 'none',
  });

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: '8px',
  };

  const errorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '8px',
    padding: '8px 12px',
    backgroundColor: '#FEE2E2',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#DC2626',
  };

  return (
    <div>
      <h2 style={{ 
        fontSize: '18px', 
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: '24px',
      }}>
        Dados Pessoais
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Nome completo</label>
          <input
            type="text"
            value={personalData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="Digite seu nome completo"
            style={getInputStyle(!!errors.fullName)}
          />
          {errors.fullName && (
            <div style={errorStyle}>
              <span>⚠</span>
              <span>{errors.fullName}</span>
            </div>
          )}
        </div>

        <div>
          <label style={labelStyle}>E-mail</label>
          <input
            type="email"
            value={personalData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="seu@email.com"
            style={getInputStyle(!!errors.email)}
          />
          {errors.email && (
            <div style={errorStyle}>
              <span>⚠</span>
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div>
          <label style={labelStyle}>Telefone</label>
          <input
            type="tel"
            value={personalData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="(99) 99999-9999"
            maxLength={15}
            style={getInputStyle(!!errors.phone)}
          />
          {errors.phone && (
            <div style={errorStyle}>
              <span>⚠</span>
              <span>{errors.phone}</span>
            </div>
          )}
        </div>

        <div>
          <label style={labelStyle}>CPF/CNPJ</label>
          <input
            type="text"
            value={personalData.cpf}
            onChange={(e) => onChange('cpf', e.target.value)}
            placeholder="000.000.000-00"
            style={getInputStyle(!!errors.cpf)}
          />
          {errors.cpf && (
            <div style={errorStyle}>
              <span>⚠</span>
              <span>{errors.cpf}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
