"use client";

import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "md.sabbir26@hotmail.com";

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

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const subject = `Research inquiry — ${values.name ?? "New contact"}`;
    const bodyLines = [
      ...FIELDS.map((f) => `${f.label}: ${values[f.name] ?? ""}`),
      `Research question: ${question}`,
      `Additional information: ${additional}`,
    ];
    const body = bodyLines.join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-1 block text-sm text-paper-dim"
            >
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
        <label
          htmlFor="additional"
          className="mb-1 block text-sm text-paper-dim"
        >
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

      <button
        type="submit"
        className="rounded-sm bg-gold px-5 py-2.5 text-sm text-ink transition-colors hover:bg-gold/90"
      >
        Send inquiry
      </button>
      <p className="text-xs text-paper-dim">
        This opens your email app with the details pre-filled, addressed to{" "}
        {CONTACT_EMAIL}.
      </p>
    </form>
  );
}
