import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth";
import { getOrdersByUser } from "@/lib/queries/orders";
import { OrderList } from "@/components/account/order-list";

export const metadata = {
  title: "Order History | CALM FORM",
};

export default async function OrdersPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await getOrdersByUser(user.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Order History</h1>
      <OrderList orders={orders} />
    </div>
  );
}
