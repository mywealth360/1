export type PlanType = 'free' | 'starter' | 'global' | 'pro' | 'Copy Trade';

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: number;
  features: string[];
  robots: number;
  tools: number;
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Acesso básico à comunidade e robô Take GO para começar suas operações.',
    price: 0,
    features: [
      'Acesso à comunidade básica',
      'Robô Take GO incluído',
      'Regras de coloração Color TREND',
      'Suporte via comunidade',
    ],
    robots: 1,
    tools: 1
  },
  {
    id: 'starter',
    name: 'Pack Starter',
    description: 'Pack com 6 estratégias para múltiplos ativos, incluindo Pack Hunter, Pack Starter e backtest ilimitado.',
    price: 350,
    features: [
      'Backtest Incluso',
      '6 Robôs Starter',
      'Estratégias para WIN e BIT',
      'Tendência, Reversão e Scalp',
      'Operações automatizadas',
      'Suporte básico'
    ],
    robots: 6,
    tools: 2
  },
  {
    id: 'global',
    name: 'Pack Global',
    description: 'Pack com 3 estratégias para mercado global, incluindo Robô GR Global, Criptomoedas e Ações e Futuros',
    price: 350,
    features: [
      'Backtest Incluso',
      '3 Robôs para mercados globais',
      'Operações em criptomoedas',
      'Operações em ações e futuros',
      'Gestão de risco integrada',
      'Suporte avançado'
    ],
    robots: 3,
    tools: 3
  },
  {
    id: 'Copy Trade',
    name: 'Copy Trade',
    description: 'Serviço de copy trading profissional com 40 estratégias em 9 ativos diferentes.',
    price: 550,
    features: [
      'Copy Trade incluído',
      'Acesso a 40 estratégias',
      '9 ativos diferentes',
      'Gestão profissional',
      'Suporte VIP 24/7'
    ],
    robots: 0,
    tools: 1
  },
  {
    id: 'pro',
    name: 'Pack PRO',
    description: 'Pack com todas as estratégias (23 robôs), Copy Trade incluído e backtest sem limites',
    price: 700,
    features: [
      'Backtest Incluso',
      'Todos os 23 robôs incluídos',
      'Pack Starter + Pack Global',
      'Acesso a todos os robôs',
      'Backtest sem limites',
      'Suporte VIP 24/7'
    ],
    robots: 23,
    tools: 5
  }
];

export function getRobotsByPlan(planType: PlanType): number {
  const plan = plans.find(p => p.id === planType);
  return plan ? plan.robots : 0;
}

export function getTradingToolsByPlan(planType: PlanType): number {
  const plan = plans.find(p => p.id === planType);
  return plan ? plan.tools : 0;
}