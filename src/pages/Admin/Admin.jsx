import { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  FileText,
  Link as LinkIcon,
  User,
  Calendar,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Info,
  X,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  FileCheck,
  LogIn,
  LogOut,
  ShieldAlert,
  Bell,
  Tag,
  Edit,
} from 'lucide-react';
import { resourceTypes } from '../../utils/resourcesData';
import {
  getAcademicData,
  addResource,
  deleteResource,
  resetDatabase,
  exportAsJSCode,
} from '../../utils/resourceDb';
import {
  getPendingContributions,
  approveContribution,
  rejectContribution,
} from '../../utils/contributionDb';
import {
  getPyqData,
  deletePyq,
  resetPyqDatabase,
} from '../../utils/pyqDb';
import { getDownloadLink } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { ADMIN_EMAILS } from '../../utils/constants';
import { getAnnouncements, addAnnouncement, deleteAnnouncement } from '../../utils/announcementsDb';
import './Admin.css';

export default function Admin() {
  const { user, loading: authLoading, loginWithGoogle, logout } = useAuth();
  const [academicData, setAcademicData] = useState([]);
  const [activeTab, setActiveTab] = useState('resources'); // 'resources', 'moderation', 'pyqs'
  const [pendingContributions, setPendingContributions] = useState([]);
  const [pyqs, setPyqs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  
  // Form states for Announcements
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState('general');
  const [annImportant, setAnnImportant] = useState(false);
  const [annLink, setAnnLink] = useState('');
  const [editingAnnId, setEditingAnnId] = useState(null);
  
  // Selection states for Resource manager
  const [selectedYearId, setSelectedYearId] = useState(1);
  const [selectedBranchId, setSelectedBranchId] = useState('pool-a');
  const [selectedSubjectId, setSelectedSubjectId] = useState('calculus');
  const [selectedTypeId, setSelectedTypeId] = useState('notes');

  // Form states for Resource manager
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [size, setSize] = useState('');

  // PYQ search state
  const [pyqSearch, setPyqSearch] = useState('');

  // UI States
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportedCode, setExportedCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Load database on mount
  useEffect(() => {
    async function loadAdminData() {
      try {
        const academic = await getAcademicData();
        setAcademicData(academic);
        
        const pending = await getPendingContributions();
        setPendingContributions(pending);
        
        const pyqsList = await getPyqData();
        setPyqs(pyqsList);

        const annList = await getAnnouncements();
        setAnnouncements(annList);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
    }
    loadAdminData();
  }, []);

  // Show Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type });
    }, 4000);
  };

  // Sync selectors when Year changes
  const handleYearChange = (yearId) => {
    setSelectedYearId(yearId);
    const year = academicData.find((y) => y.id === yearId);
    if (year && year.branches.length > 0) {
      const branch = year.branches[0];
      setSelectedBranchId(branch.id);
      if (branch.subjects && branch.subjects.length > 0) {
        setSelectedSubjectId(branch.subjects[0].id);
      } else {
        setSelectedSubjectId('');
      }
    }
  };

  // Sync selectors when Branch changes
  const handleBranchChange = (branchId) => {
    setSelectedBranchId(branchId);
    const year = academicData.find((y) => y.id === selectedYearId);
    if (year) {
      const branch = year.branches.find((b) => b.id === branchId);
      if (branch && branch.subjects && branch.subjects.length > 0) {
        setSelectedSubjectId(branch.subjects[0].id);
      } else {
        setSelectedSubjectId('');
      }
    }
  };

  // Resolve current selections for Resource Hub manager
  const currentYear = academicData.find((y) => y.id === selectedYearId);
  const currentBranch = currentYear?.branches.find((b) => b.id === selectedBranchId);
  const currentSubject = currentBranch?.subjects?.find((s) => s.id === selectedSubjectId);
  const resourcesList = currentSubject?.resources?.[selectedTypeId] || [];

  // Form submission handler for Resource manager
  const handleAddResource = async (e) => {
    e.preventDefault();

    if (!selectedSubjectId) {
      showToast('Please select a valid subject first.', 'error');
      return;
    }
    if (!title.trim()) {
      showToast('Please enter a resource title.', 'error');
      return;
    }

    const defaultSize = link.includes('youtube.com') || link.includes('youtu.be') ? 'Video' : 'Link';
    
    const newResource = {
      id: `res-${Date.now()}`,
      title: title.trim(),
      date: new Date().toISOString().split('T')[0],
      size: size.trim() || defaultSize,
      downloads: 0,
      isLink: true,
      link: link.trim() || '#',
    };

    try {
      const updatedData = await addResource(
        selectedYearId,
        selectedBranchId,
        selectedSubjectId,
        selectedTypeId,
        newResource
      );

      setAcademicData(updatedData);
      setTitle('');
      setLink('');
      setSize('');
      showToast(`"${newResource.title}" added successfully!`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to add resource to database.', 'error');
    }
  };

  // Resource deletion handler
  const handleDeleteResource = async (resourceId, resTitle) => {
    if (window.confirm(`Are you sure you want to delete "${resTitle}"?`)) {
      try {
        const updatedData = await deleteResource(
          selectedYearId,
          selectedBranchId,
          selectedSubjectId,
          selectedTypeId,
          resourceId
        );
        setAcademicData(updatedData);
        showToast('Resource deleted successfully.', 'info');
      } catch (err) {
        console.error(err);
        showToast('Failed to delete resource.', 'error');
      }
    }
  };

  // Database reset handler
  const handleResetDatabase = async () => {
    if (
      window.confirm(
        'WARNING: Are you sure you want to reset all academic data? This will wipe all newly added resources and restore the empty template.'
      )
    ) {
      try {
        const updatedData = await resetDatabase();
        setAcademicData(updatedData);
        showToast('Database has been reset to defaults.', 'info');
      } catch (err) {
        console.error(err);
        showToast('Failed to reset database.', 'error');
      }
    }
  };

  // Export handler
  const handleExport = () => {
    const code = exportAsJSCode();
    setExportedCode(code);
    setShowExportModal(true);

    // Trigger local file download
    try {
      const blob = new Blob([code], { type: 'text/javascript;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const linkElem = document.createElement('a');
      linkElem.href = url;
      linkElem.setAttribute('download', 'resourcesData.js');
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
      URL.revokeObjectURL(url);
      showToast('File downloaded! Replace src/utils/resourcesData.js with it.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Download failed. You can copy the code from the popup instead.', 'error');
    }
  };

  // Copy code helper
  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportedCode);
    setCopied(true);
    showToast('Code copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Moderation Handlers ───
  const handleApprove = async (id, contribTitle) => {
    try {
      const updatedQueue = await approveContribution(id);
      setPendingContributions(updatedQueue);
      
      // Refresh databases
      const academic = await getAcademicData();
      setAcademicData(academic);
      const pyqsList = await getPyqData();
      setPyqs(pyqsList);
      showToast(`Approved and published: "${contribTitle}"`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to approve contribution.', 'error');
    }
  };

  const handleReject = async (id, contribTitle) => {
    if (window.confirm(`Are you sure you want to reject and delete "${contribTitle}"?`)) {
      try {
        const updatedQueue = await rejectContribution(id);
        setPendingContributions(updatedQueue);
        showToast(`Rejected and removed contribution: "${contribTitle}"`, 'info');
      } catch (err) {
        console.error(err);
        showToast('Failed to reject contribution.', 'error');
      }
    }
  };

  // ─── PYQ Tab Handlers ───
  const handleDeletePyqItem = async (id, subjectCode, examType) => {
    if (window.confirm(`Delete ${subjectCode} ${examType} paper?`)) {
      try {
        const updated = await deletePyq(id);
        setPyqs(updated);
        showToast(`${subjectCode} ${examType} paper removed successfully.`, 'info');
      } catch (err) {
        console.error(err);
        showToast('Failed to delete paper.', 'error');
      }
    }
  };

  const handleResetPyqs = async () => {
    if (window.confirm('WARNING: Are you sure you want to reset the PYQ database? This will restore initial mock values.')) {
      try {
        const updated = await resetPyqDatabase();
        setPyqs(updated);
        showToast('PYQ database has been reset to defaults.', 'info');
      } catch (err) {
        console.error(err);
        showToast('Failed to reset PYQ database.', 'error');
      }
    }
  };

  // Filtered PYQs for PYQ tab search
  const filteredPyqs = useMemo(() => {
    if (!pyqSearch.trim()) return pyqs;
    return pyqs.filter(p => 
      p.subjectCode.toLowerCase().includes(pyqSearch.toLowerCase()) ||
      p.subjectName.toLowerCase().includes(pyqSearch.toLowerCase()) ||
      p.branch.toLowerCase().includes(pyqSearch.toLowerCase())
    );
  }, [pyqs, pyqSearch]);

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!annTitle.trim()) {
      showToast('Please enter an announcement title.', 'error');
      return;
    }
    const annData = {
      title: annTitle.trim(),
      content: annContent.trim(),
      category: annCategory,
      important: annImportant,
      link: annLink.trim(),
      date: editingAnnId 
        ? announcements.find(a => a.id === editingAnnId)?.date || new Date().toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0]
    };
    
    if (editingAnnId) {
      annData.id = editingAnnId;
    }

    try {
      const updated = await addAnnouncement(annData);
      setAnnouncements(updated);
      setAnnTitle('');
      setAnnContent('');
      setAnnCategory('general');
      setAnnImportant(false);
      setAnnLink('');
      setEditingAnnId(null);
      showToast(
        editingAnnId 
          ? 'Announcement updated successfully!' 
          : 'Announcement published successfully!', 
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast(
        editingAnnId 
          ? 'Failed to update announcement.' 
          : 'Failed to publish announcement.', 
        'error'
      );
    }
  };

  const handleStartEditAnnouncement = (ann) => {
    setAnnTitle(ann.title);
    setAnnContent(ann.content || '');
    setAnnCategory(ann.category || 'general');
    setAnnImportant(!!ann.important);
    setAnnLink(ann.link || '');
    setEditingAnnId(ann.id);
    
    const formElement = document.querySelector('.panel-config');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setAnnTitle('');
    setAnnContent('');
    setAnnCategory('general');
    setAnnImportant(false);
    setAnnLink('');
    setEditingAnnId(null);
  };

  const handleDeleteAnnouncement = async (id, title) => {
    if (window.confirm(`Delete announcement "${title}"?`)) {
      try {
        const updated = await deleteAnnouncement(id);
        setAnnouncements(updated);
        showToast('Announcement deleted successfully.', 'info');
      } catch (err) {
        console.error(err);
        showToast('Failed to delete announcement.', 'error');
      }
    }
  };

  if (authLoading) {
    return (
      <div className="admin-page success-state" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '65vh' }}>
        <div className="resources-loading-container" style={{ margin: 'auto' }}>
          <div className="resources-loading-spinner" style={{ margin: '0 auto 16px auto' }}></div>
          <p>Verifying credentials...</p>
        </div>
      </div>
    );
  }

  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  if (!isAdmin) {
    return (
      <div className="admin-page success-state" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="success-card glass-panel text-center" style={{ maxWidth: '480px', padding: '40px' }}>
          <ShieldAlert className="success-icon animate-pulse" size={48} style={{ color: '#ef4444', margin: '0 auto var(--space-4) auto' }} />
          <h1 style={{ color: '#f87171', fontSize: '1.75rem', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Access Denied</h1>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '24px', fontSize: '0.95rem' }}>
            This administrator panel is restricted to authorized credentials. You do not have permissions to view this dashboard.
          </p>
          <div className="button-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!user ? (
              <button className="btn-cosmic btn-glow" onClick={loginWithGoogle} style={{ width: '100%' }}>
                <LogIn size={16} style={{ marginRight: '8px' }} />
                Sign In with Admin Account
              </button>
            ) : (
              <button className="btn-cosmic btn-glow" onClick={logout} style={{ width: '100%', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
                <LogOut size={16} style={{ marginRight: '8px' }} />
                Switch Account / Sign Out
              </button>
            )}
            <Link to="/" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textDecoration: 'underline', marginTop: '8px' }}>
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Toast Alert */}
      {toast.show && (
        <div className={`admin-toast ${toast.type}`}>
          <Info size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-title">
            <Shield className="admin-shield-icon" size={26} />
            <h1>Admin Dashboard</h1>
          </div>
          <p>Manage Thapar Atlas course materials, review student contributions, and control the flat PYQ database.</p>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <BookOpen size={16} />
            <span>Resource Hub</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'moderation' ? 'active' : ''}`}
            onClick={async () => {
              setActiveTab('moderation');
              try {
                const pending = await getPendingContributions();
                setPendingContributions(pending);
              } catch (err) {
                console.error('Failed to reload pending contributions:', err);
              }
            }}
          >
            <Clock size={16} />
            <span>Moderation Queue</span>
            {pendingContributions.length > 0 && (
              <span className="tab-badge pulse-badge">{pendingContributions.length}</span>
            )}
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'pyqs' ? 'active' : ''}`}
            onClick={async () => {
              setActiveTab('pyqs');
              try {
                const pyqsList = await getPyqData();
                setPyqs(pyqsList);
              } catch (err) {
                console.error('Failed to reload PYQ list:', err);
              }
            }}
          >
            <FileText size={16} />
            <span>PYQ Manager</span>
            <span className="tab-badge secondary">{pyqs.length}</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={async () => {
              setActiveTab('announcements');
              try {
                const data = await getAnnouncements();
                setAnnouncements(data);
              } catch (err) {
                console.error('Failed to reload announcements:', err);
              }
            }}
          >
            <Bell size={16} />
            <span>Announcements</span>
            <span className="tab-badge secondary">{announcements.length}</span>
          </button>
        </div>

        {/* ═════════ TAB 1: RESOURCE HUB MANAGER ═════════ */}
        {activeTab === 'resources' && (
          <>
            {/* Top Tools Bar */}
            <div className="admin-quick-actions">
              <div className="action-info">
                <Info size={16} />
                <span>Add materials pool-wise. Click Export to save changes to code when finished.</span>
              </div>
              <div className="action-buttons">
                <button className="btn-secondary text-red" onClick={handleResetDatabase} title="Reset all entries">
                  <RotateCcw size={16} />
                  Reset Database
                </button>
                <button className="btn-primary" onClick={handleExport} title="Download updated resourcesData.js">
                  <Download size={16} />
                  Export Data File
                </button>
              </div>
            </div>

            {/* Main Grid */}
            <div className="admin-main-grid">
              
              {/* Left Column: Form & Configuration */}
              <div className="admin-card panel-config">
                <h2>Add New Resource</h2>
                
                <form onSubmit={handleAddResource} className="admin-form">
                  {/* Year Select */}
                  <div className="form-group">
                    <label>Academic Year</label>
                    <select 
                      value={selectedYearId} 
                      onChange={(e) => handleYearChange(Number(e.target.value))}
                    >
                      {academicData.map((y) => (
                        <option key={y.id} value={y.id}>
                          {y.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Branch / Pool Select */}
                  {currentYear && (
                    <div className="form-group">
                      <label>{selectedYearId === 1 ? 'Subject Pool' : 'Specialization Branch'}</label>
                      <select 
                        value={selectedBranchId} 
                        onChange={(e) => handleBranchChange(e.target.value)}
                      >
                        {currentYear.branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} {b.comingSoon ? '(Coming Soon)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Subject Select */}
                  {currentBranch && !currentBranch.comingSoon && (
                    <div className="form-group">
                      <label>Subject</label>
                      <select 
                        value={selectedSubjectId} 
                        onChange={(e) => setSelectedSubjectId(e.target.value)}
                      >
                        {currentBranch.subjects.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Coming Soon Alert */}
                  {currentBranch && currentBranch.comingSoon && (
                    <div className="coming-soon-warning">
                      <AlertTriangle size={18} />
                      <div>
                        <h4>Branch is set to 'Coming Soon'</h4>
                        <p>To upload materials for this branch, edit <code>resourcesData.js</code> to set <code>comingSoon: false</code> and define its subjects.</p>
                      </div>
                    </div>
                  )}

                  {/* Resource Type */}
                  {currentBranch && !currentBranch.comingSoon && (
                    <div className="form-group">
                      <label>Resource Type / Category</label>
                      <select 
                        value={selectedTypeId} 
                        onChange={(e) => setSelectedTypeId(e.target.value)}
                      >
                        {resourceTypes.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Separator */}
                  {currentBranch && !currentBranch.comingSoon && <hr className="form-divider" />}

                  {/* Resource Data Fields */}
                  {currentBranch && !currentBranch.comingSoon && (
                    <>
                      <div className="form-group">
                        <label>Resource Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Mid Semester PYQ 2024" 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Google Drive Link or URL</label>
                        <input 
                          type="url" 
                          placeholder="e.g. https://drive.google.com/..." 
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>File Size / Info</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 3.4 MB (Optional)" 
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        />
                      </div>

                      <button type="submit" className="btn-primary btn-block btn-submit">
                        <Plus size={18} />
                        Add Resource
                      </button>
                    </>
                  )}
                </form>
              </div>

              {/* Right Column: Existing Resources */}
              <div className="admin-card panel-list">
                <div className="panel-list-header">
                  <h2>Current Resources</h2>
                  {currentSubject && !currentBranch.comingSoon && (
                    <span className="res-badge">
                      {currentSubject.name} — {resourceTypes.find((t) => t.id === selectedTypeId)?.label}
                    </span>
                  )}
                </div>

                {currentBranch && currentBranch.comingSoon ? (
                  <div className="list-empty-state">
                    <AlertTriangle size={36} />
                    <p>This branch is coming soon and has no active subjects to view.</p>
                  </div>
                ) : resourcesList.length > 0 ? (
                  <div className="admin-resources-list">
                    {resourcesList.map((res) => (
                      <div key={res.id} className="admin-resource-item">
                        <div className="item-details">
                          <h3>{res.title}</h3>
                          <div className="item-meta">
                            <span>
                              <Calendar size={12} />
                              {res.date}
                            </span>
                            <span>
                              <FileText size={12} />
                              {res.size}
                            </span>
                            {res.link && res.link !== '#' && (
                              <a href={getDownloadLink(res.link)} target="_blank" rel="noopener noreferrer" className="item-link">
                                <LinkIcon size={12} />
                                View Link
                                <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </div>
                        <button 
                          className="btn-delete" 
                          onClick={() => handleDeleteResource(res.id, res.title)}
                          title="Delete resource"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="list-empty-state">
                    <BookOpen size={36} />
                    <p>No resources found for this subject and category.</p>
                    <span className="empty-subtext">Use the form on the left to add the first resource!</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ═════════ TAB 2: MODERATION QUEUE ═════════ */}
        {activeTab === 'moderation' && (
          <div className="admin-card full-width-panel">
            <div className="panel-list-header">
              <h2>Pending Contributions Queue</h2>
              <span className="res-badge purple">
                {pendingContributions.length} items awaiting review
              </span>
            </div>

            {pendingContributions.length > 0 ? (
              <div className="moderation-queue-list">
                {pendingContributions.map((contrib) => (
                  <div key={contrib.id} className="moderation-item-card">
                    <div className="mod-header-details">
                      <span className="contrib-type-tag">
                        {resourceTypes.find((t) => t.id === contrib.resourceType)?.label || contrib.resourceType.toUpperCase()}
                      </span>
                      {contrib.resourceType === 'pyq' && (
                        <span className="pyq-badge-meta font-mono">
                          {contrib.subjectCode} • {contrib.examType} ({contrib.paperYear})
                        </span>
                      )}
                      <span className="contrib-date-tag">
                        Submitted: {contrib.date}
                      </span>
                    </div>

                    <div className="mod-body-details">
                      <h3 className="mod-title">{contrib.title}</h3>
                      
                      <div className="mod-details-grid">
                        <div className="detail-point">
                          <span className="point-label">Contributor:</span>
                          <span className="point-val font-semibold">{contrib.contributorName}</span>
                        </div>
                        <div className="detail-point">
                          <span className="point-label">Alignment:</span>
                          <span className="point-val">
                            {contrib.yearId} Year • {contrib.branchId.toUpperCase()}
                          </span>
                        </div>
                        <div className="detail-point">
                          <span className="point-label">Resolved Subject:</span>
                          <span className="point-val">{contrib.subjectName}</span>
                        </div>
                        <div className="detail-point">
                          <span className="point-label">Size:</span>
                          <span className="point-val font-mono">{contrib.size}</span>
                        </div>
                      </div>

                      {/* Download Link */}
                      <div className="mod-link-row">
                        <span className="point-label">Verification Link:</span>
                        {contrib.isDirectUpload ? (
                          <a 
                            href={getDownloadLink(contrib.link)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="verify-document-link"
                          >
                            <ExternalLink size={14} />
                            <span>View Uploaded File</span>
                          </a>
                        ) : (
                          <a 
                            href={getDownloadLink(contrib.link)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="verify-document-link"
                          >
                            <LinkIcon size={14} />
                            <span>Open Drive Link</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mod-actions-row">
                      <button 
                        className="btn-approve-action"
                        onClick={() => handleApprove(contrib.id, contrib.title)}
                      >
                        <CheckCircle size={16} />
                        Approve & Publish
                      </button>
                      <button 
                        className="btn-reject-action"
                        onClick={() => handleReject(contrib.id, contrib.title)}
                      >
                        <XCircle size={16} />
                        Reject & Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="list-empty-state centered-empty">
                <CheckCircle className="empty-icon-success" size={48} />
                <p>All clean! Moderation queue is empty.</p>
                <span className="empty-subtext">New student submissions from the Contribute page will appear here.</span>
              </div>
            )}
          </div>
        )}

        {/* ═════════ TAB 3: PYQ HUB MANAGER ═════════ */}
        {activeTab === 'pyqs' && (
          <div className="admin-card full-width-panel">
            <div className="panel-list-header pyq-panel-header">
              <div className="title-left">
                <h2>PYQ Archive Manager</h2>
                <span className="res-badge gold">{pyqs.length} papers in hub</span>
              </div>
              <div className="action-buttons">
                <button className="btn-secondary text-red" onClick={handleResetPyqs}>
                  <RotateCcw size={14} />
                  Reset PYQs
                </button>
              </div>
            </div>

            {/* Quick search */}
            <div className="pyq-search-bar">
              <Filter size={16} className="search-icon-filter" />
              <input
                type="text"
                placeholder="Search archive by code, subject name, or branch..."
                value={pyqSearch}
                onChange={(e) => setPyqSearch(e.target.value)}
              />
              {pyqSearch && (
                <button className="btn-clear-search" onClick={() => setPyqSearch('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            {filteredPyqs.length > 0 ? (
              <div className="admin-pyq-table-container">
                <table className="admin-pyq-table">
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject Name</th>
                      <th>Study Year</th>
                      <th>Branch</th>
                      <th>Exam Type</th>
                      <th>Paper Year</th>
                      <th>Downloads</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPyqs.map((paper) => (
                      <tr key={paper.id}>
                        <td className="font-mono font-bold">{paper.subjectCode}</td>
                        <td>{paper.subjectName}</td>
                        <td>{paper.studyYear === 1 ? '1st' : paper.studyYear === 2 ? '2nd' : paper.studyYear === 3 ? '3rd' : '4th'} Year</td>
                        <td>{paper.branch}</td>
                        <td>
                          <span className={`exam-badge ${paper.examType.toLowerCase()}`}>
                            {paper.examType}
                          </span>
                        </td>
                        <td className="font-mono">{paper.paperYear}</td>
                        <td className="font-mono text-center">{paper.downloads || 0}</td>
                        <td>
                          <button 
                            className="btn-table-delete"
                            onClick={() => handleDeletePyqItem(paper.id, paper.subjectCode, paper.examType)}
                            title="Delete paper"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="list-empty-state">
                <FileCheck size={36} />
                <p>No papers match your search queries.</p>
              </div>
            )}
          </div>
        )}

        {/* ═════════ TAB 4: ANNOUNCEMENTS MANAGER ═════════ */}
        {activeTab === 'announcements' && (
          <div className="admin-main-grid">
            {/* Left Column: Create Announcement */}
            <div className="admin-card panel-config">
              <h2>{editingAnnId ? 'Edit Announcement' : 'Publish Announcement'}</h2>
              <form onSubmit={handleAddAnnouncement} className="admin-form">
                <div className="form-group">
                  <label>Announcement Title</label>
                  <input
                    type="text"
                    placeholder="e.g. End Semester Exams schedule released"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description / Content</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about the update..."
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '10px', color: 'var(--color-text-primary)', width: '100%', resize: 'vertical' }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={annCategory}
                    onChange={(e) => setAnnCategory(e.target.value)}
                  >
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="society">Societies</option>
                    <option value="event">Events</option>
                    <option value="placement">Placements</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>External URL / PDF Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="e.g. https://www.thapar.edu/..."
                    value={annLink}
                    onChange={(e) => setAnnLink(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    id="annImportant"
                    checked={annImportant}
                    onChange={(e) => setAnnImportant(e.target.checked)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="annImportant" style={{ marginBottom: 0, cursor: 'pointer' }}>
                    Mark as Important / Urgent
                  </label>
                </div>

                {editingAnnId ? (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button type="submit" className="btn-primary btn-block btn-submit" style={{ margin: 0, flex: 1 }}>
                      <Check size={18} />
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      onClick={handleCancelEdit} 
                      className="btn-secondary btn-block" 
                      style={{ margin: 0, flex: 1 }}
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button type="submit" className="btn-primary btn-block btn-submit" style={{ marginTop: '16px' }}>
                    <Plus size={18} />
                    Publish Update
                  </button>
                )}
              </form>
            </div>

            {/* Right Column: Manage Announcements */}
            <div className="admin-card panel-list">
              <div className="panel-list-header">
                <h2>Active Announcements</h2>
                <span className="res-badge gold">{announcements.length} updates</span>
              </div>

              {announcements.length > 0 ? (
                <div className="admin-resources-list">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="admin-resource-item">
                      <div className="item-details">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', fontWeight: '600' }}>
                          {ann.title}
                          {ann.important && (
                            <span className="res-badge text-red" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.7rem', padding: '2px 6px', color: '#f87171', borderRadius: '4px' }}>
                              Urgent
                            </span>
                          )}
                        </h3>
                        <div className="item-meta">
                          <span>
                            <Calendar size={12} />
                            {ann.date}
                          </span>
                          <span style={{ textTransform: 'capitalize' }}>
                            <Tag size={12} />
                            {ann.category}
                          </span>
                          {ann.link && (
                            <a href={ann.link} target="_blank" rel="noopener noreferrer" className="item-link">
                              <LinkIcon size={12} />
                              Link
                              <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="item-actions">
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => handleStartEditAnnouncement(ann)}
                          title="Edit announcement"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => handleDeleteAnnouncement(ann.id, ann.title)}
                          title="Delete announcement"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="list-empty-state">
                  <Bell size={36} />
                  <p>No active announcements.</p>
                  <span className="empty-subtext">Publish an update to display it on the campus feed.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Export Modal overlay */}
      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Export File Code</h3>
              <button className="btn-close" onClick={() => setShowExportModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p>
                Your download has been triggered. If it didn't start, or if you prefer to copy the code manually, copy the text below and replace the contents of:
                <br />
                <code>src/utils/resourcesData.js</code>
              </p>
              
              <div className="code-box-container">
                <button className="btn-copy" onClick={handleCopyCode}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <textarea 
                  className="code-box" 
                  readOnly 
                  value={exportedCode} 
                  onClick={(e) => e.target.select()}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowExportModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
