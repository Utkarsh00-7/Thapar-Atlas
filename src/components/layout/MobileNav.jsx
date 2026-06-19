import { useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { X, LogIn, LogOut, Loader2, ShieldCheck } from 'lucide-react';
import { NAV_ITEMS, ADMIN_EMAILS } from '../../utils/constants';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import './MobileNav.css';

export default function MobileNav({ isOpen, onClose, theme, toggleTheme }) {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const isDark = theme === 'dark';

  const displayedNavItems = useMemo(() => {
    const isAdmin = user && user.email && ADMIN_EMAILS.includes(user.email);
    return isAdmin
      ? [...NAV_ITEMS, { label: 'Admin', path: '/admin', icon: ShieldCheck }]
      : NAV_ITEMS;
  }, [user]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      console.error("Mobile nav login failed:", err);
    }
  };

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn('mobile-nav__backdrop', isOpen && 'mobile-nav__backdrop--open')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav
        className={cn('mobile-nav__panel', isOpen && 'mobile-nav__panel--open')}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="mobile-nav__header">
          <span className="mobile-nav__title">Menu</span>
          <button
            className="mobile-nav__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        {/* Nav Links */}
        <div className="mobile-nav__links">
          {displayedNavItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                cn('mobile-nav__link', isActive && 'active')
              }
              onClick={onClose}
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mobile-nav__footer">
          {loading ? (
            <button className="mobile-nav__sign-in mobile-nav__sign-in--loading" type="button" disabled>
              <Loader2 className="animate-spin" size={16} />
              <span>Connecting...</span>
            </button>
          ) : user ? (
            <div className="mobile-nav__user-section">
              <div className="mobile-nav__user-card">
                <div className="mobile-nav__avatar">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="mobile-nav__avatar-img" />
                  ) : (
                    <div className="mobile-nav__avatar-fallback">
                      {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                <div className="mobile-nav__user-details">
                  <span className="mobile-nav__user-name">{user.displayName}</span>
                  <span className="mobile-nav__user-email">{user.email}</span>
                </div>
              </div>
              <button 
                className="mobile-nav__sign-out" 
                onClick={() => {
                  logout();
                  onClose();
                }} 
                type="button"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button className="mobile-nav__sign-in" onClick={handleLogin} type="button">
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
