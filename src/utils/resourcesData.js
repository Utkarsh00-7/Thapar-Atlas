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

const cobsSubjects2ndYear = [
  { id: 'flat-csbs', name: 'Formal Language and Automata Theory', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cao-csbs', name: 'Computer Organization & Architecture', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'oop-csbs', name: 'Object Oriented Programming', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computational-stats', name: 'Computational Statistics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'se-csbs', name: 'Software Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'os-csbs', name: 'Operating Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'dbms-csbs', name: 'Database Management Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'software-design-uml', name: 'Software Design with UML', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'innovation-entrepreneurship-csbs', name: 'Introduction to Innovation, IP Management & Entrepreneurship', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-thinking-csbs', name: 'Design Thinking', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'or-csbs', name: 'Operations Research', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'marketing-research', name: 'Marketing Research & Marketing Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cobsSubjects3rdYear = [
  { id: 'algo-csbs', name: 'Design and Analysis of Algorithms', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'compiler-design-csbs', name: 'Compiler Design', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'management-fundamentals', name: 'Fundamentals of Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'business-strategy', name: 'Business Strategy', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bcvs3', name: 'Business Communication & Value Science - III', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mini-project-csbs', name: 'Mini Project', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'networks-csbs', name: 'Computer Networks', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'info-sec', name: 'Information Security', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ai-csbs', name: 'Artificial Intelligence', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'financial-accounting', name: 'Financial & Cost Accounting', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bcvs4', name: 'Business Communication & Value Science - IV', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-systems', name: 'Conversational Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cloud-microservices', name: 'Cloud, Microservices and Application', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ml-csbs', name: 'Machine Learning', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'behavioral-economics', name: 'Behavioral Economics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-psychology', name: 'Industrial Psychology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'modern-web-apps', name: 'Modern Web Applications', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-mining-analytics', name: 'Data Mining and Analytics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'enterprise-systems', name: 'Enterprise Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advance-finance', name: 'Advance Finance', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'image-recognition', name: 'Image Recognition and Pattern Recognition', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cobsSubjects4thYear = [
  { id: 'usability-design', name: 'Usability Design of Software Applications', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'it-workshop', name: 'IT Workshop Skylab/MATLAB', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'financial-management', name: 'Financial Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'hrm', name: 'Human Resource Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'services-science', name: 'Services Science & Service Operational Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'it-project-management', name: 'IT Project Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'project-semester-csbs', name: 'Project Semester', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'sna-csbs', name: 'Social Network Analysis', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ethical-hacking-csbs', name: 'Ethical Hacking', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'capstone-csbs', name: 'Capstone Project', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cognitive-science-analytics', name: 'Cognitive Science & Analytics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-intro', name: 'Introduction to IoT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cryptology', name: 'Cryptology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-social-text-media', name: 'Advanced Social, Text and Media Analytics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mobile-computing', name: 'Mobile Computing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const biotechSubjects2ndYear = [
  { id: 'material-energy-balances', name: 'Material and Energy Balances', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'food-science-nutrition', name: 'Food Science and Nutrition', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'immunotechnology', name: 'Immunotechnology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biochem2', name: 'Biochemistry-II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'molecular-biology', name: 'Molecular Biology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'molecular-biology-lab', name: 'Molecular Biology, Food Science and Immunology Lab', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bioanalytical-techniques', name: 'Bioanalytical Techniques', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'genetic-metabolic-eng', name: 'Genetic & Metabolic Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'animal-biotech', name: 'Animal Biotechnology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'plant-biotech', name: 'Plant Biotechnology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biophysics-biomaterials', name: 'Biophysics and Biomaterials', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'animal-plant-biotech-lab', name: 'Animal and Plant Biotechnology Lab', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ai-engineers-bt', name: 'AI for Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'aptitude-bt', name: 'Aptitude Skills Building', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ethics-risk-ai-bt', name: 'Ethics and Risk Mitigation in AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'evolutionary-human-behaviour', name: 'The Evolutionary Basis of Human Behaviour for Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const biotechSubjects3rdYear = [
  { id: 'biostatistics', name: 'Biostatistics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bioinformatics', name: 'Bioinformatics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bioprocess-eng', name: 'Bioprocess Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'innovation-entrepreneurship-bt', name: 'Innovation and Entrepreneurship', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ai-biotech', name: 'AI in Biotechnology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biostatistics-omics-lab', name: 'Biostatistics and OMICS Lab', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'humanities-bt', name: 'Humanities for Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'downstream-processing', name: 'Downstream Processing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'pharmaceutical-tech', name: 'Pharmaceutical Technology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biosafety-bioethics-ipr', name: 'Biosafety, Bioethics & IPR', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'transducers-biosensors', name: 'Transducers and Biosensors', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'capstone-project-bt', name: 'Capstone Project', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'journal-club', name: 'Journal Club', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-lab', name: 'Process Lab', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'structural-biology', name: 'Structural Biology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cell-tissue-eng', name: 'Cell and Tissue Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'natural-products', name: 'Natural Products', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'food-processing', name: 'Food Processing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'medical-biotech', name: 'Medical Biotechnology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'protein-engineering', name: 'Protein Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const biotechSubjects4thYear = [
  { id: 'project-semester-bt', name: 'Project Semester', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'project-bt', name: 'Project', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'genomics-proteomics', name: 'Genomics and Proteomics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'enzyme-technology', name: 'Enzyme Technology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nanobiotechnology', name: 'Nanobiotechnology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biomedical-instrumentation', name: 'Concepts in Biomedical Instrumentation', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-biotech', name: 'Industrial Biotechnology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cancer-biology', name: 'Cancer Biology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'stem-cell-tech', name: 'Stem Cell Technology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'drug-design-dev', name: 'Drug Design and Development', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'environmental-biotech', name: 'Environmental Biotechnology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'molecular-diagnostics', name: 'Molecular Diagnostics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computational-biology', name: 'Computational Biology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biology-engineers', name: 'Biology for Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];


const dsaiSubjects1Year = [
  { id: 'chemistry', name: 'Chemistry', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving-c-language', name: 'Programming for Problem Solving (C language)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electronics-engineering', name: 'Electrical and Electronics Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'Energy and Environment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mathematics-i', name: 'MATHEMATICS – I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'foundation-of-machine-intelligence-concepts-techniques-and-applications', name: 'Foundation of Machine Intelligence: Concepts, Techniques and Applications', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'physics', name: 'Physics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'Engineering Drawing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'Professional Communication', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'Manufacturing Processes', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mathematics-ii', name: 'MATHEMATICS – II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-essentials-for-ai-and-ml', name: 'Programming Essentials for AI and ML', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const dsaiSubjects2Year = [
  { id: 'operating-systems', name: 'OPERATING SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'object-oriented-programming', name: 'Object Oriented Programming', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-structures', name: 'Data Structures', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'numerical-linear-algebra', name: 'Numerical Linear Algebra', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-design-project-i-including-2-self-effort-hours', name: 'ENGINEERING DESIGN PROJECT – I (including 2 self-effort hours)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-and-analysis-of-algorithms', name: 'DESIGN AND ANALYSIS OF ALGORITHMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-engineering', name: 'Data Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'probability-and-statistics', name: 'PROBABILITY AND STATISTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-design-project-ii', name: 'ENGINEERING DESIGN PROJECT – II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'employability-development-skills', name: 'EMPLOYABILITY DEVELOPMENT SKILLS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'discrete-mathematical-structures', name: 'Discrete Mathematical Structures', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const dsaiSubjects3Year = [
];

const dsaiSubjects4Year = [
];

const cheSubjects1Year = [
  { id: 'chemical-process-industries', name: 'CHEMICAL PROCESS INDUSTRIES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemical-engineering-thermodynamics-i', name: 'CHEMICAL ENGINEERING THERMODYNAMICS-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'material-and-energy-balances', name: 'MATERIAL AND ENERGY BALANCES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-fluid-mechanics', name: 'PROCESS FLUID MECHANICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-pollution-abatement', name: 'INDUSTRIAL POLLUTION ABATEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cheSubjects2Year = [
  { id: 'chemical-engineering-thermodynamics-ii', name: 'CHEMICAL ENGINEERING THERMODYNAMICS-II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'heat-transfer', name: 'HEAT TRANSFER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mass-transfer-i', name: 'MASS TRANSFER-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-engineering-simulation-softwares', name: 'PROCESS ENGINEERING SIMULATION SOFTWARES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cheSubjects3Year = [
  { id: 'chemical-reaction-engineering-i', name: 'CHEMICAL REACTION ENGINEERING-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'fluid-and-particle-mechanics', name: 'FLUID AND PARTICLE MECHANICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-instrumentation-and-control', name: 'PROCESS INSTRUMENTATION AND CONTROL', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-resources', name: 'ENERGY RESOURCES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemical-reaction-engineering-ii', name: 'CHEMICAL REACTION ENGINEERING-II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mass-transfer-ii', name: 'MASS TRANSFER-II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'transport-phenomena', name: 'TRANSPORT PHENOMENA', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-utility-and-industrial-safety', name: 'PROCESS UTILITY AND INDUSTRIAL SAFETY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-modeling-and-simulation', name: 'PROCESS MODELING AND SIMULATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-equipment-design-project', name: 'PROCESS EQUIPMENT DESIGN PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'capstone-project', name: 'CAPSTONE PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cheSubjects4Year = [
  { id: 'chemical-process-optimization-and-statistical-analysis', name: 'CHEMICAL PROCESS OPTIMIZATION AND STATISTICAL ANALYSIS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-engineering-and-plant-design', name: 'PROCESS ENGINEERING AND PLANT DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'fluidization-engineering', name: 'FLUIDIZATION ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-separation-processes', name: 'ADVANCED SEPARATION PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'corrosion-engineering', name: 'CORROSION ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nanomaterials-for-chemical-engineers', name: 'NANOMATERIALS FOR CHEMICAL ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'catalytic-processes', name: 'CATALYTIC PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'food-enginering-and-science', name: 'FOOD ENGINERING AND SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-integration', name: 'PROCESS INTEGRATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bio-chemical-engineering', name: 'BIO-CHEMICAL ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cieSubjects1Year = [
  { id: 'physics', name: 'Physics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'Engineering Drawing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'Professional Communication', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'MANUFACTURING PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'Chemistry', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving', name: 'Programming for Problem Solving', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electronics-engineering', name: 'Electrical and Electronics Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'Energy and Environment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cieSubjects2Year = [
  { id: 'architecture-drawing-and-building-construction', name: 'ARCHITECTURE DRAWING AND BUILDING CONSTRUCTION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'building-materials', name: 'BUILDING MATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'solid-mechanics', name: ':SOLID MECHANICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optimization-techniques', name: 'OPTIMIZATION TECHNIQUES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-materials', name: 'ENGINEERING MATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'structural-analysis', name: ':STRUCTURAL ANALYSIS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'surveying', name: 'SURVEYING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-of-concrete-structures', name: ':DESIGN OF CONCRETE STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'numerical-and-statistical-computations', name: 'NUMERICAL AND STATISTICAL COMPUTATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'survey-project', name: 'SURVEY PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cieSubjects3Year = [
  { id: 'soil-mechanics', name: 'SOIL MECHANICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'hydrology-and-ground-water', name: 'HYDROLOGY AND GROUND WATER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'transportation-engineering-i', name: 'TRANSPORTATION ENGINEERING-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-of-steel-structures', name: 'DESIGN OF STEEL STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'construction-management', name: 'CONSTRUCTION MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'transportation-engineering-ii', name: 'TRANSPORTATION ENGINEERING-II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'group-design-project', name: 'GROUP DESIGN PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const cieSubjects4Year = [
  { id: 'advanced-construction-technology', name: 'ADVANCED CONSTRUCTION TECHNOLOGY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-construction-materials-and-techniques', name: 'ADVANCED CONSTRUCTION MATERIALS AND TECHNIQUES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'project', name: 'PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'practical-training-six-weeks', name: 'PRACTICAL TRAINING (SIX WEEKS)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'project-semester', name: 'PROJECT SEMESTER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'seismic-resistant-design-of-structures', name: 'SEISMIC RESISTANT DESIGN OF STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bridge-engineering', name: ':BRIDGE ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'building-information-modelling-in-construction', name: 'BUILDING INFORMATION MODELLING IN CONSTRUCTION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'traffic-engineering-and-geometric-design', name: 'TRAFFIC ENGINEERING AND GEOMETRIC DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'sustainable-construction-practices', name: ': SUSTAINABLE CONSTRUCTION PRACTICES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'irrigation-engineering', name: ': IRRIGATION ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'internet-of-things-iot-smart-cities', name: 'INTERNET OF THINGS (IoT) & SMART CITIES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'prestressed-concrete', name: ':PRESTRESSED CONCRETE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'hydraulic-structures', name: ':HYDRAULIC STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'urban-transportation-planning', name: ':URBAN TRANSPORTATION PLANNING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'climate-change-and-its-impact-on-water-resources', name: ':CLIMATE CHANGE AND ITS IMPACT ON WATER RESOURCES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'geotechnices-for-underground-structures', name: ':GEOTECHNICES FOR UNDERGROUND STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'life-cycle-assessment', name: 'LIFE CYCLE ASSESSMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-of-reinforced-earth-structures', name: 'DESIGN OF REINFORCED EARTH STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-surveying', name: ':ADVANCED SURVEYING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'integrated-watershed-management', name: 'INTEGRATED WATERSHED MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'pavment-analysis-and-design', name: ': PAVMENT ANALYSIS AND DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const ccaSubjects1Year = [
  { id: 'physics', name: 'Physics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'Engineering Drawing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'Professional Communication', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'MANUFACTURING PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'Chemistry', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving', name: 'Programming for Problem Solving', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electr-onics-engineering', name: 'Electrical and Electr onics Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'Energy and Environment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const ccaSubjects2Year = [
  { id: 'solid-mechanics', name: 'SOLID MECHANICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'civil-engineering-materials', name: ': CIVIL ENGINEERING MATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'fluid-mechanics', name: 'Fluid Mechanics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'architecture-drawing-and-building-construction', name: 'ARCHITECTURE DRAWING AND BUILDING CONSTRUCTION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'geoinformatics', name: 'GEOINFORMATICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-of-concrete-structures', name: ':DESIGN OF CONCRETE STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'fundamentals-of-data-science', name: 'FUNDAMENTALS OF DATA SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'numerical-and-statistical-computations', name: 'NUMERICAL AND STATISTICAL COMPUTATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const ccaSubjects3Year = [
  { id: 'geotechnical-engineering-i', name: 'GEOTECHNICAL ENGINEERING-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-of-steel-structures', name: 'DESIGN OF STEEL STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'transportation-engineering', name: 'TRANSPORTATION ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'surface-hydrology', name: 'SURFACE HYDROLOGY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'geotechnical-engineering-ii', name: 'GEOTECHNICAL ENGINEERING-II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'environmental-engineering', name: 'ENVIRONMENTAL ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'construction-management', name: 'CONSTRUCTION MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machine-learning', name: 'MACHINE LEARNING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-construction-technology', name: 'ADVANCED CONSTRUCTION TECHNOLOGY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-construction-materials-and-techniques', name: 'ADVANCED CONSTRUCTION MATERIALS AND TECHNIQUES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'project', name: 'PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'practical-training-six-weeks', name: 'PRACTICAL TRAINING (SIX WEEKS)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'project-semester', name: 'PROJECT SEMESTER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'building-information-modelling-in-construction', name: 'BUILDING INFORMATION MODELLING IN CONSTRUCTION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bridge-engineering', name: 'BRIDGE ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'railway-airport-engineering', name: 'Railway & Airport Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'irrigation-engineering', name: 'IRRIGATION ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'internet-of-things-iot-smart-cities', name: 'INTERNET OF THINGS (IoT) & SMART CITIES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'climate-change-and-its-impact-on-water-resources', name: ':CLIMATE CHANGE AND ITS IMPACT ON WATER RESOURCES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'geotechnices-for-underground-structures', name: ':GEOTECHNICES FOR UNDERGROUND STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'life-cycle-assessment', name: 'LIFE CYCLE ASSESSMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'sustainable-smart-materials', name: 'SUSTAINABLE & SMART MATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'prestressed-concrete-structures', name: 'PRESTRESSED CONCRETE STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-transportation-engineering', name: 'ADVANCED TRANSPORTATION ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-of-reinforced-earth-structures', name: 'DESIGN OF REINFORCED EARTH STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'integrated-watershed-management', name: 'INTEGRATED WATERSHED MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const ccaSubjects4Year = [
];

const eicSubjects1Year = [
  { id: 'physics', name: 'Physics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'Engineering Drawing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'Professional Communication', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'Manufacturing Processes', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mathematics-i', name: 'Mathematics-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'Chemistry', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'Energy and Environment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eicSubjects2Year = [
  { id: 'mathematics-ii', name: 'Mathematics - II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'measurement-science-and-techniques', name: 'MEASUREMENT SCIENCE AND TECHNIQUES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mathematics-for-signals', name: 'MATHEMATICS FOR SIGNALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'analog-devices-circuits', name: 'Analog Devices & Circuits', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'digital-electronics', name: 'DIGITAL ELECTRONICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'aptitude-skills-building', name: 'APTITUDE SKILLS BUILDING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-design-project-buggy', name: 'Engineering Design Project (Buggy)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-structures-and-algorithms', name: ': Data Structures and Algorithms', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mathematics-for-data-science', name: 'Mathematics for Data Science', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electronic-measurements', name: 'ELECTRICAL AND ELECTRONIC MEASUREMENTS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'control-systems', name: 'CONTROL SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'object-oriented-programming', name: 'Object Oriented Programming', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optimization-techniques', name: ': OPTIMIZATION TECHNIQUES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eicSubjects3Year = [
  { id: 'network-analysis', name: 'NETWORK ANALYSIS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'fundamentals-of-microprocessors-and-microcontrollers', name: 'FUNDAMENTALS OF MICROPROCESSORS AND MICROCONTROLLERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'bio-medical-instrumentation', name: 'BIO-MEDICAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-instrumentation', name: 'INDUSTRIAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'artificial-intelligence-and-applications', name: 'ARTIFICIAL INTELLIGENCE AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'digital-signal-processing-and-applications', name: ': DIGITAL SIGNAL PROCESSING AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'innovation-and-entrepreneurship', name: 'INNOVATION AND ENTREPRENEURSHIP', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'virtual-instrumentation', name: 'VIRTUAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-acquisition-and-system-design', name: 'DATA ACQUISITION AND SYSTEM DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-dynamics-and-control', name: 'PROCESS DYNAMICS AND CONTROL', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'capstone-project', name: 'CAPSTONE PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eicSubjects4Year = [
  { id: 'advanced-process-control', name: 'ADVANCED PROCESS CONTROL', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'linear-integrated-circuit', name: 'Linear Integrated Circuit', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'environmental-instrumentation', name: 'ENVIRONMENTAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'startup-semester', name: 'STARTUP SEMESTER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'robotics', name: 'ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biometrics', name: 'BIOMETRICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-based-systems', name: 'IoT BASED SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'analog-and-digital-communication', name: 'ANALOG AND DIGITAL COMMUNICATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'analytical-instrumentation', name: 'ANALYTICAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-base-management-systems', name: 'DATA BASE MANAGEMENT SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cloud-computing', name: 'CLOUD COMPUTING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'network-programming', name: 'NETWORK PROGRAMMING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-control-systems', name: 'ADVANCED CONTROL SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'prosthetics-and-rehabilitation', name: 'PROSTHETICS AND REHABILITATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-analytics', name: 'DATA ANALYTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optical-instrumentation', name: 'OPTICAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-networks', name: 'COMPUTER NETWORKS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'secure-coding', name: 'SECURE CODING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'source-code-management', name: 'SOURCE CODE MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'integrated-system-design', name: 'INTEGRATED SYSTEM DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'power-electronics-for-automation', name: 'POWER ELECTRONICS FOR AUTOMATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'embedded-system-design', name: 'EMBEDDED SYSTEM DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'digital-image-processing', name: 'DIGITAL IMAGE PROCESSING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'operating-systems', name: 'OPERATING SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'software-engineering', name: 'SOFTWARE ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-graphics', name: 'COMPUTER GRAPHICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vlsi-testing-and-verification', name: 'VLSI Testing and Verification', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'robust-and-real-time-control-systems', name: 'ROBUST AND REAL TIME CONTROL SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'deep-learning-in-health-care-applications', name: 'Deep Learning in Health Care Applications', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'smart-sensor-networks', name: 'SMART SENSOR NETWORKS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biosensors-and-mems', name: 'BIOSENSORS AND MEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-network-security', name: 'COMPUTER & NETWORK SECURITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eleSubjects1Year = [
  { id: 'physics', name: 'Physics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'Engineering Drawing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'Professional Communication', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mathematics-i', name: 'Mathematics-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'Manufacturing Processes', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'Chemistry', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving', name: 'Programming for Problem Solving', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'Energy and Environment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mathematics-ii', name: 'Mathematics - II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eleSubjects2Year = [
];

const eleSubjects3Year = [
  { id: 'semestervii-completion', name: 'SemesterVII (Completion)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eleSubjects4Year = [
  { id: 'data-mining-and-visualization', name: 'Data Mining and Visualization >', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eecSubjects1Year = [
  { id: 'physics', name: 'PHYSICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-dra-wing', name: 'ENGINEERING DRA WING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communica-tion', name: 'PROFESSIONAL COMMUNICA TION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manuf-acturing-processes', name: 'MANUF ACTURING PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'calculus-for-engineers', name: 'CALCULUS FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistr-y', name: 'CHEMISTR Y', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-sol-ving', name: 'PROGRAMMING FOR PROBLEM SOL VING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electronics-engineering', name: 'ELECTRICAL AND ELECTRONICS ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'ENERGY AND ENVIRONMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'differential-equa-tions-and-linear-algebra', name: 'DIFFERENTIAL EQUA TIONS AND LINEAR ALGEBRA', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eecSubjects2Year = [
  { id: 'discrete-ma-thema-tical-structures', name: 'DISCRETE MA THEMA TICAL STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'da-t-a-structures', name: 'DA T A STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-network-theor-y', name: ': INTRODUCTION TO NETWORK THEOR Y', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'analog-circuits', name: 'ANALOG CIRCUITS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ai-for-engineers', name: 'AI FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-architecture-and-organiza-tion', name: 'COMPUTER ARCHITECTURE AND ORGANIZA TION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-and-anal-ysis-of-algorithms', name: 'DESIGN AND ANAL YSIS OF ALGORITHMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'opera-ting-systems', name: 'OPERA TING SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ma-thema-tics-for-da-t-a-science', name: 'MA THEMA TICS FOR DA T A SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ethics-and-risk-mitiga-tion-in-ai', name: 'ETHICS AND RISK MITIGA TION IN AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electric-machiner-y', name: ': ELECTRIC MACHINER Y', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'principles-of-power-system-engineering', name: ': PRINCIPLES OF POWER SYSTEM ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eecSubjects3Year = [
];

const eecSubjects4Year = [
];

const encSubjects1Year = [
  { id: 'physics', name: 'PHYSICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'ENGINEERING DRAWING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'PROFESSIONAL COMMUNICATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'MANUFACTURING PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'calculus-for-engineers', name: 'CALCULUS FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'Chemistry', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving', name: 'Programming for Problem Solving', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electronics-engineering', name: 'Electrical and Electronics Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'Energy and Environment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'differential-equations-and-linear-algebra', name: 'DIFFERENTIAL EQUATIONS AND LINEAR ALGEBRA', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const encSubjects2Year = [
  { id: 'data-structures', name: 'DATA STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'operating-systems', name: 'OPERATING SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'discrete-mathematics', name: 'DISCRETE MATHEMATICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'object-oriented-programming', name: 'OBJECT ORIENTED PROGRAMMING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'database-management-systems', name: 'DATABASE MANAGEMENT SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'digital-system-design', name: 'DIGITAL SYSTEM DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const encSubjects3Year = [
  { id: 'computer-and-communication-networks', name: 'COMPUTER AND COMMUNICATION NETWORKS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'innovation-and-entrepreneurship', name: 'INNOVATION AND ENTREPRENEURSHIP', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-architecture', name: 'COMPUTER ARCHITECTURE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-science-fundamentals', name: 'DATA SCIENCE FUNDAMENTALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'augmented-and-virtual-reality', name: 'AUGMENTED AND VIRTUAL REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'fiber-optic-communication', name: 'FIBER OPTIC COMMUNICATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const encSubjects4Year = [
  { id: 'humanities-for-engineers', name: 'HUMANITIES FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'image-processing-and-computer-vision', name: 'IMAGE PROCESSING AND COMPUTER VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electromagnetic-field-theory-and-transmission-lines', name: 'ELECTROMAGNETIC FIELD THEORY AND TRANSMISSION LINES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'network-security-and-cryptography', name: 'NETWORK SECURITY AND CRYPTOGRAPHY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cloud-computing-technology', name: ': CLOUD COMPUTING TECHNOLOGY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: '5g-wireless-communication', name: '5G WIRELESS COMMUNICATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-using-system-verilog', name: 'DESIGN USING SYSTEM VERILOG', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'graphics-and-visual-computing', name: 'GRAPHICS AND VISUAL COMPUTING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'blockchain-technology', name: 'BLOCKCHAIN TECHNOLOGY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'modern-control-theory', name: 'MODERN CONTROL THEORY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vlsi-testing-and-verification', name: 'VLSI Testing and Verification', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'soft-computing', name: 'SOFT COMPUTING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'big-data-analytics', name: 'BIG DATA ANALYTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'parallel-distributed-computing', name: 'PARALLEL & DISTRIBUTED COMPUTING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'compiler-construction', name: 'COMPILER CONSTRUCTION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cad-for-vlsi', name: 'CAD for VLSI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'linear-integrated-circuits-and-applications', name: 'LINEAR INTEGRATED CIRCUITS AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nanoscience-and-nanomaterials', name: ': NANOSCIENCE AND NANOMATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'technologies-for-sustainable-development', name: ': TECHNOLOGIES FOR SUSTAINABLE DEVELOPMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cognitive-science', name: ': INTRODUCTION TO COGNITIVE SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-corporate-finance', name: 'INTRODUCTION TO CORPORATE FINANCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'graph-theory-and-applications', name: 'GRAPH THEORY AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-numerical-methods', name: ': ADVANCED NUMERICAL METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introductory-course-in-french', name: 'INTRODUCTORY COURSE IN FRENCH', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biology-for-engineers', name: 'BIOLOGY FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cyber-security', name: 'INTRODUCTION TO CYBER SECURITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'finance-accounting-and-valuation', name: 'Finance, Accounting and Valuation', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'source-code-management', name: 'SOURCE CODE MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'continuous-integration-and-continuous-deployment', name: 'Continuous Integration and Continuous Deployment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'build-and-release-management', name: 'BUILD AND RELEASE MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'financial-markets-and-portfolio-theory', name: 'Financial Markets and Portfolio Theory', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'derivatives-pricing-trading-and-strategies', name: 'Derivatives Pricing, Trading and Strategies', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'quantitative-and-statistical-methods-for-finance', name: 'Quantitative and Statistical Methods for Finance', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'system-provisioning-and-configuration-management', name: 'System Provisioning and Configuration Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ui-ux-specialist', name: 'UI & UX SPECIALIST', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-engineering', name: 'DATA ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'test-automation', name: 'TEST AUTOMATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cloud-devops', name: 'CLOUD & DEVOPS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-natural-language-processing', name: 'Conversational AI: Natural Language Processing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-speech-processing-synthesis', name: 'Conversational AI: Speech Processing & Synthesis', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'generative-ai', name: 'Generative AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-accelerated-data-science', name: 'Edge AI and Robotics: Accelerated Data Science', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-data-centre-vision', name: 'Edge AI and Robotics: Data Centre Vision', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-embedded-vision', name: 'Edge AI and Robotics: Embedded Vision', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-reinforcement-learning-conversational-ai', name: 'Edge AI and Robotics: Reinforcement Learning & Conversational AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eceSubjects1Year = [
  { id: 'engineering-drawing', name: 'Engineering Drawing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'Manufacturing Processes', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'Professional Communication', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving', name: 'Programming for Problem Solving', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'physics', name: 'Physics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'Chemistry', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'calculus-for-engineers', name: 'CALCULUS FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'differential-equations-and-linear-algebra', name: 'DIFFERENTIAL EQUATIONS AND LINEAR ALGEBRA', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-electronics-engineering', name: 'Electrical & Electronics Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'Energy and Environment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eceSubjects2Year = [
  { id: 'engineering-materials', name: ': ENGINEERING MATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optimization-techniques', name: 'OPTIMIZATION TECHNIQUES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'circuit-analysis-and-synthesis', name: 'CIRCUIT ANALYSIS AND SYNTHESIS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'digital-system-design', name: 'DIGITAL SYSTEM DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineeringdesignproject-i-2-self-hours', name: 'ENGINEERINGDESIGNPROJECT-I (2 Self Hours)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ai-for-engineers', name: 'AI For Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-structures', name: 'Data Structures', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'numerical-and-statistical-methods', name: 'NUMERICAL AND STATISTICAL METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'signals-and-systems', name: 'SIGNALS AND SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eceSubjects3Year = [
  { id: 'analog-and-digital-communication', name: 'ANALOG AND DIGITAL COMMUNICATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'digital-signal-processing', name: 'DIGITAL SIGNAL PROCESSING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'linear-integrated-circuits-and-applications', name: 'LINEAR INTEGRATED CIRCUITS AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'embedded-systems', name: 'EMBEDDED SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'innovation-and-entrepreneurship', name: 'INNOVATION AND ENTREPRENEURSHIP', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'modern-control-theory', name: 'MODERN CONTROL THEORY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electromagnetic-field-theory-and-transmission-lines', name: 'ELECTROMAGNETIC FIELD THEORY AND TRANSMISSION LINES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-based-systems', name: 'IOT based Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-architecure', name: 'COMPUTER ARCHITECURE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'humanities-for-engineers', name: 'HUMANITIES FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const eceSubjects4Year = [
  { id: '5g-wireless-communication-system', name: '5G WIRELESS COMMUNICATION SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'antenna-and-wave-propagation', name: 'ANTENNA AND WAVE PROPAGATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-science-for-engineers', name: 'DATA SCIENCE FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machine-learning', name: 'Machine Learning', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'operating-systems', name: 'OPERATING SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-communication', name: 'DATA COMMUNICATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'design-using-system-verilog', name: 'DESIGN USING SYSTEM VERILOG', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'image-processing-and-computer-vision', name: 'IMAGE PROCESSING AND COMPUTER VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vlsi-testing-and-verification', name: 'VLSI Testing and Verification', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'audio-and-video-processig', name: 'AUDIO AND VIDEO PROCESSIG', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'database-management-systems', name: 'DATABASE MANAGEMENT SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'analog-ic-design', name: 'ANALOG IC DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'microwave-engineering', name: 'MICROWAVE ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'dsp-processors', name: 'DSP PROCESSORS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'laboratory-work-na', name: 'Laboratory Work: NA', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'deep-learning-and-applications', name: 'DEEP LEARNING AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ic-fabrication-technology', name: 'IC FABRICATION TECHNOLOGY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'wireless-sensor-networks', name: 'WIRELESS SENSOR NETWORKS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nanoscience-and-nanomaterials', name: ': NANOSCIENCE AND NANOMATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'technologies-for-sustainable-development', name: ': TECHNOLOGIES FOR SUSTAINABLE DEVELOPMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cognitive-science', name: ': INTRODUCTION TO COGNITIVE SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-corporate-finance', name: 'INTRODUCTION TO CORPORATE FINANCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'graph-theory-and-applications', name: 'GRAPH THEORY AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-numerical-methods', name: ': ADVANCED NUMERICAL METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introductory-course-in-french', name: 'INTRODUCTORY COURSE IN FRENCH', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biology-for-engineers', name: 'BIOLOGY FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cyber-security', name: 'INTRODUCTION TO CYBER SECURITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'campus-2-corporate', name: 'CAMPUS - 2 - CORPORATE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'finance-accounting-and-valuation', name: 'Finance, Accounting and Valuation', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'source-code-management', name: 'SOURCE CODE MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'continuous-integration-and-continuous-deployment', name: 'Continuous Integration and Continuous Deployment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'build-and-release-management', name: 'BUILD AND RELEASE MANAGEMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'financial-markets-and-portfolio-theory', name: 'Financial Markets and Portfolio Theory', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'derivatives-pricing-trading-and-strategies', name: 'Derivatives Pricing, Trading and Strategies', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'quantitative-and-statistical-methods-for-finance', name: 'Quantitative and Statistical Methods for Finance', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'system-provisioning-and-configuration-management', name: 'System Provisioning and Configuration Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'ui-ux-specialist', name: 'UI & UX SPECIALIST', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-engineering', name: 'DATA ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'test-automation', name: 'TEST AUTOMATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cloud-devops', name: 'CLOUD & DEVOPS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-accelerated-data-science', name: 'Conversational AI: Accelerated Data Science', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-natural-language-processing', name: 'Conversational AI: Natural Language Processing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-speech-processing-synthesis', name: 'Conversational AI: Speech Processing & Synthesis', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'generative-ai', name: 'Generative AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-accelerated-data-science', name: 'Edge AI and Robotics: Accelerated Data Science', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-data-centre-vision', name: 'Edge AI and Robotics: Data Centre Vision', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-embedded-vision', name: 'Edge AI and Robotics: Embedded Vision', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-reinforcement-learning-conversational-ai', name: 'Edge AI and Robotics: Reinforcement Learning & Conversational AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const mxeSubjects1Year = [
  { id: 'physics', name: 'PHYSICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'ENGINEERING DRAWING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'PROFESSIONAL COMMUNICATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'MANUFACTURING PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'calculus-for-engineers', name: 'CALCULUS FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'CHEMISTRY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving', name: 'PROGRAMMING FOR PROBLEM SOLVING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electronics-engineering', name: 'ELECTRICAL AND ELECTRONICS ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'ENERGY AND ENVIRONMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'differential-equations-and-linear-algebra', name: 'DIFFERENTIAL EQUATIONS AND LINEAR ALGEBRA', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const mxeSubjects2Year = [
  { id: 'mechanics', name: 'MECHANICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optimization-methods', name: ': OPTIMIZATION METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'theory-of-machines', name: 'THEORY OF MACHINES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'applied-thermal-and-fluid-engineering', name: 'APPLIED THERMAL AND FLUID ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'signal-conditioning-and-data-acquisition', name: 'SIGNAL CONDITIONING AND DATA ACQUISITION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'analog-and-digital-circuit-design', name: 'ANALOG AND DIGITAL CIRCUIT DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'materials-engineering-and-metallurgy', name: 'MATERIALS ENGINEERING AND METALLURGY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'employability-development-skills', name: 'EMPLOYABILITY DEVELOPMENT SKILLS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-design-project-i', name: 'ENGINEERING DESIGN PROJECT-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'numerical-analysis', name: 'NUMERICAL ANALYSIS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'object-oriented-programming', name: 'OBJECT ORIENTED PROGRAMMING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-aided-design-and-analysis', name: 'COMPUTER AIDED DESIGN AND ANALYSIS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-structures', name: 'DATA STRUCTURES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'sensors-and-actuators', name: 'SENSORS AND ACTUATORS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const mxeSubjects3Year = [
  { id: 'engineering-design-project-ii-buggy-lab', name: 'ENGINEERING DESIGN PROJECT-II (BUGGY LAB)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'innovation-and-entrepreneurship', name: 'INNOVATION AND ENTREPRENEURSHIP', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'automatic-control-systems', name: 'AUTOMATIC CONTROL SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'stress-analysis-and-mechanical-design', name: 'STRESS ANALYSIS AND MECHANICAL DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'robotics-engineering', name: 'ROBOTICS ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'automobile-engineering', name: 'AUTOMOBILE ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'humanities-for-engineers', name: 'HUMANITIES FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'microcontroller-and-embedded-systems', name: 'MICROCONTROLLER AND EMBEDDED SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-automation', name: 'INDUSTRIAL AUTOMATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machine-learning-and-image-processing', name: 'MACHINE LEARNING AND IMAGE PROCESSING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'signals-systems-and-processing', name: 'SIGNALS, SYSTEMS AND PROCESSING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'capstone-project', name: 'CAPSTONE PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const mxeSubjects4Year = [
  { id: 'power-electronics-and-drives', name: 'POWER ELECTRONICS AND DRIVES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'project-semester', name: 'PROJECT SEMESTER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'group-project', name: 'GROUP PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mechanics-of-composite-materials', name: 'MECHANICS OF COMPOSITE MATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machining-science', name: 'MACHINING SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'startup-semester', name: 'STARTUP SEMESTER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-accelerated-data-science-basics', name: 'CONVERSATIONAL AI: ACCELERATED DATA SCIENCE [BASICS]', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-accelerated-data-science-advanced', name: 'CONVERSATIONAL AI: ACCELERATED DATA SCIENCE [ADVANCED]', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-data-centre-vision', name: 'EDGE AI AND ROBOTICS: DATA CENTRE VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-embedded-vision', name: 'EDGE AI AND ROBOTICS: EMBEDDED VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-smart-sensors', name: 'INDUSTRIAL SMART SENSORS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-robotics', name: 'INDUSTRIAL ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'artificial-intelligence-in-production', name: 'ARTIFICIAL INTELLIGENCE IN PRODUCTION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industry-40-implementation-in-production-system', name: 'INDUSTRY 4.0 IMPLEMENTATION IN PRODUCTION SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'system', name: 'system.', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cyber-physical-system', name: 'CYBER PHYSICAL SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'human-machine-interface', name: 'HUMAN MACHINE INTERFACE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-human-machine-interface', name: 'ADVANCED HUMAN MACHINE INTERFACE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'augmented-reality-and-virtual-reality', name: 'AUGMENTED REALITY AND VIRTUAL REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'automotive-mechatronic-systems', name: 'AUTOMOTIVE MECHATRONIC SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'braking-and-driver-assistance-systems', name: 'BRAKING AND DRIVER ASSISTANCE SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vehicle-safety-engineering', name: 'VEHICLE SAFETY ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'alternative-fuels-for-vehicles', name: 'ALTERNATIVE FUELS FOR VEHICLES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'battery-management-systems', name: 'BATTERY MANAGEMENT SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'virtual-reality', name: 'VIRTUAL REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'noise-vibration-and-harshness', name: 'NOISE, VIBRATION AND HARSHNESS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mobile-robotics', name: 'MOBILE ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'autonomous-systems', name: 'AUTONOMOUS SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-and-machine-learning-in-robotics', name: 'IoT AND MACHINE LEARNING IN ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-vision-and-augmented-reality', name: 'COMPUTER VISION AND AUGMENTED REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vehicle-dynamics', name: 'VEHICLE DYNAMICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'finite-element-methods', name: 'FINITE ELEMENT METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'condition-monitoring-of-rotating-machinery', name: 'CONDITION MONITORING OF ROTATING MACHINERY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electric-and-hybrid-vehicles', name: 'ELECTRIC AND HYBRID VEHICLES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'additive-manufacturing', name: 'ADDITIVE MANUFACTURING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-enabled-automation-and-machine-learning', name: 'IoT ENABLED AUTOMATION AND MACHINE LEARNING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-based-systems', name: 'IOT BASED SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'lean-manufacturing', name: 'LEAN MANUFACTURING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'real-time-operating-system', name: 'REAL-TIME OPERATING SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-instrumentation', name: 'INDUSTRIAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nonlinear-and-digital-control-systems', name: 'NONLINEAR AND DIGITAL CONTROL SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mems', name: 'MEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'virtual-instrumentation', name: 'VIRTUAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'operating-systems', name: 'OPERATING SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'database-management-system', name: ': Database Management System', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'software-design-principles', name: 'SOFTWARE DESIGN PRINCIPLES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'deep-learning', name: 'DEEP LEARNING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'soft-computing', name: 'SOFT COMPUTING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introductory-course-in-french', name: 'INTRODUCTORY COURSE IN FRENCH', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cognitive-science', name: 'INTRODUCTION TO COGNITIVE SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-corporate-finance', name: 'INTRODUCTION TO CORPORATE FINANCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cyber-security', name: 'INTRODUCTION TO CYBER SECURITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nanoscience-and-nanomaterials', name: 'NANOSCIENCE AND NANOMATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'technologies-for-sustainable-development', name: 'TECHNOLOGIES FOR SUSTAINABLE DEVELOPMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'graph-theory-and-applications', name: 'GRAPH THEORY AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-numerical-methods', name: 'ADVANCED NUMERICAL METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biology-for-engineers', name: 'BIOLOGY FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const meeSubjects1Year = [
  { id: 'physics', name: 'PHYSICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'Engineering Drawing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'Professional Communication', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'MANUFACTURING PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'calculus-for-engineers', name: 'Calculus for Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'Chemistry', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving', name: 'Programming for Problem Solving', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electronics-engineering', name: 'Electrical and Electronics Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'Energy and Environment', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'differential-equations-and-linear-algebra', name: 'Differential Equations and Linear Algebra', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const meeSubjects2Year = [
  { id: 'mechanics', name: 'Mechanics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optimization-methods', name: ': Optimization Methods', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-fluid-mechanics', name: 'Engineering Fluid Mechanics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mechatronic-systems', name: 'Mechatronic Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mechanics-of-machines', name: 'Mechanics of Machines', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-technology', name: ': Manufacturing Technology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'thermodynamics', name: ': Thermodynamics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'materials-engineering-and-metallurgy', name: 'Materials Engineering and Metallurgy', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'artificial-intelligence', name: 'Artificial Intelligence', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-design-project-i', name: 'Engineering Design Project-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'numerical-analysis', name: 'Numerical Analysis', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'solids-and-structures', name: 'Solids and Structures', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-aided-design-and-analysis-project-based', name: 'Computer-Aided Design and Analysis (Project based)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const meeSubjects3Year = [
  { id: 'mechanics-of-deformable-bodies', name: ': Mechanics of Deformable Bodies', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machine-design-i', name: ': Machine Design-I', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-design-project-ii', name: ': Engineering Design Project – II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'innovation-and-entrepreneurship', name: ': Innovation And Entrepreneurship', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'applied-thermodynamics', name: ': Applied Thermodynamics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'heat-transfer', name: ': HEAT TRANSFER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'automobile-engineering', name: ': Automobile Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'humanities-for-engineers', name: ': Humanities For Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machine-design-ii', name: 'Machine Design-II', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'refrigeration-and-air-conditioning', name: 'Refrigeration and Air Conditioning', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-engineering', name: ': Industrial Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'fluid-machines', name: ': Fluid Machines', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'dynamics-and-vibration', name: ': Dynamics and Vibration', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'capstone-project', name: ': Capstone Project', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const meeSubjects4Year = [
  { id: 'project-semester', name: ': Project Semester', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'group-project', name: ': Group Project', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mechanics-of-composite-materials', name: ': Mechanics of Composite Materials', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'startup-semester', name: ': Startup Semester', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vehicle-dynamics', name: 'VEHICLE DYNAMICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-robotics', name: ': Introduction to Robotics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'additive-manufacturing', name: 'ADDITIVE MANUFACTURING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-automation', name: 'INDUSTRIAL AUTOMATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'operations-management', name: ': Operations Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'power-plant-and-process-utility-systems', name: ': Power Plant And Process Utility Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'renewable-energy-systems', name: ': Renewable Energy Systems', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'automotive-mechatronics-systems', name: 'AUTOMOTIVE MECHATRONICS SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'robot-dynamics-and-control', name: ': Robot Dynamics And Control', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machine-learning-for-mechanical-engineers', name: 'Machine Learning for Mechanical Engineers', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'total-quality-management', name: ': Total Quality Management', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'process-engineering-standards', name: ': Process Engineering Standards', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'solar-energy-engineering', name: ': Solar Energy Engineering', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'fracture-mechanics', name: ': Fracture Mechanics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'system-modelling-and-simulation', name: ': System Modelling and Simulation', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machine-tool-design', name: ': Machine Tool Design', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'hydrogen-fuel-cell-technology', name: ': Hydrogen Fuel Cell Technology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electric-and-hybrid-vehicles', name: 'ELECTRIC AND HYBRID VEHICLES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'condition-monitoring-of-rotating-machinery', name: 'CONDITION MONITORING OF ROTATING MACHINERY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'finite-element-methods', name: 'FINITE ELEMENT METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'processing-of-polymers-and-composites', name: ': Processing of Polymers And Composites', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-aided-manufacturing', name: ': Computer Aided Manufacturing', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-internal-combustion-engines', name: ': Advanced Internal Combustion Engines', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'gas-turbine-theory-and-design', name: ': Gas Turbine Theory and Design', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-and-machine-learning-in-robotics', name: 'IoT AND MACHINE LEARNING IN ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'tribology', name: 'Tribology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-mechanical-vibrations', name: ': Advanced Mechanical Vibrations', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machining-science', name: ': Machining Science', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'lean-manufacturing', name: 'LEAN MANUFACTURING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'non-traditional-machining-processes', name: ': Non-Traditional Machining Processes', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computational-fluid-dynamics', name: ': Computational Fluid Dynamics', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-accelerated-data-science-basics', name: 'CONVERSATIONAL AI: ACCELERATED DATA SCIENCE [BASICS]', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-data-centre-vision', name: 'EDGE AI AND ROBOTICS: DATA CENTRE VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-embedded-vision', name: 'EDGE AI AND ROBOTICS: EMBEDDED VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-smart-sensor', name: 'INDUSTRIAL SMART SENSOR', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-robotics', name: 'INDUSTRIAL ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'artificial-intelligence-in-production', name: 'ARTIFICIAL INTELLIGENCE IN PRODUCTION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industry-40-implementation-in-production-system', name: 'INDUSTRY 4.0 IMPLEMENTATION IN PRODUCTION SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'system', name: 'system.', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cyber-physical-system', name: 'CYBER PHYSICAL SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'human-machine-interface', name: 'HUMAN MACHINE INTERFACE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-human-machine-interface', name: 'ADVANCED HUMAN MACHINE INTERFACE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'augmented-reality-and-virtual-reality', name: 'AUGMENTED REALITY AND VIRTUAL REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'braking-and-driver-assistance-systems', name: 'BRAKING AND DRIVER ASSISTANCE SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vehicle-safety-engineering', name: 'VEHICLE SAFETY ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'alternative-fuels-for-vehicles', name: 'ALTERNATIVE FUELS FOR VEHICLES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'battery-management-systems', name: 'BATTERY MANAGEMENT SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'virtual-reality', name: 'VIRTUAL REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'noise-vibration-and-harshness', name: 'NOISE, VIBRATION AND HARSHNESS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introductory-course-in-french', name: 'INTRODUCTORY COURSE IN FRENCH', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cognitive-science', name: 'INTRODUCTION TO COGNITIVE SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-corporate-finance', name: 'INTRODUCTION TO CORPORATE FINANCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cyber-security', name: 'INTRODUCTION TO CYBER SECURITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nanoscience-and-nanomaterials', name: 'NANOSCIENCE AND NANOMATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'technologies-for-sustainable-development', name: 'TECHNOLOGIES FOR SUSTAINABLE DEVELOPMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'graph-theory-and-applications', name: 'GRAPH THEORY AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-numerical-methods', name: 'ADVANCED NUMERICAL METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biology-for-engineers', name: 'BIOLOGY FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const raiSubjects1Year = [
  { id: 'physics', name: 'PHYSICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-drawing', name: 'ENGINEERING DRAWING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'professional-communication', name: 'PROFESSIONAL COMMUNICATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'manufacturing-processes', name: 'MANUFACTURING PROCESSES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'calculus-for-engineers', name: 'CALCULUS FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'chemistry', name: 'CHEMISTRY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'programming-for-problem-solving', name: 'PROGRAMMING FOR PROBLEM SOLVING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electrical-and-electronics-engineering', name: 'ELECTRICAL AND ELECTRONICS ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'energy-and-environment', name: 'ENERGY AND ENVIRONMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'differential-equations-and-linear-algebra', name: ': DIFFERENTIAL EQUATIONS AND LINEAR ALGEBRA', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const raiSubjects2Year = [
  { id: 'mechanics', name: 'MECHANICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optimization-methods', name: ': OPTIMIZATION METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'theory-of-machines', name: 'THEORY OF MACHINES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-structure', name: 'DATA STRUCTURE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'engineering-design-project-buggy', name: 'ENGINEERING DESIGN PROJECT (BUGGY)', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'python-programming', name: 'PYTHON PROGRAMMING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'aptitude-skills-building', name: 'APTITUDE SKILLS BUILDING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'smart-materials-for-robotics', name: 'SMART MATERIALS FOR ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'numerical-analysis', name: 'NUMERICAL ANALYSIS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'data-science', name: 'DATA SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'robotics-sensors-and-actuators', name: 'ROBOTICS SENSORS AND ACTUATORS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-aided-design-and-analysis', name: 'COMPUTER-AIDED DESIGN AND ANALYSIS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-robotics-engineering', name: 'INTRODUCTION TO ROBOTICS ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const raiSubjects3Year = [
  { id: 'innovation-and-entrepreneurship', name: 'INNOVATION AND ENTREPRENEURSHIP', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machine-learning', name: 'MACHINE LEARNING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'stress-analysis-and-mechanical-design', name: 'STRESS ANALYSIS AND MECHANICAL DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-automation', name: 'INDUSTRIAL AUTOMATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'robot-dynamics-and-control', name: 'ROBOT DYNAMICS AND CONTROL', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'humanities-for-engineers', name: 'HUMANITIES FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'microcontroller-and-embedded-systems', name: 'MICROCONTROLLER AND EMBEDDED SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'automatic-control-systems', name: 'AUTOMATIC CONTROL SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-vision', name: 'COMPUTER VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'robotic-systems-simulation', name: 'ROBOTIC-SYSTEMS SIMULATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'capstone-project', name: 'CAPSTONE PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];

const raiSubjects4Year = [
  { id: 'autonomous-systems-and-machine-vision', name: 'AUTONOMOUS SYSTEMS AND MACHINE VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'system-modelling-and-simulation', name: 'SYSTEM MODELLING AND SIMULATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'project-semester', name: 'PROJECT SEMESTER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'group-project', name: 'GROUP PROJECT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mechanics-of-composite-materials', name: 'MECHANICS OF COMPOSITE MATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'machining-science', name: 'MACHINING SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'startup-semester', name: 'STARTUP SEMESTER', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-accelerated-data-science-basics', name: 'CONVERSATIONAL AI: ACCELERATED DATA SCIENCE [BASICS]', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'conversational-ai-accelerated-data-science-advanced', name: 'CONVERSATIONAL AI: ACCELERATED DATA SCIENCE [ADVANCED]', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-data-centre-vision', name: 'EDGE AI AND ROBOTICS: DATA CENTRE VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-embedded-vision', name: 'EDGE AI AND ROBOTICS: EMBEDDED VISION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'edge-ai-and-robotics-reinforcement-learning-conversational-ai', name: 'EDGE AI AND ROBOTICS: REINFORCEMENT LEARNING & CONVERSATIONAL AI', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-smart-sensor', name: 'INDUSTRIAL SMART SENSOR', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-robotics', name: 'INDUSTRIAL ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'artificial-intelligence-in-production', name: 'ARTIFICIAL INTELLIGENCE IN PRODUCTION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industry-40-implementation-in-production-system', name: 'INDUSTRY 4.0 IMPLEMENTATION IN PRODUCTION SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'system', name: 'system.', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'cyber-physical-system', name: 'CYBER PHYSICAL SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'human-machine-interface', name: 'HUMAN MACHINE INTERFACE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-human-machine-interface', name: 'ADVANCED HUMAN MACHINE INTERFACE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'augmented-reality-and-virtual-reality', name: 'AUGMENTED REALITY AND VIRTUAL REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'automotive-mechatronics-systems', name: 'AUTOMOTIVE MECHATRONICS SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'braking-and-driver-assistance-systems', name: 'BRAKING AND DRIVER ASSISTANCE SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vehicle-safety-engineering', name: 'VEHICLE SAFETY ENGINEERING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'alternative-fuels-for-vehicles', name: 'ALTERNATIVE FUELS FOR VEHICLES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'battery-management-systems', name: 'BATTERY MANAGEMENT SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'virtual-reality', name: 'VIRTUAL REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'noise-vibration-and-harshness', name: 'NOISE, VIBRATION AND HARSHNESS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'optimization-in-engineering-design', name: 'OPTIMIZATION IN ENGINEERING DESIGN', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mobile-robotics', name: 'MOBILE ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'autonomous-systems', name: 'AUTONOMOUS SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-and-machine-learning-in-robotics', name: 'IoT AND MACHINE LEARNING IN ROBOTICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'computer-vision-and-augmented-reality', name: 'COMPUTER VISION AND AUGMENTED REALITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'vehicle-dynamics', name: 'VEHICLE DYNAMICS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'finite-element-methods', name: 'FINITE ELEMENT METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'condition-monitoring-of-rotating-machinery', name: 'CONDITION MONITORING OF ROTATING MACHINERY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'electric-and-hybrid-vehicles', name: 'ELECTRIC AND HYBRID VEHICLES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'additive-manufacturing', name: 'ADDITIVE MANUFACTURING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-enabled-automation-and-machine-learning', name: 'IoT ENABLED AUTOMATION AND MACHINE LEARNING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industry-40-compliant-product-design-and-manufacturing', name: 'INDUSTRY 4.0 COMPLIANT PRODUCT DESIGN AND MANUFACTURING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'iot-based-systems', name: 'IOT BASED SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'lean-manufacturing', name: 'LEAN MANUFACTURING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'real-time-operating-system', name: 'REAL-TIME OPERATING SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'industrial-instrumentation', name: 'INDUSTRIAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nonlinear-and-digital-control-systems', name: 'NONLINEAR AND DIGITAL CONTROL SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'mems', name: 'MEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'virtual-instrumentation', name: 'VIRTUAL INSTRUMENTATION', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'operating-systems', name: 'OPERATING SYSTEMS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'database-management-system', name: ': DATABASE MANAGEMENT SYSTEM', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'software-design-principles', name: 'SOFTWARE DESIGN PRINCIPLES', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'deep-learning', name: 'DEEP LEARNING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'soft-computing', name: 'SOFT COMPUTING', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introductory-course-in-french', name: 'INTRODUCTORY COURSE IN FRENCH', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cognitive-science', name: 'INTRODUCTION TO COGNITIVE SCIENCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-corporate-finance', name: 'INTRODUCTION TO CORPORATE FINANCE', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'introduction-to-cyber-security', name: 'INTRODUCTION TO CYBER SECURITY', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'nanoscience-and-nanomaterials', name: 'NANOSCIENCE AND NANOMATERIALS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'technologies-for-sustainable-development', name: 'TECHNOLOGIES FOR SUSTAINABLE DEVELOPMENT', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'graph-theory-and-applications', name: 'GRAPH THEORY AND APPLICATIONS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'advanced-numerical-methods', name: 'ADVANCED NUMERICAL METHODS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
  { id: 'biology-for-engineers', name: 'BIOLOGY FOR ENGINEERS', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
];



const secondYearBranches = [
  { id: 'coe', name: 'Computer Engineering', abbr: 'COE', comingSoon: false, subjects: cseCoeSubjects2ndYear },
  { id: 'copc', name: 'Computer Science & Engineering', abbr: 'COPC', comingSoon: false, subjects: cseCoeSubjects2ndYear },
  { id: 'cobs', name: 'Computer Science and Business systems', abbr: 'COBS', comingSoon: false, subjects: cobsSubjects2ndYear },
  { id: 'dsai', name: 'Artificial Intelligence and Data Science', abbr: 'DSAI', comingSoon: false, subjects: dsaiSubjects2Year },
  { id: 'eec', name: 'Electrical and Computer Engineering', abbr: 'EEC', comingSoon: false, subjects: eecSubjects2Year },
  { id: 'mee', name: 'Mechanical Engineering', abbr: 'MEE', comingSoon: false, subjects: meeSubjects2Year },
  { id: 'ele', name: 'Electrical Engineering', abbr: 'ELE', comingSoon: false, subjects: eleSubjects2Year },
  { id: 'bt', name: 'Biotechnology', abbr: 'BT', comingSoon: false, subjects: biotechSubjects2ndYear },
  { id: 'che', name: 'Chemical Engineering', abbr: 'CHE', comingSoon: false, subjects: cheSubjects2Year },
  { id: 'cie', name: 'Civil Engineering', abbr: 'CIE', comingSoon: false, subjects: cieSubjects2Year },
  { id: 'cca', name: 'Civil Engineering with Computer Application', abbr: 'CCA', comingSoon: false, subjects: ccaSubjects2Year },
  { id: 'eic', name: 'Electronics (Instrumentation and Control) Engineering', abbr: 'EIC', comingSoon: false, subjects: eicSubjects2Year },
  { id: 'enc', name: 'Electronics and Computer Engineering', abbr: 'ENC', comingSoon: false, subjects: encSubjects2Year },
  { id: 'ece', name: 'Electronics and Communication Engineering', abbr: 'ECE', comingSoon: false, subjects: eceSubjects2Year },
  { id: 'mxe', name: 'Mechatronics Engineering', abbr: 'MXE', comingSoon: false, subjects: mxeSubjects2Year },
  { id: 'rai', name: 'Robotics and Artificial Intelligence', abbr: 'RAI', comingSoon: false, subjects: raiSubjects2Year }
];


const thirdYearBranches = [
  { id: 'coe', name: 'Computer Engineering', abbr: 'COE', comingSoon: false, subjects: cseCoeSubjects3rdYear },
  { id: 'copc', name: 'Computer Science & Engineering', abbr: 'COPC', comingSoon: false, subjects: cseCoeSubjects3rdYear },
  { id: 'cobs', name: 'Computer Science and Business systems', abbr: 'COBS', comingSoon: false, subjects: cobsSubjects3rdYear },
  { id: 'dsai', name: 'Artificial Intelligence and Data Science', abbr: 'DSAI', comingSoon: true, subjects: [] },
  { id: 'eec', name: 'Electrical and Computer Engineering', abbr: 'EEC', comingSoon: true, subjects: [] },
  { id: 'mee', name: 'Mechanical Engineering', abbr: 'MEE', comingSoon: false, subjects: meeSubjects3Year },
  { id: 'ele', name: 'Electrical Engineering', abbr: 'ELE', comingSoon: false, subjects: eleSubjects3Year },
  { id: 'bt', name: 'Biotechnology', abbr: 'BT', comingSoon: false, subjects: biotechSubjects3rdYear },
  { id: 'che', name: 'Chemical Engineering', abbr: 'CHE', comingSoon: false, subjects: cheSubjects3Year },
  { id: 'cie', name: 'Civil Engineering', abbr: 'CIE', comingSoon: false, subjects: cieSubjects3Year },
  { id: 'cca', name: 'Civil Engineering with Computer Application', abbr: 'CCA', comingSoon: false, subjects: ccaSubjects3Year },
  { id: 'eic', name: 'Electronics (Instrumentation and Control) Engineering', abbr: 'EIC', comingSoon: false, subjects: eicSubjects3Year },
  { id: 'enc', name: 'Electronics and Computer Engineering', abbr: 'ENC', comingSoon: false, subjects: encSubjects3Year },
  { id: 'ece', name: 'Electronics and Communication Engineering', abbr: 'ECE', comingSoon: false, subjects: eceSubjects3Year },
  { id: 'mxe', name: 'Mechatronics Engineering', abbr: 'MXE', comingSoon: false, subjects: mxeSubjects3Year },
  { id: 'rai', name: 'Robotics and Artificial Intelligence', abbr: 'RAI', comingSoon: false, subjects: raiSubjects3Year }
];


const fourthYearBranches = [
  { id: 'coe', name: 'Computer Engineering', abbr: 'COE', comingSoon: false, subjects: cseCoeSubjects4thYear },
  { id: 'copc', name: 'Computer Science & Engineering', abbr: 'COPC', comingSoon: false, subjects: cseCoeSubjects4thYear },
  { id: 'cobs', name: 'Computer Science and Business systems', abbr: 'COBS', comingSoon: false, subjects: cobsSubjects4thYear },
  { id: 'dsai', name: 'Artificial Intelligence and Data Science', abbr: 'DSAI', comingSoon: true, subjects: [] },
  { id: 'eec', name: 'Electrical and Computer Engineering', abbr: 'EEC', comingSoon: true, subjects: [] },
  { id: 'mee', name: 'Mechanical Engineering', abbr: 'MEE', comingSoon: false, subjects: meeSubjects4Year },
  { id: 'ele', name: 'Electrical Engineering', abbr: 'ELE', comingSoon: false, subjects: eleSubjects4Year },
  { id: 'bt', name: 'Biotechnology', abbr: 'BT', comingSoon: false, subjects: biotechSubjects4thYear },
  { id: 'che', name: 'Chemical Engineering', abbr: 'CHE', comingSoon: false, subjects: cheSubjects4Year },
  { id: 'cie', name: 'Civil Engineering', abbr: 'CIE', comingSoon: false, subjects: cieSubjects4Year },
  { id: 'cca', name: 'Civil Engineering with Computer Application', abbr: 'CCA', comingSoon: true, subjects: [] },
  { id: 'eic', name: 'Electronics (Instrumentation and Control) Engineering', abbr: 'EIC', comingSoon: false, subjects: eicSubjects4Year },
  { id: 'enc', name: 'Electronics and Computer Engineering', abbr: 'ENC', comingSoon: false, subjects: encSubjects4Year },
  { id: 'ece', name: 'Electronics and Communication Engineering', abbr: 'ECE', comingSoon: false, subjects: eceSubjects4Year },
  { id: 'mxe', name: 'Mechatronics Engineering', abbr: 'MXE', comingSoon: false, subjects: mxeSubjects4Year },
  { id: 'rai', name: 'Robotics and Artificial Intelligence', abbr: 'RAI', comingSoon: false, subjects: raiSubjects4Year }
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
        comingSoon: true,
        subjects: [
          { id: 'bcvs1', name: 'Business Communication & Value Science - I', resources: bcvs1 },
          { id: 'bcvs2', name: 'Business Communication & Value Science - II', resources: bcvs2 },
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
        comingSoon: true,
        subjects: [
          { id: 'biochem1', name: 'Biochemistry-I', resources: biochem1 },
          { id: 'biochem-lab', name: 'Biochemistry and Microbiology Lab', resources: biochemLab },
          { id: 'cbg', name: 'Cell Biology and Genetics', resources: cellBioGenetics },
          { id: 'chem-bio', name: 'Chemistry', resources: chemBio },
          { id: 'ed-bio', name: 'Engineering Drawing', resources: edBio },
          { id: 'energy-bio', name: 'Energy and Environment', resources: energyBio },
          { id: 'im1', name: 'Introductory Mathematics-I', resources: introMath1 },
          { id: 'im2', name: 'Introductory Mathematics-II', resources: introMath2 },
          { id: 'microbio', name: 'Microbiology', resources: { notes: [], pyq: [], 'pyq-answer': [], book: [], 'lab-manual': [], youtube: [], tutorial: [], syllabus: [] } },
          { id: 'physics-bio', name: 'Physics', resources: physicsBio },
          { id: 'procomm-bio', name: 'Professional Communication', resources: procommBio },
          { id: 'pps-bio', name: 'Programming for Problem Solving', resources: ppsBio },
        ],
      },
      {
        id: 'dsai',
        name: 'DSAI',
        abbr: 'DSAI',
        comingSoon: true,
        subjects: dsaiSubjects1Year
      }
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
