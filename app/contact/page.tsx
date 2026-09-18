import ContactForm from "@/components/ContactForm";
import { getSiteContent } from "@/data/siteContent";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Start a research project with Research With Sabbir.",
  path: "/contact",
});

export default async function ContactPage() {
  const email = (await getSiteContent("contact_email")) || "md.sabbir26@hotmail.com";

  return (
    <section className="container-page max-w-2xl py-16">
      <p className="label-eyebrow">Work With Me</p>
      <h1 className="mt-2 font-serif text-3xl text-paper">
        Start a research project
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-paper-dim">
        Tell me about the question behind your decision, and I&apos;ll get
        back to you about scope and timeline.
      </p>

      <ContactForm contactEmail={email} />
    </section>
  );
}
