import os
import re
from pypdf import PdfReader

syllabi_dir = r"c:\Users\LENOVO\OneDrive\Desktop\Thapar Atlas\public\syllabi"
pdf_files = sorted([f for f in os.listdir(syllabi_dir) if f.endswith('.pdf')])

def get_line_start(text, index):
    nl_idx = text.rfind('\n', 0, index)
    if nl_idx == -1:
        return 0
    return nl_idx + 1

def clean_text(text):
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = text.replace('\u2017', '_')
    text = re.sub(r'([a-zA-Z])\ufffd([a-zA-Z])', r"\1'\2", text)
    text = text.replace('\ufffd', '-')
    return text

for filename in pdf_files:
    subject_id = filename.replace('_syllabus.pdf', '')
    pdf_path = os.path.join(syllabi_dir, filename)
    reader = PdfReader(pdf_path)
    text = ""
    for p in reader.pages:
        text += p.extract_text() + "\n"
    
    text = clean_text(text)
    cleaned_lines = []
    for line in text.split('\n'):
        l_lower = line.lower()
        if 'sugc' in l_lower or 'spgc' in l_lower or 'meetings' in l_lower or 'page' in l_lower:
            continue
        cleaned_lines.append(line)
    cleaned_text = "\n".join(cleaned_lines)
    lower_text = cleaned_text.lower()
    
    # Slice
    start_idx = 0
    syllabus_match = re.search(r'\b(syllabus|course\s+content|course\s+description)\b', lower_text)
    if syllabus_match:
        start_idx = syllabus_match.end()
    else:
        obj_match = re.search(r'\bcourse\s+objectives?\s*:\s*', lower_text)
        if obj_match:
            start_idx = obj_match.end()
            
    end_idx = len(cleaned_text)
    end_pattern = r'\b(course\s+learning\s+outcomes?|clos?|the\s+students\s+will\s+be\s+able\s+to|laboratory\s+work|lab\s+work|text\s*books?|reference\s*books?|references|evaluation\s+scheme|micro\s+projects?|recommended\s+books)\b'
    end_match = re.search(end_pattern, lower_text[start_idx:])
    if end_match:
        abs_match_start = start_idx + end_match.start()
        end_idx = get_line_start(cleaned_text, abs_match_start)
        
    syllabus_slice = cleaned_text[start_idx:end_idx].strip()
    
    # Extract headers
    headers = []
    
    # 1. Look for explicit units: "Unit 1: Title" or "Module 1 - Title" or "Chapter 1"
    for m in re.finditer(r'(?:^|\n)\s*((?:Unit|Module|Section|Chapter|Lec)\s+(?:\d+|[IVXLCDM]+)[:\s\-\.]*[^\n]+)', syllabus_slice, re.IGNORECASE):
        headers.append((m.start(), m.end(), m.group(1).strip(), 'unit'))
        
    # 2. Look for numbered lines: "1. Title"
    for m in re.finditer(r'(?:^|\n)\s*((?:\d+|[IVXLCDM]+)\.\s+[A-Z][A-Za-z0-9 \t&/\-,\(\)\.]{2,80})', syllabus_slice):
        headers.append((m.start(), m.end(), m.group(1).strip(), 'number'))
        
    # 3. Look for colon headers: "Title:"
    for m in re.finditer(r'(?:^|\n)\s*([A-Z][A-Za-z0-9 \t&/\-,\(\)\.]{2,100}):[ \t]*', syllabus_slice):
        start_pos = m.start()
        header_title = m.group(1).strip()
        
        # Heuristics to reject false positives:
        # Check if preceded by a comma
        preceding_text = syllabus_slice[:start_pos].strip()
        if preceding_text.endswith(','):
            continue
            
        # Check if title has more than 1 comma
        if header_title.count(',') > 1:
            continue
        if header_title.count(',') == 1 and len(header_title) > 50:
            continue
            
        # Reject common course terms
        l_title = header_title.lower()
        if any(x in l_title for x in ["course objective", "course learning", "evaluation", "laboratory", "text book", "reference"]):
            continue
        if re.match(r'^[A-Z]{3,4}\d{3}$', header_title): # Reject code like UMA022
            continue
            
        headers.append((m.start(), m.end(), header_title, 'colon'))
        
    # Sort and filter overlaps
    headers.sort(key=lambda x: x[0])
    filtered = []
    last_end = -1
    for h in headers:
        start, end, title, h_type = h
        if start >= last_end:
            # Clean up the title if it starts with Unit/Module/Number prefix
            clean_title = title
            clean_title = re.sub(r'^(?:\d+|[IVXLCDM]+)\.\s*', '', clean_title)
            clean_title = re.sub(r'^(?:Unit|Module|Section|Chapter|Lec)\s+(?:\d+|[IVXLCDM]+)[:\s\-\.]*', '', clean_title, flags=re.IGNORECASE)
            clean_title = clean_title.rstrip(':').strip()
            
            if len(clean_title) >= 3:
                filtered.append((start, end, clean_title))
                last_end = end
                
    print(f"{subject_id}: {[f[2] for f in filtered]}")
