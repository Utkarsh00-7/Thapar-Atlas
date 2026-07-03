import { useState, useMemo } from 'react';
import { Search, Compass, HelpCircle, Building2, Tv, ArrowUpCircle, AlertTriangle } from 'lucide-react';
import './Classrooms.css';

const VALID_ROOMS = new Set([
  // Block B
  'B105', 'B106', 'B109', 'B112', 'B113', 'B203', 'B204', 'B208', 'B209', 'B211', 'B212', 'B213', 'B214', 'B223', 'B301', 'B302', 'B303', 'B304', 'B307', 'B309',
  // Block C
  'C101', 'C113', 'C117', 'C122', 'C201', 'C202', 'C203', 'C210', 'C211', 'C212', 'C217', 'C220', 'C223', 'C309', 'C323', 'C325', 'C326', 'C327', 'C328', 'C332', 'C333', 'C334',
  // Block D
  'D206', 'D207',
  // Block E
  'E101', 'E102', 'E103', 'E104', 'E105', 'E106', 'E109', 'E201', 'E202', 'E203', 'E207', 'E301', 'E302', 'E303', 'E304', 'E305', 'E306', 'E307', 'E308', 'E310', 'E311', 'E312',
  // Block F
  'F102', 'F103', 'F104', 'F105', 'F106', 'F107', 'F109', 'F112', 'F201', 'F202', 'F203', 'F204', 'F206', 'F209', 'F210', 'F211', 'F212', 'F301', 'F302', 'F303', 'F304', 'F305', 'F306', 'F307', 'F308', 'F309', 'F310', 'F311', 'F312', 'F313', 'F314', 'F315', 'F316', 'F3203',
  // Block G
  'G114', 'G141', 'G143', 'G201', 'G203', 'G204', 'G253A', 'G307', 'G309', 'G310', 'G312', 'G317', 'G321', 'G325',
  // Block H
  'H202', 'H203', 'H204', 'H205', 'H206',
  // LP
  'LP101', 'LP102', 'LP103', 'LP104', 'LP106', 'LP107', 'LP108', 'LP109', 'LP110',
  // LT
  'LT101', 'LT102', 'LT103', 'LT301', 'LT302', 'LT303', 'LT401', 'LT401L', 'LT402', 'LT403'
]);

const getFloorDescription = (digit) => {
  switch (digit) {
    case '1': return 'Ground Floor';
    case '2': return 'First Floor';
    case '3': return 'Second Floor';
    case '4': return 'Third Floor';
    default: return `${digit}th Floor`;
  }
};

const decodeRoomCode = (code) => {
  const cleanCode = code.trim().toUpperCase().replace(/[-\s]/g, '');
  if (!cleanCode) return null;

  // 1. Lecture Plaza (LP)
  const lpMatch = cleanCode.match(/^LP([0-9]+)([A-Z]*)$/);
  if (lpMatch) {
    const roomNum = lpMatch[1];
    const trailing = lpMatch[2] || '';
    const floorChar = roomNum.charAt(0);
    return {
      name: `LP-${roomNum}${trailing}`,
      building: 'Lecture Plaza (LP)',
      floor: getFloorDescription(floorChar),
      room: `Room ${roomNum}${trailing}`,
      note: 'Main lecture plaza complex, located near the library and main fountain.',
    };
  }

  // 2. Lecture Theatre (LT)
  const ltMatch = cleanCode.match(/^LT([0-9]+)([A-Z]*)$/);
  if (ltMatch) {
    const roomNum = ltMatch[1];
    const trailing = ltMatch[2] || '';
    const floorChar = roomNum.charAt(0);
    return {
      name: `LT-${roomNum}${trailing}`,
      building: 'Lecture Theatre Complex',
      floor: getFloorDescription(floorChar),
      room: `Theatre ${roomNum}${trailing}`,
      note: 'Large auditorium-style lecture theatres used for core branches.',
    };
  }

  // 3. Blocks B to H, and Tan Building (T)
  const blockMatch = cleanCode.match(/^([B-HT])([0-9])([0-9]{2,3})([A-Z]*)$/);
  if (blockMatch) {
    const block = blockMatch[1];
    const floorDigit = blockMatch[2];
    const roomNum = blockMatch[3];
    const trailing = blockMatch[4] || '';
    return {
      name: `${block}-${floorDigit}${roomNum}${trailing}`,
      building: block === 'T' ? 'Tan Building (Block T)' : `Block ${block}`,
      floor: getFloorDescription(floorDigit),
      room: `Room ${floorDigit}${roomNum}${trailing}`,
      note: block === 'T' ? 'Located adjacent to the library plaza.' : `Academic area, Block ${block}.`,
    };
  }

  return null;
};

