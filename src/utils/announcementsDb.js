import { db } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const ANNOUNCEMENTS_COLLECTION = 'announcements';

const defaultAnnouncements = [
  {
    id: 'ann-1',
    title: 'End-Semester Examination Date Sheet Released',
    content: 'The official date sheet for the End-Semester Examinations of May-June 2026 has been published by the Academic Section. Please download the PDF circular using the link below to verify your subject codes and slots.',
    date: '2026-06-18',
    category: 'academic',
    important: true,
    link: 'https://www.thapar.edu/academics/academic-calendar'
  },
  {
    id: 'ann-2',
    title: 'ACM Student Chapter Recruitment Drive 2026',
    content: 'ACM Thapar Chapter is opening recruitments for developers, UI/UX designers, and technical writers. Applications are open to all years. Click the link to register for the coding round and panel interview.',
    date: '2026-06-19',
    category: 'society',
    important: false,
    link: 'https://societies.thapar.edu'
  },
  {
    id: 'ann-3',
    title: 'Saturnalia Cultural Fest Team Registrations Open',
    content: 'Get ready for the biggest cultural fest of TIET! Core committee registrations for Saturnalia 2026 are now active. Submissions close on June 25. Check the details and submit your team proposal.',
    date: '2026-06-20',
    category: 'event',
    important: false,
    link: 'https://www.thapar.edu'
  }
];

export async function seedAnnouncements() {
  try {
    for (const ann of defaultAnnouncements) {
      await setDoc(doc(db, ANNOUNCEMENTS_COLLECTION, ann.id), ann);
    }
    console.log('Seeded default announcements.');
  } catch (e) {
    console.error('Failed to seed announcements:', e);
  }
}

export async function getAnnouncements() {
  try {
    const querySnapshot = await getDocs(collection(db, ANNOUNCEMENTS_COLLECTION));
    const list = [];
    querySnapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });

    if (list.length === 0) {
      await seedAnnouncements();
      // Refetch
      const refSnapshot = await getDocs(collection(db, ANNOUNCEMENTS_COLLECTION));
      refSnapshot.forEach(docSnap => {
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
    // Return sorted default announcements on fallback
    const sortedDefaults = [...defaultAnnouncements].sort((a, b) => {
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;
      return new Date(b.date) - new Date(a.date);
    });
    return sortedDefaults;
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
