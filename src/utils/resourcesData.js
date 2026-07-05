/* ═══════════════════════════════════════════════════════════════
   Thapar Atlas — Academic Data for Resource Hub

   ┌─────────────────────────────────────────────────────────────┐
   │  HOW TO ADD A RESOURCE (Step by Step)                      │
   │                                                             │
   │  1. Find the subject variable below (e.g. calculusForEngineers) │
   │  2. Pick the category: notes, pyq, pyq-answer, book,      │
   │     lab-manual, youtube, or tutorial                        │
   │  3. Add a new line inside that array using this format:    │
   │                                                             │
   │  { id: 'unique-id', title: 'Your Title', uploadedBy: 'Name', │
   │    date: '2025-06-15', size: '2.5 MB', downloads: 0 },    │
   │                                                             │
   │  For YouTube links, add isLink: true at the end:           │
   │  { id: 'y1', title: 'Video Title', uploadedBy: 'Curated', │
   │    date: '2025-01-15', size: 'Link', downloads: 0,        │
   │    isLink: true },                                          │
   │                                                             │
   │  4. Save the file — the browser auto-refreshes!            │
   └─────────────────────────────────────────────────────────────┘
   ═══════════════════════════════════════════════════════════════ */

/* ─── Resource Types ─── */
export const resourceTypes = [
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'notes', label: 'Notes' },
  { id: 'pyq', label: 'PYQ' },
  { id: 'pyq-answer', label: 'PYQ Answer' },
  { id: 'book', label: 'Book / Reference' },
  { id: 'lab-manual', label: 'Lab Manual' },
  { id: 'youtube', label: 'YouTube Lectures' },
  { id: 'tutorial', label: 'Tutorial' },
];

/* ═══════════════════════════════════════════════════════════════
   POOL A — RESOURCES
   ═══════════════════════════════════════════════════════════════ */

const calculusForEngineers = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

const chemistryPoolA = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

const electricalElectronicEngineering = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

const energyAndEnvironmentA = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

const programmingForProblemSolvingA = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

/* ═══════════════════════════════════════════════════════════════
   POOL B — RESOURCES
   ═══════════════════════════════════════════════════════════════ */

const differentialEquationsLinearAlgebra = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

const engineeringDrawingB = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

const manufacturingProcess = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

const physicsPoolB = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

const professionalCommunicationB = {
  notes: [],
  pyq: [],
  'pyq-answer': [],
  book: [],
  'lab-manual': [],
  youtube: [],
  tutorial: [],
};

/* ═══════════════════════════════════════════════════════════════
   CSBS — RESOURCES
   ═══════════════════════════════════════════════════════════════ */

const bcvs1 = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const bcvs2 = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const dsaCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const discreteMathCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const envSciCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const fcsCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const feCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const fpCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const laCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const peeCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const peCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const psCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const smCSBS = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

/* ═══════════════════════════════════════════════════════════════
   BIOTECH — RESOURCES
   ═══════════════════════════════════════════════════════════════ */

const biochem1 = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const biochemLab = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const cellBioGenetics = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const chemBio = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const edBio = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const energyBio = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const introMath1 = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const introMath2 = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const physicsBio = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const procommBio = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const ppsBio = {
  notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [],
};