const isWithinRoomRange = (code) => {
  const cleanCode = code.trim().toUpperCase().replace(/[-\s]/g, '');
  if (!cleanCode) return false;

  // 1. Direct Set check
  if (VALID_ROOMS.has(cleanCode)) return true;

  // 2. LP check
  const lpMatch = cleanCode.match(/^LP([0-9]+)([A-Z]*)$/);
  if (lpMatch) {
    const roomNum = parseInt(lpMatch[1], 10);
    // LP ranges: Ground Floor (1xx): 101 to 110
    if (roomNum >= 101 && roomNum <= 110) return true;
  }

  // 3. LT check
  const ltMatch = cleanCode.match(/^LT([0-9]+)([A-Z]*)$/);
  if (ltMatch) {
    const roomNum = parseInt(ltMatch[1], 10);
    // LT ranges:
    // 1xx (Ground): 101 to 103
    // 3xx (Second): 301 to 303
    // 4xx (Third): 401 to 403
    if (roomNum >= 101 && roomNum <= 103) return true;
    if (roomNum >= 301 && roomNum <= 303) return true;
    if (roomNum >= 401 && roomNum <= 403) return true;
  }

  // 4. Block check
  const blockMatch = cleanCode.match(/^([B-HT])([0-9])([0-9]{2,3})([A-Z]*)$/);
  if (blockMatch) {
    const block = blockMatch[1];
    const floorDigit = parseInt(blockMatch[2], 10);
    const roomNum = parseInt(blockMatch[3], 10);

    // Ranges per Block and Floor (accepting gaps within lowest/highest codes)
    switch (block) {
      case 'B':
        if (floorDigit === 1) return roomNum >= 5 && roomNum <= 13;
        if (floorDigit === 2) return roomNum >= 3 && roomNum <= 23;
        if (floorDigit === 3) return roomNum >= 1 && roomNum <= 9;
        break;
      case 'C':
        if (floorDigit === 1) return roomNum >= 1 && roomNum <= 22;
        if (floorDigit === 2) return roomNum >= 1 && roomNum <= 23;
        if (floorDigit === 3) return roomNum >= 9 && roomNum <= 34;
        break;
      case 'D':
        if (floorDigit === 2) return roomNum >= 6 && roomNum <= 7;
        break;
      case 'E':
        if (floorDigit === 1) return roomNum >= 1 && roomNum <= 9;
        if (floorDigit === 2) return roomNum >= 1 && roomNum <= 7;
        if (floorDigit === 3) return roomNum >= 1 && roomNum <= 12;
        break;
      case 'F':
        if (floorDigit === 1) return roomNum >= 2 && roomNum <= 12;
        if (floorDigit === 2) return roomNum >= 1 && roomNum <= 12;
        if (floorDigit === 3) return roomNum >= 1 && roomNum <= 203; // matches F3203
        break;
      case 'G':
        if (floorDigit === 1) return roomNum >= 14 && roomNum <= 43;
        if (floorDigit === 2) return roomNum >= 1 && roomNum <= 53; // matches G253A
        if (floorDigit === 3) return roomNum >= 7 && roomNum <= 25;
        break;
      case 'H':
        if (floorDigit === 2) return roomNum >= 2 && roomNum <= 6;
        break;
      case 'T':
        // Tan building fallback ranges
        if (floorDigit === 1) return roomNum >= 1 && roomNum <= 15;
        if (floorDigit === 2) return roomNum >= 1 && roomNum <= 15;
        if (floorDigit === 3) return roomNum >= 1 && roomNum <= 15;
        break;
    }
  }

  return false;
};

