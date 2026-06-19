import urllib.request
import re

url_base = 'https://studentsocieties.thapar.edu'
chunks = [
    '/_next/static/chunks/fd2e861932ecbd25.js',
    '/_next/static/chunks/d2be314c3ece3fbe.js',
    '/_next/static/chunks/6e0dee5b6681763c.js',
    '/_next/static/chunks/ff1a16fafef87110.js'
]

for chunk in chunks:
    url = url_base + chunk
    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response:
            content = response.read().decode('utf-8')
        print(f"Success! Length: {len(content)}")
        
        # Search for api urls or fetch endpoints
        apis = re.findall(r'[\'"](/api/[^\'"]+)[\'"]', content)
        if apis:
            print(f"Found API URLs in {chunk}:", apis[:10])
            
        # Search for fetch calls or endpoints
        endpoints = re.findall(r'(https?://[^\s\'"]+)', content)
        urls = [u for u in endpoints if 'thapar' in u or 'api' in u]
        if urls:
            print(f"Found external URLs in {chunk}:", urls[:10])
            
        # Look for text like 'loading' or fields
        if 'loading' in content.lower():
            print(f"Found 'loading' keyword in {chunk}")
            
    except Exception as e:
        print(f"Failed to fetch {chunk}: {e}")
