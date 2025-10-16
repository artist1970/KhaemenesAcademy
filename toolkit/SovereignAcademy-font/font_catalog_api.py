#!/usr/bin/env python3
"""
Font Catalog API — Sovereign Font Bank
--------------------------------------
A FastAPI service that exposes font metadata and files from the Sovereign Font Bank.

Endpoints:
  GET /fonts               → list all fonts
  GET /fonts/{name}        → get details of a specific font
  GET /search?q=term       → search fonts by name
  GET /download/{name}/{file} → download a specific font file
"""

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json, os
from typing import List

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.path.join(BASE_DIR, "fonts")
INDEX_FILE = os.path.join(BASE_DIR, "index.json")

app = FastAPI(
    title="Sovereign Font Catalog API",
    description="Sovereign Font Bank — autonomous typographic archive for Khaemenes Academy and the PLERA network.",
    version="1.0.0"
)

# Allow cross-origin use (for integration with other PLERA portals)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can later restrict this to your domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_index():
    """Load the index.json data."""
    if not os.path.exists(INDEX_FILE):
        raise HTTPException(status_code=404, detail="Font index not found.")
    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

@app.get("/", tags=["Root"])
def root():
    return {"message": "Welcome to the Sovereign Font Catalog API.", "endpoints": ["/fonts", "/search?q=", "/download/{name}/{file}"]}

@app.get("/fonts", tags=["Fonts"])
def list_fonts():
    """List all available fonts."""
    data = load_index()
    return data.get("fonts", [])

@app.get("/fonts/{name}", tags=["Fonts"])
def get_font(name: str):
    """Get details for a specific font."""
    data = load_index()
    for f in data.get("fonts", []):
        if f["name"].lower() == name.lower():
            return f
    raise HTTPException(status_code=404, detail=f"Font '{name}' not found.")

@app.get("/search", tags=["Search"])
def search_fonts(q: str):
    """Search fonts by name (case-insensitive)."""
    data = load_index()
    results = [f for f in data.get("fonts", []) if q.lower() in f["name"].lower()]
    if not results:
        return JSONResponse(status_code=404, content={"message": f"No results for '{q}'"})
    return {"results": results}

@app.get("/download/{name}/{file}", tags=["Download"])
def download_font(name: str, file: str):
    """Download a specific font file by name."""
    font_path = os.path.join(FONTS_DIR, name, file)
    if not os.path.exists(font_path):
        raise HTTPException(status_code=404, detail="Font file not found.")
    return FileResponse(font_path, filename=file, media_type="application/octet-stream")
