import os
import re
import json
from pypdf import PdfReader

syllabi_dir = r"c:\Users\LENOVO\OneDrive\Desktop\Thapar Atlas\public\syllabi"
output_debug = r"C:\Users\LENOVO\OneDrive\Desktop\Thapar Atlas\scratch\debug_intelligent_output.txt"
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

results = {}

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
    end_pattern = r'\b(course\s+learning\s+outcomes?|course\s+outcomes?|course\s+learning\s+objectives?|clos?|cos?|the\s+students?\s+will\s+be\s+able\s+to|at\s+the\s+end\s+of\s+the\s+course|laboratory\s+work|lab\s+work|lab\s+experiments?|text\s*books?|reference\s*books?|references|evaluation\s+scheme|recommended\s+books)\b'
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
        start_pos = m.start()
        header_title = m.group(1).strip()
        
        # Check if preceded by a comma
        preceding_text = syllabus_slice[:start_pos].strip()
        if preceding_text.endswith(','):
            continue
            
        # Check if title has more than 1 comma
        if header_title.count(',') > 1:
            continue
        if header_title.count(',') == 1 and len(header_title) > 50:
            continue
            
        # Reject outcomes, objectives, text books, references
        l_title = header_title.lower()
        if any(x in l_title for x in ["course objective", "course learning", "evaluation", "laboratory", "text book", "reference"]):
            continue
        if re.match(r'^[A-Z]{3,4}\d{3}$', header_title):
            continue
            
        headers.append((m.start(), m.end(), header_title, 'colon'))
        
    # Sort and remove overlapping/duplicate headers
    headers.sort(key=lambda x: x[0])
    filtered_headers = []
    last_end = -1
    for h in headers:
        start, end, title, h_type = h
        if start >= last_end:
            if ')' in title and '(' not in title:
                continue
            l_title = title.lower()
            if any(x in l_title for x in ["course objective", "course learning", "evaluation", "laboratory", "text book", "reference", "learning outcomes"]):
                continue
            filtered_headers.append(h)
            last_end = end
            
    units = []
    unit_count = 1
    
    for idx, h in enumerate(filtered_headers):
        start, end, title, h_type = h
        next_start = filtered_headers[idx+1][0] if idx+1 < len(filtered_headers) else len(syllabus_slice)
        content = syllabus_slice[end:next_start].strip()
        
        # Determine the clean title and initial topics from the header line itself
        clean_title = title
        extra_topics = []
        
        # Clean unit labels
        clean_title = re.sub(r'^(?:\d+|[IVXLCDM]+)\.\s*', '', clean_title)
        clean_title = re.sub(r'^(?:Unit|Module|Section|Chapter|Lec)\s+(?:\d+|[IVXLCDM]+)[:\s\-\.]*', '', clean_title, flags=re.IGNORECASE)
        clean_title = clean_title.rstrip(':').strip()
        
        # If the unit line has a colon (like "Unit 1: Intro: Topics..."), split it
        if ':' in clean_title:
            parts = clean_title.split(':', 1)
            clean_title = parts[0].strip()
            extra_text = parts[1].strip()
            if extra_text:
                extra_topics.append(extra_text)
        elif ',' in clean_title and h_type == 'unit':
            # Split at the first comma if it's a unit header without a colon
            parts = clean_title.split(',', 1)
            clean_title = parts[0].strip()
            extra_text = parts[1].strip()
            if extra_text:
                extra_topics.append(extra_text)
                
        # Parse topics from content
        topics = []
        # Bullet points matching
        bullet_matches = re.findall(r'(?:^|\n)\s*[•\-*\u25cf]\s+([^\n]+)', content)
        if len(bullet_matches) >= 2:
            topics = [t.strip() for t in bullet_matches]
        else:
            # split by commas/semicolons
            raw_topics = [t.strip() for t in re.split(r'[,;]', content)]
            for rt in raw_topics:
                rt_clean_spaces = re.sub(r'\s+', ' ', rt).strip()
                if len(rt_clean_spaces) > 120 and '.' in rt_clean_spaces:
                    sentences = re.split(r'\.\s+', rt_clean_spaces)
                    for s in sentences:
                        s_clean = s.strip().rstrip('.')
                        if len(s_clean) > 2:
                            topics.append(s_clean)
                else:
                    rt_clean = rt_clean_spaces.rstrip('.')
                    if len(rt_clean) > 2:
                        topics.append(rt_clean)
                        
        # Combine extra topics from the title line with block topics
        all_raw_topics = extra_topics + topics
        cleaned_topics = []
        for t in all_raw_topics:
            t_clean = re.sub(r'^[•\-*\u25cf]\s*', '', t)
            t_clean = re.sub(r'^\d+\.\s*', '', t_clean)
            t_clean = re.sub(r'\s+', ' ', t_clean)
            # Remove leading conjunctions
            t_clean = re.sub(r'^(?:and|or|&)\s+', '', t_clean, flags=re.IGNORECASE)
            t_clean = t_clean.strip()
            if len(t_clean) > 2 and t_clean.lower() not in ["none", "na", "n/a", "nil"]:
                # Ensure no outcome-related text gets parsed
                if any(x in t_clean.lower() for x in ["course learning outcomes", "the students will be able to"]):
                    continue
                cleaned_topics.append(t_clean)
                
        if cleaned_topics:
            units.append({
                'id': f'{subject_id}-u{unit_count}',
                'name': f"Unit {unit_count}: {clean_title}",
                'topics': cleaned_topics
            })
            unit_count += 1
            
    # Fallback to paragraph splitting if no units parsed
    if not units:
        blocks = [b.strip() for b in re.split(r'\n\s*\n', syllabus_slice) if b.strip()]
        for idx, block in enumerate(blocks):
            lines_in_block = [l.strip() for l in block.split('\n') if l.strip()]
            if not lines_in_block:
                continue
            first_line = lines_in_block[0]
            if len(first_line) < 60 and (first_line.endswith(':') or first_line.endswith('.') or re.match(r'^[A-Z]', first_line)):
                unit_title = first_line.rstrip(':').strip()
                unit_title = re.sub(r'^(?:\d+|[IVXLCDM]+)\.\s*', '', unit_title)
                content = " ".join(lines_in_block[1:])
            else:
                unit_title = f"Unit {idx+1}"
                content = " ".join(lines_in_block)
                
            content = re.sub(r'\s+', ' ', content)
            raw_topics = [t.strip() for t in re.split(r'[,;]', content)]
            topics = []
            for rt in raw_topics:
                rt_clean = rt.rstrip('.')
                if len(rt_clean) > 2:
                    topics.append(rt_clean)
                    
            cleaned_topics = []
            for t in topics:
                t_clean = re.sub(r'^[•\-*\u25cf]\s*', '', t)
                t_clean = re.sub(r'^\d+\.\s*', '', t_clean)
                t_clean = re.sub(r'\s+', ' ', t_clean)
                t_clean = re.sub(r'^(?:and|or|&)\s+', '', t_clean, flags=re.IGNORECASE)
                t_clean = t_clean.strip()
                if len(t_clean) > 2 and t_clean.lower() not in ["none", "na", "n/a", "nil"]:
                    cleaned_topics.append(t_clean)
                    
            if cleaned_topics:
                units.append({
                    'id': f'{subject_id}-u{unit_count}',
                    'name': f"Unit {unit_count}: {unit_title}",
                    'topics': cleaned_topics
                })
                unit_count += 1
                
    results[subject_id] = units

# Write debug results
with open(output_debug, 'w', encoding='utf-8') as f:
    for sid, units in results.items():
        f.write(f"=== {sid} ({len(units)} units) ===\n")
        for u in units:
            f.write(f"  {u['name']}\n")
            for t in u['topics']:
                f.write(f"    - {t}\n")
        f.write("\n")
        
print("Debug output written to:", output_debug)
