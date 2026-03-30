export default function SvgFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.8" specularExponent="30" lightingColor="white" result="spec">
            <fePointLight x="150" y="-60" z="200" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceGraphic" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" result="litShape" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="shadowBlur" />
          <feOffset in="shadowBlur" dx="2" dy="3" result="shadow" />
          <feFlood floodColor="rgba(0,0,0,0.12)" result="shadowColor" />
          <feComposite in="shadowColor" in2="shadow" operator="in" result="dropShadow" />
          <feMerge>
            <feMergeNode in="dropShadow" />
            <feMergeNode in="litShape" />
          </feMerge>
        </filter>
        <filter id="liquid-glass-sm" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.7" specularExponent="25" lightingColor="white" result="spec">
            <fePointLight x="140" y="-40" z="160" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceGraphic" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.5" k4="0" result="litShape" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="shadowBlur" />
          <feOffset in="shadowBlur" dx="1" dy="2" result="shadow" />
          <feFlood floodColor="rgba(0,0,0,0.1)" result="shadowColor" />
          <feComposite in="shadowColor" in2="shadow" operator="in" result="dropShadow" />
          <feMerge>
            <feMergeNode in="dropShadow" />
            <feMergeNode in="litShape" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
