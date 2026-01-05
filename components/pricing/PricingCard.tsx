'use client';

import React from 'react';
import { PricingPlan } from '@/lib/types/pricing';
import { colors } from '@/lib/colors';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (plan: PricingPlan) => void;
  billingCycle?: 'monthly' | 'annual';
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect, billingCycle = 'monthly' }) => {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '16px',
        padding: '40px 32px',
        transition: 'all 0.3s',
        background: plan.isPopular
          ? `linear-gradient(to bottom right, ${colors.ai.cardBg}, ${colors.ai.cardBgDark})`
          : colors.ai.cardBg,
        border: plan.isPopular
          ? `2px solid ${colors.border.green}`
          : `1px solid ${colors.ai.cardBorder}`,
        boxShadow: plan.isPopular
          ? '0 20px 40px rgba(16, 185, 129, 0.2)'
          : '0 10px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Header: Icon, Name e Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: colors.ai.iconBg }}>
            <svg
              style={{ width: '24px', height: '24px', color: colors.text.grayLight }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: colors.text.white }}>{plan.name}</h3>
        </div>
        
        {plan.badge && (
          <span style={{
            backgroundColor: colors.ai.badgeBg,
            color: colors.ai.badgeText,
            fontSize: '12px',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '6px',
          }}>
            {plan.badge}
          </span>
        )}
      </div>

      {/* Preço */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '48px', fontWeight: '700', color: colors.text.white }}>
            R$ {plan.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <p style={{ color: colors.text.grayLight, fontSize: '14px', marginTop: '8px' }}>
          por {plan.period}
          {billingCycle === 'annual' && plan.period === 'anual' && (
            <span style={{ color: colors.primary.green, marginLeft: '8px', fontWeight: '600' }}>
              • Economize 20%
            </span>
          )}
        </p>
      </div>

      {/* Descrição */}
      <p style={{ color: colors.text.gray, fontSize: '14px', marginBottom: '28px', lineHeight: '1.6' }}>
        {plan.description}
      </p>

      {/* Botão */}
      <button
        onClick={() => onSelect(plan)}
        style={{
          width: '100%',
          marginBottom: '28px',
          padding: '14px 24px',
          fontSize: '15px',
          fontWeight: '600',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: plan.isPopular
            ? `linear-gradient(to right, ${colors.gradient.greenFrom}, ${colors.gradient.greenTo})`
            : colors.background.card,
          color: colors.text.white,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        Começar agora
      </button>

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {plan.features.map((feature, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: colors.ai.checkCircleBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}>
              <svg
                style={{ width: '12px', height: '12px', color: colors.ai.checkIcon }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span style={{ color: colors.text.gray, fontSize: '14px' }}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
