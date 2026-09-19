"use client";

import Link from "next/link";
import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <section className="container-page max-w-2xl py-10">
      <Link href="/admin/services" className="text-sm text-paper-dim no-underline hover:text-paper">
        Services
      </Link>
      <h1 className="mt-2 font-serif text-2xl text-paper">New service</h1>
      <ServiceForm />
    </section>
  );
}
