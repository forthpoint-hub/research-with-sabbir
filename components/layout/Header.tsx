import Link from "next/link";
import { getAllPublishedPages } from "@/data/pages";

const NAV = [
  { href: "/research", label: "Research" },
  { href: "/products", label: "Products" },
  { href: "/insights", label: "Insights" },
  { href: "/services", label: "Services" },
  { href: "/markets", label: "Markets" },
  { href: "/about", label: "About" },
];

export default async function Header() {
  const customPages = await getAllPublishedPages();
  const nav = [
    ...NAV,
    ...customPages.map((p) => ({ href: `/${p.slug}`, label: p.title })),
  ];

  return (
    <header className="border-b border-line">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg text-paper no-underline"
        >
          Research With Sabbir
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-paper-dim no-underline transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-sm border border-gold px-4 py-2 text-sm text-gold no-underline transition-colors hover:bg-gold hover:text-ink"
        >
          Work with me
        </Link>
      </div>

      {/* Simple mobile nav — visible on small screens, no JS needed */}
      <div className="container-page flex gap-4 overflow-x-auto pb-3 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-sm text-paper-dim no-underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
