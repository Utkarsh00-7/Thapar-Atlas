import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

const PROFILES_COLLECTION = 'student_profiles';

/**
 * Retrieves a student's profile by email.
 */
export async function getStudentProfile(email) {
  try {
    if (!email) return null;
    const id = email.replace(/[^a-zA-Z0-9]/g, '_');
    const docRef = doc(db, PROFILES_COLLECTION, id);
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
 * Saves/updates a student's profile in Firestore.
 */
export async function saveStudentProfile(email, profileData) {
  try {
    if (!email) throw new Error('Email is required');
    const id = email.replace(/[^a-zA-Z0-9]/g, '_');
    const docRef = doc(db, PROFILES_COLLECTION, id);
    const data = {
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
