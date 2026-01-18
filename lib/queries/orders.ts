import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types";

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const supabase = await createClient();

  if (!supabase) {
    console.warn("[Orders] Supabase not configured - returning empty array");
    return [];
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Orders] Error fetching orders:", error.message);
    return [];
  }
  return (data as Order[]) || [];
}
