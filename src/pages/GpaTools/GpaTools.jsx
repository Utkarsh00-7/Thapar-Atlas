import { useState, useEffect } from 'react';
import {
  Calculator,
  Plus,
  Trash2,
  RefreshCw,
  GraduationCap,
  Award,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { GRADE_MAP } from '../../utils/constants';
import './GpaTools.css';

// ─── Default Course Data from images ───
const FIRST_YEAR_COURSES = {
  'pool-a': {
    1: [ // Semester 1
      { code: 'UCB009', name: 'Chemistry', credits: 4.0 },
      { code: 'UES103', name: 'Programming for Problem Solving', credits: 4.0 },
      { code: 'UES013', name: 'Electrical & Electronics Engineering', credits: 4.5 },
      { code: 'UEN008', name: 'Energy and Environment', credits: 2.0 },
      { code: 'UMA022', name: 'Calculus for Engineers', credits: 3.5 }
    ],
    2: [ // Semester 2
      { code: 'UPH013', name: 'Physics', credits: 4.5 },
      { code: 'UES101', name: 'Engineering Drawing', credits: 4.0 },
      { code: 'UHU003', name: 'Professional Communication', credits: 3.0 },
      { code: 'UES102', name: 'Manufacturing Processes', credits: 3.0 },
      { code: 'UMA023', name: 'Differential Equations and Linear Algebra', credits: 3.5 }
    ]
  },
  'pool-b': {
    1: [ // Semester 1 (Physics group for Pool B)
      { code: 'UPH013', name: 'Physics', credits: 4.5 },
      { code: 'UES101', name: 'Engineering Drawing', credits: 4.0 },
      { code: 'UHU003', name: 'Professional Communication', credits: 3.0 },
      { code: 'UES102', name: 'Manufacturing Processes', credits: 3.0 },
      { code: 'UMA023', name: 'Differential Equations and Linear Algebra', credits: 3.5 }
    ],
    2: [ // Semester 2 (Chemistry group for Pool B)
      { code: 'UCB009', name: 'Chemistry', credits: 4.0 },
      { code: 'UES103', name: 'Programming for Problem Solving', credits: 4.0 },
      { code: 'UES013', name: 'Electrical & Electronics Engineering', credits: 4.5 },
      { code: 'UEN008', name: 'Energy and Environment', credits: 2.0 },
      { code: 'UMA022', name: 'Calculus for Engineers', credits: 3.5 }
    ]
  },
  'csbs': {
    1: [], // Custom backlog/user input (1st year is same but user can customize if needed)
    2: []
  },
  'biotech': {
    1: [],
    2: []
  }
};

const COE_COURSES = {
  2: { // Year 2
    3: [ // Semester 3
      { code: 'UCS303', name: 'Operating System', credits: 4.0 },
      { code: 'UTA018', name: 'Object Oriented Programming', credits: 4.0 },
      { code: 'UCS301', name: 'Data Structures', credits: 4.0 },
      { code: 'UCS405', name: 'Discrete Mathematical Structures', credits: 3.5 },
      { code: 'UTA016', name: 'Engineering Design Project I', credits: 3.0 },
      { code: 'UMA021', name: 'Numerical Linear Algebra', credits: 4.0 },
      { code: 'UHU050', name: 'Evolutionary Psychology', credits: 1.0 },
      { code: 'UCS320', name: 'Introduction to Sustainable Green Computing', credits: 1.0 }
    ],
    4: [ // Semester 4
      { code: 'UCS415', name: 'Design and Analysis of Algorithms', credits: 4.0 },
      { code: 'UCS310', name: 'Database Management Systems', credits: 4.0 },
      { code: 'UES022', name: 'Quantum Materials', credits: 3.0 },
      { code: 'UCS411', name: 'Artificial Intelligence', credits: 4.0 },
      { code: 'UMA401', name: 'Probability and Statistics', credits: 4.0 },
      { code: 'UTA024', name: 'Engineering Design Project II', credits: 3.0 },
      { code: 'UTD003', name: 'Aptitude Skills Building', credits: 2.0 }
    ]
  },
  3: { // Year 3
    5: [ // Semester 5
      { code: 'UML501', name: 'Machine Learning', credits: 4.0 },
      { code: 'UCS553', name: 'Enterprise Web Application', credits: 4.0 },
      { code: 'UCS615', name: 'Image Processing', credits: 4.0 },
      { code: 'UCS503', name: 'Software Engineering', credits: 4.0 },
      { code: 'UCS510', name: 'Computer Architecture and Organization', credits: 3.0 },
      { code: 'ELECTIVE-I', name: 'Elective-I', credits: 3.0 },
      { code: 'UCSXXX', name: 'Ethics and Risk Mitigation in AI', credits: 3.0 }
    ],
    6: [ // Semester 6
      { code: 'UCS701', name: 'Theory of Computation', credits: 3.5 },
      { code: 'UMA035', name: 'Numerical Optimization', credits: 4.0 },
      { code: 'UTA025', name: 'Innovation and Entrepreneurship', credits: 3.0 },
      { code: 'ELECTIVE-II', name: 'Elective-II', credits: 3.0 },
      { code: 'ELECTIVE-III', name: 'Elective-III', credits: 3.0 },
      { code: 'UCS797', name: 'Capstone Project* - Starts', credits: 0.0 },
      { code: 'GENERIC-ELECTIVE', name: 'Generic Elective', credits: 2.0 },
      { code: 'UCSXXX', name: 'Domain Specific Applications for Engineering Graduates', credits: 3.0 }
    ]
  },
  4: { // Year 4
    7: [ // Semester 7
      { code: 'UCS802', name: 'Compiler Construction', credits: 4.0 },
      { code: 'UHU005', name: 'Humanities for Engineers', credits: 3.0 },
      { code: 'UCS714', name: 'Agentic AI', credits: 3.0 },
      { code: 'ELECTIVE-IV', name: 'Elective-IV', credits: 3.0 },
      { code: 'UCS797', name: 'Capstone Project', credits: 8.0 }
    ],
    8: [ // Semester 8
      { code: 'UCS898', name: 'Project Semester', credits: 15.0 }
    ]
  }
};

const COPC_COURSES = {
  2: { // Year 2
    3: [ // Semester 3
      { code: 'UCS303', name: 'Operating System', credits: 4.0 },
      { code: 'UTA018', name: 'Object Oriented Programming', credits: 4.0 },
      { code: 'UCS301', name: 'Data Structures', credits: 4.0 },
      { code: 'UCS405', name: 'Discrete Mathematical Structures', credits: 3.5 },
      { code: 'UTA016', name: 'Engineering Design Project I', credits: 3.0 },
      { code: 'UMA021', name: 'Numerical Linear Algebra', credits: 4.0 },
      { code: 'UHU052', name: 'The Evolutionary Basis of Human Behaviour for Engineers', credits: 1.0 },
      { code: 'UCS320', name: 'Introduction to Sustainable Green Computing', credits: 1.0 }
    ],
    4: [ // Semester 4
      { code: 'UCS415', name: 'Design and Analysis of Algorithms', credits: 4.0 },
      { code: 'UCS310', name: 'Database Management Systems', credits: 4.0 },
      { code: 'UCS414', name: 'Computer Networks', credits: 4.0 },
      { code: 'UCS321', name: 'AI for Engineers', credits: 3.0 },
      { code: 'UMA401', name: 'Probability and Statistics', credits: 4.0 },
      { code: 'UTA024', name: 'Engineering Design Project II', credits: 3.0 },
      { code: 'UTD003', name: 'Aptitude Skills Building', credits: 2.0 }
    ]
  },
  3: { // Year 3
    5: [ // Semester 5
      { code: 'UML501', name: 'Machine Learning', credits: 4.0 },
      { code: 'UCS420', name: 'Cognitive Computing', credits: 3.0 },
      { code: 'UCS553', name: 'Enterprise Web Application', credits: 4.0 },
      { code: 'UCS503', name: 'Software Engineering', credits: 4.0 },
      { code: 'UCS510', name: 'Computer Architecture and Organization', credits: 3.0 },
      { code: 'ELECTIVE-I', name: 'Elective-I', credits: 3.0 },
      { code: 'GENERIC-ELECTIVE', name: 'Generic Elective', credits: 2.0 },
      { code: 'UCS421', name: 'Ethics and Risk Mitigation in AI', credits: 3.0 }
    ],
    6: [ // Semester 6
      { code: 'UCS701', name: 'Theory of Computation', credits: 3.5 },
      { code: 'UMA071', name: 'Optimization Techniques', credits: 4.0 },
      { code: 'UCS619', name: 'Quantum Computing', credits: 4.0 },
      { code: 'UTA025', name: 'Innovation and Entrepreneurship', credits: 3.0 },
      { code: 'ELECTIVE-II', name: 'Elective-II', credits: 3.0 },
      { code: 'ELECTIVE-III', name: 'Elective-III', credits: 3.0 },
      { code: 'UCS797', name: 'Capstone Project* - Starts', credits: 0.0 },
      { code: 'UCSXXX', name: 'Domain Specific Applications for Engineering Graduates', credits: 3.0 }
    ]
  },
  4: { // Year 4
    7: [ // Semester 7
      { code: 'UCS802', name: 'Compiler Construction', credits: 4.0 },
      { code: 'UHU005', name: 'Humanities for Engineers', credits: 3.0 },
      { code: 'UCS714', name: 'Agentic AI', credits: 3.0 },
      { code: 'ELECTIVE-IV', name: 'Elective-IV', credits: 3.0 },
      { code: 'UCS797', name: 'Capstone Project', credits: 8.0 }
    ],
    8: [ // Semester 8
      { code: 'UCS898', name: 'Project Semester', credits: 15.0 }
    ]
  }
};

const SEMESTER_LABELS = {
  1: 'Semester I',
  2: 'Semester II',
  3: 'Semester III',
  4: 'Semester IV',
  5: 'Semester V',
  6: 'Semester VI',
  7: 'Semester VII',
  8: 'Semester VIII'
};

const YEAR_SEMESTERS = {
  1: [1, 2],
  2: [3, 4],
  3: [5, 6],
  4: [7, 8]
};

export default function GpaTools() {
  const [activeMode, setActiveMode] = useState('sgpa'); // sgpa, cgpa
  
  // SGPA states
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState('pool-a');
  const [courses, setCourses] = useState([]);
  
  // Custom course form states
  const [customCode, setCustomCode] = useState('');
  const [customName, setCustomName] = useState('');
  const [customCredits, setCustomCredits] = useState(3.0);
  
  // CGPA states
  const [semestersList, setSemestersList] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: SEMESTER_LABELS[i + 1],
      sgpa: '',
      credits: '',
      active: i < 2 // start with 2 semesters active
    }))
  );

  // Update default branch when selected Year changes
  useEffect(() => {
    if (selectedYear === 1) {
      setSelectedBranch('pool-a');
    } else if (selectedYear >= 2 && selectedYear <= 4) {
      if (selectedBranch !== 'coe' && selectedBranch !== 'copc') {
        setSelectedBranch('coe');
      }
    } else {
      setSelectedBranch('custom');
    }
  }, [selectedYear]);

  // Load default courses when year/semester/branch changes
  useEffect(() => {
    let defaultList = [];
    if (selectedYear === 1) {
      defaultList = FIRST_YEAR_COURSES[selectedBranch]?.[selectedSemester] || [];
    } else if (selectedBranch === 'coe') {
      defaultList = COE_COURSES[selectedYear]?.[selectedSemester] || [];
    } else if (selectedBranch === 'copc') {
      defaultList = COPC_COURSES[selectedYear]?.[selectedSemester] || [];
    }
    
    setCourses(
      defaultList.map((c, index) => ({
        id: `course-${index}-${Date.now()}`,
        code: c.code,
        name: c.name,
        credits: c.credits,
        grade: 'A+' // default grade selection
      }))
    );
  }, [selectedYear, selectedSemester, selectedBranch]);

  // SGPA Calculation logic
  const calculateSGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach((c) => {
      const gradeVal = GRADE_MAP[c.grade];
      if (typeof gradeVal === 'number' && !isNaN(c.credits) && c.credits > 0) {
        totalGradePoints += gradeVal * Number(c.credits);
        totalCredits += Number(c.credits);
      }
    });

    return {
      sgpa: totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00',
      credits: totalCredits
    };
  };

  const { sgpa: calculatedSgpa, credits: totalSgpaCredits } = calculateSGPA();

  // CGPA Calculation logic
  const calculateCGPA = () => {
    let totalSgpaPoints = 0;
    let totalCredits = 0;
    let activeSemCount = 0;

    semestersList.forEach((sem) => {
      if (sem.active && sem.sgpa && sem.credits) {
        totalSgpaPoints += Number(sem.sgpa) * Number(sem.credits);
        totalCredits += Number(sem.credits);
        activeSemCount++;
      }
    });

    return {
      cgpa: totalCredits > 0 ? (totalSgpaPoints / totalCredits).toFixed(2) : '0.00',
      credits: totalCredits,
      activeSemCount
    };
  };

  const { cgpa: calculatedCgpa, credits: totalCgpaCredits, activeSemCount } = calculateCGPA();

  // SGPA Handlers
  const handleGradeChange = (id, newGrade) => {
    setCourses(courses.map(c => c.id === id ? { ...c, grade: newGrade } : c));
  };

  const handleCreditChange = (id, newCredits) => {
    setCourses(courses.map(c => c.id === id ? { ...c, credits: parseFloat(newCredits) || 0 } : c));
  };

  const handleNameChange = (id, newName) => {
    setCourses(courses.map(c => c.id === id ? { ...c, name: newName } : c));
  };

  const handleCodeChange = (id, newCode) => {
    setCourses(courses.map(c => c.id === id ? { ...c, code: newCode } : c));
  };

  const handleRemoveCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleAddCustomCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: `custom-${Date.now()}`,
      code: customCode.trim().toUpperCase() || 'BACKLOG',
      name: customName.trim() || 'Custom Subject',
      credits: Number(customCredits) || 3.0,
      grade: 'A+'
    };
    setCourses([...courses, newCourse]);
    setCustomCode('');
    setCustomName('');
    setCustomCredits(3.0);
  };

  const handleResetSGPA = () => {
    if (window.confirm('Reset current subjects to default?')) {
      let defaultList = [];
      if (selectedYear === 1) {
        defaultList = FIRST_YEAR_COURSES[selectedBranch]?.[selectedSemester] || [];
      } else if (selectedBranch === 'coe') {
        defaultList = COE_COURSES[selectedYear]?.[selectedSemester] || [];
      } else if (selectedBranch === 'copc') {
        defaultList = COPC_COURSES[selectedYear]?.[selectedSemester] || [];
      }
      setCourses(
        defaultList.map((c, index) => ({
          id: `course-${index}-${Date.now()}`,
          code: c.code,
          name: c.name,
          credits: c.credits,
          grade: 'A+'
        }))
      );
    }
  };

  // CGPA input handlers
  const handleCgpaSemToggle = (id) => {
    setSemestersList(
      semestersList.map(s => s.id === id ? { ...s, active: !s.active } : s)
    );
  };

  const handleCgpaValChange = (id, field, value) => {
    setSemestersList(
      semestersList.map(s => s.id === id ? { ...s, [field]: value } : s)
    );
  };

  const getGpaGradeDescription = (gpa) => {
    const num = parseFloat(gpa);
    if (num >= 9.5) return { text: 'Academic Titan 👑', color: '#10B981' };
    if (num >= 9.0) return { text: 'Outstanding Performance 🌟', color: '#10B981' };
    if (num >= 8.0) return { text: 'Excellent Work 👍', color: '#3B82F6' };
    if (num >= 7.0) return { text: 'Very Good Effort 👏', color: '#8B5CF6' };
    if (num >= 6.0) return { text: 'Good standing 📚', color: '#F59E0B' };
    if (num >= 5.0) return { text: 'Passing grade ⚖️', color: '#EF4444' };
    return { text: 'Keep working hard! 💪', color: '#9CA3AF' };
  };

  return (
    <div className="gpa-page">
      <div className="gpa-container">
        {/* Page Title */}
        <div className="gpa-header">
          <div className="gpa-title-wrap">
            <Calculator className="gpa-calc-icon animate-pulse" size={32} />
            <h1>GPA Calculator</h1>
          </div>
          <p>Calculate your semester SGPA and track your overall CGPA with the official TIET grading criteria.</p>
        </div>

        {/* Tab Controls */}
        <div className="gpa-tabs">
          <button
            className={`gpa-tab ${activeMode === 'sgpa' ? 'active' : ''}`}
            onClick={() => setActiveMode('sgpa')}
          >
            <GraduationCap size={16} />
            SGPA Calculator
          </button>
          <button
            className={`gpa-tab ${activeMode === 'cgpa' ? 'active' : ''}`}
            onClick={() => setActiveMode('cgpa')}
          >
            <Award size={16} />
            CGPA Calculator
          </button>
        </div>

        {/* Mode: SGPA Calculator */}
        {activeMode === 'sgpa' && (
          <div className="gpa-grid">
            {/* Left side: Setup selectors & Subject input rows */}
            <div className="gpa-main-card glass-panel">
              <div className="card-top-section">
                <h2>Configure Semester</h2>
                <p>Select your year, branch/pool, and semester to load defaults. Add subjects below to customize.</p>
              </div>

              {/* Year & Semester & Branch Selectors */}
              <div className="sgpa-setup-row">
                <div className="setup-group">
                  <label>Select Year</label>
                  <div className="year-selector-grid">
                    {[1, 2, 3, 4].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        className={`year-sel-btn ${selectedYear === yr ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedYear(yr);
                          setSelectedSemester(YEAR_SEMESTERS[yr][0]);
                        }}
                      >
                        {yr === 1 ? '1st Year' : yr === 2 ? '2nd Year' : yr === 3 ? '3rd Year' : '4th Year'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="setup-group">
                  <label>Select Branch / Pool</label>
                  <select
                    className="gpa-select"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  >
                    {selectedYear === 1 && (
                      <>
                        <option value="pool-a">Pool A</option>
                        <option value="pool-b">Pool B</option>
                        <option value="csbs">CSBS (CS & Business Systems)</option>
                        <option value="biotech">Biotechnology</option>
                      </>
                    )}
                    {selectedYear >= 2 && (
                      <>
                        <option value="coe">Computer Engineering (COE)</option>
                        <option value="copc">Computer Science & Engineering (COPC)</option>
                        <option value="custom">Other Branches (Custom / Blank)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="setup-group" style={{ gridColumn: 'span 2' }}>
                  <label>Select Semester</label>
                  <select
                    className="gpa-select"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(Number(e.target.value))}
                  >
                    {YEAR_SEMESTERS[selectedYear]?.map((sem) => (
                      <option key={sem} value={sem}>
                        {SEMESTER_LABELS[sem]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject Table */}
              <div className="courses-table-container">
                <div className="table-header-row">
                  <div className="col-code">Code</div>
                  <div className="col-name">Course Name</div>
                  <div className="col-credits">Credits</div>
                  <div className="col-grade">Grade</div>
                  <div className="col-action"></div>
                </div>

                {courses.length > 0 ? (
                  <div className="table-rows">
                    {courses.map((course) => (
                      <div key={course.id} className="table-row-item">
                        <div className="col-code">
                          <input
                            type="text"
                            className="gpa-input"
                            value={course.code}
                            onChange={(e) => handleCodeChange(course.id, e.target.value)}
                            placeholder="e.g. UCS301"
                          />
                        </div>
                        <div className="col-name">
                          <input
                            type="text"
                            className="gpa-input"
                            value={course.name}
                            onChange={(e) => handleNameChange(course.id, e.target.value)}
                            placeholder="e.g. Operating System"
                          />
                        </div>
                        <div className="col-credits">
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="20"
                            className="gpa-input"
                            value={course.credits}
                            onChange={(e) => handleCreditChange(course.id, e.target.value)}
                          />
                        </div>
                        <div className="col-grade">
                          <select
                            className="gpa-select"
                            value={course.grade}
                            onChange={(e) => handleGradeChange(course.id, e.target.value)}
                          >
                            {Object.keys(GRADE_MAP).map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-action">
                          <button
                            type="button"
                            className="btn-row-delete"
                            onClick={() => handleRemoveCourse(course.id)}
                            title="Remove Course"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-subjects-state">
                    <HelpCircle size={32} />
                    <p>No subjects loaded for this selection. Click the form below to add backlog/custom subjects.</p>
                  </div>
                )}
              </div>

              {/* Add Custom / Backlog Subject Form */}
              <div className="add-subject-form-container">
                <h3>Add Subject (including Backlogs / Other Branches)</h3>
                <form onSubmit={handleAddCustomCourse} className="add-subject-form">
                  <div className="form-group-inline">
                    <input
                      type="text"
                      placeholder="Code (e.g. UMA022)"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      className="gpa-input"
                    />
                    <input
                      type="text"
                      placeholder="Subject Name"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="gpa-input"
                      required
                    />
                    <div className="credits-input-wrap">
                      <label>Credits:</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="20"
                        value={customCredits}
                        onChange={(e) => setCustomCredits(e.target.value)}
                        className="gpa-input input-credits-num"
                      />
                    </div>
                    <button type="submit" className="btn-add-subject">
                      <Plus size={16} />
                      Add Subject
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right side: Summary & Result Display */}
            <div className="gpa-side-card">
              <div className="gpa-result-card glass-panel text-center">
                <h2>Semester SGPA</h2>
                <div className="result-number-glow">
                  <span className="gpa-large-number">{calculatedSgpa}</span>
                </div>
                <div className="result-status-badge" style={{ color: getGpaGradeDescription(calculatedSgpa).color }}>
                  {getGpaGradeDescription(calculatedSgpa).text}
                </div>
                
                <div className="gpa-stat-details">
                  <div className="stat-detail-row">
                    <span>Total Credits Evaluated:</span>
                    <strong>{totalSgpaCredits}</strong>
                  </div>
                </div>

                <div className="result-actions">
                  <button className="btn-reset-result" onClick={handleResetSGPA}>
                    <RefreshCw size={16} />
                    Reload Default
                  </button>
                </div>
              </div>

              {/* TIET Grades Quick Info */}
              <div className="gpa-info-card glass-panel">
                <h3>TIET Grade Pointer Map</h3>
                <div className="gpa-info-grid">
                  {Object.entries(GRADE_MAP).map(([g, val]) => (
                    <div key={g} className="grade-info-cell">
                      <span className="info-grade-label">{g}</span>
                      <ChevronRight size={10} className="text-secondary" />
                      <span className="info-grade-val">{val} Pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode: CGPA Calculator */}
        {activeMode === 'cgpa' && (
          <div className="gpa-grid">
            {/* Left side: Semesters SGPA & Credits Input */}
            <div className="gpa-main-card glass-panel">
              <div className="card-top-section">
                <h2>Cumulative GPA</h2>
                <p>Toggle semesters, enter your SGPA and registered credits for each completed semester to calculate cumulative CGPA.</p>
              </div>

              <div className="semesters-cgpa-grid">
                {semestersList.map((sem) => (
                  <div key={sem.id} className={`cgpa-sem-row ${sem.active ? 'active' : ''}`}>
                    <div className="cgpa-sem-check">
                      <input
                        type="checkbox"
                        id={`sem-active-${sem.id}`}
                        checked={sem.active}
                        onChange={() => handleCgpaSemToggle(sem.id)}
                      />
                      <label htmlFor={`sem-active-${sem.id}`}>{sem.name}</label>
                    </div>

                    {sem.active && (
                      <div className="cgpa-sem-inputs">
                        <div className="input-group">
                          <span>SGPA:</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            placeholder="0.00"
                            value={sem.sgpa}
                            onChange={(e) => handleCgpaValChange(sem.id, 'sgpa', e.target.value)}
                            className="gpa-input"
                          />
                        </div>

                        <div className="input-group">
                          <span>Credits:</span>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            placeholder="0.0"
                            value={sem.credits}
                            onChange={(e) => handleCgpaValChange(sem.id, 'credits', e.target.value)}
                            className="gpa-input"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Summary & Result Display */}
            <div className="gpa-side-card">
              <div className="gpa-result-card glass-panel text-center">
                <h2>Cumulative CGPA</h2>
                <div className="result-number-glow bg-cyan">
                  <span className="gpa-large-number color-cyan">{calculatedCgpa}</span>
                </div>
                <div className="result-status-badge" style={{ color: getGpaGradeDescription(calculatedCgpa).color }}>
                  {getGpaGradeDescription(calculatedCgpa).text}
                </div>

                <div className="gpa-stat-details">
                  <div className="stat-detail-row">
                    <span>Semesters Included:</span>
                    <strong>{activeSemCount}</strong>
                  </div>
                  <div className="stat-detail-row">
                    <span>Total Cumulative Credits:</span>
                    <strong>{totalCgpaCredits}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
