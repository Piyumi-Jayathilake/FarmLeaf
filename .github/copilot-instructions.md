**Repository Overview**

- **Type**: Single-page frontend (React + Vite) application located in `frontend/`.
- **Purpose**: Food-ordering UI with client-side routing and a simple cart persisted to `localStorage`.

**How To Run (developer)**

- Install and run the frontend (Windows PowerShell):

```powershell
cd frontend; npm install; npm run dev
```
- Build for production:

```powershell
cd frontend; npm run build; npm run preview
```
- Linting:

```powershell
cd frontend; npm run lint
```

**Architecture & Key Files**

- `frontend/package.json` — scripts and direct dependencies (Vite, React, Tailwind plugin).
- `frontend/vite.config.js` — Vite + React plugin + Tailwind plugin; changes here affect the dev server and build.
- `frontend/src/main.jsx` — application bootstrap. Note `CartProvider` wraps `BrowserRouter` and `App`.
- `frontend/src/App.jsx` — central route table. Add or modify routes here (uses `react-router-dom` `Routes` + `Route`).
- `frontend/src/CartContext/CartContext.jsx` — cart state management via `useReducer`, persisted to `localStorage`. This file contains the reducer shape and initializer logic used across the app.
- `frontend/src/components/` and `frontend/src/pages/` — component and page conventions (PascalCase components, CSS files colocated when used).

**Project-Specific Patterns & Conventions**

- Component naming: PascalCase for components and pages (examples: `Home.jsx`, `AboutPage/AboutPage.jsx`).
- Routing: `App.jsx` is the single source of route definitions. Keep route components as default exports from `pages/*`.
- Global state: small scoped contexts (e.g., `CartContext`) prefer `useReducer` with an `initializer` reading from `localStorage`. When changing the cart shape, also migrate or handle older `localStorage` formats.
- Persistence: `CartContext` writes the whole cart to `localStorage` on every cart change — avoid heavy synchronous work in the reducer.
- Styling: Tailwind is used (via `tailwindcss` and `@tailwindcss/vite` plugin). Component-level CSS files exist for specific layouts (e.g., `OurMenu.css`).

**Integration Points & External Dependencies**

- React Router: check `react-router-dom` v7+ usage in `App.jsx` and `main.jsx`.
- Tailwind CSS: configured via Vite plugin in `vite.config.js`. If you change Tailwind version or config, restart the dev server.
- Local persistence: `localStorage` for cart in `CartContext`.

**When Making Changes (practical guidance)**

- Adding a route: update `frontend/src/App.jsx` and add the page under `frontend/src/pages/`. Ensure the new component is exported as default.
- Changing cart behavior or shape:
  - Update `frontend/src/CartContext/CartContext.jsx` reducer and initializer.
  - Add migration logic in the initializer if existing `localStorage` values must be supported.
  - Keep reducer pure and small; side effects (e.g., analytics) should be outside the reducer (e.g., in `useEffect`).
- Editing build/dev config: change `frontend/vite.config.js` then restart dev server.
- Linting: run `npm run lint` in `frontend/` to catch style/JSX issues; project uses ESLint plugins for React hooks and refresh.

**Examples to Reference**

- Route list: `frontend/src/App.jsx` — shows how pages map to paths (e.g., `/menu` → `Menu`).
- Cart reducer and persistence: `frontend/src/CartContext/CartContext.jsx` — demonstrates `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `initializer` and `localStorage` usage.
- Dev scripts: `frontend/package.json` — `dev`, `build`, `preview`, `lint`.

**Suggested Prompts for an AI Coding Agent**

- "Make a new page at `/orders` — add route in `frontend/src/App.jsx`, create `frontend/src/pages/Orders/Orders.jsx` and a simple layout matching existing `pages/*` style." 
- "Refactor cart reducer to support `discount` per item: update `CartContext` reducer and the `initializer`, add unit-like sanity checks and update any callers in components under `components/CartPage` or `components/*` that construct cart items." 
- "Update Tailwind/Tokens: explain what to change in `vite.config.js` and where to place tailwind config if adding custom utilities." 

**Notes & Limitations**

- This repository contains only the frontend app under `frontend/`. There are no backend APIs or tests in the source tree — assume mocks or a separate backend repo when implementing integration work.
- No existing `.github/copilot-instructions.md` was present; this file should be kept concise and updated when structural changes are made (routes, major state shape changes, or build tooling changes).

If any section is unclear or you'd like more automation (example PR templates, local test harness, or migration helpers for `localStorage`), tell me which area to expand and I'll iterate.
