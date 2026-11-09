import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Pop} from '../components/Pop';
import {bodyFont, colors, HANDLE, titleFont} from '../theme';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const wiggle = Math.sin(frame / 4) * 3;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 60}}>
      <Pop>
        <div style={{fontFamily: bodyFont, fontWeight: 900, fontSize: 60, color: colors.white}}>¿Cuál te gustó más?</div>
      </Pop>
      <Pop delay={8}>
        <div style={{fontFamily: titleFont, fontSize: 140, color: colors.gold, margin: '10px 0', lineHeight: 1.1}}>
          1 · 2 · 3 · 4
        </div>
      </Pop>
      <Pop delay={14}>
        <div style={{fontFamily: bodyFont, fontWeight: 700, fontSize: 46, color: colors.white, marginBottom: 70}}>
          Comentalo y decime qué ritmo explico ahora 👇
        </div>
      </Pop>
      <Pop delay={24}>
        <div
          style={{
            fontFamily: titleFont,
            fontSize: 96,
            color: colors.white,
            background: `linear-gradient(90deg, ${colors.pink}, ${colors.purple})`,
            padding: '20px 50px',
            borderRadius: 30,
            transform: `rotate(${wiggle}deg) scale(${interpolate(Math.sin(frame / 6), [-1, 1], [0.97, 1.03])})`,
            boxShadow: `0 0 50px ${colors.pink}`,
          }}
        >
          SEGUIME {HANDLE}
        </div>
      </Pop>
    </AbsoluteFill>
  );
};
