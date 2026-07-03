import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  X, 
  LogIn, 
  LogOut, 
  Loader2, 
  ShieldCheck, 
  MessageSquare,
  ChevronDown,
  Home,
  FolderOpen,
  FileText,
  ClipboardList,
  Search,
  Wifi,
  Sparkles,
  Calculator,
  MapPin,
  Upload
} from 'lucide-react';
import { NAV_ITEMS, ADMIN_EMAILS } from '../../utils/constants';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import './MobileNav.css';

export default function MobileNav({ isOpen, onClose, theme, toggleTheme }) {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const isDark = theme === 'dark';
  const location = useLocation();

  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  // Reset collapsible accordions to closed when drawer is opened or closed
  useEffect(() => {
    if (!isOpen) {
      setAcademicsOpen(false);
      setToolsOpen(false);
    }
  }, [isOpen]);

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
          {navGroups.map((group) => {
            if (group.type === 'link') {
              return (
                <NavLink
                  key={group.path}
                  to={group.path}
                  end
                  className={({ isActive }) =>
                    cn('mobile-nav__link', isActive && 'active')
                  }
                  onClick={onClose}
                >
                  <group.icon size={20} />
                  {group.label}
                </NavLink>
              );
            }

            const isGroupOpen = group.label === 'Academics' ? academicsOpen : toolsOpen;
            const setGroupOpen = group.label === 'Academics' ? setAcademicsOpen : setToolsOpen;
            const isGroupActive = group.activePaths.some(p => location.pathname.startsWith(p));

            return (
              <div 
                key={group.label} 
                className={cn(
                  'mobile-nav__group',
                  isGroupActive && 'mobile-nav__group--active',
                  isGroupOpen && 'mobile-nav__group--open'
                )}
              >
                <button
                  type="button"
                  className="mobile-nav__group-trigger"
                  onClick={() => setGroupOpen(!isGroupOpen)}
                >
                  <span className="mobile-nav__group-title">{group.label}</span>
                  <ChevronDown className="mobile-nav__group-arrow" size={20} />
                </button>

                <div className={cn("mobile-nav__group-items", isGroupOpen && "open")}>
                  {group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        cn('mobile-nav__group-item', isActive && 'active')
                      }
                      onClick={onClose}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
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
