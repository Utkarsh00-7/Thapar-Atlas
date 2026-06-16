import os
import pypdf

pdf_path = 'C:/Users/LENOVO/.gemini/antigravity/brain/eab1127c-07d6-4646-975a-b87ba9bf717f/media__1781545591115.pdf'
output_dir = 'public/syllabi'
os.makedirs(output_dir, exist_ok=True)

# Define exact 1-based page ranges (start, end) for each subject
subject_ranges = {
  # Pool A
  "calculus": (24, 25),
  "chemistry-a": (16, 17),
  "eee": (20, 21),
  "energy-env-a": (22, 23),
  "pps-a": (18, 19),
  
  # Pool B
  "dela": (35, 36),
  "ed-b": (29, 30),
  "mp": (33, 34),
  "physics-b": (27, 28),
  "procomm-b": (31, 32),

  # 2nd Year
  "os": (38, 40),
  "oop": (41, 42),
  "ds": (43, 44),
  "discrete": (45, 46),
  "edp1": (47, 49),
  "nla": (50, 51),
  "green-computing": (52, 53),
  "algo": (55, 56),
  "dbms": (57, 58),
  "cognitive": (59, 60),
  "networks": (61, 62),
  "ai-eng": (63, 64),
  "probability-stats": (65, 66),
  "edp2": (67, 68),
  "aptitude": (69, 71),

  # 3rd Year
  "ml": (73, 74),
  "web-app": (241, 243),
  "se": (77, 78),
  "cao": (79, 80),
  "ethics-ai": (81, 83),
  "toc": (85, 86),
  "optimization": (87, 87),
  "innovation": (88, 90),
  "quantum-computing": (91, 92),
  "capstone1": (93, 93),

  # 4th Year
  "compiler": (95, 96),
  "humanities": (97, 98),
  "agentic-ai": (198, 199),
  "sna": (100, 101),
  "ethical-hacking": (102, 103)
}

reader = pypdf.PdfReader(pdf_path)

for subject_id, (start, end) in subject_ranges.items():
    writer = pypdf.PdfWriter()
    # pypdf pages list is 0-indexed, so 1-based page num x corresponds to index x-1
    for page_num in range(start, end + 1):
        page_idx = page_num - 1
        writer.add_page(reader.pages[page_idx])
        
    output_path = os.path.join(output_dir, f"{subject_id}_syllabus.pdf")
    with open(output_path, "wb") as f:
        writer.write(f)
        
    print(f"Extracted pages {start}-{end} to {output_path}")

print("Syllabus PDF splitting completed successfully!")
