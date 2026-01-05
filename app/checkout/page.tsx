'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubscriptionCard } from '@/components/checkout/SubscriptionCard';
import { PersonalDataForm } from '@/components/checkout/BillingForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { Button } from '@/components/ui/Button';
import { PersonalData, CardInfo, Subscription } from '@/lib/types/checkout';
import { PricingPlan } from '@/lib/types/pricing';
import { colors } from '@/lib/colors';

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  
  useEffect(() => {
    // Recupera o plano selecionado do sessionStorage
    const planData = sessionStorage.getItem('selectedPlan');
    if (planData) {
      setSelectedPlan(JSON.parse(planData));
    } else {
      // Se não há plano selecionado, redireciona para a página de pricing
      router.push('/');
    }
  }, [router]);

  // Converte o plano selecionado para o formato Subscription
  const subscription: Subscription = selectedPlan ? {
    id: selectedPlan.id,
    name: selectedPlan.name,
    description: selectedPlan.description,
    price: selectedPlan.price,
    installments: 1,
    pricePerInstallment: selectedPlan.price,
    features: selectedPlan.features,
  } : {
    id: '1',
    name: 'Plano',
    description: '',
    price: 0,
    installments: 1,
    pricePerInstallment: 0,
    features: [],
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    cpf?: string;
  }>({});

  const [paymentErrors, setPaymentErrors] = useState<{
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
  }>({});

  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: '',
    email: '',
    emailConfirmation: '',
    phone: '',
    cpf: '',
  });

  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    installments: '1',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState('');

  const handlePersonalDataChange = (field: keyof PersonalData, value: string) => {
    setPersonalData({ ...personalData, [field]: value });
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [field]: undefined });
    }
  };

  const handleCardChange = (field: keyof CardInfo, value: string) => {
    setCardInfo({ ...cardInfo, [field]: value });
    if (paymentErrors[field as keyof typeof paymentErrors]) {
      setPaymentErrors({ ...paymentErrors, [field]: undefined });
    }
  };

  const validatePersonalData = () => {
    const errors: typeof formErrors = {};
    
    if (!personalData.fullName || personalData.fullName.length < 3) {
      errors.fullName = 'Nome deve ter pelo menos 3 caracteres';
    }
    
    if (!personalData.email) {
      errors.email = 'Por favor, insira um e-mail válido';
    } else if (!/\S+@\S+\.\S+/.test(personalData.email)) {
      errors.email = 'Formato de e-mail inválido';
    }
    
    if (!personalData.phone || personalData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Telefone inválido';
    }
    
    if (!personalData.cpf || personalData.cpf.length < 11) {
      errors.cpf = 'CPF/CNPJ inválido';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentData = () => {
    if (selectedPaymentMethod === 'pix') {
      return true;
    }

    const errors: typeof paymentErrors = {};
    
    const cardNumberOnly = cardInfo.cardNumber.replace(/\s/g, '');
    if (!cardNumberOnly) {
      errors.cardNumber = 'Por favor, insira o número do cartão';
    } else if (cardNumberOnly.length !== 16) {
      errors.cardNumber = 'O número do cartão deve conter 16 dígitos';
    }
    
    if (!cardInfo.cardHolder) {
      errors.cardHolder = 'Por favor, insira o nome do titular';
    } else if (cardInfo.cardHolder.trim().length < 3) {
      errors.cardHolder = 'Nome muito curto';
    }
    
    if (!cardInfo.expiryDate) {
      errors.expiryDate = 'Por favor, insira a data de validade';
    } else if (cardInfo.expiryDate.length !== 5) {
      errors.expiryDate = 'Formato inválido (use MM/AA)';
    } else {
      const [month, year] = cardInfo.expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      const expMonth = parseInt(month);
      const expYear = parseInt(year);
      
      if (expMonth < 1 || expMonth > 12) {
        errors.expiryDate = 'Mês inválido (01-12)';
      } else if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        errors.expiryDate = 'Cartão vencido';
      }
    }
    
    if (!cardInfo.cvv) {
      errors.cvv = 'Por favor, insira o CVV';
    } else if (cardInfo.cvv.length !== 3) {
      errors.cvv = 'CVV inválido (3 dígitos)';
    }
    
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validatePersonalData()) {
        setCurrentStep(2);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePaymentData()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const timestamp = Date.now();
      const randomPart = Math.random().toString(36).substring(2, 9).toUpperCase();
      const generatedId = `${selectedPlan?.name.toUpperCase()}-${timestamp}-${randomPart}`;
      
      setSubscriptionId(generatedId);
      setIsSubmitting(false);
      setPurchaseSuccess(true);
    }
  };

  if (!selectedPlan) {
    return null; // Ou um loading spinner
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header com Logo */}
      <div style={{ 
        borderBottom: `1px solid ${colors.border.light}`,
        padding: '24px 0',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Image 
              src="/images//logo/logo-maind.png" 
              alt="Aira - IA Assistente" 
              width={120}
              height={40}
              style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
              onClick={() => router.push('/')}
            />
            <div>
              <p style={{ 
                fontSize: '13px',
                color: colors.text.secondary,
                fontWeight: '500',
                margin: 0,
              }}>
                Assistente de IA para criar e produzir
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '40px',
            maxWidth: '100%',
          }} className="checkout-grid">
            <style jsx>{`
              @media (max-width: 1024px) {
                .checkout-grid {
                  grid-template-columns: 1fr !important;
                  gap: 32px !important;
                }
              }
            `}</style>
            {/* Coluna Esquerda - 50% - Informações do Produto */}
            <div className="space-y-6">
              <SubscriptionCard subscription={subscription} />
            </div>

            {/* Coluna Direita - 50% - Formulários */}
            <div className="space-y-6" style={{ position: 'relative' }}>
              {/* Tela de Sucesso */}
              {purchaseSuccess && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: colors.background.main,
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '48px 24px',
                  borderRadius: '16px',
                  border: `2px solid ${colors.border.light}`,
                  minHeight: '600px',
                }}>
                  <h2 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: colors.text.primary,
                    marginBottom: '32px',
                    textAlign: 'center',
                  }}>
                    Assinatura Confirmada!
                  </h2>

                  <div style={{
                    width: '100%',
                    maxWidth: '450px',
                    backgroundColor: colors.background.gray,
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '24px',
                    border: `1px solid ${colors.border.light}`,
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: colors.text.secondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        ID da Assinatura
                      </span>
                      <div style={{
                        backgroundColor: '#E8F5E9',
                        color: '#2E7D32',
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '12px',
                      }}>
                        ATIVA
                      </div>
                    </div>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: colors.text.primary,
                      fontFamily: 'monospace',
                      margin: 0,
                      letterSpacing: '0.5px',
                    }}>
                      {subscriptionId}
                    </p>
                  </div>

                  <div style={{
                    width: '100%',
                    maxWidth: '450px',
                    marginBottom: '32px',
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: '#EEF2FF',
                      borderRadius: '10px',
                      border: '1px solid #C7D2FE',
                    }}>
                      <div style={{ fontSize: '20px' }}>📧</div>
                      <div>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: colors.text.primary,
                          margin: '0 0 4px 0',
                        }}>
                          Confirmação Enviada
                        </p>
                        <p style={{
                          fontSize: '13px',
                          color: colors.text.secondary,
                          margin: 0,
                          lineHeight: '1.5',
                        }}>
                          Todos os detalhes da sua assinatura foram enviados para <strong>{personalData.email}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    width: '100%',
                    maxWidth: '450px',
                    marginBottom: '32px',
                  }}>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.text.primary,
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      Detalhes da Assinatura
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                      }}>
                        <span style={{ color: colors.text.secondary }}>Plano</span>
                        <span style={{ fontWeight: '600', color: colors.text.primary }}>{subscription.name}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                      }}>
                        <span style={{ color: colors.text.secondary }}>Valor Mensal</span>
                        <span style={{ fontWeight: '600', color: colors.text.primary }}>R$ {subscription.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                      }}>
                        <span style={{ color: colors.text.secondary }}>Próxima Cobrança</span>
                        <span style={{ fontWeight: '600', color: colors.text.primary }}>
                          {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/')}
                    style={{
                      width: '100%',
                      maxWidth: '450px',
                      padding: '16px 32px',
                      background: `linear-gradient(45deg, ${colors.gradient.one}, ${colors.gradient.two})`,
                      color: colors.primary.white,
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      marginTop: '8px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Voltar para Planos
                  </button>

                  <p style={{
                    fontSize: '13px',
                    color: colors.text.light,
                    marginTop: '24px',
                    textAlign: 'center',
                  }}>
                    Precisa de ajuda? <a href="mailto:suporte@aira.ai" style={{ color: colors.text.primary, textDecoration: 'underline' }}>Entre em contato</a>
                  </p>
                </div>
              )}

              {/* Step Indicator */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: currentStep >= 1 ? colors.primary.black : colors.background.gray,
                    color: currentStep >= 1 ? colors.primary.white : colors.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}>
                    1
                  </div>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: currentStep === 1 ? '600' : '400',
                    color: currentStep >= 1 ? colors.text.primary : colors.text.secondary,
                  }}>
                    Dados Pessoais
                  </span>
                </div>

                <div style={{ 
                  width: '40px', 
                  height: '2px', 
                  backgroundColor: currentStep >= 2 ? colors.primary.black : colors.border.light,
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: currentStep >= 2 ? colors.primary.black : colors.background.gray,
                    color: currentStep >= 2 ? colors.primary.white : colors.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}>
                    2
                  </div>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: currentStep === 2 ? '600' : '400',
                    color: currentStep >= 2 ? colors.text.primary : colors.text.secondary,
                  }}>
                    Pagamento
                  </span>
                </div>
              </div>
              
              {currentStep === 1 && (
                <>
                  <PersonalDataForm
                    personalData={personalData}
                    onChange={handlePersonalDataChange}
                    errors={formErrors}
                  />
                  <div style={{ marginTop: '24px' }}>
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      variant="primary"
                      fullWidth
                    >
                      Avançar para Pagamento
                      <Image src="/images/arrow-icon.svg" alt="" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                    </Button>
                    <div style={{ 
                      marginTop: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}>
                      <Image src="/images/locked-icon.svg" alt="" width={16} height={16} />
                      <p style={{ 
                        fontSize: '13px',
                        color: colors.text.secondary,
                        margin: 0,
                      }}>
                        Compra segura
                      </p>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0',
                      fontSize: '13px',
                      color: colors.text.secondary,
                      cursor: 'pointer',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.text.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.text.secondary}
                  >
                    <Image src="/images/arrow-back.svg" alt="" width={14} height={14} />
                    Voltar para dados pessoais
                  </button>

                  <PaymentForm
                    cardInfo={cardInfo}
                    onChange={handleCardChange}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onPaymentMethodChange={setSelectedPaymentMethod}
                    errors={paymentErrors}
                  />

                  {selectedPaymentMethod === 'card' && (
                    <div style={{ marginTop: '24px' }}>
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Processando
                            <span style={{ display: 'flex', gap: '4px' }}>
                              <span style={{ animation: 'dot-pulse 1.4s infinite', animationDelay: '0s' }}>.</span>
                              <span style={{ animation: 'dot-pulse 1.4s infinite', animationDelay: '0.2s' }}>.</span>
                              <span style={{ animation: 'dot-pulse 1.4s infinite', animationDelay: '0.4s' }}>.</span>
                            </span>
                          </span>
                        ) : (
                          <>
                            <Image src="/images/check-icon.svg" alt="" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                            Finalizar Compra - R$ {subscription.price.toFixed(2).replace('.', ',')}
                          </>
                        )}
                      </Button>
                      <div style={{ 
                        marginTop: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}>
                        <Image src="/images/locked-icon.svg" alt="" width={16} height={16} />
                        <p style={{ 
                          fontSize: '13px',
                          color: colors.text.secondary,
                          margin: 0,
                        }}>
                          Compra segura
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer style={{ 
        borderTop: `1px solid ${colors.border.light}`,
        backgroundColor: colors.background.gray,
        padding: '40px 0',
        marginTop: '80px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'start',
          }} className="footer-grid">
            
            <div>
              <Image 
                src="/images//logo/logo-maind.png" 
                alt="Aira" 
                width={96}
                height={32}
                style={{ height: '32px', width: 'auto', marginBottom: '12px' }}
              />
              <p style={{ 
                fontSize: '13px',
                color: colors.text.secondary,
                lineHeight: '1.6',
                margin: '8px 0',
              }}>
                Assistente de Inteligência Artificial para potencializar seu trabalho.
              </p>
              <p style={{ 
                fontSize: '12px',
                color: colors.text.light,
                marginTop: '16px',
              }}>
                © 2026 Aira. Todos os direitos reservados.
              </p>
            </div>

            <div style={{ textAlign: 'right' }} className="footer-support">
              <h3 style={{ 
                fontSize: '14px',
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: '12px',
              }}>
                Suporte
              </h3>
              <p style={{ 
                fontSize: '13px',
                color: colors.text.secondary,
                marginBottom: '8px',
              }}>
                Precisa de ajuda?
              </p>
              <a 
                href="mailto:suporte@aira.ai"
                style={{ 
                  fontSize: '14px',
                  color: colors.text.primary,
                  fontWeight: '500',
                  textDecoration: 'none',
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: colors.background.main,
                  borderRadius: '6px',
                  border: `1px solid ${colors.border.light}`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.text.primary}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border.light}
              >
                suporte@aira.ai
              </a>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
              text-align: left;
            }
            .footer-support {
              text-align: left !important;
            }
          }
        `}</style>
      </footer>
    </div>
  );
}
