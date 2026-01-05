'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Home, ArrowLeft } from 'lucide-react';
import { colors } from '@/lib/colors';

export default function NotFound() {
  const router = useRouter();

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
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Image 
            src="/images/logo/logo-pragma.png" 
            alt="Pragma" 
            width={120}
            height={40}
            style={{ height: '35px', width: 'auto' }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '120px',
          fontWeight: '700',
          background: colors.gradient.vibrant,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: '1',
          marginBottom: '24px',
        }}>
          404
        </div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: colors.text.primary,
          marginBottom: '16px',
        }}>
          Página não encontrada
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: colors.text.secondary,
          maxWidth: '500px',
          marginBottom: '40px',
          lineHeight: '1.6',
        }}>
          Ops! A página que você está procurando não existe ou foi movida.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => router.back()}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              border: `1px solid ${colors.border.light}`,
              borderRadius: '12px',
              background: colors.background.main,
              color: colors.text.primary,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.primary.purple;
              e.currentTarget.style.backgroundColor = colors.neutral.gray50;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border.light;
              e.currentTarget.style.backgroundColor = colors.background.main;
            }}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <button
            onClick={() => router.push('/')}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '12px',
              background: colors.gradient.vibrant,
              color: colors.primary.white,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Home size={18} />
            Ir para Home
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${colors.border.light}`,
        padding: '24px',
        backgroundColor: colors.background.main,
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          textAlign: 'center' 
        }}>
          <p style={{ 
            fontSize: '14px', 
            color: colors.text.secondary,
            margin: 0,
          }}>
            © {new Date().getFullYear()} Pragma. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
