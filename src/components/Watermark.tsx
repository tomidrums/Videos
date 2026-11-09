import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {bodyFont, colors, HANDLE} from '../theme';

export const Watermark: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill>
      {/* Barra de progreso (retención) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 10,
          width: `${(frame / durationInFrames) * 100}%`,
          background: `linear-gradient(90deg, ${colors.pink}, ${colors.gold})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 150,
          width: '100%',
          textAlign: 'center',
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 34,
          letterSpacing: 2,
          color: colors.muted,
        }}
      >
        🥁 {HANDLE}
      </div>
    </AbsoluteFill>
  );
};
