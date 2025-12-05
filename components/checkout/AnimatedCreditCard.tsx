'use client';

import React, { useState } from 'react';
import { colors } from '@/lib/colors';

interface AnimatedCreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  onCardNumberChange: (value: string) => void;
  onCardHolderChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
}

export const AnimatedCreditCard: React.FC<AnimatedCreditCardProps> = ({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  onCardNumberChange,
  onCardHolderChange,
  onExpiryDateChange,
  onCvvChange,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.match(/.{1,4}/g)?.join(' ') || numbers;
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.substring(0, 2) + '/' + numbers.substring(2, 4);
    }
    return numbers;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    onCardNumberChange(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    onExpiryDateChange(formatted);
  };

  const handleCvvFocus = () => {
    setIsFlipped(true);
    setFocusedField('cvv');
  };

  const handleCvvBlur = () => {
    setIsFlipped(false);
    setFocusedField(null);
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    height: '240px',
    margin: '0 auto 32px',
    perspective: '1000px',
  };

  const cardInnerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
  };

  const cardFaceStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  };

  const cardFrontStyle: React.CSSProperties = {
    ...cardFaceStyle,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const cardBackStyle: React.CSSProperties = {
    ...cardFaceStyle,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    transform: 'rotateY(180deg)',
  };

  return (
    <div>
      <div style={cardStyle}>
        <div style={cardInnerStyle}>
          {/* Front of Card */}
          <div style={cardFrontStyle}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>💳</div>
              <div style={{ fontSize: '11px', opacity: 0.8, letterSpacing: '1px' }}>
                CREDIT CARD
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '22px', 
                fontFamily: 'monospace',
                letterSpacing: '2px',
                marginBottom: '20px',
                minHeight: '28px',
              }}>
                {cardNumber || '•••• •••• •••• ••••'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '4px' }}>
                    CARD HOLDER
                  </div>
                  <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {cardHolder || 'NOME NO CARTÃO'}
                  </div>
                </div>
                <div style={{ marginLeft: '16px' }}>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '4px' }}>
                    EXPIRES
                  </div>
                  <div style={{ fontSize: '14px', letterSpacing: '1px' }}>
                    {expiryDate || 'MM/AA'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div style={cardBackStyle}>
            <div style={{ 
              backgroundColor: '#000', 
              height: '50px', 
              margin: '-24px -24px 20px',
              marginTop: '30px',
            }} />
            <div style={{ 
              backgroundColor: '#fff', 
              height: '40px', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '0 12px',
              fontFamily: 'monospace',
              fontSize: '18px',
              color: '#000',
              letterSpacing: '2px',
            }}>
              {cvv || '•••'}
            </div>
            <div style={{ 
              fontSize: '10px', 
              marginTop: '12px', 
              opacity: 0.8,
              textAlign: 'right',
            }}>
              CVV
            </div>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ 
            display: 'block',
            fontSize: '13px',
            fontWeight: '500',
            color: colors.text.primary,
            marginBottom: '8px',
          }}>
            Número do cartão
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            onFocus={() => setFocusedField('cardNumber')}
            onBlur={() => setFocusedField(null)}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '14px',
              border: `2px solid ${focusedField === 'cardNumber' ? colors.text.primary : colors.border.light}`,
              borderRadius: '8px',
              backgroundColor: colors.background.main,
              color: colors.text.primary,
              outline: 'none',
              transition: 'border-color 0.2s',
              fontFamily: 'monospace',
              letterSpacing: '1px',
            }}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block',
            fontSize: '13px',
            fontWeight: '500',
            color: colors.text.primary,
            marginBottom: '8px',
          }}>
            Nome no cartão
          </label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => onCardHolderChange(e.target.value.toUpperCase())}
            onFocus={() => setFocusedField('cardHolder')}
            onBlur={() => setFocusedField(null)}
            placeholder="NOME COMO ESTÁ NO CARTÃO"
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '14px',
              border: `2px solid ${focusedField === 'cardHolder' ? colors.text.primary : colors.border.light}`,
              borderRadius: '8px',
              backgroundColor: colors.background.main,
              color: colors.text.primary,
              outline: 'none',
              transition: 'border-color 0.2s',
              textTransform: 'uppercase',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: colors.text.primary,
              marginBottom: '8px',
            }}>
              Validade
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryChange}
              onFocus={() => setFocusedField('expiryDate')}
              onBlur={() => setFocusedField(null)}
              placeholder="MM/AA"
              maxLength={5}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '14px',
                border: `2px solid ${focusedField === 'expiryDate' ? colors.text.primary : colors.border.light}`,
                borderRadius: '8px',
                backgroundColor: colors.background.main,
                color: colors.text.primary,
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'monospace',
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: colors.text.primary,
              marginBottom: '8px',
            }}>
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => onCvvChange(e.target.value.replace(/\D/g, '').substring(0, 3))}
              onFocus={handleCvvFocus}
              onBlur={handleCvvBlur}
              placeholder="123"
              maxLength={3}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '14px',
                border: `2px solid ${focusedField === 'cvv' ? colors.text.primary : colors.border.light}`,
                borderRadius: '8px',
                backgroundColor: colors.background.main,
                color: colors.text.primary,
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'monospace',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
