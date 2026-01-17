export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          {/* Header content will be added in later task */}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          {/* Footer content will be added in later task */}
        </div>
      </footer>
    </div>
  );
}
