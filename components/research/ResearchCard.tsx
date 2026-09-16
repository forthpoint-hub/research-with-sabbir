import Link from "next/link";
import { ResearchItem } from "@/types/content";
import Badge from "@/components/ui/Badge";
import { categoryColor } from "@/lib/categoryColor";

export default function ResearchCard({ item }: { item: ResearchItem }) {
  const accent = categoryColor(item.category);

  return (
    <Link
      href={`/research/${item.slug}`}
      className="group block border border-line bg-ink-soft p-5 no-underline transition-colors hover:border-paper-dim"
      style={{ borderLeftColor: accent, borderLeftWidth: 3 }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge>{item.category}</Badge>
        <Badge tone={item.type === "free" ? "signal" : "gold"}>
          {item.type === "free" ? "Free" : "Premium"}
        </Badge>
      </div>

      <h3 className="font-serif text-xl leading-snug text-paper">
        {item.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-paper-dim">
        {item.description}
      </p>

      <div className="mt-4 flex items-center gap-3 text-xs text-paper-dim">
        <span>{formatDate(item.publicationDate)}</span>
        <span>&middot;</span>
        <span>{item.readingTime}</span>
      </div>

      <span className="mt-4 inline-block text-sm text-gold no-underline">
        Read research
      </span>
    </Link>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
