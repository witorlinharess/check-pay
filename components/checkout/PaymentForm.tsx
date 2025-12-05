'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { CardInfo } from '@/lib/types/checkout';
import { colors } from '@/lib/colors';
import { 
  VisaIcon, 
  MastercardIcon, 
  AmericanExpressIcon 
} from 'react-svg-credit-card-payment-icons';

interface PaymentFormProps {
  cardInfo: CardInfo;
  onChange: (field: keyof CardInfo, value: string) => void;
  selectedPaymentMethod: string;
  onPaymentMethodChange: (methodId: string) => void;
  errors?: {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
  };
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  cardInfo,
  onChange,
  selectedPaymentMethod,
  onPaymentMethodChange,
  errors = {},
}) => {
  const [pixKey, setPixKey] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [pixGenerated, setPixGenerated] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutos em segundos
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (pixGenerated && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [pixGenerated, timeRemaining]);

  const generatePixKey = async () => {
    // Gera uma chave PIX aleatória
    const randomKey = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}5204000053039865802BR5913AIRA6009SAO PAULO62070503***6304`;
    setPixKey(randomKey);
    
    // Gera QR Code
    try {
      const url = await QRCode.toDataURL(randomKey, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
      setPixGenerated(true);
      setTimeRemaining(120);
    } catch (err) {
      console.error('Erro ao gerar QR Code:', err);
    }
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const detectCardBrand = (cardNumber: string): string | null => {
    const number = cardNumber.replace(/\D/g, '');
    
    // Visa: começa com 4
    if (/^4/.test(number)) return 'visa';
    
    // Mastercard: 51-55 ou 2221-2720
    if (/^5[1-5]/.test(number) || /^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(number)) {
      return 'mastercard';
    }
    
    // Amex: 34 ou 37
    if (/^3[47]/.test(number)) return 'amex';
    
    // Elo: 636368, 438935, 504175, 451416, 636297, 5067, 4576, 4011
    if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(number)) {
      return 'elo';
    }
    
    // Hipercard: 606282, 3841
    if (/^(606282|3841)/.test(number)) return 'hipercard';
    
    return null;
  };

  const getCardBrandIcon = (brand: string | null) => {
    if (!brand) return null;
    
    const iconStyle = {
      position: 'absolute' as const,
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    
    const iconProps = {
      width: 45,
      height: 28,
      style: { display: 'block' }
    };
    
    switch(brand) {
      case 'visa':
        return (
          <div style={iconStyle}>
            <VisaIcon {...iconProps} />
          </div>
        );
      case 'mastercard':
        return (
          <div style={iconStyle}>
            <MastercardIcon {...iconProps} />
          </div>
        );
      case 'amex':
        return (
          <div style={iconStyle}>
            <AmericanExpressIcon {...iconProps} />
          </div>
        );
      default:
        // Para Elo e Hipercard (sem ícone na lib), mostrar texto
        return (
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: brand === 'elo' ? '#FFCB05' : '#D8232A',
            color: brand === 'elo' ? '#000000' : '#FFFFFF',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.5px',
          }}>
            {brand === 'elo' ? 'Elo' : 'Hipercard'}
          </div>
        );
    }
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.match(/.{1,4}/g)?.join(' ') || numbers;
    return formatted.substring(0, 19);
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
    onChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    onChange('expiryDate', formatted);
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
        Forma de Pagamento
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px', 
        marginBottom: '24px' 
      }}>
        <button
          type="button"
          onClick={() => onPaymentMethodChange('card')}
          style={{
            padding: '16px',
            border: `2px solid ${selectedPaymentMethod === 'card' ? colors.text.primary : colors.border.light}`,
            borderRadius: '8px',
            backgroundColor: selectedPaymentMethod === 'card' ? colors.background.gray : colors.background.main,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <Image src="/images/card-icon.svg" alt="" width={20} height={20} />
          <span style={{ 
            fontWeight: '500', 
            fontSize: '14px',
            color: colors.text.primary,
          }}>
            Cartão de Crédito
          </span>
        </button>

        <button
          type="button"
          onClick={() => onPaymentMethodChange('pix')}
          style={{
            padding: '16px',
            border: `2px solid ${selectedPaymentMethod === 'pix' ? colors.text.primary : colors.border.light}`,
            borderRadius: '8px',
            backgroundColor: selectedPaymentMethod === 'pix' ? colors.background.gray : colors.background.main,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <Image src="/images/pix-icon.svg" alt="" width={20} height={20} />
          <span style={{ 
            fontWeight: '500', 
            fontSize: '14px',
            color: colors.text.primary,
          }}>
            PIX
          </span>
        </button>
      </div>

      {selectedPaymentMethod === 'card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Número do cartão</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={cardInfo.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                style={{
                  ...getInputStyle(!!errors.cardNumber),
                  paddingRight: '80px',
                }}
              />
              {getCardBrandIcon(detectCardBrand(cardInfo.cardNumber))}
            </div>
            {errors.cardNumber && (
              <div style={errorStyle}>
                <span>⚠</span>
                <span>{errors.cardNumber}</span>
              </div>
            )}
          </div>

          <div>
            <label style={labelStyle}>Nome no cartão</label>
            <input
              type="text"
              value={cardInfo.cardHolder}
              onChange={(e) => onChange('cardHolder', e.target.value.toUpperCase())}
              placeholder="NOME COMO ESTÁ NO CARTÃO"
              style={getInputStyle(!!errors.cardHolder)}
            />
            {errors.cardHolder && (
              <div style={errorStyle}>
                <span>⚠</span>
                <span>{errors.cardHolder}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Validade</label>
              <input
                type="text"
                value={cardInfo.expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/AA"
                maxLength={5}
                style={getInputStyle(!!errors.expiryDate)}
              />
              {errors.expiryDate && (
                <div style={errorStyle}>
                  <span>⚠</span>
                  <span>{errors.expiryDate}</span>
                </div>
              )}
            </div>

            <div>
              <label style={labelStyle}>CVV</label>
              <input
                type="text"
                value={cardInfo.cvv}
                onChange={(e) => onChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 3))}
                placeholder="123"
                maxLength={3}
                style={getInputStyle(!!errors.cvv)}
              />
              {errors.cvv && (
                <div style={errorStyle}>
                  <span>⚠</span>
                  <span>{errors.cvv}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedPaymentMethod === 'pix' && (
        <div style={{
          border: `2px solid ${colors.border.light}`,
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
        }}>
          {!pixGenerated ? (
            <>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <Image src="/images/pix-icon.svg" alt="PIX" width={64} height={64} />
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: '8px',
              }}>
                Pagamento via PIX
              </h3>
              <p style={{ 
                fontSize: '14px',
                color: colors.text.secondary,
                marginBottom: '16px',
                lineHeight: '1.5',
              }}>
                Clique no botão abaixo para gerar o QR Code e a chave PIX para pagamento instantâneo.
              </p>
              <div style={{
                backgroundColor: '#E8F5E9',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '24px',
              }}>
                <p style={{
                  fontSize: '13px',
                  color: '#2E7D32',
                  lineHeight: '1.5',
                  margin: 0,
                }}>
                  ⚡ <strong>Pagamento instantâneo:</strong> Sua assinatura será ativada automaticamente após a confirmação do pagamento PIX.
                </p>
              </div>
              <button
                type="button"
                onClick={generatePixKey}
                style={{
                  padding: '14px 32px',
                  background: `linear-gradient(45deg, ${colors.gradient.one}, ${colors.gradient.two})`,
                  color: colors.primary.white,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Gerar Chave PIX
              </button>
            </>
          ) : (
            <>
              {timeRemaining > 0 ? (
                <>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '24px',
                  }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '600',
                      color: colors.text.primary,
                    }}>
                      QR Code PIX
                    </h3>
                    <div style={{
                      padding: '6px 12px',
                      backgroundColor: timeRemaining <= 30 ? '#FEE2E2' : '#E8F5E9',
                      color: timeRemaining <= 30 ? '#DC2626' : '#2E7D32',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                    }}>
                      ⏱️ {formatTime(timeRemaining)}
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: colors.background.gray,
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '20px',
                  }}>
                    <Image 
                      src={qrCodeUrl} 
                      alt="QR Code PIX" 
                      width={200}
                      height={200}
                      style={{ 
                        margin: '0 auto',
                        display: 'block',
                      }} 
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: colors.text.primary,
                      marginBottom: '8px',
                      textAlign: 'left',
                    }}>
                      Chave PIX Copia e Cola
                    </label>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                    }}>
                      <input
                        type="text"
                        value={pixKey}
                        readOnly
                        style={{
                          flex: 1,
                          padding: '12px',
                          fontSize: '12px',
                          border: `1px solid ${colors.border.light}`,
                          borderRadius: '8px',
                          backgroundColor: colors.background.gray,
                          color: colors.text.primary,
                          fontFamily: 'monospace',
                        }}
                      />
                      <button
                        type="button"
                        onClick={copyPixKey}
                        style={{
                          padding: '12px 20px',
                          background: copied ? '#2E7D32' : `linear-gradient(45deg, ${colors.gradient.one}, ${colors.gradient.two})`,
                          color: colors.primary.white,
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {copied ? '✓ Copiado' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  <p style={{ 
                    fontSize: '13px',
                    color: colors.text.secondary,
                    lineHeight: '1.5',
                    textAlign: 'left',
                  }}>
                    💡 Escaneie o QR Code com o app do seu banco ou copie a chave para realizar o pagamento.
                  </p>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Image src="/images/clock-icon.svg" alt="Tempo esgotado" width={64} height={64} />
                  </div>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600',
                    color: '#DC2626',
                    marginBottom: '8px',
                  }}>
                    QR Code Expirado
                  </h3>
                  <p style={{ 
                    fontSize: '14px',
                    color: colors.text.secondary,
                    marginBottom: '24px',
                    lineHeight: '1.5',
                  }}>
                    O tempo de validade do PIX expirou. Gere um novo QR Code para continuar.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPixGenerated(false);
                      setPixKey('');
                      setQrCodeUrl('');
                    }}
                    style={{
                      padding: '14px 32px',
                      background: `linear-gradient(45deg, ${colors.gradient.one}, ${colors.gradient.two})`,
                      color: colors.primary.white,
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Gerar Novo QR Code
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
