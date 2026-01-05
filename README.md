# 🧠 Pragma

IA para tomar decisões melhores em negócios digitais antes de gastar tempo e dinheiro, desenvolvido com Next.js 16, React 19, TypeScript e Tailwind CSS v4.

## 🚀 Tecnologias

- **Next.js 16.0.7** - Framework React com App Router e Turbopack
- **React 19.2.0** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS v4** - Framework CSS utilitário
- **QRCode** - Geração de QR Code para pagamento PIX
- **Next/Image** - Otimização automática de imagens


## 📁 Estrutura do Projeto

```
pragma/
├── app/
│   ├── page.tsx          # Página principal do checkout
│   ├── layout.tsx        # Layout global com metadata
│   └── globals.css       # Estilos globais
├── components/
│   ├── checkout/
│   │   ├── SubscriptionCard.tsx  # Card de assinatura (responsivo)
│   │   ├── BillingForm.tsx       # Formulário de dados pessoais
│   │   └── PaymentForm.tsx       # Formulário de pagamento (Cartão/PIX)
│   └── ui/
│       └── Button.tsx            # Componente de botão com gradiente
├── lib/
│   ├── types/
│   │   └── checkout.ts           # Tipos TypeScript
│   └── colors.ts                 # Sistema de cores centralizado
├── public/
│   └── images/                   # Imagens e ícones SVG
└── qrcode.d.ts                   # Declaração de tipos para qrcode
```

## ✨ Funcionalidades

### 🔐 Sistema de Checkout em 2 Etapas
- **Etapa 1**: Dados Pessoais (nome, email, telefone, CPF)
- **Etapa 2**: Pagamento (Cartão de Crédito ou PIX)

### 💳 Pagamento com Cartão
- Formatação automática do número do cartão (espaçamento a cada 4 dígitos)
- Validação de data de validade (MM/AA)
- Validação de CVV (3 dígitos)
- Nome em maiúsculas automaticamente
- Validação inline com mensagens de erro customizadas

### 🔷 Pagamento PIX
- Geração de QR Code em tempo real
- Chave PIX copia e cola
- Timer de 2 minutos com alerta visual (≤30s fica vermelho)
- Botão de copiar chave com feedback visual
- Indicação de pagamento instantâneo
- QR Code expira após 2 minutos com opção de gerar novo

### ✅ Validação de Formulários
- Validação em tempo real
- Mensagens de erro personalizadas e amigáveis
- Bordas vermelhas em campos com erro
- Warning boxes com ícone de alerta
- Formatação brasileira (telefone, CPF)

### 📱 Design Responsivo
- Layout 50/50 em desktop (produto | formulário)
- Layout empilhado em mobile
- Card de assinatura com "Exibir detalhes" colapsável (mobile)
- Footer responsivo com alinhamento adaptativo
- Imagens otimizadas com Next/Image

### 🎉 Tela de Confirmação Profissional
- Ícone animado de sucesso com gradiente
- ID de assinatura único gerado automaticamente
- Badge "ATIVA" em verde
- Confirmação de email enviada
- Detalhes completos da assinatura (plano, valor, próxima cobrança)
- Botão CTA para começar a usar
- Link de suporte

### 🎨 Elementos Visuais
- Gradiente verde customizado (45deg, #6CAD7C → #C4E09F)
- Ícones SVG otimizados
- Fonte Funnel Sans (Google Fonts)
- Mensagens de segurança ("Compra segura", "Ambiente protegido")
- Header com logo e slogan
- Footer com logo, descrição e email de suporte


## 💰 Produto exemplo

**Pragma - IA para Decisões**
- Valor: R$ 97,00/mês
- Funcionalidades:
  - Geração de conteúdo com IA
  - Assistente de design inteligente
  - Edição e refinamento de texto
  - Suporte prioritário
  - Atualizações contínuas
  - Acesso a novos recursos



## 📝 Observações

Este é um projeto de **portfólio frontend**. As funcionalidades de pagamento são demonstrativas e não processam transações reais.
