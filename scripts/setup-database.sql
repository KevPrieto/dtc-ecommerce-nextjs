-- ============================================
-- VÉRA Ecommerce - Complete Database Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- STEP 1: CREATE TABLES
-- ============================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
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

-- 2. PRODUCT VARIANTS TABLE
CREATE TABLE IF NOT EXISTS product_variants (
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

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
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

-- 5. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_variant_id uuid NOT NULL REFERENCES product_variants(id),
  product_name text NOT NULL,
  variant_name text NOT NULL,
  quantity integer NOT NULL,
  price integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================
-- STEP 2: CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_product_variants_is_active ON product_variants(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ============================================
-- STEP 3: ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 4: CREATE RLS POLICIES
-- ============================================

-- Products: Anyone can read active products
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (is_active = true);

-- Product Variants: Anyone can read active variants
DROP POLICY IF EXISTS "Product variants are viewable by everyone" ON product_variants;
CREATE POLICY "Product variants are viewable by everyone"
  ON product_variants FOR SELECT
  USING (is_active = true);

-- Profiles: Users can only see their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Orders: Users can see their own orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Order Items: Users can see items for their orders
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (order_id IN (SELECT id FROM orders WHERE user_id = auth.uid()));

-- ============================================
-- STEP 5: SEED PRODUCT DATA
-- ============================================

-- Clear existing data (safe for fresh setup)
DELETE FROM product_variants;
DELETE FROM products;

-- 1. Gentle Cleansing Gel
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'Gentle Cleansing Gel',
  'gentle-cleansing-gel',
  'A pH-balanced gel cleanser that removes impurities without disrupting the skin barrier. Suitable for daily AM/PM use.',
  NULL,
  'cleansers',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '100ml', 'CLN-GEL-100', 2800, 50, true FROM products WHERE slug = 'gentle-cleansing-gel';

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '200ml', 'CLN-GEL-200', 4200, 50, true FROM products WHERE slug = 'gentle-cleansing-gel';

-- 2. Hydrating Essence
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'Hydrating Essence',
  'hydrating-essence',
  'A lightweight liquid treatment that prepares skin for subsequent steps. Enhances absorption and balances hydration levels.',
  NULL,
  'treatments',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '100ml', 'ESS-HYD-100', 3200, 50, true FROM products WHERE slug = 'hydrating-essence';

-- 3. Hyaluronic Serum
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'Hyaluronic Serum',
  'hyaluronic-serum',
  'A concentrated serum with multi-weight hyaluronic acid. Delivers deep hydration and supports skin plumpness.',
  NULL,
  'treatments',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '30ml', 'SER-HYD-30', 4500, 50, true FROM products WHERE slug = 'hyaluronic-serum';

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '50ml', 'SER-HYD-50', 6800, 50, true FROM products WHERE slug = 'hyaluronic-serum';

-- 4. Vitamin C Serum
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'Vitamin C Serum',
  'vitamin-c-serum',
  'A stabilized vitamin C formula that targets uneven tone and dullness. Supports a brighter, more even complexion.',
  NULL,
  'treatments',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '30ml', 'SER-VTC-30', 4800, 50, true FROM products WHERE slug = 'vitamin-c-serum';

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '50ml', 'SER-VTC-50', 7200, 50, true FROM products WHERE slug = 'vitamin-c-serum';

-- 5. Daily Moisturizer
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'Daily Moisturizer',
  'daily-moisturizer',
  'A lightweight, non-comedogenic moisturizer that locks in hydration. Available in formulations optimized for different skin types.',
  NULL,
  'moisturizers',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '50ml — Normal Skin', 'MOI-DAY-50-NRM', 3800, 50, true FROM products WHERE slug = 'daily-moisturizer';

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '50ml — Dry Skin', 'MOI-DAY-50-DRY', 3800, 50, true FROM products WHERE slug = 'daily-moisturizer';

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '50ml — Oily Skin', 'MOI-DAY-50-OIL', 3800, 50, true FROM products WHERE slug = 'daily-moisturizer';

-- 6. Eye Repair Cream
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'Eye Repair Cream',
  'eye-repair-cream',
  'A targeted treatment for the delicate eye area. Addresses fine lines, puffiness, and dark circles with peptide-rich formula.',
  NULL,
  'moisturizers',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '15ml', 'EYE-REP-15', 4200, 50, true FROM products WHERE slug = 'eye-repair-cream';

-- 7. Mineral Sunscreen SPF 50
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'Mineral Sunscreen SPF 50',
  'mineral-sunscreen-spf50',
  'Broad-spectrum mineral protection with zinc oxide. Lightweight, non-whitening formula suitable for daily wear under makeup.',
  NULL,
  'sun-protection',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '50ml', 'SUN-MIN-50', 3600, 50, true FROM products WHERE slug = 'mineral-sunscreen-spf50';

-- 8. Barrier Repair Oil
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'Barrier Repair Oil',
  'barrier-repair-oil',
  'A botanical oil blend that restores and strengthens the skin barrier. Best used as the final step in evening routines.',
  NULL,
  'treatments',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, '30ml', 'OIL-BAR-30', 4600, 50, true FROM products WHERE slug = 'barrier-repair-oil';

-- 9. AM Routine Set (Bundle)
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'AM Routine Set',
  'am-routine-set',
  'Complete morning routine for protection and radiance. Includes: Gentle Cleansing Gel, Vitamin C Serum, Daily Moisturizer, and Mineral Sunscreen SPF 50.',
  NULL,
  'bundles',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, 'Complete Set', 'BUN-AM-SET', 12800, 30, true FROM products WHERE slug = 'am-routine-set';

-- 10. PM Routine Set (Bundle)
INSERT INTO products (name, slug, description, image_url, category, is_active)
VALUES (
  'PM Routine Set',
  'pm-routine-set',
  'Complete evening routine for repair and nourishment. Includes: Gentle Cleansing Gel, Hydrating Essence, Hyaluronic Serum, and Barrier Repair Oil.',
  NULL,
  'bundles',
  true
);

INSERT INTO product_variants (product_id, name, sku, price, stock, is_active)
SELECT id, 'Complete Set', 'BUN-PM-SET', 13200, 30, true FROM products WHERE slug = 'pm-routine-set';

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 'Tables created: ' || count(*)::text FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('products', 'product_variants', 'profiles', 'orders', 'order_items');
SELECT 'Products seeded: ' || count(*)::text FROM products;
SELECT 'Variants seeded: ' || count(*)::text FROM product_variants;
