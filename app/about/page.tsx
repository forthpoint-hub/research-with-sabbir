import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "About Research With Sabbir and Sabbir Ahmad.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="container-page max-w-2xl py-16">
      <p className="label-eyebrow">About</p>
      <h1 className="mt-2 font-serif text-3xl text-paper">
        Research With Sabbir
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-paper-dim">
        <p>
          Research With Sabbir is an independent research practice focused on
          Bangladesh and emerging markets — covering FMCG, commodities,
          competitive dynamics and the business decisions that depend on
          understanding a market clearly.
        </p>
        <p>
          The practice is built on one rule: no verified source, no outcome.
          Findings are grounded in real data and disclosed methodology, and
          anything illustrative or in development is labeled as such.
        </p>
        <p>
          Replace this paragraph with more detail on your background,
          experience and what led you to start Research With Sabbir.
        </p>
      </div>
    </section>
  );
}
