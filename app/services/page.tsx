import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Market research, competitor analysis and business intelligence services for companies entering or operating in Bangladesh.",
  path: "/services",
});

const SERVICES = [
  {
    title: "Market Research",
    description:
      "Sizing, structure and dynamics of a specific market or category.",
  },
  {
    title: "Competitor Analysis",
    description:
      "Positioning, pricing and go-to-market breakdowns of named competitors.",
  },
  {
    title: "Market Entry Research",
    description:
      "What it takes to enter the Bangladesh market — regulatory, distribution and demand-side considerations.",
  },
  {
    title: "Bangladesh Market Intelligence",
    description:
      "Ongoing or one-off intelligence on Bangladesh consumer and commodity markets.",
  },
  {
    title: "Supplier & Buyer Research",
    description:
      "Identifying and evaluating potential suppliers or buyers in a given category.",
  },
  {
    title: "Custom Research",
    description:
      "A research project scoped around the specific question behind your decision.",
  },
];

export default function ServicesPage() {
  return (
    <section className="container-page py-16">
      <p className="label-eyebrow">Services</p>
      <h1 className="mt-2 max-w-2xl font-serif text-3xl text-paper">
        Research scoped to the decision in front of you
      </h1>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <div key={service.title} className="border-t border-line pt-5">
            <h2 className="font-serif text-lg text-paper">{service.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-paper-dim">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <Button href="/contact">Start a research project</Button>
      </div>
    </section>
  );
}
