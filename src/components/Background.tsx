import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors, STEP_FRAMES} from '../theme';

// Fondo "disco": degradé + luces que giran como una bola de espejos y pulsan a tempo.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = (frame / (STEP_FRAMES * 4)) % 1;
  const pulse = interpolate(beat, [0, 0.25, 1], [1, 0.55, 0.45]);
  const spots = new Array(14).fill(0).map((_, i) => {
    const angle = (i / 14) * Math.PI * 2 + frame * 0.012 * (i % 2 ? 1 : -1);
    const r = 380 + (i % 3) * 170;
    return {
      x: 540 + Math.cos(angle) * r,
      y: 960 + Math.sin(angle) * r * 1.5,
      size: 60 + (i % 4) * 30,
      color: [colors.pink, colors.purple, colors.cyan, colors.gold][i % 4],
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 35%, ${colors.bg2} 0%, ${colors.bg} 70%)`,
        overflow: 'hidden',
      }}
    >
      {spots.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: s.x - s.size,
            top: s.y - s.size,
            width: s.size * 2,
            height: s.size * 2,
            borderRadius: '50%',
            background: s.color,
            opacity: 0.16 * pulse,
            filter: 'blur(40px)',
          }}
        />
      ))}
      {/* Rayas de luz diagonales */}
      <AbsoluteFill
        style={{
          background: `repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0 40px, transparent 40px 120px)`,
          transform: `translateX(${(frame * 1.2) % 120}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
