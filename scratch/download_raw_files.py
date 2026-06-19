import requests
import json

data_url = "https://raw.githubusercontent.com/utkarsh-1905/time-table/main/data.json"
subjects_url = "https://raw.githubusercontent.com/utkarsh-1905/time-table/main/subjects.json"

print("Downloading data.json...")
r_data = requests.get(data_url, timeout=15)
if r_data.status_code == 200:
    # Verify it is valid JSON
    try:
        parsed_data = r_data.json()
        with open("src/utils/timetableData.json", "w", encoding="utf-8") as f:
            json.dump(parsed_data, f, indent=2, ensure_ascii=False)
        print("[OK] Successfully saved src/utils/timetableData.json")
    except Exception as e:
        print("[FAIL] Failed to parse downloaded data.json:", e)
else:
    print(f"[FAIL] Failed to download data.json: Status {r_data.status_code}")

print("\nDownloading subjects.json...")
r_sub = requests.get(subjects_url, timeout=15)
if r_sub.status_code == 200:
    try:
        parsed_sub = r_sub.json()
        with open("src/utils/timetableSubjects.json", "w", encoding="utf-8") as f:
            json.dump(parsed_sub, f, indent=2, ensure_ascii=False)
        print("[OK] Successfully saved src/utils/timetableSubjects.json")
    except Exception as e:
        print("[FAIL] Failed to parse downloaded subjects.json:", e)
else:
    print(f"[FAIL] Failed to download subjects.json: Status {r_sub.status_code}")
