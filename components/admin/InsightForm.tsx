"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Values = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  publication_date: string;
  reading_time: string;
  featured: boolean;
};

const EMPTY: Values = {
  slug: "",
  title: "",
  summary: "",
  content: "",
  category: "",
  publication_date: "",
  reading_time: "",
  featured: false,
};

export default function InsightForm({ initial }: { initial?: any }) {
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    ...(initial
      ? {
          id: initial.id,
          slug: initial.slug ?? "",
          title: initial.title ?? "",
          summary: initial.summary ?? "",
          content: initial.content ?? "",
          category: initial.category ?? "",
          publication_date: initial.publication_date ?? "",
          reading_time: initial.reading_time ?? "",
          featured: Boolean(initial.featured),
        }
      : {}),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      slug: values.slug.trim(),
      title: values.title.trim(),
      summary: values.summary,
      content: values.content,
      category: values.category,
      publication_date: values.publication_date || null,
      reading_time: values.reading_time,
      featured: values.featured,
    };

    const query = values.id
      ? supabase.from("insights").update(payload).eq("id", values.id)
      : supabase.from("insights").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push("/admin/insights");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <Field label="Slug">
        <input
          required
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Title">
        <input
          required
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Summary">
        <textarea
          rows={2}
          value={values.summary}
          onChange={(e) => set("summary", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Content">
        <textarea
          rows={6}
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          className={inputClass}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category">
          <input
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Reading time">
          <input
            value={values.reading_time}
            onChange={(e) => set("reading_time", e.target.value)}
            className={inputClass}
            placeholder="5 min"
          />
        </Field>
        <Field label="Publication date">
          <input
            type="date"
            value={values.publication_date}
            onChange={(e) => set("publication_date", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-paper-dim">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(e) => set("featured", e.target.checked)}
        />
        Featured
      </label>

      {error && <p className="text-sm text-alert">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-sm bg-gold px-5 py-2.5 text-sm text-ink transition-colors hover:bg-gold/90 disabled:opacity-50"
      >
        {saving ? "Saving\u2026" : "Save"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full border border-line bg-ink-soft px-3 py-2 text-sm text-paper focus:border-gold";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-paper-dim">{label}</label>
      {children}
    </div>
  );
}
