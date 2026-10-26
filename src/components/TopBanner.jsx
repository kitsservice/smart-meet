import { ArrowRight } from 'lucide-react';

export default function TopBanner() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-blue-600 text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide"
    >
      <a
        href="#features"
        className="hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
      >
        <span>Introducing SmartMeet AI Companion. Work smarter, not harder.</span>
        <ArrowRight size={14} aria-hidden="true" />
      </a>
    </aside>
  );
}
