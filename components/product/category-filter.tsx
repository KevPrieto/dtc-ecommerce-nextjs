"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CATEGORY_LABELS: Record<string, string> = {
  cleansers: "Cleansers",
  treatments: "Treatments",
  moisturizers: "Moisturizers",
  "sun-protection": "Sun Protection",
  bundles: "Bundles",
};

interface CategoryFilterProps {
  categories: string[];
  currentCategory: string | null;
}

export function CategoryFilter({
  categories,
  currentCategory,
}: CategoryFilterProps) {
  const router = useRouter();

  const handleCategoryChange = (category: string | null) => {
    if (category) {
      router.push(`/products?category=${category}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={currentCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => handleCategoryChange(null)}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={currentCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(category)}
        >
          {CATEGORY_LABELS[category] || category}
        </Button>
      ))}
    </div>
  );
}
