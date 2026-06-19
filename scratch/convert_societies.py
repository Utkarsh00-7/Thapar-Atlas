import json
import re

with open('scratch/societies_raw.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

orgs = raw_data.get('data', [])
cleaned_orgs = []

for org in orgs:
    # Clean title
    title = org.get('title', '').strip()
    # Replace unicode quotes and spaces
    title = title.replace('\u2019', "'").replace('\u2018', "'").replace('\u201d', '"').replace('\u201c', '"')
    title = re.sub(r'\s+', ' ', title)
    
    # Clean description
    desc = org.get('description', '').strip()
    desc = desc.replace('\u2019', "'").replace('\u2018', "'").replace('\u201d', '"').replace('\u201c', '"')
    desc = re.sub(r'\s+', ' ', desc)
    
    # Clean type and subtype
    org_type = org.get('type', 'society').strip().lower()
    subtype = org.get('subtype', '').strip().lower()
    # Normalize subtypes
    if 'technical' in subtype or 'academic' in subtype:
        category = 'Technical'
    elif 'cultural' in subtype or 'visual' in subtype:
        category = 'Cultural'
    elif 'debate' in subtype or 'literary' in subtype:
        category = 'Literary'
    elif 'entrepreneur' in subtype:
        category = 'Entrepreneurship'
    elif 'fitness' in subtype or 'sport' in subtype:
        category = 'Sports'
    else:
        category = 'Social' # Fallback for social / general clubs
        
    # Clean leadership
    presidents = []
    vps = []
    
    leadership = org.get('leadership', {})
    if leadership:
        for p in leadership.get('presidents', []):
            presidents.append({
                'name': p.get('name', '').strip(),
                'dept': p.get('dept', '').strip(),
                'email': p.get('email', '').strip(),
                'image': p.get('image', '').strip()
            })
        for vp in leadership.get('vicePresidents', []):
            vps.append({
                'name': vp.get('name', '').strip(),
                'dept': vp.get('dept', '').strip(),
                'email': vp.get('email', '').strip(),
                'image': vp.get('image', '').strip()
            })
            
    cleaned_orgs.append({
        'id': org.get('_id', ''),
        'title': title,
        'description': desc,
        'email': org.get('email', '').strip() if org.get('email') else '',
        'website': org.get('website', '').strip() if org.get('website') else '',
        'image': org.get('image', '').strip() if org.get('image') else '',
        'type': org_type,
        'category': category,
        'presidents': presidents,
        'vicePresidents': vps
    })

# Sort societies alphabetically by title
cleaned_orgs.sort(key=lambda x: x['title'].lower())

# Write as ES Module JS file
js_content = "/* ─── THAPAR student societies dataset ─── */\n\n"
js_content += "export const societiesData = " + json.dumps(cleaned_orgs, indent=2, ensure_ascii=False) + ";\n"

with open('src/utils/societiesData.js', 'w', encoding='utf-8') as out:
    out.write(js_content)

print(f"Successfully processed {len(cleaned_orgs)} organizations into src/utils/societiesData.js!")
