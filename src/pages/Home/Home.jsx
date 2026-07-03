import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAnnouncements } from '../../utils/announcementsDb';
import {
  BookOpen,
  Calculator,
  Map,
  Upload,
  ArrowRight,
  Sparkles,
  Users,
  FileText,
  Download,
  TrendingUp,
  Bell,
  ChevronRight,
  GraduationCap,
  Compass,
  Search,
  Zap,
  Calendar,
  Terminal,
  Phone,
  LayoutGrid,
  X,
  ClipboardList,
  CalendarDays,
} from 'lucide-react';
import { db } from '../../utils/firebase';
import { collection, getCountFromServer, getDocs } from 'firebase/firestore';
import { getSystemConfig } from '../../utils/systemConfig';
import './Home.css';

/* ───────────────────────── Upcoming Features Data ───────────────────────── */
const upcomingFeatures = [
  {
    icon: Calendar,
    title: 'Timetable Generator',
    description: 'Generate your section-wise class schedule, add electives, and export a clean personal calendar.',
    type: 'timetable',
    status: 'UNDER DEVELOPMENT',
    statusText: 'Designing scheduling algorithms...',
    animationType: 'calendar',
  },
  {
    icon: Terminal,
    title: 'Project Showcase',
    description: 'Share your web apps, hardware, and designs, get student feedback, and find team members.',
    type: 'showcase',
    status: 'WORK IN PROGRESS',
    statusText: 'Configuring project servers...',
    animationType: 'terminal',
  },
  {
    icon: Phone,
    title: 'Amenities & Campus Guide',
    description: 'Quick directory of hostel contacts, food court menus, Jaggi timings, ATMs, and medical support.',
    type: 'amenities',
    status: 'UNDER CONSTRUCTION',
    statusText: 'Compiling campus directories...',
    animationType: 'radar',
  },
  {
    icon: CalendarDays,
    title: 'Live Events Calendar',
    description: 'Track upcoming hackathons, workshops, guest lectures, cultural festivals, and society recruitment schedules.',
    type: 'live-calendar',
    status: 'COMING SOON',
    statusText: 'Syncing college calendar data...',
    animationType: 'live-calendar',
  },
];

/* ───────────────────────── Animated Typing Hook ───────────────────────── */
const phrases = [
  'finding PYQs before exams',
  'calculating your SGPA',
  'navigating the campus',
  'sharing notes with batchmates',
  'tracking your CGPA journey',
  'discovering campus life',
];

function useTypingEffect() {
  const [display, setDisplay] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;

    if (!isDeleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 55);
    } else if (!isDeleting && charIdx === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 30);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setPhraseIdx((p) => (p + 1) % phrases.length);
    }

    setDisplay(current.substring(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx]);

  return display;
}

