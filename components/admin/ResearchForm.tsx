"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Values = {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  type: "free" | "premium";
  publication_date: string;
  reading_time: string;
  author: string;
  content: string;
  key_findings: string; // newline-separated while editing
  methodology: string;
  sources: string; // newline-separated while editing
  pdf_url: string;
  external_url: string;
  featured: boolean;
};

const EMPTY: Values = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  category: "",
  type: "free",
  publication_date: "",
  reading_time: "",
  author: "Sabbir Ahmad",
  content: "",
  key_findings: "",
  methodology: "",
  sources: "",
  pdf_url: "",
  external_url: "",
  featured: false,
};

export default function ResearchForm({ initial }: { initial?: any }) {
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    ...(initial
      ? {
          id: initial.id,
          slug: initial.slug ?? "",
          title: initial.title ?? "",
          subtitle: initial.subtitle ?? "",
          description: initial.description ?? "",
          category: initial.category ?? "",
          type: initial.type ?? "free",
          publication_date: initial.publication_date ?? "",
          reading_time: initial.reading_time ?? "",
          author: initial.author ?? "Sabbir Ahmad",
          content: initial.content ?? "",
          key_findings: Array.isArray(initial.key_findings)
            ? initial.key_findings.join("\n")
            : "",
          methodology: initial.methodology ?? "",
          sources: Array.isArray(initial.sources)
            ? initial.sources.join("\n")
            : "",
          pdf_url: initial.pdf_url ?? "",
          external_url: initial.external_url ?? "",
          featured: Boolean(initial.featured),
        }
      : {}),
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFileUpload(file: File) {
    setUploading(true);
    setError("");
    const path = `${values.slug || Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("reports")
      .upload(path, file, { upsert: true });

    setUploading(false);

    if (uploadError) {
      setError(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("reports").getPublicUrl(path);
    set("pdf_url", data.publicUrl);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      slug: values.slug.trim(),
      title: values.title.trim(),
      subtitle: values.subtitle,
      description: values.description,
      category: values.category,
      type: values.type,
      publication_date: values.publication_date || null,
      reading_time: values.reading_time,
      author: values.author,
      content: values.content,
      key_findings: values.key_findings
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      methodology: values.methodology,
      sources: values.sources
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      pdf_url: values.pdf_url || null,
      external_url: values.external_url || null,
      featured: values.featured,
    };

    const query = values.id
      ? supabase.from("research").update(payload).eq("id", values.id)
      : supabase.from("research").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push("/admin/research");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <Field label="Slug (used in the URL, e.g. bangladesh-fmcg-2026)">
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
      <Field label="Subtitle">
        <input
          value={values.subtitle}
          onChange={(e) => set("subtitle", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Description">
        <textarea
          rows={2}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category">
          <input
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputClass}
            placeholder="FMCG, Commodities, Bangladesh..."
          />
        </Field>
        <Field label="Type">
          <select
            value={values.type}
            onChange={(e) => set("type", e.target.value as "free" | "premium")}
            className={inputClass}
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </Field>
        <Field label="Publication date">
          <input
            type="date"
            value={values.publication_date}
            onChange={(e) => set("publication_date", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Reading time">
          <input
            value={values.reading_time}
            onChange={(e) => set("reading_time", e.target.value)}
            className={inputClass}
            placeholder="12 min"
          />
        </Field>
      </div>

      <Field label="Author">
        <input
          value={values.author}
          onChange={(e) => set("author", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Content (paragraphs, one blank line between each)">
        <textarea
          rows={8}
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Key findings (one per line)">
        <textarea
          rows={4}
          value={values.key_findings}
          onChange={(e) => set("key_findings", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Methodology">
        <textarea
          rows={3}
          value={values.methodology}
          onChange={(e) => set("methodology", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Sources (one per line)">
        <textarea
          rows={3}
          value={values.sources}
          onChange={(e) => set("sources", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="PDF (only used if type is Free)">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          className="text-sm text-paper-dim"
        />
        {uploading && (
          <p className="mt-1 text-xs text-paper-dim">Uploading&hellip;</p>
        )}
        {values.pdf_url && (
          <p className="mt-1 truncate text-xs text-signal">{values.pdf_url}</p>
        )}
      </Field>

      <Field label="External checkout URL (only used if type is Premium)">
        <input
          value={values.external_url}
          onChange={(e) => set("external_url", e.target.value)}
          className={inputClass}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-paper-dim">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(e) => set("featured", e.target.checked)}
        />
        Featured on homepage
      </label>

      {error && <p className="text-sm text-alert">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
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
