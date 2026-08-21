# WorkBridge — Where Skills Meet Opportunity

A complete, production-quality frontend for WorkBridge: a professional networking and discovery platform connecting household skilled workers (electricians, plumbers, maids, cooks, and 15+ other categories) with customers across India.

## Tech Stack
- React 18 + Vite
- Tailwind CSS (custom design system — see `tailwind.config.js`)
- React Router v6 (role-based route guards)
- Framer Motion (micro-interactions)
- Lucide React (icons)
- Context API (`AuthContext`, `ThemeContext`, `AppContext`)

## Getting Started
```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Demo Accounts
This is a frontend-only build with mock services (`src/services/`) simulating a REST backend with realistic delays. Any email/phone + password works for customer/provider login and signup. For OTP flows, use demo code **123456**.

**Admin panel** (`/admin/login`):
- Email: `admin@workbridge.in`
- Password: `admin123`

## What's implemented
- Landing page (hero, categories, featured workers, how-it-works, testimonials, trust section, app promo)
- Full role-based auth: role selection, customer login/signup (3-step), provider login/signup (7-step onboarding wizard with live profile preview), forgot password (with strength meter), OTP login, Google login (mocked), separate admin login
- Customer dashboard & Provider dashboard (analytics charts, trust score, profile completion, AI suggestions)
- Search & Discovery: filters, sort, list/map toggle, pagination
- Worker Profile: trust score breakdown, skills, experience timeline, certificates, portfolio, reviews, similar workers
- Portfolio gallery, Messages (chat UI), Notifications center, Booking history, AI Recommendations, Community feed, Learning Center, Settings (account/appearance/language/privacy/notifications/security), Admin dashboard (stats, user table, verification queue)
- Dark mode (light/dark/system, persisted), fully responsive, loading/empty/error states throughout, accessible focus states & semantic markup

## Architecture notes
- All "API calls" live in `src/services/*.js` — swap these for real REST/GraphQL calls without touching any UI component.
- Mock data lives in `src/data/*.js` — realistic Indian names, cities, and pricing.
- Design tokens (colors, shadows, radii) are centralized in `tailwind.config.js` and `src/index.css`.

## Next steps for a real backend
1. Replace the mock functions in `src/services/` with real API calls (keep the same function signatures).
2. Add real Google Maps / Places API to `src/components/search/MapView.jsx`.
3. Wire real OAuth for Google login in `authService.loginWithGoogle`.
4. Add file upload handling for verification documents and portfolio media.
