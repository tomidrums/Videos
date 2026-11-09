import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {bodyFont, colors, STEP_FRAMES, titleFont, Variant} from '../theme';

export const ROW_LABELS: Record<string, string> = {
  hihat: 'HI-HAT',
  ride: 'RIDE',
  caja: 'CAJA',
  bombo: 'BOMBO',
};

export const ROW_COLORS: Record<string, string> = {
  hihat: colors.cyan,
  ride: colors.gold,
  caja: colors.pink,
  bombo: colors.purple,
};

const COUNT = ['1', 'e', 'y', 'a', '2', 'e', 'y', 'a', '3', 'e', 'y', 'a', '4', 'e', 'y', 'a'];
const CELL = 54;
const GAP = 4;
const BEAT_GAP = 18;

/** Paso actual (0..15) o -1 si todavía no arrancó / ya terminó. */
export const useStep = (playStart: number, totalSteps: number) => {
  const frame = useCurrentFrame();
  const raw = (frame - playStart) / STEP_FRAMES;
  if (raw < 0 || raw >= totalSteps) return {step: -1, raw};
  return {step: Math.floor(raw), raw};
};

const Note: React.FC<{ch: string; color: string; active: boolean}> = ({ch, color, active}) => {
  const glow = active ? `0 0 26px ${color}, 0 0 8px ${color}` : 'none';
  const base: React.CSSProperties = {
    width: CELL - 10,
    height: CELL - 10,
    borderRadius: '50%',
    boxShadow: glow,
    transform: `scale(${active ? 1.25 : 1})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: bodyFont,
    fontWeight: 900,
    fontSize: 26,
  };
  switch (ch) {
    case 'x': // hi-hat cerrado
      return <div style={{...base, background: color, color: colors.bg}}>×</div>;
    case 'o': // hi-hat abierto
      return (
        <div style={{...base, border: `6px solid ${colors.gold}`, background: active ? colors.gold : 'transparent'}} />
      );
    case 'X': // caja
    case 'k': // bombo
      return <div style={{...base, background: color}} />;
    case 'g': // ghost note
      return (
        <div
          style={{
            ...base,
            width: CELL - 26,
            height: CELL - 26,
            background: 'transparent',
            border: `4px dashed ${color}`,
            opacity: 0.9,
          }}
        />
      );
    case 'r': // ride (cuerpo)
      return <div style={{...base, background: color, color: colors.bg}}>×</div>;
    case 'b': // campana
      return (
        <div style={{...base, background: colors.white, color: colors.bg, border: `5px solid ${color}`}}>▲</div>
      );
    default:
      return null;
  }
};

export const DrumGrid: React.FC<{variant: Variant; playStart: number; totalSteps: number}> = ({
  variant,
  playStart,
  totalSteps,
}) => {
  const frame = useCurrentFrame();
  const {step} = useStep(playStart, totalSteps);
  const col = step >= 0 ? step % 16 : -1;
  const rows = Object.entries(variant.rows) as [string, string][];

  const colX = (i: number) => i * (CELL + GAP) + Math.floor(i / 4) * (BEAT_GAP - GAP);
  const width = colX(15) + CELL;

  return (
    <div style={{width, position: 'relative'}}>
      {/* Playhead */}
      {col >= 0 && (
        <div
          style={{
            position: 'absolute',
            left: colX(col) - 4,
            top: 36,
            width: CELL + 8,
            height: rows.length * (CELL + 48) + 70,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.12)',
            border: '2px solid rgba(255,255,255,0.35)',
          }}
        />
      )}
      {rows.map(([name, pattern], r) => (
        <div key={name} style={{marginBottom: 14}}>
          <div
            style={{
              fontFamily: titleFont,
              fontSize: 30,
              letterSpacing: 3,
              color: ROW_COLORS[name],
              marginBottom: 4,
              opacity: interpolate(frame, [r * 4, r * 4 + 10], [0, 1], {extrapolateRight: 'clamp'}),
            }}
          >
            {ROW_LABELS[name]}
          </div>
          <div style={{position: 'relative', height: CELL}}>
            {pattern.split('').map((ch, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: colX(i),
                  width: CELL,
                  height: CELL,
                  borderRadius: 12,
                  background: i % 4 === 0 ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Note ch={ch} color={ROW_COLORS[name]} active={col === i && ch !== '.'} />
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Conteo */}
      <div style={{position: 'relative', height: 60, marginTop: 6}}>
        {COUNT.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: colX(i),
              width: CELL,
              textAlign: 'center',
              fontFamily: bodyFont,
              fontWeight: 900,
              fontSize: i % 4 === 0 ? 40 : 30,
              lineHeight: '60px',
              color: c === 'y' ? colors.gold : i % 4 === 0 ? colors.white : colors.muted,
              transform: `scale(${col === i ? 1.3 : 1})`,
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
};
