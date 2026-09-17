import { getAllInsights } from "@/data/insights";
import InsightCard from "@/components/research/InsightCard";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Insights",
  description: "Short analytical notes from the research desk.",
  path: "/insights",
});

export default async function InsightsPage() {
  const insights = await getAllInsights();

  return (
    <section className="container-page py-16">
      <p className="label-eyebrow">Editorial</p>
      <h1 className="mt-2 max-w-2xl font-serif text-3xl text-paper">
        Shorter notes from the research desk
      </h1>

      <div className="mt-10 max-w-prose">
        {insights.length === 0 ? (
          <p className="text-sm text-paper-dim">
            No insights yet — add them in the admin dashboard.
          </p>
        ) : (
          insights.map((item) => <InsightCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  );
}
