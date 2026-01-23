import Link from "next/link";

export function CheckoutHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-center px-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          CALM FORM
        </Link>
      </div>
    </header>
  );
}
