"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const RESERVED_SLUGS = [
  "research",
  "products",
  "insights",
  "services",
  "about",
  "markets",
  "contact",
  "admin",
  "api",
];

type Values = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string;
  published: boolean;
};

const EMPTY: Values = {
  slug: "",
  title: "",
  content: "",
  meta_description: "",
  published: true,
};

export default function PageForm({ initial }: { initial?: any }) {
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    ...(initial
      ? {
          id: initial.id,
          slug: initial.slug ?? "",
          title: initial.title ?? "",
          content: initial.content ?? "",
          meta_description: initial.meta_description ?? "",
          published: initial.published ?? true,
        }
      : {}),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const isReserved = RESERVED_SLUGS.includes(values.slug.trim().toLowerCase());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      slug: values.slug.trim(),
      title: values.title.trim(),
      content: values.content,
      meta_description: values.meta_description,
      published: values.published,
    };

    const query = values.id
      ? supabase.from("pages").update(payload).eq("id", values.id)
      : supabase.from("pages").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push("/admin/pages");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <Field label="Slug (page will be live at yoursite.vercel.app/this-slug)">
        <input
          required
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          className={inputClass}
        />
        {isReserved && (
          <p className="mt-1 text-xs text-alert">
            This slug is already used by a built-in page ({values.slug}) —
            this new page won&apos;t be reachable. Pick a different slug.
          </p>
        )}
      </Field>
      <Field label="Title">
        <input
          required
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Content (paragraphs, one blank line between each)">
        <textarea
          rows={10}
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Meta description (for search engines / link previews)">
        <input
          value={values.meta_description}
          onChange={(e) => set("meta_description", e.target.value)}
          className={inputClass}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-paper-dim">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => set("published", e.target.checked)}
        />
        Published (visible to visitors)
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
