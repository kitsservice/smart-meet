import { memo } from 'react';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kits.ares';

export const GooglePlayIcon = memo(function GooglePlayIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.609 1.813c-.334.354-.519.897-.519 1.597v17.18c0 .7.185 1.243.519 1.597l.083.076 9.619-9.619v-.23L3.692 1.737l-.083.076z"
        fill="#2196F3"
      />
      <path
        d="M16.516 15.637l-3.205-3.205v-.23l3.205-3.205.074.042 3.8 2.158c1.085.617 1.085 1.624 0 2.241l-3.8 2.159-.074.04z"
        fill="#FFC107"
      />
      <path
        d="M13.311 12.202L3.609 21.904c.365.385.968.431 1.666.035l11.315-6.427-3.279-3.31z"
        fill="#4CAF50"
      />
      <path
        d="M13.311 12.433l3.279-3.31L5.275 2.696C4.577 2.3 3.974 2.346 3.609 2.731l9.702 9.702z"
        fill="#F44336"
      />
    </svg>
  );
});

function GooglePlayButton({
  variant = 'dark',
  className = '',
  showRating = false,
}) {
  const isDark = variant === 'dark';

  return (
    <div className="inline-flex flex-col items-center gap-1.5">
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download ARES - Smart Meeting Assistance on Google Play Store"
        className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group ${
          isDark
            ? 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-700/80 shadow-slate-900/20'
            : 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-slate-200/50'
        } ${className}`}
      >
        <GooglePlayIcon className="w-7 h-7 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        <div className="text-left flex flex-col justify-center">
          <span
            className={`text-[10px] uppercase font-bold tracking-widest leading-none ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            GET IT ON
          </span>
          <span className="text-sm sm:text-base font-extrabold tracking-tight leading-tight">
            Google Play
          </span>
        </div>
      </a>
      {showRating && (
        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          <span className="text-amber-500">★★★★★</span>
          <span>4.9 on Google Play</span>
        </span>
      )}
    </div>
  );
}

export default memo(GooglePlayButton);
