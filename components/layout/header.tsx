import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/cart/cart-icon";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function Header() {
  return (
    <>
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            CALM FORM
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login" aria-label="Account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <CartIcon />
          </div>
        </div>

        <nav className="md:hidden border-t">
          <div className="container mx-auto flex items-center justify-center gap-8 px-4 py-3">
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              About
            </Link>
          </div>
        </nav>
      </header>
      <CartDrawer />
    </>
  );
}
