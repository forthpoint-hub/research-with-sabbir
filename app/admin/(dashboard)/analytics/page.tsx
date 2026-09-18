"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AnalyticsPage() {
  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [topPages, setTopPages] = useState<{ path: string; count: number }[]>(
    []
  );
  const [daily, setDaily] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const since = new Date();
      since.setDate(since.getDate() - 30);

      const { data, count } = await supabase
        .from("page_views")
        .select("path, created_at", { count: "exact" })
        .gte("created_at", since.toISOString());

      setTotalViews(count ?? 0);

      const byPath: Record<string, number> = {};
      const byDay: Record<string, number> = {};

      (data ?? []).forEach((row: any) => {
        byPath[row.path] = (byPath[row.path] ?? 0) + 1;
        const day = row.created_at.slice(0, 10);
        byDay[day] = (byDay[day] ?? 0) + 1;
      });

      const sortedPages = Object.entries(byPath)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      const last14: { date: string; count: number }[] = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        last14.push({ date: key, count: byDay[key] ?? 0 });
      }

      setTopPages(sortedPages);
      setDaily(last14);
      setLoading(false);
    }
    load();
  }, []);

  const maxDaily = Math.max(1, ...daily.map((d) => d.count));

  return (
    <section className="container-page max-w-3xl py-10">
      <h1 className="font-serif text-2xl text-paper">Analytics</h1>
      <p className="mt-2 text-sm text-paper-dim">
        Page path and timestamp only — no cookies, no personal data.
      </p>

      {loading ? (
        <p className="mt-8 text-sm text-paper-dim">Loading&hellip;</p>
      ) : (
        <>
          <div className="mt-8">
            <p className="font-mono text-3xl text-gold">{totalViews}</p>
            <p className="mt-1 text-xs text-paper-dim">
              page views in the last 30 days
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-serif text-lg text-paper">Last 14 days</h2>
            <div className="mt-4 flex h-32 items-end gap-1">
              {daily.map((d) => (
                <div key={d.date} className="flex-1 text-center">
                  <div
                    className="mx-auto w-full bg-gold/70"
                    style={{
                      height: `${Math.max(4, (d.count / maxDaily) * 100)}px`,
                    }}
                    title={`${d.date}: ${d.count}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-paper-dim">
              <span>{daily[0]?.date}</span>
              <span>{daily[daily.length - 1]?.date}</span>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-serif text-lg text-paper">Top pages</h2>
            {topPages.length === 0 ? (
              <p className="mt-4 text-sm text-paper-dim">No views recorded yet.</p>
            ) : (
              <div className="mt-4 divide-y divide-line border-t border-line">
                {topPages.map((p) => (
                  <div
                    key={p.path}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <span className="truncate text-paper-dim">{p.path}</span>
                    <span className="text-paper">{p.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
