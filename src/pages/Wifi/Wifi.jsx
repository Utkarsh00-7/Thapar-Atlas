import { useState } from 'react';
import { Wifi, Copy, Check, Search, AlertCircle } from 'lucide-react';
import './Wifi.css';

const wifiNetworks = [
  { name: 'EACCESS', password: 'hostelnet' },
  { name: 'All Hostel Wi-Fi', password: 'hostelnet' },
  { name: 'Audi', password: 'audi@net' },
  { name: 'CSED', password: 'csed@123#' },
  { name: 'Directorate', password: 'dir@tu&98765' },
  { name: 'Workshop', password: 'workshop@54321' },
  { name: 'Placement Cell', password: 'Cilp@98765' },
  { name: 'TU', password: 'tu@inet1' },
  { name: 'LC', password: 'lc@tiet1' },
  { name: 'C-Hall', password: 'chall@ti25' },
];

export default function WifiPasswords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (networkName, password) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedId(networkName);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const filteredNetworks = wifiNetworks.filter(net =>
    net.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="wifi-page">
      <div className="wifi-container">
        {/* Page Header */}
        <header className="wifi-header text-center">
          <div className="wifi-badge">
            <Wifi size={14} className="badge-icon animate-pulse" />
            <span>CAMPUS CONNECTIVITY</span>
          </div>
          <h1>Wi-Fi Passwords</h1>
          <p>
            Quick access to Wi-Fi network passwords across canteens, departments, cBlocks, and hostels at Thapar.
          </p>
        </header>

        {/* Search Bar */}
        <div className="wifi-search-wrapper">
          <div className="wifi-search-input-container">
            <Search className="wifi-search-icon" size={18} />
            <input
              type="text"
              placeholder="Search by building name or location (e.g. CSED, Hostel)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Networks Grid */}
        {filteredNetworks.length > 0 ? (
          <div className="wifi-grid">
            {filteredNetworks.map((net) => (
              <div
                key={net.name}
                className={`wifi-card glass-panel ${copiedId === net.name ? 'copied-glow' : ''}`}
              >
                <div className="wifi-card-header">
                  <div className="wifi-card-title-wrap">
                    <Wifi size={20} className="wifi-card-icon" />
                    <h3>{net.name}</h3>
                  </div>
                </div>
                <div className="wifi-password-wrap">
                  <span className="wifi-password-label">Password:</span>
                  <div className="wifi-password-box">
                    <code className="wifi-password-text">{net.password}</code>
                    <button
                      className={`wifi-copy-btn ${copiedId === net.name ? 'copied' : ''}`}
                      onClick={() => handleCopy(net.name, net.password)}
                      title="Copy to clipboard"
                    >
                      {copiedId === net.name ? (
                        <>
                          <Check size={16} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="wifi-empty-state glass-panel text-center">
            <p>No Wi-Fi networks found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Global Fallback Notice Banner */}
        <div className="wifi-notice glass-panel">
          <AlertCircle className="notice-icon text-accent" size={20} />
          <div className="notice-content">
            <strong>Default Fallback Rule:</strong> If any hostel or campus Wi-Fi network password is not mentioned in the list below, try using <code className="code-highlight">hostelnet</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
