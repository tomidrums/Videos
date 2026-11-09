import React from 'react';
import {AbsoluteFill, Audio, interpolate, Series, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from './components/Background';
import {Watermark} from './components/Watermark';
import {Formula} from './scenes/Formula';
import {Hook} from './scenes/Hook';
import {Outro} from './scenes/Outro';
import {Tips} from './scenes/Tips';
import {VARIANT_FRAMES, VariantScene} from './scenes/VariantScene';
import {variants} from './theme';

const HOOK = 90;
const FORMULA = 165;
const TIPS = 150;
const OUTRO = 120;

export const TOTAL_FRAMES = HOOK + FORMULA + variants.length * VARIANT_FRAMES + TIPS + OUTRO;

/** Fundido corto al entrar/salir de cada escena. */
const Fade: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = interpolate(frame, [0, 6, durationInFrames - 6, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

export const RitmoDisco: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Series>
      <Series.Sequence durationInFrames={HOOK}>
        <Audio src={staticFile('audio/v2.wav')} volume={0.45} />
        <Fade>
          <Hook />
        </Fade>
      </Series.Sequence>
      <Series.Sequence durationInFrames={FORMULA}>
        <Audio src={staticFile('audio/v1.wav')} volume={0.3} loop />
        <Fade>
          <Formula />
        </Fade>
      </Series.Sequence>
      {variants.map((v) => (
        <Series.Sequence key={v.id} durationInFrames={VARIANT_FRAMES}>
          <Fade>
            <VariantScene variant={v} />
          </Fade>
        </Series.Sequence>
      ))}
      <Series.Sequence durationInFrames={TIPS}>
        <Audio src={staticFile('audio/v3.wav')} volume={0.3} loop />
        <Fade>
          <Tips />
        </Fade>
      </Series.Sequence>
      <Series.Sequence durationInFrames={OUTRO}>
        <Audio src={staticFile('audio/v4.wav')} volume={0.4} loop />
        <Fade>
          <Outro />
        </Fade>
      </Series.Sequence>
    </Series>
    <Watermark />
  </AbsoluteFill>
);
