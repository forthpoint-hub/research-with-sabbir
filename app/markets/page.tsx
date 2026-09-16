import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Bangladesh Market Intelligence",
  description:
    "A commodity and market intelligence dashboard for Bangladesh, in development.",
  path: "/markets",
});

export default function MarketsPage() {
  return (
    <section className="container-page max-w-2xl py-16">
      <p className="label-eyebrow">Market Intelligence</p>
      <h1 className="mt-2 font-serif text-3xl text-paper">
        Bangladesh Market Intelligence
      </h1>

      <p className="mt-6 text-base leading-relaxed text-paper-dim">
        This page will host a live commodity and market intelligence
        dashboard covering price direction, supply conditions and trader
        sentiment for the goods that move Bangladesh&apos;s cost of living.
      </p>

      <div className="mt-8 border border-line bg-ink-soft p-6">
        <p className="font-serif text-lg text-paper">Coming soon</p>
        <p className="mt-2 text-sm leading-relaxed text-paper-dim">
          No live data is connected yet. When this launches, every figure
          shown will be sourced and dated — nothing here will be simulated or
          estimated without being labeled as such.
        </p>
      </div>
    </section>
  );
}
