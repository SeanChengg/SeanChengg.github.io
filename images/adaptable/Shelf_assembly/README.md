# Shelf assembly — 200-frame viewer

Folder: **`images/adaptable/Shelf_assembly/`** (next to **`Shelf.mp4`**).

- **`Shelf.html`** — plays **200** frames (`Shelf_Frame1.png` … `Shelf_Frame200.png`), auto-loop + drag to scrub.
- **`extract_shelf_frames.py`** — rebuilds all 200 PNGs from **`../Shelf.mp4`** (max width **960px** to keep files smaller).

## Regenerate frames

```bash
cd images/adaptable/Shelf_assembly
python3 extract_shelf_frames.py
```

Requires: `pip install opencv-python` (or `opencv-python-headless`)

To export **full-resolution** frames, edit `extract_shelf_frames.py` and set `MAX_WIDTH = None` (much larger files).

## GitHub Pages

`/images/adaptable/Shelf_assembly/Shelf.html`
