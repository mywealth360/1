// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import twilio from 'twilio';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Verificar se as credenciais do Twilio estão configuradas
const isTwilioConfigured = process.env.TWILIO_ACCOUNT_SID && 
                          process.env.TWILIO_AUTH_TOKEN && 
                          process.env.TWILIO_VERIFY_SERVICE_SID &&
                          process.env.TWILIO_ACCOUNT_SID !== 'your_twilio_account_sid' &&
                          process.env.TWILIO_ACCOUNT_SID.startsWith('AC');

// Inicializar Twilio apenas se as credenciais estão configuradas
let twilioClient;
if (isTwilioConfigured) {
  try {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('Twilio inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar Twilio:', error);
  }
}

// Configurar CORS
app.use(cors());

// Configurar o processamento de corpo para todas as rotas exceto webhook
app.use((req, res, next) => {
  if (req.path === '/webhookstripepayment') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Endpoint para enviar código de verificação via Twilio
app.post('/api/twilio/send-code', async (req, res) => {
  try {
    console.log('Recebida requisição para enviar código:', req.body);
    
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Número de telefone é obrigatório' 
      });
    }

    // Validar formato do número de telefone
    if (!phoneNumber.startsWith('+55') || phoneNumber.length < 14) {
      return res.status(400).json({
        success: false,
        message: 'Formato de telefone inválido. Use +55DDNNNNNNNNN'
      });
    }

    if (!isTwilioConfigured) {
      console.warn('Credenciais do Twilio não configuradas, usando modo de desenvolvimento');
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Gerar código de 6 dígitos
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      console.log(`[MODO DEV] Código gerado para ${phoneNumber}: ${code}`);
      
      return res.json({
        success: true,
        message: `[MODO DEV] Código enviado: ${code}`,
        sid: 'mock_sid_' + Date.now(),
        devCode: code // Apenas para desenvolvimento
      });
    }

    console.log('Enviando código via Twilio para:', phoneNumber);
    
    // Enviar código via Twilio
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    console.log('Código enviado via Twilio, SID:', verification.sid);

    res.json({
      success: true,
      sid: verification.sid,
      message: 'Código de verificação enviado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao enviar código Twilio:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erro ao enviar código de verificação'
    });
  }
});

// Endpoint para verificar código via Twilio
app.post('/api/twilio/verify-code', async (req, res) => {
  try {
    console.log('Recebida requisição para verificar código:', req.body);
    
    const { phoneNumber, code } = req.body;
    
    if (!phoneNumber || !code) {
      return res.status(400).json({ 
        success: false, 
        message: 'Número de telefone e código são obrigatórios' 
      });
    }

    // Validar formato do código
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        success: false,
        message: 'Código deve conter exatamente 6 dígitos'
      });
    }

    if (!isTwilioConfigured) {
      console.warn('Credenciais do Twilio não configuradas, usando modo de desenvolvimento');
      
      console.log(`[MODO DEV] Verificando código ${code} para ${phoneNumber}`);
      
      return res.json({
        success: true,
        valid: true, // Em modo dev, sempre aceitar códigos válidos
        message: 'Código verificado com sucesso (modo desenvolvimento)'
      });
    }

    console.log('Verificando código via Twilio:', phoneNumber, code);
    
    // Verificar código via Twilio
    const verificationCheck = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({ to: phoneNumber, code: code });

    console.log('Resultado da verificação Twilio:', verificationCheck.status);

    res.json({
      success: true,
      valid: verificationCheck.status === 'approved',
      message: verificationCheck.status === 'approved' ? 'Código verificado com sucesso' : 'Código inválido'
    });

  } catch (error) {
    console.error('Erro ao verificar código Twilio:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erro ao verificar código'
    });
  }
});

// Endpoint webhook do Stripe - usar corpo bruto para verificação de assinatura
app.post('/webhookstripepayment', express.raw({type: 'application/json'}), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  
  try {
    // Criar cliente Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Verificar assinatura do webhook
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Registrar evento no banco de dados
    await supabase
      .from('webhook_logs')
      .insert({
        event_type: event.type,
        event_data: event.data.object,
        status: 'processed'
      });
    
    // Responder com sucesso
    res.json({ received: true });
  } catch (error) {
    console.error('Erro de webhook:', error);
    
    // Registrar erro se possível
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      
      await supabase
        .from('webhook_logs')
        .insert({
          event_type: 'error',
          event_data: { error: error.message },
          status: 'error'
        });
    } catch (logError) {
      console.error('Erro ao registrar erro:', logError);
    }
    
    res.status(400).json({ error: error.message });
  }
});

// Servir arquivos estáticos do build do Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Para qualquer outra requisição, servir o app React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Twilio configurado: ${isTwilioConfigured ? 'Sim' : 'Não (modo desenvolvimento)'}`);
});