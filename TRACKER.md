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
- [x] Set up Supabase Project & Environment Variables <!-- id: 4 -->
  - Installed @supabase/supabase-js and @supabase/ssr packages
  - Created lib/supabase/server.ts with SSR-compatible server client
  - Created lib/supabase/client.ts with browser client
  - Created .env.local.example with Supabase and Stripe variable templates
  - Verified successful build

## Phase 1: Core Components & Design System
- [x] Define Typography & Color Palette (Calm, Premium, Minimal) <!-- id: 5 -->
  - Typography: Defined clear hierarchy (H1-H4, body, small) with negative letter spacing for premium feel
  - Font sizes: xs(12px) to 5xl(48px) with optimized line heights for readability
  - Font weights: normal(400), medium(500), semibold(600) for minimal hierarchy
  - Color palette: Neutral base (white, warm off-white, grays, near-black)
  - Accent color: Subtle sage green (hsl 150 12% 42%) for clinical skincare aesthetic
  - Ring/focus color: Sage green for consistent interactive states
  - Border radius: Minimal (0.375rem) for clean, modern look
  - Added base typography styles in globals.css
  - Verified successful build
- [x] Implement Layouts (RootLayout, ShopLayout, AuthLayout) <!-- id: 6 -->
  - Created ShopLayout: Header/main/footer structure with container and spacing
  - Created AuthLayout: Centered layout for auth forms (max-width 28rem)
  - Created CheckoutLayout: Minimal distraction-free layout (header only, no footer)
  - Created AccountLayout: Sidebar layout for account navigation (aside + main)
  - All layouts use Server Components (default)
  - Created placeholder pages for each route group to verify layouts
  - Structural HTML only - no design, no content, no navigation logic
  - Verified successful build (8 routes generated)
- [x] Build Core UI Components (Buttons, Inputs, Cards) <!-- id: 7 -->
  - Created Button component with shadcn/ui patterns and variants (default, destructive, outline, secondary, ghost, link)
  - Created Input component with focus states and accessibility features
  - Created Card component with subcomponents (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
  - All components use existing theme variables (no custom colors or styles)
  - Installed dependencies: @radix-ui/react-slot, class-variance-authority
  - Components are generic and reusable (no product-specific logic)
  - Verified successful build
- [x] Build Header & Footer (Responsive) <!-- id: 8 -->
  - Created Header component: Brand name "CALM FORM", navigation (Shop, About), account/cart icons
  - Created Footer component: Brand name, descriptor "Clean skincare essentials", links (Shipping, Privacy, Terms), copyright
  - Created CheckoutHeader component: Minimal logo-only header for distraction-free checkout
  - Mobile-first responsive design: Navigation moves below header on mobile
  - Installed lucide-react for icons (User, ShoppingBag)
  - Updated ShopLayout to use Header and Footer
  - Updated AccountLayout to use Header
  - Updated CheckoutLayout to use CheckoutHeader
  - Created placeholder pages: /about, /shipping, /privacy, /terms
  - All components use Server Components (default)
  - Uses existing typography and color tokens only (no custom styling)
  - Verified successful build (12 routes generated)

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
