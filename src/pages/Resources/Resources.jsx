import { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  FileText,
  ClipboardList,
  CheckSquare,
  FlaskConical,
  Video,
  GraduationCap,
  Download,
  User,
  Calendar,
  HardDrive,
  FolderOpen,
  Layers,
  GitBranch,
  Rocket,
  Award,
  Clock,
  ExternalLink,
  Search,
  X,
  HelpCircle,
} from 'lucide-react';
import { resourceTypes } from '../../utils/resourcesData';
import { getAcademicData } from '../../utils/resourceDb';
import { getDownloadLink } from '../../utils/helpers';
import { useLocation } from 'react-router-dom';
import './Resources.css';

/* ─── Icon maps ─── */
const yearIcons = { Layers, GitBranch, Rocket, Award };
const typeIcons = {
  syllabus: FileText,
  notes: FileText,
  pyq: ClipboardList,
  'pyq-answer': CheckSquare,
  book: BookOpen,
  'lab-manual': FlaskConical,
  youtube: Video,
  tutorial: GraduationCap,
};

/* ═══════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════ */
export default function Resources() {
  const [academicData, setAcademicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('syllabus');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAcademicData();
        setAcademicData(data);

        // Preselect year/branch/subject if passed from routing state
        if (location.state) {
          const { yearId, branchId, subjectId } = location.state;
          if (yearId) {
            const yearObj = data.find((y) => y.id === yearId);
            if (yearObj) {
              setSelectedYear(yearObj);
              if (branchId) {
                const branchObj = yearObj.branches.find((b) => b.id === branchId);
                if (branchObj) {
                  setSelectedBranch(branchObj);
                  if (subjectId) {
                    const subjectObj = branchObj.subjects.find((s) => s.id === subjectId);
                    if (subjectObj) {
                      setSelectedSubject(subjectObj);
                      if (location.state.activeTab) {
                        setActiveTab(location.state.activeTab);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load resources: ', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [location.state]);

  // Flat list of subjects for global searching
  const allSubjects = useMemo(() => {
    const list = [];
    academicData.forEach(year => {
      if (year.branches) {
        year.branches.forEach(branch => {
          if (branch.subjects) {
            branch.subjects.forEach(subject => {
              list.push({
                ...subject,
                year,
                branch
              });
            });
          }
        });
      }
    });
    return list;
  }, [academicData]);

  // Flat list of all resources for global searching
  const allResources = useMemo(() => {
    const list = [];
    allSubjects.forEach(subject => {
      if (subject.resources) {
        Object.entries(subject.resources).forEach(([typeId, files]) => {
          if (Array.isArray(files)) {
            files.forEach(file => {
              list.push({
                ...file,
                typeId,
                subject,
                year: subject.year,
                branch: subject.branch
              });
            });
          }
        });
      }
    });
    return list;
  }, [allSubjects]);

  const matchingSubjects = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allSubjects.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  }, [allSubjects, searchQuery]);

  const matchingResources = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allResources.filter(r =>
      r.title.toLowerCase().includes(q) ||
      (r.uploadedBy && r.uploadedBy.toLowerCase().includes(q))
    );
  }, [allResources, searchQuery]);

  const handleSelectMatchingSubject = (subject) => {
    setSelectedYear(subject.year);
    setSelectedBranch(subject.branch);
    setSelectedSubject(subject);
    setSearchQuery('');
  };

  /* Scroll to top on each navigation step */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedYear, selectedBranch, selectedSubject]);

  /* Reset active tab when subject changes */
  useEffect(() => {
    setActiveTab('syllabus');
  }, [selectedSubject]);

  /* ─── Navigation handlers ─── */
  const goToYear = (year) => {
    setSelectedYear(year);
    setSelectedBranch(null);
    setSelectedSubject(null);
  };

  const goToBranch = (branch) => {
    if (branch.comingSoon) return;
    setSelectedBranch(branch);
    setSelectedSubject(null);
  };

  const goToSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const goBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
    } else if (selectedBranch) {
      setSelectedBranch(null);
    } else if (selectedYear) {
      setSelectedYear(null);
    }
  };

  const goHome = () => {
    setSelectedYear(null);
    setSelectedBranch(null);
    setSelectedSubject(null);
  };

  /* ─── Compute current resources for active tab ─── */
  const currentResources = selectedSubject?.resources?.[activeTab] || [];

  /* ─── Render helpers ─── */

  /* Breadcrumb */
  const renderBreadcrumb = () => {
    if (!selectedYear) return null;

    return (
      <nav className="resources-breadcrumb" aria-label="Breadcrumb">
        <button className="breadcrumb-item" onClick={goHome}>
          <BookOpen size={16} />
          Resources
        </button>

        {selectedYear && (
          <>
            <ChevronRight size={16} className="breadcrumb-sep" />
            <button
              className={`breadcrumb-item ${!selectedBranch ? 'active' : ''}`}
              onClick={() => {
                setSelectedBranch(null);
                setSelectedSubject(null);
              }}
            >
              {selectedYear.label}
            </button>
          </>
        )}

        {selectedBranch && (
          <>
            <ChevronRight size={16} className="breadcrumb-sep" />
            <button
              className={`breadcrumb-item ${!selectedSubject ? 'active' : ''}`}
              onClick={() => setSelectedSubject(null)}
            >
              {selectedBranch.name}
            </button>
          </>
        )}

        {selectedSubject && (
          <>
            <ChevronRight size={16} className="breadcrumb-sep" />
            <span className="breadcrumb-item active">{selectedSubject.name}</span>
          </>
        )}
      </nav>
    );
  };

  /* Step 1: Year Selection */
  const renderYears = () => {
    if (loading) {
      return (
        <div className="resources-loading-container">
          <div className="resources-loading-spinner"></div>
          <p>Connecting to cosmic archives...</p>
        </div>
      );
    }

    return (
      <div className="year-grid">
        {academicData.map((year) => {
          const YearIcon = yearIcons[year.icon] || Layers;
          return (
            <div
              key={year.id}
              className="year-card"
              onClick={() => goToYear(year)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goToYear(year)}
            >
              <div className="year-card-icon">
                <YearIcon size={20} />
              </div>
              <div className="year-card-number">{year.id}</div>
              <div className="year-card-label">{year.label}</div>
              <div className="year-card-tagline">{year.tagline}</div>
            </div>
          );
        })}
      </div>
    );
  };

  /* Step 2: Branch/Pool Selection */
  const renderBranches = () => (
    <>
      <button className="res-back-btn" onClick={goBack}>
        <ArrowLeft size={16} />
        Back
      </button>
      <h2 className="res-section-title">
        <FolderOpen size={22} className="section-icon" />
        {selectedYear.id === 1 ? 'Select Your Pool' : 'Select Your Branch'}
      </h2>
      <div className="branch-grid">
        {selectedYear.branches.map((branch) => (
          <div
            key={branch.id}
            className={`branch-card ${branch.comingSoon ? 'coming-soon' : ''}`}
            onClick={() => goToBranch(branch)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && goToBranch(branch)}
          >
            <div className="branch-card-abbr">{branch.abbr}</div>
            <div className="branch-card-info">
              <div className="branch-card-name">{branch.name}</div>
              <div className="branch-card-count">
                {branch.comingSoon
                  ? 'Coming soon'
                  : `${branch.subjects.length} subject${branch.subjects.length !== 1 ? 's' : ''}`}
              </div>
            </div>
            {!branch.comingSoon && (
              <ArrowRight size={16} className="branch-card-arrow" />
            )}

            {/* Coming Soon Overlay */}
            {branch.comingSoon && (
              <div className="coming-soon-overlay">
                <span className="coming-soon-badge">
                  <Clock size={12} />
                  Coming Soon
                </span>
                <span className="coming-soon-text">Content is being curated</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  /* Step 3: Subject Selection */
  const renderSubjects = () => (
    <>
      <button className="res-back-btn" onClick={goBack}>
        <ArrowLeft size={16} />
        Back
      </button>
      <h2 className="res-section-title">
        <BookOpen size={22} className="section-icon" />
        {selectedBranch.name} — Subjects
      </h2>
      <div className="subject-grid">
        {selectedBranch.subjects.map((subject) => (
          <div
            key={subject.id}
            className="subject-card"
            onClick={() => goToSubject(subject)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && goToSubject(subject)}
          >
            <div className="subject-icon-wrap">
              <FileText size={18} />
            </div>
            <div className="subject-card-info">
              <div className="subject-card-name">{subject.name}</div>
              <div className="subject-card-meta">
                {Object.values(subject.resources || {}).reduce(
                  (sum, arr) => sum + arr.length,
                  0
                )}{' '}
                resources available
              </div>
            </div>
            <ArrowRight size={16} className="subject-card-arrow" />
          </div>
        ))}
      </div>
    </>
  );

  /* Step 4: Resource Tabs + File Listings */
  const renderResources = () => (
    <div className="resource-tabs-container">
      <button className="res-back-btn" onClick={goBack}>
        <ArrowLeft size={16} />
        Back
      </button>
      <h2 className="res-section-title">
        <BookOpen size={22} className="section-icon" />
        {selectedSubject.name}
      </h2>

      {/* Tab Bar */}
      <div className="resource-tabs" role="tablist">
        {resourceTypes.map((type) => {
          const count = selectedSubject.resources?.[type.id]?.length || 0;
          return (
            <button
              key={type.id}
              className={`resource-tab ${activeTab === type.id ? 'active' : ''}`}
              onClick={() => setActiveTab(type.id)}
              role="tab"
              aria-selected={activeTab === type.id}
            >
              {type.label}
              <span className="resource-tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* File Listings */}
      {currentResources.length > 0 ? (
        <div className="resource-list">
          {currentResources.map((file) => {
            const TypeIcon = typeIcons[activeTab] || FileText;
            return (
              <div key={file.id} className="resource-file">
                <div className="resource-file-icon">
                  <TypeIcon size={18} />
                </div>
                <div className="resource-file-info">
                  <div className="resource-file-title">{file.title}</div>
                  <div className="resource-file-meta">
                    <span>
                      <Calendar size={12} />
                      {new Date(file.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>
                      <HardDrive size={12} />
                      {file.size}
                    </span>
                    {file.downloads > 0 && (
                      <span>
                        <Download size={12} />
                        {file.downloads}
                      </span>
                    )}
                  </div>
                </div>
                {file.isDirectUpload ? (
                  <a
                    href={getDownloadLink(file.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-download-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    <ExternalLink size={14} />
                    Open
                  </a>
                ) : (
                  <a
                    href={getDownloadLink(file.link || '#')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-download-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    {file.isLink ? (
                      <>
                        <ExternalLink size={14} />
                        Open
                      </>
                    ) : (
                      <>
                        <Download size={14} />
                        Download
                      </>
                    )}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="resource-empty">
          <FolderOpen size={40} className="resource-empty-icon" />
          <h3>No resources yet</h3>
          <p>
            Be the first to contribute! Upload your{' '}
            {resourceTypes.find((t) => t.id === activeTab)?.label.toLowerCase() || 'resources'}{' '}
            for this subject.
          </p>
        </div>
      )}
    </div>
  );

  /* ─── Main Render ─── */
  return (
    <div className="resources-page">
      <div className="resources-container">
        {/* Page Header */}
        <div className="resources-header">
          <h1>Resource Hub</h1>
          <p>
            {!selectedYear
              ? 'PYQs, notes, books & lab manuals — organized by year and branch.'
              : selectedSubject
              ? `Browse study materials for ${selectedSubject.name}`
              : selectedBranch
              ? `Select a subject from ${selectedBranch.name}`
              : `Select your ${selectedYear.id === 1 ? 'pool' : 'branch'}`}
          </p>
        </div>

        {/* Search Bar */}
        <div className="resources-search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="resources-search-input"
            placeholder="Search subjects or materials (e.g. Calculus, Notes, UEE)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Results or step-by-step navigation */}
        {searchQuery ? (
          <div className="search-results-view">
            {matchingSubjects.length === 0 && matchingResources.length === 0 ? (
              <div className="search-empty-state">
                <HelpCircle size={40} className="empty-icon" />
                <h3>No matches found</h3>
                <p>Try searching for different keywords like "Calculus", "DSA", or "Notes".</p>
              </div>
            ) : (
              <>
                {/* Matching Subjects */}
                {matchingSubjects.length > 0 && (
                  <div className="search-section">
                    <h3 className="search-section-title">Matching Subjects</h3>
                    <div className="subject-grid">
                      {matchingSubjects.map(subject => (
                        <div
                          key={subject.id}
                          className="subject-card"
                          onClick={() => handleSelectMatchingSubject(subject)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && handleSelectMatchingSubject(subject)}
                        >
                          <div className="subject-icon-wrap">
                            <FileText size={18} />
                          </div>
                          <div className="subject-card-info">
                            <div className="subject-card-name">{subject.name}</div>
                            <div className="subject-card-meta">
                              {subject.year.label} • {subject.branch.name}
                            </div>
                          </div>
                          <ArrowRight size={16} className="subject-card-arrow" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matching Resources */}
                {matchingResources.length > 0 && (
                  <div className="search-section" style={{ marginTop: '32px' }}>
                    <h3 className="search-section-title">Matching Study Materials</h3>
                    <div className="resource-list">
                      {matchingResources.map(file => {
                        const TypeIcon = typeIcons[file.typeId] || FileText;
                        return (
                          <div key={file.id} className="resource-file">
                            <div className="resource-file-icon">
                              <TypeIcon size={18} />
                            </div>
                            <div className="resource-file-info">
                              <div className="resource-file-title">{file.title}</div>
                              <div className="resource-file-meta">
                                <span>{file.subject.name} • {resourceTypes.find(t => t.id === file.typeId)?.label}</span>
                                <span>{file.size}</span>
                              </div>
                            </div>
                            {file.isDirectUpload ? (
                              <a
                                href={getDownloadLink(file.link)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resource-download-btn"
                                style={{ textDecoration: 'none' }}
                              >
                                <ExternalLink size={14} />
                                Open
                              </a>
                            ) : (
                              <a
                                href={getDownloadLink(file.link || '#')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resource-download-btn"
                                style={{ textDecoration: 'none' }}
                              >
                                {file.isLink ? (
                                  <>
                                    <ExternalLink size={14} />
                                    Open
                                  </>
                                ) : (
                                  <>
                                    <Download size={14} />
                                    Download
                                  </>
                                )}
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <>
            {/* Breadcrumb */}
            {renderBreadcrumb()}

            {/* Step-by-step content */}
            {!selectedYear && renderYears()}
            {selectedYear && !selectedBranch && renderBranches()}
            {selectedBranch && !selectedSubject && renderSubjects()}
            {selectedSubject && renderResources()}
          </>
        )}
      </div>
    </div>
  );
}
