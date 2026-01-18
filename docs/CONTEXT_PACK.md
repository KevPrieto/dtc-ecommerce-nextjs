# CONTEXT_PACK — Single Source of Truth

> **Purpose:** Eliminate context drift across devices (PC / Mobile / Claude sessions).
> **Status:** LOCKED — Facts only. No speculative improvements.

---

## 1. Project Identity (LOCKED)

| Key | Value |
|-----|-------|
| **Brand Name** | **VÉRA** (LOCKED) |
| **Deprecated Names** | "CALM FORM" — working name, must not be reintroduced |
| **Project Type** | DTC ecommerce demo |
| **Purpose** | Portfolio project for Upwork client acquisition |
| **Product Domain** | Premium clean skincare |
| **Brand Positioning** | Premium · Minimal · Clinical |

---

## 2. Tech Stack (LOCKED)

| Layer | Technology | Status |
|-------|------------|--------|
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui | ✅ Configured |
| **State Management** | Zustand (cart) | ❌ Not yet implemented |
| **Backend** | Supabase (PostgreSQL, Auth) | ⚠️ Clients created, not yet configured |
| **Payments** | Stripe Checkout | ❌ Not yet configured |
| **Deployment** | Vercel | ❌ Not yet deployed |

---

## 3. Repository Architecture (FACTUAL)

### App Router Structure

```
app/
├── (shop)/      → Standard Header/Footer layout (browsing)
├── (auth)/      → Centered layout (login/signup)
├── (checkout)/  → Minimal layout (distraction-free, logo only)
├── (account)/   → Sidebar layout (user dashboard)
├── api/         → Route handlers (webhooks, auth callback)
├── layout.tsx   → Root layout (providers, global styles)
└── page.tsx     → Landing page
```

### Key Folders

| Folder | Responsibility |
|--------|---------------|
| `app/` | Next.js App Router pages and layouts |
| `components/` | UI primitives (`ui/`), shop components (`shop/`), layout (`layout/`), account (`account/`) |
| `lib/` | Supabase clients, Stripe SDK, utilities |
| `stores/` | Zustand cart store (client-side state) |
| `scripts/` | Seed scripts (e.g., `seed-products.ts`) |
| `docs/` | Project documentation (PRD, architecture, schema) |
| `types/` | Shared TypeScript definitions |
| `styles/` | Global CSS (Tailwind imports) |

### Server vs Client Components

- **Default:** Server Components (all catalog browsing, data fetching)
- **Client Components:** Cart interactions, interactive forms, modals, Stripe Elements

---

## 4. Current Project Status (FACTUAL)

| Key | Value |
|-----|-------|
| **Current Phase** | Phase 2 — Data Layer |
| **Completion** | **30%** |
| **Last Commit** | da45300 |
| **Active Branch** | main |

### Fully Implemented

- Project initialization (Next.js 15, TypeScript, App Router)
- Tailwind CSS + shadcn/ui configuration
- Typography & color palette (premium minimal aesthetic)
- Route group layouts: `(shop)`, `(auth)`, `(checkout)`, `(account)`
- Core UI components: Button, Input, Card
- Header & Footer (responsive)
- Supabase client setup (server + browser, graceful degradation)
- Database schema design
- Seed script with finalized content (10 products, 15 variants)

### Partially Implemented

- Supabase clients created — not connected to live project (requires PC configuration)

### Not Yet Implemented

