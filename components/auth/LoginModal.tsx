'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { colors } from '@/lib/colors';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Cadastro:', { name, email, password, confirmPassword });
    } else {
      console.log('Login:', { email, password });
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Login social:', provider);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: colors.background.main,
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.neutral.gray100}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <X size={24} color={colors.text.secondary} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '8px',
            background: colors.gradient.vibrant,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {isSignUp ? 'Criar sua conta' : 'Bem-vindo de volta'}
          </h2>
          <p style={{ color: colors.text.secondary, fontSize: '14px' }}>
            {isSignUp ? 'Preencha os dados para começar' : 'Faça login para continuar'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          {/* Name Input (apenas no cadastro) */}
          {isSignUp && (
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.text.primary,
                  marginBottom: '8px',
                }}
              >
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: `1px solid ${colors.border.light}`,
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: colors.background.main,
                  color: colors.text.primary,
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.purple}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border.light}
              />
            </div>
          )}

          {/* Email Input */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: '8px',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: `1px solid ${colors.border.light}`,
                borderRadius: '12px',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: colors.background.main,
                color: colors.text.primary,
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.purple}
              onBlur={(e) => e.currentTarget.style.borderColor = colors.border.light}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: isSignUp ? '20px' : '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: '8px',
              }}
            >
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: `1px solid ${colors.border.light}`,
                borderRadius: '12px',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: colors.background.main,
                color: colors.text.primary,
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.purple}
              onBlur={(e) => e.currentTarget.style.borderColor = colors.border.light}
            />
          </div>

          {/* Confirm Password Input (apenas no cadastro) */}
          {isSignUp && (
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.text.primary,
                  marginBottom: '8px',
                }}
              >
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: `1px solid ${colors.border.light}`,
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: colors.background.main,
                  color: colors.text.primary,
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.purple}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border.light}
              />
            </div>
          )}

          {/* Login/SignUp Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '12px',
              background: colors.gradient.vibrant,
              color: colors.text.white,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25), 0 4px 16px rgba(139, 92, 246, 0.15)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {isSignUp ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        {/* Divider - Apenas no Login */}
        {!isSignUp && (
          <>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              marginBottom: '24px',
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: colors.border.light }} />
              <span style={{ fontSize: '13px', color: colors.text.secondary }}>ou continue com</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: colors.border.light }} />
            </div>

            {/* Social Login Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Google */}
          <button
            onClick={() => handleSocialLogin('google')}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '600',
              border: `1px solid ${colors.border.light}`,
              borderRadius: '12px',
              background: colors.background.main,
              color: colors.text.primary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.2s',
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
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleSocialLogin('facebook')}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '600',
              border: `1px solid ${colors.border.light}`,
              borderRadius: '12px',
              background: colors.background.main,
              color: colors.text.primary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.2s',
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>

          {/* Apple */}
          <button
            onClick={() => handleSocialLogin('apple')}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '600',
              border: `1px solid ${colors.border.light}`,
              borderRadius: '12px',
              background: colors.background.main,
              color: colors.text.primary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.2s',
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Apple
          </button>
        </div>
          </>
        )}

        {/* Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: colors.text.secondary }}>
            {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
              style={{ 
                color: colors.primary.purple, 
                fontWeight: '600',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              {isSignUp ? 'Fazer login' : 'Criar conta'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
