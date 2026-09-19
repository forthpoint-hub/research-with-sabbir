import { supabase } from "@/lib/supabaseClient";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
}

function mapRow(row: any): ServiceItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    sortOrder: row.sort_order ?? 0,
  };
}

export async function getAllServices(): Promise<{
  items: ServiceItem[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getAllServices:", error.message);
    return { items: [], error: error.message };
  }
  return { items: (data ?? []).map(mapRow), error: null };
}