export default function Classrooms() {
  const [searchQuery, setSearchQuery] = useState('');

  // Normalize search query
  const cleanInput = useMemo(() => {
    return searchQuery.trim().toUpperCase().replace(/[-\s]/g, '');
  }, [searchQuery]);

  // Check if search query falls within the valid room codes or floor ranges
  const isValidRoom = useMemo(() => {
    return isWithinRoomRange(cleanInput);
  }, [cleanInput]);

  // Real-time decoding (only for valid rooms)
  const decodedResult = useMemo(() => {
    if (!isValidRoom) return null;
    return decodeRoomCode(cleanInput);
  }, [isValidRoom, cleanInput]);

  return (
    <div className="classrooms-page">
      <div className="classrooms-container">
        {/* Page Header */}
        <header className="classrooms-header text-center">
          <div className="classrooms-badge">
            <Compass size={14} className="badge-icon animate-spin-slow" />
            <span>CAMPUS DIRECTORY</span>
          </div>
          <h1>Classroom Finder</h1>
          <p>
            Stuck trying to locate a class? Enter your timetable room code (e.g. C203, LP102, F102) to instantly decode its block and floor location.
          </p>
        </header>

        {/* Decoder & Finder Search Input */}
        <div className="classrooms-search-wrapper">
          <div className="classrooms-search-input-container">
            <Search className="classrooms-search-icon" size={18} />
            <input
              type="text"
              placeholder="Enter room code (e.g. C203, LP101, F102)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Decoder Result Display */}
        {decodedResult ? (
          <div className="decoder-result-panel glass-panel glow-card animate-fade-in">
            <div className="decoder-result-header">
              <Compass className="decoder-icon text-accent" size={24} />
              <h2>Decoded Location</h2>
            </div>
            
            <div className="decoder-stats-grid">
              <div className="stat-item">
                <span className="stat-label">Room Code</span>
                <span className="stat-value text-accent">{decodedResult.name}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Block / Building</span>
                <span className="stat-value">{decodedResult.building}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Floor</span>
                <span className="stat-value">{decodedResult.floor}</span>
              </div>
            </div>

            <div className="decoder-note">
              <Compass size={16} className="text-accent-secondary" />
              <p>{decodedResult.note}</p>
            </div>
          </div>
        ) : searchQuery.trim() ? (
          <div className="directory-empty error-panel glass-panel text-center animate-fade-in">
            <AlertTriangle className="error-icon text-red" size={24} />
            <p className="text-red">Classroom info not available</p>
          </div>
        ) : null}

        {/* Info Rules Panel */}
        {!decodedResult && !searchQuery.trim() && (
          <div className="classrooms-rules-container">
            <div className="rules-section-header text-center">
              <HelpCircle className="rules-section-icon" size={22} />
              <h2>How to read Thapar room codes</h2>
              <p>Timetables at Thapar use a shorthand format. Use these guidelines to locate your classes.</p>
            </div>
            
            <div className="rules-grid">
              <div className="rule-card glass-panel">
                <div className="rule-card-header">
                  <Building2 className="rule-card-icon text-purple" size={24} />
                  <h3>Academic Blocks</h3>
                </div>
                <p>Main campus buildings and the Tan Building (Block T).</p>
                <div className="rule-example">
                  <span>Example:</span> <code>C203</code> ➔ Block C
                </div>
              </div>

              <div className="rule-card glass-panel">
                <div className="rule-card-header">
                  <Tv className="rule-card-icon text-cyan" size={24} />
                  <h3>Plazas & Theatres</h3>
                </div>
                <p>Lecture Plaza halls and Lecture Theatre Complex.</p>
                <div className="rule-example">
                  <span>Example:</span> <code>LP102</code> ➔ Lecture Plaza
                </div>
              </div>

              <div className="rule-card glass-panel">
                <div className="rule-card-header">
                  <ArrowUpCircle className="rule-card-icon text-green" size={24} />
                  <h3>Floor Levels</h3>
                </div>
                <p>The first digit sets the floor level (e.g. 1xx means Ground Floor).</p>
                <div className="rule-example floors-list">
                  <code>1xx</code> Ground | <code>2xx</code> 1st | <code>3xx</code> 2nd
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
