"use client";

import Link from "next/link";
import AuthGate from "@/components/admin/AuthGate";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AuthGate>
      <section className="container-page max-w-2xl py-16">
        <Link
          href="/admin/products"
          className="text-sm text-paper-dim no-underline hover:text-paper"
        >
          Products
        </Link>
        <h1 className="mt-2 font-serif text-2xl text-paper">New product</h1>
        <ProductForm />
      </section>
    </AuthGate>
  );
}
