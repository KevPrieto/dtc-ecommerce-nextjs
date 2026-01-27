import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-secondary min-h-[600px] flex items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/Minimalist_Skincare_Brand_Video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-10 bg-black/25" />

      <div className="container relative z-10 mx-auto px-4 py-32 md:py-40">
        <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-white" style={{ letterSpacing: "-0.02em" }}>
            Clinical skincare, reduced to what works.
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-white/90 leading-relaxed">
            Focused formulations designed for measurable results.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/products">Shop All</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Link href="/about">Our Approach</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
