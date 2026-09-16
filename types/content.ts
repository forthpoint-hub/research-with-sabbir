export type ResearchType = "free" | "premium";

export interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  type: ResearchType;
  publicationDate: string; // e.g. "2026-08-18"
  readingTime: string; // e.g. "18 min"
  author: string;
  coverImage: string;
  content: string; // plain paragraphs, split on \n\n
  keyFindings: string[];
  methodology: string;
  sources: string[];
  pdfUrl?: string;
  externalUrl?: string;
  featured: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string; // display string, e.g. "$99"
  coverImage: string;
  checkoutUrl: string;
  category: string;
  featured: boolean;
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  publicationDate: string;
  readingTime: string;
  coverImage: string;
  featured: boolean;
}
