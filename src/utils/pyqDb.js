import { db } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { pyqData as initialPyqData } from './pyqData';

const PYQS_COLLECTION = 'pyqs';

/**
 * Seeds initial question papers from pyqData.js into Firestore collection.
 */
async function seedPyqTemplate() {
  try {
    for (const paper of initialPyqData) {
      await setDoc(doc(db, PYQS_COLLECTION, paper.id), {
        subjectCode: paper.subjectCode || 'UTA000',
        subjectName: paper.subjectName || 'Untitled Subject',
        studyYear: Number(paper.studyYear),
        branch: paper.branch || 'General',
        examType: paper.examType || 'EST',
        paperYear: paper.paperYear || '2024',
        fileUrl: paper.fileUrl || '#',
        answerUrl: paper.answerUrl || null,
        downloads: paper.downloads || 0,
        isDirectUpload: paper.isDirectUpload || false,
        fileName: paper.fileName || ''
      });
    }
  } catch (e) {
    console.error('Failed to seed PYQ database:', e);
  }
}

export async function getPyqData() {
  try {
    const querySnapshot = await getDocs(collection(db, PYQS_COLLECTION));
    const list = [];
    querySnapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });

    return list;
  } catch (e) {
    console.error('Failed to fetch PYQs from Firestore, returning empty list:', e);
    return [];
  }
}

/**
 * Adds a new PYQ item to Firestore.
 */
export async function addPyq(pyq) {
  try {
    const docRef = doc(db, PYQS_COLLECTION, pyq.id);
    await setDoc(docRef, pyq);
  } catch (e) {
    console.error('Failed to add PYQ to Firestore:', e);
  }
  return getPyqData();
}

/**
 * Deletes a PYQ item from Firestore.
 */
export async function deletePyq(id) {
  try {
    const docRef = doc(db, PYQS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error('Failed to delete PYQ from Firestore:', e);
  }
  return getPyqData();
}

/**
 * Resets the PYQ database back to defaults in Firestore.
 */
export async function resetPyqDatabase() {
  try {
    const querySnapshot = await getDocs(collection(db, PYQS_COLLECTION));
    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(doc(db, PYQS_COLLECTION, docSnap.id));
    }
  } catch (e) {
    console.error('Failed to clear PYQ collection:', e);
  }
  return getPyqData();
}

/**
 * Increments the download count of a specific PYQ paper in Firestore.
 */
export async function incrementPyqDownloads(id) {
  try {
    const docRef = doc(db, PYQS_COLLECTION, id);
    await updateDoc(docRef, {
      downloads: increment(1)
    });
  } catch (e) {
    console.error('Failed to increment PYQ downloads in Firestore:', e);
  }
}

