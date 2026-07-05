import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

const PROFILES_COLLECTION = 'students';

/**
 * Retrieves a student's profile by Firebase Auth UID.
 */
export async function getStudentProfile(uid) {
  try {
    if (!uid) return null;
    const docRef = doc(db, PROFILES_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.error('Failed to get student profile from Firestore:', e);
  }
  return null;
}

/**
 * Saves/updates a student's profile in Firestore using UID as document ID.
 */
export async function saveStudentProfile(uid, email, profileData) {
  try {
    if (!uid) throw new Error('UID is required');
    const docRef = doc(db, PROFILES_COLLECTION, uid);
    const data = {
      uid,
      email,
      updatedAt: Date.now(),
      ...profileData
    };
    await setDoc(docRef, data);
    return data;
  } catch (e) {
    console.error('Failed to save student profile in Firestore:', e);
    throw e;
  }
}

/**
 * Retrieves all registered student profiles from Firestore.
 */
export async function getAllStudentProfiles() {
  try {
    const querySnapshot = await getDocs(collection(db, PROFILES_COLLECTION));
    const list = [];
    querySnapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (e) {
    console.error('Failed to get student profiles:', e);
    return [];
  }
}
