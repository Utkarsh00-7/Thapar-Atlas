import { useState, useMemo } from 'react';
import { 
  Search, 
  Globe, 
  Mail, 
  Users, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Trophy,
  Laptop,
  Music,
  Heart,
  BookOpen,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { societiesData } from '../../utils/societiesData';
import './Societies.css';

// Pre-define some popular societies as recruiting for interactive realism
const RECRUITING_IDS = [];

const CATEGORIES = [
  { id: 'Technical', label: 'Technical', icon: Laptop },
  { id: 'Cultural', label: 'Cultural', icon: Music },
  { id: 'Social', label: 'Social / Sports', icon: Heart },
  { id: 'Literary', label: 'Literary / Debate', icon: BookOpen },
  { id: 'Entrepreneurship', label: 'Entrepreneurship', icon: TrendingUp },
];

export default function Societies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Technical');
  const [onlyRecruiting, setOnlyRecruiting] = useState(false);
  const [expandedLeadership, setExpandedLeadership] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleLeadership = (id) => {
    setExpandedLeadership(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered and searched data
  const filteredSocieties = useMemo(() => {
    return societiesData.filter(org => {
      const title = org.title || "";
      const description = org.description || "";
      const type = org.type || "";
      
      const matchesSearch = 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        org.category === selectedCategory || 
        (selectedCategory === 'Social' && org.category === 'Sports');
      
      const isRecruiting = RECRUITING_IDS.includes(org.id);
      const matchesRecruiting = !onlyRecruiting || isRecruiting;

      return matchesSearch && matchesCategory && matchesRecruiting;
    });
  }, [searchQuery, selectedCategory, onlyRecruiting]);

  // Group societies inside the filtered list by their type
  const groupedSocieties = useMemo(() => {
    const groups = {
      society: { name: 'Student Societies', items: [] },
      chapter: { name: 'Student Chapters', items: [] },
      club: { name: 'Clubs, Cells & Units', items: [] }
    };

    filteredSocieties.forEach(org => {
      const type = org.type || 'society';
      if (type === 'society') {
        groups.society.items.push(org);
      } else if (type === 'chapter') {
        groups.chapter.items.push(org);
      } else {
        // club, cell, units, etc.
        groups.club.items.push(org);
      }
    });

    // Return only non-empty groups to keep UI clean
    return Object.values(groups).filter(g => g.items.length > 0);
  }, [filteredSocieties]);

  // Helper to check if a society is currently recruiting
  const isSocietyRecruiting = (id) => RECRUITING_IDS.includes(id);

  // Helper for generating abbreviation letters when logo image fails
  const getAbbreviation = (title) => {
    if (!title) return '';
    const cleanTitle = title.trim();
    // If abbreviation exists in parenthesis, extract it
    const parenMatch = cleanTitle.match(/\(([^)]+)\)/);
    if (parenMatch) return parenMatch[1];
    
    // Otherwise extract initials
    return cleanTitle
      .split(/\s+/) // split by any whitespace to handle consecutive spaces
      .filter(w => w && w[0] && w[0] === w[0].toUpperCase())
      .map(w => w[0])
      .slice(0, 3)
      .join('');
  };

  // Unique colors for categories
  const getCategoryColorClass = (category) => {
    switch (category) {
      case 'Technical': return 'cat-tech';
      case 'Cultural': return 'cat-cultural';
      case 'Literary': return 'cat-literary';
      case 'Entrepreneurship': return 'cat-ent';
      case 'Sports': return 'cat-sports';
      default: return 'cat-social';
    }
  };

  return (
    <div className="societies-page">
      <div className="societies-container">
        
        {/* Page Header */}
        <div className="societies-header">
          <div className="societies-title-wrap">
            <Sparkles className="societies-sparkles-icon animate-pulse" size={32} />
            <h1>Student Societies & Clubs</h1>
          </div>
          <p>
            Explore the rich student-led ecosystem of Thapar Institute of Engineering and Technology. 
            Connect with technical chapters, cultural groups, and social initiatives to shape your campus experience.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="societies-filters glass-panel">
          <div className="search-box">
            <Search className="search-box-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, description or acronym..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="recruiting-toggle-wrapper">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={onlyRecruiting} 
                onChange={(e) => setOnlyRecruiting(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
            <span className="recruiting-label">Show Open Recruitments Only</span>
          </div>
        </div>

        {/* Category Pills Selector */}
        <div className="category-pills">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Listing Grid */}
        {groupedSocieties.length > 0 ? (
          <div className="societies-grouped-container">
            {groupedSocieties.map(group => (
              <div key={group.name} className="society-group-section">
                <div className="group-header-badge">
                  <h2>{group.name}</h2>
                  <span className="group-count-tag">{group.items.length} {group.items.length === 1 ? 'organization' : 'organizations'}</span>
                </div>
                <div className="societies-grid">
                  {group.items.map(org => {
                    const showAllDesc = expandedDescriptions[org.id];
                    const showLeadership = expandedLeadership[org.id];
                    const isRecruiting = isSocietyRecruiting(org.id);
                    
                    // Truncate description if too long
                    const shouldTruncate = org.description.length > 180;
                    const displayDesc = shouldTruncate && !showAllDesc 
                      ? `${org.description.slice(0, 180)}...`
                      : org.description;

                    return (
                      <div key={org.id} className={`society-card glass-panel ${getCategoryColorClass(org.category)}`}>
                        
                        {/* Card Badge / Banner */}
                        <div className="society-card-header">
                          <div className="society-logo-wrapper">
                            {org.image ? (
                              <img 
                                src={org.image} 
                                alt={`${org.title} Logo`}
                                onError={(e) => {
                                  // If load fails, fall back to letters
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className="society-logo-fallback" 
                              style={{ display: org.image ? 'none' : 'flex' }}
                            >
                              {getAbbreviation(org.title)}
                            </div>
                          </div>

                          <div className="society-meta-info">
                            <span className={`org-type-badge ${getCategoryColorClass(org.category)}`}>
                              {org.category}
                            </span>
                            {isRecruiting && (
                              <span className="recruitment-open-badge animate-pulse">
                                Recruiting
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Body Content */}
                        <div className="society-card-body">
                          <h3 className="society-title">{org.title}</h3>
                          <p className="society-description">
                            {displayDesc}
                            {shouldTruncate && (
                              <button 
                                className="read-more-btn"
                                onClick={() => toggleDescription(org.id)}
                              >
                                {showAllDesc ? 'Show Less' : 'Read More'}
                              </button>
                            )}
                          </p>
                        </div>

                        {/* Expandable Faculty Leadership */}
                        {(org.presidents.length > 0 || org.vicePresidents.length > 0) && (
                          <div className="society-leadership-section">
                            <button 
                              className="leadership-toggle-btn"
                              onClick={() => toggleLeadership(org.id)}
                            >
                              <span>Faculty Coordinators</span>
                              {showLeadership ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showLeadership && (
                              <div className="leadership-content fade-in">
                                {org.presidents.map((pres, idx) => (
                                  <div key={`pres-${idx}`} className="leader-info">
                                    {pres.image && (
                                      <img src={pres.image} alt={pres.name} className="leader-avatar" />
                                    )}
                                    <div className="leader-details">
                                      <span className="leader-name">{pres.name}</span>
                                      <span className="leader-role">President • {pres.dept || 'TIET'}</span>
                                      {pres.email && (
                                        <a href={`mailto:${pres.email}`} className="leader-email">
                                          <Mail size={12} /> {pres.email}
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                {org.vicePresidents.map((vp, idx) => (
                                  <div key={`vp-${idx}`} className="leader-info">
                                    {vp.image && (
                                      <img src={vp.image} alt={vp.name} className="leader-avatar" />
                                    )}
                                    <div className="leader-details">
                                      <span className="leader-name">{vp.name}</span>
                                      <span className="leader-role">Vice President • {vp.dept || 'TIET'}</span>
                                      {vp.email && (
                                        <a href={`mailto:${vp.email}`} className="leader-email">
                                          <Mail size={12} /> {vp.email}
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Actions / Links Footer */}
                        <div className="society-card-footer">
                          {org.website ? (
                            <a 
                              href={org.website.startsWith('http') ? org.website : `https://${org.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="soc-btn btn-primary"
                            >
                              <Globe size={14} />
                              <span>Website</span>
                              <ExternalLink size={10} />
                            </a>
                          ) : (
                            <div className="soc-btn btn-disabled">
                              <Globe size={14} />
                              <span>No Site Available</span>
                            </div>
                          )}

                          {org.email ? (
                            <a href={`mailto:${org.email}`} className="soc-btn btn-secondary">
                              <Mail size={14} />
                              <span>Contact Email</span>
                            </a>
                          ) : null}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-societies-state glass-panel">
            <AlertCircle size={40} className="no-soc-icon" />
            <h3>No Societies Found</h3>
            <p>We couldn't find any organizations matching your filters. Try clearing your search query or enabling other categories.</p>
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Technical');
                setOnlyRecruiting(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
