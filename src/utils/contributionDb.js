import { db } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { addResource } from './resourceDb';
import { addPyq } from './pyqDb';
import { academicData } from './resourcesData';
import { checkSubmissionSpam } from './moderationAi';

const PENDING_COLLECTION = 'pending_contributions';

/**
 * Retrieves the queue of pending contributions from Firestore.
 */
export async function getPendingContributions() {
  try {
    const querySnapshot = await getDocs(collection(db, PENDING_COLLECTION));
    const list = [];
    querySnapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (e) {
    console.error('Failed to parse pending contributions from Firestore:', e);
    return [];
  }
}

/**
 * Adds a new contribution to the pending queue in Firestore.
 */
export async function addPendingContribution(contribution) {
  try {
    const { fileBase64, fileMimeType, ...cleanContrib } = contribution;
    const aiResult = await checkSubmissionSpam(
      contribution.title,
      `${contribution.subjectName || ''} ${contribution.fileName || ''}`,
      fileBase64,
      fileMimeType
    );
    const id = `contrib-${Date.now()}`;
    const newContrib = {
      date: new Date().toISOString().split('T')[0],
      downloads: 0,
      aiFlaggedSpam: aiResult.isSpam,
      aiSpamReason: aiResult.reason,
      ...cleanContrib,
    };
    await setDoc(doc(db, PENDING_COLLECTION, id), newContrib);
  } catch (e) {
    console.error('Failed to save pending contribution in Firestore:', e);
  }
  return getPendingContributions();
}

/**
 * Approves a pending contribution and adds it to the appropriate live database.
 */
export async function approveContribution(id) {
  try {
    const queue = await getPendingContributions();
    const contrib = queue.find(c => c.id === id);
    
    if (!contrib) return queue;
    
    if (contrib.resourceType === 'pyq') {
      // Add to PYQ Database
      const newPyq = {
        id: `pyq-${Date.now()}`,
        subjectCode: contrib.subjectCode || 'UTA000',
        subjectName: contrib.subjectName || 'Unknown Subject',
        studyYear: Number(contrib.yearId),
        branch: getBranchLabel(contrib.yearId, contrib.branchId),
        examType: contrib.examType || 'EST',
        paperYear: contrib.paperYear || String(new Date().getFullYear()),
        fileUrl: contrib.link || '#',
        answerUrl: null,
        downloads: 0,
        isDirectUpload: contrib.isDirectUpload || false,
        fileName: contrib.fileName || '',
        uploadedByEmail: contrib.contributorEmail || null
      };
      await addPyq(newPyq);
    } else {
      // Add to standard Resource Hub database
      const newResource = {
        id: `res-${Date.now()}`,
        title: contrib.title,
        date: contrib.date || new Date().toISOString().split('T')[0],
        size: contrib.size || 'Link',
        downloads: 0,
        isLink: !contrib.isDirectUpload, // It's not an external web link if it's a direct file
        link: contrib.link || '#',
        uploadedBy: contrib.contributorName || 'Anonymous',
        isDirectUpload: contrib.isDirectUpload || false,
        fileName: contrib.fileName || '',
        uploadedByEmail: contrib.contributorEmail || null
      };
      
      await addResource(
        Number(contrib.yearId),
        contrib.branchId,
        contrib.subjectId,
        contrib.resourceType,
        newResource
      );
    }
    
    // Remove from pending_contributions queue
    await deleteDoc(doc(db, PENDING_COLLECTION, id));
  } catch (e) {
    console.error('Failed to approve contribution in Firestore:', e);
  }
  
  return getPendingContributions();
}

/**
 * Rejects (deletes) a pending contribution from the queue.
 */
export async function rejectContribution(id) {
  try {
    await deleteDoc(doc(db, PENDING_COLLECTION, id));
  } catch (e) {
    console.error('Failed to reject contribution in Firestore:', e);
  }
  return getPendingContributions();
}

/**
 * Helper to resolve the branch/pool display label.
 */
function getBranchLabel(yearId, branchId) {
  const yearData = academicData.find(y => y.id === Number(yearId));
  const branchData = yearData?.branches?.find(b => b.id === branchId);
  return branchData ? branchData.name : branchId.toUpperCase();
}
