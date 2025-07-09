import { useState, useEffect } from 'react';
import { Button } from './Button';
import { AlertCircle, Search, Loader, RefreshCw, Clock, User, Mail, Tag, FileText, Globe, Database, ArrowRight, Calendar, Shield, Download, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { supabase } from '../lib/supabase';

interface EmailLog {
  id: string;
  user_id: string;
  email_type: string;
  recipient: string;
  plan_type: string | null;
  requested_at: string;
  sent_at: string | null;
  requested_by: string | null;
  status: string;
  error_message: string | null;
  response_data: any;
  created_at: string;
}

interface WebhookLog {
  id: string;
  event_type: string;
  event_data: any;
  status: string;
  created_at: string;
}

interface RequestLog {
  id: string;
  user_id: string | null;
  request_path: string;
  request_method: string;
  request_data: any;
  response_status: number | null;
  response_data: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export function AdminLogs() {
  const { isAdmin } = useAdmin();
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const [requestLogs, setRequestLogs] = useState<RequestLog[]>([]);
  const [loadingEmails, setLoadingEmails] = useState(false);
  const [loadingWebhooks, setLoadingWebhooks] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'email' | 'webhook' | 'request'>('email');
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const loadEmailLogs = async () => {
    try {
      setLoadingEmails(true);
      setEmailError(null);

      const { data: logs, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading email logs:', error);
        setEmailError(`Error loading email logs: ${error.message}`);
        return;
      }

      setEmailLogs(logs || []);
    } catch (err: any) {
      console.error('Error in loadEmailLogs:', err);
      setEmailError(`Error loading email logs: ${err.message || 'Unknown error'}`);
    } finally {
      setLoadingEmails(false);
    }
  };

  const loadWebhookLogs = async () => {
    try {
      setLoadingWebhooks(true);
      setWebhookError(null);

      const { data: logs, error } = await supabase
        .from('webhook_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading webhook logs:', error);
        setWebhookError(`Error loading webhook logs: ${error.message}`);
        return;
      }

      setWebhookLogs(logs || []);
    } catch (err: any) {
      console.error('Error in loadWebhookLogs:', err);
      setWebhookError(`Error loading webhook logs: ${err.message || 'Unknown error'}`);
    } finally {
      setLoadingWebhooks(false);
    }
  };

  const loadRequestLogs = async () => {
    try {
      setLoadingRequests(true);
      setRequestError(null);

      const { data: logs, error } = await supabase
        .from('request_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading request logs:', error);
        setRequestError(`Error loading request logs: ${error.message}`);
        return;
      }

      setRequestLogs(logs || []);
    } catch (err: any) {
      console.error('Error in loadRequestLogs:', err);
      setRequestError(`Error loading request logs: ${err.message || 'Unknown error'}`);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'email') {
        loadEmailLogs();
      } else if (activeTab === 'webhook') {
        loadWebhookLogs();
      } else if (activeTab === 'request') {
        loadRequestLogs();
      }
    }
  }, [isAdmin, activeTab]);

  const toggleLogExpanded = (id: string) => {
    setExpandedLogs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredEmailLogs = emailLogs.filter(log => {
    if (!searchQuery && filterStatus === 'all') return true;
    
    const matchesQuery = searchQuery === '' || 
      log.email_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.plan_type && log.plan_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.error_message && log.error_message.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    
    return matchesQuery && matchesStatus;
  });

  const filteredWebhookLogs = webhookLogs.filter(log => {
    if (!searchQuery && filterStatus === 'all') return true;
    
    const matchesQuery = searchQuery === '' || 
      log.event_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(log.event_data).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'sent' && (log.status === 'processed' || log.status === 'success')) ||
      (filterStatus === 'error' && log.status === 'error') ||
      (filterStatus === 'requested' && log.status === 'received');
    
    return matchesQuery && matchesStatus;
  });

  const filteredRequestLogs = requestLogs.filter(log => {
    if (!searchQuery && filterStatus === 'all') return true;
    
    const matchesQuery = searchQuery === '' || 
      log.request_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.request_method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.ip_address && log.ip_address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.user_agent && log.user_agent.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.request_data && JSON.stringify(log.request_data).toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'sent' && log.response_status && log.response_status >= 200 && log.response_status < 300) ||
      (filterStatus === 'error' && log.response_status && log.response_status >= 400);
    
    return matchesQuery && matchesStatus;
  });

  const downloadLogs = () => {
    let logsToDownload: any[] = [];
    let filename = '';
    
    if (activeTab === 'email') {
      logsToDownload = filteredEmailLogs;
      filename = 'email-logs.json';
    } else if (activeTab === 'webhook') {
      logsToDownload = filteredWebhookLogs;
      filename = 'webhook-logs.json';
    } else if (activeTab === 'request') {
      logsToDownload = filteredRequestLogs;
      filename = 'request-logs.json';
    }
    
    const dataStr = JSON.stringify(logsToDownload, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = filename;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
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
    <div className="max-w-7xl mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Admin Logs
          </h1>
          <p className="mt-2 text-gray-300 dark:text-gray-300">
            Visualize logs de emails, webhooks e requisições
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-gray-800 dark:bg-gray-800 text-white dark:text-white"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button
            onClick={() => {
              if (activeTab === 'email') loadEmailLogs();
              else if (activeTab === 'webhook') loadWebhookLogs();
              else if (activeTab === 'request') loadRequestLogs();
            }}
            disabled={
              (activeTab === 'email' && loadingEmails) || 
              (activeTab === 'webhook' && loadingWebhooks) ||
              (activeTab === 'request' && loadingRequests)
            }
            variant="outline"
            className="flex items-center gap-2 border-gray-700 text-gray-300"
          >
            <RefreshCw className={`h-4 w-4 ${
              (activeTab === 'email' && loadingEmails) || 
              (activeTab === 'webhook' && loadingWebhooks) ||
              (activeTab === 'request' && loadingRequests)
                ? 'animate-spin' 
                : ''
            }`} />
            Atualizar
          </Button>
          <Button
            onClick={downloadLogs}
            variant="outline"
            className="flex items-center gap-2 border-gray-700 text-gray-300"
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'email'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => {
            setActiveTab('email');
            if (!loadingEmails && emailLogs.length === 0) {
              loadEmailLogs();
            }
          }}
        >
          Email Logs
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'webhook'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => {
            setActiveTab('webhook');
            if (!loadingWebhooks && webhookLogs.length === 0) {
              loadWebhookLogs();
            }
          }}
        >
          Webhook Logs
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'request'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => {
            setActiveTab('request');
            if (!loadingRequests && requestLogs.length === 0) {
              loadRequestLogs();
            }
          }}
        >
          Request Logs
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-300">Status:</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 text-sm rounded-full ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterStatus('sent')}
            className={`px-3 py-1 text-sm rounded-full ${
              filterStatus === 'sent'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Enviados
          </button>
          <button
            onClick={() => setFilterStatus('requested')}
            className={`px-3 py-1 text-sm rounded-full ${
              filterStatus === 'requested'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilterStatus('error')}
            className={`px-3 py-1 text-sm rounded-full ${
              filterStatus === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Erros
          </button>
        </div>
      </div>

      {/* Email Logs */}
      {activeTab === 'email' && (
        <div className="space-y-4">
          {emailError && (
            <div className="bg-red-900/50 border border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <p>{emailError}</p>
              </div>
            </div>
          )}

          {loadingEmails ? (
            <div className="text-center py-12">
              <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
              <p className="mt-2 text-gray-300">
                Carregando logs de email...
              </p>
            </div>
          ) : filteredEmailLogs.length > 0 ? (
            <div className="space-y-4">
              {filteredEmailLogs.map((log) => (
                <div key={log.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex flex-wrap justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLogExpanded(log.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        {expandedLogs[log.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-white">{log.email_type}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        log.status === 'sent' 
                          ? 'bg-green-900/50 text-green-400' 
                          : log.status === 'error'
                          ? 'bg-red-900/50 text-red-400'
                          : 'bg-yellow-900/50 text-yellow-400'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Destinatário:</div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-white">{log.recipient}</span>
                      </div>
                    </div>
                    
                    {log.plan_type && (
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Plano:</div>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-gray-500" />
                          <span className="text-white">{log.plan_type}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {expandedLogs[log.id] && (
                    <>
                      {log.error_message && (
                        <div className="mb-4">
                          <div className="text-sm text-gray-400 mb-1">Erro:</div>
                          <div className="bg-red-900/30 p-3 rounded border border-red-800/50 text-red-400">
                            {log.error_message}
                          </div>
                        </div>
                      )}
                      
                      {log.response_data && (
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                            <FileText className="h-4 w-4" />
                            <span>Dados da Resposta:</span>
                          </div>
                          <pre className="bg-gray-900 p-3 rounded border border-gray-700 text-gray-300 overflow-x-auto text-sm">
                            {JSON.stringify(log.response_data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              {searchQuery || filterStatus !== 'all' ? 'Nenhum log de email encontrado com os filtros atuais.' : 'Nenhum log de email disponível.'}
            </div>
          )}
        </div>
      )}

      {/* Webhook Logs */}
      {activeTab === 'webhook' && (
        <div className="space-y-4">
          {webhookError && (
            <div className="bg-red-900/50 border border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <p>{webhookError}</p>
              </div>
            </div>
          )}

          {loadingWebhooks ? (
            <div className="text-center py-12">
              <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
              <p className="mt-2 text-gray-300">
                Carregando logs de webhook...
              </p>
            </div>
          ) : filteredWebhookLogs.length > 0 ? (
            <div className="space-y-4">
              {filteredWebhookLogs.map((log) => (
                <div key={log.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex flex-wrap justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLogExpanded(log.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        {expandedLogs[log.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      <Globe className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-white">{log.event_type}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        log.status === 'processed' || log.status === 'success'
                          ? 'bg-green-900/50 text-green-400' 
                          : log.status === 'error'
                          ? 'bg-red-900/50 text-red-400'
                          : 'bg-yellow-900/50 text-yellow-400'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {expandedLogs[log.id] && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                        <FileText className="h-4 w-4" />
                        <span>Dados do Evento:</span>
                      </div>
                      <pre className="bg-gray-900 p-3 rounded border border-gray-700 text-gray-300 overflow-x-auto text-sm">
                        {JSON.stringify(log.event_data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              {searchQuery || filterStatus !== 'all' ? 'Nenhum log de webhook encontrado com os filtros atuais.' : 'Nenhum log de webhook disponível.'}
            </div>
          )}
        </div>
      )}

      {/* Request Logs */}
      {activeTab === 'request' && (
        <div className="space-y-4">
          {requestError && (
            <div className="bg-red-900/50 border border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <p>{requestError}</p>
              </div>
            </div>
          )}

          {loadingRequests ? (
            <div className="text-center py-12">
              <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
              <p className="mt-2 text-gray-300">
                Carregando logs de requisições...
              </p>
            </div>
          ) : filteredRequestLogs.length > 0 ? (
            <div className="space-y-4">
              {filteredRequestLogs.map((log) => (
                <div key={log.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex flex-wrap justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLogExpanded(log.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        {expandedLogs[log.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      <Database className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-white">{log.request_method}</span>
                      <span className="text-gray-300">{log.request_path}</span>
                      {log.response_status && (
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          log.response_status >= 200 && log.response_status < 300
                            ? 'bg-green-900/50 text-green-400' 
                            : log.response_status >= 400
                            ? 'bg-red-900/50 text-red-400'
                            : 'bg-yellow-900/50 text-yellow-400'
                        }`}>
                          {log.response_status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {log.user_id && (
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Usuário:</div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-white">{log.user_id}</span>
                        </div>
                      </div>
                    )}
                    
                    {log.ip_address && (
                      <div>
                        <div className="text-sm text-gray-400 mb-1">IP:</div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-gray-500" />
                          <span className="text-white">{log.ip_address}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {expandedLogs[log.id] && (
                    <>
                      {log.request_data && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                            <ArrowRight className="h-4 w-4" />
                            <span>Dados da Requisição:</span>
                          </div>
                          <pre className="bg-gray-900 p-3 rounded border border-gray-700 text-gray-300 overflow-x-auto text-sm">
                            {JSON.stringify(log.request_data, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {log.response_data && (
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                            <FileText className="h-4 w-4" />
                            <span>Dados da Resposta:</span>
                          </div>
                          <pre className="bg-gray-900 p-3 rounded border border-gray-700 text-gray-300 overflow-x-auto text-sm">
                            {JSON.stringify(log.response_data, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {log.user_agent && (
                        <div className="mt-4 text-xs text-gray-400">
                          <div className="flex items-center gap-2">
                            <Globe className="h-3 w-3" />
                            <span>{log.user_agent}</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              {searchQuery || filterStatus !== 'all' ? 'Nenhum log de requisição encontrado com os filtros atuais.' : 'Nenhum log de requisição disponível.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}