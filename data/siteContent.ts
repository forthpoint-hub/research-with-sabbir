import { supabase } from "@/lib/supabaseClient";

export async function getSiteContent(key: string): Promise<string> {
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error || !data) return "";
  return data.value ?? "";
}
