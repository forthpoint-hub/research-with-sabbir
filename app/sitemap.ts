import { MetadataRoute } from "next";
import { getAllResearch } from "@/data/research";
import { getAllPublishedPages } from "@/data/pages";
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

  const [research, pages] = await Promise.all([
    getAllResearch(),
    getAllPublishedPages(),
  ]);

  const researchRoutes = research.map((item) => ({
    url: `${SITE_URL}/research/${item.slug}`,
    lastModified: item.publicationDate || new Date().toISOString(),
  }));

  const pageRoutes = pages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...researchRoutes, ...pageRoutes];
}
