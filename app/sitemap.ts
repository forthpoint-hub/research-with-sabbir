import { MetadataRoute } from "next";
import { getAllResearch } from "@/data/research";
import { SITE_URL } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/research",
    "/products",
    "/insights",
    "/services",
    "/about",
    "/markets",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const research = await getAllResearch();
  const researchRoutes = research.map((item) => ({
    url: `${SITE_URL}/research/${item.slug}`,
    lastModified: item.publicationDate || new Date().toISOString(),
  }));

  return [...staticRoutes, ...researchRoutes];
}
