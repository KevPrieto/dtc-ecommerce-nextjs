"use client";

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
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/10" />

      <div className="container relative z-10 mx-auto px-4 py-32 md:py-40">
        <div className="max-w-3xl">
          <h1 className="hero-headline group text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>Clinical</span>{" "}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>skincare,</span>{" "}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>reduced</span>{" "}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>to</span>{" "}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>what</span>{" "}
            <span className="inline-block animate-fade-in-up relative" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
              <span className="relative z-10">works.</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
            </span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
            Focused formulations designed for measurable results.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "both" }}>
            <Button asChild size="lg" className="animate-subtle-pulse">
              <Link href="/products">Shop All</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-background/80 backdrop-blur-sm border-background/20 hover:bg-background/90">
              <Link href="/about">Our Approach</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
