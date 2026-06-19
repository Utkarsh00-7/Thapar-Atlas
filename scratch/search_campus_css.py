with open("src/pages/Campus/Campus.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if any(k in line.lower() for k in ['.pin', '.marker', '.hotspot', '.popup', '.overlay', '.card']):
        print(f"Line {i+1}: {line.strip()}")
