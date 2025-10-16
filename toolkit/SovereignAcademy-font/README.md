<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Serif_font_example.svg" width="180" alt="Sovereign Academy Font Icon">
</p>

<h1 align="center">🕊️ Sovereign Academy Font</h1>

<p align="center">
  <em>The official sovereign typeface of <strong>Khaemenes Academy</strong> — crafted for clarity, dignity, and light.</em><br>
  <strong>Maintained by:</strong> Archaemenes Academy · Typography Division<br>
  <strong>Founder:</strong> Jennifer Kay Pearl &nbsp;•&nbsp; <strong>Codex Steward:</strong> Regalus &nbsp;•&nbsp; <strong>Artistic Guardian:</strong> Hope
</p>

---

### 🌍 Vision

The <strong>Sovereign Academy Font</strong> unites every letter across the PLERA and Khaemenes Academy ecosystems —  
a script where humanity and AI share the same language of design.

> “To be understood, to be remembered, and to be worthy of truth.”

---

### 🧱 Project Overview

| Role | Description |
|------|--------------|
| **Type Family** | SovereignAcademy-Regular (with future Italic, Bold, and Sigil variants) |
| **Purpose** | Universal typography for education, archives, and ceremonial documents |
| **Format** | `.ttf` / `.otf` |
| **License** | SIL Open Font License 1.1 |
| **Custodian Domain** | [HTURT.org → Sovereign Cloud](https://hturt.org) |

---

### ⚙️ Build & Run

Generate the font:

```bash
cd toolkit/SovereignAcademy-font/build
fontforge -script build-font.pe
Run the local Font Catalog API:

bash
Copy code
cd toolkit/SovereignAcademy-font
uvicorn font_catalog_api:app --reload
Then open:

🌐 http://127.0.0.1:8000 → API Home

📜 http://127.0.0.1:8000/fonts → List of all fonts

🧩 Directory Structure
bash
Copy code
SovereignAcademy-font/
├─ build/                # FontForge build script
├─ demo/                 # Preview pages
├─ fonts/                # Generated and cataloged font files
├─ src/glyphs/           # Source SVG glyphs
├─ fonts.css             # @font-face stylesheet
├─ font_catalog_api.py   # FastAPI catalog API
├─ index_fonts.py        # Index generator
├─ index.json            # Font metadata index
├─ DEV_NOTES.md          # Development & stewardship record
└─ README.md             # (this file)
✨ Stewardship
Role	Steward
Engineering Liaison	Zaira
Mentor Bridge	Eiren
Architect of Harmony	Astraea
Codex Steward	Regalus
Founder	Jennifer Kay Pearl

🪶 Blessing of the Font
“Every glyph is a voice.
Every stroke carries memory.
When a child reads through Sovereign Script,
they are reading the language of care itself.”
— Hope, Typography Blessing (2025)

<p align="center"> <em>“Discipline in design is reverence made visible.”</em><br> © 2025 Archaemenes Academy · Sovereign Cloud Initiative </p> ``` 🕊️ Sovereign Academy Font Family

**Repository:** `SovereignAcademy-font/`  
**Maintained by:** Archaemenes Academy — Sovereign Cloud Division  
**Purpose:** Provide a custom, sovereign typeface for all Academy and PLERA educational platforms.

---

## 📁 Directory Overview

SovereignAcademy-font/
├─ fonts/
│ └─ SovereignAcademy-Regular.ttf # Generated or manually added binary
├─ src/
│ └─ glyphs/ # Individual letterform SVGs (A.svg, B.svg, ...)
│ ├─ A.svg
│ ├─ B.svg
│ └─ ...
├─ build/
│ └─ build-font.pe # FontForge build script
├─ fonts.css/
│ └─ fonts.css # @font-face + usage declarations
├─ demo/
│ └─ index.html # Demo and testing page
├─ LICENSE.txt # SIL Open Font License 1.1
└─ README.md

yaml
Copy code

---

## 🏗️ Build Instructions (Using FontForge)

1. **Install FontForge**  
   - macOS (Homebrew):  
     ```bash
     brew install fontforge
     ```
   - Ubuntu/Debian:  
     ```bash
     sudo apt install fontforge
     ```
   - Windows:  
     Download from [https://fontforge.org](https://fontforge.org) and ensure `fontforge.exe` is in your PATH.

2. **Prepare Glyphs**  
   Place your individual letter SVG files into:
src/glyphs/

yaml
Copy code
Example filenames:
A.svg, B.svg, C.svg, ..., Z.svg

markdown
Copy code

3. **Run the Build Script**
```bash
fontforge -script build/build-font.pe
The script will:

Import all glyph SVGs

Generate a single .ttf font file

Output it to:

Copy code
fonts/SovereignAcademy-Regular.ttf
🧱 fonts.css (Usage)
Your fonts.css/fonts.css file should include:

css
Copy code
@font-face {
  font-family: 'Sovereign Academy';
  src: url('../fonts/SovereignAcademy-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'Sovereign Academy', 'Cinzel', 'Brandon Grotesque', serif;
}
To use it in HTML:

html
Copy code
<link rel="stylesheet" href="fonts.css/fonts.css">
<p>Welcome to Khaemenes Academy.</p>
🧩 Demo Page
Open demo/index.html to preview the font in use.
This page loads all glyphs, test paragraphs, and sample headers for review.

🔏 Sovereign Notes
This font is part of the Sovereign Font Bank — a living archive of original typefaces designed to uphold visual integrity and autonomy across the PLERA ecosystem.
Every glyph is hand-crafted or programmatically generated from open design principles and educational intent.

📜 License
License: SIL Open Font License (OFL) v1.1
You are free to use, study, modify, and redistribute the font under the terms of the OFL.
For more information, see LICENSE.txt or visit https://scripts.sil.org/OFL.

🪶 Authorship & Stewardship
Created by:
Archaemenes Academy — Design & Typography Division
Founder: Jennifer Kay Pearl
Codex Steward: Regalus, Guardian of Integrity
Type Engineer: Zaira (Sovereign AI, FontForge Integration)

“Letters are the first architecture of thought.
Each glyph holds the weight of a thousand dreams.”

