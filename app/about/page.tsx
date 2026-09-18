import { getSiteContent } from "@/data/siteContent";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "About",
  description: "About Research With Sabbir and Sabbir Ahmad.",
  path: "/about",
});

export default async function AboutPage() {
  const body = await getSiteContent("about_body");

  return (
    <section className="container-page max-w-2xl py-16">
      <p className="label-eyebrow">About</p>
      <h1 className="mt-2 font-serif text-3xl text-paper">
        Research With Sabbir
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-paper-dim">
        {body.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  );
}
