import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Brand & Desktop Nav */}
        <div className="flex items-center space-x-8">
          <a
            href="#"
            className="text-2xl font-extrabold text-blue-600 tracking-tighter hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            smartmeet
          </a>
          <nav className="hidden lg:block" aria-label="Main Navigation">
            <ul className="flex space-x-6 text-slate-600 font-medium text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-slate-900 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Desktop CTA actions */}
        <div className="hidden lg:flex items-center space-x-5 text-sm font-medium">
          <a
            href="#pricing"
            className="text-blue-600 font-semibold hover:text-blue-500 transition-all duration-200 active:scale-95 px-2 py-1"
          >
            Contact Sales
          </a>
          <a
            href="#"
            className="text-blue-600 font-semibold hover:text-blue-500 transition-all duration-200 active:scale-95 px-2 py-1"
          >
            Sign In
          </a>
          <a
            href="#"
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Sign Up Free
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-5 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium text-base py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2.5">
              <a
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-blue-600 font-semibold text-center py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Contact Sales
              </a>
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-blue-600 font-semibold text-center py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sign In
              </a>
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-600 text-white font-semibold text-center py-2.5 px-4 rounded-full hover:bg-blue-500 transition-colors shadow-sm"
              >
                Sign Up Free
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
