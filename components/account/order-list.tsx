import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive"> =
  {
    pending: "secondary",
    paid: "default",
    fulfilled: "default",
    cancelled: "destructive",
  };

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No orders yet</p>
        <Link href="/products" className="text-sm underline mt-2 inline-block">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(order.created_at)}
              </p>
            </div>
            <div className="text-right">
              <Badge variant={STATUS_VARIANTS[order.status] || "secondary"}>
                {order.status}
              </Badge>
              <p className="text-sm font-medium mt-1">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
