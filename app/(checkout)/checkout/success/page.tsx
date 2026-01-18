import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export const metadata = {
  title: "Order Confirmed | VÉRA",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
      <h1 className="text-2xl font-semibold mb-4">Thank you for your order</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        We&apos;ve received your order and will send you an email confirmation
        shortly. Your order will be processed within 1-2 business days.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  );
}
