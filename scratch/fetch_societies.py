import urllib.request
import json

url = 'https://studentsocieties.thapar.edu/api/organizations'
print(f"Fetching from API: {url}...")
try:
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
    
    data = json.loads(content)
    print("Success!")
    print(f"Total organizations loaded: {len(data)}")
    
    # Save the data to a scratch file
    with open('scratch/societies_raw.json', 'w', encoding='utf-8') as out:
        json.dump(data, out, indent=2)
    print("Wrote scratch/societies_raw.json")
    
    # Print first 2 organizations as a sample
    if len(data) > 0:
        print("Sample 1:", json.dumps(data[0], indent=2))
    if len(data) > 1:
        print("Sample 2:", json.dumps(data[1], indent=2))
        
except Exception as e:
    print("Error fetching API:", e)
