export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29.90,
    period: 'mensal',
    description: 'Perfeito para indivíduos que querem experimentar o poder da IA.',
    features: [
      '50 gerações de IA por dia',
      'Assistente de escrita inteligente',
      'Análise de sentimentos',
      'Suporte por email',
      'Histórico de 30 dias',
      'API de acesso básico',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79.90,
    period: 'mensal',
    description: 'Ideal para profissionais que dependem de IA no dia a dia.',
    features: [
      '500 gerações de IA por dia',
      'Modelos avançados de linguagem',
      'Processamento de imagens',
      'Análise de dados com IA',
      'Suporte prioritário 24/7',
      'Integrações premium',
      'Treinamento personalizado',
    ],
    isPopular: true,
    badge: 'Mais popular',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 149.90,
    period: 'mensal',
    description: 'Solução enterprise para empresas que precisam de IA em escala.',
    features: [
      'Gerações ilimitadas',
      'Modelos customizados de IA',
      'Fine-tuning dedicado',
      'API empresarial dedicada',
      'Gerente de sucesso do cliente',
      'SLA de 99.9% uptime',
      'Implantação on-premise disponível',
      'Conformidade e segurança avançada',
    ],
  },
];
