import { useState, useEffect, memo } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { useAuth } from '../context/useAuth';

function Navbar() {
  const { user, isAuthenticated, openSignIn, openSignUp, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Elevation shadow on scroll with requestAnimationFrame throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key and screen resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U';

  const displayName = user?.fullName || user?.email?.split('@')[0] || 'User';

  return (
    <>
      {/* Skip to Content for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg z-[60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
            : 'bg-white/70 backdrop-blur-md border-b border-slate-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          {/* Brand & Desktop Nav */}
          <div className="flex items-center space-x-8">
            <a
              href="#"
              className="flex items-center gap-2.5 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group"
              aria-label="ARES - Smart Meeting Assistance Home"
            >
              <img
                src="/logo.png"
                alt="ARES Logo"
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover shadow-xs ring-1 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all shrink-0"
              />
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-blue-600 tracking-tight">
                  ARES
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 border-l border-slate-300 pl-2">
                  Smart Meeting Assistance
                </span>
              </div>
            </a>
            <nav className="hidden lg:block" aria-label="Main Navigation">
              <ul className="flex space-x-6 text-slate-600 font-medium text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-blue-600 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Desktop Auth / CTA actions */}
          <div className="hidden lg:flex items-center space-x-3 text-sm font-medium">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200/80 rounded-full py-1 px-3 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {initials}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[140px] truncate">
                    {displayName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-red-600 px-2 py-1 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  aria-label="Sign out of account"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={openSignIn}
                  className="text-blue-600 font-semibold hover:text-blue-500 transition-all duration-200 active:scale-95 px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={openSignUp}
                  className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-5 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
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
                  href="https://play.google.com/store/apps/details?id=com.kits.ares"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 text-white font-semibold text-center py-2 px-4 rounded-xl hover:bg-slate-800 transition-colors text-xs flex items-center justify-center gap-2"
                >
                  <span>Get App on Google Play</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">Free</span>
                </a>

                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2 pt-2">
                    <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                        {initials}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-bold text-slate-900 truncate">{displayName}</div>
                        <div className="text-xs text-slate-500 truncate">{user?.email}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="w-full text-red-600 font-semibold py-2 px-4 rounded-lg border border-red-100 hover:bg-red-50 text-sm flex items-center justify-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openSignIn();
                      }}
                      className="text-blue-600 font-semibold text-center py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openSignUp();
                      }}
                      className="bg-blue-600 text-white font-semibold text-center py-2.5 px-4 rounded-full hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
                    >
                      Sign Up Free
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export default memo(Navbar);
