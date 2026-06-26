import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  CheckCircle,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
  Layers,
  GitBranch,
  Rocket,
  Search,
  Check,
  CheckSquare,
  Square,
  Sparkles,
  ClipboardList,
} from 'lucide-react';
import { academicData } from '../../utils/resourcesData';
import { getSyllabusForSubject } from '../../utils/syllabusData';
import './Syllabus.css';

const yearIcons = {
  Layers: Layers,
  GitBranch: GitBranch,
  Rocket: Rocket,
  Award: Award,
};

export default function Syllabus() {
  const navigate = useNavigate();

  const [selectedYearId, setSelectedYearId] = useState(1);
  const [selectedBranchId, setSelectedBranchId] = useState('pool-a');
  const [expandedSubjectId, setExpandedSubjectId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Memory-based checklist state initialized from localStorage
  const [checkedTopics, setCheckedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('tiet_syllabus_checked_topics');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const handleToggleTopic = (topicKey) => {
    setCheckedTopics((prev) => {
      const updated = { ...prev, [topicKey]: !prev[topicKey] };
      try {
        localStorage.setItem('tiet_syllabus_checked_topics', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save checked topics:', e);
      }
      return updated;
    });
  };

  // Sync branches when Year changes
  const handleYearChange = (yearId) => {
    setSelectedYearId(yearId);
    const yearObj = academicData.find((y) => y.id === yearId);
    if (yearObj && yearObj.branches && yearObj.branches.length > 0) {
      setSelectedBranchId(yearObj.branches[0].id);
    } else {
      setSelectedBranchId('');
    }
    setExpandedSubjectId(null);
  };

  const currentYearObj = useMemo(() => {
    return academicData.find((y) => y.id === selectedYearId);
  }, [selectedYearId]);

  const currentBranchObj = useMemo(() => {
    if (!currentYearObj) return null;
    return currentYearObj.branches.find((b) => b.id === selectedBranchId) || currentYearObj.branches[0];
  }, [currentYearObj, selectedBranchId]);

  const subjects = useMemo(() => {
    if (!currentBranchObj) return [];
    return currentBranchObj.subjects || [];
  }, [currentBranchObj]);

  // Global search across all years and branches
  const allSubjects = useMemo(() => {
    const list = [];
    academicData.forEach((year) => {
      if (year.branches) {
        year.branches.forEach((branch) => {
          if (branch.subjects) {
            branch.subjects.forEach((subj) => {
              list.push({
                ...subj,
                yearId: year.id,
                yearLabel: year.label,
                branchId: branch.id,
                branchName: branch.name,
              });
            });
          }
        });
      }
    });
    return list;
  }, []);

  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return subjects;
    const q = searchQuery.toLowerCase();
    return subjects.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
    );
  }, [subjects, searchQuery]);

  const searchResultsGlobal = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allSubjects.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
    );
  }, [allSubjects, searchQuery]);

  // Compute progress for a specific subject
  const getSubjectStats = (subjectId, syllabus) => {
    if (!syllabus || !syllabus.units) return { total: 0, checked: 0, percentage: 0 };
    let total = 0;
    let checked = 0;

    syllabus.units.forEach((unit) => {
      unit.topics.forEach((_, idx) => {
        total++;
        const topicKey = `${subjectId}-${unit.id}-${idx}`;
        if (checkedTopics[topicKey]) {
          checked++;
        }
      });
    });

    const percentage = total === 0 ? 0 : Math.round((checked / total) * 100);
    return { total, checked, percentage };
  };

  const handleGoToResources = (subjectId) => {
    navigate('/resources', {
      state: {
        yearId: selectedYearId,
        branchId: selectedBranchId,
        subjectId: subjectId,
        activeTab: 'notes',
      },
    });
  };

  const handleGoToPyqs = (subjectCode, subjectName) => {
    navigate('/pyqs', {
      state: {
        searchQuery: subjectCode || subjectName,
        selectedYear: selectedYearId,
      },
    });
  };

  const handleSelectSearchResult = (s) => {
    setSelectedYearId(s.yearId);
    setSelectedBranchId(s.branchId);
    setExpandedSubjectId(s.id);
    setSearchQuery('');
  };

  return (
    <div className="syllabus-page">
      <div className="syllabus-container">
        {/* Header Section */}
        <header className="syllabus-header text-center">
          <div className="syllabus-badge">
            <ClipboardList size={14} className="badge-icon" />
            <span>ACADEMIC STUDY CHECKLIST</span>
          </div>
          <h1>Syllabus Progress Tracker</h1>
          <p>
            Track your semester topics, tick off completed study concepts, and jump straight to study materials.
          </p>
        </header>

        {/* Global Search Bar */}
        <div className="syllabus-search-wrapper">
          <div className="search-input-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search subjects (e.g. Data Structures, Calculus)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                ×
              </button>
            )}
          </div>

          {/* Global search auto-suggestions list when typing */}
          {searchQuery && searchResultsGlobal.length > 0 && (
            <div className="search-dropdown glass-panel">
              <div className="dropdown-title">Search Results across all semesters:</div>
              {searchResultsGlobal.map((s) => (
                <div
                  key={`${s.yearId}-${s.branchId}-${s.id}`}
                  className="dropdown-item"
                  onClick={() => handleSelectSearchResult(s)}
                >
                  <div className="item-name">{s.name}</div>
                  <div className="item-details-badge">
                    {s.yearLabel} • {s.branchName}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Year Level Tab Selectors */}
        <div className="syllabus-tabs-year">
          {academicData.map((year) => {
            const Icon = yearIcons[year.icon] || Layers;
            const isSelected = selectedYearId === year.id;
            return (
              <button
                key={year.id}
                onClick={() => handleYearChange(year.id)}
                className={`year-tab-btn ${isSelected ? 'active' : ''}`}
              >
                <Icon size={18} />
                <div className="btn-text">
                  <span className="tab-label">{year.label}</span>
                  <span className="tab-tagline">{year.tagline}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Branch Pills List */}
        {currentYearObj && currentYearObj.branches && currentYearObj.branches.length > 1 && (
          <div className="syllabus-tabs-branch">
            {currentYearObj.branches.map((branch) => {
              const isSelected = selectedBranchId === branch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => {
                    setSelectedBranchId(branch.id);
                    setExpandedSubjectId(null);
                  }}
                  className={`branch-pill-btn ${isSelected ? 'active' : ''} ${
                    branch.comingSoon ? 'coming-soon' : ''
                  }`}
                  disabled={branch.comingSoon}
                >
                  {branch.name}
                  {branch.comingSoon && <span className="pills-coming-badge">Soon</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Subjects Checklist Board */}
        {currentBranchObj && currentBranchObj.comingSoon ? (
          <div className="syllabus-empty-state glass-panel text-center">
            <Zap size={36} className="empty-icon animate-pulse" />
            <h3>Syllabus Under Construction</h3>
            <p>Our team is compiling the academic files for this branch. Check back soon!</p>
          </div>
        ) : filteredSubjects.length > 0 ? (
          <div className="syllabus-grid">
            {filteredSubjects.map((subject) => {
              const syllabus = getSyllabusForSubject(subject.id, subject.name);
              const stats = getSubjectStats(subject.id, syllabus);
              const isExpanded = expandedSubjectId === subject.id;

              // Circle configurations
              const radius = 36;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (stats.percentage / 100) * circumference;

              return (
                <div
                  key={subject.id}
                  className={`subject-checklist-card glass-panel ${isExpanded ? 'expanded' : ''}`}
                >
                  {/* Card Header (displays basic stats and horizontal progress when collapsed) */}
                  <div
                    className="card-header-main"
                    onClick={() => setExpandedSubjectId(isExpanded ? null : subject.id)}
                  >
                    <div className="subject-info-block">
                      <div className="code-credits">
                        <span className="subj-code">{syllabus.code}</span>
                        <span className="subj-credits">{syllabus.credits} Credits</span>
                      </div>
                      <h3>{subject.name}</h3>
                    </div>

                    <div className="subject-progress-block">
                      <div className="percentage-text">{stats.percentage}% Done</div>
                      <div className="progress-bar-container">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${stats.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <button className="expand-chevron">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {/* Expanded Accordion Body (Checklists + Resources) */}
                  {isExpanded && (
                    <div className="card-expanded-body">
                      <div className="grid-details-checklist">
                        {/* Left Details Block */}
                        <div className="subject-description-hub">
                          <p className="subj-desc">{syllabus.description}</p>

                          {/* Interactive Circular Progress Visual */}
                          <div className="circular-progress-showcase">
                            <svg className="progress-svg" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r={radius} className="circle-bg" />
                              <circle
                                cx="50"
                                cy="50"
                                r={radius}
                                className="circle-fill"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                              />
                            </svg>
                            <div className="circle-text-center">
                              <span className="number-percent">{stats.percentage}%</span>
                              <span className="percent-label">Completed</span>
                            </div>
                          </div>

                          <div className="checked-counts-indicator">
                            Checked <strong>{stats.checked}</strong> of <strong>{stats.total}</strong> topics
                          </div>

                          <div className="quick-links-action-bar">
                            <button
                              className="btn-cosmic btn-glow"
                              onClick={() => handleGoToResources(subject.id)}
                            >
                              <BookOpen size={16} />
                              <span>Study Material</span>
                            </button>
                            <button
                              className="btn-secondary"
                              onClick={() => handleGoToPyqs(syllabus.code, subject.name)}
                            >
                              <FileText size={16} />
                              <span>Exam Papers</span>
                            </button>
                          </div>
                        </div>

                        {/* Right Checklist Block */}
                        <div className="syllabus-units-checklist">
                          {syllabus.units.map((unit) => {
                            // Compute count for this unit
                            let unitTotal = unit.topics.length;
                            let unitChecked = 0;
                            unit.topics.forEach((_, idx) => {
                              if (checkedTopics[`${subject.id}-${unit.id}-${idx}`]) {
                                unitChecked++;
                              }
                            });

                            return (
                              <div key={unit.id} className="unit-container">
                                <div className="unit-title-line">
                                  <h4>{unit.name}</h4>
                                  <span className="unit-fraction-badge">
                                    {unitChecked}/{unitTotal}
                                  </span>
                                </div>
                                <ul className="topics-list-ul">
                                  {unit.topics.map((topic, topicIdx) => {
                                    const topicKey = `${subject.id}-${unit.id}-${topicIdx}`;
                                    const isChecked = !!checkedTopics[topicKey];

                                    return (
                                      <li
                                        key={topicIdx}
                                        className={`topic-list-item ${isChecked ? 'completed' : ''}`}
                                        onClick={() => handleToggleTopic(topicKey)}
                                      >
                                        <button className="checkbox-toggle-btn">
                                          {isChecked ? (
                                            <CheckSquare className="checkbox-icon checked" size={16} />
                                          ) : (
                                            <Square className="checkbox-icon" size={16} />
                                          )}
                                        </button>
                                        <span className="topic-text">{topic}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="syllabus-empty-state glass-panel text-center">
            <Layers size={36} className="empty-icon" />
            <h3>No matching subjects found</h3>
            <p>Try refining your search query or selecting a different year.</p>
          </div>
        )}
      </div>
    </div>
  );
}
