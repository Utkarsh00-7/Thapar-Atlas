import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  Download,
  BookOpen,
  Calendar,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  X,
  FileCheck,
} from 'lucide-react';
import { getPyqData, incrementPyqDownloads } from '../../utils/pyqDb';
import { getDownloadLink } from '../../utils/helpers';
import './Pyqs.css';

export default function Pyqs() {
  const location = useLocation();

  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draftCcode, setDraftCcode] = useState('');
  const [draftCname, setDraftCname] = useState('');
  const [draftYear, setDraftYear] = useState('1'); // '1', '2', '3', '4'
  const [draftExamType, setDraftExamType] = useState('all'); // 'all', 'MST', 'EST', 'AUX'
  const [draftPaperYear, setDraftPaperYear] = useState('all'); // 'all', '2024', etc.

  const [activeCcode, setActiveCcode] = useState('');
  const [activeCname, setActiveCname] = useState('');
  const [activeYear, setActiveYear] = useState('1');
  const [activeExamType, setActiveExamType] = useState('all');
  const [activePaperYear, setActivePaperYear] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);
  const [downloadToast, setDownloadToast] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPyqData();
        setPyqs(data);

        // Prepopulate filter state from router state if redirecting from Syllabus Tracker
        if (location.state) {
          let stateFound = false;
          if (location.state.searchQuery) {
            const query = location.state.searchQuery;
            if (/^[A-Z]{3,4}\d{3}$/i.test(query)) {
              setDraftCcode(query);
              setActiveCcode(query);
            } else {
              setDraftCname(query);
              setActiveCname(query);
            }
            stateFound = true;
          }
          if (location.state.selectedYear) {
            const y = String(location.state.selectedYear);
            setDraftYear(y);
            setActiveYear(y);
            stateFound = true;
          }
          if (stateFound) {
            setHasSearched(true);
          }
        }
      } catch (err) {
        console.error('Failed to load PYQs: ', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [location.state]);

  // Generate unique paper years for filter dropdown
  const paperYears = useMemo(() => {
    const years = pyqs
      .map(p => p.paperYear)
      .filter(y => y && /^\d{4}$/.test(String(y)));
    return ['all', ...new Set(years)].sort((a, b) => b.localeCompare(a));
  }, [pyqs]);

  // Base filtered list (ignores exam type filter for stats calculation)
  const baseFiltered = useMemo(() => {
    return pyqs.filter(paper => {
      const matchesCcode = !activeCcode || paper.subjectCode.toLowerCase().includes(activeCcode.toLowerCase());
      const matchesCname = !activeCname || paper.subjectName.toLowerCase().includes(activeCname.toLowerCase());
      const matchesYear = activeYear === 'all' || paper.studyYear === Number(activeYear);
      const matchesPaperYear = activePaperYear === 'all' || paper.paperYear === activePaperYear;
      return matchesCcode && matchesCname && matchesYear && matchesPaperYear;
    });
  }, [pyqs, activeCcode, activeCname, activeYear, activePaperYear]);

  // Filter logic (applies exam type filter as well)
  const filteredPapers = useMemo(() => {
    return baseFiltered.filter(paper => {
      return activeExamType === 'all' || paper.examType === activeExamType;
    });
  }, [baseFiltered, activeExamType]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredPapers.length;
    const msts = baseFiltered.filter(p => p.examType === 'MST' || p.examType === 'SUMMER (MST)').length;
    const ests = baseFiltered.filter(p => p.examType === 'EST' || p.examType === 'SUMMER (EST)').length;
    const auxs = baseFiltered.filter(p => p.examType === 'AUX').length;
    return { total, msts, ests, auxs };
  }, [filteredPapers, baseFiltered]);

  const handleDownload = (id, subjectCode, examType, isAnswerKey = false) => {
    const paperObj = pyqs.find(p => p.id === id);

    // Simulate download count increment
    setPyqs(prev => {
      const updated = prev.map(p =>
        p.id === id ? { ...p, downloads: (p.downloads || 0) + 1 } : p
      );
      localStorage.setItem('thapar_atlas_pyqs', JSON.stringify(updated));
      return updated;
    });

    // Record the download count in Firestore database
    incrementPyqDownloads(id);

    // Handle real direct file downloads vs opening external links
    if (paperObj) {
      const fileUrl = isAnswerKey ? paperObj.answerUrl : paperObj.fileUrl;
      if (fileUrl && fileUrl !== '#') {
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
      }
    }

    // Show custom toast notification
    const typeLabel = isAnswerKey ? 'Answer Key' : 'Question Paper';
    setDownloadToast({
      message: `Downloading ${subjectCode} ${examType} ${typeLabel}...`,
      id: Date.now()
    });

    // Clear toast after 3 seconds
    setTimeout(() => {
      setDownloadToast(null);
    }, 3000);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setActiveCcode(draftCcode);
    setActiveCname(draftCname);
    setActiveYear(draftYear);
    setActiveExamType(draftExamType);
    setActivePaperYear(draftPaperYear);
    setHasSearched(true);
  };

  const handleResetFilters = () => {
    setDraftCcode('');
    setDraftCname('');
    setDraftYear('1');
    setDraftExamType('all');
    setDraftPaperYear('all');

    setActiveCcode('');
    setActiveCname('');
    setActiveYear('1');
    setActiveExamType('all');
    setActivePaperYear('all');
    setHasSearched(false);
  };

  return (
    <div className="pyq-hub-container">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="pyq-toast-wrapper">
          <div className="pyq-toast">
            <CheckCircle className="toast-icon text-success" />
            <span>{downloadToast.message}</span>
          </div>
        </div>
      )}

      {/* Header section with cosmic glow */}
      <header className="pyq-header">
        <div className="header-glow"></div>
        <div className="header-content">
          <div className="title-area">
            <FileText className="title-icon animate-pulse" />
            <div>
              <h1 className="gradient-text">Previous Year Papers</h1>
              <p className="subtitle">
                Access curated Mid-Sem and End-Sem question papers and solution keys.
              </p>
            </div>
          </div>
          
          <div className="header-actions">
            <Link to="/contribute" className="btn-cosmic btn-glow">
              <TrendingUp className="btn-icon" />
              <span>Contribute a Paper</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Quick Stats Grid */}
      {hasSearched && (
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper cyan">
              <BookOpen className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Matching Papers</span>
              <span className="stat-value">{stats.total}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper purple">
              <FileText className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Mid-Sem (MST)</span>
              <span className="stat-value">{stats.msts}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper gold">
              <FileCheck className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">End-Sem (EST)</span>
              <span className="stat-value">{stats.ests}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <HelpCircle className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Auxiliary (AUX)</span>
              <span className="stat-value">{stats.auxs}</span>
            </div>
          </div>
        </section>
      )}

      {/* Filters Area */}
      <form className="filters-panel glass-morphism" onSubmit={handleSearchSubmit}>
        <div className="college-search-container">
          <div className="college-search-field">
            <label className="college-search-label">Search by Course Code</label>
            <div className="search-bar-wrapper">
              <Search className="search-bar-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="e.g. UMA023, UCS303..."
                value={draftCcode}
                onChange={(e) => {
                  setDraftCcode(e.target.value);
                  setDraftCname('');
                }}
              />
              {draftCcode && (
                <button type="button" className="clear-search-btn" onClick={() => setDraftCcode('')}>
                  <X className="clear-icon" />
                </button>
              )}
            </div>
          </div>
          <div className="search-separator">OR</div>
          <div className="college-search-field">
            <label className="college-search-label">Search by Course Name</label>
            <div className="search-bar-wrapper">
              <Search className="search-bar-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="e.g. Mathematics, Operating Systems..."
                value={draftCname}
                onChange={(e) => {
                  setDraftCname(e.target.value);
                  setDraftCcode('');
                }}
              />
              {draftCname && (
                <button type="button" className="clear-search-btn" onClick={() => setDraftCname('')}>
                  <X className="clear-icon" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="filter-dropdowns">
          {/* Study Year Filter */}
          <div className="filter-group">
            <label className="filter-label">Study Year</label>
            <div className="filter-tabs">
              {[
                { value: '1', label: '1st Year' },
                { value: '2', label: '2nd Year' },
                { value: '3', label: '3rd Year' },
                { value: '4', label: '4th Year' }
              ].map(tab => (
                <button
                  type="button"
                  key={tab.value}
                  className={`filter-tab-btn ${draftYear === tab.value ? 'active' : ''}`}
                  onClick={() => setDraftYear(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Type Filter */}
          <div className="filter-group">
            <label className="filter-label">Exam Type</label>
            <div className="filter-tabs">
              {[
                { value: 'all', label: 'All Exams' },
                { value: 'MST', label: 'Mid-Sem' },
                { value: 'EST', label: 'End-Sem' },
                { value: 'AUX', label: 'Auxiliary' }
              ].map(tab => (
                <button
                  type="button"
                  key={tab.value}
                  className={`filter-tab-btn ${draftExamType === tab.value ? 'active' : ''}`}
                  onClick={() => setDraftExamType(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Year Filter */}
          <div className="filter-group select-filter">
            <label className="filter-label">Paper Year</label>
            <div className="select-wrapper">
              <Calendar className="select-icon" />
              <select
                className="filter-select"
                value={draftPaperYear}
                onChange={(e) => setDraftPaperYear(e.target.value)}
              >
                {paperYears.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Paper Years' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="search-action-row">
          <button type="submit" className="btn-cosmic btn-glow btn-search-pyqs">
            <Search className="btn-icon" />
            <span>Search Vault</span>
          </button>
        </div>

        {/* Clear filters banner */}
        {hasSearched && (activeCcode || activeCname || activeYear !== '1' || activeExamType !== 'all' || activePaperYear !== 'all') && (
          <div className="active-filters-summary">
            <span className="filters-applied-text">Filters applied. Found {filteredPapers.length} results.</span>
            <button type="button" className="btn-text" onClick={handleResetFilters}>
              Reset all filters
            </button>
          </div>
        )}
      </form>

      {/* PYQ Papers Grid */}
      <main className="pyq-papers-section">
        {loading ? (
          <div className="pyq-loading-container">
            <div className="pyq-loading-spinner"></div>
            <p>Scanning the vaults for exam papers...</p>
          </div>
        ) : !hasSearched ? (
          <div className="pyq-empty-state glass-morphism pyq-search-placeholder">
            <BookOpen className="empty-icon animate-pulse" style={{ color: 'var(--color-accent)' }} />
            <h2>Nava Nalanda PYQ Vault</h2>
            <p>Enter a Course Code or Course Name above, select your year and exam filters, then click "Search Vault" to browse the archives.</p>
          </div>
        ) : filteredPapers.length > 0 ? (
          <div className="pyq-grid">
            {filteredPapers.map(paper => (
              <article key={paper.id} className="pyq-card">
                <div className="card-header">
                  <span className="subject-code-tag">{paper.subjectCode}</span>
                  <span className={`exam-type-badge ${paper.examType.toLowerCase()}`}>
                    {paper.examType}
                  </span>
                </div>

                <div className="card-body">
                  <h3 className="subject-name">{paper.subjectName}</h3>
                  <div className="meta-info">
                    <div className="meta-item">
                      <span className="meta-label">Year:</span>
                      <span className="meta-value">{paper.studyYear === 1 ? '1st' : paper.studyYear === 2 ? '2nd' : paper.studyYear === 3 ? '3rd' : '4th'} Year</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Branch:</span>
                      <span className="meta-value text-truncate">{paper.branch}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Paper Year:</span>
                      <span className="meta-value font-mono">{paper.paperYear}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="downloads-stat">
                    <Download className="footer-icon-small" />
                    <span>{paper.downloads || 0} downloads</span>
                  </div>

                  <div className="card-actions">
                    {paper.answerUrl && (
                      <button
                        onClick={() => handleDownload(paper.id, paper.subjectCode, paper.examType, true)}
                        className="btn-outline-glow btn-sm"
                        title="Download Answer Key"
                      >
                        Answer Key
                      </button>
                    )}
                    <button
                      onClick={() => handleDownload(paper.id, paper.subjectCode, paper.examType, false)}
                      className="btn-solid-glow btn-sm"
                      title="Download Question Paper"
                    >
                      <Download className="btn-icon-sm" />
                      Paper
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="pyq-empty-state">
            <HelpCircle className="empty-icon animate-bounce" />
            <h2>No Papers Found</h2>
            <p>We couldn't find any papers matching your criteria. Try adjusting your search term or filters!</p>
            <div className="empty-actions">
              <button className="btn-secondary" onClick={handleResetFilters}>
                Clear All Filters
              </button>
              <Link to="/contribute" className="btn-cosmic">
                Upload one yourself
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Call to action at bottom */}
      <footer className="pyq-bottom-cta">
        <div className="cta-glow"></div>
        <div className="cta-content">
          <h2>Missing a paper?</h2>
          <p>
            Thapar Atlas is built by students, for students. If you have any past year papers (MST/EST) that aren't listed here, help your peers by uploading them today!
          </p>
          <div className="cta-button-group">
            <Link to="/contribute" className="btn-cosmic btn-glow btn-lg">
              <TrendingUp className="btn-icon" />
              <span>Contribute Now</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
