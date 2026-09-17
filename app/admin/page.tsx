"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGate from "@/components/admin/AuthGate";
import { supabase } from "@/lib/supabaseClient";

function DashboardHome() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <section className="container-page max-w-2xl py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-paper">Admin dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-paper-dim hover:text-paper"
        >
          Log out
        </button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/research"
          className="border border-line bg-ink-soft p-5 no-underline transition-colors hover:border-paper-dim"
        >
          <p className="font-serif text-lg text-paper">Research</p>
          <p className="mt-1 text-sm text-paper-dim">Manage reports</p>
        </Link>
        <Link
          href="/admin/products"
          className="border border-line bg-ink-soft p-5 no-underline transition-colors hover:border-paper-dim"
        >
          <p className="font-serif text-lg text-paper">Products</p>
          <p className="mt-1 text-sm text-paper-dim">Manage products</p>
        </Link>
        <Link
          href="/admin/insights"
          className="border border-line bg-ink-soft p-5 no-underline transition-colors hover:border-paper-dim"
        >
          <p className="font-serif text-lg text-paper">Insights</p>
          <p className="mt-1 text-sm text-paper-dim">Manage insights</p>
        </Link>
      </div>
    </section>
  );
}

export default function AdminPage() {
  return (
    <AuthGate>
      <DashboardHome />
    </AuthGate>
  );
}
