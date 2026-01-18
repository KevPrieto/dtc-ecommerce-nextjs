import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            Clinical skincare, reduced to what works.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Focused formulations designed for measurable results.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/products">Shop All</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Our Approach</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
