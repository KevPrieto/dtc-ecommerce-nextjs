# Checkout Setup Instructions

## Issue
Checkout is currently failing because Supabase RLS (Row Level Security) policies need to be configured.

## Solution
You have two options to make checkout work:

---

## Option 1: Configure Service Role Key (Recommended for Production)

Add the service role key to your `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find it:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the `service_role` key (marked as "secret")

**Pros:**
- Bypasses RLS completely for checkout operations
- Simpler setup
- More control

**Cons:**
- Requires secure environment variable management
- Service role key has full database access

---

## Option 2: Configure RLS Policies (Recommended for Development)

Run the SQL script to set up proper RLS policies:

**Steps:**
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Open `scripts/setup-rls-policies.sql` from this repo
4. Copy the entire script
5. Paste it into the SQL Editor
6. Click "Run"

**What this does:**
- Allows authenticated users to create orders with their user_id
- Allows anonymous users to create orders for guest checkout (user_id = NULL)
- Allows users to create order_items linked to their orders
- Allows updating orders to add Stripe session ID
- Restricts users to only see/modify their own orders

**Pros:**
- More secure (principle of least privilege)
- No service role key needed
- Better for shared/development environments

**Cons:**
- Requires SQL configuration in Supabase
- More complex setup

---

## Current Behavior

The app will automatically:
1. **Try to use service role key** if `SUPABASE_SERVICE_ROLE_KEY` is configured
2. **Fall back to regular client** if not configured
3. **Log which method is being used** in the console

If using the regular client, RLS policies MUST be configured (Option 2) or checkout will fail with a 42501 error.

---

## Verification

After setup, test checkout:
1. Add items to cart
2. Go to checkout
3. If you see "Checkout system is not fully configured" → RLS policies are not set up correctly
4. Check browser console and server logs for detailed error messages

---

## Production Deployment

For production (Vercel), use **Option 1** (Service Role Key):
- Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables
- This is the recommended production approach
- Vercel automatically secures environment variables
