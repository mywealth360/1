import { useState } from 'react';
import { Button } from './Button';
import { Bot, MessageSquare, HelpCircle, Users, ArrowRight, Calendar, User, X, Shield, Settings, AlertTriangle, FileText } from 'lucide-react';
import { whatsappLinks } from '../lib/robotLinks';

export function Tutorials() {
  const [showConfigAssistant, setShowConfigAssistant] = useState(false);
  const [activeTab, setActiveTab] = useState<'activation' | 'help' | 'manuals'>('activation');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Ativação e Ajuda
          </h1>
          <p className="mt-2 text-gray-300 dark:text-gray-300">
            Aprenda a ativar e configurar suas ferramentas
          </p>
        </div>

        <Button
          onClick={() => setShowConfigAssistant(true)}
          className="flex items-center gap-2"
        >
          <Bot className="h-4 w-4" />
          Assistente de Configuração
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 dark:border-gray-800">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('activation')}
            className={`pb-4 relative ${
              activeTab === 'activation'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span className="font-medium">Ativação</span>
            </div>
            {activeTab === 'activation' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`pb-4 relative ${
              activeTab === 'help'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">Ajuda</span>
            </div>
            {activeTab === 'help' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('manuals')}
            className={`pb-4 relative ${
              activeTab === 'manuals'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="font-medium">Manuais</span>
            </div>
            {activeTab === 'manuals' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
        </div>
      </div>

      {activeTab === 'activation' && (
        <div className="space-y-8">
          {/* Copy Invest Tridar Activation */}
          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-white dark:text-white mb-6">
              Como Ativar o Copy Invest Tridar
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-400 dark:text-blue-400 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                    Contratar Copy Invest ou Pack Pro + Plataforma TRIDAR
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 mb-4">
                    Escolha entre o Copy Trade individual ou o Pack Pro que inclui todas as funcionalidades.
                  </p>
                  <img
                    src="https://imagizer.imageshack.com/img924/3651/znIspD.png"
                    alt="Copy Invest Dashboard"
                    className="rounded-lg w-full max-w-2xl"
                  />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-400 dark:text-blue-400 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                    Contratar Plataforma MetaTrader 5 no BTG
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 mb-4">
                    Para contratar a plataforma MetaTrader 5, siga estes passos:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300 dark:text-gray-300 mb-4">
                    <li>Acesse a área de <strong>Produtos de Investimento</strong></li>
                    <li>Clique na aba <strong>Plataformas</strong></li>
                    <li>Selecione <strong>Algoritmos</strong></li>
                    <li>Localize e contrate o <strong>MetaTrader 5</strong></li>
                    <li>Na configuração, selecione o modo <strong>NETTING</strong></li>
                  </ol>
                  <p className="text-gray-300 dark:text-gray-300 mb-4">
                    Acesse a área de Renda Variável no BTG, vá em Plataformas &gt; Algoritmos &gt; MetaTrader 5
                  </p>
                  <div className="bg-amber-900/50 dark:bg-amber-900/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-amber-200 dark:text-amber-200">
                      <AlertTriangle className="h-5 w-5" />
                      <p className="font-medium">IMPORTANTE</p>
                    </div>
                    <p className="mt-2 text-amber-300 dark:text-amber-300">
                      Certifique-se de selecionar o modo NETTING. O modo incorreto pode gerar perdas irreversíveis.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <img
                      src="https://imagizer.imageshack.com/img924/7572/bfK7e0.png"
                      alt="Acesso à área de Renda Variável"
                      className="rounded-lg w-full max-w-2xl"
                    />
                    <img
                      src="https://imagizer.imageshack.com/img924/7681/SQJHxg.png"
                      alt="Contratação do MetaTrader 5"
                      className="rounded-lg w-full max-w-2xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-400 dark:text-blue-400 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                    Compartilhar Dados de Acesso
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 mb-4">
                    Compartilhe os dados de acesso recebidos por email com a TRIDAR ou com o suporte do Profit Estrategista.
                  </p>
                  <Button
                    as="a"
                    href={whatsappLinks.support}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Contatar Suporte
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Club Robots Activation */}
          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-white dark:text-white mb-6">
              Como Ativar os Robôs do Clube
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-400 dark:text-blue-400 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                    Coletar Chave de Ativação
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 mb-4">
                    Localize a chave de ativação que foi enviada para seu email no momento da compra.
                  </p>
                  <img
                    src="https://imagizer.imageshack.com/img922/7785/rDTfKp.png"
                    alt="Email com chave de ativação"
                    className="rounded-lg w-full max-w-2xl"
                  />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-400 dark:text-blue-400 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                    Acessar Módulo de Automação
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 mb-4">
                    Na barra superior central do Profit, clique em:
                  </p>
                  <div className="flex items-center gap-2 text-gray-300 dark:text-gray-300 mb-4">
                    Estratégias → Automação de Estratégias → Nova Automação
                  </div>
                  <div className="space-y-4">
                    <img
                      src="https://imagizer.imageshack.com/img922/240/n0XW0E.png"
                      alt="Seleção de automação de estratégias"
                      className="rounded-lg w-full max-w-2xl"
                    />
                    <img
                      src="https://imagizer.imageshack.com/img923/9076/HI9Nkg.png"
                      alt="Nova automação"
                      className="rounded-lg w-full max-w-2xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-400 dark:text-blue-400 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                    Inserir Chave de Ativação
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 mb-4">
                    Clique no ícone de engrenagem, selecione "Editar Parâmetros" e role até encontrar o campo para inserir a chave.
                  </p>
                  <img
                    src="https://imagizer.imageshack.com/img922/6656/o6cULZ.png"
                    alt="Campo de chave de ativação"
                    className="rounded-lg w-full max-w-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'help' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-white dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Suporte Técnico
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Nossa equipe está disponível para ajudar com qualquer dúvida técnica sobre os robôs e plataformas.
            </p>
            <Button
              as="a"
              href={whatsappLinks.support}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Falar com Suporte
            </Button>
          </div>

          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-white dark:text-white mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Assistente Virtual
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Use nosso assistente virtual para ajuda com configurações e dúvidas comuns.
            </p>
            <Button
              as="a"
              href="https://chatgpt.com/g/g-678c078c21208191a0b18fb1a70e22f1-profit-estrategista-trading-solutions/c/67d6feef-9668-8003-a008-3c0831af5559"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Acessar Assistente
            </Button>
          </div>

          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-white dark:text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Comunidade
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Participe de nossa comunidade no WhatsApp para trocar experiências com outros traders.
            </p>
            <Button
              as="a"
              href={whatsappLinks.group}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Entrar no Grupo
            </Button>
          </div>

          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-white dark:text-white mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Documentação
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Acesse nossa documentação completa com guias detalhados e referências técnicas.
            </p>
            <Button
              as="a"
              href="https://heyzine.com/flip-book/85263048b0.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Ver Documentação
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'manuals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-white dark:text-white">
                Manual Técnico
              </h3>
            </div>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Guia completo para ativação e configuração inicial dos robôs.
            </p>
            <Button
              as="a"
              href="https://heyzine.com/flip-book/85263048b0.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Baixar PDF
            </Button>
          </div>
          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-white dark:text-white">
                Manual de Primeiros Passos
              </h3>
            </div>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Guia básico para começar a utilizar os robôs e plataformas.
            </p>
            <Button
              as="a"
              href="https://gamma.app/docs/Manual-Completo-de-Configuracao-do-Profit-Estrategista-kybr9otsfbd8ze8/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Baixar PDF
            </Button>
          </div>
        </div>
      )}

      {/* Configuration Assistant Modal */}
      {showConfigAssistant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl w-full max-w-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-4">
                Assistente de Configuração
              </h2>
              <p className="text-gray-300 dark:text-gray-300 mb-6">
                Nosso assistente virtual irá te guiar passo a passo na configuração dos seus robôs.
              </p>
              <div className="space-y-4">
                <Button
                  as="a"
                  href="https://chatgpt.com/g/g-678c078c21208191a0b18fb1a70e22f1-profit-estrategista-trading-solutions/c/67d6feef-9668-8003-a008-3c0831af5559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  Iniciar Configuração
                  <Bot className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowConfigAssistant(false)}
                  className="w-full"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}