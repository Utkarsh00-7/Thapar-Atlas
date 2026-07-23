import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import { ADMIN_EMAILS } from '../utils/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set auth persistence to local storage
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .catch((err) => console.error("Firebase auth persistence error:", err));
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    let isMounted = true;
    
    // Safety fallback: Ensure loading becomes false after 2.5s maximum
    const timer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 2500);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!isMounted) return;
      // If user is logged in, verify email domain or admin status (case-insensitive)
      if (currentUser) {
        const email = (currentUser.email || '').trim().toLowerCase();
        const isAdmin = ADMIN_EMAILS.some(a => a.trim().toLowerCase() === email);
        const isThaparEmail = email.endsWith('@thapar.edu');

        if (isThaparEmail || isAdmin) {
          setUser(currentUser);
          setError(null);
        } else {
          // If for some reason an unauthorized non-Thapar user is currently logged in, clear it
          setUser(null);
          signOut(auth);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }, (err) => {
      console.error("Auth state change error:", err);
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  // Google sign in popup with domain validation
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = (result.user.email || '').trim().toLowerCase();
      const isAdmin = ADMIN_EMAILS.some(a => a.trim().toLowerCase() === email);
      const isThaparEmail = email.endsWith('@thapar.edu');

      // Strict Thapar email domain verification (allow authorized admins as well)
      if (!isThaparEmail && !isAdmin) {
        await signOut(auth);
        setUser(null);
        const errMessage = "Thapar Atlas is restricted to official @thapar.edu emails. Please try again with your student/faculty account.";
        setError(errMessage);
        setLoading(false);
        throw new Error(errMessage);
      }
      
      setUser(result.user);
      setLoading(false);
      return result.user;
    } catch (err) {
      setLoading(false);
      if (err.code === 'auth/popup-closed-by-user') {
        // User closed popup, don't set global error
        return null;
      }
      // Set error message
      const errMsg = err.message || "Failed to sign in. Please try again.";
      setError(errMsg);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("Sign out error:", err);
      setError("Failed to sign out. Please try again.");
      setLoading(false);
      throw err;
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
