/**
 * Supabase Client & Service for ARES - Smart Meeting Assistance
 * Optimized for ultra-fast, non-blocking authentication & database sync.
 */

const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://dhrqllyezfwchvbeshpr.supabase.co';

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocnFsbHllemZ3Y2h2YmVzaHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMjk0MzksImV4cCI6MjEwNTgwNTQzOX0.J12NtMuLAPSPfRl1xtQLr6N887KUIKwsCfeca6qHR5I';

const STORAGE_KEY = 'smartmeet_auth_session';

/**
 * Fast Supabase fetch with 8-second AbortController timeout
 */
async function supabaseFetch(endpoint, options = {}, timeoutMs = 8000) {
  const url = `${SUPABASE_URL}${endpoint}`;
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timer);

    const contentType = response.headers.get('content-type');
    let data = null;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMsg =
        (data && (data.msg || data.message || data.error_description || data.error)) ||
        `Authentication failed (HTTP ${response.status})`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error('Connection timed out. Please check your internet connection and try again.');
    }
    throw err;
  }
}

export const supabaseService = {
  /**
   * Save session to localStorage
   */
  setSession(session) {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage unavailable
    }
  },

  /**
   * Load active session from localStorage
   */
  getSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Sign up a new user and sync profile to app `users` table
   */
  async signUp({ email, password, fullName }) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName ? fullName.trim() : '';

    // 1. Single direct call to Supabase Auth
    const res = await supabaseFetch('/auth/v1/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: cleanEmail,
        password,
        data: {
          full_name: cleanName,
        },
      }),
    });

    const user = res.user || res;
    const session = res.access_token ? res : (res.session || null);

    // 2. If authenticated session received, sync to public.users non-blocking in background
    if (session && session.access_token && user && user.id) {
      this.setSession(session);
      // Fire in background so the user is not waiting
      this.upsertUserProfile({
        id: user.id,
        email: cleanEmail,
        fullName: cleanName,
        accessToken: session.access_token,
      }).catch((e) => console.warn('Background profile sync notice:', e));
    }

    return {
      user: {
        id: user.id,
        email: cleanEmail,
        fullName: cleanName,
      },
      session,
      requiresEmailVerification: !session,
    };
  },

  /**
   * Instant sign in with existing email and password
   */
  async signIn({ email, password }) {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Authenticate in a single network request
    const res = await supabaseFetch('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: JSON.stringify({
        email: cleanEmail,
        password,
      }),
    });

    const user = res.user;
    const fullName = user?.user_metadata?.full_name || '';

    // Store session immediately
    this.setSession(res);

    // 2. Background sync (NON-BLOCKING - does not delay user login)
    if (user?.id && res.access_token) {
      this.upsertUserProfile({
        id: user.id,
        email: cleanEmail,
        fullName: fullName || cleanEmail.split('@')[0],
        accessToken: res.access_token,
      }).catch(() => {});
    }

    return {
      user: {
        id: user.id,
        email: cleanEmail,
        fullName,
      },
      session: res,
    };
  },

  /**
   * Insert or update user record in public.users table
   */
  async upsertUserProfile({ id, email, fullName, accessToken }) {
    const headers = {
      'Prefer': 'resolution=merge-duplicates',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return await supabaseFetch(
      '/rest/v1/users',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id,
          email,
          full_name: fullName,
        }),
      },
      5000 // Fast 5-second timeout for background sync
    );
  },

  /**
   * Request password reset email
   */
  async resetPassword(email) {
    const cleanEmail = email.trim().toLowerCase();
    return await supabaseFetch('/auth/v1/recover', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail }),
    });
  },

  /**
   * Sign out current user
   */
  async signOut(accessToken) {
    try {
      if (accessToken) {
        await supabaseFetch(
          '/auth/v1/logout',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          },
          3000 // 3-second quick timeout
        );
      }
    } catch {
      // Ignore network errors on signout
    } finally {
      this.setSession(null);
    }
  },

  /**
   * Fetch user details from Supabase using an active access token
   */
  async getUser(accessToken) {
    if (!accessToken) return null;
    return await supabaseFetch('/auth/v1/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },

  /**
   * Parse and handle OAuth redirect callback (hash parameters or query params)
   */
  async handleOAuthCallback() {
    try {
      if (typeof window === 'undefined') return null;

      const hash = window.location.hash ? window.location.hash.substring(1) : '';
      const search = window.location.search ? window.location.search.substring(1) : '';

      if (!hash && !search) return null;

      const hashParams = new URLSearchParams(hash);
      const searchParams = new URLSearchParams(search);

      // Check for OAuth error redirected back from Supabase
      const error = hashParams.get('error') || searchParams.get('error');
      const errorDescription =
        hashParams.get('error_description') ||
        searchParams.get('error_description') ||
        hashParams.get('error_code');

      if (error) {
        window.history.replaceState(null, '', window.location.pathname);
        const decodedMsg = errorDescription
          ? decodeURIComponent(errorDescription.replace(/\+/g, ' '))
          : `OAuth Error: ${error}`;
        return {
          error: decodedMsg,
          session: null,
          user: null,
        };
      }

      // Check for access_token in URL hash (Supabase Implicit Flow)
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const expiresIn = hashParams.get('expires_in');
      const tokenType = hashParams.get('token_type') || 'bearer';

      if (accessToken) {
        // Fetch full user data from /auth/v1/user
        const userData = await this.getUser(accessToken);
        const user = {
          id: userData.id,
          email: userData.email,
          fullName:
            userData.user_metadata?.full_name ||
            userData.user_metadata?.name ||
            userData.email.split('@')[0],
          avatarUrl:
            userData.user_metadata?.avatar_url ||
            userData.user_metadata?.picture ||
            '',
        };

        const session = {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
          token_type: tokenType,
          user,
        };

        this.setSession(session);

        // Non-blocking background sync user profile to database
        this.upsertUserProfile({
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          accessToken,
        }).catch(() => {});

        // Clean up URL so tokens are not exposed in browser history or address bar
        window.history.replaceState(null, '', window.location.pathname);

        return { session, user, error: null };
      }

      return null;
    } catch (err) {
      return {
        error: err.message || 'OAuth authentication failed. Please try again.',
        session: null,
        user: null,
      };
    }
  },

  /**
   * Redirect to Google OAuth provider
   */
  signInWithGoogle() {
    const redirectUrl = encodeURIComponent(window.location.origin);
    window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`;
  },
};
