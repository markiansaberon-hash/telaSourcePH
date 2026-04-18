import type { MetadataRoute } from "next";

const SITE_URL = "https://telasourceph.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/thank-you"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
