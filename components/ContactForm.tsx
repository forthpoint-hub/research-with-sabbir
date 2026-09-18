"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const FIELDS: { name: string; label: string; type?: string; required?: boolean }[] = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "company", label: "Company" },
  { name: "country", label: "Country" },
  { name: "industry", label: "Industry" },
  { name: "topic", label: "Research topic" },
  { name: "budget", label: "Budget" },
  { name: "timeline", label: "Timeline" },
];

export default function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [question, setQuestion] = useState("");
  const [additional, setAdditional] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: submitError } = await supabase.from("contact_submissions").insert({
      name: values.name ?? "",
      email: values.email ?? "",
      company: values.company ?? "",
      country: values.country ?? "",
      industry: values.industry ?? "",
      topic: values.topic ?? "",
      budget: values.budget ?? "",
      timeline: values.timeline ?? "",
      question,
      additional_info: additional,
    });

    setSubmitting(false);

    if (submitError) {
      setError("Something went wrong — please try again in a moment.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-10 border border-line bg-ink-soft p-6">
        <p className="font-serif text-lg text-paper">Thanks — got it.</p>
        <p className="mt-2 text-sm text-paper-dim">
          Your inquiry has been received. I&apos;ll get back to you about
          scope and timeline soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-1 block text-sm text-paper-dim">
              {field.label}
              {field.required ? " *" : ""}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full border border-line bg-ink-soft px-3 py-2 text-sm text-paper focus:border-gold"
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="question" className="mb-1 block text-sm text-paper-dim">
          Research question
        </label>
        <textarea
          id="question"
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-line bg-ink-soft px-3 py-2 text-sm text-paper focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="additional" className="mb-1 block text-sm text-paper-dim">
          Additional information
        </label>
        <textarea
          id="additional"
          rows={3}
          value={additional}
          onChange={(e) => setAdditional(e.target.value)}
          className="w-full border border-line bg-ink-soft px-3 py-2 text-sm text-paper focus:border-gold"
        />
      </div>

      {error && <p className="text-sm text-alert">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-sm bg-gold px-5 py-2.5 text-sm text-ink transition-colors hover:bg-gold/90 disabled:opacity-50"
      >
        {submitting ? "Sending\u2026" : "Send inquiry"}
      </button>
    </form>
  );
}
