import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { PlanType } from '../lib/plans';
import { supabase } from '../lib/supabase';

interface PlanContextType {
  currentPlan: PlanType;
  daysRemaining: number | null;
  loading: boolean;
  updatePlan: (plan: PlanType) => Promise<void>;
  refreshPlan: () => Promise<void>;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('free');
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, session } = useAuth();

  const loadUserPlan = async () => {
    if (!user || !session) {
      setCurrentPlan('free');
      setDaysRemaining(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log(`Buscando plano para user_id: ${user.id} usando RPC`);
      
      // Usar a função RPC get_user_plan
      const { data: userPlan, error } = await supabase
        .rpc('get_user_plan', { p_user_id: user.id });

      if (error) {
        console.error('Erro ao buscar plano:', error);
        setCurrentPlan('free');
        setDaysRemaining(null);
        return;
      }

      if (!userPlan || userPlan.length === 0) {
        console.log('Nenhum plano encontrado, criando plano free...');
        // Criar plano free usando função específica para novos usuários
        const { error: createError } = await supabase
          .rpc('create_initial_free_plan', {
            p_user_id: user.id
          });

        if (createError) {
          console.error('Erro ao criar plano free:', createError);
        }
        
        setCurrentPlan('free');
        setDaysRemaining(null);
      } else {
        const plan = userPlan[0];
        console.log('Plano encontrado:', plan);
        
        // Convert 'copy_invest' to 'Copy Trade' if needed
        let planType = plan.plan_type as PlanType;
        if (planType === 'copy_invest') {
          planType = 'Copy Trade';
        }
        
        setCurrentPlan(planType);
        
        if (plan.expiration_date) {
          try {
            const expirationDate = new Date(plan.expiration_date);
            const today = new Date();
            expirationDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            
            const diffTime = expirationDate.getTime() - today.getTime();
            const diffDays = diffTime >= 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 : Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysRemaining(diffDays);
          } catch(dateError) {
            console.error("Erro ao calcular data de expiração:", dateError);
            setDaysRemaining(null);
          }
        } else {
          setDaysRemaining(null);
        }
      }
    } catch (error) {
      console.error('Erro inesperado ao carregar plano:', error);
      setCurrentPlan('free');
      setDaysRemaining(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && session) {
      loadUserPlan();

      // Subscribe to plan changes
      const planChanges = supabase
        .channel('plan_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_plans',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            console.log('Mudança detectada nos planos:', payload);
            loadUserPlan(); // Recarrega o plano ao detectar mudança
          }
        )
        .subscribe((status, err) => {
           if (status === 'SUBSCRIBED') {
             console.log('Conectado ao canal de mudanças de planos!');
           } 
           if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
              console.error('Erro no canal de mudanças de planos:', err);
           }
        });

      return () => {
        console.log('Desinscrevendo do canal de mudanças de planos.');
        planChanges.unsubscribe();
      };
    } else {
      // Se não há usuário/sessão, reseta para free
      setCurrentPlan('free');
      setDaysRemaining(null);
      setLoading(false);
    }
  }, [user, session]);

  const updatePlan = async (plan: PlanType) => {
    if (!user || !session) return;

    try {
      // Convert 'Copy Trade' to 'copy_invest' for database storage
      const dbPlanType = plan === 'Copy Trade' ? 'copy_invest' : plan;
      
      const { error } = await supabase
        .from('user_plans')
        .upsert({
          user_id: user.id,
          plan_type: dbPlanType,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setCurrentPlan(plan);
      await loadUserPlan();
    } catch (error) {
      console.error('Error updating plan:', error);
      throw error;
    }
  };

  const refreshPlan = async () => {
    await loadUserPlan();
  };

  return (
    <PlanContext.Provider value={{ currentPlan, daysRemaining, loading, updatePlan, refreshPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}