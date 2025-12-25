# Architect3D (Blueprint3D) — Next.js wrapper (Netlify-ready)

This repo wraps the original `build/` demo (jQuery + BP3DJS) inside a modern **Next.js** app so you can deploy and grow it incrementally.

✅ Keeps all existing functionality (2D floorplanner, 3D viewer, load/save, item inventory, etc.)

✅ Modern UI refresh (Animal Crossing-inspired cozy theme) with quality-of-life UX upgrades

**Author:** Yverdon Pierre Boei

✅ Runs client-side (the legacy scripts are loaded in-order after hydration)

✅ Deploys on **Netlify** using `@netlify/plugin-nextjs`

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Build

```bash
npm run build
npm run start
```

---

## Deploy to Netlify

1. Push this repo to GitHub/GitLab.
2. In Netlify: **Add new site → Import an existing project**.
3. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Plugin: `@netlify/plugin-nextjs`

That’s it.

---

## How it works

- The original static assets are copied to `public/` (`/css`, `/js`, `/models`, `/rooms`, ...).
- The UI markup from the original `build/index.html` is rendered via React.
- A small loader script then loads the legacy scripts sequentially:
  `jquery → plugins → BP3DJS → items → app.js`.

### Modern UI layer

The legacy DOM/IDs are preserved, but the look-and-feel is overridden by:

- `public/css/modern-ui.css` (cozy theme, rounded controls, updated modals)
- `public/js/modern-ui.js` (toasts, autosave + restore prompt, inventory search/sort, recents, dusk mode, help modal)

This gives you a **Next.js/React** foundation without rewriting the entire planner at once.

---

## Next steps (optional refactor path)

If you want to scale the UI in React over time:

- Replace the `dangerouslySetInnerHTML` markup with real React components.
- Move jQuery event wiring (buttons, modal, etc.) into React handlers.
- Keep BP3DJS as a pure rendering/engine layer, controlled by React state.

