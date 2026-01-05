'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, Shield } from 'lucide-react';
import { Subscription } from '@/lib/types/checkout';
import { colors } from '@/lib/colors';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ 
      backgroundColor: colors.background.main,
      border: `1px solid ${colors.border.light}`,
      borderRadius: '12px',
      padding: '32px',
    }}>
      {/* Cabeçalho - Sempre visível */}
      <div style={{ marginBottom: showDetails ? '24px' : '0' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '600',
          color: colors.text.primary,
          marginBottom: '8px',
        }}>
          {subscription.name}
        </h2>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
          <span style={{ 
            fontSize: '36px', 
            fontWeight: '600',
            color: colors.text.primary,
          }}>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(subscription.pricePerInstallment)}
          </span>
          <span style={{ 
            fontSize: '16px',
            color: colors.text.secondary,
          }}>
            por {subscription.installments === 1 ? 'mês' : 'ano'}
          </span>
        </div>
        
        {/* Botão Exibir detalhes - apenas mobile */}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="details-toggle"
          style={{
            display: 'none',
            width: '100%',
            padding: '12px',
            backgroundColor: colors.background.gray,
            border: `1px solid ${colors.border.light}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: colors.text.primary,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          Exibir detalhes
          <span style={{ 
            transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
            display: 'inline-block',
          }}>▼</span>
        </button>
      </div>

      {/* Detalhes - Colapsável em mobile, sempre visível em desktop */}
      <div 
        className="details-content"
        style={{
          display: 'block',
        }}
      >
        <p style={{ 
          fontSize: '14px',
          color: colors.text.secondary,
          lineHeight: '1.5',
          marginBottom: '24px',
        }}>
          {subscription.description}
        </p>

        <div style={{ 
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: `1px solid ${colors.border.light}`,
        }}>
          <p style={{ 
            fontSize: '13px',
            color: colors.text.secondary,
          }}>
            Renovação automática. Cancele quando quiser.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: '14px',
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: '16px',
          }}>
            O que está incluído:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {subscription.features.map((feature, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: colors.gradient.vibrant,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Check size={14} color="white" strokeWidth={3} />
                </div>
                <span style={{ fontSize: '14px', color: colors.text.secondary, lineHeight: '1.5' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Segurança */}
        <div style={{ 
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: `1px solid ${colors.border.light}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Shield size={18} color={colors.text.secondary} />
          <p style={{ 
            fontSize: '13px',
            color: colors.text.secondary,
            margin: 0,
          }}>
            Ambiente protegido por Pragma
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .details-toggle {
            display: flex !important;
          }
          .details-content {
            max-height: ${showDetails ? '1000px' : '0'};
            opacity: ${showDetails ? '1' : '0'};
            overflow: hidden;
            transition: max-height 0.3s ease, opacity 0.3s ease;
          }
        }
      `}</style>
    </div>
  );
};
