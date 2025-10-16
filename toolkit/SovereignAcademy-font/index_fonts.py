#!/usr/bin/env python3
"""
index_fonts.py
------------------------------------
Sovereign Font Bank Indexer

Scans the /fonts directory for all font families,
reads metadata (name, license, and modification date),
and generates an index.json file for the Sovereign Font Bank.
"""

import os
import json
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.path.join(BASE_DIR, "fonts")
INDEX_FILE = os.path.join(BASE_DIR, "index.json")

def get_license_path(font_folder):
    """Return the path to a LICENSE.txt file if found."""
    for root, _, files in os.walk(font_folder):
        for f in files:
            if f.lower().startswith("license"):
                return os.path.join(root, f)
    return None

def get_font_files(font_folder):
    """Return a list of all font files (.ttf, .otf) in a folder."""
    font_files = []
    for root, _, files in os.walk(font_folder):
        for f in files:
            if f.lower().endswith((".ttf", ".otf", ".woff", ".woff2")):
                font_files.append(os.path.join(root, f))
    return font_files

def build_index():
    """Build the font index and save it to index.json."""
    entries = []
    if not os.path.exists(FONTS_DIR):
        print("⚠️  No 'fonts/' folder found.")
        return

    for family in sorted(os.listdir(FONTS_DIR)):
        family_path = os.path.join(FONTS_DIR, family)
        if not os.path.isdir(family_path):
            continue

        license_path = get_license_path(family_path)
        font_files = get_font_files(family_path)

        if not font_files:
            continue

        entry = {
            "name": family,
            "path": os.path.relpath(family_path, BASE_DIR),
            "license": os.path.basename(license_path) if license_path else "Unknown",
            "files": [os.path.basename(f) for f in font_files],
            "updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }
        entries.append(entry)
        print(f"🪶 Indexed: {family} ({len(font_files)} file{'s' if len(font_files)>1 else ''})")

    # Save JSON
    data = {"generated": datetime.now().isoformat(), "fonts": entries}
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"\n✅ Sovereign Font Bank index generated: {INDEX_FILE}")

if __name__ == "__main__":
    build_index()
🧩 3️⃣ Run It
From your activated Khaemenes Academy Python terminal, run:

bash
Copy code
python index_fonts.py
You’ll see output like:

pgsql
Copy code
🪶 Indexed: SovereignAcademy (1 file)
🪶 Indexed: OpenSans (3 files)

✅ Sovereign Font Bank index generated: index.json
📄 4️⃣ The Result — index.json
Example output file:

json
Copy code
{
  "generated": "2025-10-17T14:30:52",
  "fonts": [
    {
      "name": "SovereignAcademy",
      "path": "fonts/SovereignAcademy",
      "license": "LICENSE.txt",
      "files": ["SovereignAcademy-Regular.ttf"],
      "updated": "2025-10-17 14:30:52"
    },
    {
      "name": "OpenSans",
      "path": "fonts/OpenSans",
      "license": "OFL.txt",
      "files": ["OpenSans-Regular.ttf", "OpenSans-Italic.ttf"],
      "updated": "2025-10-17 14:30:52"
    }
  ]
}
