"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ResearchForm from "@/components/admin/ResearchForm";
import { supabase } from "@/lib/supabaseClient";

export default function EditResearchPage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    supabase
      .from("research")
      .select("*")
      .eq("id", params.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          setNotFound(true);
          return;
        }
        setInitial(data);
      });
  }, [params.id]);

  if (notFound) {
    return <p className="container-page py-10 text-sm text-paper-dim">Report not found.</p>;
  }
  if (!initial) {
    return <p className="container-page py-10 text-sm text-paper-dim">Loading&hellip;</p>;
  }

  return (
    <section className="container-page max-w-2xl py-10">
      <Link href="/admin/research" className="text-sm text-paper-dim no-underline hover:text-paper">
        Research
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">Edit research report</h1>
      <ResearchForm initial={initial} />
    </section>
  );
}
