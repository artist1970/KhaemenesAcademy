README.md (Starter)

# Sovereign Academy — Font Source


This repository contains source files and build scripts for the *Sovereign Academy* font family. The binary `SovereignAcademy-Regular.ttf` should live in `fonts/` after a successful build or when manually added.


## Build (using FontForge)
1. Install FontForge and ensure `fontforge` command is on your PATH.
2. Put SVG glyph files into `src/glyphs/` named `A.svg`, `B.svg`, ..., `Z.svg`.
3. Run: `fontforge -script build/build-font.pe`.
4. The generated TTF will land in `fonts/SovereignAcademy-Regular.ttf`.


**Note:** The FontForge script included is a simple starter meant for placeholder glyph imports. For a production font, refine the glyph outlines, metrics, kerning, OpenType tables, and hinting.


## License
The font is distributed under the SIL Open Font License (OFL) 1.1. See LICENSE.txt for details.
