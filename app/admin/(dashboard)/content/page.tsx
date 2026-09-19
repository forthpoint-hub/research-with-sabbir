"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const KNOWN_KEYS: { key: string; label: string; usedOn: string }[] = [
  { key: "home_hero_heading", label: "Homepage hero heading", usedOn: "/" },
  { key: "home_hero_subtext", label: "Homepage hero subtext", usedOn: "/" },
  { key: "about_body", label: "About page text", usedOn: "/about" },
  { key: "markets_body", label: "Markets page text", usedOn: "/markets" },
  { key: "contact_intro", label: "Contact page intro", usedOn: "/contact" },
];

export default function ContentEditor() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("site_content").select("*");
    const map: Record<string, string> = {};
    (data ?? []).forEach((row: any) => {
      map[row.key] = row.value ?? "";
    });
    setValues(map);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(key: string) {
    setSavingKey(key);
    setError("");
    setSavedKey(null);

    const { error: saveError } = await supabase
      .from("site_content")
      .upsert({ key, value: values[key] ?? "" });

    setSavingKey(null);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 2000);
  }

  return (
    <section className="container-page max-w-2xl py-10">
      <h1 className="font-serif text-2xl text-paper">Site content</h1>
      <p className="mt-2 text-sm text-paper-dim">
        Edit the text used on fixed pages like About. Each block saves independently.
      </p>

      {loading ? (
        <p className="mt-8 text-sm text-paper-dim">Loading&hellip;</p>
      ) : (
        <div className="mt-8 space-y-10">
          {KNOWN_KEYS.map(({ key, label, usedOn }) => (
            <div key={key}>
              <label className="mb-1 block text-sm text-paper-dim">
                {label} <span className="text-xs">({usedOn})</span>
              </label>
              <textarea
                rows={8}
                value={values[key] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                className="w-full border border-line bg-ink-soft px-3 py-2 text-sm text-paper focus:border-gold"
              />
              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => handleSave(key)}
                  disabled={savingKey === key}
                  className="rounded-sm bg-gold px-4 py-2 text-sm text-ink transition-colors hover:bg-gold/90 disabled:opacity-50"
                >
                  {savingKey === key ? "Saving\u2026" : "Save"}
                </button>
                {savedKey === key && <span className="text-sm text-signal">Saved</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-4 text-sm text-alert">{error}</p>}
    </section>
  );
}
