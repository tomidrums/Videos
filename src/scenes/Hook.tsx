import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Pop} from '../components/Pop';
import {bodyFont, colors, STEP_FRAMES, titleFont} from '../theme';

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = (frame / (STEP_FRAMES * 4)) % 1;
  const thump = interpolate(beat, [0, 0.15, 1], [1.06, 1, 1]);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: 70, textAlign: 'center'}}>
      <Pop delay={0}>
        <div style={{fontFamily: bodyFont, fontWeight: 900, fontSize: 56, color: colors.white}}>
          4 formas de tocar el
        </div>
      </Pop>
      <Pop delay={6}>
        <div
          style={{
            fontFamily: titleFont,
            fontSize: 250,
            lineHeight: 1,
            margin: '20px 0',
            transform: `scale(${thump}) rotate(-4deg)`,
            background: `linear-gradient(90deg, ${colors.pink}, ${colors.gold}, ${colors.cyan})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            filter: `drop-shadow(0 0 30px ${colors.pink})`,
          }}
        >
          RITMO
          <br />
          DISCO
        </div>
      </Pop>
      <Pop delay={18}>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 48,
            color: colors.bg,
            background: colors.gold,
            padding: '14px 32px',
            borderRadius: 18,
          }}
        >
          (la #3 casi nadie la enseña 👀)
        </div>
      </Pop>
    </AbsoluteFill>
  );
};
