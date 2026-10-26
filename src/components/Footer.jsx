import { footerLinks } from '../data/navigation';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-1">
            <div className="text-2xl font-extrabold text-blue-600 tracking-tighter mb-4">
              smartmeet
            </div>
            <p className="text-xs font-medium leading-relaxed mb-6">
              Making work less work, one meeting at a time. Secure and reliable.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">About</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-blue-600 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Download</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footerLinks.download.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-blue-600 transition-colors">
                    {link.name}
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
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-medium">
          <p className="mb-4 md:mb-0">© {CURRENT_YEAR} SmartMeet Inc. All rights reserved.</p>
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
