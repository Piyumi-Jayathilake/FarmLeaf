**Repository Overview**

- **Type**: Single-page food-ordering application built with React + Vite
- **Location**: `frontend_foodrush/` directory
- **Purpose**: Customer-facing UI for browsing menu items, managing cart, and placing orders with cart persisted to `localStorage`

**How To Run (developer)**

```powershell
cd frontend_foodrush; npm install; npm run dev    # Dev server at http://localhost:5173
npm run build                                       # Production build
npm run lint                                        # ESLint check
```

**Architecture & Key Files**

1. **Bootstrap** (`src/main.jsx`): `CartProvider` → `BrowserRouter` → `App`
2. **Routing** (`src/App.jsx`): Central route table; all routes defined here as `<Route>` elements
3. **Pages** (`src/pages/`): Route target components (AboutPage, Menu, Cart, Home, ContactPage)
4. **Components** (`src/components/`): Reusable UI components and feature sections (Navbar, Footer, CartPage, Login, Banner, etc.)
5. **State** (`src/CartContext/CartContext.jsx`): Global cart using `useReducer` + `localStorage` persistence
6. **Data** (`src/assets/dummydata.js`): Product catalog, feature lists, team data, form field definitions, social links
7. **Styling**: Tailwind CSS (v4 with `@tailwindcss/vite` plugin); component-scoped CSS for complex layouts

**Key Dependencies**

- `react-router-dom@7.7.1`: Client-side routing (not API-based)
- `tailwindcss@4.1.11` + `@tailwindcss/vite@4.1.11`: Utility-first CSS via Vite plugin
- `framer-motion@12.23.24`: Animations (check components for usage)
- `react-icons@5.5.0`: Icon library (imported throughout dummydata.js and components)
- `react-hot-toast@2.6.0`: Toast notifications (check Cart/CartPage components)

**State Management Pattern**

Cart reducer (`src/CartContext/CartContext.jsx`) handles three actions:
- `ADD_ITEM`: Add or update quantity of existing item
- `REMOVE_ITEM`: Remove item by ID
- `UPDATE_QUANTITY`: Safely update quantity (min 1)

The initializer reads from `localStorage.getItem('cart')` on mount; `useEffect` syncs cart back to storage on every change. Context exports `useCart()` hook providing: `cartItems` (array), `cartTotal` (sum of price × quantity), `totalItems` (formatted count with 'k' suffix), plus methods `addToCart(item, qty)`, `removeFromCart(itemId)`, `updateQuantity(itemId, newQty)`.

**Project-Specific Patterns & Conventions**

- **File names**: PascalCase (e.g., `AboutPage.jsx`, `Navbar.jsx`)
- **Directory structure**: Components in `src/components/{ComponentName}/{ComponentName}.jsx`; pages in `src/pages/{PageName}/{PageName}.jsx`
- **Styling**: Colocated CSS files when needed (e.g., `OurMenu.jsx` + `OurMenu.css`); prefer Tailwind utilities in JSX
- **Default exports**: Pages are default exports so routes can import directly
- **CSS location**: Style component-level CSS in the same folder; global styles in `src/index.css`

**Common Patterns in Codebase**

1. **Authentication**: Stored in `localStorage` as `loginData` (see Navbar.jsx); checked on location changes via `useLocation()`
2. **Product data**: Defined in `src/assets/dummydata.js` with `cardData` (4 items) and `additionalData` (4 more); each has `id`, `title`, `rating`, `hearts`, `description`, `image`, `price`
3. **Icons**: Heavy use of `react-icons` (FaXxx, GiXxx, FiXxx, FaXxx6) — import needed icons in components
4. **Gradients**: Tailwind gradient classes used throughout (e.g., `from-green-700 to-green-900`, `bg-gradient-to-r`)
5. **Responsive design**: Tailwind breakpoints (sm, md, lg) used in className strings for mobile-first layout

**Integration Points & External Dependencies**

- React Router: check `react-router-dom` v7+ usage in `src/App.jsx` and `src/main.jsx`.
- Tailwind CSS: configured via Vite plugin in `vite.config.js`. If you change Tailwind version or config, restart the dev server.
- Local persistence: `localStorage` for cart in `CartContext`.

**When Making Changes (practical guidance)**

- **Adding a route**: Add `<Route>` in `src/App.jsx`, create new page in `src/pages/{Name}/{Name}.jsx` as default export
- **Adding a component**: Create in `src/components/{Name}/{Name}.jsx`; if using `useCart()`, import hook from CartContext
- **Modifying cart shape**: Update reducer + initializer in `src/CartContext/CartContext.jsx`; add migration logic in initializer if backward compatibility needed
- **Changing Tailwind config**: Modify `vite.config.js` (currently minimal; any config would go in a `tailwind.config.js` file if created), then restart dev server
- **Adding product data**: Update `src/assets/dummydata.js` exports (e.g., `cardData` or `additionalData`)
- **Auth-dependent UI**: Check `localStorage.getItem('loginData')` in component or use controlled state with location effect (see Navbar pattern)

**Examples to Reference**

- Route list: `src/App.jsx` — Shows all page-to-path mappings (e.g., `/menu` → `Menu`, `/cart` → `Cart`)
- Cart logic: `src/CartContext/CartContext.jsx` — Reducer actions, initializer, localStorage sync, useCart hook
- Product catalog: `src/assets/dummydata.js` — `cardData`, `additionalData`, features, team, form fields, social links
- Navigation & auth: `src/components/Navbar/Navbar.jsx` — useCart hook usage, login state, logout handler, responsive menu
- Bootstrap: `src/main.jsx` — Provider nesting order (CartProvider wraps BrowserRouter)
- Build config: `vite.config.js` — React + Tailwind plugins
- Package info: `package.json` — All dev scripts and direct dependencies

**Suggested Prompts for an AI Coding Agent**

- "Make a new page at `/orders` — add route in `src/App.jsx`, create `src/pages/Orders/Orders.jsx` and a simple layout matching existing `pages/*` style." 
- "Refactor cart reducer to support `discount` per item: update `CartContext` reducer and the `initializer`, add unit-like sanity checks and update any callers in components under `components/CartPage` or `components/*` that construct cart items." 
- "Update Tailwind/Tokens: explain what to change in `vite.config.js` and where to place tailwind config if adding custom utilities." 

**Limitations & Assumptions**

- No backend API integration; all product data is hardcoded in `src/assets/dummydata.js`
- No user authentication backend; auth state is `localStorage`-only (not persistent on server)
- No database; cart persists only in browser `localStorage`
- No test suite in repo
- Images must be imported in JS files and stored in `src/assets/`

**Notes for AI Agents**

- When adding icons, check `src/assets/dummydata.js` imports for available icon sets
- Avoid modifying `localStorage` directly; use `useCart()` hook or context dispatch
- Keep reducer pure; use `useEffect` outside reducer for async or side effects
- Restart dev server if Tailwind or Vite config changes
- ESLint may warn about `react-refresh/only-export-components` — suppress with `/* eslint-disable */` if justified (e.g., CartProvider in CartContext.jsx)
- Component styling often uses both Tailwind utilities and colocated CSS files; prefer Tailwind for single-use styles, CSS for reusable class sets
