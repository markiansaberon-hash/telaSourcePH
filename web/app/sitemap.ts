import type { MetadataRoute } from "next";
import { fetchCatalog, slugify } from "./lib/catalog";

const SITE_URL = "https://telasourceph.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/sale`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/upload`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const catalog = await fetchCatalog();
  const fabricPages: MetadataRoute.Sitemap = catalog
    .filter((f) => f.category === "fabric")
    .map((f) => ({
      url: `${SITE_URL}/fabric/${slugify(f.name)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...fabricPages];
}
