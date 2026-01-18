# Seed Data Plan - VÉRA Products

**Status:** ✅ CONTENT FINALIZED
**Task:** #10 - Finalize Seed Script Content for VÉRA Products

---

## Overview

This document outlines the structure for seeding the VÉRA product catalog.

**Total Products:** 10 (8 individual + 2 bundles)
**Total Variants:** 23 SKUs

---

## Product Structure

### Individual Products (8)

| # | Product | Category | Variants | Purpose |
|---|---------|----------|----------|---------|
| 1 | Gentle Cleansing Gel | cleansers | 2 sizes (100ml, 200ml) | Daily cleansing |
| 2 | Hydrating Essence | treatments | 1 size (100ml) | Prep + hydration |
| 3 | Hydrating Serum | treatments | 2 sizes (30ml, 50ml) | Deep hydration |
| 4 | Brightening Serum | treatments | 2 sizes (30ml, 50ml) | Vitamin C, brightening |
| 5 | Daily Moisturizer | moisturizers | 3 skin types (Normal, Dry, Oily) | Daily hydration |
| 6 | Revitalizing Eye Cream | moisturizers | 1 size (15ml) | Eye area treatment |
| 7 | Mineral Sunscreen SPF 50 | sun-protection | 1 size (50ml) | Daily sun protection |
| 8 | Nourishing Face Oil | treatments | 1 size (30ml) | PM nourishment |

**Subtotal:** 8 products, 13 variants

### Bundles (2)

| # | Bundle | Contents | Variant | Price Strategy |
|---|--------|----------|---------|----------------|
| 9 | AM Routine Bundle | Cleanser + Brightening Serum + Daily Moisturizer + Sunscreen | Complete Set | ~15% discount |
| 10 | PM Routine Bundle | Cleanser + Hydrating Essence + Hydrating Serum + Face Oil | Complete Set | ~15% discount |

**Subtotal:** 2 bundles, 2 variants

---

## Category Breakdown

1. **cleansers** - 1 product (Cleanser)
2. **treatments** - 4 products (Essence, 2 Serums, Face Oil)
3. **moisturizers** - 2 products (Daily Moisturizer, Eye Cream)
4. **sun-protection** - 1 product (Sunscreen)
5. **bundles** - 2 products (AM/PM Routines)

---

## Variant Strategy

### Size Variants
- **Small (15-30ml):** Eye Cream, Face Oil, Serum travel sizes
- **Standard (50ml):** Most serums, moisturizers, sunscreen
- **Large (100-200ml):** Cleansers, essences

### Skin Type Variants
- **Applied to:** Daily Moisturizer only
- **Options:** Normal, Dry, Oily (3 variants at same price)
- **Rationale:** Allows personalization without complexity

### Bundle Variants
- **Fixed composition:** Each bundle = 1 variant (no customization)
- **Pricing:** ~15% discount vs individual purchase
- **Naming:** "Complete Set"

---

## Pricing Structure (PLACEHOLDER)

**Current placeholder prices are illustrative only and need approval.**

### Price Ranges by Category
- **Cleansers:** €28-42 (size-based)
- **Essences:** €32 (single size)
- **Serums:** €45-72 (size-based)
- **Moisturizers:** €38-42 (skin type variants at same price)
- **Eye Cream:** €42 (premium, small volume)
- **Sunscreen:** €36 (daily essential)
- **Face Oil:** €46 (premium treatment)
- **Bundles:** €128-132 (15% discount)

### Pricing Philosophy (to be confirmed)
- Premium positioning (€35-75 range for individual products)
- Size-based pricing (larger = better value per ml)
- Skin type variants at same price (no premium for customization)
- Bundle discount encourages routine adoption

---

## SKU Naming Convention

**Format:** `[CATEGORY]-[TYPE]-[SIZE]-[VARIANT]`

**Examples:**
- `CLN-GEL-100` - Cleanser, Gel, 100ml
- `SER-HYD-30` - Serum, Hydrating, 30ml
- `MOI-DAY-50-DRY` - Moisturizer, Day, 50ml, Dry Skin
- `BUN-AM-SET` - Bundle, AM Routine, Complete Set

**Benefits:**
- Readable by humans
- Unique identifiers
- Easy inventory tracking
- Sortable alphabetically

---

## Stock Levels (Initial)

- **Individual products:** 50 units per variant
- **Bundles:** 30 units per bundle
- **Rationale:** Conservative initial inventory for demo purposes

---

## Image Strategy (PLACEHOLDER)

**Current:** All `image_url` fields set to `null`

**Options for final implementation:**
1. Use placeholder image service (e.g., placeholder.com)
2. Upload stock photos to Supabase Storage
3. Generate AI product images
4. Leave null and display fallback in UI

**Recommendation:** Decide based on visual polish requirements.

---

## What Needs Approval

### 1. Product Names
All names currently marked `[PLACEHOLDER]`. Need:
- Brand-appropriate names
- Descriptive but minimal
- Premium positioning
- Clinical tone (per VÉRA brand)

### 2. Product Descriptions
All descriptions currently marked `[PLACEHOLDER]`. Need:
- 1-2 sentence descriptions
- Benefit-focused (not ingredient-heavy)
- Clinical, calm tone
- No marketing hype

### 3. Pricing
All prices currently placeholders. Need:
- Confirmation of price points
- Bundle discount strategy
- Currency (assuming EUR)

### 4. Images
Need decision on:
- Use placeholders vs real images
- Image sourcing strategy
- Storage location (Supabase Storage vs CDN)

---

## Next Steps

1. **Approve/revise product structure** (categories, variants)
2. **Finalize product names and descriptions**
3. **Confirm pricing strategy**
4. **Decide on image strategy**
5. **Create Supabase migrations** (if not already done)
6. **Run seed script to populate database**
7. **Verify data in Supabase dashboard**

---

## Technical Notes

**File:** `scripts/seed-products.ts`

**Features:**
- Type-safe product seed data structure
- Automatic product + variant insertion
- Error handling and logging
- Can be run directly with `ts-node` or via npm script
- Idempotent (can be re-run safely if needed)

**Dependencies:**
- Requires Supabase tables to exist first
- Uses `@/lib/supabase/server` client
- Assumes schema from `docs/database-schema.md`

**Usage:**
```bash
# After finalizing content and creating DB tables
npm run seed:products
```

---

## Validation Checklist

Before running seed script:

- [ ] Database tables created (products, product_variants)
- [ ] Product names finalized
- [ ] Product descriptions finalized
- [ ] Prices confirmed
- [ ] Image strategy decided
- [ ] SKU naming convention approved
- [ ] Stock levels appropriate
- [ ] Supabase environment variables configured

---

**Status:** Ready for content approval
**Blocked on:** Final product copy and pricing decisions
