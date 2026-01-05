'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { ChatInterface } from '@/components/demo/ChatInterface';
import { colors } from '@/lib/colors';

export default function DemoPage() {
  const router = useRouter();
  const [credits, setCredits] = useState<number>(10);

  useEffect(() => {
    // Recupera créditos do localStorage
    const savedCredits = localStorage.getItem('pragmaCredits');
    if (savedCredits) {
      setCredits(parseInt(savedCredits));
    } else {
      localStorage.setItem('pragmaCredits', '10');
    }
  }, []);

  const handleUseCredit = () => {
    const newCredits = credits - 1;
    setCredits(newCredits);
    localStorage.setItem('pragmaCredits', newCredits.toString());
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.background.main,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ 
        padding: '16px 0',
        borderBottom: `1px solid ${colors.border.light}`,
        backgroundColor: colors.background.main,
      }}>
        <div className="demo-header" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div className="demo-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={() => router.push('/')}
              className="btn-back"
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                fontSize: '14px',
                color: colors.text.secondary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.text.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.text.secondary}
            >
              <ChevronLeft size={18} />
              <span className="back-text">Voltar</span>
            </button>
            <Image 
              src="/images/logo/logo-pragma.png" 
              alt="Pragma" 
              width={100}
              height={33}
              className="demo-logo"
              style={{ height: '33px', width: 'auto' }}
            />
          </div>
          
          <div className="demo-right" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
          }}>
            <div className="credits-badge" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: credits > 3 ? colors.neutral.gray50 : '#FEF2F2',
              borderRadius: '8px',
              border: `1px solid ${credits > 3 ? colors.border.light : '#FECACA'}`,
              whiteSpace: 'nowrap',
            }}>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: credits > 3 ? colors.text.primary : '#DC2626',
              }}>
                {credits} <span className="credit-text">{credits === 1 ? 'crédito' : 'créditos'}</span>
              </span>
            </div>
            
            <button
              onClick={() => router.push('/')}
              className="btn-plans"
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                background: colors.gradient.vibrant,
                color: colors.primary.white,
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Ver Planos
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div style={{ 
        flex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <ChatInterface credits={credits} onUseCredit={handleUseCredit} />
      </div>

      {/* Estilos responsivos */}
      <style jsx>{`
        @media (max-width: 768px) {
          .demo-header {
            padding: 0 16px !important;
          }
          
          .demo-logo {
            height: 28px !important;
          }
          
          .demo-left {
            gap: 12px !important;
          }
          
          .demo-right {
            gap: 8px !important;
          }
          
          .credits-badge {
            padding: 6px 12px !important;
          }
          
          .credits-badge span {
            font-size: 13px !important;
          }
          
          .btn-plans {
            padding: 8px 16px !important;
            font-size: 13px !important;
          }
        }
        
        @media (max-width: 480px) {
          .demo-header {
            padding: 0 12px !important;
          }
          
          .demo-logo {
            height: 26px !important;
          }
          
          .demo-left {
            gap: 8px !important;
          }
          
          .back-text {
            display: none;
          }
          
          .demo-right {
            gap: 6px !important;
          }
          
          .credit-text {
            display: none;
          }
          
          .credits-badge {
            padding: 6px 10px !important;
          }
          
          .credits-badge span {
            font-size: 12px !important;
          }
          
          .btn-plans {
            padding: 7px 12px !important;
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 380px) {
          .demo-logo {
            height: 24px !important;
          }
          
          .btn-back {
            padding: 6px !important;
          }
          
          .credits-badge {
            padding: 5px 8px !important;
          }
          
          .btn-plans {
            padding: 6px 10px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
}
