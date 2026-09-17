import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/content";

function mapRow(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    price: row.price ?? "",
    coverImage: "",
    checkoutUrl: row.checkout_url ?? "",
    category: row.category ?? "",
    featured: Boolean(row.featured),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapRow(data);
}
