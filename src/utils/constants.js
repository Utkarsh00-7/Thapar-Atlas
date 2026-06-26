import {
  Home,
  FolderOpen,
  Calculator,
  MapPin,
  Upload,
  ShieldCheck,
  FileText,
  Sparkles,
  ClipboardList,
} from 'lucide-react';

/* ─── Grade System (TIET) ─────────────────────────────── */

export const GRADE_MAP = {
  'A+': 10,
  'A': 10,
  'A-': 9,
  'B': 8,
  'B-': 7,
  'C': 6,
  'E': 2,
  'F': 0,
};

export const SPECIAL_GRADES = [
  { code: 'RA', description: 'Result Awaited — grade not yet declared' },
  { code: 'I', description: 'Incomplete — requirements not fulfilled' },
  { code: 'X', description: 'Inadequate Attendance — detained from exam' },
];

/* ─── Academic Structure ──────────────────────────────── */

export const YEARS = [
  { id: 1, label: 'First Year' },
  { id: 2, label: 'Second Year' },
  { id: 3, label: 'Third Year' },
  { id: 4, label: 'Fourth Year' },
];

export const BRANCHES = {
  1: [
    { id: 'pool-a', label: 'Pool A (COE, COPC, COBS, EEC, ECE, ENC, MEE, ELE)' },
    { id: 'pool-b', label: 'Pool B (DSAI, RAI, CHE, CIE, BT)' },
  ],
  2: [
    { id: 'coe', label: 'Computer Engineering (COE)' },
    { id: 'copc', label: 'Computer Science & Engineering (COPC)' },
    { id: 'cobs', label: 'Computer Science and Business Systems (COBS)' },
    { id: 'dsai', label: 'Artificial Intelligence and Data Science (DSAI)' },
    { id: 'eec', label: 'Electrical and Computer Engineering (EEC)' },
    { id: 'ece', label: 'Electronics & Communication Engineering (ECE)' },
    { id: 'enc', label: 'Electronics and Computer Engineering (ENC)' },
    { id: 'rai', label: 'Robotics and Artificial Intelligence (RAI)' },
    { id: 'mee', label: 'Mechanical Engineering (MEE)' },
    { id: 'che', label: 'Chemical Engineering (CHE)' },
    { id: 'cie', label: 'Civil Engineering (CIE)' },
    { id: 'ele', label: 'Electrical Engineering (ELE)' },
    { id: 'bt', label: 'Biotechnology (BT)' },
  ],
  // 3rd and 4th year share the same branch list
  get 3() { return this[2]; },
  get 4() { return this[2]; },
};

/* ─── Resource Types ──────────────────────────────────── */

export const RESOURCE_TYPES = [
  { id: 'notes', label: 'Notes' },
  { id: 'pyq', label: 'Previous Year Questions' },
  { id: 'book', label: 'Books & References' },
  { id: 'lab', label: 'Lab Resources' },
  { id: 'assignment', label: 'Assignments' },
];

/* ─── Navigation ──────────────────────────────────────── */

export const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Resources', path: '/resources', icon: FolderOpen },
  { label: 'PYQ Hub', path: '/pyqs', icon: FileText },
  { label: 'Syllabus', path: '/syllabus', icon: ClipboardList },
  { label: 'Societies', path: '/societies', icon: Sparkles },
  { label: 'GPA Tools', path: '/gpa', icon: Calculator },
  { label: 'Campus', path: '/campus', icon: MapPin },
];

export const ADMIN_EMAILS = [
  'umanglik_be25@thapar.edu'
];

export const FOOTER_NAV = {
  quickLinks: [
    { label: 'Resources', path: '/resources' },
    { label: 'PYQ Hub', path: '/pyqs' },
    { label: 'Syllabus Tracker', path: '/syllabus' },
    { label: 'Societies Directory', path: '/societies' },
    { label: 'GPA Tools', path: '/gpa' },
    { label: 'Campus Map', path: '/campus' },
    { label: 'Contribute', path: '/contribute' },
  ],
  thaparResources: [
    { label: 'Central Library', href: 'https://library.thapar.edu/' },
    { label: 'Webkiosk', href: 'https://webkiosk.thapar.edu/' },
    { label: 'LMS (Moodle)', href: 'https://lms.thapar.edu/' },
    { label: 'Thapar Website', href: 'https://www.thapar.edu/' },
  ],
};

/* ─── Misc ────────────────────────────────────────────── */

export const ADMIN_NAV_ITEMS = [
  { label: 'Upload', path: '/contribute', icon: Upload },
  { label: 'Admin', path: '/admin', icon: ShieldCheck },
];
