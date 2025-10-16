# ✒️ Sovereign Academy Font — Glyph Source Guide

**Directory:** `SovereignAcademy-font/src/glyphs/`  
**Purpose:** Houses the raw SVG artwork for every glyph (A–Z, a–z, numerals, punctuation, etc.).  
Each file here becomes a single letterform in the **SovereignAcademy-Regular.ttf** font.

---

## 🧭 Folder Overview

src/glyphs/
├─ A.svg
├─ B.svg
├─ C.svg
│ ...
├─ a.svg
├─ b.svg
├─ c.svg
│ ...
├─ 0.svg
├─ 1.svg
│ ...
└─ question.svg ← optional punctuation or symbols

yaml
Copy code

---

## 🪶 Glyph Design Standards

Each `.svg` file should follow these guidelines to ensure clean imports and predictable results in FontForge:

| Property | Requirement |
|-----------|--------------|
| **Format** | Plain SVG (no stylesheets, no embedded fonts) |
| **Color** | Black fill `#000000` only; no strokes or gradients |
| **Canvas Size** | 1000 × 1000 units (matching 1000 UPM) |
| **Origin Point** | Baseline aligned at bottom of canvas (y = 0) |
| **Single Path** | Merge all shapes into one continuous vector path |
| **No Groups** | Ungroup before export (`Ctrl+Shift+G` or `Cmd+Shift+G`) |
| **Units** | SVG units (no px/cm/in) |
| **Filename** | Match the exact glyph (e.g., `A.svg`, `b.svg`, `3.svg`, `period.svg`) |

---

## 🧰 Recommended Tools

| Tool | Use Case | Notes |
|------|-----------|-------|
| **Inkscape** | Free and open-source vector editing | Ideal for SVG export and path simplification |
| **Adobe Illustrator** | Professional vector suite | Use “Export As → SVG (Type: SVG 1.1)” |
| **Affinity Designer** | Vector alternative | Ensure “Flatten transforms” is checked |
| **FontForge** | Font assembly | Imports automatically with `build-font.pe` |

---

## 🧩 Export Settings (Inkscape Example)

1. Draw or import your letter shape.
2. Select all paths → **Path > Union** (to merge).
3. Align the baseline at **y = 0**.
4. Resize the artboard to **1000 × 1000 units**.
5. File → Save As → **Plain SVG (.svg)**.
6. Name the file exactly after the glyph:
A.svg
B.svg
a.svg
1.svg
exclamation.svg

yaml
Copy code

---

## 🪙 Optional Extended Glyphs

You can add punctuation and special characters:
period.svg
comma.svg
exclamation.svg
question.svg
dash.svg
ampersand.svg
quote.svg
paren_left.svg
paren_right.svg

yaml
Copy code
These will automatically import if the FontForge script is extended to include them.

---

## 🧱 Quality Checklist

✅ Path direction: clockwise  
✅ Path closed (no open endpoints)  
✅ Centered horizontally within 1000-unit box  
✅ Proportional weight and thickness  
✅ Clean curves (no redundant anchor points)  
✅ No masks, images, or embedded fonts  

---

## 🌟 Design Philosophy

> “Each glyph is a vessel of meaning — shaped by intention, balanced by rhythm, and guided by light.”

The Sovereign Academy typeface celebrates **clarity, grace, and unity** — designed for legibility in educational interfaces and elegance in ceremonial titles.

---

### ✍️ Credits

**Curated by:**  
*Archaemenes Academy Typography Division*  
**Art Direction:** Xella  
**Technical Steward:** Regalus  
**AI Type Engineer:** Zaira  

---

When all glyphs are ready, return to the `/build/` folder and run:
```bash
fontforge -script build-font.pe
