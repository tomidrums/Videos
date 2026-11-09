# 🥁 Videos de @tomi.drums (Remotion)

Videos verticales (1080×1920, 30 fps) para TikTok / Reels, hechos con [Remotion](https://www.remotion.dev).

## Video: "4 formas de tocar el RITMO DISCO" (~39 s)

1. **Gancho** – "4 formas de tocar el RITMO DISCO (la #3 casi nadie la enseña 👀)"
2. **La fórmula del disco** – bombo en los 4 tiempos, caja en 2 y 4, hi-hat abierto en la "y"
3. **#1 El clásico** – hi-hat en corcheas, se abre en la "y"
4. **#2 Semicorcheas** – hi-hat en semicorcheas abriendo en la "y"
5. **#3 Con ghost notes** – notas fantasma en la caja
6. **#4 Campana del ride** – ride en negras + campana en la "y"
7. **Tips pro** y **cierre** con llamado a seguir / comentar

Cada variante muestra una batería vista desde arriba que se ilumina con cada golpe, una grilla
de 16 semicorcheas con el conteo `1 e y a` y un cursor que avanza a tempo (115 BPM), con
audio de batería sintetizado y sincronizado.

## Uso

```bash
npm install
npm run studio   # previsualizar y editar en el navegador
npm run render   # genera out/ritmo-disco.mp4
```

## Cómo cambiar el contenido

- Ritmos, títulos y tips: `src/patterns.json` (cada fila = 16 semicorcheas).
  - Hi-hat: `x` cerrado, `o` abierto · Caja: `X` golpe, `g` ghost note · Bombo: `k` · Ride: `r` cuerpo, `b` campana
- Tempo: `bpm` en el mismo archivo (el audio se regenera solo con `npm run audio`).
- Textos del gancho, fórmula, tips y cierre: `src/scenes/`.
- Colores y usuario: `src/theme.ts`.

Fuentes incluidas: Anton y Montserrat (SIL Open Font License).
