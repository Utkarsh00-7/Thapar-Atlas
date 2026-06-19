import re
import json

path = r'C:\Users\LENOVO\.gemini\antigravity\brain\eab1127c-07d6-4646-975a-b87ba9bf717f\.system_generated\steps\3329\content.md'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

print('Length of content:', len(text))
# Let's search for next data
match = re.search(r'<script\s+id="__NEXT_DATA__"\s+type="application/json">(.*?)</script>', text)
if match:
    print("Found __NEXT_DATA__!")
    try:
        data = json.loads(match.group(1))
        with open('scratch/next_data.json', 'w') as out:
            json.dump(data, out, indent=2)
        print("Wrote next_data.json keys:", list(data.keys()))
    except Exception as e:
        print("Failed to parse:", e)
else:
    print("No __NEXT_DATA__ script found.")
    # Search for all script tags
    script_contents = re.findall(r'<script[^>]*>(.*?)</script>', text, re.DOTALL)
    print(f"Found {len(script_contents)} script tags in total.")
