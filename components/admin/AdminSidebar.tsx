"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/research", label: "Research" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/insights", label: "Insights" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/content", label: "Site content" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="border-line shrink-0 border-b md:w-56 md:border-b-0 md:border-r">
      <div className="container-page py-5 md:px-6">
        <Link
          href="/"
          className="font-serif text-base text-paper no-underline"
        >
          Research With Sabbir
        </Link>
        <p className="mt-0.5 text-xs text-paper-dim">Admin</p>
      </div>

      <nav className="container-page flex gap-1 overflow-x-auto pb-4 md:flex-col md:overflow-visible md:px-6 md:pb-0">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-sm px-3 py-2 text-sm no-underline transition-colors md:w-full ${
                active
                  ? "bg-ink-soft text-gold"
                  : "text-paper-dim hover:text-paper"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="container-page py-5 md:px-6">
        <button
          onClick={handleLogout}
          className="text-sm text-paper-dim hover:text-paper"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
