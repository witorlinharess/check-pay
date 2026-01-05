'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PricingCard } from '@/components/pricing/PricingCard';
import { PricingPlan, pricingPlans } from '@/lib/types/pricing';
import { colors } from '@/lib/colors';

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSelectPlan = (plan: PricingPlan) => {
    sessionStorage.setItem('selectedPlan', JSON.stringify(plan));
    router.push('/checkout');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background.main }}>
      {/* Header com Logo */}
      <div style={{ 
        padding: '24px 0',
        borderBottom: `1px solid ${colors.border.light}`,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center' }}>
          <Image 
            src="/images/logo/logo-maind.png" 
            alt="Aira - IA Assistente" 
            width={120}
            height={40}
            style={{ height: '40px', width: 'auto' }}
          />
        </div>
      </div>

      {/* Content Wrapper Centralizado */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '64px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', color: colors.text.primary, marginBottom: '24px', lineHeight: '1.1' }}>
            Inteligência Artificial.
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Preços transparentes.
            </span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: colors.text.secondary, marginBottom: '32px', maxWidth: '700px', margin: '0 auto 32px auto' }}>
            Escolha o plano ideal para potencializar seu trabalho com IA — desde uso individual até soluções empresariais.
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: colors.background.gray, borderRadius: '9999px', padding: '4px', border: `1px solid ${colors.border.light}` }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '8px 24px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: billingCycle === 'monthly' ? colors.primary.white : 'transparent',
                  color: billingCycle === 'monthly' ? colors.text.primary : colors.text.secondary,
                  boxShadow: billingCycle === 'monthly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                style={{
                  padding: '8px 24px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: billingCycle === 'annual' ? colors.primary.white : 'transparent',
                  color: billingCycle === 'annual' ? colors.text.primary : colors.text.secondary,
                  boxShadow: billingCycle === 'annual' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                Anual
              </button>
            </div>
            {billingCycle === 'annual' && (
              <span style={{
                backgroundColor: colors.ai.badgeBg,
                color: colors.ai.badgeText,
                fontSize: '13px',
                fontWeight: '600',
                padding: '6px 12px',
                borderRadius: '6px',
              }}>
                Economize 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          margin: '0 auto',
          flexWrap: 'wrap',
          padding: '0 0 64px 0',
        }}>
          {pricingPlans.map((plan) => {
            const adjustedPlan = billingCycle === 'annual' ? {
              ...plan,
              price: plan.price * 12 * 0.8, // 20% de desconto no anual
              period: 'anual',
            } : plan;
            
            return (
              <div key={plan.id} style={{ flex: '0 1 380px', maxWidth: '400px', minWidth: '340px' }}>
                <PricingCard plan={adjustedPlan} onSelect={handleSelectPlan} billingCycle={billingCycle} />
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <p style={{ color: colors.text.secondary, fontSize: '14px' }}>
            Todos os planos incluem <span style={{ color: colors.text.primary, fontWeight: '600' }}>7 dias de teste grátis</span>. Sem compromisso, cancele quando quiser.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                style={{ width: '20px', height: '20px', color: colors.primary.green }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span style={{ color: colors.text.secondary, fontSize: '14px' }}>Dados criptografados</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                style={{ width: '20px', height: '20px', color: colors.primary.green }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span style={{ color: colors.text.secondary, fontSize: '14px' }}>IA de última geração</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                style={{ width: '20px', height: '20px', color: colors.primary.green }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span style={{ color: colors.text.secondary, fontSize: '14px' }}>Resposta instantânea</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
