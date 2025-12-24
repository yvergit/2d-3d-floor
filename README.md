# 3dfloor • Cozy Edition (Next.js)

This is a **fully working Next.js wrapper** around the original BP3DJS build, rebranded as **3dfloor**, with a brand‑new **cozy / Animal‑Crossing‑inspired** (original) UI theme.

## What changed

- ✅ Migrated from static HTML into a clean **Next.js App Router** project (`src/app`).
- ✅ UI split into components (`src/components/...`) while **keeping legacy IDs/selectors** so the original JS continues to work.
- ✅ Completely new styling and layout (no copyrighted assets).
- ✅ Replaced all button icons **except the Save/Upload icons** (`saveFile`, `saveFile2d`, `loadFile`, `loadFile2d`).

## Credits

- Author: **Yverdon**
- Original engine + scripts: BP3DJS (legacy build included in `/public`)

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Notes

- Legacy scripts are loaded in `src/app/page.tsx` (order preserved).
- All legacy assets (models, textures, thumbnails, etc.) are served from `/public`.
