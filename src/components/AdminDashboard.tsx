import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Search, RefreshCw, Edit, Trash, User, UserPlus, X, Check, Shield, Copy, ChevronDown, ChevronUp, AlertCircle, Clock, Calendar, Mail, Phone, Info, Zap, FileText } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { supabase } from '../lib/supabase';
import { AdminLogs } from './AdminLogs';

interface UserData {
  id: string;
  email: string;
  raw_user_meta_data: any;
  plan_type: string;
  profile: {
    display_name: string | null;
    avatar_url: string | null;
    phone: string | null;
    created_at: string;
  };
  optional_modules: {
    backtest_starter?: boolean;
    gr_pro?: boolean;
    copy_trade_access?: boolean;
    extra_leverage?: number;
  };
  subscription_period: string;
}

export function AdminDashboard() {
  const { isAdmin } = useAdmin();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [newPlan, setNewPlan] = useState('');
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('monthly');
  const [changeReason, setChangeReason] = useState('');
  const [optionalModules, setOptionalModules] = useState({
    backtest_starter: false,
    gr_pro: false,
    copy_trade_access: false
  });
  const [extraLeverage, setExtraLeverage] = useState(1);
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'users' | 'logs'>('users');

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.rpc('get_all_users');

      if (error) throw error;

      setUsers(data || []);
    } catch (err: any) {
      console.error('Error loading users:', err);
      setError(err.message || 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.email?.toLowerCase().includes(query) ||
      user.profile?.display_name?.toLowerCase().includes(query) ||
      user.plan_type?.toLowerCase().includes(query)
    );
  });

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setNewPlan(user.plan_type || 'free');
    setSubscriptionPeriod(user.subscription_period || 'monthly');
    setChangeReason('');
    
    // Set optional modules based on user data
    setOptionalModules({
      backtest_starter: !!user.optional_modules?.backtest_starter,
      gr_pro: !!user.optional_modules?.gr_pro,
      copy_trade_access: !!user.optional_modules?.copy_trade_access
    });
    
    // Set extra leverage if available, minimum 1
    setExtraLeverage(user.optional_modules?.extra_leverage || 1);
    
    setShowEditModal(true);
  };

  const handleUpdatePlan = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      
      // Build reason string with optional modules
      let fullReason = changeReason || 'Alteração de plano pelo admin';
      
      if (optionalModules.backtest_starter) {
        fullReason += ' | Módulo de Backtest Starter';
      }
      
      if (optionalModules.gr_pro) {
        fullReason += ' | Robô GR PRO';
      }
      
      if (optionalModules.copy_trade_access) {
        fullReason += ' | Acesso ao Copy Trade';
      }
      
      if (extraLeverage > 1) {
        fullReason += ` | Alavancagem Extra ${extraLeverage}x`;
      }

      // Call RPC function to update plan
      const { error } = await supabase.rpc('admin_update_user_plan', {
        p_user_id: selectedUser.id,
        p_plan_type: newPlan,
        p_reason: fullReason,
        p_subscription_period: subscriptionPeriod,
        p_extra_leverage: extraLeverage > 1 ? extraLeverage : null
      });

      if (error) throw error;

      // Reload users after update
      await loadUsers();
      setShowEditModal(false);
    } catch (err: any) {
      console.error('Error updating plan:', err);
      setError(err.message || 'Erro ao atualizar plano');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserExpanded = (userId: string) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const formatPlanType = (planType: string | null) => {
    if (!planType) return 'Free';
    return planType === 'copy_invest' ? 'Copy Trade' : 
           planType.charAt(0).toUpperCase() + planType.slice(1);
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white dark:text-white mb-4">
          Acesso Negado
        </h2>
        <p className="text-gray-300 dark:text-gray-300">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Painel de Administração
          </h1>
          <p className="text-gray-300 dark:text-gray-300 mt-2">
            Gerencie usuários, planos e logs do sistema
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={activeTab === 'users' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('users')}
            className={activeTab !== 'users' ? 'border-gray-700 text-gray-200' : ''}
          >
            <User className="h-4 w-4 mr-2" />
            Usuários
          </Button>
          <Button
            variant={activeTab === 'logs' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('logs')}
            className={activeTab !== 'logs' ? 'border-gray-700 text-gray-200' : ''}
          >
            <FileText className="h-4 w-4 mr-2" />
            Logs
          </Button>
        </div>
      </div>

      {activeTab === 'users' && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-64 px-4 py-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-gray-900 dark:bg-gray-900 text-white dark:text-white"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button
                onClick={loadUsers}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2 border-gray-700 text-gray-200"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 dark:bg-red-900/50 border border-red-800 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-red-400 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 dark:border-gray-800">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 dark:text-gray-300">Usuário</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 dark:text-gray-300">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 dark:text-gray-300">Plano</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 dark:text-gray-300">Periodicidade</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 dark:text-gray-300">Módulos</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300 dark:text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 dark:divide-gray-800">
                  {filteredUsers.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr className="hover:bg-gray-800/50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleUserExpanded(user.id)}
                              className="text-gray-400 hover:text-white"
                            >
                              {expandedUsers[user.id] ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                            <div className="h-8 w-8 rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center">
                              {user.profile?.avatar_url ? (
                                <img
                                  src={user.profile.avatar_url}
                                  alt={user.profile.display_name || user.email?.split('@')[0] || 'User'}
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              ) : (
                                <User className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white dark:text-white">
                                {user.profile?.display_name || (user.email ? user.email.split('@')[0] : 'Usuário')}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-400">
                                ID: {user.id.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-300 dark:text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.plan_type === 'free' ? 'bg-gray-700 text-gray-300' :
                            user.plan_type === 'starter' ? 'bg-blue-900/70 text-blue-300' :
                            user.plan_type === 'global' ? 'bg-green-900/70 text-green-300' :
                            user.plan_type === 'pro' ? 'bg-purple-900/70 text-purple-300' :
                            user.plan_type === 'copy_invest' ? 'bg-amber-900/70 text-amber-300' :
                            'bg-gray-700 text-gray-300'
                          }`}>
                            {formatPlanType(user.plan_type)}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-300 dark:text-gray-300">
                          {user.subscription_period === 'monthly' ? 'Mensal' :
                           user.subscription_period === 'semiannual' ? 'Semestral' :
                           user.subscription_period === 'annual' ? 'Anual' : 'Mensal'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {user.optional_modules?.backtest_starter && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-900/70 text-blue-300">
                                Backtest
                              </span>
                            )}
                            {user.optional_modules?.gr_pro && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/70 text-green-300">
                                GR Pro
                              </span>
                            )}
                            {user.optional_modules?.copy_trade_access && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-900/70 text-purple-300">
                                Copy Trade
                              </span>
                            )}
                            {user.optional_modules?.extra_leverage && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-900/70 text-amber-300">
                                {user.optional_modules.extra_leverage}x
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <Button
                            onClick={() => handleEditUser(user)}
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      {expandedUsers[user.id] && (
                        <tr className="bg-gray-800/30 dark:bg-gray-800/30">
                          <td colSpan={6} className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                                  Informações do Usuário
                                </h3>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300 dark:text-gray-300">{user.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300 dark:text-gray-300">{user.profile?.phone || 'Não informado'}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300 dark:text-gray-300">
                                      Criado em: {new Date(user.profile?.created_at || '').toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
                                  Detalhes do Plano
                                </h3>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300 dark:text-gray-300">
                                      Plano: {formatPlanType(user.plan_type)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300 dark:text-gray-300">
                                      Periodicidade: {
                                        user.subscription_period === 'monthly' ? 'Mensal' :
                                        user.subscription_period === 'semiannual' ? 'Semestral' :
                                        user.subscription_period === 'annual' ? 'Anual' : 'Mensal'
                                      }
                                    </span>
                                  </div>
                                  {user.optional_modules && Object.keys(user.optional_modules).length > 0 && (
                                    <div className="flex items-start gap-2">
                                      <Info className="h-4 w-4 text-gray-400 mt-0.5" />
                                      <div>
                                        <span className="text-gray-300 dark:text-gray-300">Módulos Opcionais:</span>
                                        <ul className="mt-1 space-y-1 text-sm text-gray-400">
                                          {user.optional_modules?.backtest_starter && (
                                            <li>• Módulo de Backtest Starter</li>
                                          )}
                                          {user.optional_modules?.gr_pro && (
                                            <li>• Robô GR PRO</li>
                                          )}
                                          {user.optional_modules?.copy_trade_access && (
                                            <li>• Acesso ao Copy Trade</li>
                                          )}
                                          {user.optional_modules?.extra_leverage && (
                                            <li>• Alavancagem Extra: {user.optional_modules.extra_leverage}x</li>
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  {filteredUsers.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-4 py-4 text-center text-gray-400 dark:text-gray-400">
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  )}
                  {loading && (
                    <tr>
                      <td colSpan={6} className="px-4 py-4 text-center text-gray-400 dark:text-gray-400">
                        Carregando usuários...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit User Modal */}
          {showEditModal && selectedUser && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 dark:bg-gray-900 rounded-xl w-full max-w-md border border-gray-800 dark:border-gray-800">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white dark:text-white">
                      Alterar Plano
                    </h2>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                        Usuário
                      </label>
                      <input
                        type="text"
                        value={selectedUser.email}
                        disabled
                        className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-lg text-white dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                        Plano Atual
                      </label>
                      <input
                        type="text"
                        value={formatPlanType(selectedUser.plan_type)}
                        disabled
                        className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-lg text-white dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                        Novo Plano
                      </label>
                      <select
                        value={newPlan}
                        onChange={(e) => setNewPlan(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-lg text-white dark:text-white"
                      >
                        <option value="free">Free</option>
                        <option value="starter">Starter</option>
                        <option value="global">Global</option>
                        <option value="pro">Pro</option>
                        <option value="copy_invest">Copy Trade</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                        Periodicidade
                      </label>
                      <select
                        value={subscriptionPeriod}
                        onChange={(e) => setSubscriptionPeriod(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-lg text-white dark:text-white"
                      >
                        <option value="monthly">Mensal</option>
                        <option value="semiannual">Semestral</option>
                        <option value="annual">Anual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                        Módulos Opcionais
                      </label>
                      <div className="space-y-2 p-3 bg-gray-800/50 dark:bg-gray-800/50 rounded-lg border border-gray-700 dark:border-gray-700">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="backtest_starter"
                            checked={optionalModules.backtest_starter}
                            onChange={(e) => setOptionalModules({
                              ...optionalModules,
                              backtest_starter: e.target.checked
                            })}
                            className="h-4 w-4 rounded border-gray-700 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="backtest_starter" className="ml-2 text-sm text-gray-300 dark:text-gray-300">
                            Módulo de Backtest Starter
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="gr_pro"
                            checked={optionalModules.gr_pro}
                            onChange={(e) => setOptionalModules({
                              ...optionalModules,
                              gr_pro: e.target.checked
                            })}
                            className="h-4 w-4 rounded border-gray-700 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="gr_pro" className="ml-2 text-sm text-gray-300 dark:text-gray-300">
                            Robô GR PRO
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="copy_trade_access"
                            checked={optionalModules.copy_trade_access || newPlan === 'pro' || newPlan === 'copy_invest'}
                            onChange={(e) => setOptionalModules({
                              ...optionalModules,
                              copy_trade_access: e.target.checked
                            })}
                            disabled={newPlan === 'pro' || newPlan === 'copy_invest'}
                            className="h-4 w-4 rounded border-gray-700 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="copy_trade_access" className="ml-2 text-sm text-gray-300 dark:text-gray-300">
                            Acesso ao Copy Trade
                            {(newPlan === 'pro' || newPlan === 'copy_invest') && (
                              <span className="ml-2 text-xs text-gray-400">(Incluído no plano)</span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                        Alavancagem Extra: {extraLeverage}x
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          step="1"
                          value={extraLeverage}
                          onChange={(e) => setExtraLeverage(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm text-gray-300 dark:text-gray-300 min-w-[40px] text-right">
                          {extraLeverage}x
                        </span>
                      </div>
                      {extraLeverage > 1 && (
                        <div className="mt-2 flex items-center gap-2 text-amber-400">
                          <Zap className="h-4 w-4" />
                          <span className="text-xs">Alavancagem adicional de {extraLeverage}x</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                        Motivo da Alteração
                      </label>
                      <textarea
                        value={changeReason}
                        onChange={(e) => setChangeReason(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-lg text-white dark:text-white"
                        placeholder="Descreva o motivo da alteração do plano"
                      />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setShowEditModal(false)}
                        className="border-gray-700 text-gray-200"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleUpdatePlan}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {loading ? 'Atualizando...' : 'Atualizar Plano'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'logs' && <AdminLogs />}
    </div>
  );
}