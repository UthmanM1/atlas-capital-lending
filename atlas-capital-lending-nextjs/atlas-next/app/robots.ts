import type { MetadataRoute } from "next";

const SITE_URL = "https://atlas-capital-lending.example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal", "/broker", "/staff", "/staff/marketing"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
