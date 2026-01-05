# 🧠 Pragma - IA para Decisões

Uma plataforma SaaS completa que ajuda você a tomar decisões certas antes de gastar tempo e dinheiro construindo o produto errado. Desenvolvido com Next.js 16, React 19 e TypeScript.

## 🚀 Tecnologias

- **Next.js 16.0.7** - Framework React com App Router e Turbopack
- **React 19.2.0** - Biblioteca JavaScript para interfaces
- **TypeScript 5** - Tipagem estática para JavaScript
- **lucide-react 0.555.0** - Ícones modernos e customizáveis
- **QRCode 1.5.4** - Geração de QR Code para pagamento PIX
- **Inline CSS** - Estilização com style objects para máximo controle

## ✨ Funcionalidades Principais

### 🎯 Página de Pricing
- **3 planos de assinatura**: Starter (R$ 29,90), Pro (R$ 79,90), Advanced (R$ 149,90)
- **Toggle anual/mensal**: Desconto de 20% no plano anual
- **Design responsivo**: Adapta perfeitamente em mobile, tablet e desktop
- **Ícones personalizados**: Rocket (Starter), Zap (Pro), Crown (Advanced)
- **Badge "Mais Popular"** com destaque visual no plano Pro
- **Sistema de cores gradiente**: Verde (#10b981) e Roxo (#8b5cf6)

### 💬 Demo com Chat IA
- **10 créditos gratuitos** para testar a plataforma
- **Respostas simuladas inteligentes** sobre:
  - Validação de ideias e MVP
  - Precificação de SaaS
  - Estratégias de Go-to-Market
  - Análise de concorrência
  - Métricas e KPIs
  - Retenção e Churn
  - Team Building e contratações
  - Investimento e funding
- **Persistência de créditos** com localStorage
- **Interface de chat moderna** com animações de digitação
- **Sugestões de perguntas** para iniciar a conversa
- **Alerta quando créditos acabam** incentivando a assinatura

### 🛒 Sistema de Checkout em 2 Etapas
- **Etapa 1**: Dados Pessoais (nome, email, telefone, CPF)
- **Etapa 2**: Pagamento (Cartão de Crédito ou PIX)
- **Design unificado** com mesma identidade visual da página principal
- **Validação em tempo real** com mensagens contextuais
- **Formatação brasileira** (moeda, datas, telefone, CPF)

### 💳 Métodos de Pagamento

#### Cartão de Crédito
- Formatação automática do número do cartão
- Validação de data de validade (MM/AA)
- Validação de CVV (3 dígitos)
- Nome em maiúsculas automaticamente
- Ícones das bandeiras (Visa, Mastercard, Amex, Elo)

#### PIX
- Geração de QR Code em tempo real
- Chave PIX copia e cola com feedback visual
- Timer de 2 minutos com alerta visual
- Opção de gerar novo QR Code após expiração

### ✅ Tela de Confirmação Profissional
- Ícone animado de sucesso com gradiente
- ID de assinatura único gerado automaticamente
- Badge "ATIVA" em verde
- Detalhes completos: plano, valor, próxima cobrança
- Confirmação de email enviada
- Link de suporte

### 📱 Responsividade Completa
- **Desktop** (>768px): Layout 50/50, elementos espaçados
- **Tablet** (768px): Elementos reduzidos, gaps otimizados
- **Mobile** (480px): Layout empilhado, textos ocultos quando necessário
- **Mobile pequeno** (380px): Elementos ultra-compactos
- **Card de assinatura colapsável** em mobile
- **Header adaptativo** com logo e botões responsivos

### 🎨 Design System
- **Cores primárias**: Verde (#10b981), Roxo (#8b5cf6)
- **Gradientes vibrantes**: `linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)`
- **Ícones**: lucide-react (Shield, Lock, Check, ChevronLeft, etc)
- **Tipografia**: System fonts com fallback para sans-serif
- **Bordas arredondadas**: 12px padrão
- **Sombras sutis**: rgba com baixa opacidade

### 🔒 Elementos de Segurança e Confiança
- **Shield icon**: "Ambiente protegido por Pragma"
- **Lock icon**: "Compra segura"
- **Check icons com gradiente**: Lista de features nos cards
- **Validação inline**: Feedback imediato para usuários

## 📁 Estrutura do Projeto

```
pragma/
├── app/
│   ├── page.tsx              # Página principal (pricing)
│   ├── layout.tsx            # Layout global com metadata
│   ├── globals.css           # Estilos globais
│   ├── demo/
│   │   └── page.tsx          # Página de demo com chat IA
│   ├── checkout/
│   │   └── page.tsx          # Fluxo de checkout
│   └── not-found.tsx         # Página 404 customizada
├── components/
│   ├── pricing/
│   │   └── PricingCard.tsx   # Card de plano individual
│   ├── auth/
│   │   └── LoginModal.tsx    # Modal de login/signup
│   ├── demo/
│   │   └── ChatInterface.tsx # Interface do chat IA
│   ├── checkout/
│   │   ├── SubscriptionCard.tsx  # Card de assinatura no checkout
│   │   ├── BillingForm.tsx       # Formulário de dados pessoais
│   │   ├── PaymentForm.tsx       # Formulário de pagamento
│   │   ├── OrderSummary.tsx      # Resumo do pedido
│   │   └── AnimatedCreditCard.tsx # Cartão animado
│   └── ui/
│       ├── Button.tsx        # Botão com variantes
│       ├── Input.tsx         # Input com label e validação
│       └── Card.tsx          # Container de card
├── lib/
│   ├── types/
│   │   ├── pricing.ts        # Tipos e dados dos planos
│   │   └── checkout.ts       # Tipos do checkout
│   ├── ai/
│   │   └── responses.ts      # Sistema de respostas simuladas da IA
│   └── colors.ts             # Sistema de cores centralizado
├── public/
│   └── images/
│       ├── logo/             # Logo da Pragma
│       └── favicon/          # Favicon
└── qrcode.d.ts               # Declaração de tipos para qrcode
```

## 🎯 Planos de Assinatura

### 💚 Starter - R$ 29,90/mês
- 5 ideias validadas por mês
- Definição de MVP básico
- Análise de concorrência
- Suporte via email
- Sessões de decisão guiadas por IA

### ⚡ Pro - R$ 79,90/mês (Mais Popular)
- **Tudo do Starter +**
- Análise ilimitada de ideias
- Definição de MVP + roadmap completo
- Priorização de features (framework)
- Análise de concorrência e mercado
- Estratégias de go-to-market
- Suporte prioritário via chat
- Sessões de decisão guiadas por IA

### 👑 Advanced - R$ 149,90/mês
- **Tudo do Pro +**
- Análise de portfólio de produtos
- Modelagem de OKRs e KPIs
- Simulação de cenários de negócio
- Integração com ferramentas (Notion, Jira)
- Gerente de sucesso dedicado
- Sessões estratégicas semanais
- API para automações customizadas

## 🧪 Demo - Sistema de Créditos

Os usuários ganham **10 créditos gratuitos** para testar o chat IA:
- 1 mensagem = 1 crédito
- Créditos armazenados no **localStorage**
- Contador visual no header
- Alerta quando créditos acabam
- Incentivo para assinar plano completo

## 🎨 Sistema de Cores

```typescript
{
  primary: {
    green: '#10b981',
    purple: '#8b5cf6',
  },
  gradient: {
    vibrant: 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)',
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
  },
  status: {
    success: '#10b981',
  }
}
```

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

Acesse em: `http://localhost:3000`

## 📄 Rotas

- `/` - Página de pricing (principal)
- `/demo` - Demo com chat IA (10 créditos gratuitos)
- `/checkout` - Fluxo de checkout em 2 etapas
- `/404` - Página de erro customizada

## 💡 Destaques Técnicos

- **Server Components** e **Client Components** otimizados
- **TypeScript strict mode** para máxima segurança de tipos
- **Inline styles** para controle total do CSS
- **localStorage** para persistência de créditos
- **sessionStorage** para transferência de plano selecionado
- **Intl.NumberFormat** para formatação de moeda brasileira
- **lucide-react** para ícones SVG otimizados
- **Next/Image** para otimização automática de imagens

## 📝 Observações

Este é um projeto de **portfólio frontend** desenvolvido para demonstrar habilidades em:
- Arquitetura de aplicações Next.js modernas
- Design de sistemas escaláveis
- UX/UI responsivo e acessível
- TypeScript avançado
- Integração de funcionalidades complexas

As funcionalidades de pagamento e IA são **demonstrativas** e não processam transações reais ou utilizam APIs pagas.

---

Desenvolvido com 💚 por [Witor Linhares](https://github.com/witorlinharess)
