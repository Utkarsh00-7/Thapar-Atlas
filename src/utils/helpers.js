import { GRADE_MAP, SPECIAL_GRADES } from './constants';

/**
 * Calculate SGPA from an array of subjects.
 * @param {Array<{credits: number, grade: string}>} subjects
 * @returns {number|null} SGPA rounded to 2 decimal places, or null if invalid
 */
export function calculateSGPA(subjects) {
  if (!subjects || subjects.length === 0) return null;

  const specialCodes = SPECIAL_GRADES.map((g) => g.code);
  let totalCredits = 0;
  let totalPoints = 0;

  for (const { credits, grade } of subjects) {
    if (specialCodes.includes(grade)) continue; // skip RA, I, X
    const gradePoint = GRADE_MAP[grade];
    if (gradePoint === undefined || !credits || credits <= 0) continue;
    totalCredits += credits;
    totalPoints += credits * gradePoint;
  }

  if (totalCredits === 0) return null;
  return Math.round((totalPoints / totalCredits) * 100) / 100;
}

/**
 * Calculate CGPA from an array of semester records.
 * @param {Array<{sgpa: number, totalCredits: number}>} semesters
 * @returns {number|null} CGPA rounded to 2 decimal places, or null if invalid
 */
export function calculateCGPA(semesters) {
  if (!semesters || semesters.length === 0) return null;

  let totalCredits = 0;
  let weightedSum = 0;

  for (const { sgpa, totalCredits: credits } of semesters) {
    if (!sgpa || !credits || credits <= 0) continue;
    totalCredits += credits;
    weightedSum += sgpa * credits;
  }

  if (totalCredits === 0) return null;
  return Math.round((weightedSum / totalCredits) * 100) / 100;
}

/**
 * Format bytes into a human-readable file size.
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  if (!bytes || bytes < 0) return '—';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/**
 * Format a timestamp into a readable date string.
 * @param {number|string|Date} timestamp
 * @returns {string}
 */
export function formatDate(timestamp) {
  if (!timestamp) return '—';

  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

/**
 * Get initials from a name (first letters of first two words).
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  if (!name || typeof name !== 'string') return '?';

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Truncate text to a max length, adding ellipsis if needed.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Join class names, filtering out falsy values.
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Resolves a file link. For Cloudinary links, adds the attachment flag
 * to force download instead of viewing inline.
 * @param {string} url
 * @returns {string}
 */
export function getDownloadLink(url) {
  return url || '#';
}