- Server-side product fetching (Task #11)
- Product Listing Page / Product Detail Page (Tasks #12-13)
- Cart store with Zustand (Task #14)
- Stripe Checkout integration (Task #16)
- Supabase Auth (Task #18)
- Account dashboard (Task #19)
- Route protection middleware (Task #20)
- Vercel deployment (Task #23)

---

## 5. Data Model Snapshot (FACTUAL)

| Table | Purpose |
|-------|---------|
| `profiles` | Extends `auth.users` with profile data |
| `products` | Base product catalog (name, slug, description, category) |
| `product_variants` | Purchasable SKUs with size/type and pricing |
| `orders` | Order headers with payment status |
| `order_items` | Line items with historical product/price data |

### Key Design Decisions

- **Guest checkout:** `orders.user_id` nullable, `orders.email` required
- **Currency:** All prices in cents (integer)
- **Soft deletes:** `is_active` flags on products/variants
- **Historical preservation:** Product names and prices denormalized in `order_items`

> **Reference:** [docs/database-schema.md](./database-schema.md)

---

## 6. Seed Data Status (FACTUAL)

| Key | Value |
|-----|-------|
| **Script Location** | `scripts/seed-products.ts` |
| **Structure** | ✅ Complete (10 products, 15 variants) |
| **Content** | ✅ FINALIZED (names, descriptions, pricing) |
| **Status** | Ready to run — blocked on Supabase configuration |

### Product Catalog Summary

| Category | Products | Variants |
|----------|----------|----------|
| cleansers | 1 | 2 |
| treatments | 4 | 6 |
| moisturizers | 2 | 4 |
| sun-protection | 1 | 1 |
| bundles | 2 | 2 |
| **Total** | **10** | **15** |

> **Reference:** [docs/seed-data-plan.md](./seed-data-plan.md)

---

## 7. Tracker Alignment (FACTUAL)

| Key | Value |
|-----|-------|
| **Latest Completed Task** | Task #10 (Finalize Seed Script Content) |
| **Next Task** | Task #11 (Server-Side Product Fetching) — Requires PC |

> **Reference:** [TRACKER.md](../TRACKER.md)

### Mobile-safe Tasks

| Task | Description |
|------|-------------|
| #14 | Implement Cart Store (Zustand) |
| #15 | Build Cart Drawer/Page |
| #17 | Create Order Success Page |
| #21 | Verify Mobile Responsiveness |
| #22 | Fix Critical UI/UX Bugs |
| #24 | Final Review against PRD |

### Requires PC Access

| Task | Description |
|------|-------------|
| #11 | Implement Server-Side Product Fetching |
| #12 | Build Product Listing Page (PLP) |
| #13 | Build Product Detail Page (PDP) |
| #16 | Integrate Stripe Checkout |
| #18 | Implement Supabase Auth |
| #19 | Build Account Dashboard |
| #20 | Protect Account Routes (Middleware) |
| #23 | Final Deployment to Vercel |

---

## 8. Operational Constraints

### Mobile Claude Sessions MUST NOT

- Modify database schema
- Run migrations
- Configure Supabase or Stripe
- Deploy to Vercel

### PC Required For

- Environment variable configuration
- Stripe/Supabase integration
- Database migrations
- Running seed script
- Final deployment

---

## 9. Change Log

| Date | Change |
|------|--------|
| 2026-01-18 | Updated CONTEXT_PACK.md to reflect Task #10 completion |
| 2026-01-18 | Aligned with current state (commit da45300) |
| 2026-01-18 | Verified consistency with PROJECT_SNAPSHOT.md, TRACKER.md |

---

# Next Task Execution Plan

> **For Sonnet 4.5 / Opus 4.5 Execution**

## Immediate Next: Task #11 — Server-Side Product Fetching

### Prerequisites (PC Required)

1. **Create Supabase project** at supabase.com
2. **Configure environment variables** in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. **Create database tables** using SQL from `docs/database-schema.md`
4. **Run seed script**: `npm run seed:products` (after adding npm script)

### Implementation Steps

1. **Create TypeScript types** (`types/database.ts`)
   - Product type with all fields
   - ProductVariant type with all fields
   - ProductWithVariants combined type

2. **Create product query functions** (`lib/products.ts`)
   ```typescript
   getProducts(): Promise<ProductWithVariants[]>
   getProductBySlug(slug: string): Promise<ProductWithVariants | null>
   getProductsByCategory(category: string): Promise<ProductWithVariants[]>
   ```

3. **Handle graceful degradation**
   - Return empty arrays if Supabase not configured
   - Log warnings for debugging
   - No runtime crashes

4. **Verify data retrieval**
   - Test queries in development
   - Confirm all 10 products load correctly

### Blocked By

- Supabase project configuration (PC only)
- Environment variables not set

---

## After Task #11: Recommended Sequence

| Order | Task | Dependency |
|-------|------|------------|
| 1 | #12: Product Listing Page | Task #11 (product fetching) |
| 2 | #13: Product Detail Page | Task #11 (product fetching) |
| 3 | #14: Cart Store (Zustand) | None (can parallel) |
| 4 | #15: Cart Drawer/Page | Task #14 (cart store) |
| 5 | #16: Stripe Checkout | Tasks #14, #15 (cart ready) |

### Mobile-Parallel Option

While waiting for PC access, these tasks can be started:
- **Task #14**: Implement Zustand cart store (no Supabase dependency)
- **Task #15**: Build cart drawer UI (uses local state only)
- **Task #17**: Create order success page (static)
