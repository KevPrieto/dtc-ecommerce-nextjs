# Database Setup Guide

This guide explains how to set up the CALM FORM database and seed it with product data.

## Prerequisites

- Supabase project created
- Supabase CLI installed (optional, for migrations)
- Environment variables configured in `.env.local`

## Step 1: Configure Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

See `.env.local.example` for reference.

## Step 2: Run Database Migration

You have two options to create the database schema:

### Option A: Using Supabase CLI (Recommended)

```bash
# Link to your Supabase project
npx supabase link --project-ref your-project-ref

# Apply migrations
npx supabase db push
```

### Option B: Manual SQL Execution

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `supabase/migrations/20260122000000_create_ecommerce_schema.sql`
4. Paste and execute in the SQL Editor

This will create the following tables:
- `profiles` - User profile data
- `products` - Product catalog
- `product_variants` - Product SKUs with pricing
- `orders` - Order headers
- `order_items` - Order line items

## Step 3: Install Dependencies

```bash
npm install
```

This installs `tsx` which is required to run the TypeScript seed script.

## Step 4: Seed Products

Run the product seed script to populate the database with CALM FORM products:

```bash
npm run seed:products
```

This will insert:
- 8 individual skincare products
- 2 routine bundles (Morning & Evening)
- 23 total product variants

Expected output:
```
🌱 Starting product seed...
📦 Seeding 10 products...
✅ Created product: Gentle Cleansing Gel
  ↳ Created variant: 100ml (CLN-GEL-100)
  ↳ Created variant: 200ml (CLN-GEL-200)
...
✨ Product seed complete!
```

## Step 5: Verify Data

You can verify the data was inserted correctly:

### Option A: Supabase Dashboard

1. Open your Supabase project dashboard
2. Navigate to Table Editor
3. Check the `products` and `product_variants` tables

### Option B: SQL Query

Run this query in the SQL Editor:

```sql
SELECT
  p.name as product_name,
  p.category,
  pv.name as variant_name,
  pv.sku,
  pv.price / 100.0 as price_euros,
  pv.stock
FROM products p
JOIN product_variants pv ON p.id = pv.product_id
WHERE p.is_active = true
ORDER BY p.category, p.name, pv.name;
```

You should see 23 rows (product variants).

## Troubleshooting

### Error: "relation 'products' does not exist"

The migration has not been applied. Run Step 2 again.

### Error: "duplicate key value violates unique constraint"

The seed script has already been run. Either:
1. Skip seeding (data already exists)
2. Manually delete existing data from `product_variants` and `products` tables
3. Reset the database (warning: deletes all data)

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"

Environment variables are not configured. Check `.env.local` exists and contains correct values.

### Seed script hangs or times out

Check that:
1. Supabase project is running
2. Network connection is stable
3. Service role key has correct permissions

## Re-seeding (Development Only)

To reset and re-seed the database during development:

```sql
-- WARNING: Deletes all product data
TRUNCATE products, product_variants RESTART IDENTITY CASCADE;
```

Then run:
```bash
npm run seed:products
```

## Next Steps

After database setup is complete:
1. ✅ Database schema created
2. ✅ Product data seeded
3. → Continue with Task #11: Implement Server-Side Product Fetching
4. → Build product listing and detail pages

See `TRACKER.md` for full project roadmap.
