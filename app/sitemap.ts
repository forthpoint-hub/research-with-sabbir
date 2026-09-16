import { MetadataRoute } from "next";
import { research } from "@/data/research";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const researchRoutes = research.map((item) => ({
    url: `${SITE_URL}/research/${item.slug}`,
    lastModified: item.publicationDate,
  }));

  return [...staticRoutes, ...researchRoutes];
}
