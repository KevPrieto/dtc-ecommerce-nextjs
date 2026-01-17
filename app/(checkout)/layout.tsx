import { CheckoutHeader } from "@/components/layout/checkout-header";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <CheckoutHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
