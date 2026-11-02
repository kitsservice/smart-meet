import { useState, memo } from 'react';
import { ArrowRight, X } from 'lucide-react';

function TopBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return sessionStorage.getItem('smartmeet_banner_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('smartmeet_banner_dismissed', 'true');
    } catch {
      // Safe fallback if sessionStorage is blocked
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-blue-600 text-white text-xs font-semibold tracking-wide relative px-4 py-2.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        <a
          href="#features"
          className="hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-0.5 text-center"
        >
          <span>Introducing ARES - Smart Meeting Assistance. Work smarter, not harder.</span>
          <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
        </a>
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-blue-200 hover:text-white rounded transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Dismiss announcement banner"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
}

export default memo(TopBanner);
