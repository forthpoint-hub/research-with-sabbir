"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "authed" | "guest">(
    "loading"
  );
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStatus("authed");
      } else {
        setStatus("guest");
        router.replace("/admin/login");
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setStatus("authed");
        } else {
          setStatus("guest");
          router.replace("/admin/login");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (status !== "authed") {
    return (
      <p className="container-page py-16 text-sm text-paper-dim">
        Checking access&hellip;
      </p>
    );
  }

  return <>{children}</>;
}
