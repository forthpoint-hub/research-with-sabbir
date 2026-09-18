"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function InquiriesList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    load();
  }

  return (
    <section className="container-page max-w-3xl py-10">
      <h1 className="font-serif text-2xl text-paper">Inquiries</h1>
      <p className="mt-2 text-sm text-paper-dim">
        Submissions from the contact form on your site.
      </p>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-paper-dim">Loading&hellip;</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-paper-dim">No inquiries yet.</p>
        ) : (
          <div className="divide-y divide-line border-t border-line">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-4">
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-paper">
                        {item.name || "Unnamed"}{" "}
                        <span className="text-paper-dim">— {item.email}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-paper-dim">
                        {item.topic || "No topic"} &middot;{" "}
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm text-gold">
                      {isOpen ? "Hide" : "View"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 space-y-1 border-l-2 border-gold/40 pl-4 text-sm text-paper-dim">
                      <p>Company: {item.company || "\u2014"}</p>
                      <p>Country: {item.country || "\u2014"}</p>
                      <p>Industry: {item.industry || "\u2014"}</p>
                      <p>Budget: {item.budget || "\u2014"}</p>
                      <p>Timeline: {item.timeline || "\u2014"}</p>
                      <p className="pt-2">Question: {item.question || "\u2014"}</p>
                      <p>Additional info: {item.additional_info || "\u2014"}</p>
                      <div className="pt-3">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-alert"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
