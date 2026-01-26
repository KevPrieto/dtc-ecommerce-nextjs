import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">VÉRA</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Science-led skincare essentials
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            <Link
              href="/shipping"
              className="text-sm text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-foreground hover:translate-x-1"
            >
              Shipping & Returns
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-foreground hover:translate-x-1"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-foreground hover:translate-x-1"
            >
              Terms
            </Link>
          </nav>

          <div className="text-xs text-muted-foreground space-y-3">
            <p>© {currentYear} VÉRA. All rights reserved.</p>
            <p className="text-muted-foreground/60 italic max-w-2xl">
              This is a fictitious brand created by Kevin to showcase his skills. This is a model that demonstrates how I can take your products to the digital market in the best way possible.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
