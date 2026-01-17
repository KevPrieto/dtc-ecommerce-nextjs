# Project Tracker: DTC Ecommerce "Calm Form"

## Phase 0: Foundations & Architecture
- [x] Analyze PRD and defined constraints <!-- id: 0 -->
- [x] Design Repository Structure & Architecture (Deliverable: docs/architecture.md) <!-- id: 1 -->
- [x] Initialize Next.js App (Clean Install) <!-- id: 2 -->
  - Created Next.js 15 project with TypeScript and App Router
  - Configured Tailwind CSS with PostCSS
  - Set up folder structure per architecture.md: app/(auth|shop|checkout|account), components/{ui,shop,layout,account}, lib/{supabase,stripe}, types
  - Created root layout, landing page, and cn() utility
  - Verified successful build
- [x] Configure Tailwind, Fonts, and shadcn/ui base <!-- id: 3 -->
  - Configured shadcn/ui with components.json (new-york style, neutral base color)
  - Set up Tailwind theme with CSS variables for premium minimal aesthetic
  - Configured color palette: neutral grays and whites for clean skincare brand
  - Added system font stack (San Francisco, Segoe UI, Roboto) for optimal performance
  - Installed tailwindcss-animate plugin
  - Updated globals.css with shadcn theme variables and base styles
  - Verified successful build
- [ ] Set up Supabase Project & Environment Variables <!-- id: 4 -->

## Phase 1: Core Components & Design System
- [ ] Define Typography & Color Palette (Calm, Premium, Minimal) <!-- id: 5 -->
- [ ] Implement Layouts (RootLayout, ShopLayout, AuthLayout) <!-- id: 6 -->
- [ ] Build Core UI Components (Buttons, Inputs, Cards) <!-- id: 7 -->
- [ ] Build Header & Footer (Responsive) <!-- id: 8 -->

## Phase 2: Data Layer & Product Catalog
- [ ] Design Database Schema (Products, Orders, Profiles) <!-- id: 9 -->
- [ ] Create Seed Script for "Calm Form" Products <!-- id: 10 -->
- [ ] Implement Server-Side Product Fetching <!-- id: 11 -->
- [ ] Build Product Listing Page (PLP) <!-- id: 12 -->
- [ ] Build Product Detail Page (PDP) with Variants <!-- id: 13 -->

## Phase 3: Cart & Checkout Logic
- [ ] Implement Cart Store (Zustand/Context - Client Side) <!-- id: 14 -->
- [ ] Build Cart Drawer/Page <!-- id: 15 -->
- [ ] Integrate Stripe Checkout (Test Mode) <!-- id: 16 -->
- [ ] Create Order Success Page <!-- id: 17 -->

## Phase 4: Authentication & User Accounts
- [ ] Implement Supabase Auth (Sign Up, Login, Guest) <!-- id: 18 -->
- [ ] Build Account Dashboard (Order History) <!-- id: 19 -->
- [ ] Protect Account Routes (Middleware) <!-- id: 20 -->

## Phase 5: Polish & Deployment
- [ ] Verify Mobile Responsiveness <!-- id: 21 -->
- [ ] Fix Critical UI/UX Bugs <!-- id: 22 -->
- [ ] Final Deployment to Vercel <!-- id: 23 -->
- [ ] Final Review against PRD <!-- id: 24 -->
