import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

// Inicializa o cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

// Prompt do sistema para contextualizar a IA
const SYSTEM_PROMPT = `Você é Pragma, uma assistente de IA especializada em ajudar empreendedores e fundadores de negócios digitais a tomar decisões estratégicas.

Sua especialidade é:
- Validação de ideias de produtos e MVPs
- Definição de estratégias de precificação para SaaS
- Análise de concorrência e posicionamento de mercado
- Estratégias de go-to-market e growth
- Métricas, KPIs e análise de dados
- Retenção de clientes e redução de churn
- Formação de equipes e contratações estratégicas
- Decisões sobre investimento e funding

Características do seu atendimento:
- Respostas diretas, práticas e acionáveis
- Use bullet points e formatação clara
- Dê exemplos concretos quando relevante
- Seja objetivo, não seja prolixo
- Use emojis ocasionalmente para tornar a conversa mais amigável
- Mantenha um tom profissional mas acessível
- Sempre finalize com uma pergunta para aprofundar o assunto

Lembre-se: Seu objetivo é ajudar o usuário a tomar decisões inteligentes ANTES de gastar tempo e dinheiro.`;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 10 mensagens por minuto por IP
    const identifier = getRateLimitIdentifier(request);
    const rateLimit = checkRateLimit(identifier, 10, 60000);
    
    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        { 
          error: `Você atingiu o limite de mensagens. Tente novamente em ${resetIn} segundos.`,
          retryAfter: resetIn 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
            'Retry-After': resetIn.toString(),
          }
        }
      );
    }

    // Verifica se a API key está configurada
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.error('GOOGLE_GEMINI_API_KEY não configurada');
      return NextResponse.json(
        { error: 'Serviço temporariamente indisponível' },
        { status: 503 }
      );
    }

    const { message } = await request.json();

    // Validações de segurança
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem inválida' },
        { status: 400 }
      );
    }
    
    // Limita tamanho da mensagem (previne abuse)
    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Mensagem muito longa. Máximo de 1000 caracteres.' },
        { status: 400 }
      );
    }

    // Sanitiza entrada (remove caracteres potencialmente perigosos)
    const sanitizedMessage = message.trim();

    // Configura o modelo
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Gera a resposta
    const result = await model.generateContent(sanitizedMessage);
    const response = result.response;
    const text = response.text();

    return NextResponse.json(
      { response: text },
      {
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        }
      }
    );
    
  } catch (error) {
    console.error('Erro ao chamar Gemini API:', error);
    
    // Não expõe detalhes do erro para o cliente
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
