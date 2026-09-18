"use client";

import Link from "next/link";
import PageForm from "@/components/admin/PageForm";

export default function NewPagePage() {
  return (
    <section className="container-page max-w-2xl py-10">
      <Link href="/admin/pages" className="text-sm text-paper-dim no-underline hover:text-paper">
        Pages
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">New page</h1>
      <PageForm />
    </section>
  );
}
