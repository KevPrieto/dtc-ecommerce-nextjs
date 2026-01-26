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
          <Link href="/" className="text-xl font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:text-primary">
            VÉRA
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-primary hover:scale-[1.05]"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-primary hover:scale-[1.05]"
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
              className="text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-primary hover:scale-[1.05]"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-primary hover:scale-[1.05]"
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
