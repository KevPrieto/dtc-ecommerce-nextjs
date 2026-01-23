import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">CALM FORM</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Science-led skincare essentials
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            <Link
              href="/shipping"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Shipping & Returns
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </nav>

          <div className="text-xs text-muted-foreground">
            © {currentYear} CALM FORM. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
