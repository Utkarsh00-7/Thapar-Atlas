import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, LogIn, User, Settings, Sparkles } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';
import { cn } from '../../utils/helpers';
import MobileNav from './MobileNav';
import './Header.css';

export default function Header({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
    const activeIndex = NAV_ITEMS.findIndex(({ path }) => {
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
  }, [location.pathname]);

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

            {NAV_ITEMS.map(({ label, path, icon: Icon }, idx) => (
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
              <button className="header__action-btn" type="button" aria-label="Profile">
                <User size={18} />
              </button>
              <button className="header__action-btn" type="button" aria-label="Settings">
                <Settings size={18} />
              </button>
              <button className="header__action-btn header__sign-in-pill" type="button">
                <div className="header__avatar-fallback">
                  <User size={12} />
                </div>
                <span>Sign In</span>
              </button>
            </div>

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
