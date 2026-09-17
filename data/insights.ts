import { supabase } from "@/lib/supabaseClient";
import { Insight } from "@/types/content";

function mapRow(row: any): Insight {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? "",
    content: row.content ?? "",
    category: row.category ?? "",
    publicationDate: row.publication_date ?? "",
    readingTime: row.reading_time ?? "",
    coverImage: "",
    featured: Boolean(row.featured),
  };
}

export async function getAllInsights(): Promise<Insight[]> {
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .order("publication_date", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getInsightBySlug(
  slug: string
): Promise<Insight | undefined> {
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapRow(data);
}
