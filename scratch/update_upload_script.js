import fs from 'fs';

const filepath = 'scratch/upload_syllabi.js';
let content = fs.readFileSync(filepath, 'utf8');

// Replace all branchId: "cse"
content = content.replaceAll('branchId: "cse"', 'branchId: "copc"');

// Replace if (subjectInfo.branchId === 'cse')
content = content.replace("subjectInfo.branchId === 'cse'", "subjectInfo.branchId === 'copc'");

// Add cleanup for cse prefix inside loop
const targetCleanup = "try {\n      const oldDocRef = doc(db, 'resources', `res-syllabus-${subjectId}`);\n      await deleteDoc(oldDocRef);\n    } catch (err) {\n      // ignore\n    }";

const replacementCleanup = `try {
      const oldDocRef = doc(db, 'resources', \`res-syllabus-\${subjectId}\`);
      await deleteDoc(oldDocRef);
    } catch (err) {}
    try {
      const cseDocRef = doc(db, 'resources', \`res-syllabus-cse-\${subjectId}\`);
      await deleteDoc(cseDocRef);
    } catch (err) {}`;

content = content.replace(targetCleanup, replacementCleanup);

fs.writeFileSync(filepath, content, 'utf8');
console.log("Updated upload_syllabi.js successfully!");
