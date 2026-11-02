import { useState, useEffect, useRef, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { modalVariants } from '../utils/animations';

function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    closeAuthModal,
    oauthError,
    clearOauthError,
    signIn,
    signUp,
    resetPassword,
    signInWithGoogle,
  } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const firstInputRef = useRef(null);
  const autoCloseTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
    };
  }, []);

  // Focus first input upon opening modal
  useEffect(() => {
    if (isAuthModalOpen) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isAuthModalOpen, authModalMode, isForgotPassword]);

  // Handle escape key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };

    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen, closeAuthModal]);

  const handleClose = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsForgotPassword(false);
    setIsGoogleLoading(false);
    clearOauthError();
    closeAuthModal();
  };

  const handleSwitchMode = (mode) => {
    setAuthModalMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
    setIsForgotPassword(false);
    setIsGoogleLoading(false);
    clearOauthError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (isForgotPassword) {
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      setIsLoading(true);
      try {
        await resetPassword(email);
        setSuccessMessage('Password reset instructions have been sent to your email.');
      } catch (err) {
        setErrorMessage(err.message || 'Failed to send reset link. Please try again.');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (authModalMode === 'signup') {
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      setIsLoading(true);
      try {
        const result = await signUp({ fullName, email, password });
        if (result.requiresEmailVerification) {
          setSuccessMessage(
            'Account registered in database! Please check your email to verify before signing in.'
          );
        } else {
          setSuccessMessage(`Account created successfully! Welcome, ${fullName}.`);
          if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
          autoCloseTimeoutRef.current = setTimeout(() => {
            handleClose();
          }, 400);
        }
      } catch (err) {
        setErrorMessage(err.message || 'Error creating account. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Sign In mode
      if (!email.trim() || !password) {
        setErrorMessage('Please fill in both email and password.');
        return;
      }

      setIsLoading(true);
      try {
        await signIn({ email, password });
        handleClose();
      } catch (err) {
        setErrorMessage(err.message || 'Invalid email or password.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <m.div
          key="auth-modal-backdrop"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants.backdrop}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 cursor-pointer"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <m.div
            key="auth-modal-card"
            variants={modalVariants.modal}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl z-10 border border-slate-200/80 overflow-hidden my-auto"
          >
            {/* Header with App Logo & Close Button */}
            <div className="p-6 pb-0 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src="/logo.png"
                  alt="ARES Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover shadow-xs ring-1 ring-blue-500/20 shrink-0"
                />
                <span className="text-xl font-black text-blue-600 tracking-tight">ARES</span>
                <span className="text-[11px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                  Cloud Sync
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 pt-4">
              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 id="auth-modal-title" className="text-2xl font-bold text-slate-900">
                  {isForgotPassword
                    ? 'Reset Password'
                    : authModalMode === 'signup'
                    ? 'Get started with ARES'
                    : 'Welcome back'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isForgotPassword
                    ? 'Enter your email to receive a password reset link.'
                    : authModalMode === 'signup'
                    ? 'Create your free account with ARES - Smart Meeting Assistance.'
                    : 'Sign in to access your meetings, transcripts, and AI notes.'}
                </p>
              </div>

              {/* Mode Switcher Tabs (Sign In vs Sign Up) */}
              {!isForgotPassword && (
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('signin')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      authModalMode === 'signin'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('signup')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      authModalMode === 'signup'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Sign Up Free
                  </button>
                </div>
              )}

              {/* Feedback Banners */}
              {(errorMessage || oauthError) && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
                  <span className="leading-relaxed">{errorMessage || oauthError}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-700 animate-in fade-in">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field (Sign Up only) */}
                {authModalMode === 'signup' && !isForgotPassword && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="auth-fullname">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        ref={firstInputRef}
                        id="auth-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Enter your name"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="auth-email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      ref={authModalMode === 'signin' ? firstInputRef : null}
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="you@company.com"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Password Field */}
                {!isForgotPassword && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-slate-700" htmlFor="auth-password">
                        Password
                      </label>
                      {authModalMode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotPassword(true);
                            setErrorMessage('');
                            setSuccessMessage('');
                          }}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-500 focus-visible:outline-none"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="••••••••"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus-visible:outline-none"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm Password Field (Sign Up only) */}
                {authModalMode === 'signup' && !isForgotPassword && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="auth-confirm-password">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="••••••••"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-500 transition shadow-md shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-2 text-sm disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Syncing with database...</span>
                    </>
                  ) : isForgotPassword ? (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight size={16} />
                    </>
                  ) : authModalMode === 'signup' ? (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Forgot Password back button */}
              {isForgotPassword && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setErrorMessage('');
                      setSuccessMessage('');
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              )}

              {/* Divider & OAuth */}
              {!isForgotPassword && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isGoogleLoading}
                    onClick={() => {
                      setIsGoogleLoading(true);
                      clearOauthError();
                      signInWithGoogle();
                    }}
                    className="w-full bg-white border border-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition active:scale-[0.99] flex items-center justify-center gap-2.5 text-sm shadow-sm cursor-pointer disabled:opacity-70"
                  >
                    {isGoogleLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-blue-600" />
                        <span>Connecting to Google...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Google</span>
                      </>
                    )}
                  </button>
                </>
              )}

              {/* Terms notice */}
              <p className="text-[11px] text-slate-400 text-center mt-5 leading-normal">
                By continuing, you agree to ARES'{' '}
                <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and{' '}
                <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
              </p>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default memo(AuthModal);
