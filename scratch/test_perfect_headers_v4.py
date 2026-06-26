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

def is_valid_header(title):
    # 1. Parentheses check
    if title.count('(') != title.count(')'):
        return False
        
    # 2. Periods check (ignore leading numbers)
    title_no_num = re.sub(r'^(?:\d+|[IVXLCDM]+)\s*[\.\s\-]+', '', title)
    title_no_num = title_no_num.rstrip('.')
    if '.' in title_no_num:
        return False
        
    # 3. Comma validation
    if ',' in title:
        # If it contains commas, it should be reasonably short
        if len(title) > 60:
            return False
        # Each segment of comma-separated header should start with capital letter (ignoring lowercase conjunctions)
        ignored = ["and", "or", "of", "in", "for", "with", "to", "by", "a", "an", "the", "vs"]
        segments = title.split(',')
        for seg in segments:
            seg = seg.strip()
            if not seg:
                continue
            words = seg.split()
            if not words:
                continue
            first_word = words[0]
            if first_word.lower() in ignored and len(words) > 1:
                first_word = words[1]
            if first_word[0].isalpha() and not first_word[0].isupper():
                return False
                
    # 4. Length limits (increased to 80!)
    if len(title) < 3 or len(title) > 80:
        return False
        
    # 5. Keyword checks
    l_title = title.lower()
    if any(x in l_title for x in ["course objective", "course learning", "evaluation", "laboratory", "text book", "reference", "learning outcomes"]):
        return False
    if re.match(r'^[A-Z]{3,4}\d{3}$', title):
        return False
        
    return True

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
    # Removed cos?
    end_pattern = r'\b(course\s+learning\s+outcomes?|course\s+outcomes?|course\s+learning\s+objectives?|clos?|the\s+students?\s+will\s+be\s+able\s+to|at\s+the\s+end\s+of\s+the\s+course|laboratory\s+work|lab\s+work|lab\s+experiments?|text\s*books?|reference\s*books?|references|evaluation\s+scheme|recommended\s+books)\b'
    end_match = re.search(end_pattern, lower_text[start_idx:])
    if end_match:
        abs_match_start = start_idx + end_match.start()
        end_idx = get_line_start(cleaned_text, abs_match_start)
        
    syllabus_slice = cleaned_text[start_idx:end_idx].strip()
    
    headers = []
    
    # 1. Match explicit unit headers: "Unit 1: Title"
    for m in re.finditer(r'(?:^|\n)\s*((?:Unit|Module|Section|Chapter|Lec)\s+(?:\d+|[IVXLCDM]+)[:\s\-\.]*[^\n]*)', syllabus_slice, re.IGNORECASE):
        headers.append((m.start(), m.end(), m.group(1).strip(), 'unit'))
        
    # 2. Match numbered headers: "1. Title"
    for m in re.finditer(r'(?:^|\n)\s*((?:\d+|[IVXLCDM]+)\.\s+[A-Z][A-Za-z0-9 \t&/\-,\(\)\.]{2,80})', syllabus_slice):
        headers.append((m.start(), m.end(), m.group(1).strip(), 'number'))
        
    # 3. Match colon headers: "Title:"
    for m in re.finditer(r'(?:^|\n)\s*([A-Z][A-Za-z0-9 \t&/\-,\(\)\.]{2,100}):[ \t]*', syllabus_slice):
        headers.append((m.start(), m.end(), m.group(1).strip(), 'colon'))
        
    # Sort and remove overlapping/duplicate headers
    headers.sort(key=lambda x: x[0])
    filtered_headers = []
    last_end = -1
    for h in headers:
        start, end, title, h_type = h
        if start >= last_end:
            # Clean first
            clean_title = title
            clean_title = re.sub(r'^(?:\d+|[IVXLCDM]+)\s*[\.\s\-]+', '', clean_title)
            clean_title = re.sub(r'^(?:Unit|Module|Section|Chapter|Lec)\s+(?:\d+|[IVXLCDM]+)[:\s\-\.]*', '', clean_title, flags=re.IGNORECASE)
            clean_title = clean_title.rstrip(':').strip()
            
            # Unit title cleaning
            if ':' in clean_title:
                clean_title = clean_title.split(':', 1)[0].strip()
            elif ',' in clean_title and h_type in ['unit', 'number']:
                parts = clean_title.split(',', 1)
                if len(parts[0].split()) <= 4:
                    clean_title = parts[0].strip()
                    
            if is_valid_header(clean_title):
                filtered_headers.append(clean_title)
                last_end = end
                
    print(f"{subject_id}: {filtered_headers}")
