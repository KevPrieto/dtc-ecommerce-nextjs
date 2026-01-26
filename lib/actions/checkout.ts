"use server";

import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { CartItem } from "@/types";

// Lazy initialization to prevent build errors when env vars are missing
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-12-15.clover",
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
  const { data: variants } = await supabase
    .from("product_variants")
    .select("*, product:products(*)")
    .in("id", variantIds);

  if (!variants || variants.length !== items.length) {
    throw new Error("Some products are no longer available");
  }

  // Build Stripe line items using verified prices
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) throw new Error(`Variant ${item.variantId} not found`);

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${variant.product.name} - ${variant.name}`,
            images: variant.product.image_url
              ? [variant.product.image_url]
              : [],
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

  // Create pending order
  const { data: order, error: orderError } = await supabase
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
  await supabase.from("order_items").insert(
    items.map((item) => {
      const variant = variants.find((v) => v.id === item.variantId)!;
      return {
        order_id: order.id,
        product_variant_id: item.variantId,
        product_name: variant.product.name,
        variant_name: variant.name,
        quantity: item.quantity,
        price: variant.price,
      };
    })
  );

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    customer_email: user?.email || undefined,
    success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    metadata: {
      order_id: order.id,
    },
    shipping_address_collection: {
      allowed_countries: ["DE", "AT", "CH", "FR", "NL", "BE"],
    },
  });

  // Update order with Stripe session ID
  await supabase
    .from("orders")
    .update({ stripe_checkout_session_id: session.id })
    .eq("id", order.id);

  return { url: session.url };
}
