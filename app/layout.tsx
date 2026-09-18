import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageViewTracker from "@/components/PageViewTracker";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/metadata";
import { getSiteContent } from "@/data/siteContent";
import { getFontPairing } from "@/lib/theme";

// The Header fetches CMS-created pages, and this layout fetches
// Appearance settings, from Supabase — force the whole app dynamic
// so changes show without needing a new deploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Bangladesh Market & Business Research`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accentColor, fontPairingId] = await Promise.all([
    getSiteContent("theme_accent_color"),
    getSiteContent("theme_font_pairing"),
  ]);

  const pairing = getFontPairing(fontPairingId || "editorial");

  return (
    <html
      lang="en"
      style={
        {
          "--color-accent": accentColor || "#C99A4B",
          "--font-serif": pairing.serifVar,
          "--font-sans": pairing.sansVar,
        } as React.CSSProperties
      }
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={pairing.googleFontsHref} rel="stylesheet" />
      </head>
      <body>
        <PageViewTracker />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
