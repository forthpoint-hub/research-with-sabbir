"use client";

import Link from "next/link";
import ResearchForm from "@/components/admin/ResearchForm";

export default function NewResearchPage() {
  return (
    <section className="container-page max-w-2xl py-10">
      <Link href="/admin/research" className="text-sm text-paper-dim no-underline hover:text-paper">
        Research
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">New research report</h1>
      <ResearchForm />
    </section>
  );
}
