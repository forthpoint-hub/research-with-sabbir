import Button from "@/components/ui/Button";
import { getAllServices } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Market research, competitor analysis and business intelligence services for companies entering or operating in Bangladesh.",
  path: "/services",
});

export default async function ServicesPage() {
  const { items: services, error } = await getAllServices();

  return (
    <section className="container-page py-16">
      <p className="label-eyebrow">Services</p>
      <h1 className="mt-2 max-w-2xl font-serif text-3xl text-paper">
        Research scoped to the decision in front of you
      </h1>

      {error ? (
        <p className="mt-10 text-sm text-alert">
          Couldn&apos;t load services: {error}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.id} className="border-t border-line pt-5">
              <h2 className="font-serif text-lg text-paper">{service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-14">
        <Button href="/contact">Start a research project</Button>
      </div>
    </section>
  );
}
