# Project Tracker: DTC Ecommerce "VÉRA"

> **Brand Identity (LOCKED)**
> - Premium · Minimal · Clinical · 100% Natural
> - **Core Promise:** 100% natural ingredients from nature
> - All products feature natural, plant-based formulations

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
  - Added graceful degradation: clients return null if env vars missing (safe mode)
  - App can now build and run without Supabase configured (degraded state)
  - Verified successful build
  - 🚨 BLOCKER: Supabase not configured - requires PC setup before data features work

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
  - Created Header component: Brand name "VÉRA", navigation (Shop, About), account/cart icons
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
- [x] Design Database Schema (Products, Orders, Profiles) <!-- id: 9 -->
  - Designed 5-table schema: profiles, products, product_variants, orders, order_items
  - All tables use Supabase/Postgres conventions (UUIDs, timestamptz, proper foreign keys)
  - Supports product browsing with variants (size, skin type)
  - Supports guest checkout (orders.user_id nullable)
  - Preserves historical data (denormalized product names and prices in order_items)
  - Currency stored in cents (integer) to avoid floating-point issues
  - Soft deletes via is_active flags
  - Created comprehensive documentation: docs/database-schema.md
  - Schema includes relationships, indexes, design rationale, and explicit exclusions
  - Verified internal consistency and alignment with architecture.md
- [x] Finalize Seed Script Content for VÉRA Products <!-- id: 10 -->
  - Replaced all "CALM FORM" references with "VÉRA" across codebase
  - Finalized 8 individual products + 2 bundles (AM/PM routines)
  - Products: Gentle Cleansing Gel, Hydrating Essence, Hyaluronic Serum, Vitamin C Serum, Daily Moisturizer, Eye Repair Cream, Mineral Sunscreen SPF 50, Barrier Repair Oil
  - Bundles: AM Routine Set, PM Routine Set
  - Wrote clinical, benefit-focused descriptions (1-2 sentences each)
  - Confirmed pricing: €28-€72 individual, €128-€132 bundles
  - Total: 10 products, 15 variants ready for seeding
  - Images: Set to null (UI fallback strategy)
- [x] Implement Server-Side Product Fetching <!-- id: 11 -->
  - Created lib/products.ts with getProducts, getProductsWithVariants, getProductBySlug, getProductsByCategory, getCategories
  - Added formatPrice, getLowestPrice, getPriceRange utilities
  - All functions return empty arrays/null gracefully when Supabase not configured
  - Fixed Stripe SDK lazy initialization in webhook and checkout to prevent build crashes
  - Fixed null checks in auth.ts, orders.ts, lib/queries/products.ts
  - Updated Stripe API version to "2025-12-15.clover"
  - Build verified successful
- [x] Build Product Listing Page (PLP) <!-- id: 12 -->
  - Already implemented: app/(shop)/products/page.tsx
  - ProductGrid, ProductCard, CategoryFilter components exist
  - Category filtering via URL params
  - Responsive grid layout (2-4 columns)
  - Price display with "From" prefix for multiple variants
- [x] Build Product Detail Page (PDP) with Variants <!-- id: 13 -->
  - Already implemented: app/(shop)/products/[slug]/page.tsx
  - ProductDetails, VariantSelector, AddToCartButton components exist
  - Metadata generation for SEO
  - Image placeholder fallback
  - Shipping and returns info displayed

## Phase 3: Cart & Checkout Logic
- [x] Implement Cart Store (Zustand/Context - Client Side) <!-- id: 14 -->
  - Already implemented: stores/cart-store.ts
  - Zustand with persist middleware (localStorage, key: vera-cart)
  - Actions: addItem, removeItem, updateQuantity, clearCart, open/close/toggle cart
  - Computed: getItemCount, getSubtotal
- [x] Build Cart Drawer/Page <!-- id: 15 -->
  - Already implemented: app/(checkout)/cart/page.tsx
  - Components: cart-drawer.tsx, cart-icon.tsx, cart-item.tsx
  - Empty state with "Continue Shopping" link
  - Order summary with subtotal and checkout button
- [x] Integrate Stripe Checkout (Test Mode) <!-- id: 16 -->
  - Already implemented: lib/actions/checkout.ts with createCheckoutSession
  - CheckoutButton component in components/checkout/
  - Stripe webhook handler in app/api/webhooks/stripe/
  - Orders created in pending state, updated to paid via webhook
  - BLOCKED: Stripe env vars not configured (requires PC)
- [x] Create Order Success Page <!-- id: 17 -->
  - Already implemented: app/(checkout)/checkout/success/page.tsx
  - Shows confirmation with CheckCircle icon
  - Links to continue shopping and view orders

## Phase 4: Authentication & User Accounts
- [x] Implement Supabase Auth (Sign Up, Login, Guest) <!-- id: 18 -->
  - Already implemented: lib/actions/auth.ts with signUp, signIn, signOut, getUser
  - LoginForm and RegisterForm components exist
  - Guest checkout supported (no forced registration)
  - BLOCKED: Supabase env vars not configured (requires PC)
- [x] Build Account Dashboard (Order History) <!-- id: 19 -->
  - Already implemented: app/(account)/orders/page.tsx
  - OrderList component displays user orders
  - Auth check redirects to login if not authenticated
- [x] Protect Account Routes (Middleware) <!-- id: 20 -->
  - Created: middleware.ts with Supabase SSR auth
  - Protects /orders and /account routes
  - Redirects unauthenticated users to login
  - Allows guest checkout (checkout routes unprotected)
  - Graceful degradation when Supabase not configured

