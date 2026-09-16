import { Insight } from "@/types/content";

// SAMPLE CONTENT — replace with your real short-form insights.

export const insights: Insight[] = [
  {
    id: "1",
    slug: "sample-insight",
    title: "Sample Insight Title Goes Here",
    summary: "Replace with a one-sentence summary of the insight.",
    content:
      "Replace this placeholder with your real insight content, written as plain paragraphs separated by blank lines.",
    category: "Consumer Behavior",
    publicationDate: "2026-09-05",
    readingTime: "5 min",
    coverImage: "",
    featured: true,
  },
];

export function getInsightBySlug(slug: string) {
  return insights.find((item) => item.slug === slug);
}
