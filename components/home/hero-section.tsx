import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 py-32 md:py-40">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
            Clinical skincare, reduced to what works.
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-muted-foreground leading-relaxed">
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
