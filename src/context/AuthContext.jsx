import { useState, useCallback, useMemo, useEffect } from 'react';
import { AuthContext } from './auth-context-def';
import { supabaseService } from '../services/supabase';

function getInitialAuthState() {
  try {
    const session = supabaseService.getSession();
    if (session?.user) {
      return {
        session,
        user: {
          id: session.user.id,
          email: session.user.email,
          fullName: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
        },
      };
    }
    return { session, user: null };
  } catch {
    return { session: null, user: null };
  }
}

export function AuthProvider({ children }) {
  // Initialize state directly from stored session in a single read
  const [authState, setAuthState] = useState(getInitialAuthState);
  const { session, user } = authState;

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signup'); // 'signin' | 'signup'
  const [oauthError, setOauthError] = useState(null);

  // Automatically check and process OAuth redirect callback on page load
  useEffect(() => {
    supabaseService.handleOAuthCallback().then((result) => {
      if (result) {
        if (result.session && result.user) {
          setAuthState({ session: result.session, user: result.user });
          setIsAuthModalOpen(false);
          setOauthError(null);
        } else if (result.error) {
          setOauthError(result.error);
          setIsAuthModalOpen(true);
        }
      }
    });
  }, []);

  const openSignIn = useCallback(() => {
    setAuthModalMode('signin');
    setOauthError(null);
    setIsAuthModalOpen(true);
  }, []);

  const openSignUp = useCallback(() => {
    setAuthModalMode('signup');
    setOauthError(null);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setOauthError(null);
  }, []);

  const clearOauthError = useCallback(() => {
    setOauthError(null);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const res = await supabaseService.signIn({ email, password });
    setAuthState({ session: res.session, user: res.user });
    return res;
  }, []);

  const signUp = useCallback(async ({ fullName, email, password }) => {
    const res = await supabaseService.signUp({ email, password, fullName });
    if (res.session) {
      setAuthState({ session: res.session, user: res.user });
    }
    return res;
  }, []);

  const signOut = useCallback(async () => {
    await supabaseService.signOut(session?.access_token);
    setAuthState({ session: null, user: null });
  }, [session]);

  const resetPassword = useCallback(async (email) => {
    return await supabaseService.resetPassword(email);
  }, []);

  const signInWithGoogle = useCallback(() => {
    supabaseService.signInWithGoogle();
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      isAuthenticated: Boolean(user),
      isAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      oauthError,
      clearOauthError,
      openSignIn,
      openSignUp,
      closeAuthModal,
      signIn,
      signUp,
      signOut,
      resetPassword,
      signInWithGoogle,
    }),
    [
      user,
      session,
      isAuthModalOpen,
      authModalMode,
      oauthError,
      clearOauthError,
      openSignIn,
      openSignUp,
      closeAuthModal,
      signIn,
      signUp,
      signOut,
      resetPassword,
      signInWithGoogle,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
