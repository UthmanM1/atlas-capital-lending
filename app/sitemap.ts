import type { MetadataRoute } from "next";
import { MARKETS } from "@/lib/content/markets";
import { ARTICLES } from "@/lib/content/articles";

const SITE_URL = "https://atlas-capital-lending.example.com";

const STATIC_ROUTES = [
  "",
  "/loans/dscr",
  "/loans/rental-purchase",
  "/loans/cash-out",
  "/loans/rate-term",
  "/loans/portfolio",
  "/loans/dscr-rental-purchase",
  "/calculators/dscr",
  "/calculators/ltv",
  "/calculators/ltc",
  "/calculators/arv",
  "/investors",
  "/brokers",
  "/resources",
  "/markets",
  "/how-it-works",
  "/requirements",
  "/funded-deals",
  "/case-study",
  "/case-studies/dscr-lending-platform",
  "/technology",
  "/growth/seo",
  "/growth/ai-search",
  "/growth/paid-search",
  "/growth/analytics",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclosures",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
  }));
  const marketEntries = MARKETS.map((m) => ({
    url: `${SITE_URL}/markets/${m.slug}`,
    lastModified: now,
  }));
  const articleEntries = ARTICLES.map((a) => ({
    url: `${SITE_URL}/resources/${a.slug}`,
    lastModified: now,
  }));
  return [...staticEntries, ...marketEntries, ...articleEntries];
}
