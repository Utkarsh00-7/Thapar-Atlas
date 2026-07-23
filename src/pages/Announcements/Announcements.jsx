import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  AlertTriangle,
  Shield,
  Tag,
} from 'lucide-react';
import { getAnnouncements } from '../../utils/announcementsDb';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_EMAILS } from '../../utils/constants';
import './Announcements.css';

export default function Announcements() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error('Failed to load announcements:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const isAdmin = user && user.email && ADMIN_EMAILS.some(e => e.toLowerCase() === user.email.toLowerCase());

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'academic', label: 'Academic' },
    { id: 'society', label: 'Societies' },
    { id: 'event', label: 'Events' },
    { id: 'placement', label: 'Placements' },
    { id: 'general', label: 'General' },
  ];

  // Filtering logic
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((ann) => {
      const matchesCategory =
        selectedCategory === 'all' || ann.category === selectedCategory;
      const matchesSearch =
        ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ann.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [announcements, selectedCategory, searchQuery]);

  return (
    <div className="announcements-page">
      <div className="announcements-container">
        
        {/* Header Section */}
        <div className="announcements-header">
          <div className="header-title-row">
            <div className="header-title">
              <Bell className="announcements-bell-icon" size={28} />
              <h1>Campus Announcements</h1>
            </div>
            {isAdmin && (
              <Link to="/admin" className="btn-cosmic btn-glow admin-manage-btn">
                <Shield size={16} />
                <span>Manage Announcements</span>
              </Link>
            )}
          </div>
          <p className="header-desc">
            Stay up to date with the latest official circulars, exam schedules, recruitments, and campus events.
          </p>
        </div>

        {/* Toolbar: Search and Filter */}
        <div className="announcements-toolbar glass-panel">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-filters">
            <Filter size={14} className="filter-icon" />
            <div className="filter-scroll">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-pill ${
                    selectedCategory === cat.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feed List */}
        {loading ? (
          <div className="announcements-loading">
            <div className="spinner"></div>
            <p>Fetching campus feed...</p>
          </div>
        ) : filteredAnnouncements.length > 0 ? (
          <div className="announcements-feed">
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className={`announcement-card glass-panel ${
                  ann.important ? 'important' : ''
                }`}
              >
                <div className="card-header">
                  <span className={`category-tag ${ann.category}`}>
                    <Tag size={12} />
                    {ann.category.toUpperCase()}
                  </span>
                  <span className="date-tag">
                    <Calendar size={12} />
                    {ann.date}
                  </span>
                  {ann.important && (
                    <div className="urgent-badge">
                      <AlertTriangle size={12} />
                      <span>URGENT</span>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <h2 className="ann-title">{ann.title}</h2>
                  <p className="ann-content">{ann.content}</p>
                </div>

                {ann.link && (
                  <div className="card-footer">
                    <a
                      href={ann.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-circular"
                    >
                      <span>View Official Circular</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="announcements-empty glass-panel">
            <Bell size={48} className="empty-bell" />
            <h2>No announcements found</h2>
            <p>We couldn't find any announcements matching your search query or selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
