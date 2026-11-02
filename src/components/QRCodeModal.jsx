import { useState, useEffect, useRef, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, Smartphone } from 'lucide-react';
import { modalVariants } from '../utils/animations';
import { PLAY_STORE_URL, GooglePlayIcon } from './GooglePlayButton';

function QRCodeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, [isOpen, onClose]);

  const handleCopy = () => {
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    navigator.clipboard.writeText(PLAY_STORE_URL);
    setCopied(true);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=12&data=${encodeURIComponent(
    PLAY_STORE_URL
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="qr-modal-backdrop"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants.backdrop}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
        >
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <m.div
            key="qr-modal-card"
            variants={modalVariants.modal}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl z-10 border border-slate-200 p-6 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close QR dialog"
            >
              <X size={18} />
            </button>

            {/* Icon & Title */}
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3 border border-blue-100 shadow-inner">
              <Smartphone size={24} />
            </div>

            <h3 id="qr-modal-title" className="text-xl font-bold text-slate-900 mb-1">
              Install ARES on Mobile
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-5 max-w-xs">
              Point your phone camera at this QR code to download directly from the Google Play Store.
            </p>

            {/* QR Code Container with Frame */}
            <div className="relative p-3 bg-white border-2 border-dashed border-blue-200 rounded-2xl shadow-sm mb-5 group">
              <img
                src={qrImageUrl}
                alt="Scan QR code to install ARES"
                width={220}
                height={220}
                className="w-52 h-52 rounded-xl object-contain"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-[1px] rounded-xl">
                <span className="bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md">
                  Google Play Store
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full flex flex-col gap-2.5">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md shadow-blue-500/25 active:scale-[0.98]"
              >
                <GooglePlayIcon className="w-4 h-4 text-white" />
                <span>Open in Google Play Store</span>
                <ExternalLink size={13} />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs border border-slate-200 flex items-center justify-center gap-2 transition active:scale-[0.98]"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Play Store Link'}</span>
              </button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default memo(QRCodeModal);
