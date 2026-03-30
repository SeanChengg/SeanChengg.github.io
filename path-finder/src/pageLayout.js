/**
 * Path Finder vertical layout — unified “block → next heading” rhythm:
 * All transitions use the same rule as Line Detection → Motor PID:
 *   nextSectionTop = prevSectionTop + lastContentBottom + GAP_AFTER_BLOCK_TO_HEADING - SECTION_HEADING_TOP
 * so the visible gap from the end of the previous block to the next section title is GAP_AFTER_BLOCK_TO_HEADING (88px).
 *
 * Gallery → Line Detection keeps a slightly larger Host-style gap (GAP_AFTER_GALLERY_TO_HEADING).
 */

export const SECTION_GAP = 80;

/** Gallery metrics (single source; Gallery.jsx imports these) */
export const PF_GALLERY_SCALE = 0.88;
export const PF_GALLERY_BASE_W = 1289;
export const PF_GALLERY_BASE_H = 1100;
export const PF_GALLERY_TOP_IN_HARDWARE = 995;

const pfSx = (n) => Math.round(n * PF_GALLERY_SCALE);
export const PF_GALLERY_W = pfSx(PF_GALLERY_BASE_W);
export const PF_GALLERY_H = pfSx(PF_GALLERY_BASE_H);
export const PF_GALLERY_LEFT = Math.round(460 + PF_GALLERY_BASE_W / 2 - PF_GALLERY_W / 2);

/** Y offset from Hardware section top → bottom of grey gallery panel */
export const HARDWARE_GALLERY_BOTTOM = PF_GALLERY_TOP_IN_HARDWARE + PF_GALLERY_H;

/** Section heading row (icon ~103, title at 124 — matches PF section components) */
export const SECTION_HEADING_TOP = 124;

/** Slightly larger gap after Hardware gallery → Line Detection heading (Host-style) */
export const GAP_AFTER_GALLERY_TO_HEADING = 115;

/**
 * Standard gap from the bottom of a content block to the next section title
 * (same visual rhythm as Line Detection pipeline → Motor Control & PID).
 */
export const GAP_AFTER_BLOCK_TO_HEADING = 88;

/** Hero block ends ~914px */
export const SYSTEM_ARCHITECTURE_TOP = 750;

/**
 * Bottom of SystemArchitecture.jsx `.ns` diagram: top 510 + height 640 — keep in sync with that file.
 */
export const SYSTEM_ARCHITECTURE_DIAGRAM_BOTTOM = 1150;

/** Section box height (must be ≥ SYSTEM_ARCHITECTURE_DIAGRAM_BOTTOM + a little pad) */
export const SYSTEM_ARCHITECTURE_HEIGHT = 1200;

/** Hardware starts like Line→Motor: diagram bottom + standard gap − heading offset (overlaps Sys Arch box) */
export const HARDWARE_TOP =
  SYSTEM_ARCHITECTURE_TOP +
  SYSTEM_ARCHITECTURE_DIAGRAM_BOTTOM +
  GAP_AFTER_BLOCK_TO_HEADING -
  SECTION_HEADING_TOP;

/** Box height just past gallery (Line Detection overlaps upward) */
export const HARDWARE_HEIGHT = HARDWARE_GALLERY_BOTTOM + 52;

export const LINE_DETECTION_TOP =
  HARDWARE_TOP + HARDWARE_GALLERY_BOTTOM + GAP_AFTER_GALLERY_TO_HEADING - SECTION_HEADING_TOP;

/** LineDetection.jsx pipeline at top 610; row ≈95px */
export const LINE_DETECTION_PIPELINE_BOTTOM = 705;
export const LINE_DETECTION_HEIGHT = LINE_DETECTION_PIPELINE_BOTTOM + 56;

export const MOTOR_PID_TOP =
  LINE_DETECTION_TOP +
  LINE_DETECTION_PIPELINE_BOTTOM +
  GAP_AFTER_BLOCK_TO_HEADING -
  SECTION_HEADING_TOP;

/**
 * MotorControlPID.jsx: code + PID panels at top 1180 (~320px tall) — keep in sync if layout changes.
 */
export const MOTOR_PID_CONTENT_BOTTOM = 1500;

export const MOTOR_PID_HEIGHT = MOTOR_PID_CONTENT_BOTTOM + 64;

export const INTEGRATION_TOP =
  MOTOR_PID_TOP + MOTOR_PID_CONTENT_BOTTOM + GAP_AFTER_BLOCK_TO_HEADING - SECTION_HEADING_TOP;

export const INTEGRATION_HEIGHT = 1220;

export const FOOTER_TOP = INTEGRATION_TOP + INTEGRATION_HEIGHT + SECTION_GAP;

export const PAGE_SCROLL_HEIGHT = FOOTER_TOP + 400;
