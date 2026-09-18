"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import InsightForm from "@/components/admin/InsightForm";
import { supabase } from "@/lib/supabaseClient";

export default function EditInsightPage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("insights")
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
      <Link href="/admin/insights" className="text-sm text-paper-dim no-underline hover:text-paper">
        Insights
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">Edit insight</h1>
      <InsightForm initial={initial} />
    </section>
  );
}
