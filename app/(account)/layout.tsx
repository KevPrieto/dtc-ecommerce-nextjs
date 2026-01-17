import { Header } from "@/components/layout/header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto flex flex-1 gap-8 px-4 py-8">
        <aside className="w-64">
          {/* Account navigation sidebar will be added in later task */}
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
