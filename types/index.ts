// Database types (mirroring Supabase schema)

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  name: string;
  sku: string;
  price: number; // cents
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductWithVariants = Product & {
  variants: ProductVariant[];
};

// Cart types

export type CartItem = {
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  variantName: string;
  sku: string;
  price: number; // cents
  quantity: number;
  imageUrl: string | null;
};

// Order types

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export type Order = {
  id: string;
  user_id: string | null;
  email: string;
  status: OrderStatus;
  total: number; // cents
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_variant_id: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  price: number; // cents per unit
  created_at: string;
};

// Auth types

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
};
