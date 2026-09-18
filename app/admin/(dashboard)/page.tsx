"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardOverview() {
  const [counts, setCounts] = useState<Record<string, number | null>>({
    research: null,
    products: null,
    insights: null,
    pages: null,
    inquiries: null,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [viewsToday, setViewsToday] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const [research, products, insights, pages, inquiries] =
        await Promise.all([
          supabase.from("research").select("*", { count: "exact", head: true }),
          supabase.from("products").select("*", { count: "exact", head: true }),
          supabase.from("insights").select("*", { count: "exact", head: true }),
          supabase.from("pages").select("*", { count: "exact", head: true }),
          supabase
            .from("contact_submissions")
            .select("*", { count: "exact", head: true }),
        ]);

      setCounts({
        research: research.count ?? 0,
        products: products.count ?? 0,
        insights: insights.count ?? 0,
        pages: pages.count ?? 0,
        inquiries: inquiries.count ?? 0,
      });

      const { data: recent } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentInquiries(recent ?? []);

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString());
      setViewsToday(todayCount ?? 0);
    }
    load();
  }, []);

  const cards = [
    { label: "Research reports", value: counts.research, href: "/admin/research" },
    { label: "Products", value: counts.products, href: "/admin/products" },
    { label: "Insights", value: counts.insights, href: "/admin/insights" },
    { label: "Custom pages", value: counts.pages, href: "/admin/pages" },
    { label: "Inquiries", value: counts.inquiries, href: "/admin/inquiries" },
    { label: "Views today", value: viewsToday, href: "/admin/analytics" },
  ];

  return (
    <section className="container-page max-w-3xl py-10">
      <h1 className="font-serif text-2xl text-paper">Dashboard</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-line bg-ink-soft p-4 no-underline transition-colors hover:border-paper-dim"
          >
            <p className="font-mono text-2xl text-gold">
              {card.value === null ? "\u2013" : card.value}
            </p>
            <p className="mt-1 text-xs text-paper-dim">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg text-paper">Recent inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="text-sm text-paper-dim no-underline hover:text-paper"
          >
            View all
          </Link>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="mt-4 text-sm text-paper-dim">No inquiries yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-line border-t border-line">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="py-3">
                <p className="text-sm text-paper">
                  {inq.name || "Unnamed"}{" "}
                  <span className="text-paper-dim">— {inq.email}</span>
                </p>
                <p className="mt-0.5 text-xs text-paper-dim">
                  {inq.topic || "No topic given"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
