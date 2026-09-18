import Link from "next/link";
import { getSiteContent } from "@/data/siteContent";

const NAV = [
  { href: "/research", label: "Research" },
  { href: "/products", label: "Products" },
  { href: "/insights", label: "Insights" },
  { href: "/services", label: "Services" },
  { href: "/markets", label: "Markets" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const DEFAULTS = {
  tagline:
    "Independent market and business research — Bangladesh, emerging markets, commodities, FMCG and business strategy.",
  email: "md.sabbir26@hotmail.com",
  linkedin: "https://www.linkedin.com/in/sabbir26",
  instagram: "https://instagram.com/sabbir.brief_",
  substack: "https://researchwithsabbir.substack.com",
};

export default async function Footer() {
  const [tagline, email, linkedin, instagram, substack] = await Promise.all([
    getSiteContent("footer_tagline"),
    getSiteContent("contact_email"),
    getSiteContent("social_linkedin"),
    getSiteContent("social_instagram"),
    getSiteContent("social_substack"),
  ]);

  const social = [
    { href: linkedin || DEFAULTS.linkedin, label: "LinkedIn" },
    { href: instagram || DEFAULTS.instagram, label: "Instagram" },
    { href: substack || DEFAULTS.substack, label: "Substack" },
  ];

  return (
    <footer className="rule mt-24">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-paper">Research With Sabbir</p>
          <p className="mt-3 max-w-xs text-sm text-paper-dim">
            {tagline || DEFAULTS.tagline}
          </p>
        </div>

        <div>
          <p className="label-eyebrow mb-3">Navigate</p>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-paper-dim no-underline hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-eyebrow mb-3">Follow the research</p>
          <ul className="space-y-2">
            {social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-paper-dim no-underline hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${email || DEFAULTS.email}`}
                className="text-sm text-paper-dim no-underline hover:text-paper"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="rule">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-paper-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            Research With Sabbir provides independent research and analysis
            for informational and business purposes. It does not constitute
            financial, investment or legal advice.
          </p>
          <p>&copy; {new Date().getFullYear()} Research With Sabbir.</p>
        </div>
      </div>
    </footer>
  );
}