const cseCoeSubjects2ndYear = [
  { id: 'os', name: 'Operating System', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'oop', name: 'Object Oriented Programming', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ds', name: 'Data Structures', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'discrete', name: 'Discrete Mathematical Structures', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edp1', name: 'Engineering Design Project I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nla', name: 'Numerical Linear Algebra', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'green-computing', name: 'Introduction to Sustainable Green Computing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'algo', name: 'Design and Analysis of Algorithms', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'dbms', name: 'Database Management Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'networks', name: 'Computer Networks', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ai-eng', name: 'AI for Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'probability-stats', name: 'Probability and Statistics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edp2', name: 'Engineering Design Project II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'aptitude', name: 'Aptitude Skills Building', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'evolutionary-psychology', name: 'Evolutionary Psychology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cseCoeSubjects3rdYear = [
  { id: 'ml', name: 'Machine Learning', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cognitive', name: 'Cognitive Computing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'web-app', name: 'Enterprise Web Application', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'se', name: 'Software Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cao', name: 'Computer Architecture and Organization', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ethics-ai', name: 'Ethics and Risk Mitigation in AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'toc', name: 'Theory of Computation', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optimization', name: 'Optimization Techniques', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'quantum-computing', name: 'Quantum Computing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'innovation', name: 'Innovation and Entrepreneurship', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'capstone1', name: 'Capstone Project', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'image-processing', name: 'Image Processing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cseCoeSubjects4thYear = [
  { id: 'compiler', name: 'Compiler Construction', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'humanities', name: 'Humanities for Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'agentic-ai', name: 'Agentic AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'sna', name: 'Social Network Analysis', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ethical-hacking', name: 'Ethical Hacking', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const secondYearBranches = [
  { id: 'coe', name: 'Computer Engineering', abbr: 'COE', comingSoon: false, subjects: cseCoeSubjects2ndYear },
  { id: 'copc', name: 'Computer Science & Engineering', abbr: 'COPC', comingSoon: false, subjects: cseCoeSubjects2ndYear },
  { id: 'cobs', name: 'Computer Science and Business systems', abbr: 'COBS', comingSoon: true, subjects: [] },
  { id: 'dsai', name: 'Artificial Intelligence and Data Science', abbr: 'DSAI', comingSoon: true, subjects: [] },
  { id: 'eec', name: 'Electrical and Computer Engineering', abbr: 'EEC', comingSoon: true, subjects: [] },
  { id: 'ece', name: 'Electronics & Communication Engineering', abbr: 'ECE', comingSoon: true, subjects: [] },
  { id: 'enc', name: 'Electronics and Computer Engineering', abbr: 'ENC', comingSoon: true, subjects: [] },
  { id: 'rai', name: 'Robotics and Artificial Intelligence', abbr: 'RAI', comingSoon: true, subjects: [] },
  { id: 'mee', name: 'Mechanical Engineering', abbr: 'MEE', comingSoon: true, subjects: [] },
  { id: 'che', name: 'Chemical Engineering', abbr: 'CHE', comingSoon: true, subjects: [] },
  { id: 'cie', name: 'Civil Engineering', abbr: 'CIE', comingSoon: true, subjects: [] },
  { id: 'ele', name: 'Electrical Engineering', abbr: 'ELE', comingSoon: true, subjects: [] },
  { id: 'bt', name: 'Biotechnology', abbr: 'BT', comingSoon: true, subjects: [] },
];

const thirdYearBranches = [
  { id: 'coe', name: 'Computer Engineering', abbr: 'COE', comingSoon: false, subjects: cseCoeSubjects3rdYear },
  { id: 'copc', name: 'Computer Science & Engineering', abbr: 'COPC', comingSoon: false, subjects: cseCoeSubjects3rdYear },
  { id: 'cobs', name: 'Computer Science and Business systems', abbr: 'COBS', comingSoon: true, subjects: [] },
  { id: 'dsai', name: 'Artificial Intelligence and Data Science', abbr: 'DSAI', comingSoon: true, subjects: [] },
  { id: 'eec', name: 'Electrical and Computer Engineering', abbr: 'EEC', comingSoon: true, subjects: [] },
  { id: 'ece', name: 'Electronics & Communication Engineering', abbr: 'ECE', comingSoon: true, subjects: [] },
  { id: 'enc', name: 'Electronics and Computer Engineering', abbr: 'ENC', comingSoon: true, subjects: [] },
  { id: 'rai', name: 'Robotics and Artificial Intelligence', abbr: 'RAI', comingSoon: true, subjects: [] },
  { id: 'mee', name: 'Mechanical Engineering', abbr: 'MEE', comingSoon: true, subjects: [] },
  { id: 'che', name: 'Chemical Engineering', abbr: 'CHE', comingSoon: true, subjects: [] },
  { id: 'cie', name: 'Civil Engineering', abbr: 'CIE', comingSoon: true, subjects: [] },
  { id: 'ele', name: 'Electrical Engineering', abbr: 'ELE', comingSoon: true, subjects: [] },
  { id: 'bt', name: 'Biotechnology', abbr: 'BT', comingSoon: true, subjects: [] },
];

const fourthYearBranches = [
  { id: 'coe', name: 'Computer Engineering', abbr: 'COE', comingSoon: false, subjects: cseCoeSubjects4thYear },
  { id: 'copc', name: 'Computer Science & Engineering', abbr: 'COPC', comingSoon: false, subjects: cseCoeSubjects4thYear },
  { id: 'cobs', name: 'Computer Science and Business systems', abbr: 'COBS', comingSoon: true, subjects: [] },
  { id: 'dsai', name: 'Artificial Intelligence and Data Science', abbr: 'DSAI', comingSoon: true, subjects: [] },
  { id: 'eec', name: 'Electrical and Computer Engineering', abbr: 'EEC', comingSoon: true, subjects: [] },
  { id: 'ece', name: 'Electronics & Communication Engineering', abbr: 'ECE', comingSoon: true, subjects: [] },
  { id: 'enc', name: 'Electronics and Computer Engineering', abbr: 'ENC', comingSoon: true, subjects: [] },
  { id: 'rai', name: 'Robotics and Artificial Intelligence', abbr: 'RAI', comingSoon: true, subjects: [] },
  { id: 'mee', name: 'Mechanical Engineering', abbr: 'MEE', comingSoon: true, subjects: [] },
  { id: 'che', name: 'Chemical Engineering', abbr: 'CHE', comingSoon: true, subjects: [] },
  { id: 'cie', name: 'Civil Engineering', abbr: 'CIE', comingSoon: true, subjects: [] },
  { id: 'ele', name: 'Electrical Engineering', abbr: 'ELE', comingSoon: true, subjects: [] },
  { id: 'bt', name: 'Biotechnology', abbr: 'BT', comingSoon: true, subjects: [] },
];

export const academicData = [
  {
    id: 1,
    label: '1st Year',
    tagline: 'Common Pool Subjects',
    icon: 'Layers',
    branches: [
      {
        id: 'pool-a',
        name: 'Pool A',
        abbr: 'A',
        comingSoon: false,
        subjects: [
          { id: 'calculus', name: 'Calculus for Engineers', resources: calculusForEngineers },
          { id: 'chemistry-a', name: 'Chemistry', resources: chemistryPoolA },
          { id: 'eee', name: 'Electrical & Electronic Engineering', resources: electricalElectronicEngineering },
          { id: 'energy-env-a', name: 'Energy and Environment', resources: energyAndEnvironmentA },
          { id: 'pps-a', name: 'Programming for Problem Solving', resources: programmingForProblemSolvingA },
        ],
      },
      {
        id: 'pool-b',
        name: 'Pool B',
        abbr: 'B',
        comingSoon: false,
        subjects: [
          { id: 'dela', name: 'Differential Equations and Linear Algebra', resources: differentialEquationsLinearAlgebra },
          { id: 'ed-b', name: 'Engineering Drawing', resources: engineeringDrawingB },
          { id: 'mp', name: 'Manufacturing Process', resources: manufacturingProcess },
          { id: 'physics-b', name: 'Physics', resources: physicsPoolB },
          { id: 'procomm-b', name: 'Professional Communication', resources: professionalCommunicationB },
        ],
      },
      {
        id: 'csbs',
        name: 'CSBS',
        abbr: 'CSBS',
        comingSoon: false,
        subjects: [
          { id: 'bcvs1', name: 'Business Communication & Value Science – I', resources: bcvs1 },
          { id: 'bcvs2', name: 'Business Communication & Value Science – II', resources: bcvs2 },
          { id: 'dsa-csbs', name: 'Data Structures & Algorithms', resources: dsaCSBS },
          { id: 'dm-csbs', name: 'Discrete Mathematics', resources: discreteMathCSBS },
          { id: 'es-csbs', name: 'Environmental Sciences', resources: envSciCSBS },
          { id: 'fcs', name: 'Fundamentals of Computer Science', resources: fcsCSBS },
          { id: 'fe', name: 'Fundamentals of Economics', resources: feCSBS },
          { id: 'fp', name: 'Fundamentals of Physics', resources: fpCSBS },
          { id: 'la-csbs', name: 'Linear Algebra', resources: laCSBS },
          { id: 'pee', name: 'Principles of Electrical Engineering', resources: peeCSBS },
          { id: 'pe', name: 'Principles of Electronics', resources: peCSBS },
          { id: 'ps-csbs', name: 'Probability and Statistics', resources: psCSBS },
          { id: 'sm', name: 'Statistical Modeling', resources: smCSBS },
        ],
      },
      {
        id: 'biotech',
        name: 'BioTech',
        abbr: 'BIO',
        comingSoon: false,
        subjects: [
          { id: 'biochem1', name: 'Biochemistry-I', resources: biochem1 },
          { id: 'biochem-lab', name: 'Biochemistry and Microbiology Lab', resources: biochemLab },
          { id: 'cbg', name: 'Cell Biology and Genetics', resources: cellBioGenetics },
          { id: 'chem-bio', name: 'Chemistry', resources: chemBio },
          { id: 'ed-bio', name: 'Engineering Drawing', resources: edBio },
          { id: 'energy-bio', name: 'Energy and Environment', resources: energyBio },
          { id: 'im1', name: 'Introductory Mathematics-I', resources: introMath1 },
          { id: 'im2', name: 'Introductory Mathematics-II', resources: introMath2 },
          { id: 'physics-bio', name: 'Physics', resources: physicsBio },
          { id: 'procomm-bio', name: 'Professional Communication', resources: procommBio },
          { id: 'pps-bio', name: 'Programming for Problem Solving', resources: ppsBio },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '2nd Year',
    tagline: 'Branch Specialization',
    icon: 'GitBranch',
    branches: secondYearBranches,
  },
  {
    id: 3,
    label: '3rd Year',
    tagline: 'Advanced Coursework',
    icon: 'Rocket',
    branches: thirdYearBranches,
  },
  {
    id: 4,
    label: '4th Year',
    tagline: 'Final Semester & Electives',
    icon: 'Award',
    branches: fourthYearBranches,
  },
];