/* ───────────────────────── Animated Counter ───────────────────────── */
function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById(`counter-${target}-${suffix}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix, hasAnimated]);

  return (
    <span id={`counter-${target}-${suffix}`} className="stat-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ───────────────────────── Quick Access Cards Data ───────────────────────── */
const quickAccess = [
  {
    icon: BookOpen,
    title: 'Resources',
    description: 'PYQs, notes, books & lab manuals organized by branch and semester',
    path: '/resources',
    color: 'var(--color-accent)',
    bgColor: 'rgba(34, 211, 238, 0.08)',
  },
  {
    icon: Calculator,
    title: 'GPA Tools',
    description: 'Calculate SGPA, track CGPA, and plan your academic journey',
    path: '/gpa',
    color: 'var(--color-success)',
    bgColor: 'rgba(34, 197, 94, 0.08)',
  },
  {
    icon: Map,
    title: 'Campus Map',
    description: 'Interactive map with buildings, hostels, food joints & more',
    path: '/campus',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.08)',
  },
];

/* ───────────────────────── Feature Highlights ───────────────────────── */
const features = [
  {
    icon: Search,
    title: 'Instant Search',
    description: 'Find any resource across all branches in seconds',
  },
  {
    icon: Upload,
    title: 'Community Driven',
    description: 'Students contribute & share verified study material',
  },
  {
    icon: Zap,
    title: 'Zero Friction',
    description: 'Access everything without login. Contribute with your Thapar ID',
  },
  {
    icon: Sparkles,
    title: 'Quality First',
    description: 'Every upload is reviewed before going live. No junk.',
  },
];

/* ───────────────────────── Stats ───────────────────────── */
const DEFAULT_STATS = [
  { key: 'resources', value: 150, suffix: '+', label: 'Resources', icon: FileText },
  { key: 'students', value: 500, suffix: '+', label: 'Students', icon: Users },
  { key: 'subjects', value: 40, suffix: '+', label: 'Subjects', icon: GraduationCap },
  { key: 'downloads', value: 1000, suffix: '+', label: 'Downloads', icon: Download },
];

/* ───────────────────────── Card Animation Component ───────────────────────── */
function CardAnimation({ type }) {
  if (type === 'calendar') {
    return (
      <svg className="card-anim-svg anim-calendar" viewBox="0 0 100 100" width="64" height="64">
        <rect x="15" y="20" width="70" height="65" rx="8" fill="none" stroke="var(--color-text-secondary)" strokeWidth="3" />
        <line x1="15" y1="38" x2="85" y2="38" stroke="var(--color-border-strong)" strokeWidth="3" />
        <path d="M30,12 Q30,22 30,24" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M50,12 Q50,22 50,24" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M70,12 Q70,22 70,24" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="32" cy="50" r="4" className="cal-dot dot-1" fill="var(--color-accent)" />
        <circle cx="50" cy="50" r="4" className="cal-dot dot-2" fill="var(--color-accent-secondary)" />
        <circle cx="68" cy="50" r="4" className="cal-dot dot-3" fill="var(--color-accent)" />
        <circle cx="32" cy="68" r="4" className="cal-dot dot-4" fill="var(--color-accent-secondary)" />
        <circle cx="50" cy="68" r="4" className="cal-dot dot-5" fill="var(--color-accent)" />
        <circle cx="68" cy="68" r="4" className="cal-dot dot-6" fill="var(--color-accent-secondary)" />
      </svg>
    );
  }
  if (type === 'live-calendar') {
    return (
      <svg className="card-anim-svg anim-bell" viewBox="0 0 100 100" width="64" height="64">
        <path d="M25,45 A25,25 0 0,1 75,45" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" className="bell-wave bell-wave-1" />
        <path d="M15,45 A35,35 0 0,1 85,45" fill="none" stroke="var(--color-accent-secondary)" strokeWidth="2" strokeLinecap="round" className="bell-wave bell-wave-2" />
        <path d="M50,15 A16,16 0 0,1 66,31 L70,55 A4,4 0 0,0 74,59 L26,59 A4,4 0 0,0 30,55 L34,31 A16,16 0 0,1 50,15 Z" fill="none" stroke="var(--color-text-secondary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="bell-body-el" />
        <circle cx="50" cy="67" r="5" fill="var(--color-accent)" className="bell-clapper-el" />
      </svg>
    );
  }

  if (type === 'terminal') {
    return (
      <svg className="card-anim-svg anim-terminal" viewBox="0 0 100 100" width="64" height="64">
        <rect x="10" y="15" width="80" height="70" rx="6" fill="var(--color-bg-primary)" stroke="var(--color-border-strong)" strokeWidth="2" />
        <circle cx="20" cy="23" r="2.5" fill="#EF4444" />
        <circle cx="28" cy="23" r="2.5" fill="#F59E0B" />
        <circle cx="36" cy="23" r="2.5" fill="#10B981" />
        <line x1="20" y1="42" x2="35" y2="42" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" className="term-line-1" />
        <line x1="20" y1="54" x2="65" y2="54" stroke="var(--color-text-secondary)" strokeWidth="3" strokeLinecap="round" className="term-line-2" />
        <line x1="20" y1="66" x2="50" y2="66" stroke="var(--color-accent-secondary)" strokeWidth="3" strokeLinecap="round" className="term-line-3" />
        <rect x="55" y="62" width="6" height="8" fill="var(--color-text-primary)" className="term-cursor" />
      </svg>
    );
  }
  if (type === 'radar') {
    return (
      <svg className="card-anim-svg anim-radar" viewBox="0 0 100 100" width="64" height="64">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="var(--color-border)" strokeWidth="1" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="var(--color-border)" strokeWidth="0.8" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="var(--color-border)" strokeWidth="1" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="var(--color-border)" strokeWidth="1" />
        <line x1="50" y1="50" x2="50" y2="10" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" className="radar-sweep" />
        <circle cx="70" cy="35" r="3" fill="var(--color-accent-secondary)" className="radar-blip" />
      </svg>
    );
  }
  return null;
}

/* ───────────────────────── Main Component ───────────────────────── */
export default function Home() {
  const typedText = useTypingEffect();

  const [announcements, setAnnouncements] = useState([]);
  const [annLoading, setAnnLoading] = useState(true);
  const [dismissedAnnIds, setDismissedAnnIds] = useState([]);
  const [dismissingAnnIds, setDismissingAnnIds] = useState([]);

  const [stats, setStats] = useState(DEFAULT_STATS);

  const handleDismissAnnouncement = (id) => {
    setDismissingAnnIds((prev) => [...prev, id]);
    setTimeout(() => {
      setDismissedAnnIds((prev) => [...prev, id]);
      setDismissingAnnIds((prev) => prev.filter((item) => item !== id));
    }, 300);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
      } finally {
        setAnnLoading(false);
      }

      try {
        const systemConfig = await getSystemConfig();
        if (systemConfig.useRealtimeStats) {
          // A. Fetch total students count
          const studentsColl = collection(db, 'students');
          const studentsSnapshot = await getCountFromServer(studentsColl);
          const totalStudents = studentsSnapshot.data().count;

          // B. Fetch total resources count
          const resourcesColl = collection(db, 'resources');
          const resourcesSnapshot = await getCountFromServer(resourcesColl);
          const totalResources = resourcesSnapshot.data().count;

          // C. Fetch all PYQs to sum up downloads
          const pyqsColl = collection(db, 'pyqs');
          const pyqSnapshot = await getDocs(pyqsColl);
          let totalDownloads = 0;
          pyqSnapshot.forEach((docSnap) => {
            totalDownloads += docSnap.data().downloads || 0;
          });

          setStats([
            { key: 'resources', value: totalResources ?? 0, suffix: '+', label: 'Resources', icon: FileText },
            { key: 'students', value: totalStudents ?? 0, suffix: '+', label: 'Students', icon: Users },
            { key: 'subjects', value: 40, suffix: '+', label: 'Subjects', icon: GraduationCap },
            { key: 'downloads', value: totalDownloads ?? 0, suffix: '+', label: 'Downloads', icon: Download },
          ]);
        }
      } catch (err) {
        console.error('Failed to load system config or statistics:', err);
      }
    }
    fetchData();
  }, []);

  const urgentAnnouncements = useMemo(() => {
    return announcements.filter(ann => ann.important && !dismissedAnnIds.includes(ann.id));
  }, [announcements, dismissedAnnIds]);

  const latestAnnouncements = useMemo(() => {
    return announcements.slice(0, 3);
  }, [announcements]);

  return (
    <div className="home">
      {urgentAnnouncements.length > 0 && (
        <div className="urgent-banners-container">
          {urgentAnnouncements.map((ann) => (
            <div 
              key={ann.id} 
              className={`urgent-banner-ticker ${dismissingAnnIds.includes(ann.id) ? 'dismissing' : ''}`}
            >
              <div className="urgent-banner-content">
                <span className="urgent-pill">URGENT</span>
                <span className="urgent-text">{ann.title}</span>
                <Link to="/announcements" className="urgent-link">
                  Read Details <ChevronRight size={14} />
                </Link>
                <button 
                  type="button" 
                  onClick={() => handleDismissAnnouncement(ann.id)} 
                  className="urgent-dismiss-btn"
                  title="Dismiss alert"
                  aria-label="Dismiss alert"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="home-body-wrapper">
        {/* ━━━ Hero Section ━━━ */}
        <section className="hero">
        {/* Global 3D background handles constellation particle animations */}
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-badge">
            <Compass size={14} className="hero-badge-compass" />
            <span>YOUR COMPLETE CAMPUS COMPANION</span>
          </div>

          <h1 className="hero-title">
            Everything Thapar,<br />
            <span className="hero-title-dynamic-wrapper">
              <span className="hero-title-dynamic">{typedText}</span>
              <span className="typing-cursor">|</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            The student-built platform for navigating the campus
          </p>

          <div className="hero-actions-container">
            <div className="hero-actions">
              <Link to="/resources" className="hero-btn hero-btn-primary glass-panel">
                <LayoutGrid size={18} />
                Browse Resources
              </Link>
              <Link to="/gpa" className="hero-btn hero-btn-secondary glass-panel">
                <FileText size={18} />
                Calculate GPA
              </Link>
            </div>

            {/* Constellation Nodes Branching Diagram */}
            <div className="hero-constellation-nodes">
              <svg className="nodes-svg" viewBox="0 0 400 100" width="100%" height="80">
                <defs>
                  <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="line-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="line-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Left Branch */}
                <path d="M125,0 C125,25 140,35 145,60" fill="none" stroke="url(#line-gold-grad)" strokeWidth="1.2" />
                {/* Right Branch */}
                <path d="M275,0 C275,25 260,35 255,60" fill="none" stroke="url(#line-cyan-grad)" strokeWidth="1.2" />
                
                {/* Center Branch */}
                <path d="M125,0 C165,30 190,45 200,75" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3, 3" />
                <path d="M275,0 C235,30 210,45 200,75" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3, 3" />

                {/* Node stars */}
                <circle cx="145" cy="60" r="3.5" fill="#FBBF24" filter="url(#node-glow)" className="pulse-star-gold" />
                <circle cx="145" cy="60" r="1.5" fill="#FFFFFF" />

                <circle cx="255" cy="60" r="3.5" fill="#22D3EE" filter="url(#node-glow)" className="pulse-star-cyan" />
                <circle cx="255" cy="60" r="1.5" fill="#FFFFFF" />

                <circle cx="200" cy="75" r="4.5" fill="#FFFFFF" filter="url(#node-glow)" className="pulse-star-white" />
                <circle cx="200" cy="75" r="2" fill="#060505" />
              </svg>

              {/* Labels overlay */}
              <div className="node-label label-map-data">Map Data</div>
              <div className="node-label label-courses">Courses</div>
              <div className="node-label label-events">Events</div>
            </div>
          </div>

          <p className="hero-note">
            Explore freely &bull; Free forever &bull; Made with <span className="heart-icon">❤️</span> for TIET Students
          </p>
        </div>
      </section>

      {/* ━━━ Quick Access ━━━ */}
      <section className="section quick-access">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Jump right in</h2>
            <p className="section-subtitle">
              The tools you actually use, front and center.
            </p>
          </div>

          <div className="quick-grid">
            {quickAccess.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="quick-card"
              >
                <div
                  className="quick-card-icon"
                  style={{ color: item.color, backgroundColor: item.bgColor }}
                >
                  <item.icon size={24} />
                </div>
                <div className="quick-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ArrowRight size={18} className="quick-card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Features ━━━ */}
      <section className="section features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Built different
            </h2>
            <p className="section-subtitle">
              Not another college website. A platform designed for how students actually work.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">
                  <f.icon size={20} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Upcoming Features ━━━ */}
      <section className="section upcoming-features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <Sparkles size={22} className="section-title-icon" />
              Upcoming Expansion
            </h2>
            <p className="section-subtitle">
              We are expanding the student operating system. Hover over a module to inspect the blueprint and watch our development bot at work.
            </p>
          </div>

          <div className="upcoming-grid">
            {upcomingFeatures.map((item) => (
              <div key={item.title} className="upcoming-card">
                <div className="upcoming-card-inner">
                  {/* Front Face */}
                  <div className="upcoming-card-front">
                    <span className="upcoming-badge">Coming Soon</span>
                    <div className="upcoming-icon">
                      <item.icon size={24} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  {/* Back Face (Mockup page under construction) */}
                  <div className="upcoming-card-back">
                    {/* Wireframe Mockup */}
                    {item.type === 'timetable' && (
                      <div className="wireframe wireframe--timetable">
                        <div className="wf-header">
                          <div className="wf-bar small" />
                          <div className="wf-bar tiny" />
                        </div>
                        <div className="wf-grid">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className={`wf-cell ${i === 4 ? 'active' : ''}`} />
                          ))}
                        </div>
                      </div>
                    )}



                    {item.type === 'showcase' && (
                      <div className="wireframe wireframe--showcase">
                        <div className="wf-cards">
                          <div className="wf-card">
                            <div className="wf-card-img" />
                            <div className="wf-bar tiny" />
                          </div>
                          <div className="wf-card">
                            <div className="wf-card-img" />
                            <div className="wf-bar tiny" />
                          </div>
                        </div>
                      </div>
                    )}

                    {item.type === 'amenities' && (
                      <div className="wireframe wireframe--amenities">
                        <div className="wf-sidebar">
                          <div className="wf-bar tiny" />
                          <div className="wf-bar tiny" />
                          <div className="wf-bar tiny" />
                        </div>
                        <div className="wf-body">
                          <div className="wf-bar small" />
                          <div className="wf-bar medium" />
                        </div>
                      </div>
                    )}

                    {item.type === 'live-calendar' && (
                      <div className="wireframe wireframe--live-calendar">
                        <div className="wf-header">
                          <div className="wf-bar small" />
                          <div className="wf-bar tiny" />
                        </div>
                        <div className="wf-calendar-grid">
                          <div className="wf-cal-day wf-cal-day--active" />
                          <div className="wf-cal-day" />
                          <div className="wf-cal-day" />
                          <div className="wf-cal-day" />
                          <div className="wf-cal-day" />
                          <div className="wf-cal-day wf-cal-day--active" />
                          <div className="wf-cal-day" />
                          <div className="wf-cal-day" />
                        </div>
                      </div>
                    )}

                    {/* Glass construction overlay */}
                    <div className="construction-overlay glass-panel">
                      <CardAnimation type={item.animationType} />
                      
                      <span className="construction-badge">{item.status}</span>
                      <p className="construction-text">{item.statusText}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Stats ━━━ */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <s.icon size={20} className="stat-icon" />
                <AnimatedCounter target={s.value} suffix={s.suffix} />
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Contribute CTA ━━━ */}
      <section className="section contribute-section">
        <div className="container">
          <div className="contribute-card">
            <div className="contribute-content">
              <div className="contribute-badge">
                <TrendingUp size={14} />
                <span>Join the community</span>
              </div>
              <h2>Got notes? Share them.</h2>
              <p>
                Help fellow students by uploading your study materials. Sign in
                with your Thapar ID and contribute to the collective knowledge
                base.
              </p>
              <Link to="/contribute" className="hero-btn hero-btn-primary">
                <Upload size={18} />
                Start Contributing
              </Link>
            </div>
            <div className="contribute-visual" aria-hidden="true">
              <div className="contribute-float contribute-float-1">
                <FileText size={20} />
                <span>Data Structures Notes</span>
              </div>
              <div className="contribute-float contribute-float-2">
                <FileText size={20} />
                <span>Physics PYQ 2024</span>
              </div>
              <div className="contribute-float contribute-float-3">
                <FileText size={20} />
                <span>COA Lab Manual</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Announcements Preview ━━━ */}
      <section className="section announcements-section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-row">
              <h2 className="section-title">
                <Bell size={22} className="section-title-icon" />
                Announcements
              </h2>
              <Link to="/announcements" className="see-all-link">
                View all <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {annLoading ? (
            <div className="announcements-loading-preview">
              <div className="spinner-preview"></div>
              <p>Loading latest updates...</p>
            </div>
          ) : latestAnnouncements.length > 0 ? (
            <div className="announcements-grid-preview">
              {latestAnnouncements.map((ann) => (
                <div key={ann.id} className={`announcement-card-preview glass-panel ${ann.important ? 'important' : ''}`}>
                  <div className="card-preview-header">
                    <span className={`category-tag-preview ${ann.category}`}>
                      {ann.category.toUpperCase()}
                    </span>
                    <span className="date-tag-preview">{ann.date}</span>
                  </div>
                  <h3>{ann.title}</h3>
                  <p>{ann.content.length > 120 ? `${ann.content.substring(0, 120)}...` : ann.content}</p>
                  <Link to="/announcements" className="card-preview-link">
                    Read More <ChevronRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="announcements-empty">
              <Bell size={40} className="empty-icon" />
              <h3>All caught up!</h3>
              <p>No new announcements right now. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
      </div>
    </div>
  );
}
