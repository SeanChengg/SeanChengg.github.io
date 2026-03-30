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

/** Section heading row — title text baseline box starts at 124px */
export const SECTION_HEADING_TOP = 124;

/** Bold Arial section titles — matches components’ `lineHeight: '28.8px'` */
export const SECTION_TITLE_LINE_HEIGHT = 28.8;

/** Wheel asset size (must match SectionHeading + Hero) */
export const SECTION_WHEEL_SIZE = 128;

/** Horizontal gap between wheel and title (icon right edge → title) */
export const SECTION_ICON_TITLE_GAP = 13;

/** Nudge the whole icon + title row right (keeps gap; use in Hero too) */
export const HEADING_ROW_SHIFT_RIGHT = 20;

/** Y of the horizontal midline through the one-line section title */
export const SECTION_TITLE_CENTER_Y = SECTION_HEADING_TOP + SECTION_TITLE_LINE_HEIGHT / 2;

/** Flex row `top` so icon + title align to that midline (same as old title `top: 124` band) */
export const SECTION_HEADING_ROW_TOP = SECTION_TITLE_CENTER_Y - SECTION_WHEEL_SIZE / 2;

/** Flex row `left` — base column aligned to old 523 title + 13px gap, then shifted right */
export const SECTION_ICON_LEFT =
  523 - SECTION_ICON_TITLE_GAP - SECTION_WHEEL_SIZE + HEADING_ROW_SHIFT_RIGHT;

/**
 * Hero root vs section root `left` on the scroll canvas (must match Hero / section components).
 * Hero wheel + main column use this so Wheel.png lines up with SectionHeading on screen.
 */
export const HERO_PAGE_LEFT = 48.75;
export const SECTION_PAGE_LEFT = 0.75;

/** Hero: inner `left` for wheel row + big title block — same screen-x as SECTION_ICON_LEFT */
export const HERO_MAIN_COLUMN_LEFT =
  SECTION_ICON_LEFT + SECTION_PAGE_LEFT - HERO_PAGE_LEFT;

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
