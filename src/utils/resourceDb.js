import { db } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { academicData as templateAcademicData } from './resourcesData';
import { getPyqData, incrementPyqDownloads } from './pyqDb';

const RESOURCES_COLLECTION = 'resources';

/**
 * Seeds the initial template data from resourcesData.js into Firestore resources collection.
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
    // Seeded successfully
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

    // Sort each resource category list by order index
    clonedData.forEach(year => {
      year.branches.forEach(branch => {
        if (branch.subjects) {
          branch.subjects.forEach(subject => {
            if (subject.resources) {
              Object.keys(subject.resources).forEach(typeId => {
                if (Array.isArray(subject.resources[typeId])) {
                  subject.resources[typeId].sort((a, b) => (a.order ?? 99999) - (b.order ?? 99999));
                }
              });
            }
          });
        }
      });
    });

    // NOW dynamically match and append all subject previous year papers (PYQs)
    try {
      const pyqs = await getPyqData();
      
      const SUBJECT_CODES = {
        'calculus': ['UMA022', 'UMA003', 'UMA001'],
        'chemistry-a': ['UCB009', 'UCB001', 'UCB008', 'UCB010'],
        'eee': ['UES013', 'UES003', 'UES004'],
        'energy-env-a': ['UEN008', 'UEN002'],
        'pps-a': ['UES103', 'UTA007', 'UTA017'],
        'dela': ['UMA023', 'UMA002', 'UMA007'],
        'ed-b': ['UES101', 'UES104'],
        'mp': ['UES102', 'UES132'],
        'physics-b': ['UPH013', 'UPH004', 'UPH009'],
        'procomm-b': ['UHU003', 'UHU001', 'UHU081'],
        'os': ['UCS303', 'UCS401', 'UCS507'],
        'oop': ['UTA018', 'UTA002', 'UTA012'],
        'ds': ['UCS301', 'UCS402', 'UCS302'],
        'discrete': ['UCS405', 'UMA004'],
        'edp1': ['UTA016'],
        'nla': ['UMA021'],
        'green-computing': ['UCS320'],
        'algo': ['UCS415', 'UCS403', 'UCS501'],
        'dbms': ['UCS310', 'UCS404', 'UCS502'],
        'networks': ['UCS414', 'UCS613'],
        'ai-eng': ['UCS411', 'UCS321'],
        'probability-stats': ['UMA401', 'UMA402'],
        'edp2': ['UTA024'],
        'aptitude': ['UTD003'],
        'ml': ['UML501', 'UCS608', 'UCS616'],
        'cognitive': ['UCS420'],
        'web-app': ['UCS553', 'UCS606'],
        'se': ['UCS503', 'UCS408'],
        'cao': ['UCS510', 'UCS406'],
        'ethics-ai': ['UCS421'],
        'toc': ['UCS701', 'UCS505', 'UCS601'],
        'optimization': ['UMA035', 'UMA071'],
        'quantum-computing': ['UCS619'],
        'innovation': ['UTA025'],
        'capstone1': ['UCS797'],
        'compiler': ['UCS802', 'UCS602', 'UCS614'],
        'humanities': ['UHU005', 'UHU002'],
        'agentic-ai': ['UCS714'],
        'sna': ['UCS813'],
        'ethical-hacking': ['UCS806'],
        'image-processing': ['UCS615', 'UCS605'],
        'evolutionary-psychology': ['UHU050']
      };

      const CLEAN_CODES = {};
      Object.keys(SUBJECT_CODES).forEach(key => {
        CLEAN_CODES[key] = SUBJECT_CODES[key].map(c => c.toLowerCase().trim());
      });

      const cleanStr = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

      pyqs.forEach(paper => {
        const paperName = cleanStr(paper.subjectName);
        const paperCode = (paper.subjectCode || '').toLowerCase().trim();
        
        // Find matching subject in clonedData
        let matchedSubject = null;
        
        // 1. Try Code-first matching using historical/alternative codes
        clonedData.forEach(year => {
          year.branches.forEach(branch => {
            if (branch.subjects) {
              branch.subjects.forEach(subj => {
                const sId = subj.id;
                if (CLEAN_CODES[sId] && CLEAN_CODES[sId].includes(paperCode)) {
                  matchedSubject = subj;
                }
              });
            }
          });
        });

        // 2. Fall back to name-first matching if code didn't resolve
        if (!matchedSubject) {
          clonedData.forEach(year => {
            year.branches.forEach(branch => {
              if (branch.subjects) {
                branch.subjects.forEach(subj => {
                  const subjName = cleanStr(subj.name);
                  const isMatch = (
                    paperName === subjName ||
                    subjName.includes(paperName) ||
                    paperName.includes(subjName)
                  );
                  if (isMatch) {
                    matchedSubject = subj;
                  }
                });
              }
            });
          });
        }

        if (matchedSubject) {
          // Construct resource-compatible object for the Question Paper
          const pyqItem = {
            id: `${paper.id}-paper`,
            title: `${paper.examType} ${paper.paperYear} Paper (${paper.subjectCode || 'General'})`,
            uploadedBy: 'Curated',
            date: `${paper.paperYear}-06-15`, // Default to mid-year of the paper
            size: 'PDF',
            downloads: paper.downloads || 0,
            isLink: false,
            link: paper.fileUrl,
            isDirectUpload: paper.isDirectUpload || false,
            fileName: paper.fileName || ''
          };
          matchedSubject.resources.pyq.push(pyqItem);

          // If there is an answer key URL, construct and push a resource-compatible object for it
          if (paper.answerUrl && paper.answerUrl.trim() !== '' && paper.answerUrl !== '#') {
            const answerItem = {
              id: `${paper.id}-answer`,
              title: `${paper.examType} ${paper.paperYear} Answer Key (${paper.subjectCode || 'General'})`,
              uploadedBy: 'Curated',
              date: `${paper.paperYear}-06-15`,
              size: 'PDF',
              downloads: 0,
              isLink: false,
              link: paper.answerUrl,
              isDirectUpload: false,
              fileName: ''
            };
            matchedSubject.resources['pyq-answer'].push(answerItem);
          }
        }
      });
    } catch (pyqErr) {
      console.error('Failed to load and inject PYQs into academic resources:', pyqErr);
    }

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

/**
 * Increments the download count of a specific academic resource document in Firestore.
 */
export async function incrementResourceDownloads(id) {
  try {
    if (id.endsWith('-paper')) {
      const realPyqId = id.replace('-paper', '');
      await incrementPyqDownloads(realPyqId);
      return;
    }
    if (id.endsWith('-answer')) {
      const realPyqId = id.replace('-answer', '');
      await incrementPyqDownloads(realPyqId);
      return;
    }
    const docRef = doc(db, RESOURCES_COLLECTION, id);
    await updateDoc(docRef, {
      downloads: increment(1)
    });
  } catch (e) {
    console.error('Failed to increment resource downloads in Firestore:', e);
  }
}

/**
 * Persists the custom dragged order of a resource list in Firestore.
 */
export async function reorderResourcesInDb(reorderedList) {
  try {
    for (let index = 0; index < reorderedList.length; index++) {
      const item = reorderedList[index];
      if (!item.id || item.id.endsWith('-paper') || item.id.endsWith('-answer')) continue;
      const docRef = doc(db, RESOURCES_COLLECTION, item.id);
      await updateDoc(docRef, { order: index });
    }
  } catch (e) {
    console.error('Failed to update resource order in Firestore:', e);
  }
  return getAcademicData();
}

