import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllResearch, getResearchBySlug } from "@/data/research";
import ResearchAction from "@/components/research/ResearchAction";
import ResearchCard from "@/components/research/ResearchCard";
import Badge from "@/components/ui/Badge";
import { buildMetadata, SITE_URL } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getResearchBySlug(params.slug);
  if (!item) return buildMetadata({ title: "Research not found" });

  return buildMetadata({
    title: item.title,
    description: item.description,
    path: `/research/${item.slug}`,
  });
}

export default async function ResearchDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getResearchBySlug(params.slug);
  if (!item) return notFound();

  const allResearch = await getAllResearch();
  const related = allResearch.items
    .filter((r) => r.slug !== item.slug && r.category === item.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    author: { "@type": "Person", name: item.author },
    datePublished: item.publicationDate,
    url: `${SITE_URL}/research/${item.slug}`,
  };

  return (
    <article className="container-page max-w-3xl py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/research"
        className="text-sm text-paper-dim no-underline hover:text-paper"
      >
        Research library
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge>{item.category}</Badge>
        <Badge tone={item.type === "free" ? "signal" : "gold"}>
          {item.type === "free" ? "Free" : "Premium"}
        </Badge>
      </div>

      <h1 className="mt-4 font-serif text-3xl leading-tight text-paper sm:text-4xl">
        {item.title}
      </h1>
      <p className="mt-3 text-lg text-paper-dim">{item.subtitle}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-paper-dim">
        <span>{item.author}</span>
        <span>&middot;</span>
        <span>{formatDate(item.publicationDate)}</span>
        <span>&middot;</span>
        <span>{item.readingTime}</span>
      </div>

      <div className="mt-8">
        <ResearchAction item={item} />
      </div>

      <div className="rule mt-10 pt-10">
        <h2 className="font-serif text-xl text-paper">Summary</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-paper-dim">
          {item.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {item.keyFindings.length > 0 && (
        <div className="rule mt-10 pt-10">
          <h2 className="font-serif text-xl text-paper">Key findings</h2>
          <ul className="mt-4 space-y-3">
            {item.keyFindings.map((finding, i) => (
              <li
                key={i}
                className="border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-paper-dim"
              >
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rule mt-10 pt-10">
        <h2 className="font-serif text-xl text-paper">Methodology</h2>
        <p className="mt-4 text-sm leading-relaxed text-paper-dim">
          {item.methodology}
        </p>
      </div>

      {item.sources.length > 0 && (
        <div className="rule mt-10 pt-10">
          <h2 className="font-serif text-xl text-paper">Sources</h2>
          <ul className="mt-4 space-y-1 text-sm text-paper-dim">
            {item.sources.map((source, i) => (
              <li key={i}>{source}</li>
            ))}
          </ul>
        </div>
      )}

      {related.length > 0 && (
        <div className="rule mt-14 pt-10">
          <h2 className="font-serif text-xl text-paper">Related research</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((r) => (
              <ResearchCard key={r.id} item={r} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
