import { useMemo } from 'react';

const COLOR_PRESETS = {
  teal: {
    gradient: 'linear-gradient(135deg, rgba(29, 158, 117, 0.35), rgba(15, 110, 86, 0.3))',
    glow: 'rgba(29, 158, 117, 0.4)',
    glowStrong: 'rgba(93, 202, 165, 0.25)',
  },
  purple: {
    gradient: 'linear-gradient(135deg, rgba(127, 119, 221, 0.35), rgba(83, 74, 183, 0.3))',
    glow: 'rgba(127, 119, 221, 0.4)',
    glowStrong: 'rgba(175, 169, 236, 0.25)',
  },
  amber: {
    gradient: 'linear-gradient(135deg, rgba(186, 117, 23, 0.35), rgba(133, 79, 11, 0.3))',
    glow: 'rgba(186, 117, 23, 0.4)',
    glowStrong: 'rgba(239, 159, 39, 0.25)',
  },
  gray: {
    gradient: 'linear-gradient(135deg, rgba(136, 135, 128, 0.25), rgba(95, 94, 90, 0.2))',
    glow: 'rgba(136, 135, 128, 0.3)',
    glowStrong: 'rgba(180, 178, 169, 0.2)',
  },
};

export default function PixelBlocksBg({ color = 'teal', blockCount = 8, small }) {
  const preset = COLOR_PRESETS[color] || COLOR_PRESETS.teal;
  const radius = small ? 8 : 12;

  const blocks = useMemo(() => {
    const generated = [];
    for (let i = 0; i < blockCount; i++) {
      generated.push({
        id: i,
        x: Math.random() * 85,
        y: Math.random() * 85,
        size: Math.floor(Math.random() * 3) + 2,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
      });
    }
    return generated;
  }, [blockCount]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: radius,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {blocks.map((block) => (
        <div
          key={block.id}
          style={{
            position: 'absolute',
            left: `${block.x}%`,
            top: `${block.y}%`,
            width: block.size * 16,
            height: block.size * 16,
            background: preset.gradient,
            borderRadius: 2,
            animation: `pfPixelPulse ${block.duration}s ease-in-out ${block.delay}s infinite`,
            boxShadow: `
              0 0 0 1px ${preset.glow},
              0 0 12px ${preset.glow},
              0 0 24px ${preset.glowStrong}
            `,
          }}
        />
      ))}
    </div>
  );
}
