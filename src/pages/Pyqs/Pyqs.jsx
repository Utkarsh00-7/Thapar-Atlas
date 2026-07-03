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
import { getPyqData } from '../../utils/pyqDb';
import { getDownloadLink } from '../../utils/helpers';
import './Pyqs.css';

export default function Pyqs() {
  const location = useLocation();

  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('1'); // 1, 2, 3, 4
  const [selectedExamType, setSelectedExamType] = useState('all'); // 'all', 'MST', 'EST'
  const [selectedPaperYear, setSelectedPaperYear] = useState('all'); // 'all', '2024', '2023', etc.
  const [downloadToast, setDownloadToast] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPyqData();
        setPyqs(data);

        // Prepopulate filter state from router state if redirecting from Syllabus Tracker
        if (location.state) {
          if (location.state.searchQuery) {
            setSearchQuery(location.state.searchQuery);
          }
          if (location.state.selectedYear) {
            setSelectedYear(String(location.state.selectedYear));
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
    const years = pyqs.map(p => p.paperYear);
    return ['all', ...new Set(years)].sort((a, b) => b.localeCompare(a));
  }, [pyqs]);

  // Filter logic
  const filteredPapers = useMemo(() => {
    return pyqs.filter(paper => {
      // Search matches subject name or code
      const matchesSearch =
        paper.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.branch.toLowerCase().includes(searchQuery.toLowerCase());

      // Year matches study year
      const matchesYear =
        selectedYear === 'all' || paper.studyYear === Number(selectedYear);

      // Exam type matches
      const matchesExam =
        selectedExamType === 'all' || paper.examType === selectedExamType;

      // Paper year matches
      const matchesPaperYear =
        selectedPaperYear === 'all' || paper.paperYear === selectedPaperYear;

      return matchesSearch && matchesYear && matchesExam && matchesPaperYear;
    });
  }, [pyqs, searchQuery, selectedYear, selectedExamType, selectedPaperYear]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredPapers.length;
    const msts = filteredPapers.filter(p => p.examType === 'MST').length;
    const ests = filteredPapers.filter(p => p.examType === 'EST').length;
    const totalDownloads = filteredPapers.reduce((sum, p) => sum + (p.downloads || 0), 0);
    return { total, msts, ests, totalDownloads };
  }, [filteredPapers]);

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

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedYear('all');
    setSelectedExamType('all');
    setSelectedPaperYear('all');
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
          <div className="stat-icon-wrapper red">
            <Download className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Downloads</span>
            <span className="stat-value">{stats.totalDownloads}</span>
          </div>
        </div>
      </section>

      {/* Filters Area */}
      <section className="filters-panel">
        <div className="search-bar-wrapper">
          <Search className="search-bar-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by subject code, name, or branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X className="clear-icon" />
            </button>
          )}
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
                  key={tab.value}
                  className={`filter-tab-btn ${selectedYear === tab.value ? 'active' : ''}`}
                  onClick={() => setSelectedYear(tab.value)}
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
                { value: 'EST', label: 'End-Sem' }
              ].map(tab => (
                <button
                  key={tab.value}
                  className={`filter-tab-btn ${selectedExamType === tab.value ? 'active' : ''}`}
                  onClick={() => setSelectedExamType(tab.value)}
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
                value={selectedPaperYear}
                onChange={(e) => setSelectedPaperYear(e.target.value)}
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

        {/* Clear filters banner */}
        {(searchQuery || selectedYear !== 'all' || selectedExamType !== 'all' || selectedPaperYear !== 'all') && (
          <div className="active-filters-summary">
            <span className="filters-applied-text">Filters applied. Found {filteredPapers.length} results.</span>
            <button className="btn-text" onClick={handleResetFilters}>
              Reset all filters
            </button>
          </div>
        )}
      </section>

      {/* PYQ Papers Grid */}
      <main className="pyq-papers-section">
        {loading ? (
          <div className="pyq-loading-container">
            <div className="pyq-loading-spinner"></div>
            <p>Scanning the vaults for exam papers...</p>
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
