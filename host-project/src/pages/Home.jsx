import usePageScale from '../hooks/usePageScale';
import SvgFilters from '../components/SvgFilters';
import BackButton from '../components/BackButton';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import PanelArchitecture from '../components/PanelArchitecture';
import CoreMechanism from '../components/CoreMechanism';
import TechnicalWorkflow from '../components/TechnicalWorkflow';
import HostStudio from '../components/HostStudio';

export default function Home() {
  usePageScale();

  return (
    <>
      <BackButton />
      <Sidebar />
      <SvgFilters />

      <div className="page-scale-wrapper" style={{ width: 1920, position: 'relative', background: 'transparent' }}>
        <div style={{ width: 1919, height: 9062, left: -0.25, top: 0.37, position: 'absolute', background: 'transparent' }}>
          <div style={{ width: 1947, height: 8925, left: 0, top: 137, position: 'absolute', overflow: 'hidden' }}>
            <Hero />
            <PanelArchitecture />
            <CoreMechanism />
            <TechnicalWorkflow />
            <HostStudio />
          </div>
        </div>
      </div>
    </>
  );
}
