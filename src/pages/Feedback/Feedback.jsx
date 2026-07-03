import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addFeedback, checkUserRestriction, submitAppeal } from '../../utils/feedbackDb';
import { 
  MessageSquare, 
  Bug, 
  Sparkles, 
  Send, 
  CheckCircle, 
  LogIn, 
  Loader2, 
  AlertTriangle,
  Mail,
  User,
  Clock,
  Lock
} from 'lucide-react';
import { isActionAllowed, recordAction } from '../../utils/rateLimiter';
import './Feedback.css';

export default function Feedback() {
  const { user, loginWithGoogle, loading: authLoading } = useAuth();
  
  // Form states
  const [feedbackType, setFeedbackType] = useState('bug'); // 'bug', 'feature', 'general'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Restriction & Cooldown states
  const [restriction, setRestriction] = useState({ status: 'none', until: null });
  const [countdown, setCountdown] = useState('');
  const [appealMessage, setAppealMessage] = useState('');
  const [appealSubmitted, setAppealSubmitted] = useState(false);
  const [appealSubmitting, setAppealSubmitting] = useState(false);

  useEffect(() => {
    async function verifyRestriction() {
      if (user && user.email) {
        try {
          const res = await checkUserRestriction(user.email);
          setRestriction(res);
        } catch (err) {
          console.error("Failed to check user restriction:", err);
        }
      }
    }
    verifyRestriction();
  }, [user]);

  useEffect(() => {
    if (restriction.status !== 'restricted' || !restriction.until) return;

    function updateClock() {
      const diff = restriction.until - Date.now();
      if (diff <= 0) {
        setRestriction({ status: 'none', until: null });
        setCountdown('');
      } else {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        
        const hStr = String(hours).padStart(2, '0');
        const mStr = String(minutes).padStart(2, '0');
        const sStr = String(seconds).padStart(2, '0');
        
        setCountdown(`${hStr}h : ${mStr}m : ${sStr}s`);
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [restriction]);

  const handleAppealSubmit = async (e) => {
    e.preventDefault();
    if (!appealMessage.trim() || !user) return;

    // Check rate limits: 60 seconds cooldown on appeals
    const rateLimit = isActionAllowed('appeal', 60000);
    if (!rateLimit.allowed) {
      setErrorMsg(`Please wait ${rateLimit.remainingTime} seconds before submitting another appeal to prevent spam.`);
      return;
    }

    setAppealSubmitting(true);
    try {
      await submitAppeal(user.email, user.displayName || 'Anonymous', appealMessage.trim());
      recordAction('appeal');
      setAppealSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to submit appeal. Please try again.');
    } finally {
      setAppealSubmitting(false);
    }
  };
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Feedback page login failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setErrorMsg('');

    // Check rate limits: 30 seconds cooldown per feedback
    const rateLimit = isActionAllowed('feedback', 30000);
    if (!rateLimit.allowed) {
      setErrorMsg(`Please wait ${rateLimit.remainingTime} seconds before submitting more feedback to prevent spam.`);
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Please enter a brief title/subject for your report.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please provide a detailed description.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addFeedback({
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userEmail: user.email,
        type: feedbackType,
        title: title.trim(),
        description: description.trim()
      });
      recordAction('feedback');
      setSubmitted(true);
      // Reset form
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      if (err.message === 'USER_BANNED') {
        setErrorMsg('Your account has been permanently restricted from submitting feedback.');
      } else if (err.message.startsWith('USER_RESTRICTED')) {
        const until = Number(err.message.split(':')[1]);
        const dateStr = new Date(until).toLocaleString();
        setErrorMsg(`Your account is temporarily restricted from submitting feedback until ${dateStr}.`);
      } else {
        setErrorMsg('Failed to submit feedback. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg('');
  };

  return (
    <div className="feedback-page animate-fade-in">
      <div className="feedback-container">
        
        {/* Header */}
        <header className="feedback-header text-center">
          <div className="feedback-badge">
            <MessageSquare size={14} className="badge-icon" />
            <span>SUPPORT & DEVELOPMENT</span>
          </div>
          <h1>Feedback & Bug Report</h1>
          <p>
            Help us improve Thapar Atlas. Share suggestions, submit feature requests, or report any bugs or glitches you encounter.
          </p>
        </header>

        {/* Auth Protection Wrapper */}
        {authLoading ? (
          <div className="feedback-card glass-panel loading-card text-center">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p>Verifying authentication...</p>
          </div>
        ) : !user ? (
          <div className="feedback-card glass-panel auth-prompt-card text-center animate-fade-in">
            <div className="auth-prompt-icon-wrapper">
              <LockIcon size={32} className="auth-lock-icon" />
            </div>
            <h2>Sign In Required</h2>
            <p>
              To prevent spam and track issues effectively, you must be signed in with your official Thapar University account (<strong>@thapar.edu</strong>) to submit feedback.
            </p>
            <button className="auth-login-btn hover-glow" onClick={handleLogin}>
              <LogIn size={18} />
              <span>Sign In with Google</span>
            </button>
          </div>
        ) : submitted ? (
          <div className="feedback-card glass-panel success-card text-center animate-fade-in">
            <div className="success-icon-wrapper">
              <CheckCircle className="success-check-icon animate-bounce-slow" size={48} />
            </div>
            <h2>Thank You!</h2>
            <p>
              Your feedback has been successfully logged. We appreciate you taking the time to help make Thapar Atlas better for all students.
            </p>
            <button className="reset-feedback-btn hover-glow" onClick={handleReset}>
              <span>Submit Another Report</span>
            </button>
          </div>
        ) : restriction.status === 'banned' ? (
          <div className="feedback-card glass-panel auth-prompt-card text-center animate-fade-in" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', padding: '30px' }}>
            <div className="auth-prompt-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', margin: '0 auto 16px auto' }}>
              <Lock size={32} className="auth-lock-icon" style={{ color: '#ef4444' }} />
            </div>
            <h2 style={{ color: '#f87171', marginBottom: '8px' }}>Access Restricted</h2>
            <p style={{ maxWidth: '440px', margin: '0 auto 16px auto', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Your account has been permanently restricted from submitting feedback due to violating community guidelines.
            </p>
            
            <div style={{ marginTop: '20px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.01)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)', maxWidth: '480px', margin: '20px auto 0 auto' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px 0', fontWeight: 'bold' }}>Reason for ban:</p>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.95rem', fontWeight: '500', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                "{restriction.reason || 'No reason specified'}"
              </p>
              
              {restriction.hasAppealed || appealSubmitted ? (
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399' }}>
                  <CheckCircle size={18} />
                  <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Appeal submitted successfully. Review is pending.</span>
                </div>
              ) : (
                <form onSubmit={handleAppealSubmit} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '10px', lineHeight: '1.4' }}>
                    Want to appeal this decision? Explain why your ban should be lifted:
                  </label>
                  <textarea
                    rows={4}
                    value={appealMessage}
                    onChange={(e) => setAppealMessage(e.target.value)}
                    maxLength={500}
                    placeholder="Describe why you should be unbanned (max 500 characters)..."
                    style={{ width: '100%', background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', color: '#fff', padding: '12px', fontSize: '0.9rem', outline: 'none', marginBottom: '14px', resize: 'vertical', lineHeight: '1.5' }}
                    required
                  />
                  <button
                    type="submit"
                    className="submit-feedback-btn hover-glow"
                    disabled={appealSubmitting}
                    style={{ padding: '10px 20px', fontSize: '0.85rem', width: 'auto', display: 'inline-flex', alignSelf: 'flex-start' }}
                  >
                    {appealSubmitting ? 'Submitting Appeal...' : 'Submit Appeal'}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : restriction.status === 'restricted' ? (
          <div className="feedback-card glass-panel auth-prompt-card text-center animate-fade-in" style={{ borderColor: 'rgba(251, 191, 36, 0.3)' }}>
            <div className="auth-prompt-icon-wrapper" style={{ background: 'rgba(251, 191, 36, 0.1)' }}>
              <Clock size={32} style={{ color: '#fbbf24' }} />
            </div>
            <h2 style={{ color: '#fbbf24' }}>Submission Cooldown</h2>
            <p style={{ maxWidth: '400px', margin: '0 auto 8px auto', lineHeight: '1.6' }}>
              To prevent spam, your account is temporarily restricted from sending feedback. This restriction will be lifted in:
            </p>
            <div className="live-countdown-clock font-mono" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24', margin: '24px 0', letterSpacing: '0.05em' }}>
              {countdown || 'Calculating...'}
            </div>
          </div>
        ) : (
          <div className="feedback-card glass-panel form-card animate-fade-in">
            <form onSubmit={handleSubmit} className="feedback-form">
              
              {/* Contributor Readonly Info */}
              <div className="form-user-info">
                <div className="info-item">
                  <User size={14} className="info-icon" />
                  <span>Logged in as: <strong>{user.displayName}</strong></span>
                </div>
                <div className="info-item">
                  <Mail size={14} className="info-icon" />
                  <span>Email: <strong>{user.email}</strong></span>
                </div>
              </div>

              {/* Feedback Type Tabs */}
              <div className="form-group">
                <label className="field-label">What would you like to report?</label>
                <div className="type-selector-tabs">
                  <button
                    type="button"
                    className={`type-tab ${feedbackType === 'bug' ? 'active bug-active' : ''}`}
                    onClick={() => setFeedbackType('bug')}
                  >
                    <Bug size={16} />
                    <span>Bug / Glitch</span>
                  </button>
                  <button
                    type="button"
                    className={`type-tab ${feedbackType === 'feature' ? 'active feature-active' : ''}`}
                    onClick={() => setFeedbackType('feature')}
                  >
                    <Sparkles size={16} />
                    <span>Feature Request</span>
                  </button>
                  <button
                    type="button"
                    className={`type-tab ${feedbackType === 'general' ? 'active general-active' : ''}`}
                    onClick={() => setFeedbackType('general')}
                  >
                    <MessageSquare size={16} />
                    <span>General Feedback</span>
                  </button>
                </div>
              </div>

              {/* Title Input */}
              <div className="form-group">
                <label htmlFor="feedback-title" className="field-label">Subject / Title</label>
                <input
                  id="feedback-title"
                  type="text"
                  placeholder={
                    feedbackType === 'bug' 
                      ? 'e.g., GPA Calculator resets on tab change' 
                      : feedbackType === 'feature' 
                      ? 'e.g., Dark mode schedule planner' 
                      : 'e.g., General thoughts on societies section'
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                />
              </div>

              {/* Description Input */}
              <div className="form-group">
                <label htmlFor="feedback-desc" className="field-label">Details / Description</label>
                <textarea
                  id="feedback-desc"
                  rows={6}
                  placeholder={
                    feedbackType === 'bug'
                      ? 'Describe what happened, where you encountered the bug, and steps to reproduce it.'
                      : feedbackType === 'feature'
                      ? 'Describe your suggestion or feature idea and how it would help TIET students.'
                      : 'Share your thoughts, suggestions, or overall experience with Thapar Atlas.'
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                />
                <span className="char-count">{description.length}/1000</span>
              </div>

              {/* Error Display */}
              {errorMsg && (
                <div className="form-error-toast animate-fade-in">
                  <AlertTriangle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="submit-feedback-btn hover-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Submitting Report...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Report</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple lock icon fallback
function LockIcon({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      width={size} 
      height={size}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
