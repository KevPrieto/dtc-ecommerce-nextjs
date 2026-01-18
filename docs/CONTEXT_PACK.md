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
| **Last Commit** | 7a6de0a |
| **Active Branch** | claude/execute-tracker-tasks-fEWI7 |

### Fully Implemented ✅

- Project initialization (Next.js 15, TypeScript, App Router)
- Tailwind CSS + shadcn/ui configuration
- Typography & color palette (premium minimal aesthetic)
- Route group layouts: `(shop)`, `(auth)`, `(checkout)`, `(account)`
- Core UI components: Button, Input, Card
- Header & Footer (responsive)
- Supabase client setup (server + browser)
- Database schema design

### Partially Implemented ⚠️

- Seed script structure exists (`scripts/seed-products.ts`) — content is PLACEHOLDER
- Supabase clients created — not connected to live project

### Not Yet Implemented ❌

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

> **Reference:** [database-schema.md](file:///c:/Website/ecommerce/dtc-ecommerce-nextjs/docs/database-schema.md)

---

## 6. Seed Data Status (FACTUAL)

| Key | Value |
|-----|-------|
| **Script Location** | `scripts/seed-products.ts` |
| **Structure** | ✅ Complete (10 products, 23 variants) |
| **Content** | ⚠️ PLACEHOLDER (names, descriptions, pricing) |
| **Status** | BLOCKED — pending content approval |

> **Reference:** [seed-data-plan.md](file:///c:/Website/ecommerce/dtc-ecommerce-nextjs/docs/seed-data-plan.md)

---

## 7. Tracker Alignment (FACTUAL)

| Key | Value |
|-----|-------|
| **Latest Completed Task** | Task #9 (Database Schema Design) |
| **Current Blocked Task** | Task #10 (content-dependent) |

> **Reference:** [TRACKER.md](file:///c:/Website/ecommerce/dtc-ecommerce-nextjs/TRACKER.md)

### Mobile-safe Tasks ✅

| Task | Description |
|------|-------------|
| #10 | Finalize Seed Script Content |
| #14 | Implement Cart Store (Zustand) |
| #15 | Build Cart Drawer/Page |
| #17 | Create Order Success Page |
| #21 | Verify Mobile Responsiveness |
| #22 | Fix Critical UI/UX Bugs |
| #24 | Final Review against PRD |

### Requires PC Access 🖥️

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
- Final deployment

---

## 9. Change Log

| Date | Change |
|------|--------|
| 2026-01-18 | Created `CONTEXT_PACK.md` as single source of truth |
| 2026-01-18 | Aligned with existing docs (`TRACKER.md`, `prd.md`, `architecture.md`, `database-schema.md`, `seed-data-plan.md`) |

> **Note:** `PROJECT_SNAPSHOT.md` referenced in request does not exist in repository — marked as UNKNOWN.

---

# Next Task Execution Plan

> **For Sonnet 4.5 / Opus 4.5 Execution**

## Immediate Next Task: Task #10 — Finalize Seed Script Content

### Prerequisites
- ✅ Seed script structure exists (`scripts/seed-products.ts`)
- ✅ Planning document exists (`docs/seed-data-plan.md`)
- ⚠️ Content is PLACEHOLDER — needs finalization

### Execution Steps

1. **Update brand references**
   - Replace all "CALM FORM" references with "VÉRA" across:
     - `scripts/seed-products.ts`
     - `docs/seed-data-plan.md`
     - `docs/database-schema.md`
     - Any component files (Header, Footer)

2. **Finalize product content**
   - Replace `[PLACEHOLDER]` product names with brand-appropriate names
   - Write 1-2 sentence descriptions (clinical, benefit-focused)
   - Confirm pricing in EUR cents
   - Example: `{ name: "Vitamin C Brightening Serum", price: 5200 }` (€52.00)

3. **Confirm categories**
   - `cleansers`, `treatments`, `moisturizers`, `sun-protection`, `bundles`

4. **Set image strategy**
   - Option A: Use `null` with UI fallback
   - Option B: Generate placeholder images
   - Option C: Upload to Supabase Storage (requires PC)

### Blocked By
- User approval on product names, descriptions, and pricing

### Mobile-Safe Actions ✅
- Update brand name from CALM FORM → VÉRA
- Write product descriptions
- Define pricing structure
- Update documentation

### Requires PC 🖥️
- Running seed script against Supabase
- Environment variable configuration

---

## After Task #10: Recommended PC Session Tasks

| Order | Task | Why PC Required |
|-------|------|-----------------|
| 1 | Configure Supabase project | Env vars, dashboard access |
| 2 | Run database migrations | Supabase CLI |
| 3 | Run seed script | Requires configured Supabase |
| 4 | Task #11: Product fetching | Testing requires DB connection |
| 5 | Tasks #12-13: PLP/PDP | Full development cycle |
