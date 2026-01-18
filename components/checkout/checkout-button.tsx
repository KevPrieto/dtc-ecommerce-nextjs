"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/actions/checkout";
import { CartItem } from "@/types";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  items: CartItem[];
}

export function CheckoutButton({ items }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await createCheckoutSession(items);
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        size="lg"
        className="w-full"
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Checkout"
        )}
      </Button>
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  );
}
