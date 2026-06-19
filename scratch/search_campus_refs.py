import os

target = 'campus-grid'
src_dir = 'src'

found = False
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.js', '.jsx', '.css')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if target in content and not file.endswith('Campus.css'):
                print(f"Found '{target}' in {path}")
                found = True

if not found:
    print("No references found outside Campus.css!")
