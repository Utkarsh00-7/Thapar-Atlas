import fs from 'fs';
import path from 'path';
import { Blob } from 'buffer';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-W5GpLn6PArv29iUArnWoeKjMU7KOpsM",
  authDomain: "thapar-atlas.firebaseapp.com",
  projectId: "thapar-atlas",
  storageBucket: "thapar-atlas.firebasestorage.app",
  messagingSenderId: "864277328128",
  appId: "1:864277328128:web:62c6581bcaedcc1d5143e5",
  measurementId: "G-6VJ2GSJMB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const subjectMap = {
  // Pool A
  "calculus": { yearId: 1, branchId: "pool-a", name: "Calculus for Engineers" },
  "chemistry-a": { yearId: 1, branchId: "pool-a", name: "Chemistry" },
  "eee": { yearId: 1, branchId: "pool-a", name: "Electrical & Electronic Engineering" },
  "energy-env-a": { yearId: 1, branchId: "pool-a", name: "Energy and Environment" },
  "pps-a": { yearId: 1, branchId: "pool-a", name: "Programming for Problem Solving" },
  
  // Pool B
  "dela": { yearId: 1, branchId: "pool-b", name: "Differential Equations and Linear Algebra" },
  "ed-b": { yearId: 1, branchId: "pool-b", name: "Engineering Drawing" },
  "mp": { yearId: 1, branchId: "pool-b", name: "Manufacturing Process" },
  "physics-b": { yearId: 1, branchId: "pool-b", name: "Physics" },
  "procomm-b": { yearId: 1, branchId: "pool-b", name: "Professional Communication" },

  // 2nd Year
  "os": { yearId: 2, branchId: "copc", name: "Operating System" },
  "oop": { yearId: 2, branchId: "copc", name: "Object Oriented Programming" },
  "ds": { yearId: 2, branchId: "copc", name: "Data Structures" },
  "discrete": { yearId: 2, branchId: "copc", name: "Discrete Mathematical Structures" },
  "edp1": { yearId: 2, branchId: "copc", name: "Engineering Design Project I" },
  "nla": { yearId: 2, branchId: "copc", name: "Numerical Linear Algebra" },
  "green-computing": { yearId: 2, branchId: "copc", name: "Introduction to Sustainable Green Computing" },
  "algo": { yearId: 2, branchId: "copc", name: "Design and Analysis of Algorithms" },
  "dbms": { yearId: 2, branchId: "copc", name: "Database Management Systems" },
  "networks": { yearId: 2, branchId: "copc", name: "Computer Networks" },
  "ai-eng": { yearId: 2, branchId: "copc", name: "AI for Engineers" },
  "probability-stats": { yearId: 2, branchId: "copc", name: "Probability and Statistics" },
  "edp2": { yearId: 2, branchId: "copc", name: "Engineering Design Project II" },
  "aptitude": { yearId: 2, branchId: "copc", name: "Aptitude Skills Building" },

  // 3rd Year
  "ml": { yearId: 3, branchId: "copc", name: "Machine Learning" },
  "cognitive": { yearId: 3, branchId: "copc", name: "Cognitive Computing" },
  "web-app": { yearId: 3, branchId: "copc", name: "Enterprise Web Application" },
  "se": { yearId: 3, branchId: "copc", name: "Software Engineering" },
  "cao": { yearId: 3, branchId: "copc", name: "Computer Architecture and Organization" },
  "ethics-ai": { yearId: 3, branchId: "copc", name: "Ethics and Risk Mitigation in AI" },
  "toc": { yearId: 3, branchId: "copc", name: "Theory of Computation" },
  "optimization": { yearId: 3, branchId: "copc", name: "Optimization Techniques" },
  "quantum-computing": { yearId: 3, branchId: "copc", name: "Quantum Computing" },
  "innovation": { yearId: 3, branchId: "copc", name: "Innovation and Entrepreneurship" },
  "capstone1": { yearId: 3, branchId: "copc", name: "Capstone Project" },

  // 4th Year
  "compiler": { yearId: 4, branchId: "copc", name: "Compiler Construction" },
  "humanities": { yearId: 4, branchId: "copc", name: "Humanities for Engineers" },
  "agentic-ai": { yearId: 4, branchId: "copc", name: "Agentic AI" },
  "sna": { yearId: 4, branchId: "copc", name: "Social Network Analysis" },
  "ethical-hacking": { yearId: 4, branchId: "copc", name: "Ethical Hacking" }
};

const SYLLABI_DIR = 'public/syllabi';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dsff7vad7/auto/upload';
const PRESET = 'thapar_atlas';

async function uploadSyllabus(filePath) {
  const fileName = path.basename(filePath);
  const subjectId = fileName.replace('_syllabus.pdf', '');
  const subjectInfo = subjectMap[subjectId];

  if (!subjectInfo) {
    console.warn(`No mapping found for subjectId: ${subjectId} (${fileName})`);
    return;
  }

  const fileStats = fs.statSync(filePath);
  const fileSizeKb = (fileStats.size / 1024).toFixed(1);

  console.log(`Uploading ${fileName} (${fileSizeKb} KB) for ${subjectInfo.name}...`);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('upload_preset', PRESET);

    const res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Cloudinary upload failed: ${res.statusText} - ${errText}`);
    }

    const data = await res.json();
    const secureUrl = data.secure_url;
    console.log(`✓ Cloudinary Uploaded: ${secureUrl}`);

    // Delete the old orphaned document ID if it exists
    try {
      const oldDocRef = doc(db, 'resources', `res-syllabus-${subjectId}`);
      await deleteDoc(oldDocRef);
    } catch (err) {}
    try {
      const cseDocRef = doc(db, 'resources', `res-syllabus-cse-${subjectId}`);
      await deleteDoc(cseDocRef);
    } catch (err) {}

    // Store in Firestore
    const branches = [subjectInfo.branchId];
    if (subjectInfo.branchId === 'copc') {
      branches.push('coe');
    }

    for (const bId of branches) {
      const resId = `res-syllabus-${bId}-${subjectId}`;
      const resourceDoc = {
        id: resId,
        yearId: subjectInfo.yearId,
        branchId: bId,
        subjectId: subjectId,
        typeId: 'syllabus',
        title: `${subjectInfo.name} Syllabus`,
        date: new Date().toISOString().split('T')[0],
        size: `${fileSizeKb} KB`,
        downloads: 0,
        isLink: false,
        link: secureUrl,
        uploadedBy: 'Curated',
        isDirectUpload: true,
        fileName: `${subjectId}_syllabus.pdf`
      };

      const docRef = doc(db, 'resources', resId);
      await setDoc(docRef, resourceDoc);
      console.log(`✓ Registered in Firestore: resources/${resId}`);
    }
    console.log('');
  } catch (error) {
    console.error(`✗ Error uploading/saving ${fileName}:`, error.message);
  }
}

async function run() {
  if (!fs.existsSync(SYLLABI_DIR)) {
    console.error(`Syllabi directory ${SYLLABI_DIR} does not exist!`);
    process.exit(1);
  }

  const files = fs.readdirSync(SYLLABI_DIR).filter(file => file.endsWith('_syllabus.pdf'));
  console.log(`Found ${files.length} syllabus PDF files. Starting upload...`);

  for (const file of files) {
    const filePath = path.join(SYLLABI_DIR, file);
    await uploadSyllabus(filePath);
  }

  console.log('All uploads and database registration complete.');
}

run();
