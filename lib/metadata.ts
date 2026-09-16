import { Metadata } from "next";

export const SITE_NAME = "Research With Sabbir";
export const SITE_DESCRIPTION =
  "Independent research and analysis on Bangladesh, emerging markets, commodities, FMCG and business strategy by Sabbir Ahmad.";

// Replace this with your real Vercel URL once you have it, then again
// if you connect a custom domain later.
export const SITE_URL = "https://research-with-sabbir.vercel.app";

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const desc = description ?? SITE_DESCRIPTION;
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} — ${SITE_NAME}`,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description: desc,
    },
  };
}
