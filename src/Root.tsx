import React from 'react';
import {Composition} from 'remotion';
import {RitmoDisco, TOTAL_FRAMES} from './RitmoDisco';
import {FPS} from './theme';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="RitmoDisco"
    component={RitmoDisco}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
