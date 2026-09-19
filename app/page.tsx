import Link from "next/link";
import Button from "@/components/ui/Button";
import ResearchCard from "@/components/research/ResearchCard";
import { getAllResearch } from "@/data/research";
import { getAllInsights } from "@/data/insights";
import { getSiteContent } from "@/data/siteContent";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Bangladesh Market & Business Research",
  path: "/",
});

export default async function HomePage() {
  const [{ items: research }, { items: insights }, heroHeading, heroSubtext] =
    await Promise.all([
      getAllResearch(),
      getAllInsights(),
      getSiteContent("home_hero_heading"),
      getSiteContent("home_hero_subtext"),
    ]);

  const featuredResearch = research.filter((r) => r.featured).slice(0, 4);
  const latestInsights = insights.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="label-eyebrow">Independent Market &amp; Business Research</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-paper sm:text-5xl">
          {heroHeading || "Research that turns markets into intelligence."}
        </h1>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-paper-dim">
          {heroSubtext ||
            "Independent research and analysis on Bangladesh, emerging markets, commodities, FMCG and business strategy — built for people who need clarity before making a decision."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/research">Explore research</Button>
          <Button href="/contact" variant="secondary">
            Work with me
          </Button>
        </div>
      </section>


      {/* Featured research */}
      <section className="rule container-page py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="label-eyebrow">Latest work</p>
            <h2 className="mt-2 font-serif text-2xl text-paper">
              Featured research
            </h2>
          </div>
          <Link
            href="/research"
            className="text-sm text-paper-dim no-underline hover:text-paper"
          >
            Research library
          </Link>
        </div>

        {featuredResearch.length === 0 ? (
          <p className="text-sm text-paper-dim">
            No featured research yet — add reports in the admin dashboard.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredResearch.map((item) => (
              <ResearchCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Market snapshot teaser */}
      <section className="rule container-page py-16">
        <p className="label-eyebrow">Market Intelligence</p>
        <h2 className="mt-2 font-serif text-2xl text-paper">
          Bangladesh market snapshot
        </h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-paper-dim">
          A dedicated commodity and market intelligence dashboard is in
          development. It will bring together price direction, supply
          conditions and trader sentiment in one place.
        </p>
        <div className="mt-6">
          <Button href="/markets" variant="secondary">
            View markets page
          </Button>
        </div>
      </section>

      {/* Insights */}
      <section className="rule container-page py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="label-eyebrow">Editorial</p>
            <h2 className="mt-2 font-serif text-2xl text-paper">Insights</h2>
          </div>
          <Link
            href="/insights"
            className="text-sm text-paper-dim no-underline hover:text-paper"
          >
            All insights
          </Link>
        </div>

        {latestInsights.length === 0 ? (
          <p className="text-sm text-paper-dim">
            No insights yet — add them in the admin dashboard.
          </p>
        ) : (
          <div>
            {latestInsights.map((item) => (
              <div
                key={item.id}
                className="border-t border-line py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex items-center gap-3 text-xs text-paper-dim">
                  <span>{item.readingTime}</span>
                  <span>&middot;</span>
                  <span>{item.category}</span>
                </div>
                <h3 className="mt-2 font-serif text-xl text-paper">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-paper-dim">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Work with the desk CTA */}
      <section className="rule container-page py-16">
        <div className="max-w-2xl">
          <p className="label-eyebrow">Work with the desk</p>
          <h2 className="mt-2 font-serif text-2xl text-paper">
            Markets move fast. Understanding them takes research.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-paper-dim">
            Whether you need a market overview, competitive intelligence,
            commodity analysis or a custom research project, let&apos;s
            investigate the question behind the decision.
          </p>
          <div className="mt-6">
            <Button href="/contact">Start a research project</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="rule container-page py-16">
        <div className="max-w-xl">
          <p className="label-eyebrow">The Research Brief</p>
          <h2 className="mt-2 font-serif text-2xl text-paper">
            Short, useful intelligence — straight to your inbox.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-paper-dim">
            Bangladesh markets, commodities, FMCG and emerging-market business
            — sent occasionally, never spam.
          </p>
          <div className="mt-6">
            <Button
              href="https://researchwithsabbir.substack.com"
              external
              variant="secondary"
            >
              Subscribe on Substack
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
