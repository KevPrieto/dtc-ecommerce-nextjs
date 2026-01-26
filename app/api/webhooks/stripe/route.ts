import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

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

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase environment variables not configured");
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

export async function POST(request: Request) {
  // Check if Stripe is configured
  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch {
    console.error("[Stripe Webhook] Stripe not configured");
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch {
    console.error("[Stripe Webhook] Supabase not configured");
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      // Update order status to paid
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: "paid",
          email: session.customer_email || session.customer_details?.email,
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .eq("id", orderId);

      if (updateError) {
        console.error("Error updating order:", updateError);
      }

      // Decrement stock for each order item
      const { data: orderItems } = await supabase
        .from("order_items")
        .select("product_variant_id, quantity")
        .eq("order_id", orderId);

      if (orderItems) {
        for (const item of orderItems) {
          await supabase.rpc("decrement_stock", {
            p_variant_id: item.product_variant_id,
            p_quantity: item.quantity,
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
