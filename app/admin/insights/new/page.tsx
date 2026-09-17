"use client";

import Link from "next/link";
import AuthGate from "@/components/admin/AuthGate";
import InsightForm from "@/components/admin/InsightForm";

export default function NewInsightPage() {
  return (
    <AuthGate>
      <section className="container-page max-w-2xl py-16">
        <Link
          href="/admin/insights"
          className="text-sm text-paper-dim no-underline hover:text-paper"
        >
          Insights
        </Link>
        <h1 className="mt-2 font-serif text-2xl text-paper">New insight</h1>
        <InsightForm />
      </section>
    </AuthGate>
  );
}
