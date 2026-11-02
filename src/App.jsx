import { useState, lazy, Suspense, useCallback } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Features from './components/Features';
import Security from './components/Security';
import MobileShowcase from './components/MobileShowcase';
import Integrations from './components/Integrations';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';

// Lazy loaded non-critical chunks to optimize initial page weight and TTI
const AuthModal = lazy(() => import('./components/AuthModal'));
const QRCodeModal = lazy(() => import('./components/QRCodeModal'));
const VideoModal = lazy(() => import('./components/VideoModal'));

function AuthModalLoader() {
  const { isAuthModalOpen } = useAuth();
  if (!isAuthModalOpen) return null;
  return (
    <Suspense fallback={null}>
      <AuthModal />
    </Suspense>
  );
}

export default function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);

  const handleOpenVideo = useCallback(() => {
    setIsVideoOpen(true);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setIsVideoOpen(false);
  }, []);

  const handleOpenQR = useCallback(() => {
    setIsQROpen(true);
  }, []);

  const handleCloseQR = useCallback(() => {
    setIsQROpen(false);
  }, []);

  return (
    <AuthProvider>
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 flex flex-col w-full overflow-x-hidden">
          {/* Top Banner announcement */}
          <TopBanner />

          {/* Main navigation header */}
          <Navbar />

          {/* Page content */}
          <main id="main-content" className="flex-1">
            <Hero 
              onOpenVideo={handleOpenVideo} 
              isVideoOpen={isVideoOpen} 
              onOpenQR={handleOpenQR}
            />
            <StatsBar />
            <Features />
            <Security />
            <MobileShowcase onOpenQR={handleOpenQR} />
            <Integrations />
            <Pricing />
            <FAQ />
          </main>

          {/* Footer */}
          <Footer />

          {/* Interactive Floating AI Assistant */}
          <AiAssistant />

          {/* Authentication Modal loaded dynamically upon request */}
          <AuthModalLoader />

          {/* Scan QR Code Modal for Google Play Store */}
          {isQROpen && (
            <Suspense fallback={null}>
              <QRCodeModal isOpen={isQROpen} onClose={handleCloseQR} />
            </Suspense>
          )}

          {/* Video Modal (Loaded dynamically when opened) */}
          {isVideoOpen && (
            <Suspense fallback={null}>
              <VideoModal isOpen={isVideoOpen} onClose={handleCloseVideo} />
            </Suspense>
          )}
        </div>
      </LazyMotion>
    </AuthProvider>
  );
}
