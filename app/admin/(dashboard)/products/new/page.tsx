"use client";

import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <section className="container-page max-w-2xl py-10">
      <Link href="/admin/products" className="text-sm text-paper-dim no-underline hover:text-paper">
        Products
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">New product</h1>
      <ProductForm />
    </section>
  );
}
