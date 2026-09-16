import { Insight } from "@/types/content";
import { categoryColor } from "@/lib/categoryColor";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function InsightCard({ item }: { item: Insight }) {
  const accent = categoryColor(item.category);

  return (
    <article
      className="border-t border-line py-6 first:border-t-0 first:pt-0"
      style={{ borderLeftColor: accent, borderLeftWidth: 0 }}
    >
      <div className="flex items-center gap-3 text-xs text-paper-dim">
        <span>{formatDate(item.publicationDate)}</span>
        <span>&middot;</span>
        <span>{item.readingTime}</span>
        <span>&middot;</span>
        <span style={{ color: accent }}>{item.category}</span>
      </div>
      <h3 className="mt-2 font-serif text-xl text-paper">{item.title}</h3>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-paper-dim">
        {item.summary}
      </p>
    </article>
  );
}
