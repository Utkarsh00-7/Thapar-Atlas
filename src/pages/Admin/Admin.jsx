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
  BadgeCheck,
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
  FolderOpen,
  Mail,
  MessageSquare,
  Bug,
  Sparkles,
  Users
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
import { 
  getFeedbacks, 
  deleteFeedback, 
  restrictUser, 
  banUser, 
  getRestrictions, 
  removeUserRestriction, 
  getAppeals, 
  deleteAppeal 
} from '../../utils/feedbackDb';
import { getAllStudentProfiles } from '../../utils/studentDb';
import { getSystemConfig, updateSystemConfig } from '../../utils/systemConfig';
import { db } from '../../utils/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { Activity, RefreshCw } from 'lucide-react';
import './Admin.css';

export default function Admin() {
  const { user, loading: authLoading, loginWithGoogle, logout } = useAuth();
  const [academicData, setAcademicData] = useState([]);
  const [activeTab, setActiveTab] = useState('resources'); // 'resources', 'moderation', 'feedback', 'appeals'
  const [academicsSubTab, setAcademicsSubTab] = useState('resources'); // 'resources' | 'pyqs'
  const [pendingContributions, setPendingContributions] = useState([]);
  const [pyqs, setPyqs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [appeals, setAppeals] = useState([]);
  const [students, setStudents] = useState([]);
  const [useRealtimeStats, setUseRealtimeStats] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    activeViewers: 0,
    totalStudents: 0,
    totalResources: 0,
    totalPyqs: 0,
    pendingContributions: 0,
    totalFeedbacks: 0,
    activeViewersList: []
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [studentSearch, setStudentSearch] = useState('');
  
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

        const fbList = await getFeedbacks();
        setFeedbacks(fbList);

        const restList = await getRestrictions();
        setRestrictions(restList);

        const appList = await getAppeals();
        setAppeals(appList);

        const studentList = await getAllStudentProfiles();
        setStudents(studentList);

        const systemConfig = await getSystemConfig();
        setUseRealtimeStats(!!systemConfig.useRealtimeStats);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
    }
    loadAdminData();
  }, []);

  const handleToggleRealtimeStats = async () => {
    const newVal = !useRealtimeStats;
    setUseRealtimeStats(newVal);
    const success = await updateSystemConfig({ useRealtimeStats: newVal });
    if (success) {
      showToast(newVal ? 'Enabled live landing page statistics.' : 'Disabled live statistics (using mock stats).', 'success');
    } else {
      setUseRealtimeStats(!newVal); // fallback on failure
      showToast('Failed to update system statistics mode.', 'error');
    }
  };

  const loadAnalyticsData = async () => {
    setAnalyticsLoading(true);
    try {
      // 1. Fetch all student profiles to count total and filter active
      const studentList = await getAllStudentProfiles();
      const now = Date.now();
      const threeMinsAgo = now - 180000;
      
      const activeStudents = studentList.filter(s => s.lastActive && s.lastActive >= threeMinsAgo);
      
      // 2. Fetch pending count
      const pendingList = await getPendingContributions();
      
      // 3. Fetch academic resource count via count query
      const resourcesColl = collection(db, 'resources');
      const resourcesSnapshot = await getCountFromServer(resourcesColl);
      const totalResources = resourcesSnapshot.data().count;

      // 4. Fetch PYQ count
      const pyqsColl = collection(db, 'pyqs');
      const pyqsSnapshot = await getCountFromServer(pyqsColl);
      const totalPyqs = pyqsSnapshot.data().count;

      // 5. Fetch feedback count
      const feedbackList = await getFeedbacks();
      
      setAnalyticsData({
        activeViewers: activeStudents.length,
        totalStudents: studentList.length,
        totalResources,
        totalPyqs,
        pendingContributions: pendingList.length,
        totalFeedbacks: feedbackList.filter(f => f.status !== 'deleted').length,
        activeViewersList: activeStudents
      });
    } catch (err) {
      console.error('Failed to load system analytics:', err);
      showToast('Failed to retrieve system metrics.', 'error');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // Show Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type });
    }, 4000);
  };

  // Handle Restrict User (24 Hours)
  const handleRestrictUser = async (email) => {
    if (!email) return;
    const reason = window.prompt("Enter reason for 24-hour restriction:");
    if (reason === null) return; // user cancelled
    try {
      await restrictUser(email, 24, reason || "No reason specified");
      const activeRestrictions = await getRestrictions();
      setRestrictions(activeRestrictions);
      showToast(`Restricted user ${email} for 24 hours.`, 'info');
    } catch (err) {
      console.error(err);
      showToast('Failed to restrict user.', 'error');
    }
  };

  // Handle Ban User (Permanent)
  const handleBanUser = async (email) => {
    if (!email) return;
    const reason = window.prompt("Enter reason for permanent ban:");
    if (reason === null) return; // user cancelled
    try {
      await banUser(email, reason || "No reason specified");
      const activeRestrictions = await getRestrictions();
      setRestrictions(activeRestrictions);
      showToast(`Permanently banned user ${email}.`, 'info');
    } catch (err) {
      console.error(err);
      showToast('Failed to ban user.', 'error');
    }
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
        <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="admin-header-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield className="admin-shield-icon" size={26} style={{ color: 'var(--color-accent)' }} />
              <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
            </div>
            <p style={{ marginTop: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              Manage Thapar Atlas course materials, review student contributions, and control the flat PYQ database.
            </p>
          </div>
          
          {/* Real-time Stats Toggle Widget */}
          <div className="glass-panel" style={{ padding: '12px 18px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>Live Landing Page Stats</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{useRealtimeStats ? 'Showing actual database counts' : 'Showing static mock stats'}</span>
            </div>
            <label className="stats-toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={useRealtimeStats} 
                onChange={handleToggleRealtimeStats} 
                style={{ opacity: 0, width: 0, height: 0 }} 
              />
              <span style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: useRealtimeStats ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                transition: '0.3s',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '16px',
                  width: '16px',
                  left: useRealtimeStats ? '23px' : '3px',
                  bottom: '3px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  transition: '0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </span>
            </label>
          </div>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={async () => {
              setActiveTab('analytics');
              await loadAnalyticsData();
            }}
          >
            <Activity size={16} style={{ color: activeTab === 'analytics' ? 'var(--color-accent)' : 'inherit' }} />
            <span>Metrics</span>
          </button>
          
          <button 
            className={`admin-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={async () => {
              setActiveTab('resources');
              try {
                const academic = await getAcademicData();
                setAcademicData(academic);
                const pyqsList = await getPyqData();
                setPyqs(pyqsList);
              } catch (err) {
                console.error('Failed to reload academics data:', err);
              }
            }}
          >
            <BookOpen size={16} />
            <span>Academics</span>
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
          <button 
            className={`admin-tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={async () => {
              setActiveTab('feedback');
              try {
                const data = await getFeedbacks();
                setFeedbacks(data);
              } catch (err) {
                console.error('Failed to reload feedbacks:', err);
              }
            }}
          >
            <MessageSquare size={16} />
            <span>Feedback</span>
            {feedbacks.filter(f => f.status !== 'deleted').length > 0 && (
              <span className="tab-badge secondary">{feedbacks.filter(f => f.status !== 'deleted').length}</span>
            )}
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'appeals' ? 'active' : ''}`}
            onClick={async () => {
              setActiveTab('appeals');
              try {
                const data = await getAppeals();
                setAppeals(data);
                const activeRestrictions = await getRestrictions();
                setRestrictions(activeRestrictions);
              } catch (err) {
                console.error('Failed to reload appeals:', err);
              }
            }}
          >
            <ShieldAlert size={16} />
            <span>Appeals</span>
            {appeals.length > 0 && (
              <span className="tab-badge pulse-badge">{appeals.length}</span>
            )}
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={async () => {
              setActiveTab('students');
              try {
                const studentList = await getAllStudentProfiles();
                setStudents(studentList);
              } catch (err) {
                console.error('Failed to reload students list:', err);
              }
            }}
          >
            <Users size={16} />
            <span>Students</span>
            {students.length > 0 && (
              <span className="tab-badge secondary">{students.length}</span>
            )}
          </button>
        </div>

        {/* ═════════ TAB 0: SYSTEM ANALYTICS DASHBOARD ═════════ */}
        {activeTab === 'analytics' && (
          <div className="admin-section glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={20} style={{ color: 'var(--color-accent)' }} /> 
                  System Metrics & Live Activity
                </h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  Monitor online student sessions, academic material volume, and system capacity.
                </p>
              </div>
              <button 
                className="btn-cosmic btn-glow" 
                onClick={loadAnalyticsData} 
                disabled={analyticsLoading}
                style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <RefreshCw size={14} className={analyticsLoading ? 'animate-spin' : ''} />
                Refresh Metrics
              </button>
            </div>

            {/* Metrics Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '32px' }}>
              
              {/* Active Viewers Card */}
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '12px', border: '1px solid rgba(34, 211, 238, 0.2)', background: 'rgba(34, 211, 238, 0.02)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22d3ee', display: 'inline-block', boxShadow: '0 0 8px #22d3ee' }} className="animate-pulse" />
                  <span style={{ fontSize: '0.7rem', color: '#22d3ee', fontWeight: 'bold', textTransform: 'uppercase' }}>Live</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Active Viewers</span>
                <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0', color: '#22d3ee' }}>{analyticsData.activeViewers}</h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Active in last 3 mins</span>
              </div>

              {/* Total Registered Students */}
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.01)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Registered Students</span>
                <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0', color: '#fff' }}>{analyticsData.totalStudents}</h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Total student accounts</span>
              </div>

              {/* Academic Materials */}
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.01)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Total Resources</span>
                <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0', color: '#fff' }}>{analyticsData.totalResources}</h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Course notes & assignments</span>
              </div>

              {/* PYQ Papers */}
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.01)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>PYQ Database Size</span>
                <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0', color: '#fff' }}>{analyticsData.totalPyqs}</h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Exam papers index size</span>
              </div>

              {/* Moderation Queue */}
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.01)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Moderation Queue</span>
                <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0', color: analyticsData.pendingContributions > 0 ? 'var(--color-accent-secondary)' : '#fff' }}>{analyticsData.pendingContributions}</h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Contributions pending review</span>
              </div>

            </div>

            {/* Active Viewers Detail List */}
            <div className="admin-card" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.05rem', color: '#fff' }}>Online Session Registry</h3>
              
              {analyticsData.activeViewersList.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: 'var(--color-text-secondary)' }}>
                        <th style={{ padding: '12px 8px' }}>Student Name</th>
                        <th style={{ padding: '12px 8px' }}>Thapar Email</th>
                        <th style={{ padding: '12px 8px' }}>Last Activity</th>
                        <th style={{ padding: '12px 8px', textAlign: 'right' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.activeViewersList.map((viewer) => {
                        const activeAgo = Math.ceil((Date.now() - (viewer.lastActive || Date.now())) / 1000);
                        let timeStr = 'Just now';
                        if (activeAgo > 60) {
                          timeStr = `${Math.floor(activeAgo / 60)}m ago`;
                        } else if (activeAgo > 0) {
                          timeStr = `${activeAgo}s ago`;
                        }

                        return (
                          <tr key={viewer.id || viewer.email} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', color: 'var(--color-text-primary)' }}>
                            <td style={{ padding: '12px 8px', fontWeight: '500' }}>{viewer.displayName || viewer.name || 'Anonymous'}</td>
                            <td style={{ padding: '12px 8px', color: 'var(--color-text-secondary)' }}>{viewer.email}</td>
                            <td style={{ padding: '12px 8px', fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>{timeStr}</td>
                            <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                              <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', background: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee' }}>
                                Online
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  No student sessions active in the last 3 minutes.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═════════ TAB 1: RESOURCE HUB MANAGER ═════════ */}
        {activeTab === 'resources' && (
          <>
            <div className="academics-sub-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
              <button 
                className={`admin-tab-btn ${academicsSubTab === 'resources' ? 'active' : ''}`}
                style={{
                  background: academicsSubTab === 'resources' ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: academicsSubTab === 'resources' ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                  color: academicsSubTab === 'resources' ? '#fff' : 'var(--color-text-secondary)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                  height: '34px'
                }}
                onClick={() => setAcademicsSubTab('resources')}
              >
                <FolderOpen size={14} />
                Study Materials
              </button>
              <button 
                className={`admin-tab-btn ${academicsSubTab === 'pyqs' ? 'active' : ''}`}
                style={{
                  background: academicsSubTab === 'pyqs' ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: academicsSubTab === 'pyqs' ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                  color: academicsSubTab === 'pyqs' ? '#fff' : 'var(--color-text-secondary)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                  height: '34px'
                }}
                onClick={() => setAcademicsSubTab('pyqs')}
              >
                <FileText size={14} />
                PYQ Hub ({pyqs.length})
              </button>
            </div>

            {academicsSubTab === 'resources' ? (
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
            ) : (
              <div className="admin-card full-width-panel animate-fade-in">
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
                          <th>Exam Type</th>
                          <th>Paper Year</th>
                          <th>File Details</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPyqs.map((paper) => (
                          <tr key={paper.id}>
                            <td className="font-mono font-bold text-accent">{paper.subjectCode}</td>
                            <td>{paper.subjectName}</td>
                            <td className="capitalize">{paper.examType}</td>
                            <td>{paper.paperYear}</td>
                            <td>
                              <a 
                                href={paper.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="verify-document-link"
                                style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                              >
                                <LinkIcon size={12} />
                                View PDF
                              </a>
                            </td>
                            <td>
                              <button 
                                className="btn-icon-action btn-delete" 
                                onClick={() => handleDeletePyqItem(paper.id, paper.subjectCode, paper.examType)}
                                title="Delete paper"
                              >
                                <Trash2 size={13} />
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

        {/* ═════════ TAB 5: FEEDBACK VIEWER ═════════ */}
        {activeTab === 'feedback' && (
          <div className="admin-section glass-panel">
            <div className="section-header">
              <h2><MessageSquare size={20} /> User Feedback & Bug Reports</h2>
              <span className="section-count">{feedbacks.filter(f => f.status !== 'deleted').length} total</span>
            </div>

            {feedbacks.filter(f => f.status !== 'deleted').length > 0 ? (
              <div className="feedback-list">
                {feedbacks.filter(f => f.status !== 'deleted').map((fb) => (
                  <div key={fb.id} className={`feedback-item feedback-type-${fb.type || 'general'}`}>
                    <div className="feedback-item-header">
                      <div className="feedback-meta-left">
                        <span className={`feedback-type-badge type-${fb.type || 'general'}`}>
                          {fb.type === 'bug' && <Bug size={12} />}
                          {fb.type === 'feature' && <Sparkles size={12} />}
                          {fb.type === 'general' && <MessageSquare size={12} />}
                          {!fb.type && <MessageSquare size={12} />}
                          {(fb.type || 'general').toUpperCase()}
                        </span>
                        <span className="feedback-date">
                          <Calendar size={12} />
                          {fb.date || 'N/A'}
                        </span>
                      </div>
                      <div className="feedback-actions">
                        <button
                          className="btn-icon-action btn-restrict"
                          title="Restrict user for 24h"
                          onClick={() => fb.userEmail ? handleRestrictUser(fb.userEmail) : showToast('Cannot restrict anonymous submitters.', 'error')}
                        >
                          <Clock size={13} />
                        </button>
                        <button
                          className="btn-icon-action btn-ban"
                          title="Ban user permanently"
                          onClick={() => fb.userEmail ? handleBanUser(fb.userEmail) : showToast('Cannot ban anonymous submitters.', 'error')}
                        >
                          <ShieldAlert size={13} />
                        </button>
                        <button
                          className="btn-icon-action btn-delete"
                          title="Delete feedback"
                          onClick={async () => {
                            if (window.confirm(`Delete feedback "${fb.title}"?`)) {
                              try {
                                const updated = await deleteFeedback(fb.id);
                                setFeedbacks(updated);
                                showToast('Feedback deleted.', 'info');
                              } catch (err) {
                                console.error(err);
                                showToast('Failed to delete feedback.', 'error');
                              }
                            }
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {fb.aiFlaggedSpam && (
                      <div className="spam-warning-banner">
                        <AlertTriangle size={14} />
                        <span><strong>AI Spam Filter:</strong> {fb.aiSpamReason || 'Flagged as potential spam.'}</span>
                      </div>
                    )}
                    <h3 className="feedback-item-title">{fb.title || 'Untitled'}</h3>
                    <p className="feedback-item-desc">{fb.description || 'No description provided.'}</p>

                    <div className="feedback-item-user">
                      <User size={12} />
                      <span>{fb.userName || 'Anonymous'}</span>
                      {fb.userEmail && (
                        <>
                          <Mail size={12} />
                          <span>{fb.userEmail}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="list-empty-state">
                <MessageSquare size={36} />
                <p>No feedback submissions yet.</p>
                <span className="empty-subtext">Feedback from the /feedback page will appear here.</span>
              </div>
            )}

            {/* Active Restrictions list */}
            <div className="active-restrictions-section" style={{ marginTop: '40px', borderTop: '1px dashed var(--color-border)', paddingTop: '30px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '1.2rem', marginBottom: '16px' }}>
                <ShieldAlert size={18} />
                Restricted / Banned Users ({restrictions.length})
              </h3>
              {restrictions.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {restrictions.map((res) => (
                    <div 
                      key={res.id} 
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.01)', 
                        border: '1px solid rgba(255, 255, 255, 0.05)', 
                        borderRadius: '8px', 
                        padding: '16px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        gap: '12px' 
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 'bold', 
                            padding: '3px 8px', 
                            borderRadius: '4px',
                            background: res.status === 'banned' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                            color: res.status === 'banned' ? '#f87171' : '#fbbf24'
                          }}>
                            {res.status.toUpperCase()}
                          </span>
                          {res.status === 'restricted' && res.until && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                              Until: {new Date(res.until).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.email}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                          "{res.reason || 'No reason specified'}"
                        </p>
                      </div>
                      <button
                        className="btn-secondary"
                        style={{ 
                          width: '100%', 
                          padding: '6px 12px', 
                          fontSize: '0.8rem', 
                          fontWeight: '600',
                          background: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          color: '#34d399',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                        onClick={async () => {
                          if (window.confirm(`Lift all restrictions and bans for ${res.email}?`)) {
                            try {
                              await removeUserRestriction(res.email);
                              const activeRestrictions = await getRestrictions();
                              setRestrictions(activeRestrictions);
                              showToast('User restrictions lifted successfully.', 'success');
                            } catch (err) {
                              console.error(err);
                              showToast('Failed to lift user restriction.', 'error');
                            }
                          }
                        }}
                      >
                        Lift Restriction
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', fontStyle: 'italic', margin: 0 }}>No active user restrictions or bans.</p>
              )}
            </div>
          </div>
        )}

        {/* ═════════ TAB 6: APPEALS VIEWER ═════════ */}
        {activeTab === 'appeals' && (
          <div className="admin-section glass-panel animate-fade-in">
            <div className="section-header">
              <h2><ShieldAlert size={20} style={{ color: '#fbbf24' }} /> Ban Appeals Queue</h2>
              <span className="section-count">{appeals.length} pending</span>
            </div>

            {appeals.length > 0 ? (
              <div className="appeals-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                {appeals.map((appeal) => {
                  const restriction = restrictions.find(r => r.email === appeal.email);
                  const userFeedbacks = feedbacks.filter(f => f.userEmail === appeal.email);

                  return (
                    <div 
                      key={appeal.id} 
                      className="appeal-item-card" 
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.02)', 
                        border: '1px solid var(--color-border)', 
                        borderRadius: '12px', 
                        padding: '24px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '16px' 
                      }}
                    >
                      <div className="appeal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', color: '#fff' }}>{appeal.name}</h3>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>{appeal.email}</p>
                        </div>
                        <span className="appeal-date" style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                          Submitted: {appeal.date}
                        </span>
                      </div>

                      <div className="appeal-reason-box" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.15)', padding: '14px', borderRadius: '8px' }}>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                          Reason for Ban:
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                          "{restriction?.reason || 'No reason provided'}"
                        </p>
                      </div>

                      <div className="appeal-msg-box" style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '8px' }}>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          User Appeal Message:
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#fff', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                          {appeal.message}
                        </p>
                      </div>

                      {/* User past feedbacks history */}
                      <div className="appeal-history-box" style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                          Feedback History ({userFeedbacks.length} submissions):
                        </strong>
                        {userFeedbacks.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '160px', overflowY: 'auto', paddingRight: '8px' }}>
                            {userFeedbacks.map(f => (
                              <div 
                                key={f.id} 
                                style={{ 
                                  padding: '10px 14px', 
                                  background: f.status === 'deleted' ? 'rgba(239, 68, 68, 0.02)' : 'rgba(255,255,255,0.01)', 
                                  border: f.status === 'deleted' ? '1px solid rgba(239, 68, 68, 0.15)' : '1px solid rgba(255,255,255,0.04)', 
                                  borderRadius: '6px',
                                  opacity: f.status === 'deleted' ? 0.75 : 1
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                                  <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 'bold', color: f.type === 'bug' ? '#f87171' : f.type === 'feature' ? '#a78bfa' : '#22d3ee' }}>
                                      {(f.type || 'GENERAL').toUpperCase()}
                                    </span>
                                    {f.status === 'deleted' && (
                                      <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '1px 5px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>DELETED</span>
                                    )}
                                  </span>
                                  <span style={{ color: 'var(--color-text-tertiary)' }}>{f.date}</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '500', color: '#e5e7eb', marginBottom: '2px' }}>{f.title}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.description}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>No past feedbacks found.</p>
                        )}
                      </div>

                      <div className="appeal-actions" style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button
                          className="btn-primary"
                          style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '600' }}
                          onClick={async () => {
                            if (window.confirm(`Lift ban for user ${appeal.email}?`)) {
                              try {
                                await removeUserRestriction(appeal.email);
                                const updatedAppeals = await getAppeals();
                                setAppeals(updatedAppeals);
                                const activeRestrictions = await getRestrictions();
                                setRestrictions(activeRestrictions);
                                showToast('Ban lifted successfully.', 'success');
                              } catch (err) {
                                console.error(err);
                                showToast('Failed to lift ban.', 'error');
                              }
                            }
                          }}
                        >
                          Approve Appeal (Lift Ban)
                        </button>
                        <button
                          className="btn-secondary"
                          style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '10px 20px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '600' }}
                          onClick={async () => {
                            if (window.confirm(`Dismiss appeal from ${appeal.email}?`)) {
                              try {
                                await deleteAppeal(appeal.id);
                                const updatedAppeals = await getAppeals();
                                setAppeals(updatedAppeals);
                                showToast('Appeal dismissed.', 'info');
                              } catch (err) {
                                console.error(err);
                                showToast('Failed to dismiss appeal.', 'error');
                              }
                            }
                          }}
                        >
                          Reject / Dismiss Appeal
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="list-empty-state">
                <ShieldAlert size={36} />
                <p>No pending ban appeals.</p>
                <span className="empty-subtext">Submitted user appeals will appear here for review.</span>
              </div>
            )}
          </div>
        )}

        {/* ═════════ TAB 5: STUDENT DATABASE ═════════ */}
        {activeTab === 'students' && (
          <div className="admin-panel-card">
            <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2>Student Database</h2>
                <p className="panel-subtitle">Total Registered Students: {students.length}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search Name, Email, or Roll No..." 
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem',
                    minWidth: '220px'
                  }}
                />
              </div>
            </div>

            {students.length > 0 ? (
              <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                      <th style={{ padding: '12px 8px' }}>Student Info</th>
                      <th style={{ padding: '12px 8px' }}>Roll Number</th>
                      <th style={{ padding: '12px 8px' }}>Branch</th>
                      <th style={{ padding: '12px 8px' }}>Year</th>
                      <th style={{ padding: '12px 8px' }}>Group</th>
                      <th style={{ padding: '12px 8px' }}>Phone</th>
                      <th style={{ padding: '12px 8px' }}>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .filter(s => {
                        const searchLower = studentSearch.toLowerCase();
                        return (
                          (s.name || '').toLowerCase().includes(searchLower) ||
                          (s.email || '').toLowerCase().includes(searchLower) ||
                          (s.rollNumber || '').toLowerCase().includes(searchLower) ||
                          (s.subgroup || '').toLowerCase().includes(searchLower)
                        );
                      })
                      .map(student => (
                        <tr 
                          key={student.id} 
                          style={{ 
                            borderBottom: '1px solid rgba(255,255,255,0.04)', 
                            fontSize: '0.9rem',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ fontWeight: '500', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {student.name}
                              {student.isVerified && (
                                <span title={`Verified: ${student.verificationReason || 'ID Details Verified'}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                  <BadgeCheck size={16} fill="#1d9bf0" color="#fff" />
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{student.email}</div>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#fff' }}>{student.rollNumber || 'N/A'}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span className="badge-branch" style={{
                              background: 'rgba(56, 189, 248, 0.1)',
                              color: '#38bdf8',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>{student.branch || 'N/A'}</span>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#fff' }}>{student.year ? `${student.year} Yr` : 'N/A'}</td>
                          <td style={{ padding: '12px 8px', color: '#fff' }}>
                            <span style={{
                              background: 'rgba(236, 72, 153, 0.1)',
                              color: '#ec4899',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>{student.subgroup || 'N/A'}</span>
                          </td>
                          <td style={{ padding: '12px 8px', color: 'var(--color-text-secondary)' }}>{student.phone || 'N/A'}</td>
                          <td style={{ padding: '12px 8px', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                            {student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="list-empty-state">
                <Users size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
                <p>No registered students found.</p>
                <span className="empty-subtext">Students saving their profile details will appear here.</span>
              </div>
            )}
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

