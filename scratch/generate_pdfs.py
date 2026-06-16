import os
import sys
from fpdf import FPDF

# Create folder for output
os.makedirs('public/syllabi', exist_ok=True)

class SyllabusPDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 9)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, 'THAPAR INSTITUTE OF ENGINEERING & TECHNOLOGY, PATIALA (2026)', 0, 1, 'C')
        self.set_draw_color(180, 180, 180)
        self.line(10, 18, 200, 18)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def clean_text(text):
    if not text:
        return ""
    replacements = {
        "\u201c": '"', "\u201d": '"', "\u2018": "'", "\u2019": "'",
        "\u2014": "--", "\u2013": "-", "\u2022": "-", "\u25aa": "-",
        "\u2017": "_", "\u2015": "-", "\u2026": "...", "\xbb": ">>", "\xab": "<<",
        "‗": '"', "‘": "'", "’": "'", "•": "-", "▪": "-", "–": "-", "—": "--"
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    return text.encode('latin-1', 'replace').decode('latin-1')

def create_syllabus_pdf(sub_id, data):
    pdf = SyllabusPDF()
    pdf.add_page()
    
    # Title Box
    pdf.set_fill_color(240, 245, 255)
    pdf.set_draw_color(180, 200, 240)
    pdf.set_font('Helvetica', 'B', 12)
    title_text = clean_text(f"{data['code']}: {data['name']}")
    pdf.cell(0, 12, title_text, 1, 1, 'L', fill=True)
    pdf.ln(4)
    
    # Course Objective
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(0, 6, 'Course Objectives:', 0, 1, 'L')
    pdf.set_font('Helvetica', '', 9.5)
    objective_text = clean_text(data['objective'])
    pdf.multi_cell(0, 5, objective_text)
    pdf.ln(4)
    
    # Syllabus
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(0, 6, 'Syllabus Details:', 0, 1, 'L')
    pdf.set_font('Helvetica', '', 9.5)
    for topic in data['syllabus']:
        cleaned_topic = clean_text(topic)
        if ':' in cleaned_topic:
            parts = cleaned_topic.split(':', 1)
            pdf.set_font('Helvetica', 'B', 9.5)
            pdf.write(5, f"- {parts[0].strip()}: ")
            pdf.set_font('Helvetica', '', 9.5)
            pdf.write(5, f"{parts[1].strip()}\n")
        else:
            pdf.multi_cell(0, 5, f"- {cleaned_topic}")
        pdf.ln(2.5)
    pdf.ln(2.5)
    
    # CLOs
    if 'clos' in data and data['clos']:
        pdf.set_font('Helvetica', 'B', 10)
        pdf.cell(0, 6, 'Course Learning Outcomes (CLOs):', 0, 1, 'L')
        pdf.set_font('Helvetica', '', 9.5)
        idx = 1
        for clo in data['clos']:
            cleaned_clo = clean_text(clo)
            pdf.multi_cell(0, 5, f"{idx}. {cleaned_clo}")
            idx += 1
            pdf.ln(1.5)
            
    pdf.output(f"public/syllabi/{sub_id}_syllabus.pdf")
    print(f"Generated public/syllabi/{sub_id}_syllabus.pdf")

# The syllabi data mapping
syllabi = {
    # ─── POOL A ───
    "calculus": {
        "code": "UMA022", "name": "Calculus for Engineers",
        "objective": "To provide students with skills and knowledge in sequence and series, advanced calculus, calculus of several variables and complex analysis.",
        "syllabus": [
            "Sequences and Series: Introduction to sequences and infinite series, Tests for convergence/divergence, Limit comparison test, Ratio test, Root test, Cauchy integral test, Alternating series, Absolute convergence, and conditional convergence.",
            "Series Expansions: Power series, Taylor series, Convergence of Taylor series, Error estimates, Term by term differentiation and integration.",
            "Partial Differentiation: Functions of several variables, Limits and continuity, Chain rule, Change of variables, Partial differentiation of implicit functions, Directional derivatives and its properties, Maxima and minima by using second order derivatives.",
            "Multiple Integrals: Double integral (Cartesian), Change of order of integration in double integral, Polar coordinates, Graphing of polar curves, Change of variables (Cartesian to polar), Applications of double integrals to areas and volumes, Evaluation of triple integral (Cartesian).",
            "Complex analysis: Introduction to complex numbers, Geometrical interpretation, Functions of complex variables, Examples of elementary functions like exponential, trigonometric and hyperbolic functions, Elementary calculus on the complex plane (limits, continuity, differentiability), Cauchy - Riemann equations, Analytic functions, Harmonic functions."
        ],
        "clos": [
            "determine the convergence/divergence of infinite series, approximation of functions using power and Taylor's series expansion and error estimation.",
            "examine functions of several variables, define and compute partial derivatives, directional derivatives, and their use in finding maxima and minima in some engineering problems.",
            "evaluate multiple integrals in Cartesian and Polar coordinates, and their applications to engineering problems.",
            "represent complex numbers in Cartesian and Polar forms and test the analyticity of complex functions by using Cauchy - Riemann equations."
        ]
    },
    "chemistry-a": {
        "code": "UCB009", "name": "Chemistry",
        "objective": "The course aims at elucidating principles of applied chemistry in industrial systems, water treatment, engineering materials, computational and analytical techniques.",
        "syllabus": [
            "Atomic and Molecular spectroscopy: Introduction to spectroscopy, principles of atomic absorption, flame emission spectrophotometry and ICP-AES (Inductively Coupled Plasma- Atomic Emission Spectroscopy), Quantification by calibration method, Jablonski diagram, fluorescence and phosphorescence, Beer-Lambert's Law, principle and applications of UV-Vis and IR spectroscopy.",
            "Electrochemistry: Background of electrochemistry, Ionic mobility, Conductometric titrations, Modern Batteries: Pb-acid and Li ion battery, Corrosion and its protection.",
            "Water Treatment and Analysis: Physiochemical parameters of water quality, External and internal methods of Softening of water: carbonate, phosphate, calgon and colloidal conditioning, Zeolite process, Ion exchange process, treatment of water for domestic use, Desalination of brackish water: Reverse osmosis & Electrodialysis.",
            "Fuels: Classification of fuels, Calorific value, Cetane and Octane number, alternative fuels: biodiesel, Power alcohol, synthetic petrol, Fuel cells: H2 production and storage, Water splitting, Rocket propellant.",
            "Chemistry of Polymers: Classification of polymers, tacticity of polymers, molecular weight calculations, Polymers in daily life, conducting, inorganic and biodegradable polymers.",
            "Computers in Chemistry: Introduction to SMILES (Simplified Molecular Input Line-Entry System): Methodology and encoding rules, SMILES notation-chemical structure interconversions and its applications.",
            "Laboratory Work: Electrochemical measurements: Experiments involving use of pH meter, conductivity meter, potentiometer, Spectroscopic technique, Volumetric titrations: Determination of mixture of bases, hardness, alkalinity, chloride and iron content, Application of polymers and SMILES Language."
        ],
        "clos": [
            "recognize principles and applications of atomic and molecular spectroscopy.",
            "explain the concepts of conductometric titrations, modern batteries and corrosion.",
            "apply and execute water quality parameter and treatment methods.",
            "discuss the concept of alternative fuels, application of polymers and SMILES."
        ]
    },
    "eee": {
        "code": "UES013", "name": "Electrical & Electronic Engineering",
        "objective": "To introduce the basic concepts of electrical and electronics engineering.",
        "syllabus": [
            "DC Circuits: Introduction to circuit elements; rms and average values for different wave shapes, independent and dependent current and voltage sources; Kirchhoff's laws; mesh and node analysis; source transformations; network theorems: Superposition theorem, Thevenin's and Norton's theorem, Maximum power transfer theorem; star-delta transformation; steady state and transient response of R-L and R-C and R-L-C circuits.",
            "AC Circuits: Concept of phasor, phasor representation of circuit elements; analysis of series and parallel AC circuits; concept of real, reactive and apparent powers; resonance in RLC series and parallel circuits; balanced three phase circuits: voltage, current and power relations for star and delta arrangement; analysis of balanced and unbalanced circuits; three phase power measurement using two-wattmeter and one-wattmeter methods.",
            "Magnetic circuits: analogy between electric and magnetic circuits; series and parallel magnetic circuits; operating principles of electrical appliances: single-phase transformer and rotating machines; tests and performance of single-phase transformer.",
            "Digital Logic Design: Digital signals, Number systems, Positive and negative representation of numbers, Signed-number representation, Binary arithmetic, Postulates and theorems of Boolean Algebra, Algebraic simplification, Sum of products and product of sums formulations (SOP and POS), Gate primitives, Logic Gates and Universal Gates, Minimization of logic functions, Karnaugh Maps, Logic implementation using Gates, Decoder, MUX, Flip-Flops, Asynchronous up/down counters.",
            "Electronic Devices: p- n junction diode: V-I characteristics of diode, Operation of Bipolar Junction Transistor, CB and CE configuration, Transistor as a switch, Operation of SCR, DIAC and TRIAC.",
            "Operational Amplifier Circuits: The ideal operational amplifier, the inverting, non-inverting amplifiers, Op-Amp Characteristics, Applications of Op-amp: summing amplifier, differentiator and integrator.",
            "Laboratory Work: Kirchhoff's laws, network theorems, ac series and parallel circuit, three phase power measurement, magnetic circuit, tests on transformer, resonance in AC circuit, combinational circuits, flip flops, shift register and binary counters, asynchronous and synchronous up/down counters, BJT characteristics."
        ],
        "clos": [
            "apply various networks laws and theorems to solve dc circuits.",
            "compute different ac quantities with phasor representation.",
            "comprehend the operation in magnetic circuits, single phase transformer and rotating machines.",
            "recognize and apply the number systems and Boolean algebra.",
            "reduce and simplify Boolean expressions and implement them with logic gates.",
            "discuss and explain the working of diode, transistor and operational amplifier, their configurations and applications."
        ]
    },
    "energy-env-a": {
        "code": "UEN008", "name": "Energy and Environment",
        "objective": "The exposure to this course would facilitate the students in understanding the terms, definitions and scope of environmental and energy issues pertaining to current global scenario; understanding the need of sustainability in addressing the current environmental & energy challenges.",
        "syllabus": [
            "Introduction: Concept of sustainability and sustainable use of natural resources, Climate Change & its related aspects.",
            "Air Pollution: Origin, Sources and effects of air pollution; Primary and secondary meteorological parameters; wind roses; Atmospheric stability; Source reduction and Air Pollution Control Devices for particulates and gaseous pollutants in stationary sources.",
            "Water Pollution: Origin, Sources of water pollution, Category of water pollutants, Physicochemical characteristics, Components of wastewater treatment systems.",
            "Solid waste management: Introduction to solid waste management, Sources, characteristics of municipal solid waste, Solid waste management methods: Incineration, composting, landfilling.",
            "Energy Resources: Classification of Energy Resources; Non-conventional energy resources Biomass energy, Thermo-chemical conversion and biochemical conversion route; Solar energy active and passive solar energy absorption systems; Type of collectors; Thermal and photo conversion applications."
        ],
        "clos": [
            "comprehend the interdisciplinary context of environmental issues with reference to sustainability.",
            "assess the impact of anthropogenic activities on the various elements of environment and apply suitable techniques to mitigate their impact.",
            "demonstrate the application of technology in real time assessment and control of pollutants.",
            "correlate environmental concerns with the conventional energy sources associated and assess the uses and limitations of non-conventional energy technologies."
        ]
    },
    "pps-a": {
        "code": "UES103", "name": "Programming for Problem Solving",
        "objective": "This course is designed to solve and explore the problems using the art of computer programming with the help of C Language. Students will be able to apply these problem solving concepts in real life applications.",
        "syllabus": [
            "Introduction to Computer Fundamentals: Computer Memory Hierarchy, Types of Software Binary number system, Algorithm, Flowchart, Formulate simple algorithms for logical and arithmetic problems.",
            "Basics of C Programming: Structure and Life cycle of a C Program, Data types, Identifiers, Variables, Keywords, Constants, input/output statements, Operators, Type conversion and type casting. Translate the algorithms to code snippets.",
            "Decision Making and Iterative Statements: Decision making- if, if-else, Nested if-else, Multiple if, else if, switch, Ternary Operator, Loops- (while, do-while, for), Nesting of Loops, break, continue and goto. Implement the switch () to solve the basic functions of scientific calculator.",
            "Functions: Function prototype, Definition and Call, Type of Functions, Scope of variables in (Block, Function, Program, File), Storage classes (Auto, Register, Static and Extern), Recursion (with the introduction of Stack), Implementation of recursion to solve the problem of Tower of Hanoi.",
            "Arrays and Strings: One-dimensional array its operations (Traversal, Linear Search, Insertion, Deletion, Bubble Sort), Two-dimensional and its operations (Addition, Transpose and Multiplication), Passing of array into a function (row and entire array), Input and output of a string, string inbuilt functions, 2-D Character array.",
            "Pointers: Introduction to Pointers, Pointer arithmetic, Passing arguments to a function using pointer (understanding of call by value and call by reference), Accessing arrays using pointers Dynamic memory allocation (malloc(), calloc(), realloc() and free()), Pointer and Functions.",
            "Structures and Union: Structure declaration, Initialization of structures, Structure variables, Accessing structure elements using (.) operator, Array of structure variables, Passing structure variable to a function (individual and entire structure), Structure pointer, Comparison of Structure and Union.",
            "File Handling: Introduction of Files (streams in C), using File (Declaring, Opening and Closing), Operations on File (Reading, Writing and appending), and Random Access of a file, command line argument.",
            "Laboratory Work: To implement programs for various kinds of real life applications in C Language."
        ],
        "clos": [
            "Comprehend and analyze the concepts of number system, memory, compilation and debugging of the programs in C language.",
            "Analyze the control & iterative statements to solve the problems with C language source codes.",
            "Design and create programs for problem solving involving arrays, strings and pointers.",
            "Evaluate and analyze the programming concepts based on user defined data types and file handling using C language."
        ]
    },

    # ─── POOL B ───
    "dela": {
        "code": "UMA023", "name": "Differential Equations and Linear Algebra",
        "objective": "To introduce students the theory and concepts of differential equations, linear algebra, Laplace transformations and Fourier series which will equip them with adequate knowledge of mathematics to formulate and solve problems analytically.",
        "syllabus": [
            "Ordinary Differential Equations: Review of first order differential equations, Exact differential equations, Second and higher order differential equations, Solution techniques using one known solution, Cauchy - Euler equation, Method of undetermined coefficients, Variation of parameters method, Engineering applications of differential equations.",
            "Laplace Transform: Definition and existence of Laplace transforms and its inverse, Properties of the Laplace transforms, Unit step function, Impulse function, Applications to solve initial and boundary value problems.",
            "Fourier Series: Introduction, Fourier series on arbitrary intervals, Half range expansions, Applications of Fourier series to solve wave equation and heat equation.",
            "Linear Algebra: Row reduced echelon form, Solution of system of linear equations, Matrix inversion, Linear spaces, Subspaces, Basis and dimension, Linear transformation and its matrix representation, Eigen-values, Eigen-vectors and Diagonalisation, Inner product spaces and Gram-Schmidt orthogonalisation process."
        ],
        "clos": [
            "solve the differential equations of first and 2nd order and basic application problems described by these equations.",
            "find the Laplace transformations and inverse Laplace transformations for various functions. Using the concept of Laplace transform students will be able to solve the initial value and boundary value problems.",
            "find the Fourier series expansions of periodic functions and subsequently will be able to solve heat and wave equations.",
            "solve systems of linear equations by using elementary row operations.",
            "identify the vector spaces/subspaces and to compute their bases/orthonormal bases. Further, students will be able to express linear transformation in terms of matrix and find the eigenvalues and eigenvectors."
        ]
    },
    "ed-b": {
        "code": "UES101", "name": "Engineering Drawing",
        "objective": "This module is dedicated to graphics and includes two sections: 2D drafting and 3D modelling of solid objects. This course is aimed at making the student understand the concepts of projection systems, learn how to create projections of solid objects using first and third angle orthographic projection as well as isometric and auxiliary projection, concept of sectioning, to interpret the meaning and intent of toleranced dimensions and to create/edit drawings using drafting software.",
        "syllabus": [
            "Engineering Drawing Concepts: Introduction to Engineering Drawing, Projection systems: First angle and third angle projection system, Orthographic Projection: Points, Lines, Solid objects, Isometric Projections, Auxiliary Projections, Development of surfaces, Section of solids, Limits, fits and tolerances.",
            "2D Drafting: Management of screen menus commands, Creating basic drawing entities, Co-ordinate systems: Cartesian, polar and relative coordinates, Drawing limits, units of measurement and scale, Layering: organizing and maintaining the integrity of drawings, Design of prototype drawings as templates, Editing/modifying drawing entities: selection of objects, object snap modes, editing commands, Dimensioning: use of annotations, dimension types, properties and placement, adding text to drawing.",
            "3D Modelling: Management of screen menus commands, Introduction to basic 3D modelling commands such as extrude, revolve, sweep etc., Creation of 2D drawings from a 3D model.",
            "Micro Projects /Assignments: Completing the views - Identification and drawing of missing lines and views in the projection of objects; Projects related to orthographic and isometric projections Using wax blocks/soap bars/any soft material to develop three dimensional object from given orthographic projections; 3D modelling of complex machine components; Development of production drawings of individual components from the model."
        ],
        "clos": [
            "creatively comprehend the geometrical details of common engineering objects.",
            "draw dimensioned orthographic and isometric projections of simple engineering objects.",
            "interpret the meaning and intent of limits, fits and tolerances in the drawing.",
            "create/edit the engineering drawings for simple engineering objects using 2D drafting software.",
            "create/edit 3D models of engineering components using 3D modelling software."
        ]
    },
    "mp": {
        "code": "UES102", "name": "Manufacturing Process",
        "objective": "This course introduces the basic concepts of manufacturing via machining, forming, casting and joining, enabling the students to develop a basic knowledge of the mechanics, operation and limitations of basic machining tools along with metrology and measurement of parts. The course also introduces the concept of smart manufacturing.",
        "syllabus": [
            "Machining Processes: Principles of metal cutting, Cutting tools, Cutting tool materials and applications, Geometry of single point cutting tool, Introduction to computerized numerical control (CNC) machines, G and M code programming for simple turning and milling operations, introduction of canned cycles.",
            "Metal Casting: Introduction & Principles of sand casting, Requisites of a sound casting, Permanent mold casting processes, casting defects.",
            "Metal Forming: Hot & cold metal working, Forging, Rolling, Sheet Metal operations.",
            "Joining Processes: Method of joining, type of electric arc welding processes, Methods of shielding, Power source characteristics, Resistance welding, Soldering, Brazing.",
            "Smart Manufacturing: IoT and ML in manufacturing, Introduction to Additive Manufacturing, Robotics and Automation in manufacturing.",
            "Laboratory Work: Relevant shop floor exercises involving practices in Sand casting, Machining, Welding, Sheet metal fabrication techniques, CNC turning and milling exercises, Experiments on basic engineering metrology and measurements to include measurements for circularity, ovality, linear dimensions, profiles, radius, angular measurements, measurement of threads, surface roughness."
        ],
        "clos": [
            "identify & analyse various machining processes/operations for manufacturing of industrial components.",
            "apply the basic principle of bulk and sheet metal forming operations.",
            "apply the knowledge of metal casting for different requirements.",
            "identify and analyse the requirements to achieve a sound welded joint and apply the concept of smart manufacturing."
        ]
    },
    "physics-b": {
        "code": "UPH013", "name": "Physics",
        "objective": "To introduce the student to the basic physical laws of oscillators, acoustics of buildings, ultrasonics, electromagnetic waves, wave optics, lasers, and quantum mechanics and demonstrate their applications in technology. To introduce the student to measurement principles and their application to investigate physical phenomena.",
        "syllabus": [
            "Oscillations and Waves: Oscillatory motion and damping, Applications - Electromagnetic damping - eddy current; Acoustics: Reverberation time, absorption coefficient, Sabine's and Eyring's formulae (Qualitative idea), Applications - Designing of hall for speech, concert, and opera; Ultrasonics: Production and Detection of Ultrasonic waves, Applications - green energy, sound signaling, dispersion of fog, remote sensing, Car's airbag sensor.",
            "Electromagnetic Waves: Scalar and vector fields; Gradient, divergence, and curl; Stokes' and Green's theorems; Concept of Displacement current; Maxwell's equations; Electromagnetic wave equations in free space and conducting media, Application - skin depth.",
            "Optics: Interference: Parallel and wedge-shaped thin films, Newton rings, Applications as Non-reflecting coatings, Measurement of wavelength and refractive index. Diffraction: Single and Double slit diffraction, and Diffraction grating, Applications - Dispersive and Resolving Powers. Polarization: Production, detection, Applications - Anti-glare automobile headlights, Adjustable tint windows. Lasers: Basic concepts, Laser properties, Ruby, HeNe, and Semiconductor lasers, Applications - Optical communication and Optical alignment.",
            "Quantum Mechanics: Wave function, Steady State Schrodinger wave equation, Expectation value, Infinite potential well, Tunneling effect (Qualitative idea), Application - Quantum computing.",
            "Laboratory Work: Determination of damping effect on oscillatory motion; velocity of ultrasonic waves in liquids; wavelength of sodium light using Newton's rings; dispersive power using diffraction grating; specific rotation of cane sugar; proof of Malus' law; beam divergence of laser; Planck's constant."
        ],
        "clos": [
            "understand damped and simple harmonic motion, the role of reverberation in designing a hall and generation and detection of ultrasonic waves.",
            "use Maxwell's equations to describe propagation of EM waves in a medium.",
            "demonstrate interference, diffraction and polarization of light.",
            "explain the working principle of Lasers.",
            "use the concept of wave function to find probability of a particle confined in a box.",
            "perform an experiment, collect data, tabulate and report them and interpret the results with error analysis."
        ]
    },
    "procomm-b": {
        "code": "UHU003", "name": "Professional Communication",
        "objective": "The course is designed to develop the interpersonal, written, and oral as well as the non-verbal communication skills of the students. The course begins by building up on the theoretical concepts and then practicing on the applicability of the various elements. Since the course has very high applicability content, the students are advised to practice in class as well as off class.",
        "syllabus": [
            "Fundamentals of Communication: Meaning, Types and Characteristics of communication, Applicability of Transactional Analysis and Johari Window for enhancing interpersonal communication skills. Seven Cs of Effective Communication, Barriers to Effective Communication.",
            "Effective Oral Communication: Understanding Principles of Oral communication, Formal and Informal Oral Communication, Oral Communication and Behavioral Patterns, Advantages and Disadvantages of Oral Communication.",
            "Effective Listening: Listening vs Hearing, Active Listening techniques, Barriers to Listening.",
            "Effective non-verbal communication: Meaning and Importance of Non-Verbal Communication, Different Types of Non-verbal Communication, Interpretation of Non-verbal Cues.",
            "Effective written Communication: Characteristics of Good Writing, Choice of Words, Sentence Construction, Paragraph development, Forms of writing.",
            "Business Communication: Technical Report Writing, Designing Resumes and Cover Letters for effective job application, E-mail writing and e-mail etiquette.",
            "Organizational Communication: Directional communication: Downward, Upward and Horizontal Communication, Grapevine.",
            "Reading: Review and study of texts: Category 1 (Animal Farm, Lord of the Flies, Life of Pi), Category 2 (The Namesake, The God of Small Things, Q&A).",
            "Laboratory Work: Needs-assessment of spoken and written communication with feedback; Group Discussions; Technical report writing on survey projects; Project-based presentations."
        ],
        "clos": [
            "Apply communication concepts for effective interpersonal communication.",
            "Speak assertively and effectively.",
            "Interpret non-verbal cues in professional communication.",
            "Write objectively, purposefully and effectively.",
            "Design effective resumes and reports."
        ]
    },

    # ─── COPC 2nd YEAR (SEMESTER III & IV) ───
    "os": {
        "code": "UCS303", "name": "Operating System",
        "objective": "To understand the role, responsibilities, and algorithms involved for achieving various functionalities of an Operating System.",
        "syllabus": [
            "Introduction and System Structures: Computer-System Organization, Computer-System Architecture, Operating-System Structure, Operating-System Operations, Process Management, Memory Management, Storage Management, Protection and Security, Operating-System Services, System Calls, System Programs, Operating-System Design and Implementation, Virtualization.",
            "Process Management: Process Concept, Process Scheduling, Operations on Processes, Interprocess Communication, Multi-threaded programming, Multi-core Programming.",
            "Process Scheduling: Basic Concepts, Scheduling Criteria, Scheduling Algorithms, Multiple-Processor Scheduling, Algorithm Evaluation.",
            "Deadlock: System Model, Deadlock Characterization, Methods for Handling Deadlocks, Deadlock Prevention, Deadlock Avoidance, Deadlock Detection, Recovery from Deadlock.",
            "Memory Management: Basic Hardware, Address Binding, Logical and Physical Address, Dynamic linking and loading, Shared Libraries, Swapping, Contiguous Memory Allocation, Paging, Segmentation, Structure of the Page Table, Virtual Memory Management: Demand Paging, Page Replacement, Allocation of Frames, Thrashing.",
            "File Systems: File Concept, Access Methods, Directory and Disk Structure, File-System Mounting, File Sharing, File-System Structure, File-System Implementation, Directory Implementation, Allocation Methods, Free-Space Management.",
            "Disk Management: Mass Storage Structure, Disk Structure, Disk Attachment, Disk Scheduling, Disk Management, Swap-Space Management, RAID Structure.",
            "Protection and Security: Goals of Protection, Principles of Protection, Domain of Protection, Access Control, Revocation of Access Rights, Capability-Based Systems, System and Network Threats, User Authentication, Firewalls.",
            "Concurrency: The Critical Section Problem, Hardware Support, Mutex Locks, Semaphores, Classic Problems of Synchronization, Monitors.",
            "Laboratory Work: Explore Linux/Unix shell commands, OS virtualization, simulate CPU scheduling, Paging, Disk-scheduling and process synchronization algorithms."
        ],
        "clos": [
            "Explain the basics of an operating system viz. system programs, system calls, user mode and kernel mode.",
            "Select a particular CPU scheduling algorithms for specific situation, and analyze the environment leading to deadlock and its rectification.",
            "Explicate memory management techniques viz. caching, paging, segmentation, virtual memory, and thrashing.",
            "Understand the concepts related to file systems, disk-scheduling, security, and protection.",
            "Comprehend the concepts related to concurrency."
        ]
    },
    "oop": {
        "code": "UTA018", "name": "Object Oriented Programming",
        "objective": "To become familiar with object oriented programming concepts and be able to apply these concepts in solving diverse range of applications.",
        "syllabus": [
            "Objects and Classes: Structure in C and C++, Class specification, Objects, Namespaces, Overview of pillars of OOPS (Data Encapsulation, Data Abstraction, Inheritance, Polymorphism), Inline functions, Passing objects as arguments, Returning object from a function, Array of objects, Static keyword with data member, member function and object, Friend function, and Friend classes, Pointer to objects, this pointer, Dynamic Initialization, Dynamic memory allocation.",
            "Constructor and Destructor: Constructors and its types, Constructor Overloading, Constructors in array of objects, Constructors with default arguments, Dynamic Constructor, Destructor, 'const' keyword with data member, member function and object.",
            "Inheritance: Introduction to Inheritance, Forms of Inheritance (Single, Multiple, Multilevel, Hierarchical and Hybrid) with various modes (Public, Private and Protected), Inheritance with Constructor and Destructor, Benefits and Limitations of Inheritance.",
            "Polymorphism: Classification of Polymorphism (Compile-time and Run-time), Compile Time Function Overloading, Operator Overloading (Unary operator and Binary operator), Run-time: Pointers to derived class object, Overriding member function, Virtual functions, pure virtual functions, Abstract class.",
            "Exception Handling, Templates and Standard Template Library: Exception handling mechanism, Usage of template, Function templates, Overloading of Function templates, Class templates, Introduction to Standard Template Library and its components (Array, Vector, Stack, List and Queue) and Iterators.",
            "Laboratory Work: To implement object oriented constructs using C++ programming language."
        ],
        "clos": [
            "To recall the knowledge of structure and its variables to comprehend the concept of classes, objects, constructors and destructors for implementing the object oriented paradigms.",
            "To apply and analyze the inheritance on real life case studies via coding competences.",
            "To design and develop code snippets for polymorphism to proclaim coding potential; and management of run-time exceptions.",
            "To assess and interpret the knowledge of templates to appraise the standard template libraries."
        ]
    },
    "ds": {
        "code": "UCS301", "name": "Data Structures",
        "objective": "To become familiar with different types of data structures and their applications.",
        "syllabus": [
            "Analysing algorithms: Basics of algorithm and its analysis, Complexity classes, order arithmetic, Time and space trade-off in algorithms. Practical implications of inefficient algorithms on energy consumption and the need to minimize computational overhead for sustainability.",
            "Linear Data Structures: Arrays, Strings and string processing, Linked lists (Singly, Doubly, Circular), Abstract data types, their implementation and applications: Stacks (using Arrays and Linked-list), Queues (using Arrays and Linked-list), Hash tables: Hash functions, collision resolution techniques, Strategies for choosing the appropriate data structure.",
            "Searching and Sorting: Linear Search, Binary Search. Introduction to internal and external sort, Bubble Sort, Selection Sort, Insertion Sort, Shell Sort, Quick Sort, Merge Sort, Counting Sort, Radix Sort.",
            "Trees and their applications: Introduction to binary tree, tree traversal algorithms, Binary search tree, AVL Tree, B Tree etc. and common operations on these trees. Spatial data structures (e.g., Quadtrees, R-trees etc.) for sustainable urban planning and waste management. Heap, Heap Sort, Priority Queue using Heap.",
            "Graphs and their applications: Graph Terminology and its representation, Depth and breadth first traversals, Shortest-path algorithms (Dijkstra and Floyd), Data Structures for Disjoint Sets, Minimum spanning tree (Prim and Kruskal). Applications of graphs in smart grid management, waste collection routes, recycling networks etc.",
            "Laboratory Work: Implementation of various data structures such as Arrays, Stacks, Queues, Lists, Binary tree traversals, BST, AVL trees, Graphs traversals, Sorting and Searching techniques."
        ],
        "clos": [
            "Understand the fundamental data structures, their implementation and some of their standard applications.",
            "Select and implement appropriate searching and sorting techniques for solving a problem based on their characteristics.",
            "Apply tree and graph data structures for specific applications.",
            "Design and analyse algorithms using appropriate data structures for real-world problems."
        ]
    },
    "discrete": {
        "code": "UCS405", "name": "Discrete Mathematical Structures",
        "objective": "The course objective is to provide students with an overview of Discrete Mathematical Structures. Students will learn about topics such as logic and proofs, sets and functions, graph theory, boolean algebra, number theory and other important discrete math concepts.",
        "syllabus": [
            "Sets, Relations, and Functions: Sets: Operations on set, Inclusion-exclusion principle, Representation of Discrete Structures, Fuzzy set, Multi-set, bijective function, Inverse and Composition of functions, Floor and Ceiling functions, Growth of functions: Big-O notation, Big-Omega and Big-Theta Notations, Determining complexity of a program, Hash functions.",
            "Relations: Different types of relation and their representation, Equivalence and partial-ordered relations, Partition and Covering of a set, N-ary relations and database, Closure of relations, Warshall's algorithm, Lexicographic ordering, Hasse diagram, Lattices, Boolean algebra.",
            "Graphs Theory: Representation, Type of Graphs, Paths and Circuits: Euler Graphs, Hamiltonian Paths & Circuits; Cut-sets, Connectivity and Separability, Planar Graphs, Isomorphism, Graph Coloring, Covering and Partitioning, Application of Graph theory in real-life applications.",
            "Basic Logic: Propositional logic, Logical connectives, Truth tables, Normal forms (conjunctive and disjunctive), Validity of well-formed formula, Propositional inference rules (concepts of modus ponens and modus tollens), Predicate logic, Universal and existential quantification, Proof Techniques.",
            "Recurrence Relation: Solving linear recurrence relations, divide and conquer algorithms and recurrence relations.",
            "Algebraic Structures: Group, Semi group, Monoids, Ring, Field, Homomorphism.",
            "Number Theory: Divisibility and Modular Arithmetic, Solving Congruences, Applications of Congruences, Cryptographic applications."
        ],
        "clos": [
            "Perform operations on various discrete structures such as set, function, and relation.",
            "Apply basic concepts of asymptotic notation in the analysis of the algorithm.",
            "Illustrate the basic properties and algorithms of graphs and apply them in modelling and solving real-world problems.",
            "Comprehend formal logical arguments and translate statements from a natural language into their symbolic structures in logic.",
            "Identify and prove various properties of rings, fields, and groups.",
            "Illustrate and apply the division algorithm, mod function, and Congruence."
        ]
    },
    "edp1": {
        "code": "UTA016", "name": "Engineering Design Project I",
        "objective": "To develop design skills according to a Conceive-Design-Implement-Operate (CDIO) compliant methodology. To apply engineering sciences through learning-by-doing project work. To provide a framework to encourage creativity and innovation.",
        "syllabus": [
            "Introduction to CDIO: Conceive-Design-Implement-Operate framework. Overview of project work and introduction to the 'Mangonel' project.",
            "Mechanical Engineering Topics: Projectile motion (no drag and with drag), design spreadsheet simulators. Structures failure under static and dynamic loads. Redesigning the Mangonel (materials constraints). Manufacturing and assembly.",
            "Digital Electronics: Prototype, Architecture, Integrated Development Environment (IDE) for Arduino, structuring Arduino programs, using variables, sensors and actuators.",
            "Weekly Project Work: Simulator development, static/dynamic structural analysis, electronics hardware setup, programming the Arduino controller, final group competition and redesign strategy evaluation."
        ],
        "clos": [
            "Simulate trajectories of a mass with and without aerodynamic drag using spreadsheet-based software tools.",
            "Perform a test to acquire strength in bending properties and analyze throwing arms under static and dynamic loading.",
            "Develop and test software code to process sensor data.",
            "Design, construct and test electronic hardware solutions to process sensor data.",
            "Construct and operate Roman catapults (Mangonel) in groups for competition."
        ]
    },
    "nla": {
        "code": "UMA021", "name": "Numerical Linear Algebra",
        "objective": "The goal of this course is to give students an introduction to numeric and algorithmic techniques used for the solution of a broad range of mathematical problems, with an emphasis on computational issues and linear algebra.",
        "syllabus": [
            "Roots of Non-Linear Equations: Mathematical preliminaries, bisection, fixed-point, Newton's method and its extension to system of equations.",
            "Interpolation and Integration: Lagrange and Newton basis of polynomials and interpolation problems, divided difference interpolation, forward and backward differences, trapezoidal and Simpson's rules, method of undetermined coefficients.",
            "Matrix Algebra: Gauss elimination method, pivoting strategies, matrix factorization, Jacobi and Gauss-Seidel methods, matrix norm and conditioning, linear least square problems.",
            "Matrix Computations: Orthogonal and orthonormal basis, Gram-Schmidt process, orthogonal matrices and similarity transformations, power method for eigen-value and eigen-vector, QR algorithm, singular value decomposition.",
            "Laboratory Work: Lab experiments will be set in consonance with materials covered in the theory and the implementation of numerical methods will be done using MATLAB."
        ],
        "clos": [
            "Make use of iterative methods to solve nonlinear equations.",
            "Approximate the functions using interpolating polynomials and apply to definite integrals.",
            "Evaluate solution of system of linear equations and least square problems.",
            "Perform matrix computations and evaluate eigen-values and eigen-vectors."
        ]
    },
    "green-computing": {
        "code": "UCS320", "name": "Introduction to Sustainable Green Computing",
        "objective": "This course aims to provide the fundamental concepts and motivations behind sustainable computing, including the environmental impact of IT systems.",
        "syllabus": [
            "Introduction: Principles of green computing; Environmental impact of computing technologies; Green IT procurement and lifecycle management.",
            "Energy-Aware Software Design: Low-power software design principles; Profiling and optimizing software for energy efficiency; Energy-efficient algorithms and data structures; Mobile computing and battery optimization.",
            "Sustainable Data Centers and Cloud Computing: Overview of data centre infrastructure and energy consumption; Green data centres design, cooling, and energy management; Virtualization and server consolidation; Renewable energy in powering data centres; Carbon footprint measurement and reduction in cloud computing."
        ],
        "clos": [
            "Recall the design principles for low-power software.",
            "Apply optimization techniques while designing software.",
            "Implement energy efficient data structures for developing algorithms.",
            "Analyze the energy usage and carbon footprint of hardware, software, and network infrastructure."
        ]
    },
    "algo": {
        "code": "UCS415", "name": "Design and Analysis of Algorithms",
        "objective": "To provide students with the knowledge and skills necessary to design and analyse algorithms for solving computational problems.",
        "syllabus": [
            "Introduction and Complexity Analysis: Analysing algorithms, Complexity classes, Time and space trade-offs in algorithms, Recurrence relations, Analysis of iterative and recursive algorithms, Amortized Analysis.",
            "Divide and Conquer: Fundamentals of divide and conquer strategy, Applications such as The maximum subarray problem, Strassen's algorithm for matrix multiplication, merge sort, quick sort etc.",
            "Greedy Algorithms: Elements of greedy strategy, Sustainable resource allocation using greedy algorithms, Applications such as activity selection, Huffman Coding for energy efficiency in data transmission, job sequencing, fractional knapsack problem, waste bin placement, load balancing in smart grid etc.",
            "Dynamic Programming: Elements of dynamic programming, Memorization and tabulation approaches, Applications such as matrix multiplication, 0/1 knapsack (Optimizing Energy Storage), Longest common subsequence, Optimal binary search tree, etc.",
            "Backtracking: Introduction, Applications such as N queen problem, sum of subsets, graph coloring, etc.",
            "Branch and Bound Algorithm: General method, Applications such as 0/1 knapsack problem, Traveling salesperson problem etc.",
            "Graphs & Algorithms: Introduction to graphs, Paths and Circuits, Euler Graphs, Hamiltonian graphs, Applications of Eulerian/Hamiltonian Graph in urban planning, Cut-sets, Strongly connected component, Topological sort, Max flow: Ford Fulkerson algorithm, max flow- min cut, Application of Ford Fulkerson in smart grid energy distribution.",
            "String Matching Algorithms: Suffix arrays, Rabin-Karp, Knuth-Morris Pratt (KMP), Boyer Moore algorithm.",
            "Problem Classes: P, NP, NP-Hard and NP-complete, deterministic and non-deterministic polynomial time algorithm approximation, Randomized algorithms.",
            "Laboratory Work: Implementation of various algorithmic techniques for solving common computational/engineering problems."
        ],
        "clos": [
            "Analyse the complexity of algorithms and implement it in a specific scenario.",
            "Apply common algorithmic techniques such as greedy, dynamic programming etc. to standard computational problems.",
            "Design solutions using appropriate data structures and algorithms, such as string matching, randomized, approximation and graph algorithms.",
            "Develop efficient algorithms to solve various computationally complex problems in computing."
        ]
    },
    "dbms": {
        "code": "UCS310", "name": "Database Management Systems",
        "objective": "Emphasis is on the need of database systems. Main focus is on E-R diagrams, relational database, concepts of normalization and de-normalization and SQL commands.",
        "syllabus": [
            "Introduction: Data, data processing requirement, desirable characteristics of an ideal data processing system, traditional file-based system, its drawback, concept of data dependency, Definition of database, types of database, database management system, 3-schema architecture, database terminology, benefits of DBMS.",
            "Relational Database: Relational data model: Introduction to relational database theory: definition of relation, keys, relational model integrity rules, introduction to Relational Algebra.",
            "Database Analysis: Conceptual data modeling using E-R data model -entities, attributes, relationships, generalization, specialization, specifying constraints, Conversion of ER Models to Tables, Practical problems based on E-R data model.",
            "Database Design: Functional Dependency, Canonical Covers, Candidate Key Identification, Normalization- 1NF, 2NF, 3NF, BCNF, 4NF and 5NF. Concept of De- normalization and practical problems based on these forms.",
            "Transaction Management and Concurrency control: Concept of Transaction, States of Transaction and ACID properties, Need of Concurrency control, concept of Lock, Two phase locking protocol.",
            "Recovery Management: Need of Recovery Management, Concept of Stable Storage, Log Based Recovery Mechanism, Checkpoint.",
            "Database Implementation: Introduction to SQL, DDL aspect of SQL, DML aspect of SQL - update, insert, delete & various form of SELECT- simple, using special operators, aggregate functions, group by clause, sub query, joins, co-related sub query, union clause, View, exist operator. PL/SQL - cursor, stored function, stored procedure, triggers, error handling, and package.",
            "Laboratory Work: Students will perform SQL commands to demonstrate the usage of DDL and DML, joining of tables, grouping of data and will implement PL/SQL constructs. They will also implement one project."
        ],
        "clos": [
            "Analyze the Information Systems as socio-technical systems, its need and advantages as compared to traditional file-based systems.",
            "Analyze and design database using E-R data model by identifying entities, attributes and relationships.",
            "Apply and create Relational Database Design process with Normalization and Denormalization of data.",
            "Comprehend the concepts of transaction management, concurrence control and recovery management.",
            "Demonstrate use of SQL and PL/SQL to implementation database applications."
        ]
    },
    "networks": {
        "code": "UCS414", "name": "Computer Networks",
        "objective": "The subject will introduce the basics of computer networks to students through a study of layered models of computer networks and applications.",
        "syllabus": [
            "Introduction: Computer Network, Criteria and Energy Efficient Networking, Green IT Practices, Classification of networks, Network performance and Transmission Impairments. Networking Devices, OSI and TCP/IP Protocol Suite, Layering principles, Energy efficient Line Encoding, Switching and Multiplexing techniques.",
            "Local Area Networks: Networking topologies: Bus, Star, Ring, Token passing rings, Ethernet, Environmental Considerations in Network Design, Energy Optimization in LAN, IEEE standards 802.3, 802.4, 802.5. 802.11. Multiple access: ALOHA, Slotted ALOHA, Hidden and Exposed Terminal problems, Carrier sense multiple access protocols, CSMA/CD, CSMA/CA, Power Optimized Wireless LANs.",
            "Reliable Data Delivery: Error Detection, Parity Check, Checksum and CRC, Error control (Sustainable retransmission techniques, timers), Energy Optimized Flow control (Acknowledgements, sliding window), Multiple Access, Performance issues (pipelining).",
            "Routing and Forwarding: Routing versus forwarding, Static and dynamic routing, Unicast and Multicast Routing. Distance-Vector, Link-State, Shortest path computation, Dijkstra's algorithm, Network Layer Protocols (IP, ICMP), IP addressing, Sub-netting, IPV6, Address binding with ARP, Carbon/Energy-aware Routing Strategies, and optimization techniques for reducing the carbon footprint of network traffic.",
            "Process-to-Process Delivery: UDP, TCP and SCTP, Multiplexing with TCP and UDP, Principles of congestion control, Sustainable Approaches to Congestion control, Balancing Quality of Service and Energy, Flow characteristics, Techniques to improve QoS.",
            "Sustainable Network Applications: Naming and DNS, Uniform Resource Identifiers, Energy Efficient Distributed Applications (client/server, peer-to-peer, Smart and Sustainable Cities, etc.), File transfer, Telnet, e-mail, Bluetooth.",
            "Laboratory work: To design conceptual networks using tools like E-Draw, Microsoft Visio, and NS-3, implement topologies (BUS, RING, STAR, and Mesh) in GNS3, and develop skills in configuring IP Addresses, Routers, DHCP, and Sub-netting."
        ],
        "clos": [
            "Conceptualize and explain the functionality of the different layers within a network architecture.",
            "Understand the concept of data communication, error detection and correction, access and flow control.",
            "Demonstrate the operation of various routing protocols, sub-netting and their performance analysis.",
            "Illustrate design and implementation of datalink, transport and network layer protocols within a simulated/real networking environment."
        ]
    },
    "ai-eng": {
        "code": "UCS321", "name": "AI for Engineers",
        "objective": "Develop foundational AI knowledge while equipping participants with practical problem-solving skills using data relevant to engineering applications.",
        "syllabus": [
            "Introduction to AI for Engineers: Definitions: Artificial Intelligence (AI), Machine Learning (ML), Deep Learning (DL), Reinforcement Learning (RL). Understanding AI's role in engineering decision-making. Illustrative examples from engineering fields (e.g., predictive maintenance, process control).",
            "Data and Preprocessing: Types of data: sensor data, image data, text data, and time-series data. Techniques for cleaning, normalization, and handling missing values. Introduction to feature selection methods.",
            "Supervised Learning: Core algorithms: Linear Regression, Logistic Regression, Decision Trees, Random Forest. Applications: Predicting equipment failure or component lifespan.",
            "Unsupervised Learning: Clustering techniques: K-Means, DBSCAN. Dimensionality reduction methods: Principal Component Analysis (PCA), t-SNE. Applications: Process classification and anomaly detection.",
            "Neural Networks & Deep Learning (Intro): Fundamentals of Neural Networks: Multilayer Perceptron (MLP), Convolutional Neural Networks (CNN). Use cases: Image recognition (e.g., detecting cracks in structures).",
            "Time-Series Analysis: Forecasting techniques: ARIMA and introductory Long Short-Term Memory (LSTM) models. Applications: Load prediction and vibration analysis.",
            "Toolchain for Engineers: Programming tools: Python, Jupyter Notebook. Libraries: pandas, scikit-learn, TensorFlow/Keras. Version control: Using Git effectively.",
            "Laboratory Work: Build regression models, use K-Means clustering, and create neural networks to detect faulty circuits."
        ],
        "clos": [
            "Apply AI and ML algorithms to engineering datasets.",
            "Preprocess and clean raw engineering sensor data.",
            "Train and deploy supervised and unsupervised machine learning models.",
            "Use deep learning libraries to solve classification and forecasting problems."
        ]
    },
    "probability-stats": {
        "code": "UMA401", "name": "Probability and Statistics",
        "objective": "This course shall make the students familiar with the concepts of Probability and Statistics useful in implementing various computer science models. One will also be able to associate distributions with real-life variables and make decisions based on statistical methods.",
        "syllabus": [
            "Introduction to Statistics and Data Analysis: Introduction to Statistical Inference, Samples, Populations and Experimental Design, Collection of Data, Measures of location and variability, Graphical representation of data.",
            "Probability: Sample space, Events, Classical, relative frequency and axiomatic definitions of probability, addition rule and conditional probability, multiplication rule, total probability, Bayes' Theorem.",
            "Random Variables: Discrete, continuous and mixed random variables, probability mass, probability density and cumulative distribution functions, mathematical expectation, moments, probability and moment generating function, median and quantiles, Markov inequality, Chebyshev's inequality, Function of a random variable.",
            "Special Distributions: Discrete uniform, binomial, geometric, negative binomial, Poisson, continuous uniform, exponential, gamma, normal, lognormal, inverse Gaussian, Cauchy, double exponential distributions, reliability of series and parallel systems.",
            "Joint Distributions: Joint, marginal and conditional distributions, product moments, correlation and regression, independence of random variables, bivariate normal distribution.",
            "Sampling Distributions: The Central Limit Theorem, distributions of the sample mean and the sample variance for a normal population, Chi-Square, t and F distributions.",
            "Estimation: Unbiasedness, consistency, the method of moments and the method of maximum likelihood estimation, confidence intervals for parameters in one sample and two sample problems of normal populations, confidence intervals for proportions.",
            "Testing of Hypotheses: Null and alternative hypotheses, the critical and acceptance regions, two types of error, power of the test, the most powerful test and Neyman-Pearson Fundamental Lemma, tests for one sample and two sample problems for normal populations, tests for proportions, Chi-square goodness of fit test and its applications.",
            "Laboratory Work: Implementation of statistical techniques using statistical packages viz. SPSS/R including evaluation of statistical parameters and data interpretation, regression analysis, covariance, hypothesis testing and analysis of variance."
        ],
        "clos": [
            "Analyze the data using different descriptive measures and present graphically.",
            "Compute the probabilities of events along with an understanding of the random variables.",
            "Comprehend the concept of statistical distributions, their properties and relevance to real-life data.",
            "Understand the estimation of mean and variance and their respective hypothesis tests."
        ]
    },
    "edp2": {
        "code": "UTA024", "name": "Engineering Design Project II",
        "objective": "The project will introduce students to the challenge of electronic systems design & integration. The project is an example of 'hardware and software co-design' and the scale of the task is such that it will require teamwork as a co-ordinated effort.",
        "syllabus": [
            "Hardware overview of Arduino: Introduction to Arduino Board: Technical specifications, accessories and applications. Introduction to Eagle (PCB layout tool) software.",
            "Sensors and selection criterion: Concepts of sensors, their technical specifications, selection criterion, working principle and applications such as IR sensors, ultrasonic sensors.",
            "Active and passive components: Familiarization with hardware components, input and output devices. Active and passive components: Transistor (MOSFET), diode (LED), LCD, potentiometer, capacitors, DC motor, Breadboard, general PCB. Instruments: CRO, multimeter, Logic probe, solder iron, desolder iron. Serial communication: Concept of RS232 communication, Xbee. Introduction of ATtiny microcontroller based PWM circuit programming.",
            "Programming of Arduino: Introduction to Arduino: Setting up the programming environment and basic introduction to the Arduino micro-controller. Programming Concepts: Understanding and Using Variables, If-Else Statement, Comparison Operators, Loops, Arrays, Switch Case, Serial Port Communication.",
            "Basics of C#: Introduction to MS.NET Framework, Visual Studio. Console programming, Variables, Expressions, Operators, Control Structures, Strings, Input, serial port communication.",
            "Laboratory Work: Schematic circuit drawing and PCB layout design on CAD tools, implementing hardware module of IR sensor, Transmitter and Receiver circuit on PCB. Buggy challenges (Bronze, Silver, Gold) involving navigation, obstacle detection, and gantry communication."
        ],
        "clos": [
            "Recognize issues to be addressed in a combined hardware and software system design.",
            "Draw the schematic diagram of an electronic circuit and design its PCB layout using CAD Tools.",
            "Apply hands-on experience in electronic circuit implementation and its testing.",
            "Demonstrate programming skills by integrating coding, optimization and debugging for different challenges.",
            "Develop group working, including task sub-division and integration of individual contributions from the team."
        ]
    },
    "aptitude": {
        "code": "UTD003", "name": "Aptitude Skills Building",
        "objective": "This course aims to sensitize students with the gamut of skills which facilitate them to enhance their employability quotient and do well in the professional space.",
        "syllabus": [
            "Emotional Intelligence: Understanding Emotional Intelligence (EI); Daniel Goleman's EI Model: Self Awareness, Self-Regulation, Internal Motivation, Empathy, Social Skills; Application of EI during Group Discussions & Personal Interview.",
            "Team Dynamics & Leadership: Understanding the challenges of working within a team format in today's complex organizational environments; Stages of team formation; Appreciating forces that influence team behaviour; Cross-functional teams; Conflict in Teams; Situational leadership.",
            "Complex Problem Solving: Identifying complex problems and reviewing related information to develop and evaluate options and implement solutions.",
            "Lateral Thinking: Understanding lateral thinking & appreciating the difference between vertical & lateral thinking; brain storming & mind-maps; Solving of problems by an indirect and creative approach.",
            "Persuasion: Role of persuasion in communication; Application of ethos-pathos-logos; Using persuasive strategies to connect with individuals & teams.",
            "Quantitative Reasoning: Thinking critically and applying basic mathematics skills to interpret data, draw conclusions, and solve problems; developing proficiency in numerical reasoning.",
            "Verbal Reasoning: Understanding and reasoning using concepts framed in words; Critical verbal reasoning; Reading Comprehension.",
            "Group Discussion (GD): Illustrating the do's and don'ts in Group Discussions; Specific thrust on types of GD topics; GD evaluation parameters; SPACER model.",
            "Personal Interview (PI): Interview do's and don'ts; PI evaluation parameters; The art of introduction; Managing bouncer questions; Leading the panel in a PI."
        ],
        "clos": [
            "appreciate the various skills required for professional & personal success.",
            "bridge the gap between current and expected performance benchmarks.",
            "competently manage the challenges related to campus placements and perform to their utmost potential."
        ]
    },

    # ─── COPC 3rd YEAR (SEMESTER V & VI) ───
    "ml": {
        "code": "UML501", "name": "Machine Learning",
        "objective": "This course provides a broad introduction to machine learning and statistical pattern recognition. It focuses on the theoretical understanding of these methods, as well as their computational implications.",
        "syllabus": [
            "Introduction: Well-Posed learning problems, Basic concepts, Designing a learning system, Issues in machine learning. Types of machine learning: Learning associations, Supervised learning, Unsupervised learning and Reinforcement learning.",
            "Data Pre-processing: Need of Data Pre-processing, Data Pre-processing Methods: Data Cleaning, Data Integration, Data Transformation, Data Reduction, Reducing large-scale sustainability datasets, Feature Scaling, Splitting dataset.",
            "Regression: Linear Regression, Multiple Linear Regression and Polynomial Regression, Evaluating Regression Models' Performance, Regularization Methods.",
            "Classification: Need and Applications of Classification, Logistic Regression, Decision tree, Tree induction algorithms, Random forest classification, Naive Bayes algorithm; K-Nearest Neighbours (K-NN), Support Vector Machine (SVM), Evaluating Classification Performance.",
            "Clustering: Need and Applications of Clustering, Partitioned methods, Hierarchical methods, Density-based methods.",
            "Association Rules Learning: Need and Application of Association Rules Learning, Basic concepts of Association Rule Mining, Naive algorithm, Apriori algorithm.",
            "Artificial Neural Network: Need and Application of Artificial Neural Network, Neural network representation and working, Activation Functions.",
            "Laboratory Work: Implement data preprocessing, Regression, Decision Tree, Random forest, Naive Bayes, K-NN, SVM, k-Means, Apriori and ANN in Python/R/MATLAB."
        ],
        "clos": [
            "Analyze methods and theories in the field of machine learning and provide an introduction to supervised, unsupervised and reinforcement learning.",
            "Comprehend and apply regression techniques.",
            "Comprehend and implement various classification and clustering methods.",
            "Understand the concept of association rule mining and neural networks and their implementation in context of Machine Learning."
        ]
    },
    "cognitive": {
        "code": "UCS420", "name": "Cognitive Computing",
        "objective": "This course will provide advanced students in cognitive science and computer science with the skills to develop computational models of human cognition, giving insight into how people solve challenging computational problems.",
        "syllabus": [
            "Introduction to Computational Modeling: Feedforward neural networks, Hopfield networks and Boltzmann machines, Simple Recurrent Networks (Elman), Growth models (Cascade correlation), Spiking Neural Networks, Edged AI.",
            "Model Optimization: Techniques like pruning, quantization, and knowledge extraction in AI models, lowering energy consumption.",
            "Reasoning and Learning: Introduction to Bayesian Networks, Semantics of Bayesian Networks, Case based reasoning, Analogical reasoning, Constraint reasoning and Meta reasoning, Concept learning, Explanation based learning.",
            "Computational Linguistics: Syntax and Parsing, Semantic Representation, Semantic Interpretation, Language Generation, Knowledge Extraction and Summarization, Sentiment Analysis, Interactive Fiction.",
            "Advance analytics: Big data and Cognitive computing, Cognitive IoT, Predictive Analytics, Text Analytics, Image Analytics, Speech Analytics.",
            "Case-Study: Introduction to IBM Watson, Components of Deep QA: Building dataset, Question Analysis, Hypothesis generation, scoring and estimation in Watson services.",
            "Laboratory Work: Optimizing spiking neural networks, Legendre Memory Units, optimizing cognitive models with temporal dynamics in NengoDL, build a text summarizer."
        ],
        "clos": [
            "Deploy language agents for language processing workflows.",
            "Design Image information extraction frameworks for different applications.",
            "Develop spiking neural network models for various cognitive tasks.",
            "Implement various analytics tools in related areas of computer science."
        ]
    },
    "web-app": {
        "code": "UCS553", "name": "Enterprise Web Application",
        "objective": "To equip undergraduate students with foundational and intermediate concepts of Java programming, object-oriented design, and hands-on coding. By the end of the course, students will be able to build a mini-project in Java that exhibits OOP concepts, exception handling, file operations, and collection usage.",
        "syllabus": [
            "Unit 1: Java Foundations for Application Development: Java Platform: JVM, JRE, JDK; Essential OOP implementation in Java: classes, objects, interfaces, abstract classes; Access modifiers, static vs instance members; Java coding conventions; Introduction to build tools: Maven/Gradle.",
            "Unit 2: Exception Handling, Collections & Generics: Exception hierarchy, try-catch-finally; Collections Framework: ArrayList, LinkedList, HashSet, HashMap, Iterators; Generics and type safety; Utility Classes.",
            "Unit 3: File Handling, Data Persistence & Logging: Java I/O Streams: Byte and Character streams; File read/write operations; Object Serialization and Deserialization; Logging Frameworks: java.util.logging or Log4j; Application configuration files.",
            "Unit 4: JDBC and Database Connectivity: JDBC architecture; Connecting Java programs with databases (MySQL/SQLite); SQL operations from Java: INSERT, DELETE, UPDATE, SELECT; PreparedStatement, ResultSet; Transaction management; DAO design pattern.",
            "Unit 5: JavaFX: JavaFX Architecture: Stage, Scene, Scene Graph; Layout Management: HBox, VBox, GridPane, BorderPane; JavaFX UI Controls & Events; Tables and Lists; Event-driven programming; Input validation.",
            "Suggested Mini Projects: Library Management, Student Record CRUD, Hospital Appointment Scheduler, Inventory Management, Vehicle Parking, Expense Tracker."
        ],
        "clos": [
            "Apply Java fundamentals and OOP concepts to structure modular applications.",
            "Implement exception handling, collections, generics, and utilities for efficient program flow.",
            "Perform file handling, serialization, and logging for data persistence and monitoring.",
            "Develop database-enabled applications using JDBC and DAO design pattern.",
            "Design graphical user interfaces using JavaFX with event-driven programming and UI/UX principles."
        ]
    },
    "se": {
        "code": "UCS503", "name": "Software Engineering",
        "objective": "To plan and manage large scale software and learn emerging trends in software engineering.",
        "syllabus": [
            "Software Engineering and Processes: Introduction to Software Engineering, Software Evolution, Software Characteristics, Software process models - Waterfall, Iterative, Incremental and Evolutionary process models. Role of Software in Sustainable Development, Green Coding Guidelines (Optimizing Memory & CPU Utilization), ISO Standards for Green IT.",
            "Requirements Engineering: Problem Analysis, Requirement Elicitation and Validation, Requirement Analysis Approaches, Flow modeling through DFD and Data Dictionary, Data Modeling through E-R Diagram, UML modeling, Software Requirement Specification (SRS) documentation.",
            "Software Design and construction: System design principles like abstraction, separation of concerns, coupling and cohesion, Structured design, object-oriented design, event-driven design, component-level design, test-driven design, architecture design like MVC, Client-Server architecture. Green Software Architecture.",
            "Software Verification and Validation: Levels of Testing, Functional Testing, Structural Testing, Test Plan, Test Case Specification, Verification & Validation, Unit and Integration Testing, Alpha & Beta Testing, White box and black box testing techniques, System Testing and Debugging.",
            "Agile Software Development: Agile Manifesto, Twelve Practices of eXtreme Programming (XP), Scrum, product backlog, sprint backlog, Adaptive Software Development(ASD), Feature Driven Development (FDD), Test Driven Development. Energy-Aware UI/UX Design.",
            "Software Project Management: Overview of Project Management: Scope, Time and Cost estimations. Case Studies: Energy-Efficient Software Practices in Google, Microsoft, Meta.",
            "Laboratory Work: Implementation of Software Engineering concepts and exposure to CASE tools like Rational Software Suit through projects."
        ],
        "clos": [
            "Analyze software development process models for software development life cycle.",
            "Elicit, describe, and evaluate a system's requirements and analyze them using various UML models.",
            "Demonstrate the use of design principles in designing data, architecture, user and component level design.",
            "Test the system by planning appropriate test cases and applying relevant test strategies.",
            "Comprehend the use of agile development methodologies including UI sketching, user stories, story cards and backlog management."
        ]
    },
    "cao": {
        "code": "UCS510", "name": "Computer Architecture and Organization",
        "objective": "Focus is on the architecture and organization of the basic computer modules viz. controls unit, central processing unit, input-output organization and memory unit.",
        "syllabus": [
            "Basics of Computer Architecture: Number System and code conversion, Logic gates, Flip flops, Registers, Multiplexer, De-multiplexer, Decoder, Encoder etc. IEEE 754 Floating point representation. 32bit/64bit.",
            "Register Transfer and Micro operations: Register transfer Language, Register transfer, Bus & memory transfer, Arithmetic micro operations, Logic micro operations, Shift micro operations, Design of ALU. Three state buffer, Binary Adder, Binary Incrementor.",
            "Basic Computer Organization: Instruction codes, Computer instructions, Timing & control, Instruction Cycles, Memory, register, and input-output reference instructions, Interrupts, Complete computer description & design of basic computer. Direct and Indirect Address.",
            "Central Processing Unit: General register organization, Stack organization, Instruction format, Addressing modes, Data transfer & manipulation, Program control, RISC, CISC. Register and memory stack, software and hardware interrupt, Green Computing.",
            "Pipelining and Computer Arithmetic: Addition & Subtraction, Multiplication Algorithms, Division algorithms. Instruction Pipeline, Data Pipeline, Risk Pipeline. Dependencies in a pipeline processor, pipeline hazard.",
            "Memory Unit: Memory hierarchy, Processor vs. memory speed, High-speed memories, Main Memory, Cache memory, Associative memory, Interleaving, Virtual memory, Memory management techniques. Direct Mapping, Set Associative Mapping.",
            "Multiprocessors: Characteristics of multiprocessors, Interconnection structures, Inter-processor arbitration, Inter-processor communication & synchronization. Peripheral devices, I/O interface Data transfer schemes, Program control, Synchronous and asynchronous data transfer, Interrupt, DMA transfer, I/O processor."
        ],
        "clos": [
            "Illustrate various elementary concepts of computer architecture including syntax of register transfer language, micro operations, instruction cycle, and control unit.",
            "Describe the design of basic computer with instruction formats & addressing modes.",
            "Explore various memory management techniques and algorithms for performing addition, subtraction and division etc.",
            "Interpret Concepts of pipelining, hazards, memory hierarchy, cache management and virtual memory."
        ]
    },
    "ethics-ai": {
        "code": "UCS421", "name": "Ethics and Risk Mitigation in AI",
        "objective": "Empowering engineers to navigate ethical and societal implications of AI in safety-critical domains.",
        "syllabus": [
            "Introduction to AI Ethics: Understanding the distinction between ethics and compliance. Core principles of fairness, accountability, transparency, and privacy, emphasizing their relevance in decision-making processes.",
            "Bias in Engineering AI Models: Bias in engineering applications (calibration bias, biased datasets). Real-world examples of how biases lead to safety system failures or discrimination.",
            "Data Privacy & Governance: AI integration in sensitive domains like smart grids and health sensors. Indian DPDP Act and GDPR, focusing on their relevance to engineering IoT systems.",
            "Explainable AI (XAI): Explainable AI bridges the gap between black-box models and interpretable systems. Tools such as SHAP and LIME. Practical applications in process control systems.",
            "AI in Critical Systems: Risk management in autonomous vehicles, robotics, and power grids. Risk categories, redundancy and fallback mechanisms. Robust systems for mitigating risks.",
            "Safety-by-Design: Proactive measures to ensure the reliability of AI systems. Fail-safe models and strategies to combat adversarial attacks on control systems. Engineering responsibility.",
            "Governance and Standards: AI governance frameworks, IEEE AI ethics and NIST standards. Creating AI audit templates tailored to engineering applications.",
            "AI Policy & Case Resolution: Real-world simulations, creating AI policies for smart plant operations, evaluating case studies of ethical failures.",
            "Laboratory Work: Hands-on exercises involving SHAP analysis, privacy impact assessments, and AI audit checklist creation."
        ],
        "clos": [
            "Comprehend ethical principles and values and apply them as a guide to behavior in AI development.",
            "Identify, mitigate, and manage bias in AI models.",
            "Ensure compliance with data privacy regulations like GDPR and DPDP Act.",
            "Implement explainability tools (SHAP/LIME) and safety-by-design principles in critical AI systems."
        ]
    },
    "toc": {
        "code": "UCS701", "name": "Theory of Computation",
        "objective": "This course introduces basic theory of computer science and formal methods of computation. The course exposes students to the computability theory, as well as to the complexity theory.",
        "syllabus": [
            "Regular Languages: Alphabets, Language, Regular Expression, Definitions of Finite State Machine, Transition Graphs, Deterministic & Non-deterministic Finite State Machines, Regular Grammar, Thompson's Construction to Convert Regular Expression to NDFA & Subset Algorithm to convert NDFA to DFA, Conversion of Moore machine to Melay Machine & Vice-Versa.",
            "Properties of Regular languages: Conversion of DFA to Regular Expression, Pumping Lemma, Properties and Limitations of Finite state machine, Decision properties of Regular Languages, Application of Finite Automata.",
            "Context Free Grammar and Push Down Automata: Context Free Grammar, Derivation tree and Ambiguity, Application of Context free Grammars, Chomsky and Greibach Normal form, Properties of context free grammar, CKY Algorithm, Decidable properties of Context free Grammar, Pumping Lemma for Context free grammar, Push down Stack Machine, Design of Deterministic and Non-deterministic Push-down stack.",
            "Turing Machine: Turing machine definition and design of Turing Machine, Variations of Turing Machines, combining Turing machine, Universal Turing Machine, Post Machine, Chomsky Hierarchy, Post correspondence problem, Halting problem, Turing decidability."
        ],
        "clos": [
            "Comprehend regular languages and finite automata and develop ability to provide the equivalence between regular expressions, NFAs, and DFAs.",
            "Disambiguate context-free grammars and understand the concepts of context-free languages and pushdown automata.",
            "Analyse and design efficient Turing Machines.",
            "Distinguish different computing languages and classify their respective types."
        ]
    },
    "optimization": {
        "code": "UMA071", "name": "Optimization Techniques",
        "objective": "The objective of this course is to provide students with a comprehensive understanding of optimization techniques, both linear and nonlinear, and their applications in various fields. Through this course, students will learn to apply optimization models and techniques to realworld problems.",
        "syllabus": [
            "Unit 1: Introduction: Definition of optimization, types of optimization models (linear vs nonlinear, constraint vs unconstraint optimization models), geometry of linear programming.",
            "Unit 2: Linear optimization: Basic Feasible Solutions and Algebraic Method, Simplex method, its variants, and special cases, duality for Linear Programming Problems (LPP), branch and bound method for Integer Linear Programming Problems (ILPP).",
            "Unit 3: Unconstrained Optimization: Definiteness of matrices, optimality conditions for unconstrained optimization, special case of quadratic functions, convex functions and their properties, applications of quadratic functions to least square approximation.",
            "Unit 4: Search Techniques: Steepest descent method, conjugate gradient method, Newton and Quasi-Newton methods, Fletcher and Reeve's method, David-Fletcher-Powell method.",
            "Unit 5: Constrained Optimization: Convex optimization, KKT conditions for general inequality and equality constrained problems, Frank and Wolfe's method, Rosen gradient projection method, Penalty and barrier functions, Convex quadratic problem, support vector machines (SVM)."
        ],
        "clos": [
            "Formulate and classify optimization problems.",
            "Apply the Simplex Method and its variants for solving the Linear programming problems, and analyse the Integer Programming Problems.",
            "Implement Search Techniques in Unconstrained Optimization.",
            "Evaluate Constrained Optimization Problems.",
            "Demonstrate Proficiency in Using Software Tools such as MATLAB to implement optimization algorithms."
        ]
    },
    "quantum-computing": {
        "code": "UCS619", "name": "Quantum Computing",
        "objective": "The objective of this course is to provide the students an introduction to quantum computation after covering the concepts of linear algebra, vector space and quantum mechanics.",
        "syllabus": [
            "Mathematics and Quantum Mechanics foundation: Basics of Vector, Inner and outer product, Linear and complex vector space, Hilbert spaces, Tensor Products, Trace of a matrix, Dirac's notation, Probabilities and measurements, Axioms of quantum probability, Quantum vs Classical probability, Basics of quantum mechanics, Postulates, Introduction of qubit, Bloch sphere, Superposition and entanglement, Super-dense coding, Density operators, EPR paradox, Bell's inequality.",
            "Quantum Computing: classical gates, Single qubit gates, multiple qubit gates, quantum gates, universal quantum gates, Quantum circuits, design of quantum circuits, Energy efficiency concepts in quantum computing.",
            "Quantum Algorithms: Deutsch's algorithm, Grover algorithm, The quantum Fourier transform, Phase estimation, Fourier Sampling, Applications: order-finding and factoring, Shor's factoring algorithm.",
            "Quantum Cryptography: Difference between classical and quantum cryptography, Basics of BB84 and E91 protocol.",
            "Quantum Error Correction: Graph states and codes, Quantum error correction, fault-tolerant computation.",
            "Lab: Implementation of Quantum concepts in Qiskit / quantum simulator / MATLAB / Julia environment."
        ],
        "clos": [
            "Comprehend the basic concepts of quantum computing.",
            "Illustrate the concepts of quantum gates and quantum circuits.",
            "Explore quantum Fourier transformation and quantum error correction mechanism.",
            "Acquire basic knowledge of quantum protocols."
        ]
    },
    "innovation": {
        "code": "UTA025", "name": "Innovation and Entrepreneurship",
        "objective": "This course aims to provide the students with a basic understanding in the field of entrepreneurship, entrepreneurial perspectives, concepts and frameworks useful for analyzing entrepreneurial opportunities, and business model canvas.",
        "syllabus": [
            "Introduction to Entrepreneurship: Entrepreneurs; entrepreneurial personality and intentions - characteristics, traits and behavioral; entrepreneurial challenges.",
            "Entrepreneurial Opportunities: Opportunities- discovery/ creation, Pattern identification and recognition for venture creation: prototype and exemplar model, reverse engineering.",
            "Entrepreneurial Process and Decision Making: Entrepreneurial ecosystem, Ideation, development and exploitation of opportunities; Negotiation, decision making process and approaches, Effectuation and Causation.",
            "Crafting business models and Lean Start-ups: Introduction to business models; Creating value propositions; customer focused innovation; building and analyzing business models; Business model canvas, Introduction to lean startups, Business Pitching.",
            "Organizing Business and Entrepreneurial Finance: Forms of business organizations; organizational structures; Evolution of organization, sources and selection of venture finance options."
        ],
        "clos": [
            "Explain the fundamentals behind the entrepreneurial personality and their intentions.",
            "Discover/create and evaluate opportunities.",
            "Identify various stakeholders for the idea and develop value proposition for the same.",
            "Describe various Business Models and design a business model canvas.",
            "Analyse and select suitable finance and revenue models for start-up venture."
        ]
    },
    "capstone1": {
        "code": "UCS797", "name": "Capstone Project",
        "objective": "To facilitate the students learn and apply an engineering design process in computer engineering, including project resource management. As a part of a team, the students will make a project, that emphasizes, hands-on experience, and integrates analytical and design skills.",
        "syllabus": [
            "Course Description: Capstone Project is increasingly interdisciplinary and requires students to function on multidisciplinary teams. It is the process of devising a system, component or process to meet desired needs. It is a decision-making process, in which the basic sciences, mathematics, and the engineering sciences are applied to convert resources optimally. It typically includes both analysis and synthesis performed in an iterative cycle.",
            "Project Management: Team coordination, maintaining daily logs, mentorship under supervisor, scheduled weekly reviews, final execution, testing, and project documentation."
        ],
        "clos": [
            "Develop skills necessary for structuring, managing, and executing the projects.",
            "Design, develop, debug, document, and deliver a project and learn to work in a team environment.",
            "Develop written and oral communication skills.",
            "Become proficient with software development tools and environments.",
            "Apply interdisciplinary knowledge to engineering design solutions."
        ]
    },

    # ─── COPC 4th YEAR (SEMESTER VII & VIII) ───
    "compiler": {
        "code": "UCS802", "name": "Compiler Construction",
        "objective": "To Gain the working knowledge of the major phases of compilation and develop the ability to use formal attributed grammars for specifying the syntax and semantics of programming languages.",
        "syllabus": [
            "Introduction to compiling: Compilers, Analysis of the source program, the phases of Compiler, Compilation and Interpretation, Bootstrapping and Cross compiler.",
            "Lexical Analysis: Need of Lexical analyzer, Tokens and regular expressions, Generation of lexical analyzer from DFA, Introduction to LEX and program writing in LEX.",
            "Syntax Analysis: Need for syntax analysis and its scope, Context free grammar, Top down parsing, bottom up parsing, backtracking, LL(1) Parser, LR Parser, LR(0) items, SLR(1), LALR(1), Canonical Parsing, YACC.",
            "Error Analysis: Introduction to error analysis, detection, reporting and recovery, Classification of error-lexical, syntactic and semantic.",
            "Static semantics and Intermediate Code generation: Static semantic analyses, S-attribute def and evaluation, Semantic analysis through S-attribute grammar, L-attribute def.",
            "Run time Environment: Need for runtime memory management, Address resolution of runtime objects, Type checking, Parameter passing mechanism, Activation record, Dynamic memory management, garbage collection.",
            "Code Generation: Code generation for expressions, Issues in efficient code generation, Sethi Ullman algorithm.",
            "Code Optimization: Need for code optimizations, Local and global optimization, Control flow analysis, Data flow analysis, performing global optimizations, Graph coloring in optimization.",
            "Laboratory work: Construct a lexical analyzer using Flex. Construct a parser using Bison. Build simple compilers from parsing to intermediate representation and code generation."
        ],
        "clos": [
            "Comprehend the working of major phases of compiler.",
            "Apply top-down and bottom-up parsing techniques for the Parser construction.",
            "Understand the basic data structures used in compiler construction such as abstract syntax trees, symbol tables and three-address code.",
            "Understand target machine's run time environment and techniques used for code generation."
        ]
    },
    "humanities": {
        "code": "UHU005", "name": "Humanities for Engineers",
        "objective": "The objective of this course is to introduce values and ethical principles, that will serve as a guide to behavior on a personal level and in professional life. It also provides background of demand and elasticity of demand to help in devising pricing strategy; to make strategic decisions using game theory and to apply techniques of project evaluation.",
        "syllabus": [
            "Unit 1: Human Values and Ethics: Values: Introduction to Values, Allport-Vernon-Lindzey Study of Values, Rokeach Value Survey, Instrumental and Terminal Values. Moral and Ethical Values: Types of Morality, Kant's Principles of Morality, Factors for taking ethical decisions, Kohlberg's Theory of Moral Development. Professional Ethics: Profession: Attributes and Ethos, Whistle-blowing.",
            "Unit 2: Organizational Behavior: Introduction to the Field of Organizational Behaviour: Individual Behaviour, Personality, and Values, Perceiving Ourselves and Others in Organizations, Workplace Emotions, Attitudes, and Stress, Foundations of Employee Motivation and Leadership, Performance Appraisal, Conflict and Negotiation in the Workplace.",
            "Unit 3: Economics: Demand, Supply & Elasticity, Production & Cost Analysis (Short run & Long Run cost functions), Competitive Analysis & Profit Maximization (Perfect competition, Monopoly, Oligopoly), Strategy & Game Theory (Pure & Mixed Strategy Games, Nash Equilibrium, Prisoner's Dilemma), Capital Budgeting (NPV & IRR techniques).",
            "Practical: Practical application of concepts by means of Discussions, Role-plays, Presentations, and Case Studies."
        ],
        "clos": [
            "Comprehend ethical principles and values and apply them as a guide to behavior in personal and professional life.",
            "Apply tools and techniques to manage and motivate employees.",
            "Analyse and apply conflict management strategies that managers can use to resolve organizational conflict effectively.",
            "Devise pricing strategy for decision-making.",
            "Apply techniques for project evaluation."
        ]
    },
    "agentic-ai": {
        "code": "UCS714", "name": "Agentic AI",
        "objective": "The course aims to develop foundational understanding of Generative AI and Large Language Models, introduce the principles and architectures of Agentic AI systems, train students in prompt engineering, enable design of single/multi-agent systems, and teach evaluation/governance.",
        "syllabus": [
            "Foundations of Generative and Agentic AI: Overview of Generative AI; fundamentals of Large Language Models and their capabilities; applications of Generative AI; comparison of traditional AI and Agentic AI; components of intelligent agents including goals, memory, reasoning, and action.",
            "Prompt Engineering and Reasoning Strategies for Agents: Role prompting; zero-shot and few-shot prompting; Chain-of-Thought prompting; ReAct prompting; self-reflection prompting; system prompts versus user prompts; prompt structuring for multi-agent interactions; prompt injection risks.",
            "Agent Architectures and Design Paradigms: Characteristics of intelligent agents including autonomy, reactivity, proactiveness, and social ability; reactive and deliberative agent models; reflection design pattern; tool-use pattern; planning agents and task decomposition; multi-agent architectures.",
            "Collaborative Multi-Agent Systems and Workflow Orchestration: Agent communication models; structured and unstructured message passing; shared memory models; DAG-based workflow orchestration; recursive delegation and feedback-driven iteration; Model Context Protocol (MCP) and Agent-to-Agent (A2A) protocol.",
            "Deployment and Evaluation of Agentic AI: Workflow orchestration using low-code tools (N8N); triggers, webhooks, API integration, database integration; scalable multi-agent pipelines; error handling, fallback mechanisms; performance metrics (task success rate, latency, reasoning depth, coherence, cost).",
            "Lab Experiments: Exploring LLM APIs, prompt testing, implementing goal-driven single agents, reasoning-based agents, designing tool-use agents, multi-agent collaboration, API integration, performance benchmarking."
        ],
        "clos": [
            "Explain the principles of Generative AI and Agentic AI systems.",
            "Apply prompt engineering techniques for reasoning and autonomous behavior.",
            "Design and implement agentic AI architectures using standard design patterns.",
            "Develop end-to-end multi-agent pipelines integrating tools and APIs.",
            "Evaluate agentic AI systems using performance metrics."
        ]
    },
    "sna": {
        "code": "UCS813", "name": "Social Network Analysis",
        "objective": "To enable students to put Social Network Analysis projects into action in a planned, informed and efficient manner.",
        "syllabus": [
            "Preliminaries: Graphs, Types of graphs, Representation, Bipartite graphs, Planar networks, The graph Laplacian, Random Walks, Maximum Flow and Minimum Cut Problem, Introduction to Approximation Algorithms, Definitions. Approximation algorithms for vertex cover and TSP.",
            "Introduction to Social Networks: Types of Networks: General Random Networks, Small World Networks, Scale-Free Networks; Examples of Information Networks; Static Unweighted and weighted Graphs, Dynamic Unweighted and weighted Graphs, Network Centrality Measures; Strong and Weak ties.",
            "Walks: Random walk-based proximity measures, Other graph-based proximity measures. Clustering with random-walk based measures, Algorithms for Hitting and Commute, Algorithms for Computing Personalized Pagerank and Sim- rank.",
            "Community Detection: Basic concepts, Algorithms for Community Detection: Quality Functions, The Kernighan-Lin algorithm, Agglomerative/Divisive algorithms, Spectral Algorithms, Multi-level Graph partitioning, Markov Clustering; Community Discovery in Directed Networks, Community Discovery in Dynamic/Heterogeneous Networks.",
            "Link Prediction: Feature based Link Prediction, Bayesian Probabilistic Models, Probabilistic Relational Models, Linear.",
            "Algebraic Methods: Network Evolution based Probabilistic Model, Hierarchical Probabilistic Model, Relational Bayesian Network, Relational Markov Network.",
            "Event Detection: Classification of Text Streams, Event Detection and Tracking: Bag of Words, Temporal, location, ontology based algorithms. Evolution Analysis in Text Streams, Sentiment analysis.",
            "Social Influence Analysis: Influence measures, Social Similarity - Measuring Influence, Influencing actions and interactions. Homophily, Influence maximization.",
            "Laboratory work: Implementation of various concepts taught in the course using Python/R Programming."
        ],
        "clos": [
            "Formalize different types of entities and relationships as nodes and edges and represent this information as relational data.",
            "Plan and execute network analytical computations.",
            "Use advanced network analysis software to generate visualizations and perform empirical investigations of network data.",
            "Interpret and synthesize the meaning of the results with respect to a question, goal, or task.",
            "Collect network data in different ways and from different sources while adhering to legal standards and ethics standards."
        ]
    },
    "ethical-hacking": {
        "code": "UCS806", "name": "Ethical Hacking",
        "objective": "This course is designed to impart a critical and theoretical and detailed practical knowledge of a range of computer network security technologies as well as network security tools and the services related to Ethical Hacking.",
        "syllabus": [
            "Introduction: Understanding the importance of security, Concept of ethical hacking and essential Terminologies-Threat, Attack, Vulnerabilities, Target of Evaluation, Exploit. Phases involved in hacking.",
            "Footprinting: Introduction to footprinting, Understanding the information gathering methodology of the hackers, Tools used for the reconnaissance phase.",
            "Scanning: Detecting live systems-on the target network, - Discovering services running listening on target systems, Understanding port scanning techniques, Identifying TCP and LIDP services running on the target network, Understanding active and passive fingerprinting.",
            "System-Hacking: Understanding Sniffers, Comprehending Active and Passive Sniffing, ARP Spoofing and Redirection, DNS and IP Sniffing, HTTPS Sniffing. Sustainable E-Learning Platforms.",
            "Session Hijacking: Understanding Session Hijacking, Phases involved in Session Hijacking, Types of Session Hijacking, and Session Hijacking Tools.",
            "Hacking Wireless Networks: Introduction to 802.11, Role of WEP, Cracking WEP Keys, Sniffing Traffic, Wireless DOS attacks, WLAN Scanners, WLAN Sniffers, Hacking Tools, Securing Wireless Networks.",
            "Cryptography: Symmetric and Asymmetric Cryptography, Classical Encryption techniques, Substitution techniques, Block Ciphers Principles, Fiestel Structure, DES, Double and Triple DES, AES, Public Key Cryptography, RSA, Diffie-Hellman Key Exchange, Cryptographic Hash Functions and Digital Signatures.",
            "Laboratory Work: Lab Exercises including using scanning tools like IPEYE, IPsecScan, SuperScan etc. and Hacking Tools likes Trinoo, TFN2K, Zombic, Zapper etc."
        ],
        "clos": [
            "Understand the different phases involved in hacking.",
            "Utilize the scanning tools used for the information gathering.",
            "Recognize the phases in session hijacking and use the tools for counter-measuring the various sniffing attacks.",
            "Analyse different types of attacks on the wireless networks.",
            "Describe and apply different types of algorithms for securing the data."
        ]
    }
}

# Run generation
for sub_id, data in syllabi.items():
    create_syllabus_pdf(sub_id, data)
print("Syllabus PDF generation process completed!")
