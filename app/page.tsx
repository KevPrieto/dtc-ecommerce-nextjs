import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ClinicalProductsSection } from "@/components/home/clinical-products-section";
import { NaturalProductsSection } from "@/components/home/natural-products-section";
import { BrandStory } from "@/components/home/brand-story";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <ClinicalProductsSection />
        <NaturalProductsSection />
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
