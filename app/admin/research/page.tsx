"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGate from "@/components/admin/AuthGate";
import { supabase } from "@/lib/supabaseClient";

function ResearchList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("research")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this report? This cannot be undone.")) return;
    await supabase.from("research").delete().eq("id", id);
    load();
  }

  return (
    <section className="container-page max-w-3xl py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-paper">Research</h1>
        <Link
          href="/admin/research/new"
          className="rounded-sm bg-gold px-4 py-2 text-sm text-ink no-underline transition-colors hover:bg-gold/90"
        >
          New report
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-paper-dim">Loading&hellip;</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-paper-dim">No reports yet.</p>
        ) : (
          <div className="divide-y divide-line border-t border-line">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-paper">{item.title}</p>
                  <p className="text-xs text-paper-dim">
                    {item.slug} &middot; {item.type}
                  </p>
                </div>
                <div className="flex shrink-0 gap-4 text-sm">
                  <Link
                    href={`/admin/research/${item.id}`}
                    className="text-gold no-underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-alert"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        href="/admin"
        className="mt-10 inline-block text-sm text-paper-dim no-underline hover:text-paper"
      >
        Back to dashboard
      </Link>
    </section>
  );
}

export default function AdminResearchPage() {
  return (
    <AuthGate>
      <ResearchList />
    </AuthGate>
  );
}
