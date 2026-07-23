import { db } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { withTimeout } from './helpers';

const ANNOUNCEMENTS_COLLECTION = 'announcements';

const defaultAnnouncements = [];

export async function seedAnnouncements() {
  // Production default: no-op to prevent seeding mock data
}

export async function getAnnouncements() {
  try {
    const querySnapshot = await withTimeout(getDocs(collection(db, ANNOUNCEMENTS_COLLECTION)), 4000, null);
    const list = [];
    if (querySnapshot) {
      querySnapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
    }

    // Sort: Pinned/Important first, then date descending
    list.sort((a, b) => {
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;
      return new Date(b.date) - new Date(a.date);
    });

    return list;
  } catch (e) {
    console.error('Failed to fetch announcements:', e);
    return [];
  }
}

export async function addAnnouncement(announcement) {
  try {
    const id = announcement.id || `ann-${Date.now()}`;
    const docRef = doc(db, ANNOUNCEMENTS_COLLECTION, id);
    const data = {
      id,
      title: announcement.title || 'Untitled Announcement',
      content: announcement.content || '',
      date: announcement.date || new Date().toISOString().split('T')[0],
      category: announcement.category || 'general',
      important: !!announcement.important,
      link: announcement.link || ''
    };
    await setDoc(docRef, data);
  } catch (e) {
    console.error('Failed to add announcement:', e);
  }
  return getAnnouncements();
}

export async function deleteAnnouncement(id) {
  try {
    await deleteDoc(doc(db, ANNOUNCEMENTS_COLLECTION, id));
  } catch (e) {
    console.error('Failed to delete announcement:', e);
  }
  return getAnnouncements();
}
