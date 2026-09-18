import { notFound } from "next/navigation";
import { getPageBySlug } from "@/data/pages";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPageBySlug(params.slug);
  if (!page) return buildMetadata({ title: "Page not found" });

  return buildMetadata({
    title: page.title,
    description: page.metaDescription || undefined,
    path: `/${page.slug}`,
  });
}

export default async function CmsPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPageBySlug(params.slug);
  if (!page) return notFound();

  return (
    <article className="container-page max-w-2xl py-16">
      <h1 className="font-serif text-3xl text-paper">{page.title}</h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-paper-dim">
        {page.content.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
