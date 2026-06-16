import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <div className="not-found-icon">
          <Compass size={48} />
        </div>
        <h1>Lost on campus?</h1>
        <p>This page doesn't exist. But don't worry — we've all been there.</p>
        <Link to="/" className="not-found-btn">
          Take me home
        </Link>
      </div>
    </div>
  );
}
