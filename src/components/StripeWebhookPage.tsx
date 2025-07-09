import { useState, useEffect } from 'react';
import { Button } from './Button';
import { AlertCircle, Search, Loader, RefreshCw } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { supabase } from '../lib/supabase';

interface WebhookLog {
  id: string;
  event_type: string;
  event_data: any;
  status: string;
  created_at: string;
}

export function StripeWebhookPage() {
  const { isAdmin } = useAdmin();
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadWebhookLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: logs, error: logsError } = await supabase
        .from('webhook_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (logsError) throw logsError;

      setWebhookLogs(logs || []);
    } catch (err: any) {
      console.error('Error loading webhook logs:', err);
      setError(err.message || 'Erro ao carregar logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadWebhookLogs();

      // Set up real-time subscription
      const subscription = supabase
        .channel('webhook_logs')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'webhook_logs'
          },
          () => {
            loadWebhookLogs();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isAdmin]);

  const filteredLogs = webhookLogs.filter(log => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      log.event_type.toLowerCase().includes(query) ||
      JSON.stringify(log.event_data).toLowerCase().includes(query) ||
      log.status.toLowerCase().includes(query)
    );
  });

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Acesso Negado
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Logs do Webhook
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Visualize os eventos recebidos do Stripe
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button
            onClick={loadWebhookLogs}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tipo do Evento:
                    </span>
                    <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                      {log.event_type}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status:
                    </span>
                    <span className={`ml-2 text-sm ${
                      log.status === 'success' 
                        ? 'text-green-600 dark:text-green-400'
                        : log.status === 'error'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Data:
                  </span>
                  <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Dados do Evento:
                  </span>
                  <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm text-gray-900 dark:text-gray-100">
                    {JSON.stringify(log.event_data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Nenhum log de webhook encontrado.
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Carregando logs...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}