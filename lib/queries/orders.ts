import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types";

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Order[]) || [];
}
