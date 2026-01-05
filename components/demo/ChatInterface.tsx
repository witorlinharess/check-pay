'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { colors } from '@/lib/colors';
import { getAIResponse } from '@/lib/ai/responses';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  credits: number;
  onUseCredit: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ credits, onUseCredit }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou a Pragma, sua assistente de IA para decisões de negócios digitais. Tenho experiência em validação de MVPs, estratégias de go-to-market e análise de produtos.\n\nComo posso ajudar você hoje?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || credits <= 0 || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    onUseCredit();

    // Simula delay de digitação
    setTimeout(() => {
      const aiResponse = getAIResponse(input.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'Como validar minha ideia de produto?',
    'Qual MVP devo construir primeiro?',
    'Como definir preço do meu SaaS?',
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: colors.background.main,
      borderRadius: '16px',
      border: `1px solid ${colors.border.light}`,
      overflow: 'hidden',
    }}>
      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {message.role === 'assistant' && (
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: colors.gradient.vibrant,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Sparkles size={20} color="white" />
              </div>
            )}
            
            <div
              style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: message.role === 'user' 
                  ? colors.neutral.gray100 
                  : colors.neutral.gray50,
                border: `1px solid ${colors.border.light}`,
              }}
            >
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: colors.text.primary,
                margin: 0,
                whiteSpace: 'pre-wrap',
              }}>
                {message.content}
              </p>
            </div>

            {message.role === 'user' && (
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: colors.primary.purple,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
              }}>
                U
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: colors.gradient.vibrant,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Sparkles size={20} color="white" />
            </div>
            <div style={{
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: colors.neutral.gray50,
              border: `1px solid ${colors.border.light}`,
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ animation: 'dot-pulse 1.4s infinite' }}>●</span>
                <span style={{ animation: 'dot-pulse 1.4s infinite', animationDelay: '0.2s' }}>●</span>
                <span style={{ animation: 'dot-pulse 1.4s infinite', animationDelay: '0.4s' }}>●</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions - Show only if no user messages yet */}
      {messages.filter(m => m.role === 'user').length === 0 && (
        <div style={{
          padding: '16px 24px',
          borderTop: `1px solid ${colors.border.light}`,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                backgroundColor: colors.neutral.gray50,
                border: `1px solid ${colors.border.light}`,
                borderRadius: '8px',
                color: colors.text.secondary,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary.purple;
                e.currentTarget.style.color = colors.text.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border.light;
                e.currentTarget.style.color = colors.text.secondary;
              }}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div style={{
        padding: '16px 24px',
        borderTop: `1px solid ${colors.border.light}`,
        backgroundColor: colors.background.main,
      }}>
        {credits <= 0 ? (
          <div style={{
            padding: '16px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '14px',
              color: '#DC2626',
              margin: '0 0 8px 0',
              fontWeight: '600',
            }}>
              Seus créditos acabaram!
            </p>
            <p style={{
              fontSize: '13px',
              color: '#DC2626',
              margin: 0,
            }}>
              Assine um plano para continuar usando a Pragma sem limites.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'stretch',
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta sobre negócios digitais..."
              disabled={isTyping}
              style={{
                flex: 1,
                padding: '12px 16px',
                fontSize: '14px',
                borderRadius: '12px',
                border: `1px solid ${colors.border.light}`,
                backgroundColor: colors.background.main,
                color: colors.text.primary,
                resize: 'none',
                minHeight: '48px',
                maxHeight: '120px',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.purple}
              onBlur={(e) => e.currentTarget.style.borderColor = colors.border.light}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                background: input.trim() && !isTyping ? colors.gradient.vibrant : colors.neutral.gray200,
                color: colors.primary.white,
                cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                minWidth: '120px',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isTyping) {
                  e.currentTarget.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              <Send size={18} />
              Enviar
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes dot-pulse {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
