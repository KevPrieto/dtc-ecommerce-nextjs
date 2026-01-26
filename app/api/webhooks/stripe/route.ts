import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Ensure the webhook is never cached
export const dynamic = "force-dynamic";

/**
 * Stripe client (lazy, safe for build)
 */
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }

  return new Stripe(secretKey, {
    // Explicitly cast to prevent TypeScript version mismatch during build
    apiVersion: "2025-12-15.clover" as any,
    typescript: true,
  });
}

/**
 * Supabase service role client (required for webhook writes)
 */
function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase environment variables not configured");
  }

  if (!/^https?:\/\//.test(supabaseUrl)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL: "${supabaseUrl}". Must include https://`
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function POST(request: Request) {
  // Init Stripe
  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch (error) {
    console.error("[Stripe Webhook] Stripe not configured:", error);
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  // Init Supabase
  let supabase;
  try {
    supabase = getSupabase();
  } catch (error) {
    console.error("[Stripe Webhook] Supabase not configured:", error);
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET missing");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Invalid signature: ${err.message}` },
      { status: 400 }
    );
  }

  /**
   * Handle checkout completion
   */
  if (event.type === "checkout.session.completed") {
    // Explicitly cast to proper type
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
      console.warn("[Stripe Webhook] checkout.session.completed without order_id");
      return NextResponse.json({ received: true });
    }

    console.log(`[Stripe Webhook] Processing order ${orderId}`);

    // Mark order as paid
    const { error: orderError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        email: session.customer_email ?? session.customer_details?.email ?? null,
        stripe_payment_intent_id: session.payment_intent as string,
        stripe_checkout_session_id: session.id, // Ensure session ID is synced
      })
      .eq("id", orderId);

    if (orderError) {
      console.error("[Stripe Webhook] Failed to update order:", orderError);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }

    // Fetch order items for inventory management
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("product_variant_id, quantity")
      .eq("order_id", orderId);

    if (itemsError) {
      console.error("[Stripe Webhook] Failed to fetch order items:", itemsError);
      return NextResponse.json(
        { error: "Failed to fetch order items" },
        { status: 500 }
      );
    }

    // Decrement stock (best-effort)
    // We process these sequentially to avoid overwhelming the DB
    for (const item of orderItems ?? []) {
      const { error: stockError } = await supabase.rpc(
        "decrement_stock",
        {
          p_variant_id: item.product_variant_id,
          p_quantity: item.quantity,
        }
      );

      if (stockError) {
        // Log but do not fail the webhook, as the order is already paid
        console.error(
          `[Stripe Webhook] Stock decrement failed for variant ${item.product_variant_id}:`,
          stockError
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
