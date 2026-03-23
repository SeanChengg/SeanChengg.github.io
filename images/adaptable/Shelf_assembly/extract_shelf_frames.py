#!/usr/bin/env python3
"""
Export evenly spaced PNG frames from ../Shelf.mp4 into this folder (for Shelf.html).

Default: 200 frames, max width 960px (keeps repo / GitHub size reasonable).
"""
import os
import sys

try:
    import cv2
except ImportError:
    print("Install OpenCV: pip install opencv-python", file=sys.stderr)
    sys.exit(1)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
VIDEO = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "Shelf.mp4"))
NUM_OUT = 200
# Max width in pixels (set None to keep full resolution — much larger files)
MAX_WIDTH = 960


def main():
    if not os.path.isfile(VIDEO):
        print("Missing video (expected one level up):", VIDEO, file=sys.stderr)
        sys.exit(1)
    print("Using video:", VIDEO)
    cap = cv2.VideoCapture(VIDEO)
    if not cap.isOpened():
        print("Could not open:", VIDEO, file=sys.stderr)
        sys.exit(1)
    n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 1
    if NUM_OUT < 2:
        print("NUM_OUT must be >= 2", file=sys.stderr)
        sys.exit(1)
    if n < 2:
        indices = [0] * NUM_OUT
    else:
        indices = [
            int(round(i * (n - 1) / (NUM_OUT - 1))) for i in range(NUM_OUT)
        ]
    for i, idx in enumerate(indices, start=1):
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ok, frame = cap.read()
        if not ok:
            cap.set(cv2.CAP_PROP_POS_FRAMES, max(0, idx - 1))
            ok, frame = cap.read()
        if not ok:
            print("skip frame", i, file=sys.stderr)
            continue
        if MAX_WIDTH and frame is not None:
            h, w = frame.shape[:2]
            if w > MAX_WIDTH:
                nh = int(round(h * (MAX_WIDTH / w)))
                frame = cv2.resize(frame, (MAX_WIDTH, nh), interpolation=cv2.INTER_AREA)
        out_path = os.path.join(SCRIPT_DIR, f"Shelf_Frame{i}.png")
        cv2.imwrite(out_path, frame)
        if i == 1 or i == NUM_OUT or i % 50 == 0:
            print("wrote", out_path)
    cap.release()
    print("Done:", NUM_OUT, "frames →", SCRIPT_DIR)
    im = cv2.imread(os.path.join(SCRIPT_DIR, "Shelf_Frame1.png"))
    if im is not None:
        fh, fw = im.shape[:2]
        print("If embed height looks off, set adaptable-living.html sizer to width=", fw, "height=", fh)


if __name__ == "__main__":
    main()
