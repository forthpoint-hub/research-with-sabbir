import { supabase } from "@/lib/supabaseClient";
import { ResearchItem, ResearchType } from "@/types/content";

function mapRow(row: any): ResearchItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? "",
    description: row.description ?? "",
    category: row.category ?? "",
    type: (row.type ?? "free") as ResearchType,
    publicationDate: row.publication_date ?? "",
    readingTime: row.reading_time ?? "",
    author: row.author ?? "Sabbir Ahmad",
    coverImage: "",
    content: row.content ?? "",
    keyFindings: row.key_findings ?? [],
    methodology: row.methodology ?? "",
    sources: row.sources ?? [],
    pdfUrl: row.pdf_url || undefined,
    externalUrl: row.external_url || undefined,
    featured: Boolean(row.featured),
  };
}

export async function getAllResearch(): Promise<ResearchItem[]> {
  const { data, error } = await supabase
    .from("research")
    .select("*")
    .order("publication_date", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getResearchBySlug(
  slug: string
): Promise<ResearchItem | undefined> {
  const { data, error } = await supabase
    .from("research")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapRow(data);
}
