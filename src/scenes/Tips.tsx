import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Pop} from '../components/Pop';
import {bodyFont, colors, titleFont} from '../theme';

const tips = [
  {emoji: '🐢', text: 'Empezá lento: 80 BPM con metrónomo y subí de a 5'},
  {emoji: '🦶', text: 'El "chick" del hi-hat se cierra JUSTO con el bombo'},
  {emoji: '🎯', text: 'Tempo típico del disco: 110 a 130 BPM'},
];

export const Tips: React.FC = () => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 60px'}}>
    <Pop>
      <div style={{fontFamily: titleFont, fontSize: 110, color: colors.gold, textAlign: 'center'}}>TIPS PRO</div>
    </Pop>
    <div style={{height: 40}} />
    {tips.map((t, i) => (
      <Pop key={i} delay={15 + i * 30} style={{width: '100%', marginBottom: 28}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 26,
            padding: '26px 32px',
            borderLeft: `10px solid ${[colors.cyan, colors.pink, colors.purple][i]}`,
          }}
        >
          <div style={{fontSize: 80}}>{t.emoji}</div>
          <div style={{fontFamily: bodyFont, fontWeight: 700, fontSize: 44, color: colors.white}}>{t.text}</div>
        </div>
      </Pop>
    ))}
  </AbsoluteFill>
);
