import React from 'react';
import {interpolate} from 'remotion';
import {bodyFont, colors, titleFont, Variant} from '../theme';
import {ROW_COLORS, ROW_LABELS, useStep} from './DrumGrid';

const lastHit = (pattern: string, raw: number) => {
  // Devuelve cuántos pasos pasaron desde el último golpe (Infinity si ninguno)
  if (raw < 0) return {since: Infinity, ch: '.'};
  const cur = Math.floor(raw);
  for (let back = 0; back < 16; back++) {
    const idx = cur - back;
    if (idx < 0) break;
    const ch = pattern[idx % 16];
    if (ch !== '.') return {since: raw - idx, ch};
  }
  return {since: Infinity, ch: '.'};
};

const Pad: React.FC<{
  name: string;
  size: number;
  x: number;
  y: number;
  hit: {since: number; ch: string};
  tilt?: number;
}> = ({name, size, x, y, hit, tilt = 0}) => {
  const color = ROW_COLORS[name];
  const flash = interpolate(hit.since, [0, 1.6], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const intensity = hit.ch === 'g' ? flash * 0.35 : flash;
  const open = hit.ch === 'o';
  const sub =
    hit.since < 2.5
      ? {x: 'cerrado', o: 'ABIERTO', X: '¡PA!', g: 'ghost', k: 'BUM', r: 'ride', b: 'CAMPANA'}[hit.ch] ?? ''
      : '';
  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}${intensity > 0.05 ? 'cc' : '33'} 0%, ${color}22 70%)`,
        border: `6px solid ${color}`,
        boxShadow: `0 0 ${20 + intensity * 90}px ${color}`,
        transform: `rotateX(${tilt}deg) scale(${1 + intensity * 0.08})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.white,
      }}
    >
      <div style={{fontFamily: titleFont, fontSize: size * 0.17, letterSpacing: 2}}>{ROW_LABELS[name]}</div>
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 900,
          fontSize: size * 0.11,
          color: open ? colors.gold : colors.white,
          opacity: sub ? 1 : 0,
          height: size * 0.14,
        }}
      >
        {sub}
      </div>
    </div>
  );
};

/** Batería vista desde arriba: los pads se iluminan con cada golpe. */
export const DrumKit: React.FC<{variant: Variant; playStart: number; totalSteps: number}> = ({
  variant,
  playStart,
  totalSteps,
}) => {
  const {raw} = useStep(playStart, totalSteps);
  const r = raw >= totalSteps ? -1 : raw;
  const rows = variant.rows;
  const cymbal = rows.hihat ? 'hihat' : 'ride';
  return (
    <div style={{position: 'relative', width: 1000, height: 470}}>
      {cymbal === 'hihat' ? (
        <>
          <Pad name="hihat" size={250} x={220} y={140} hit={lastHit(rows.hihat, r)} />
          <Pad name="caja" size={230} x={470} y={320} hit={lastHit(rows.caja, r)} />
          <Pad name="bombo" size={290} x={760} y={280} hit={lastHit(rows.bombo, r)} />
        </>
      ) : (
        <>
          <Pad name="ride" size={250} x={800} y={130} hit={lastHit(rows.ride, r)} />
          <Pad name="caja" size={230} x={230} y={300} hit={lastHit(rows.caja, r)} />
          <Pad name="bombo" size={290} x={540} y={330} hit={lastHit(rows.bombo, r)} />
        </>
      )}
    </div>
  );
};
