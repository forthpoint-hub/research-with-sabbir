"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    // Don't track admin usage — only real visitors.
    if (pathname.startsWith("/admin")) return;

    supabase.from("page_views").insert({ path: pathname }).then();
  }, [pathname]);

  return null;
}
