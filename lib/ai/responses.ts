// Sistema de respostas simuladas da IA Pragma
// Analisa a pergunta do usuário e retorna uma resposta contextual

interface ResponsePattern {
  keywords: string[];
  response: string;
}

const responsePatterns: ResponsePattern[] = [
  // Validação de Ideias
  {
    keywords: ['validar', 'ideia', 'produto', 'começo', 'início', 'iniciar'],
    response: `Excelente pergunta! Para validar sua ideia de produto, siga estes passos:

1. **Problema Real**: Você está resolvendo uma dor genuína? Converse com 10-15 pessoas do seu público-alvo.

2. **Teste de Interesse**: Crie uma landing page simples explicando a solução. Se pessoas deixarem email, há interesse real.

3. **MVP Mínimo**: Construa apenas o core da solução - o menor caminho para validar se as pessoas pagariam.

4. **Precificação Antecipada**: Defina o preço antes de construir. Se ninguém compraria por X, repense o produto.

Qual dessas etapas você gostaria de explorar mais?`,
  },
  
  // MVP e Desenvolvimento
  {
    keywords: ['mvp', 'construir', 'desenvolver', 'features', 'funcionalidades', 'primeiro'],
    response: `Sobre MVP, o segredo é **simplicidade radical**:

**O que INCLUIR no MVP:**
✅ 1 feature principal que resolve a dor #1
✅ Autenticação básica (email/senha)
✅ Forma de pagamento simples
✅ Suporte via email/chat

**O que NÃO incluir:**
❌ Integrações complexas
❌ Dashboards elaborados
❌ Automações avançadas
❌ Features "seria legal ter"

**Regra dos 30 dias**: Se não consegue lançar em 30 dias, seu MVP está grande demais.

Qual é a feature ÚNICA que resolve o problema principal do seu produto?`,
  },

  // Precificação
  {
    keywords: ['preço', 'precificar', 'cobrar', 'valor', 'quanto', 'plano', 'pricing'],
    response: `Precificação de SaaS é ciência + arte. Aqui está um framework:

**1. Baseie no VALOR, não no custo:**
- Quanto seu cliente economiza/ganha usando sua solução?
- Cobre 10-20% desse valor gerado

**2. Estrutura de Planos:**
- **Starter** (R$ 29-79): Indivíduos/solopreneurs
- **Pro** (R$ 79-199): Pequenas equipes (+ popular)
- **Business** (R$ 199-499): Médias empresas

**3. Teste de Preço:**
- Se 80%+ acham "barato", está muito baixo
- Se <10% convertem, pode estar alto
- Meta: 50-60% acham "justo"

**4. Billing Anual:**
- Ofereça 15-20% desconto no anual
- Melhora fluxo de caixa e retenção

Qual o seu mercado-alvo? Posso sugerir uma faixa de preço específica.`,
  },

  // Go-to-Market
  {
    keywords: ['go-to-market', 'lançar', 'divulgar', 'marketing', 'adquirir', 'clientes', 'usuários', 'tráfego'],
    response: `Estratégia de Go-to-Market para SaaS em 2026:

**Canais Orgânicos (0-6 meses):**
1. **Content Marketing**: Artigos resolvendo dores do público
2. **SEO**: Focar em long-tail keywords com intenção de compra
3. **Community**: Reddit, LinkedIn, grupos específicos da área
4. **Product Hunt**: Timing certo pode trazer milhares de visitas

**Canais Pagos (após validação):**
1. **Google Ads**: Search (alta intenção)
2. **LinkedIn Ads**: B2B com targeting preciso
3. **YouTube Ads**: Educacional + demonstração

**Estratégia "Founder-led":**
- Você como fundador criando conteúdo
- Autenticidade > Produção alta
- Mostre os bastidores, aprendizados

**Erro Fatal**: Começar com ads antes de ter product-market fit. Primeiro valide organicamente.

Qual canal faz mais sentido para seu público?`,
  },

  // Concorrência
  {
    keywords: ['concorrente', 'concorrência', 'competição', 'diferencial', 'nicho'],
    response: `Análise de concorrência inteligente:

**1. Mapeie os Top 3 Concorrentes:**
- O que eles fazem MUITO bem?
- Onde eles falham? (leia reviews negativos)
- Qual o público deles?

**2. Encontre seu "Wedge" (diferencial):**
- Não tente ser "melhor em tudo"
- Seja 10x melhor em UMA coisa específica
- Exemplo: Notion vs Evernote (colaboração vs notas)

**3. Posicionamento Anti-Concorrente:**
- "Ao contrário de X, nós fazemos Y"
- Defina-se pelo que você NÃO é

**4. Nicho Down:**
- Melhor dominar 0.1% do mercado que ter 0.001% de um mercado gigante
- Exemplo: "CRM para dentistas" > "CRM para todos"

**Red Flag**: Se não tem concorrente, pode ser que não há mercado. Concorrência valida demanda.

Quem são seus principais concorrentes?`,
  },

  // Métricas e Sucesso
  {
    keywords: ['métrica', 'kpi', 'medir', 'sucesso', 'resultado', 'performance', 'analytics'],
    response: `Métricas que realmente importam para SaaS:

**North Star Metric (a métrica única):**
Depende do seu negócio:
- SaaS B2B: MRR (Monthly Recurring Revenue)
- Product-Led: Weekly Active Users
- Marketplace: GMV (Gross Merchandise Value)

**Métricas de Saúde:**
1. **MRR**: Receita recorrente mensal
2. **Churn Rate**: % cancelamentos/mês (meta: <5%)
3. **LTV/CAC**: Lifetime Value ÷ Custo de Aquisição (meta: >3)
4. **Time to Value**: Quanto tempo até 1ª ativação

**Armadilhas Comuns:**
❌ Focar em vanity metrics (pageviews, signups)
✅ Focar em receita e retenção

**Regra Prática:**
- <R$10k MRR: Foque em adquirir clientes
- R$10k-50k: Otimize retenção
- >R$50k: Scale marketing

Onde você está hoje em MRR?`,
  },

  // Retenção e Churn
  {
    keywords: ['retenção', 'churn', 'cancelamento', 'perder', 'cliente', 'sai', 'desiste'],
    response: `Retenção é o jogo mais importante em SaaS:

**Por que clientes cancelam:**
1. Não viram valor rápido (onboarding ruim)
2. Complexidade excessiva
3. Falta de suporte
4. Preço vs valor percebido desalinhados

**Como Melhorar Retenção:**

**Semana 1 (Crítica):**
- Email de boas-vindas + tutorial
- Checklist de ativação
- Quick win na primeira sessão

**Mês 1-3:**
- Check-ins proativos
- Educar sobre features subutilizadas
- Celebrar milestones

**Sinais de Risco:**
- Não logou em 7 dias
- Uso decrescente
- Suporte com tom negativo

**Estratégia de Save:**
- Ofereça pausa (não cancelamento)
- Entenda o "porquê" real
- Downgrade > Churn

**Meta Gold Standard:**
- <3% churn mensal = excelente
- 3-5% = aceitável
- >5% = problema sério

Qual seu churn atual?`,
  },

  // Equipe e Contratação
  {
    keywords: ['equipe', 'time', 'contratar', 'sócio', 'cofundador', 'funcionário', 'colaborador'],
    response: `Construindo equipe em early-stage:

**Fase 0-R$10k MRR (Solo):**
- Você faz tudo
- Terceirize: design, copywriting
- Ferramentas no-code/low-code

**Fase R$10k-50k MRR:**
1ª contratação: Customer Success
- Escala seu tempo
- Feedback direto dos clientes

**Fase R$50k-150k MRR:**
- Dev (se você não for técnico)
- Marketing (growth specialist)

**Co-fundador: Sim ou Não?**
✅ Se complementa 100% suas skills
✅ Se já conhecem há 1+ ano
❌ Por solidão ou pressão
❌ Só por dinheiro

**Equity:**
- Co-fundador early: 30-50%
- 1º employee: 0.5-2%
- 10º employee: 0.1-0.5%

**Remote vs Local:**
- 2026 = remote-first é padrão
- Contrate talento global
- Timezone overlap importante

Você está sozinho ou já tem co-fundador?`,
  },

  // Funding e Investimento
  {
    keywords: ['investimento', 'investidor', 'venture', 'funding', 'capital', 'dinheiro', 'captação'],
    response: `Investimento vs Bootstrapping em 2026:

**Bootstrap (Recomendado para maioria):**
✅ Mantém controle 100%
✅ Foco em receita desde dia 1
✅ Sustentável long-term
❌ Crescimento mais lento
❌ Capital limitado para experiments

**Venture Capital:**
✅ Acelera crescimento
✅ Network e mentoria
❌ Pressão por crescimento exponencial
❌ Diluição significativa (20-30%/rodada)

**Quando buscar VC:**
- Mercado winner-takes-all
- Network effects fortes
- Precisa queimar caixa pra crescer
- Já tem tração (>R$50k MRR)

**Rodadas Típicas:**
- **Pre-seed**: R$500k-2M (5-10% equity)
- **Seed**: R$2M-8M (10-20% equity)
- **Series A**: R$15M-50M (20-30% equity)

**Alternativas:**
- Revenue-based financing
- Crowdfunding
- Angel investors

**Verdade**: 90% dos SaaS de sucesso são bootstrapped.

Você pensa em captar ou ir orgânico?`,
  },

  // Genérica/Default
  {
    keywords: ['ajuda', 'pragma', 'oi', 'olá', 'pode', 'consegue', 'sabe'],
    response: `Posso ajudar você com várias áreas de negócios digitais:

📊 **Estratégia de Produto:**
- Validação de ideias
- Definição de MVP
- Roadmap de features

💰 **Monetização:**
- Modelos de precificação
- Estratégias de upsell
- Métricas financeiras

🚀 **Go-to-Market:**
- Canais de aquisição
- Growth hacking
- Positioning

📈 **Growth & Scale:**
- KPIs e analytics
- Retenção de clientes
- Redução de churn

👥 **Team Building:**
- Contratações estratégicas
- Estrutura organizacional

Qual dessas áreas você gostaria de explorar? Seja específico na sua pergunta para eu dar uma resposta mais direcionada!`,
  },
];

export function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Busca o padrão que melhor corresponde
  let bestMatch: ResponsePattern | null = null;
  let maxMatches = 0;
  
  for (const pattern of responsePatterns) {
    const matches = pattern.keywords.filter(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    ).length;
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = pattern;
    }
  }
  
  // Se encontrou match, retorna a resposta
  if (bestMatch && maxMatches > 0) {
    return bestMatch.response;
  }
  
  // Resposta genérica se não encontrou match
  return `Interessante questão! Para te ajudar melhor, vou precisar de mais contexto.

Posso oferecer insights sobre:
- **Validação de produto**: Como testar se sua ideia tem mercado
- **MVP e desenvolvimento**: O que construir primeiro
- **Precificação**: Como definir preços que convertem
- **Go-to-market**: Estratégias de lançamento e aquisição
- **Métricas**: KPIs que realmente importam

Poderia reformular sua pergunta sendo mais específico sobre qual área você quer explorar?`;
}
