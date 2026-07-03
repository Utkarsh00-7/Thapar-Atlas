import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc, orderBy, query, where } from 'firebase/firestore';
import { checkSubmissionSpam } from './moderationAi';

const FEEDBACK_COLLECTION = 'user_feedbacks';
const RESTRICTIONS_COLLECTION = 'user_restrictions';
const APPEALS_COLLECTION = 'user_appeals';

/**
 * Saves a user feedback / bug report entry to Firestore.
 * @param {Object} feedback 
 */
export async function addFeedback(feedback) {
  try {
    // Check user restriction status first
    const restriction = await checkUserRestriction(feedback.userEmail);
    if (restriction.status === 'banned') {
      throw new Error('USER_BANNED');
    }
    if (restriction.status === 'restricted') {
      throw new Error(`USER_RESTRICTED:${restriction.until}`);
    }

    const aiResult = await checkSubmissionSpam(feedback.title, feedback.description);
    
    const feedbackDoc = {
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      status: 'pending',
      aiFlaggedSpam: aiResult.isSpam,
      aiSpamReason: aiResult.reason,
      ...feedback
    };
    const docRef = await addDoc(collection(db, FEEDBACK_COLLECTION), feedbackDoc);
    return docRef.id;
  } catch (e) {
    console.error('Failed to save feedback in Firestore:', e);
    throw e;
  }
}

/**
 * Retrieves all user feedbacks ordered by timestamp desc (for Admin use).
 */
export async function getFeedbacks() {
  try {
    const q = query(collection(db, FEEDBACK_COLLECTION), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const list = [];
    querySnapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (e) {
    console.error('Failed to retrieve feedback from Firestore:', e);
    return [];
  }
}

/**
 * Soft deletes a feedback entry from Firestore by marking its status as 'deleted'.
 */
export async function deleteFeedback(id) {
  try {
    const docRef = doc(db, FEEDBACK_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { ...docSnap.data(), status: 'deleted' });
    }
  } catch (e) {
    console.error('Failed to soft delete feedback from Firestore:', e);
  }
  return getFeedbacks();
}

/**
 * Checks if a user email is banned or restricted.
 */
export async function checkUserRestriction(email) {
  try {
    if (!email) return { status: 'none', until: null };
    const id = email.replace(/[^a-zA-Z0-9]/g, '_');
    const docRef = doc(db, RESTRICTIONS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.status === 'banned') {
        return { status: 'banned', until: null, reason: data.reason || 'No reason specified', hasAppealed: !!data.hasAppealed };
      }
      if (data.status === 'restricted') {
        if (data.until && data.until > Date.now()) {
          return { status: 'restricted', until: data.until, reason: data.reason || 'No reason specified' };
        } else {
          // Restriction expired, auto-clean
          await deleteDoc(docRef);
        }
      }
    }
    return { status: 'none', until: null };
  } catch (e) {
    console.error('Failed to check user restriction:', e);
    return { status: 'none', until: null };
  }
}

/**
 * Automatically sweeps and deletes/flags all materials and feedbacks from a restricted/banned user.
 */
export async function autoModerationSweep(email) {
  if (!email) return;
  try {
    // 1. Soft delete all feedback entries from this user
    const feedbackQuery = query(collection(db, FEEDBACK_COLLECTION), where('userEmail', '==', email));
    const feedbackSnap = await getDocs(feedbackQuery);
    for (const docSnap of feedbackSnap.docs) {
      await setDoc(doc(db, FEEDBACK_COLLECTION, docSnap.id), {
        ...docSnap.data(),
        status: 'deleted'
      });
    }

    // 2. Hard delete all pending contributions from this user
    const pendingQuery = query(collection(db, 'pending_contributions'), where('contributorEmail', '==', email));
    const pendingSnap = await getDocs(pendingQuery);
    for (const docSnap of pendingSnap.docs) {
      await deleteDoc(doc(db, 'pending_contributions', docSnap.id));
    }


  } catch (e) {
    console.error('Failed to execute auto-moderation sweep:', e);
  }
}

/**
 * Restricts a user temporarily for 24 hours.
 */
export async function restrictUser(email, reason = 'Violating community guidelines') {
  try {
    const id = email.replace(/[^a-zA-Z0-9]/g, '_');
    const docRef = doc(db, RESTRICTIONS_COLLECTION, id);
    await setDoc(docRef, {
      email,
      status: 'restricted',
      until: Date.now() + 24 * 60 * 60 * 1000,
      reason,
      timestamp: Date.now()
    });
    // Run the auto-moderation sweep
    await autoModerationSweep(email);
  } catch (e) {
    console.error('Failed to restrict user:', e);
  }
}

/**
 * Bans a user permanently.
 */
export async function banUser(email, reason = 'Violating community guidelines') {
  try {
    const id = email.replace(/[^a-zA-Z0-9]/g, '_');
    const docRef = doc(db, RESTRICTIONS_COLLECTION, id);
    await setDoc(docRef, {
      email,
      status: 'banned',
      until: null,
      reason,
      hasAppealed: false,
      timestamp: Date.now()
    });
    // Run the auto-moderation sweep
    await autoModerationSweep(email);
  } catch (e) {
    console.error('Failed to ban user:', e);
  }
}

/**
 * Removes user restriction/ban.
 */
export async function removeUserRestriction(email) {
  try {
    const id = email.replace(/[^a-zA-Z0-9]/g, '_');
    await deleteDoc(doc(db, RESTRICTIONS_COLLECTION, id));
    // Also auto-clean any corresponding appeal
    await deleteDoc(doc(db, APPEALS_COLLECTION, id));
  } catch (e) {
    console.error('Failed to remove user restriction:', e);
  }
}

/**
 * Retrieves all current active bans & restrictions.
 */
export async function getRestrictions() {
  try {
    const querySnapshot = await getDocs(collection(db, RESTRICTIONS_COLLECTION));
    const list = [];
    querySnapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (e) {
    console.error('Failed to retrieve restrictions:', e);
    return [];
  }
}

/**
 * Submits an appeal for a banned user.
 */
export async function submitAppeal(email, name, message) {
  try {
    const id = email.replace(/[^a-zA-Z0-9]/g, '_');
    const docRef = doc(db, APPEALS_COLLECTION, id);
    
    // Save appeal doc
    await setDoc(docRef, {
      email,
      name,
      message,
      timestamp: Date.now(),
      date: new Date().toISOString().split('T')[0]
    });

    // Mark as appealed in restriction doc
    const restrictionRef = doc(db, RESTRICTIONS_COLLECTION, id);
    const restrictionSnap = await getDoc(restrictionRef);
    if (restrictionSnap.exists()) {
      await setDoc(restrictionRef, {
        ...restrictionSnap.data(),
        hasAppealed: true
      });
    }
  } catch (e) {
    console.error('Failed to submit appeal:', e);
    throw e;
  }
}

/**
 * Retrieves all submitted appeals.
 */
export async function getAppeals() {
  try {
    const querySnapshot = await getDocs(collection(db, APPEALS_COLLECTION));
    const list = [];
    querySnapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (e) {
    console.error('Failed to retrieve appeals:', e);
    return [];
  }
}

/**
 * Deletes/dismisses an appeal.
 */
export async function deleteAppeal(email) {
  try {
    const id = email.replace(/[^a-zA-Z0-9]/g, '_');
    await deleteDoc(doc(db, APPEALS_COLLECTION, id));
  } catch (e) {
    console.error('Failed to delete appeal:', e);
  }
}
