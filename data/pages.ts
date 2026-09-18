import { supabase } from "@/lib/supabaseClient";

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDescription: string;
  published: boolean;
}

function mapRow(row: any): CmsPage {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content ?? "",
    metaDescription: row.meta_description ?? "",
    published: Boolean(row.published),
  };
}

export async function getPageBySlug(slug: string): Promise<CmsPage | undefined> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapRow(data);
}

export async function getAllPublishedPages(): Promise<CmsPage[]> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data.map(mapRow);
}
