import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import Hero from './components/Hero';
import { RobotsPage } from './components/RobotsPage';
import { StrategyPacks } from './components/StrategyPacks';
import { ProprietaryDesk } from './components/ProprietaryDesk';
import { CopyInvest } from './components/CopyInvest';
import { Community } from './components/Community';
import { Consulting } from './components/Consulting';
import { ThankYou } from './components/ThankYou';
import { ThemeProvider } from './components/ThemeProvider';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AuthProvider } from './contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { AdminProvider } from './contexts/AdminContext';
import { PlanProvider } from './contexts/PlanContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './components/LoginPage';
import { MembersArea } from './components/MembersArea';
import { StripeWebhookPage } from './components/StripeWebhookPage';
import { useEffect } from 'react';
import { startPeriodicProcessing, processPendingData } from './lib/rdStationWorker';
import { AlertBanner } from './components/AlertBanner';
import { Footer } from './components/Footer';
import { TradingPlatformSales } from './components/TradingPlatformSales';
import { RobotsClub } from './components/RobotsClub';
import { PingTestPage } from './components/PingTest/PingTestPage';
import { TaxCalculatorLanding } from './components/TaxCalculator';
import { SurveyLanding } from './components/TraderProfileSurvey';
import { SEOHead } from './components/SEOHead';
import { CalculatorLanding } from './components/CalculatorLanding';
import { CalculatorDayTrade } from './components/CalculatorDayTrade';

function AppContent() {
  const location = useLocation();
  const isMembersArea = location.pathname.startsWith('/members');

  // Iniciar o processamento de dados pendentes quando o app carregar
  useEffect(() => {
    // Iniciar o worker para processar dados pendentes do RD Station
    startPeriodicProcessing();
    
    // Tentar processar dados pendentes imediatamente
    processPendingData().catch(console.error);
    
    console.log('RD Station worker iniciado');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200 flex flex-col">
      <AlertBanner />
      <SEOHead />
      {!isMembersArea && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/clube-de-robos" element={<RobotsClub />} />
          <Route path="/robots" element={<RobotsPage />} /> {/* Keep old route for compatibility */}
          <Route path="/estrategias" element={<StrategyPacks />} />
          <Route path="/copy-trade" element={<CopyInvest />} />
          <Route path="/copy-invest" element={<CopyInvest />} /> {/* Keep old route for compatibility */}
          <Route path="/consultoria" element={<Consulting />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/mesa-proprietaria" element={<TradingPlatformSales />} />
          <Route path="/mesa-proprietaria-old" element={<ProprietaryDesk />} />
          <Route path="/comunidade" element={<Community />} />
          <Route path="/teste-ping" element={<PingTestPage />} />
          <Route path="/perfil-trader" element={<SurveyLanding />} />
          <Route path="/calculadora-ir" element={<TaxCalculatorLanding />} />
          <Route path="/calculadora-day-trade" element={<CalculatorLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/members/calculator" element={
            <ProtectedRoute>
              <CalculatorDayTrade />
            </ProtectedRoute>
          } />
          <Route path="/webhookstripepayment" element={
            <ProtectedRoute>
              <StripeWebhookPage />
            </ProtectedRoute>
          } />
          <Route
            path="/members/*"
            element={
              <ProtectedRoute>
                <MembersArea />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isMembersArea && <Footer />}
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <AdminProvider>
            <PlanProvider>
              <Router>
                <AppContent />
              </Router>
            </PlanProvider>
          </AdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;