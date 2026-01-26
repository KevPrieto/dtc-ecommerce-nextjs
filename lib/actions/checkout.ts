"use server";

import Stripe from "stripe";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { CartItem } from "@/types";

// Lazy initialization to prevent build errors when env vars are missing
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(secretKey, {
    // Explicitly cast to prevent TypeScript version mismatch during build
    apiVersion: "2025-12-15.clover" as any,
  });
}

export async function createCheckoutSession(items: CartItem[]) {
  const supabase = await createClient();

  // Get Stripe instance
  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch {
    throw new Error("Payment service unavailable. Please try again later.");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Verify stock and get current prices from database
  const variantIds = items.map((i) => i.variantId);
  // 1. Fetch variants ONLY
  const { data: variants } = await supabase
    .from("product_variants")
    .select("*")
    .in("id", variantIds);

  if (!variants || variants.length !== items.length) {
    throw new Error("Some products are no longer available");
  }

  // 2. Fetch products separately
  const productIds = [...new Set(variants.map(v => v.product_id))];

  const { data: products } = await supabase
    .from("products")
    .select("id, name, image_url")
    .in("id", productIds);

  if (!products) {
    throw new Error("Failed to load products");
  }

  // 3. Build lookup map
  const productById = new Map(products.map(p => [p.id, p]));


  if (!variants || variants.length !== items.length) {
    throw new Error("Some products are no longer available");
  }

  // Build Stripe line items using verified prices
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) throw new Error(`Variant ${item.variantId} not found`);

      const product = productById.get(variant.product_id);
      if (!product) throw new Error(`Product ${variant.product_id} not found`);

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${product.name} - ${variant.name}`,
            images: product.image_url ? [product.image_url] : [],
          },
          unit_amount: variant.price,
        },
        quantity: item.quantity,
      };
    }
  );

  // Calculate total
  const total = lineItems.reduce(
    (sum, li) => sum + (li.price_data?.unit_amount || 0) * (li.quantity || 0),
    0
  );

  // Try to use service role client, fallback to regular client
  // Note: If using regular client, Supabase RLS policies must allow:
  //   - INSERT on orders table for authenticated and anonymous users
  //   - INSERT on order_items table for authenticated and anonymous users
  let supabaseForOrders;
  try {
    supabaseForOrders = createServiceRoleClient();
    console.log("[Checkout] Using service role client for order creation");
  } catch (error) {
    console.warn("[Checkout] Service role not available, using regular client:", error);
    supabaseForOrders = supabase;
  }

  // Create pending order
  const { data: order, error: orderError } = await supabaseForOrders
    .from("orders")
    .insert({
      user_id: user?.id || null,
      email: user?.email || "guest@checkout.pending",
      status: "pending",
      total,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Insert order items with denormalized data
  await supabaseForOrders.from("order_items").insert(
    items.map((item) => {
      const variant = variants.find((v) => v.id === item.variantId)!;
      const product = productById.get(variant.product_id);
      if (!product) throw new Error(`Product ${variant.product_id} not found`);

      return {
        order_id: order.id,
        product_variant_id: item.variantId,
        product_name: product.name,
        variant_name: variant.name,
        quantity: item.quantity,
        price: variant.price,
      };
    })
  );

  // Validate site URL
  const siteUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "");
  if (!siteUrl || !/^https?:\/\//.test(siteUrl)) {
    throw new Error(
      "Configuration Error: NEXT_PUBLIC_URL is missing or invalid in .env.local. " +
      "It allows Stripe to redirect back to the site (e.g., http://localhost:3000)"
    );
  }

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    customer_email: user?.email || undefined,
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cart`,
    metadata: {
      order_id: order.id,
    },
    shipping_address_collection: {
      allowed_countries: ["DE", "AT", "CH", "FR", "NL", "BE"],
    },
  });

  // Update order with Stripe session ID
  await supabaseForOrders
    .from("orders")
    .update({ stripe_checkout_session_id: session.id })
    .eq("id", order.id);

  return { url: session.url };
}
