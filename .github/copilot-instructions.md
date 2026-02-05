# FarmLeaf Copilot Instructions

## Repo overview
- Monorepo with three apps: backend (Express/MongoDB), frontend_foodrush (customer React), admin (React dashboard).
- Both frontends talk to backend on http://localhost:4000 with hardcoded URLs (no shared axios base).

## Critical workflows (Windows)
- Backend must start first:
  - cd backend; npm install; npm start
- Frontend: cd frontend_foodrush; npm install; npm run dev (Vite :5173)
- Admin: cd admin; npm install; npm run dev (Vite :5174)

## Architecture & flows
- Backend routes mounted in server.js: /api/user, /api/items, /api/cart, /api/orders.
- Auth: JWT in Authorization: Bearer <token>; middleware/auth.js attaches req.user. Token stored in localStorage.authToken.
- Models live in backend/modals (intentional typo): userModal.js, itemModal.js, cartModal.js, orderModal.js.
- Stripe flow: POST /api/orders (paymentMethod=online) returns checkoutUrl; frontend redirects; confirm via POST /api/orders/confirm.
- Uploads: multer saves to backend/uploads; static served at /uploads/<filename>.

## Frontend patterns (frontend_foodrush)
- App bootstrap in src/main.jsx wraps CartProvider → BrowserRouter → App.
- Protected routes use components/PivetRoute/PrivetRout.jsx (typo): blocks /cart, /checkout, /myorder.
- CartContext.jsx manages reducer actions and syncs with backend; mutations dispatch only after API success.
- API calls are scattered; search for "localhost:4000" or axios.get|post|put|delete when changing endpoints.

## Admin patterns (admin)
- Routes in admin/src/App.jsx: / (AddItems), /orders (Order list), /list (Item list).
- Image upload uses FormData and multipart POST to /api/items (see components/AddItems.jsx).
- Item list polls GET /api/items every 3 seconds (components/List.jsx).

## Conventions & gotchas
- Component/page file structure: src/components/{Name}/{Name}.jsx, src/pages/{Name}/{Name}.jsx, PascalCase.
- Tailwind 4 via @tailwindcss/vite; no tailwind.config.js.
- Image URLs must be prefixed with http://localhost:4000 when rendering uploads.
- CORS allowedOrigins in backend/server.js includes localhost ports 5173-5176.

## Key references
- Frontend checkout flow: frontend_foodrush/src/components/Checkout/Checkout.jsx.
- Cart UI uses uploads URL composition: frontend_foodrush/src/components/CartPage/CartPage.jsx.
- Admin styles map: admin/src/assets/admindetails.jsx.
