import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

/** Entra con un "pop" elástico a partir de `delay` frames. */
export const Pop: React.FC<{delay?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  delay = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 160}});
  return (
    <div style={{...style, transform: `scale(${s}) translateY(${(1 - s) * 40}px)`, opacity: Math.min(1, s * 1.5)}}>
      {children}
    </div>
  );
};
