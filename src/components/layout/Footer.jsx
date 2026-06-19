import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_NAV, ADMIN_EMAILS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import './Footer.css';

export default function Footer() {
  const { user } = useAuth();

  const displayedQuickLinks = useMemo(() => {
    const isAdmin = user && user.email && ADMIN_EMAILS.includes(user.email);
    return isAdmin
      ? [...FOOTER_NAV.quickLinks, { label: 'Admin Panel', path: '/admin' }]
      : FOOTER_NAV.quickLinks;
  }, [user]);
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Columns */}
        <div className="footer__grid">
          {/* Quick Links */}
          <div>
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__col-links">
              {displayedQuickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thapar Resources */}
          <div>
            <h4 className="footer__col-title">Thapar Resources</h4>
            <ul className="footer__col-links">
              {FOOTER_NAV.thaparResources.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Atlas */}
          <div>
            <h4 className="footer__col-title">About Atlas</h4>
            <p className="footer__about">
              Thapar Atlas is a student-built platform for TIET — your one-stop
              hub for resources, GPA tools, campus navigation, and everything
              you need to survive (and thrive) at Thapar.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Thapar Atlas. Made with
            <span className="footer__heart" aria-label="love">
              ♥
            </span>
            for TIET students.
          </p>
        </div>
      </div>
    </footer>
  );
}
