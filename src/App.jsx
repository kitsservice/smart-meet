import { useState, lazy, Suspense } from 'react';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Security from './components/Security';
import MobileShowcase from './components/MobileShowcase';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';

// Lazy load video modal for initial bundle size optimization
const VideoModal = lazy(() => import('./components/VideoModal'));

export default function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 flex flex-col w-full overflow-x-hidden">
      {/* Top Banner announcement */}
      <TopBanner />

      {/* Main navigation header */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">
        <Hero onOpenVideo={() => setIsVideoOpen(true)} />
        <Features />
        <Security />
        <MobileShowcase />
        <Pricing />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Floating AI Assistant */}
      <AiAssistant />

      {/* Video Modal (Loaded dynamically when opened) */}
      {isVideoOpen && (
        <Suspense fallback={null}>
          <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
