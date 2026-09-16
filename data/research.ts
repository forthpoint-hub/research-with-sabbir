import { ResearchItem } from "@/types/content";

// SAMPLE CONTENT — replace these entries with your real research.
// Keep the same field shape. Add a new object to this array for each
// new report; the site does not need to be rebuilt for that.

export const research: ResearchItem[] = [
  {
    id: "1",
    slug: "sample-free-report",
    title: "Sample Free Report Title Goes Here",
    subtitle: "A one-line subtitle describing the report's focus",
    description:
      "Replace this with a two-to-three sentence summary of what the report covers and why it matters to the reader.",
    category: "FMCG",
    type: "free",
    publicationDate: "2026-09-01",
    readingTime: "12 min",
    author: "Sabbir Ahmad",
    coverImage: "",
    content:
      "Replace this placeholder with your real research content, written as plain paragraphs separated by blank lines.\n\nEach paragraph will render as its own block on the research page.",
    keyFindings: [
      "Replace with your first verified key finding.",
      "Replace with your second verified key finding.",
      "Replace with your third verified key finding.",
    ],
    methodology:
      "Describe how the research was conducted — sources, timeframe, and approach.",
    sources: ["Add your real sources here, one per line."],
    pdfUrl: "/reports/sample-free-report.pdf",
    featured: true,
  },
  {
    id: "2",
    slug: "sample-premium-report",
    title: "Sample Premium Report Title Goes Here",
    subtitle: "A one-line subtitle describing the report's focus",
    description:
      "Replace this with a two-to-three sentence summary for a paid research report.",
    category: "Commodities",
    type: "premium",
    publicationDate: "2026-08-20",
    readingTime: "20 min",
    author: "Sabbir Ahmad",
    coverImage: "",
    content:
      "Replace this placeholder with a preview of the premium report content — the part visible before purchase.",
    keyFindings: [
      "Replace with a teaser finding that doesn't give away the full report.",
    ],
    methodology: "Describe the methodology at a high level.",
    sources: ["Sources are typically listed in the full report."],
    externalUrl: "https://gumroad.com/l/replace-with-your-checkout-link",
    featured: true,
  },
];

export function getResearchBySlug(slug: string) {
  return research.find((item) => item.slug === slug);
}
