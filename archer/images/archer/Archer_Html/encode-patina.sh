#!/usr/bin/env bash
# Run HERE — same folder as your 300 PNGs + index.html. No copying files around.
# Output: patina_loop.mp4 (sits next to the frames)
#
#   cd archer/images/archer/Archer_Html
#   chmod +x encode-patina.sh && ./encode-patina.sh
#
# Requires: ffmpeg   (brew install ffmpeg)
#
# Expects: patina_test.png0001.png … patina_test.png0300.png

set -euo pipefail
cd "$(dirname "$0")"

OUT="patina_loop.mp4"
FR=12
CROP="crop=iw:ih-100:0:0"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Install ffmpeg: brew install ffmpeg"
  exit 1
fi

if [[ ! -f "patina_test.png0001.png" ]]; then
  echo "No frames found. Put patina_test.png0001.png … patina_test.png0300.png in this folder:"
  echo "  $(pwd)"
  exit 1
fi

echo "Encoding ${OUT} in $(pwd) …"
ffmpeg -y \
  -framerate "${FR}" \
  -start_number 1 \
  -i "patina_test.png%04d.png" \
  -vframes 300 \
  -vf "${CROP},format=yuv420p" \
  -c:v libx264 \
  -crf 20 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "${OUT}"

echo "Done: $(pwd)/${OUT}"
