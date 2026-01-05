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
    description: 'Para quem está validando sua primeira ideia digital.',
    features: [
      'Análise de até 5 ideias por mês',
      'Definição de MVP essencial',
      'Roadmap básico de produto',
      'Sugestões de stack tecnológica',
      'Modelos de monetização',
      'Histórico de 30 dias',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79.90,
    period: 'mensal',
    description: 'Para founders e times que precisam iterar rápido.',
    features: [
      'Análise ilimitada de ideias',
      'Definição de MVP + roadmap completo',
      'Priorização de features (framework)',
      'Análise de concorrência e mercado',
      'Estratégias de go-to-market',
      'Suporte prioritário via chat',
      'Sessões de decisão guiadas por IA',
    ],
    isPopular: true,
    badge: 'Mais popular',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 149.90,
    period: 'mensal',
    description: 'Para empresas que precisam escalar produtos digitais.',
    features: [
      'Tudo do Pro + recursos avançados',
      'Análise de portfólio de produtos',
      'Modelagem de OKRs e KPIs',
      'Simulação de cenários de negócio',
      'Integração com ferramentas (Notion, Jira)',
      'Gerente de sucesso dedicado',
      'Sessões estratégicas semanais',
      'API para automações customizadas',
    ],
  },
];
