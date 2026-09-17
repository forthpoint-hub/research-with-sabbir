"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Values = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  checkout_url: string;
  category: string;
  featured: boolean;
};

const EMPTY: Values = {
  slug: "",
  title: "",
  description: "",
  price: "",
  checkout_url: "",
  category: "",
  featured: false,
};

export default function ProductForm({ initial }: { initial?: any }) {
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    ...(initial
      ? {
          id: initial.id,
          slug: initial.slug ?? "",
          title: initial.title ?? "",
          description: initial.description ?? "",
          price: initial.price ?? "",
          checkout_url: initial.checkout_url ?? "",
          category: initial.category ?? "",
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
      description: values.description,
      price: values.price,
      checkout_url: values.checkout_url,
      category: values.category,
      featured: values.featured,
    };

    const query = values.id
      ? supabase.from("products").update(payload).eq("id", values.id)
      : supabase.from("products").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push("/admin/products");
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
      <Field label="Description">
        <textarea
          rows={3}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Price (display text, e.g. $99)">
          <input
            value={values.price}
            onChange={(e) => set("price", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Category">
          <input
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Checkout URL (Gumroad, etc.)">
        <input
          required
          value={values.checkout_url}
          onChange={(e) => set("checkout_url", e.target.value)}
          className={inputClass}
        />
      </Field>

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
