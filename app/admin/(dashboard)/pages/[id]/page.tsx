"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PageForm from "@/components/admin/PageForm";
import { supabase } from "@/lib/supabaseClient";

export default function EditPagePage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("pages")
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
      <Link href="/admin/pages" className="text-sm text-paper-dim no-underline hover:text-paper">
        Pages
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">Edit page</h1>
      <PageForm initial={initial} />
    </section>
  );
}
