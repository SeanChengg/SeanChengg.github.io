import usePageScale from '../hooks/usePageScale';
import SvgFilters from '../components/SvgFilters';
import BackButton from '../components/BackButton';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import SystemArchitecture from '../components/SystemArchitecture';
import Hardware from '../components/Hardware';
import LineDetection from '../components/LineDetection';
import MotorControlPID from '../components/MotorControlPID';
import Integration from '../components/Integration';
import SimpleFooter from '../components/SimpleFooter';
import { ARTBOARD_WIDTH, FOOTER_TOP, PAGE_SCROLL_HEIGHT } from '../pageLayout';

export default function Home() {
  usePageScale();

  return (
    <>
      <BackButton />
      <Sidebar />
      <SvgFilters />

      <div className="page-scale-canvas">
        <div className="page-scale-wrapper" style={{ width: ARTBOARD_WIDTH, position: 'relative', background: 'transparent' }}>
          <div style={{ width: ARTBOARD_WIDTH, height: PAGE_SCROLL_HEIGHT, left: 0, top: 0.37, position: 'absolute', background: 'transparent' }}>
            <div style={{ width: ARTBOARD_WIDTH, height: PAGE_SCROLL_HEIGHT, left: 0, top: 137, position: 'absolute', overflow: 'visible' }}>
              <Hero />
              <SystemArchitecture />
              <Hardware />
              <LineDetection />
              <MotorControlPID />
              <Integration />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: FOOTER_TOP,
                  bottom: 0,
                  width: ARTBOARD_WIDTH,
                  background: '#212121',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                }}
              >
                <SimpleFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
