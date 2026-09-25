import type { MetadataRoute } from "next";

const SITE_URL = "https://atlas-capital-lending.example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/portal",
          "/broker",
          "/staff",
          "/staff/marketing",
          "/loans/dscr-rental-purchase/apply",
          "/loans/dscr-rental-purchase/scenario",
          "/loans/dscr-rental-purchase/book",
        ],
        // /portal, /portal/borrower, /portal/broker(/deals/*), /portal/staff(/deals/*) and
        // /portal/architecture are all covered by the "/portal" prefix rule above.
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
