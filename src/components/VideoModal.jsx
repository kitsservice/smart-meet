import { useEffect, useRef, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalVariants } from '../utils/animations';

function VideoModal({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);

  // Close on Escape key & lock scroll when open, manage focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Auto focus close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="video-modal-backdrop"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants.backdrop}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          {/* Backdrop click target */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <m.div
            key="video-modal-content"
            variants={modalVariants.modal}
            className="relative w-full max-w-4xl max-h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl z-10 border border-slate-800 flex flex-col justify-center"
          >
            <h2 id="video-modal-title" className="sr-only">
              ARES - Smart Meeting Assistance Tour Video
            </h2>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close video player"
              className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-red-600 text-white rounded-full p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} />
            </button>

            {/* Video Player */}
            <div className="aspect-video w-full bg-slate-950">
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
              >
                Your browser does not support HTML5 video streaming.
              </video>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default memo(VideoModal);
