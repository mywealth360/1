// SEO utilities

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

export function getPageSEO(pathname: string): SEOData {
  // Default SEO data
  const defaultSEO: SEOData = {
    title: 'Profit Estrategista - Trading Automatizado e Robôs para Investimentos',
    description: 'Estratégias profissionais e packs especializados para maximizar seus investimentos com trading automatizado. Robôs traders, copy trade e consultoria especializada.',
    keywords: ['trading automatizado', 'robô trader', 'estratégias de trading', 'investimentos automáticos', 'profit estrategista', 'copy trade', 'day trade'],
  };

  // Page-specific SEO data
  const pageSEO: Record<string, SEOData> = {
    '/': defaultSEO,
    '/clube-de-robos': {
      title: 'Clube de Robôs - Profit Estrategista | Automação para Trading',
      description: 'Acesse o Clube de Robôs da Profit Estrategista e tenha acesso a estratégias automatizadas para day trade, swing trade e investimentos. Robôs para WIN, WDO e mais.',
      keywords: ['clube de robôs', 'robôs de trading', 'automação para day trade', 'estratégias automatizadas', 'robôs para WIN', 'robôs para WDO'],
    },
    '/copy-trade': {
      title: 'Copy Trade - Profit Estrategista | Copie Operações de Traders Profissionais',
      description: 'Serviço de Copy Trade da Profit Estrategista. Copie automaticamente as operações de traders profissionais e obtenha resultados consistentes sem precisar operar.',
      keywords: ['copy trade', 'copy trading', 'copiar traders', 'investimento automático', 'renda passiva', 'copy invest'],
    },
    '/estrategias': {
      title: 'Estratégias de Trading - Profit Estrategista | Packs Especializados',
      description: 'Conheça os packs de estratégias da Profit Estrategista. Estratégias para day trade, swing trade e investimentos de longo prazo com robôs automatizados.',
      keywords: ['estratégias de trading', 'packs de estratégias', 'day trade', 'swing trade', 'investimentos automatizados'],
    },
    '/consultoria': {
      title: 'Consultoria em Trading - Profit Estrategista | Crie seu Robô Personalizado',
      description: 'Consultoria especializada em trading algorítmico. Crie seu robô personalizado com a Profit Estrategista e maximize seus resultados com estratégias sob medida.',
      keywords: ['consultoria trading', 'robô personalizado', 'estratégia personalizada', 'desenvolvimento de robôs', 'trading algorítmico'],
    },
    '/mesa-proprietaria': {
      title: 'Mesa Proprietária - Profit Estrategista | Opere com Capital de Terceiros',
      description: 'Mesa proprietária para traders. Opere com capital de terceiros, sem risco do seu próprio dinheiro e com alavancagem profissional. Conheça as vantagens.',
      keywords: ['mesa proprietária', 'prop trading', 'capital de terceiros', 'alavancagem', 'trading profissional'],
    },
    '/comunidade': {
      title: 'Comunidade de Traders - Profit Estrategista | Compartilhe Experiências',
      description: 'Faça parte da comunidade de traders da Profit Estrategista. Compartilhe experiências, resultados e aprenda com traders profissionais que já utilizam nossas estratégias.',
      keywords: ['comunidade de traders', 'grupo de trading', 'compartilhar experiências', 'aprendizado em trading'],
    },
    '/calculadora-day-trade': {
      title: 'Calculadora Day Trade - Profit Estrategista | Calcule Posição e Risco',
      description: 'Calculadora profissional para day trade. Calcule tamanho de posição, risco e potencial de ganho para operações em WIN, WDO e outros ativos da B3.',
      keywords: ['calculadora day trade', 'calculadora de risco', 'tamanho de posição', 'gerenciamento de risco', 'day trade B3'],
    },
    '/calculadora-ir': {
      title: 'Calculadora IR - Profit Estrategista | Imposto de Renda para Traders',
      description: 'Calculadora de Imposto de Renda para traders. Calcule seus impostos de forma simples e precisa para day trade, swing trade e investimentos.',
      keywords: ['calculadora IR', 'imposto de renda day trade', 'imposto day trade', 'declaração IR trader'],
    },
    '/teste-ping': {
      title: 'Teste de Ping - Profit Estrategista | Velocidade para Trading',
      description: 'Teste a velocidade da sua conexão para trading. Descubra se sua internet está adequada para day trade e operações de alta frequência.',
      keywords: ['teste de ping', 'latência trading', 'velocidade internet day trade', 'conexão para trading'],
    },
    '/perfil-trader': {
      title: 'Perfil de Trader - Profit Estrategista | Descubra seu Estilo',
      description: 'Descubra seu perfil de trader e as estratégias mais adequadas para seu estilo. Teste gratuito que analisa seu perfil de risco e comportamento.',
      keywords: ['perfil de trader', 'estilo de trading', 'personalidade trader', 'teste trader'],
    },
    '/login': {
      title: 'Login - Profit Estrategista | Acesse sua Conta',
      description: 'Faça login na sua conta da Profit Estrategista e acesse suas estratégias, robôs e ferramentas exclusivas para trading.',
      keywords: ['login profit estrategista', 'acesso área de membros', 'entrar conta trader'],
    },
  };

  // Return page-specific SEO data if available, otherwise return default
  return pageSEO[pathname] || defaultSEO;
}

export function generateStructuredData(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Profit Estrategista',
    'url': 'https://profitestrategista.com.br',
    'logo': 'https://imagizer.imageshack.com/img924/1237/wUQU9Z.png',
    'description': 'Estratégias profissionais e packs especializados para maximizar seus investimentos com trading automatizado.',
    'sameAs': [
      'https://instagram.com/profit.estrategista_',
      'https://youtube.com/@profit-estrategista'
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Rua Brigadeiro Faria Lima, 1811',
      'addressLocality': 'São Paulo',
      'addressRegion': 'SP',
      'postalCode': '01452-001',
      'addressCountry': 'BR'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+55-11-91156-0276',
      'contactType': 'customer service',
      'availableLanguage': 'Portuguese'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'BRL',
      'lowPrice': '0',
      'highPrice': '700',
      'offerCount': '5'
    }
  };

  return JSON.stringify(data);
}