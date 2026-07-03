import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const CONFIG_COLLECTION = 'config';
const SYSTEM_DOC = 'system';

/**
 * Fetches the system config document. Falls back to defaults if not found.
 */
export async function getSystemConfig() {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, SYSTEM_DOC);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.error('Failed to fetch system config:', e);
  }
  // Default configuration
  return { useRealtimeStats: false };
}

/**
 * Updates the system config document.
 */
export async function updateSystemConfig(config) {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, SYSTEM_DOC);
    await setDoc(docRef, config, { merge: true });
    return true;
  } catch (e) {
    console.error('Failed to update system config:', e);
    return false;
  }
}
