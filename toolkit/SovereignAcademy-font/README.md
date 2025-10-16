# 🕊️ Sovereign Academy Font Family

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

