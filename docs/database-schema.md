# Database Schema - CALM FORM Ecommerce

**Last Updated:** 2026-01-17
**Database:** Supabase (PostgreSQL)
**Purpose:** Minimal, production-realistic schema for DTC skincare ecommerce

---

## Overview

This schema supports:
- Product catalog browsing with simple variants
- Shopping cart and checkout via Stripe
- Order tracking and history
- User accounts with guest checkout support

**Design Philosophy:**
- Minimal but production-realistic
- Denormalize strategically for historical accuracy
- Use integers for currency (cents)
- Support both authenticated and guest purchases

---

## Tables

### 1. profiles

Extends Supabase `auth.users` with additional user profile data.

```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

**Purpose:** Store user profile information beyond authentication.

**Key Fields:**
- `id` - Links directly to Supabase auth.users
- `email` - Synced from auth.users for convenience
- `full_name` - Optional display name

**Indexes:**
- Primary key on `id`

---

### 2. products

Base product catalog (parent products).

```sql
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  category text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

**Purpose:** Store base product information (e.g., "Hydrating Serum").

**Key Fields:**
- `slug` - URL-friendly identifier for routing (/products/hydrating-serum)
- `is_active` - Soft delete flag (hide without breaking orders)
- `category` - Simple text categorization (no complex taxonomy)
- No price field - prices live in variants

**Indexes:**
- Primary key on `id`
- Unique index on `slug`
- Index on `is_active` for active product queries

---

### 3. product_variants

Specific SKUs with size/type variations and pricing.

```sql
CREATE TABLE product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  price integer NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

**Purpose:** Store specific purchasable SKUs with variants (e.g., "50ml", "For Dry Skin").

**Key Fields:**
- `product_id` - Links to parent product
- `name` - Variant descriptor (e.g., "50ml", "100ml")
- `sku` - Unique stock keeping unit
- `price` - **Stored in cents** (e.g., 4500 = €45.00)
- `stock` - Available inventory count

**Indexes:**
- Primary key on `id`
- Foreign key index on `product_id`
- Unique index on `sku`
- Index on `is_active`

**Notes:**
- Bundles can be modeled as products with special variants
- One level of variants only (no nested color+size combinations)

---

### 4. orders

Order headers with payment and status tracking.

```sql
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  total integer NOT NULL,
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

**Purpose:** Store order headers with payment status.

**Key Fields:**
- `user_id` - **Nullable** to support guest checkout
- `email` - Always populated (for guests and logged-in users)
- `status` - Order lifecycle state (see below)
- `total` - **Stored in cents**, preserved at time of order
- `stripe_payment_intent_id` - For payment reconciliation
- `stripe_checkout_session_id` - For checkout session tracking

**Status Values:**
- `pending` - Order created, payment incomplete
- `paid` - Payment successful
- `fulfilled` - Order shipped/completed
- `cancelled` - Order cancelled

**Indexes:**
- Primary key on `id`
- Foreign key index on `user_id`
- Index on `status` for order filtering
- Index on `created_at` for date-based queries

**Notes:**
- ON DELETE SET NULL preserves orders if user account deleted
- Shipping address handled by Stripe Checkout (not stored in DB)

---

### 5. order_items

Line items linking orders to purchased product variants.

```sql
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_variant_id uuid NOT NULL REFERENCES product_variants(id),
  product_name text NOT NULL,
  variant_name text NOT NULL,
  quantity integer NOT NULL,
  price integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

**Purpose:** Store line items with historical product/price data.

**Key Fields:**
- `order_id` - Parent order
- `product_variant_id` - Reference to purchased variant
- `product_name` - **Denormalized** snapshot at time of purchase
- `variant_name` - **Denormalized** snapshot at time of purchase
- `quantity` - Number of units purchased
- `price` - **Price per unit in cents** at time of purchase

**Indexes:**
- Primary key on `id`
- Foreign key index on `order_id`
- Foreign key index on `product_variant_id`

**Notes:**
- Immutable after creation (no updates)
- Preserves historical data even if product/variant deleted or modified
- Denormalization ensures order history remains accurate

---

## Relationships

```
┌──────────┐
│ profiles │
└────┬─────┘
     │ 1
     │
     │ 0..n
     ▼
┌─────────┐
│ orders  │
└────┬────┘
     │ 1
     │
     │ n
     ▼
┌──────────────┐       n ┌──────────────────┐       n ┌──────────┐
│ order_items  │◄─────────┤ product_variants │◄────────┤ products │
└──────────────┘          └──────────────────┘         └──────────┘
```

---

## Key Design Decisions

### 1. Currency Storage
**Decision:** Store all monetary values as integers (cents).
**Rationale:** Avoids floating-point precision errors. Standard ecommerce practice.

### 2. Guest Checkout
**Decision:** `orders.user_id` is nullable, `orders.email` is required.
**Rationale:** Allows purchases without account creation (reduces friction).

### 3. Historical Preservation
**Decision:** Denormalize product/variant names and prices in `order_items`.
**Rationale:** Orders must remain accurate even if products change or are deleted.

### 4. Soft Deletes
**Decision:** Use `is_active` flags instead of hard deletes.
**Rationale:** Maintains referential integrity with existing orders.

### 5. Variant Model
**Decision:** Single-level variants (no nested options).
**Rationale:** Sufficient for size and skin type variations. Avoids complexity.

### 6. Stripe Integration
**Decision:** Store both `payment_intent_id` and `checkout_session_id`.
**Rationale:** Enables webhook handling and payment reconciliation.

---

## Not Included (By Design)

Per PRD scope and minimal-but-realistic constraint:

- ❌ **Reviews/Ratings** - Not in scope
- ❌ **Wishlists** - Not in scope
- ❌ **Discounts/Coupons** - Not in scope
- ❌ **Shipping Addresses** - Handled by Stripe Checkout
- ❌ **Multiple Product Images** - Single `image_url` sufficient
- ❌ **Complex Category Taxonomy** - Simple text field
- ❌ **Inventory Audit Logs** - Basic stock tracking only
- ❌ **Admin Audit Trails** - Not required for demo

---

## Migration Strategy

**Recommended Approach:**
1. Use Supabase migrations for version control
2. Create tables in order: profiles → products → product_variants → orders → order_items
3. Enable Row Level Security (RLS) policies
4. Seed with CALM FORM product data

**Next Steps:**
- Task #10: Create seed script for products
- Task #11: Implement server-side product fetching
