export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          {/* Minimal header - logo only */}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
