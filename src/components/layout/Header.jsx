import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, LogIn, User, Sparkles, LogOut, Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { NAV_ITEMS, ADMIN_EMAILS } from '../../utils/constants';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import MobileNav from './MobileNav';
import './Header.css';

export default function Header({ theme, toggleTheme }) {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  const displayedNavItems = useMemo(() => {
    const isAdmin = user && user.email && ADMIN_EMAILS.includes(user.email);
    return isAdmin
      ? [...NAV_ITEMS, { label: 'Admin', path: '/admin', icon: ShieldCheck }]
      : NAV_ITEMS;
  }, [user]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Dropdown & login error states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef(null);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Login error details:", err);
      setErrorMessage(err.message || "Failed to sign in. Please try again.");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 6000);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownOpen]);

  // Navigation indicator state
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [dotStyle, setDotStyle] = useState({ left: 0, opacity: 0 });
  const [hoverStyle, setHoverStyle] = useState({ left: 0, top: 0, opacity: 0 });

  const linksRef = useRef([]);
  const navRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active link positions
  const updateIndicatorToActive = useCallback(() => {
    const activeIndex = displayedNavItems.findIndex(({ path }) => {
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
    });

    if (activeIndex !== -1 && linksRef.current[activeIndex]) {
      const el = linksRef.current[activeIndex];
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      });
      setDotStyle({
        left: el.offsetLeft + el.offsetWidth / 2 - 2, // 2px is half of 4px dot
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      setDotStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname, displayedNavItems]);

  useEffect(() => {
    const timer = setTimeout(updateIndicatorToActive, 60);
    return () => clearTimeout(timer);
  }, [updateIndicatorToActive]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicatorToActive);
    return () => window.removeEventListener('resize', updateIndicatorToActive);
  }, [updateIndicatorToActive]);

  // Mouse move handlers inside navigation container
  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverStyle({
      left: `${x}px`,
      top: `${y}px`,
      opacity: 1,
    });
  };

  const handleLinkHover = (e, index) => {
    const el = e.currentTarget;
    setIndicatorStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
    });
    setDotStyle({
      left: el.offsetLeft + el.offsetWidth / 2 - 2,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
    updateIndicatorToActive();
  };

  const isDark = theme === 'dark';

  return (
    <>
      <header className={cn('header', scrolled && 'header--scrolled')}>
        <div className="header__inner">
          {/* Logo with star-compass */}
          <Link to="/" className="header__logo-container" aria-label="Thapar Atlas Home">
            <div className="header__logo-glow-wrapper">
              <svg className="header__logo-svg" viewBox="0 0 40 40" width="36" height="36">
                <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" strokeDasharray="3, 3" />
                <circle cx="20" cy="20" r="10" fill="none" stroke="rgba(34, 211, 238, 0.35)" strokeWidth="1" />
                {/* 8-pointed star */}
                <path d="M20,4 L23,16 L36,20 L23,24 L20,36 L17,24 L4,20 L17,16 Z" fill="url(#logo-star-grad)" />
                <path d="M20,9 L21.5,17.5 L30,20 L21.5,22.5 L20,31 L18.5,22.5 L10,20 L18.5,17.5 Z" fill="#FFFFFF" opacity="0.9" />
                <defs>
                  <linearGradient id="logo-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#0891B2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="header__logo-text-wrapper">
              <span className="header__logo-main">Atlas</span>
              <span className="header__logo-sub">thapar atlas</span>
            </div>
          </Link>

          {/* Desktop navigation with sliding star & pill */}
          <nav
            ref={navRef}
            className="header__nav"
            aria-label="Main navigation"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Magnetic Glow element */}
            <div
              className="header__nav-glow"
              style={{
                left: hoverStyle.left,
                top: hoverStyle.top,
                opacity: hoverStyle.opacity,
              }}
            />

            {/* Sliding Pill Indicator */}
            <div
              className="header__nav-pill-indicator"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />

            {displayedNavItems.map(({ label, path, icon: Icon }, idx) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                ref={(el) => (linksRef.current[idx] = el)}
                onMouseEnter={(e) => handleLinkHover(e, idx)}
                className={({ isActive }) =>
                  cn('header__nav-link', isActive && 'active')
                }
              >
                <Icon size={16} className="nav-icon" />
                {label}
              </NavLink>
            ))}

            {/* Sliding Star Indicator */}
            <div
              className="header__nav-dot-indicator"
              style={{
                left: dotStyle.left,
                opacity: dotStyle.opacity,
              }}
            />
          </nav>

          {/* Actions panel */}
          <div className="header__actions">
            {/* Unified glass actions container */}
            <div className="header__actions-glass">

              {loading ? (
                <button className="header__action-btn header__sign-in-pill header__sign-in-pill--loading" disabled type="button">
                  <Loader2 className="animate-spin" size={14} />
                  <span>Connecting...</span>
                </button>
              ) : user ? (
                <div className="header__user-menu" ref={dropdownRef}>
                  <button 
                    className="header__action-btn header__user-pill" 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    type="button"
                  >
                    <div className="header__avatar-wrapper">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="header__avatar-img" />
                      ) : (
                        <div className="header__avatar-initials">
                          {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                        </div>
                      )}
                    </div>
                    <span className="header__username-span">{user.displayName ? user.displayName.split(' ')[0] : 'User'}</span>
                  </button>
                  
                  {dropdownOpen && (
                    <div className="header__dropdown glass-panel">
                      <div className="header__dropdown-user-info">
                        <p className="header__dropdown-name">{user.displayName}</p>
                        <p className="header__dropdown-email">{user.email}</p>
                      </div>
                      <div className="header__dropdown-divider" />
                      <button 
                        className="header__dropdown-item header__dropdown-item--logout"
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        type="button"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  className="header__action-btn header__sign-in-pill" 
                  onClick={handleLogin}
                  type="button"
                >
                  <div className="header__avatar-fallback">
                    <LogIn size={12} />
                  </div>
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Error Toast */}
            {showErrorToast && (
              <div className="header__error-toast glass-panel">
                <ShieldAlert size={16} className="error-toast-icon" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Hamburger menu for mobile */}
            <button
              className="header__hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </>
  );
}
