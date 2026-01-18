import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
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
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
