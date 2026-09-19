"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ServiceForm from "@/components/admin/ServiceForm";
import { supabase } from "@/lib/supabaseClient";

export default function EditServicePage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("services")
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
      <Link href="/admin/services" className="text-sm text-paper-dim no-underline hover:text-paper">
        Services
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">Edit service</h1>
      <ServiceForm initial={initial} />
    </section>
  );
}
