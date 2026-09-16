import ResearchFilters from "@/components/research/ResearchFilters";
import { research } from "@/data/research";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Research Library",
  description:
    "Independent research on Bangladesh markets, FMCG, commodities and business strategy.",
  path: "/research",
});

export default function ResearchLibraryPage() {
  return (
    <section className="container-page py-16">
      <p className="label-eyebrow">Research Library</p>
      <h1 className="mt-2 max-w-2xl font-serif text-3xl text-paper">
        Long-form independent research
      </h1>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-paper-dim">
        Research on the markets, industries and consumer behaviour shaping
        Bangladesh and comparable emerging economies.
      </p>

      <div className="mt-10">
        <ResearchFilters items={research} />
      </div>
    </section>
  );
}
