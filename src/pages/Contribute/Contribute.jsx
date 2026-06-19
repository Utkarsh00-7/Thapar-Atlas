import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  User,
  BookOpen,
  Link2,
  FileText,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileCheck,
  Sparkles,
  Paperclip,
  Trash2,
  LogIn,
} from 'lucide-react';
import { getAcademicData } from '../../utils/resourceDb';
import { resourceTypes } from '../../utils/resourcesData';
import { addPendingContribution } from '../../utils/contributionDb';
import { useAuth } from '../../context/AuthContext';
import './Contribute.css';

export default function Contribute() {
  const { user, loginWithGoogle } = useAuth();
  
  // Academic database structure state
  const [academicData, setAcademicData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');

  // Sync contributor name with logged in Google account
  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
    } else {
      setName('');
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Contribute page login failed:", err);
    }
  };
  const [yearId, setYearId] = useState(1);
  const [branchId, setBranchId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [resourceType, setResourceType] = useState('notes');
  const [title, setTitle] = useState('');
  
  // Link vs File Mode
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'link'
  const [link, setLink] = useState('');
  const [size, setSize] = useState('');
  
  // File upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // PYQ specific states
  const [subjectCode, setSubjectCode] = useState('');
  const [examType, setExamType] = useState('MST');
  const [paperYear, setPaperYear] = useState('2024');

  // UI states
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch academic structure on load
  useEffect(() => {
    async function loadAcademicStructure() {
      try {
        const data = await getAcademicData();
        setAcademicData(data);
      } catch (err) {
        console.error('Failed to load academic data structure:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAcademicStructure();
  }, []);

  // Dynamic dropdown options
  const currentYear = academicData.find(y => y.id === yearId);
  const branches = currentYear ? currentYear.branches : [];
  const currentBranch = branches.find(b => b.id === branchId);
  const subjects = currentBranch ? currentBranch.subjects || [] : [];
  const isBranchComingSoon = currentBranch ? currentBranch.comingSoon : false;

  // Set default branch and subject when year changes or when data loads
  useEffect(() => {
    if (branches.length > 0) {
      const firstBranch = branches[0];
      setBranchId(firstBranch.id);
      
      const firstSubjects = firstBranch.subjects || [];
      if (firstSubjects.length > 0) {
        setSubjectId(firstSubjects[0].id);
      } else {
        setSubjectId('custom');
      }
    }
  }, [yearId, branches]);

  // Set default subject when branch changes or when subjects load
  useEffect(() => {
    if (subjects.length > 0) {
      setSubjectId(subjects[0].id);
    } else {
      setSubjectId('custom');
    }
  }, [branchId, subjects]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Direct file upload is limited to 10MB. Please choose the "Shareable Document Link" option for larger files.');
      setSelectedFile(null);
      setFileName('');
      setFileSize('');
      return;
    }
    setErrorMsg('');

    setSelectedFile(file);
    setFileName(file.name);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setFileSize(`${sizeInMB} MB`);
    
    // Auto pre-fill title if empty
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    setTitle(nameWithoutExt);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName('');
    setFileSize('');
    setTitle('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!title.trim()) {
      setErrorMsg('Please enter a descriptive title.');
      return;
    }

    if (uploadMode === 'file') {
      if (!selectedFile) {
        setErrorMsg('Please upload a file or switch to "Shareable Link".');
        return;
      }
    } else {
      if (!link.trim()) {
        setErrorMsg('Please enter a document link.');
        return;
      }
      if (!link.startsWith('http://') && !link.startsWith('https://')) {
        setErrorMsg('Please enter a valid URL starting with http:// or https://.');
        return;
      }
    }

    if (subjectId === 'custom' && !customSubjectName.trim()) {
      setErrorMsg('Please specify the Subject Name.');
      return;
    }

    if (resourceType === 'pyq' && !subjectCode.trim()) {
      setErrorMsg('Please enter the Subject Code (e.g. UTA018).');
      return;
    }

    // Resolve subject name
    let resolvedSubjectName = '';
    if (subjectId === 'custom') {
      resolvedSubjectName = customSubjectName.trim();
    } else {
      const foundSub = subjects.find(s => s.id === subjectId);
      resolvedSubjectName = foundSub ? foundSub.name : 'Unknown Subject';
    }

    setIsUploading(true);
    try {
      let resolvedLink = link.trim();
      
      if (uploadMode === 'file') {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'thapar_atlas');
        
        const res = await fetch('https://api.cloudinary.com/v1_1/dsff7vad7/auto/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || 'Failed to upload file to cloud. Please check if your preset is set to Unsigned.');
        }
        
        const data = await res.json();
        resolvedLink = data.secure_url;
      }

      const resolvedSize = uploadMode === 'file' ? fileSize : size.trim() || 'Link';

      const contribution = {
        contributorName: name.trim() || 'Anonymous',
        contributorEmail: user ? user.email : '',
        contributorUid: user ? user.uid : '',
        yearId: Number(yearId),
        branchId,
        subjectId,
        subjectName: resolvedSubjectName,
        resourceType,
        title: title.trim(),
        link: resolvedLink,
        size: resolvedSize,
        isDirectUpload: uploadMode === 'file',
        fileName: uploadMode === 'file' ? fileName : '',
        ...(resourceType === 'pyq' && {
          subjectCode: subjectCode.trim().toUpperCase(),
          examType,
          paperYear,
        }),
      };

      // Save to pending database
      await addPendingContribution(contribution);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during file upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setTitle('');
    setLink('');
    setSize('');
    setSubjectCode('');
    setCustomSubjectName('');
    handleRemoveFile();
    setSubmitted(false);
  };

  if (loading) {
    return (
      <div className="contribute-page success-state">
        <div className="resources-loading-container" style={{ margin: 'auto' }}>
          <div className="resources-loading-spinner" style={{ margin: '0 auto 16px auto' }}></div>
          <p>Connecting to database archives...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="contribute-page success-state">
        <div className="success-card glass-panel text-center">
          <AlertCircle className="success-icon animate-pulse" size={48} style={{ color: 'var(--color-accent)', margin: '0 auto var(--space-4) auto' }} />
          <h1 className="gradient-text">Sign In Required</h1>
          <p>
            To maintain academic integrity and prevent spam, resource uploads are restricted to official <strong>@thapar.edu</strong> accounts.
          </p>
          <div className="button-group">
            <button className="btn-cosmic btn-glow" onClick={handleLogin}>
              <LogIn size={18} />
              <span>Sign In with Google</span>
            </button>
            <Link to="/resources" className="btn-secondary">
              Go to Resource Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="contribute-page success-state">
        <div className="success-card glass-panel">
          <CheckCircle className="success-icon animate-bounce-slow" />
          <h1 className="gradient-text">Thank You, Contributor!</h1>
          <p>
            Your contribution for <strong>{title}</strong> has been successfully submitted to the admin moderation queue.
          </p>
          <div className="info-alert">
            <Sparkles className="alert-icon" />
            <span>Once verified by a moderator, it will go live for everyone!</span>
          </div>
          <div className="button-group">
            <button className="btn-cosmic btn-glow" onClick={resetForm}>
              Submit Another Resource
            </button>
            <Link to="/resources" className="btn-secondary">
              Go to Resource Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contribute-page">
      <div className="header-glow"></div>
      <div className="contribute-container">
        
        {/* Title Block */}
        <header className="contribute-header">
          <Upload className="header-icon" />
          <h1 className="gradient-text">Contribute Study Material</h1>
          <p className="subtitle">
            Support the Thapar community by sharing your past year exam papers, notes, books, lab manuals, and tutorials.
          </p>
        </header>

        {errorMsg && (
          <div className="error-alert">
            <AlertCircle className="error-alert-icon" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form panel */}
        <main className="form-panel glass-panel">
          <form onSubmit={handleSubmit} className="contribute-form">
            
            {/* Section 1: Contributor info */}
            <div className="form-section">
              <h3><User className="section-icon" /> Contributor Details</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="name-input">Logged In As</label>
                  <input
                    id="name-input"
                    type="text"
                    value={`${user.displayName} (${user.email})`}
                    disabled
                    style={{ opacity: 0.85, cursor: 'not-allowed', background: 'rgba(255, 255, 255, 0.02)' }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type-select">Resource Category</label>
                  <select
                    id="type-select"
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                  >
                    {resourceTypes.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Subject Placement */}
            <div className="form-section">
              <h3><BookOpen className="section-icon" /> Academic Alignment</h3>
              <div className="form-grid-3">
                <div className="form-group">
                  <label htmlFor="year-select">Academic Year</label>
                  <select
                    id="year-select"
                    value={yearId}
                    onChange={(e) => setYearId(Number(e.target.value))}
                  >
                    {academicData.map(y => (
                      <option key={y.id} value={y.id}>
                        {y.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="branch-select">
                    {yearId === 1 ? 'Subject Pool' : 'Specialization Branch'}
                  </label>
                  <select
                    id="branch-select"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject-select">Subject</label>
                  <select
                    id="subject-select"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                    <option value="custom">✍️ Add Custom/Other Subject</option>
                  </select>
                </div>
              </div>

              {/* Conditional custom subject text field */}
              {subjectId === 'custom' && (
                <div className="form-group animate-slide-down">
                  <label htmlFor="custom-subject-input">Specify Subject Name</label>
                  <input
                    id="custom-subject-input"
                    type="text"
                    placeholder="e.g. Operating Systems / Parallel Computing"
                    value={customSubjectName}
                    onChange={(e) => setCustomSubjectName(e.target.value)}
                    required
                  />
                  {isBranchComingSoon && (
                    <span className="info-tag">
                      Note: This branch subjects are not fully populated yet. Typing your subject will help us add it.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Section 3: PYQ Metadata */}
            {resourceType === 'pyq' && (
              <div className="form-section pyq-fields animate-slide-down">
                <h3><FileCheck className="section-icon" /> PYQ Details</h3>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label htmlFor="code-input">Course Code</label>
                    <input
                      id="code-input"
                      type="text"
                      placeholder="e.g. UTA018"
                      value={subjectCode}
                      onChange={(e) => setSubjectCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exam-select">Exam Type</label>
                    <select
                      id="exam-select"
                      value={examType}
                      onChange={(e) => setExamType(e.target.value)}
                    >
                      <option value="MST">MST (Mid-Sem)</option>
                      <option value="EST">EST (End-Sem)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="paper-year-select">Paper Year</label>
                    <select
                      id="paper-year-select"
                      value={paperYear}
                      onChange={(e) => setPaperYear(e.target.value)}
                    >
                      {['2025', '2024', '2023', '2022', '2021', '2020'].map(yr => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Resource Info */}
            <div className="form-section">
              <h3><Link2 className="section-icon" /> Resource Source Mode</h3>
              
              {/* Tabs for choosing between File upload or link */}
              <div className="contribute-tabs">
                <button
                  type="button"
                  className={`contrib-tab-btn ${uploadMode === 'file' ? 'active' : ''}`}
                  onClick={() => { setUploadMode('file'); setErrorMsg(''); }}
                >
                  <Paperclip size={14} />
                  Direct File Upload
                </button>
                <button
                  type="button"
                  className={`contrib-tab-btn ${uploadMode === 'link' ? 'active' : ''}`}
                  onClick={() => { setUploadMode('link'); setErrorMsg(''); }}
                >
                  <Link2 size={14} />
                  Shareable Document Link
                </button>
              </div>

              {/* Direct File Upload Content */}
              {uploadMode === 'file' ? (
                <div className="file-upload-block animate-slide-down">
                  {!selectedFile ? (
                    <div className="file-dropzone">
                      <Upload className="dropzone-icon animate-pulse" />
                      <p>Drag and drop your document file here, or click to browse</p>
                      <span className="dropzone-subtext">Supports PDF, PNG, JPG (Max 10MB)</span>
                      <input
                        type="file"
                        className="file-input-hidden"
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                    </div>
                  ) : (
                    <div className="file-preview-card">
                      <div className="preview-info">
                        <FileText className="preview-icon" />
                        <div className="preview-text">
                          <span className="file-name">{fileName}</span>
                          <span className="file-size">{fileSize}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-remove-file"
                        onClick={handleRemoveFile}
                        title="Remove file"
                        disabled={isUploading}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  {selectedFile && (
                    <div className="form-group" style={{ marginTop: '16px' }}>
                      <label htmlFor="title-input-file">Resource Document Title</label>
                      <input
                        id="title-input-file"
                        type="text"
                        placeholder="e.g. Calculus Mid-Sem Solved Paper 2024"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isUploading}
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* External Shareable Link Content */
                <div className="link-upload-block animate-slide-down">
                  <div className="form-group">
                    <label htmlFor="title-input">Resource Title</label>
                    <input
                      id="title-input"
                      type="text"
                      placeholder="e.g. Calculus Mid-Sem Solved Paper 2024 (Pool A)"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-grid-2" style={{ marginTop: '16px' }}>
                    <div className="form-group">
                      <label htmlFor="link-input">Document Download Link</label>
                      <input
                        id="link-input"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="size-input">File Size (Optional)</label>
                      <input
                        id="size-input"
                        type="text"
                        placeholder="e.g. 1.8 MB (Defaults to 'Link')"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-cosmic btn-glow btn-submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 1s linear infinite',
                      marginRight: '8px'
                    }}></div>
                    <span>Uploading to Cloud...</span>
                  </>
                ) : (
                  <>
                    <Upload className="btn-icon" />
                    <span>Submit to Queue</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </main>

        <section className="contribute-rules">
          <div className="rules-icon"><HelpCircle /></div>
          <div>
            <h4>Guidelines for Contributing</h4>
            <ul>
              <li>For direct uploads, ensure files are under **10MB** (PDF, images) for host storage compatibility.</li>
              <li>For shareable links, set the document access permissions in Google Drive/OneDrive to "Anyone with the link can view".</li>
              <li>Verify that files do not contain personal grades, passwords, or personal identifying numbers before uploading.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
