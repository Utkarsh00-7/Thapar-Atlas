import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CosmicBackground from './CosmicBackground';
import './Layout.css';

export default function Layout({ theme, toggleTheme }) {
  return (
    <div className="layout">
      <CosmicBackground />
      <div className="mesh-gradient-bg" aria-hidden="true" />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
