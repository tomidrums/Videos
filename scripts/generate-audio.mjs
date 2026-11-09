// Genera los loops de batería (WAV) de cada variante a partir de src/patterns.json.
// Síntesis simple en JS puro, sin dependencias: bombo, caja, ghost, hi-hat, ride.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/patterns.json'), 'utf8'));
const SR = 44100;
const step = 60 / data.bpm / 4; // duración de una semicorchea en segundos

// Ruido determinístico para que el audio sea siempre igual
let seed = 12345;
const rand = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return (seed / 0x7fffffff) * 2 - 1;
};

const add = (buf, start, len, fn) => {
  const s0 = Math.floor(start * SR);
  const n = Math.floor(len * SR);
  for (let i = 0; i < n && s0 + i < buf.length; i++) buf[s0 + i] += fn(i / SR, i);
};

const kick = (buf, t, v = 1) => {
  let phase = 0;
  add(buf, t, 0.45, (x) => {
    const f = 45 + 110 * Math.exp(-x * 28);
    phase += (2 * Math.PI * f) / SR;
    const click = x < 0.004 ? rand() * 0.4 * (1 - x / 0.004) : 0;
    return v * (Math.sin(phase) * Math.exp(-x * 7) + click);
  });
};

const snare = (buf, t, v = 1) => {
  let lp = 0;
  add(buf, t, 0.3, (x) => {
    const n = rand();
    lp += 0.35 * (n - lp);
    const noise = (n - lp * 0.6) * Math.exp(-x * 16);
    const body = Math.sin(2 * Math.PI * 190 * x) * Math.exp(-x * 30) * 0.7;
    return v * 0.75 * (noise + body);
  });
};

// Hi-hat: ruido "filtrado" (pasa-altos) con decaimiento corto o largo
const hat = (buf, t, len, decay, v = 1) => {
  let prev = 0;
  add(buf, t, len, (x) => {
    const n = rand();
    const hp = n - prev;
    prev = n;
    const fade = x > len - 0.008 ? (len - x) / 0.008 : 1; // choke suave
    return v * 0.32 * hp * Math.exp(-x * decay) * fade;
  });
};

const metal = (buf, t, freqs, len, decay, v) => {
  add(buf, t, len, (x) => {
    let s = 0;
    for (const f of freqs) s += Math.sin(2 * Math.PI * f * x);
    let prev = 0;
    const n = rand();
    const hp = n - prev;
    prev = n;
    return v * (s / freqs.length + hp * 0.15) * Math.exp(-x * decay);
  });
};

const render = (variant) => {
  const steps = 16 * data.bars;
  const total = steps * step + 0.6;
  const buf = new Float32Array(Math.ceil(total * SR));
  const rows = variant.rows;
  for (let i = 0; i < steps; i++) {
    const t = i * step;
    const at = (row) => (rows[row] ? rows[row][i % 16] : '.');
    if (at('bombo') === 'k') kick(buf, t, 1);
    if (at('caja') === 'X') snare(buf, t, 1);
    if (at('caja') === 'g') snare(buf, t, 0.22);
    const h = at('hihat');
    if (h === 'x') hat(buf, t, 0.06, 60, i % 4 === 0 ? 0.9 : 0.65);
    if (h === 'o') {
      // El hi-hat abierto suena hasta el próximo golpe de hi-hat (se "cierra")
      let next = 1;
      while (next < 16 && rows.hihat[(i + next) % 16] === '.') next++;
      hat(buf, t, Math.min(next * step, 0.5), 5, 0.75);
    }
    const r = at('ride');
    if (r === 'r') metal(buf, t, [523, 790, 1187, 1663], 0.9, 5, 0.18);
    if (r === 'b') metal(buf, t, [880, 1325, 1990, 2650], 0.7, 6, 0.3);
  }
  // Normalizar
  let peak = 0;
  for (const s of buf) peak = Math.max(peak, Math.abs(s));
  const gain = 0.89 / peak;
  const pcm = Buffer.alloc(44 + buf.length * 2);
  pcm.write('RIFF', 0);
  pcm.writeUInt32LE(36 + buf.length * 2, 4);
  pcm.write('WAVEfmt ', 8);
  pcm.writeUInt32LE(16, 16);
  pcm.writeUInt16LE(1, 20);
  pcm.writeUInt16LE(1, 22);
  pcm.writeUInt32LE(SR, 24);
  pcm.writeUInt32LE(SR * 2, 28);
  pcm.writeUInt16LE(2, 32);
  pcm.writeUInt16LE(16, 34);
  pcm.write('data', 36);
  pcm.writeUInt32LE(buf.length * 2, 40);
  buf.forEach((s, i) => pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, s * gain)) * 32767), 44 + i * 2));
  return pcm;
};

const outDir = path.join(root, 'public/audio');
fs.mkdirSync(outDir, {recursive: true});
for (const v of data.variants) {
  fs.writeFileSync(path.join(outDir, `${v.id}.wav`), render(v));
  console.log(`audio: public/audio/${v.id}.wav`);
}
