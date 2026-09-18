"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { supabase } from "@/lib/supabaseClient";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .maybeSingle()
      .then(({ data }) => setInitial(data));
  }, [params.id]);

  if (!initial) {
    return <p className="container-page py-10 text-sm text-paper-dim">Loading&hellip;</p>;
  }

  return (
    <section className="container-page max-w-2xl py-10">
      <Link href="/admin/products" className="text-sm text-paper-dim no-underline hover:text-paper">
        Products
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">Edit product</h1>
      <ProductForm initial={initial} />
    </section>
  );
}
