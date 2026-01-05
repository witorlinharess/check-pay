// Sistema simples de rate limiting em memória
// Para produção, considere usar Redis ou similar

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Limpa entradas antigas a cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(identifier: string, maxRequests: number = 10, windowMs: number = 60000): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    // Nova janela de tempo
    const resetTime = now + windowMs;
    rateLimitMap.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }

  if (entry.count >= maxRequests) {
    // Limite excedido
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  // Incrementa contador
  entry.count++;
  rateLimitMap.set(identifier, entry);
  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime };
}

export function getRateLimitIdentifier(request: Request): string {
  // Tenta obter IP real (considerando proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback para um identificador único baseado em headers
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `fallback-${userAgent.substring(0, 50)}`;
}
