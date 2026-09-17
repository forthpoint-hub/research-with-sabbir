"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <section className="container-page max-w-sm py-24">
      <h1 className="font-serif text-2xl text-paper">Admin login</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-paper-dim">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line bg-ink-soft px-3 py-2 text-sm text-paper focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-paper-dim">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line bg-ink-soft px-3 py-2 text-sm text-paper focus:border-gold"
          />
        </div>

        {error && <p className="text-sm text-alert">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-gold px-5 py-2.5 text-sm text-ink transition-colors hover:bg-gold/90 disabled:opacity-50"
        >
          {loading ? "Logging in\u2026" : "Log in"}
        </button>
      </form>
    </section>
  );
}
