import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  LogIn, 
  User, 
  Sparkles, 
  LogOut, 
  Loader2, 
  ShieldAlert, 
  ShieldCheck, 
  MessageSquare, 
  ChevronDown,
  Home,
  FolderOpen,
  FileText,
  ClipboardList,
  Search,
  Wifi,
  Calculator,
  MapPin,
  Upload,
  X,
  CheckCircle,
  BadgeCheck,
  AlertTriangle
} from 'lucide-react';
import { NAV_ITEMS, ADMIN_EMAILS } from '../../utils/constants';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { getStudentProfile, saveStudentProfile } from '../../utils/studentDb';
import { verifyStudentIdCard } from '../../utils/moderationAi';
import MobileNav from './MobileNav';
import './Header.css';

export default function Header({ theme, toggleTheme }) {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  const navGroups = useMemo(() => {
    const toolsItems = [
      { label: 'Classroom Finder', path: '/classrooms', icon: Search },
      { label: 'Wifi Passwords', path: '/wifi', icon: Wifi },
      { label: 'Societies', path: '/societies', icon: Sparkles },
      { label: 'GPA Tools', path: '/gpa', icon: Calculator },
      { label: 'Campus Map', path: '/campus', icon: MapPin },
      { label: 'Feedback', path: '/feedback', icon: MessageSquare }
    ];

    const isAdmin = user && user.email && ADMIN_EMAILS.includes(user.email);
    if (isAdmin) {
      toolsItems.push({ label: 'Admin Panel', path: '/admin', icon: ShieldCheck });
    }

    return [
      {
        type: 'link',
        label: 'Home',
        path: '/',
        icon: Home
      },
      {
        type: 'dropdown',
        label: 'Academics',
        activePaths: ['/resources', '/pyqs', '/syllabus'],
        items: [
          { label: 'Resources', path: '/resources', icon: FolderOpen },
          { label: 'PYQ Hub', path: '/pyqs', icon: FileText },
          { label: 'Syllabus Tracker', path: '/syllabus', icon: ClipboardList }
        ]
      },
      {
        type: 'link',
        label: 'Contribute',
        path: '/contribute',
        icon: Upload
      },
      {
        type: 'dropdown',
        label: 'Miscellaneous',
        activePaths: ['/classrooms', '/wifi', '/societies', '/gpa', '/campus', '/feedback', '/admin'],
        items: toolsItems
      }
    ];
  }, [user]);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  // Dropdown & login error states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef(null);

  // Student Profile States
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [studentProfile, setStudentProfile] = useState({
    name: '',
    rollNumber: '',
    branch: 'COE',
    year: '1',
    subgroup: '',
    phone: '',
    isVerified: false,
    verificationReason: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  // ID Card Image States
  const [idFileBase64, setIdFileBase64] = useState(null);
  const [idFileMime, setIdFileMime] = useState(null);
  const [idFileName, setIdFileName] = useState('');
  const [idVerifyStatus, setIdVerifyStatus] = useState(null); // { verified: boolean, reason: string }
  const [idVerifying, setIdVerifying] = useState(false);

  // Load profile details whenever the authenticated user changes
  useEffect(() => {
    async function loadProfile() {
      if (user) {
        setProfileLoading(true);
        try {
          const prof = await getStudentProfile(user.email);
          if (prof) {
            setCurrentUserProfile(prof);
            setStudentProfile({
              name: prof.name || user.displayName || '',
              rollNumber: prof.rollNumber || '',
              branch: prof.branch || 'COE',
              year: prof.year || '1',
              subgroup: prof.subgroup || '',
              phone: prof.phone || '',
              isVerified: prof.isVerified || false,
              verificationReason: prof.verificationReason || ''
            });
            if (prof.isVerified) {
              setIdVerifyStatus({ verified: true, reason: 'ID Card details verified' });
            }
          } else {
            setCurrentUserProfile(null);
            setStudentProfile({
              name: user.displayName || '',
              rollNumber: '',
              branch: 'COE',
              year: '1',
              subgroup: '',
              phone: '',
              isVerified: false,
              verificationReason: ''
            });
          }
        } catch (err) {
          console.error(err);
        }
        setProfileLoading(false);
      }
    }
    loadProfile();
  }, [user]);

  const handleIdCardUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIdFileName(file.name);
    setIdVerifyStatus(null);
    setIdVerifying(true);
    
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setIdFileBase64(base64);
      setIdFileMime(file.type);
      
      // Perform AI verification immediately
      try {
        const result = await verifyStudentIdCard(studentProfile, base64, file.type);
        setIdVerifyStatus(result);
        setStudentProfile(prev => ({
          ...prev,
          isVerified: !!result.verified,
          verificationReason: result.reason || ''
        }));
      } catch (err) {
        console.error(err);
        setIdVerifyStatus({ verified: false, reason: 'AI Verification service error' });
      }
      setIdVerifying(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user) return;
    setProfileSaving(true);
    try {
      const savedData = await saveStudentProfile(user.email, studentProfile);
      setCurrentUserProfile(savedData);
      alert('Profile details saved successfully!');
      setProfileModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save profile details. Please try again.');
    }
    setProfileSaving(false);
  };

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
    const activeIndex = navGroups.findIndex((group) => {
      if (group.type === 'link') {
        return location.pathname === group.path;
      }
      return group.activePaths.some(p => location.pathname.startsWith(p));
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
  }, [location.pathname, navGroups]);

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

            {navGroups.map((group, idx) => {
              if (group.type === 'link') {
                return (
                  <NavLink
                    key={group.path}
                    to={group.path}
                    end
                    ref={(el) => (linksRef.current[idx] = el)}
                    onMouseEnter={(e) => handleLinkHover(e, idx)}
                    className={({ isActive }) =>
                      cn('header__nav-link', isActive && 'active')
                    }
                  >
                    <group.icon size={16} className="nav-icon" />
                    {group.label}
                  </NavLink>
                );
              }

              const isGroupActive = group.activePaths.some(p => location.pathname.startsWith(p));

              return (
                <div
                  key={group.label}
                  ref={(el) => (linksRef.current[idx] = el)}
                  onMouseEnter={(e) => handleLinkHover(e, idx)}
                  className={cn(
                    'header__nav-dropdown-group',
                    isGroupActive && 'active'
                  )}
                >
                  <button className="dropdown-trigger" type="button">
                    <span>{group.label}</span>
                    <ChevronDown size={14} className="dropdown-arrow-icon" />
                  </button>

                  <div className="header__nav-dropdown-menu glass-panel">
                    {group.items.map((item) => {
                      const isItemActive = location.pathname.startsWith(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={cn(
                            'header__nav-dropdown-item',
                            isItemActive && 'active'
                          )}
                        >
                          <item.icon size={14} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

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
                    className="header__user-pill" 
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
                    <span className="header__username-span" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {user.displayName ? user.displayName.split(' ')[0] : 'User'}
                      {currentUserProfile?.isVerified && (
                        <span title="Verified Thapar Student" style={{ display: 'inline-flex', marginLeft: '4px' }}>
                          <BadgeCheck size={14} fill="#1d9bf0" color="#fff" />
                        </span>
                      )}
                    </span>
                    <ChevronDown size={12} className="header__pill-arrow" />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="header__dropdown glass-panel">
                      <div className="header__dropdown-user-info">
                        <p className="header__dropdown-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                          {user.displayName}
                          {currentUserProfile?.isVerified && (
                            <span title="Verified Thapar Student" style={{ display: 'inline-flex' }}>
                              <BadgeCheck size={16} fill="#1d9bf0" color="#fff" />
                            </span>
                          )}
                        </p>
                        <p className="header__dropdown-email">{user.email}</p>
                      </div>
                      <div className="header__dropdown-divider" />
                      <button 
                        className="header__dropdown-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          setProfileModalOpen(true);
                        }}
                        type="button"
                      >
                        <User size={14} />
                        <span>My Profile</span>
                      </button>
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

      {/* Student Profile Modal */}
      {profileModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            padding: '28px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <button 
              onClick={() => setProfileModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <User size={22} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>Student Profile Info</h3>
            </div>

            {profileLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
                <Loader2 className="animate-spin" size={28} style={{ color: 'var(--color-primary)', marginBottom: '12px' }} />
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Loading profile details...</p>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'left' }}>Full Name</label>
                  <input 
                    type="text" 
                    value={studentProfile.name}
                    onChange={(e) => setStudentProfile({ ...studentProfile, name: e.target.value })}
                    required
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'left' }}>Roll Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 102203123"
                    value={studentProfile.rollNumber}
                    onChange={(e) => setStudentProfile({ ...studentProfile, rollNumber: e.target.value })}
                    required
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'left' }}>Branch</label>
                    <select 
                      value={studentProfile.branch}
                      onChange={(e) => setStudentProfile({ ...studentProfile, branch: e.target.value })}
                      style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="COE">COE (Computer Eng.)</option>
                      <option value="CSE">CSE (Computer Science)</option>
                      <option value="ENC">ENC (Electronics & Comm.)</option>
                      <option value="ELC">ELC (Electronics & Comp.)</option>
                      <option value="EE">EE (Electrical Eng.)</option>
                      <option value="ME">ME (Mechanical Eng.)</option>
                      <option value="CE">CE (Civil Eng.)</option>
                      <option value="CHE">CHE (Chemical Eng.)</option>
                      <option value="BIOT">BIOT (Biotechnology)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'left' }}>Study Year</label>
                    <select 
                      value={studentProfile.year}
                      onChange={(e) => setStudentProfile({ ...studentProfile, year: e.target.value })}
                      style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'left' }}>Group/Subgroup</label>
                    <input 
                      type="text" 
                      placeholder="e.g. CO12"
                      value={studentProfile.subgroup}
                      onChange={(e) => setStudentProfile({ ...studentProfile, subgroup: e.target.value })}
                      required
                      style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'left' }}>Phone (Optional)</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 9876543210"
                      value={studentProfile.phone}
                      onChange={(e) => setStudentProfile({ ...studentProfile, phone: e.target.value })}
                      style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* ID Card Photo Verification Section */}
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'left' }}>
                    Verify Student ID Card (Optional)
                  </label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleIdCardUpload}
                    style={{ display: 'none' }}
                    id="id-card-upload-file"
                  />
                  <label 
                    htmlFor="id-card-upload-file" 
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px dashed rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    <Upload size={16} />
                    {idFileName ? `Selected: ${idFileName}` : 'Upload Thapar ID Card Image'}
                  </label>

                  {idVerifying && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-primary)', marginTop: '4px' }}>
                      <Loader2 className="animate-spin" size={12} />
                      <span>AI Registrar Verifying ID Card details...</span>
                    </div>
                  )}

                  {idVerifyStatus && (
                    <div style={{
                      fontSize: '0.8rem',
                      color: idVerifyStatus.verified ? '#10b981' : '#f43f5e',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {idVerifyStatus.verified ? <CheckCircle size={12} fill="#10b981" color="#fff" /> : <AlertTriangle size={12} />}
                      <span>{idVerifyStatus.reason}</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button 
                    type="submit" 
                    disabled={profileSaving}
                    style={{
                      flex: 1,
                      background: 'var(--color-primary)',
                      color: '#fff',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {profileSaving ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Saving...
                      </>
                    ) : (
                      'Save Profile'
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setProfileModalOpen(false)}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'var(--color-text-secondary)',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
