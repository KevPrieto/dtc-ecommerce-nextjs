export default function AccountLayout({
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
      <div className="container mx-auto flex flex-1 gap-8 px-4 py-8">
        <aside className="w-64">
          {/* Account navigation sidebar will be added in later task */}
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
