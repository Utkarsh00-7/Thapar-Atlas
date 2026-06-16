import { db } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { academicData as templateAcademicData } from './resourcesData';

const RESOURCES_COLLECTION = 'resources';

/**
 * Seeds the initial mock data from resourcesData.js into Firestore resources collection.
 */
async function seedResourcesFromTemplate() {
  try {
    const batch = [];
    templateAcademicData.forEach(year => {
      year.branches.forEach(branch => {
        if (branch.subjects) {
          branch.subjects.forEach(subject => {
            if (subject.resources) {
              Object.entries(subject.resources).forEach(([typeId, files]) => {
                if (Array.isArray(files)) {
                  files.forEach(file => {
                    batch.push({
                      id: file.id || `res-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                      yearId: year.id,
                      branchId: branch.id,
                      subjectId: subject.id,
                      typeId,
                      title: file.title || 'Untitled',
                      date: file.date || new Date().toISOString().split('T')[0],
                      size: file.size || 'Link',
                      downloads: file.downloads || 0,
                      isLink: file.isLink ?? true,
                      link: file.link || '#',
                      uploadedBy: file.uploadedBy || 'Curated',
                      isDirectUpload: file.isDirectUpload || false,
                      fileName: file.fileName || ''
                    });
                  });
                }
              });
            }
          });
        }
      });
    });

    for (const item of batch) {
      await setDoc(doc(db, RESOURCES_COLLECTION, item.id), item);
    }
    console.log('Seeded Firestore resources successfully.');
  } catch (e) {
    console.error('Failed to seed resources template:', e);
  }
}

export async function getAcademicData() {
  try {
    const querySnapshot = await getDocs(collection(db, RESOURCES_COLLECTION));
    const flatResources = [];
    querySnapshot.forEach(docSnap => {
      flatResources.push({ id: docSnap.id, ...docSnap.data() });
    });

    // Clone nested structure template
    const clonedData = JSON.parse(JSON.stringify(templateAcademicData));

    // Clear template resources array content to build completely from Firestore
    clonedData.forEach(year => {
      year.branches.forEach(branch => {
        if (branch.subjects) {
          branch.subjects.forEach(subject => {
            subject.resources = {
              notes: [],
              pyq: [],
              'pyq-answer': [],
              book: [],
              'lab-manual': [],
              youtube: [],
              tutorial: [],
              syllabus: [],
            };
          });
        }
      });
    });

    // Populate with Firestore resources
    flatResources.forEach(res => {
      const year = clonedData.find(y => y.id === res.yearId);
      if (year) {
        const branch = year.branches.find(b => b.id === res.branchId);
        if (branch) {
          const subject = branch.subjects.find(s => s.id === res.subjectId);
          if (subject) {
            if (!subject.resources[res.typeId]) {
              subject.resources[res.typeId] = [];
            }
            subject.resources[res.typeId].push(res);
          }
        }
      }
    });

    return clonedData;
  } catch (e) {
    console.error('Failed to fetch academic resources from Firestore, returning empty template:', e);
    // Return empty template structure even on failure so page layout renders
    const clonedData = JSON.parse(JSON.stringify(templateAcademicData));
    clonedData.forEach(year => {
      year.branches.forEach(branch => {
        if (branch.subjects) {
          branch.subjects.forEach(subject => {
            subject.resources = {
              notes: [],
              pyq: [],
              'pyq-answer': [],
              book: [],
              'lab-manual': [],
              youtube: [],
              tutorial: [],
              syllabus: [],
            };
          });
        }
      });
    });
    return clonedData;
  }
}

/**
 * Adds a new resource to Firestore.
 */
export async function addResource(yearId, branchId, subjectId, typeId, resource) {
  try {
    const docRef = doc(db, RESOURCES_COLLECTION, resource.id);
    await setDoc(docRef, {
      yearId,
      branchId,
      subjectId,
      typeId,
      ...resource
    });
  } catch (e) {
    console.error('Failed to add resource to Firestore: ', e);
  }
  return getAcademicData();
}

/**
 * Deletes a resource from Firestore.
 */
export async function deleteResource(yearId, branchId, subjectId, typeId, resourceId) {
  try {
    const docRef = doc(db, RESOURCES_COLLECTION, resourceId);
    await deleteDoc(docRef);
  } catch (e) {
    console.error('Failed to delete resource from Firestore: ', e);
  }
  return getAcademicData();
}

/**
 * Clears all resources from database.
 */
export async function resetDatabase() {
  try {
    const querySnapshot = await getDocs(collection(db, RESOURCES_COLLECTION));
    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(doc(db, RESOURCES_COLLECTION, docSnap.id));
    }
    console.log('Cleared all resources from database.');
  } catch (e) {
    console.error('Failed to clear resources collection: ', e);
  }
  return getAcademicData();
}

/**
 * Keep signature for compatibility, does not export locally since we use Firestore.
 */
export function exportAsJSCode() {
  return `// We have migrated to Firebase. All changes are saved in real-time to Firestore.`;
}
