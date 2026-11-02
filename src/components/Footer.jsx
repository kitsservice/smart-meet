import { useState, useRef, useEffect, memo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { footerLinks } from '../data/navigation';
import GooglePlayButton from './GooglePlayButton';

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribeTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (subscribeTimeoutRef.current) clearTimeout(subscribeTimeoutRef.current);
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    if (subscribeTimeoutRef.current) clearTimeout(subscribeTimeoutRef.current);
    setIsSubscribed(true);
    setEmail('');
    subscribeTimeoutRef.current = setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand & Newsletter */}
          <div className="sm:col-span-2">
            <a href="#" className="inline-flex items-center gap-2.5 mb-3 group" aria-label="ARES - Smart Meeting Assistance Home">
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
                <span className="text-xs font-semibold text-slate-500 border-l border-slate-300 pl-2">
                  Smart Meeting Assistance
                </span>
              </div>
            </a>
            <p className="text-xs font-medium leading-relaxed mb-5 max-w-sm text-slate-500">
              Transforming meetings into actionable knowledge. Trusted by forward-thinking teams worldwide.
            </p>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="max-w-sm mb-6">
              <label htmlFor="newsletter-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Subscribe to our product updates
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 transition"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2 text-xs font-semibold flex items-center justify-center transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                >
                  {isSubscribed ? <Check size={14} /> : <ArrowRight size={14} />}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 animate-in fade-in">
                  Thank you! You have been subscribed.
                </p>
              )}
            </form>

            <div className="pt-1">
              <GooglePlayButton variant="dark" />
            </div>
          </div>

          {/* Download Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Download</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footerLinks.download.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{link.name}</span>
                    {link.isExternal && <span className="text-xs text-blue-600 font-bold">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-blue-600 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* System Status & Trust */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Trust</h4>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700 font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <ul className="space-y-2 text-xs font-medium">
              <li>SOC2 Type II Certified</li>
              <li>AES-256 Encryption</li>
              <li>GDPR & HIPAA Compliant</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-medium gap-4">
          <p>© {CURRENT_YEAR} ARES - Smart Meeting Assistance. All rights reserved.</p>
          <div className="flex space-x-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
