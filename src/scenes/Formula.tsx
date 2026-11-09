import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Pop} from '../components/Pop';
import {bodyFont, colors, titleFont} from '../theme';

const items = [
  {color: colors.purple, n: '1', title: 'BOMBO EN LOS 4 TIEMPOS', text: 'El famoso "four on the floor": 1 - 2 - 3 - 4 parejito'},
  {color: colors.pink, n: '2', title: 'CAJA EN 2 Y 4', text: 'El backbeat de siempre, bien firme'},
  {color: colors.gold, n: '3', title: 'HI-HAT ABIERTO EN LA "Y"', text: 'El secreto: el "tsss" en el contratiempo'},
];

export const Formula: React.FC = () => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 60px'}}>
    <Pop delay={0}>
      <div style={{fontFamily: titleFont, fontSize: 96, color: colors.white, textAlign: 'center', lineHeight: 1.05}}>
        LA FÓRMULA
        <br />
        <span style={{color: colors.pink}}>DEL DISCO</span>
      </div>
    </Pop>
    <div style={{height: 50}} />
    {items.map((it, i) => (
      <Pop key={it.n} delay={20 + i * 35} style={{width: '100%', marginBottom: 30}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            background: 'rgba(255,255,255,0.07)',
            border: `3px solid ${it.color}`,
            borderRadius: 28,
            padding: '28px 34px',
            boxShadow: `0 0 30px ${it.color}55`,
          }}
        >
          <div
            style={{
              minWidth: 90,
              height: 90,
              borderRadius: '50%',
              background: it.color,
              color: colors.bg,
              fontFamily: titleFont,
              fontSize: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {it.n}
          </div>
          <div>
            <div style={{fontFamily: titleFont, fontSize: 52, color: it.color, letterSpacing: 1}}>{it.title}</div>
            <div style={{fontFamily: bodyFont, fontWeight: 500, fontSize: 36, color: colors.white, marginTop: 6}}>
              {it.text}
            </div>
          </div>
        </div>
      </Pop>
    ))}
  </AbsoluteFill>
);
