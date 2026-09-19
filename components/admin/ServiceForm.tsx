"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Values = {
  id?: string;
  title: string;
  description: string;
  sort_order: number;
};

const EMPTY: Values = { title: "", description: "", sort_order: 0 };

export default function ServiceForm({ initial }: { initial?: any }) {
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    ...(initial
      ? {
          id: initial.id,
          title: initial.title ?? "",
          description: initial.description ?? "",
          sort_order: initial.sort_order ?? 0,
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
      title: values.title.trim(),
      description: values.description,
      sort_order: values.sort_order,
    };

    const query = values.id
      ? supabase.from("services").update(payload).eq("id", values.id)
      : supabase.from("services").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push("/admin/services");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
      <Field label="Display order (lower numbers show first)">
        <input
          type="number"
          value={values.sort_order}
          onChange={(e) => set("sort_order", Number(e.target.value))}
          className={inputClass}
        />
      </Field>

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
