import { withBase } from '../publicUrl';
import {
  SECTION_WHEEL_SIZE,
  SECTION_ICON_LEFT,
  SECTION_HEADING_ROW_TOP,
  SECTION_ICON_TITLE_GAP,
} from '../pageLayout';

const titleStyle = {
  color: '#212121',
  fontSize: 30,
  fontFamily: 'Arial,sans-serif',
  fontWeight: 700,
  lineHeight: '28.8px',
};

export default function SectionHeading({ children }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: SECTION_ICON_LEFT,
        top: SECTION_HEADING_ROW_TOP,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: SECTION_ICON_TITLE_GAP,
      }}
    >
      <img
        src={withBase('images/path_finder/Wheel.png')}
        alt=""
        style={{
          width: SECTION_WHEEL_SIZE,
          height: SECTION_WHEEL_SIZE,
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0,
        }}
      />
      <div style={titleStyle}>{children}</div>
    </div>
  );
}
