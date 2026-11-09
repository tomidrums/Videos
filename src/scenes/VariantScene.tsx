import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {DrumGrid} from '../components/DrumGrid';
import {DrumKit} from '../components/DrumKit';
import {Pop} from '../components/Pop';
import {BARS, bodyFont, colors, STEP_FRAMES, titleFont, Variant} from '../theme';

export const PLAY_START = 24;
export const VARIANT_FRAMES = PLAY_START + Math.ceil(16 * BARS * STEP_FRAMES) + 12;

export const VariantScene: React.FC<{variant: Variant}> = ({variant}) => {
  const frame = useCurrentFrame();
  const totalSteps = 16 * BARS;
  const tipIn = PLAY_START + 16 * STEP_FRAMES; // aparece en el 2º compás
  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      <Sequence from={PLAY_START} layout="none">
        <Audio src={staticFile(`audio/${variant.id}.wav`)} />
      </Sequence>

      {/* Título */}
      <div style={{position: 'absolute', top: 230, width: '100%', textAlign: 'center'}}>
        <Pop>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
            <div
              style={{
                fontFamily: titleFont,
                fontSize: 70,
                color: colors.bg,
                background: colors.gold,
                borderRadius: 20,
                padding: '0 26px',
              }}
            >
              #{variant.numero}
            </div>
            <div style={{fontFamily: titleFont, fontSize: 96, color: colors.white}}>{variant.titulo.toUpperCase()}</div>
          </div>
        </Pop>
        <Pop delay={6}>
          <div style={{fontFamily: bodyFont, fontWeight: 700, fontSize: 40, color: colors.cyan, marginTop: 8}}>
            {variant.subtitulo}
          </div>
        </Pop>
      </div>

      {/* Batería */}
      <div style={{position: 'absolute', top: 470}}>
        <Pop delay={8}>
          <DrumKit variant={variant} playStart={PLAY_START} totalSteps={totalSteps} />
        </Pop>
      </div>

      {/* Partitura en grilla */}
      <div style={{position: 'absolute', top: 960}}>
        <Pop delay={12}>
          <DrumGrid variant={variant} playStart={PLAY_START} totalSteps={totalSteps} />
        </Pop>
      </div>

      {/* Tip */}
      <div
        style={{
          position: 'absolute',
          top: 1430,
          left: 60,
          right: 60,
          opacity: interpolate(frame, [tipIn, tipIn + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          transform: `translateY(${interpolate(frame, [tipIn, tipIn + 8], [30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}px)`,
          background: 'rgba(0,0,0,0.45)',
          border: `3px solid ${colors.pink}`,
          borderRadius: 24,
          padding: '22px 30px',
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 38,
          color: colors.white,
          textAlign: 'center',
        }}
      >
        💡 {variant.tip}
      </div>
    </AbsoluteFill>
  );
};
