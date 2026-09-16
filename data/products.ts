import { Product } from "@/types/content";

// SAMPLE CONTENT — replace with your real digital products.
// checkoutUrl should point to your external checkout (e.g. Gumroad).

export const products: Product[] = [
  {
    id: "1",
    slug: "sample-competitor-report",
    title: "Competitor X-Ray Report",
    description:
      "Replace with a description of what the buyer receives — scope, format, and depth.",
    price: "$99",
    coverImage: "",
    checkoutUrl: "https://gumroad.com/l/replace-with-your-checkout-link",
    category: "Competitor Research",
    featured: true,
  },
  {
    id: "2",
    slug: "sample-research-template",
    title: "Market Research Template",
    description:
      "Replace with a description of the template — what it helps the buyer produce.",
    price: "$25",
    coverImage: "",
    checkoutUrl: "https://gumroad.com/l/replace-with-your-checkout-link",
    category: "Template",
    featured: false,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((item) => item.slug === slug);
}
