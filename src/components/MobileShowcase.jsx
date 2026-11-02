import { memo } from 'react';
import { m } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { mobileScreens } from '../data/showcase';
import { fadeUpVariant, staggerContainer } from '../utils/animations';
import GooglePlayButton from './GooglePlayButton';

// Static array defined once outside component to prevent runtime allocations
const SCREENS = [...mobileScreens, ...mobileScreens];

function MobileShowcase({ onOpenQR }) {
  return (
    <section className="py-20 sm:py-24 bg-white overflow-hidden border-y border-slate-100 scroll-mt-16" id="mobile-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <m.div
            variants={fadeUpVariant}
            className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 border border-emerald-100"
          >
            <span>📱 Now Available on Android</span>
          </m.div>

          <m.h2
            variants={fadeUpVariant}
            className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 tracking-tight"
          >
            Your office, anywhere.
          </m.h2>
          <m.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium mb-8"
          >
            Take ARES on the go with our beautifully designed mobile app. Record, transcribe, and schedule meetings right from your pocket.
          </m.p>

          {/* Prominent Google Play Store Download Button & QR Code Option */}
          <m.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-4">
            <GooglePlayButton variant="dark" showRating />
            {onOpenQR && (
              <button
                type="button"
                onClick={onOpenQR}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs hover:shadow-md transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
              >
                <QrCode size={16} className="text-blue-600" />
                <span>Scan QR Code</span>
              </button>
            )}
          </m.div>
        </m.div>

        {/* Elegant Marquee */}
        <div 
          tabIndex={0}
          aria-label="Mobile app screenshots carousel. Hover or focus to pause scroll."
          className="relative w-full max-w-full overflow-hidden py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
        >
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] space-x-6 md:space-x-8 px-4 sm:px-6 md:px-8 motion-reduce:animate-none">
            {SCREENS.map((img, idx) => (
              <div
                key={`${img.src}-${idx}`}
                className="shrink-0 w-[200px] sm:w-[220px] md:w-[240px] flex-col flex items-center transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div
                  className={`relative rounded-[2.25rem] overflow-hidden border-[6px] sm:border-[7px] border-slate-100 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.2)] group-hover:border-slate-200 transition-all ${
                    idx % 2 === 0 ? 'animate-float' : 'animate-[float_6s_ease-in-out_3s_infinite]'
                  } motion-reduce:animate-none`}
                >
                  {/* Phone Top Notch Fake (Light Mode) */}
                  <div 
                    aria-hidden="true"
                    className="absolute top-0 inset-x-0 h-5 bg-slate-100 rounded-b-xl w-28 mx-auto z-20 flex justify-center items-end pb-1 transition-colors group-hover:bg-slate-200"
                  >
                    <div className="w-10 h-1 bg-slate-300 rounded-full" />
                  </div>

                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    width={240}
                    height={520}
                    className="w-full h-auto object-cover rounded-[1.6rem] relative z-0 transition-transform duration-700 group-hover:scale-[1.01]"
                    style={{ aspectRatio: '1125/2436' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Fade edges for seamless scroll effect */}
          <div 
            aria-hidden="true" 
            className="absolute top-0 bottom-0 left-0 w-16 md:w-36 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-30" 
          />
          <div 
            aria-hidden="true" 
            className="absolute top-0 bottom-0 right-0 w-16 md:w-36 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-30" 
          />
        </div>
      </div>
    </section>
  );
}

export default memo(MobileShowcase);
