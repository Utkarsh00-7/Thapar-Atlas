import pypdf
import json

pdf_path = 'C:/Users/LENOVO/.gemini/antigravity/brain/eab1127c-07d6-4646-975a-b87ba9bf717f/media__1781545591115.pdf'
reader = pypdf.PdfReader(pdf_path)

subject_codes = {
  "calculus": "UMA022",
  "chemistry-a": "UCB009",
  "eee": "UES013",
  "energy-env-a": "UEN008",
  "pps-a": "UES103",
  "dela": "UMA023",
  "ed-b": "UES101",
  "mp": "UES102",
  "physics-b": "UPH013",
  "procomm-b": "UHU003",
  "os": "UCS303",
  "oop": "UTA018",
  "ds": "UCS301",
  "discrete": "UCS405",
  "edp1": "UTA016",
  "nla": "UMA021",
  "green-computing": "UCS320",
  "algo": "UCS415",
  "dbms": "UCS310",
  "networks": "UCS414",
  "ai-eng": "UCS321",
  "probability-stats": "UMA401",
  "edp2": "UTA024",
  "aptitude": "UTD003",
  "ml": "UML501",
  "cognitive": "UCS420",
  "web-app": "UCS553",
  "se": "UCS503",
  "cao": "UCS510",
  "ethics-ai": "UCS421",
  "toc": "UCS701",
  "optimization": "UMA071",
  "quantum-computing": "UCS619",
  "innovation": "UTA025",
  "capstone1": "UCS797",
  "compiler": "UCS802",
  "humanities": "UHU005",
  "agentic-ai": "UCS714",
  "sna": "UCS813",
  "ethical-hacking": "UCS806"
}

matches = {}
for name, code in subject_codes.items():
    matches[name] = []

for idx, page in enumerate(reader.pages):
    page_num = idx + 1 # 1-based page index
    text = page.extract_text()
    if not text:
        continue
    for name, code in subject_codes.items():
        if code in text:
            matches[name].append(page_num)

print(json.dumps(matches, indent=2))
