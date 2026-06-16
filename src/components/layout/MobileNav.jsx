import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, LogIn } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';
import { cn } from '../../utils/helpers';
import './MobileNav.css';

export default function MobileNav({ isOpen, onClose, theme, toggleTheme }) {
  const isDark = theme === 'dark';

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
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
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
          {/* Sign in */}
          <button className="mobile-nav__sign-in" type="button">
            <LogIn />
            Sign In
          </button>
        </div>
      </nav>
    </>
  );
}
