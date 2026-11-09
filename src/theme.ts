import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
import patterns from './patterns.json';

// Fuentes incluidas en /public/fonts (Anton y Montserrat, licencia OFL) para renderizar sin internet.
export const titleFont = 'Anton';
export const bodyFont = 'Montserrat';
loadFont({family: titleFont, url: staticFile('fonts/Anton-Regular.woff2'), weight: '400'});
loadFont({family: bodyFont, url: staticFile('fonts/Montserrat-Variable.woff2'), weight: '100 900'});

export const FPS = 30;
export const BPM = patterns.bpm;
export const BARS = patterns.bars;
/** Frames por semicorchea (no es entero: el playhead se calcula de forma continua). */
export const STEP_FRAMES = (FPS * 60) / BPM / 4;

export const colors = {
  bg: '#0b0618',
  bg2: '#1d0b3a',
  pink: '#ff2e9a',
  purple: '#8b5cf6',
  cyan: '#22d3ee',
  gold: '#ffc83d',
  white: '#ffffff',
  muted: 'rgba(255,255,255,0.55)',
};

export const HANDLE = '@tomi.drums';

export type Variant = {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  tip: string;
  /** Una fila por instrumento, 16 semicorcheas por compás. */
  rows: Record<string, string>;
};
export const variants = patterns.variants as unknown as Variant[];
