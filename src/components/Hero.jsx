import { memo } from 'react';
import { m } from 'framer-motion';
import { Play, QrCode } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../utils/animations';
import { useAuth } from '../context/useAuth';
import GooglePlayButton from './GooglePlayButton';

function Hero({ onOpenVideo, isVideoOpen, onOpenQR }) {
  const { isAuthenticated, user, openSignUp } = useAuth();

  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 overflow-hidden bg-white">
      {/* Subtle Grid Background */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <m.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <m.div
            variants={fadeUpVariant}
            className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 border border-blue-100 shadow-xs"
          >
            <img
              src="/logo.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover shrink-0"
              aria-hidden="true"
            />
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>ARES 2.0 is here</span>
          </m.div>

          {/* Heading */}
          <m.h1
            variants={fadeUpVariant}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.08] tracking-tighter mb-6"
          >
            One platform to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              connect it all.
            </span>
          </m.h1>

          {/* Subtitle */}
          <m.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Bring teams together, reimagine workspaces, and turn conversations into instant action items with ARES - Smart Meeting Assistance.
          </m.p>

          {/* CTA Buttons */}
          <m.div
            variants={fadeUpVariant}
            className="flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-4 mb-5"
          >
            <button
              type="button"
              onClick={openSignUp}
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 text-base font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            >
              {isAuthenticated ? `Signed in as ${user?.fullName || 'User'}` : 'Sign Up Free'}
            </button>
            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 border border-slate-200 text-base font-semibold rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              View Plans
            </a>
          </m.div>

          {/* Google Play Store Direct Download & QR Scan */}
          <m.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <GooglePlayButton variant="white" />
            {onOpenQR && (
              <button
                type="button"
                onClick={onOpenQR}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs hover:shadow-md transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
              >
                <QrCode size={16} className="text-blue-600" />
                <span>Scan QR to Install</span>
              </button>
            )}
          </m.div>
        </m.div>

        {/* Premium Mac Window Mockup (Clickable Video Player Trigger) */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="mt-12 sm:mt-14 max-w-4xl mx-auto"
        >
          <div
            onClick={onOpenVideo}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenVideo();
              }
            }}
            aria-label="Watch ARES - Smart Meeting Assistance Tutorial Video"
            aria-haspopup="dialog"
            aria-expanded={isVideoOpen}
            className="rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur-sm p-2 shadow-2xl shadow-slate-200/50 cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 transition-all duration-300"
          >
            <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative aspect-video transition-transform duration-500 group-hover:scale-[0.995]">
              {/* Mac Title Bar */}
              <div className="h-8 bg-slate-800/60 border-b border-slate-700/50 flex items-center px-4 space-x-2 absolute top-0 w-full z-10 transition-colors group-hover:bg-slate-800/80">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>

              {/* Video Placeholder Content */}
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-white transition-all group-hover:bg-slate-800/90 pt-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/50">
                  <Play fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 ml-1 text-white" />
                </div>
                <p className="mt-5 sm:mt-6 font-medium tracking-wide text-slate-300 group-hover:text-white transition-colors text-sm sm:text-base">
                  Watch Tutorial Video
                </p>
                <span className="mt-1 text-xs text-slate-400">Click to play video tour with sound</span>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

export default memo(Hero);