## Phase 5: Polish & Deployment
- [x] Verify Mobile Responsiveness <!-- id: 21 -->
  - All layouts use responsive Tailwind classes
  - Product grid: 2-col mobile, 3-col tablet, 4-col desktop
  - Mobile navigation exists in header
  - Cart drawer designed for mobile use
- [x] Fix Critical UI/UX Bugs <!-- id: 22 -->
  - Fixed all TypeScript build errors
  - Fixed Stripe API version compatibility
  - Fixed null checks for graceful degradation
  - Build compiles successfully
- [ ] Final Deployment to Vercel <!-- id: 23 --> [BLOCKED: Requires PC 🖥️]
  - Requires: Environment variables configured
  - Requires: Supabase project setup
  - Requires: Stripe account and keys
- [x] Final Review against PRD <!-- id: 24 -->
  - All core features implemented per PRD
  - Catalog, Cart, Checkout flow complete
  - Auth and Account pages complete
  - Premium, minimal, clinical design maintained

## Phase 8: Visual Impact & Desirability (CRITICAL)
- [ ] Rework ALL Hover Animations <!-- id: 32 -->
  - Goal: Clearly perceptible, premium hover states
  - Scale: 1.03–1.06 range
  - Light sweep or highlight on hover
  - Soft shadow expansion
  - Motion duration: 400–700ms
  - Easing: cubic-bezier(0.16, 1, 0.3, 1)
  - Applied to: Cards, buttons, links, images
- [ ] Introduce Presence Animations <!-- id: 33 -->
  - Goal: Elements feel alive even at rest
  - Very subtle idle movement OR light shimmer
  - NOT gimmicky — must feel intentional
  - Respects prefers-reduced-motion
- [ ] Replace Flat Cards with Depth System <!-- id: 34 -->
  - Layered surfaces with elevation
  - Soft ambient shadows (neutral only)
  - Light elevation on hover
  - No neon or colorful glows
  - Clear foreground vs background separation

## Phase 9: Product Imagery System (CRITICAL)
- [ ] Replace ALL Product Placeholders with Branded VÉRA Imagery <!-- id: 39 -->
  - Generate 10 product images via AI
  - Each image must represent its category clearly
  - Visible VÉRA branding on each bottle
  - Must look like REAL products, not generic containers
- [ ] Define Photography System (Consistency) <!-- id: 40 -->
  - Same background tone (warm neutral)
  - Same lighting direction (soft, 45-degree key)
  - Same camera distance (product fills ~70% frame)
  - Same shadow softness (diffused, minimal)
  - Same framing (centered, slight elevation angle)

## Phase 10: Hero Video (Portada)
- [ ] Create Premium Brand Hero Video <!-- id: 41 -->
  - Minimal, slow motion
  - Abstract skincare textures OR product movement
  - Editorial pacing
  - No stock-feeling transitions
  - Muted, clinical color grading
  - Loop seamlessly

## Phase 11: Typography & Editorial Rhythm
- [ ] Increase Typographic Contrast <!-- id: 42 -->
  - Headlines: Confident, calm, larger
  - Body text: Breathing room (line-height + spacing)
  - Clear visual hierarchy between headings
- [ ] Introduce Editorial Rhythm <!-- id: 43 -->
  - Intentional whitespace (luxury spacing)
  - Clear section separation
  - Visual "pauses" like luxury brands
  - No cramped layouts

## Phase 12: Final Quality Bar (€10K STANDARD)
- [ ] Hero Section Emotional Pass <!-- id: 44 -->
  - Must stop the scroll
  - Headline contrast strong
  - CTA feels alive (breathing, hover tension)
  - Video or imagery pulls attention
- [ ] Product Cards "Desire" Pass <!-- id: 45 -->
  - Hover zoom on product images (controlled, elegant)
  - Shadow + lift on hover
  - Title/price react subtly
- [ ] Section Transitions (Scroll Narrative) <!-- id: 46 -->
  - Sections enter with staggered rhythm
  - Different animations per section type
  - Use scroll position to guide attention
- [ ] Conversion Micro-moments <!-- id: 47 -->
  - Add to cart: Clear success feedback
  - CTA hover: Premium feel
  - Navigation: Polish interactions
- [ ] Final Professional Validation <!-- id: 48 -->
  - Validation question: "Would this site make a client trust me with a €10k+ ecommerce build?"
  - Compare to: Huly.io, Linear.app, Stripe.com
  - If NO → task stays OPEN

## Phase 13: Ralph Wiggum Autopilot Mode
### Group 1: Hero Video Integration
- [x] Integrate the hero video into the homepage Hero section <!-- id: 49 -->
- [ ] Ensure performance, autoplay muted, no audio, graceful fallback <!-- id: 50 -->
- [ ] Ensure it aligns with premium / clinical aesthetic <!-- id: 51 -->

### Group 2: Product Card Navigation Fix
- [ ] Fix product cards so ALL products correctly navigate to their PDP <!-- id: 52 -->
- [ ] Verify slug usage, routing, and Link correctness <!-- id: 53 -->
- [ ] Validate navigation for Clinical + Botanical products <!-- id: 54 -->

### Group 3: Product Image Mapping & Collections
- [ ] Map new images to Botanical Collection products <!-- id: 55 -->
- [ ] Map Clinical Collection images consistently <!-- id: 56 -->
- [ ] Ensure correct rendering in all relevant sections (homepage, collections, PDP) <!-- id: 57 -->

