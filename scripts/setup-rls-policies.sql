-- RLS Policies for VÉRA Ecommerce
-- Run this in Supabase SQL Editor to enable checkout without service role key

-- ============================================================================
-- ORDERS TABLE - Allow authenticated and anonymous users to create orders
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Anonymous users can insert orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can insert orders with their user_id
CREATE POLICY "Users can insert their own orders"
ON orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Anonymous users can insert orders (for guest checkout)
CREATE POLICY "Anonymous users can insert orders"
ON orders FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Policy: Users can view their own orders
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can update their own orders (for Stripe session ID)
CREATE POLICY "Users can update their own orders"
ON orders FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Anonymous users can update orders they created (for Stripe session ID)
CREATE POLICY "Anonymous users can update orders"
ON orders FOR UPDATE
TO anon
USING (user_id IS NULL);

-- ============================================================================
-- ORDER_ITEMS TABLE - Allow users to create order items for their orders
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert order items for their orders" ON order_items;
DROP POLICY IF EXISTS "Anonymous users can insert order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their order items" ON order_items;

-- Enable RLS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can insert order items for their orders
CREATE POLICY "Users can insert order items for their orders"
ON order_items FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Policy: Anonymous users can insert order items (for guest checkout)
CREATE POLICY "Anonymous users can insert order items"
ON order_items FOR INSERT
TO anon
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id IS NULL
  )
);

-- Policy: Users can view their order items
CREATE POLICY "Users can view their order items"
ON order_items FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify policies are created
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename IN ('orders', 'order_items')
ORDER BY tablename, policyname;
