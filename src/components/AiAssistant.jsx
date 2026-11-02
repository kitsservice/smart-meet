import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, FileText, Zap, MessageCircle, Settings2, Check } from 'lucide-react';
import { floatingMenuVariants } from '../utils/animations';

const aiActions = [
  {
    id: 'summary',
    label: 'Generate Summary',
    description: 'Instant bullet points & key decisions',
    icon: FileText,
    iconBg: 'bg-blue-50 group-hover:bg-blue-100 text-blue-600',
  },
  {
    id: 'actions',
    label: 'Extract Action Items',
    description: 'Assign tasks to owners with due dates',
    icon: Zap,
    iconBg: 'bg-purple-50 group-hover:bg-purple-100 text-purple-600',
  },
  {
    id: 'chat',
    label: 'Meeting Chatbot',
    description: 'Ask questions about your transcripts',
    icon: MessageCircle,
    iconBg: 'bg-emerald-50 group-hover:bg-emerald-100 text-emerald-600',
  },
  {
    id: 'settings',
    label: 'AI Preferences',
    description: 'Configure custom prompt & vocabulary',
    icon: Settings2,
    iconBg: 'bg-amber-50 group-hover:bg-amber-100 text-amber-600',
  },
];

function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Clean up feedback timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAction = useCallback((label) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveFeedback(label);
    timeoutRef.current = setTimeout(() => {
      setActiveFeedback(null);
    }, 2500);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-3 sm:space-y-4 max-w-[calc(100vw-2rem)]"
    >
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="ai-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={floatingMenuVariants}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm flex flex-col overflow-hidden origin-bottom-right"
            role="dialog"
            aria-modal="true"
            aria-label="ARES AI Companion"
          >
            {/* Header */}
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span>ARES Companion</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                  Active
                </span>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close ARES Companion menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notification banner when an action is clicked */}
            {activeFeedback && (
              <div 
                role="status"
                aria-live="polite"
                className="mx-2 mt-2 p-2.5 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 text-xs text-blue-700 font-medium animate-in fade-in"
              >
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Started: <strong>{activeFeedback}</strong></span>
              </div>
            )}

            {/* Actions list */}
            <div className="p-2 flex flex-col space-y-1">
              {aiActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => handleAction(action.label)}
                    className="flex items-center gap-3 w-full p-2.5 hover:bg-slate-50 rounded-xl text-left transition group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <div
                      aria-hidden="true"
                      className={`p-2 rounded-lg transition shrink-0 ${action.iconBg}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal leading-tight">
                        {action.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? 'Close ARES Companion' : 'Open ARES Companion'}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 ${
          isOpen
            ? 'bg-slate-800 text-white hover:bg-slate-700'
            : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-500/40'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
}

export default memo(AiAssistant);
