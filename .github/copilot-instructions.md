# FarmLeaf Copilot Instructions

## Repo overview
- Monorepo with three apps: backend (Express/MongoDB), frontend (customer React), admin (React dashboard).
- Both frontends call backend at http://localhost:4000 with hardcoded URLs (no shared axios base).

## Critical workflows (Windows)
- Backend first: cd backend; npm install; npm start
- Frontend (Vite :5173): cd frontend; npm install; npm run dev
- Admin (Vite :5174): cd admin; npm install; npm run dev

## Architecture & flows
- Backend routes mounted in backend/server.js: /api/user, /api/items, /api/cart, /api/orders.
- Auth: JWT in Authorization: Bearer <token>; backend/middleware/auth.js attaches req.user; token stored in localStorage.authToken.
- Models live in backend/modals (intentional typo): userModal.js, itemModal.js, cartModal.js, orderModal.js.
- Stripe flow: POST /api/orders (paymentMethod=online) returns checkoutUrl; frontend redirects; confirm via POST /api/orders/confirm.
- Uploads: multer saves to backend/uploads; static served at /uploads/<filename>.
- Backend envs: MONGODB_URI is required (backend/config/db.js). Stripe uses STRIPE_SECRET_KEY and optional LKR_TO_USD; redirect uses FRONTEND_URL fallback http://localhost:5173.

## Frontend patterns (frontend)
- App bootstrap in frontend/src/main.jsx wraps CartProvider → BrowserRouter → App.
- Protected routes use components/PivetRoute/PrivetRout.jsx (typo): blocks /cart, /checkout, /myorder.
- CartContext.jsx manages reducer actions and syncs with backend; dispatches mutations only after API success.
- API calls are scattered; search for "localhost:4000" or axios.get|post|put|delete when changing endpoints.

## Admin patterns (admin)
- Routes in admin/src/App.jsx: / (AddItems), /orders (Order list), /list (Item list).
- Image upload uses FormData and multipart POST to /api/items (see admin/src/components/AddItems.jsx).
- Item list polls GET /api/items every 3 seconds (admin/src/components/List.jsx).

## Conventions & gotchas
- Component/page file structure: src/components/{Name}/{Name}.jsx, src/pages/{Name}/{Name}.jsx, PascalCase.
- Tailwind 4 via @tailwindcss/vite; no tailwind.config.js.
- Image URLs must be prefixed with http://localhost:4000 when rendering uploads.
- CORS allowedOrigins in backend/server.js includes localhost ports 5173-5176.

## Key references
- Checkout flow: frontend/src/components/Checkout/Checkout.jsx.
- Cart UI uploads URL composition: frontend/src/components/CartPage/CartPage.jsx.
- Admin styles map: admin/src/assets/admindetails.jsx.
