export interface SeoPageGroup {
  title: string;
  items: { label: string; href?: string }[];
}

export const SEO_PAGE_GROUPS: SeoPageGroup[] = [
  {
    title: "Core DSCR",
    items: [
      { label: "DSCR Loans", href: "/loans/dscr" },
      { label: "DSCR Rental Loans", href: "/loans/dscr-rental-purchase" },
      { label: "DSCR Refinance", href: "/loans/rate-term" },
      { label: "DSCR Cash-Out Refinance", href: "/loans/cash-out" },
      { label: "DSCR Portfolio Loans", href: "/loans/portfolio" },
    ],
  },
  {
    title: "Educational",
    items: [
      { label: "What is a DSCR loan?", href: "/resources/what-is-a-dscr-loan" },
      { label: "How is DSCR calculated?", href: "/resources/how-dscr-is-calculated" },
      { label: "DSCR vs conventional investment loans", href: "/resources/dscr-vs-conventional-financing" },
      { label: "DSCR loan requirements", href: "/requirements" },
      { label: "How much can I borrow with a DSCR loan?", href: "/resources/how-much-can-i-borrow" },
    ],
  },
  {
    title: "State",
    items: [
      { label: "DSCR Loans Florida", href: "/markets/florida" },
      { label: "DSCR Loans New Jersey", href: "/markets/new-jersey" },
      { label: "DSCR Loans Pennsylvania", href: "/markets/pennsylvania" },
      { label: "DSCR Loans New York", href: "/markets/new-york" },
      { label: "DSCR Loans Illinois", href: "/markets/illinois" },
      { label: "DSCR Loans California", href: "/markets/california" },
    ],
  },
  {
    title: "Calculators",
    items: [
      { label: "DSCR Calculator", href: "/calculators/dscr" },
      { label: "LTV Calculator", href: "/calculators/ltv" },
      { label: "LTC Calculator", href: "/calculators/ltc" },
      { label: "ARV Calculator", href: "/calculators/arv" },
      { label: "Rental Cash Flow Calculator", href: "/loans/dscr-rental-purchase/apply" },
    ],
  },
];

export const TECHNICAL_SEO_TOPICS: [string, string][] = [
  ["Internal linking", "Calculators, articles and market pages cross-link to the funnels they support, so link equity flows toward conversion pages."],
  ["Structured data", "Article, FAQ and organization schema on Knowledge Hub and market pages, to make content eligible for rich results."],
  ["Canonical URLs", "One canonical URL per topic (e.g. one DSCR-calculation article), avoiding duplicate-content splits across similar pages."],
  ["XML sitemap", "Generated at /sitemap.xml (app/sitemap.ts) and kept in sync with the App Router automatically."],
  ["Metadata", "Unique title and description per route, set via Next.js Metadata API — see app/*/page.tsx."],
  ["Technical SEO", "Semantic HTML, heading hierarchy, and image alt text throughout — see the accessibility notes in the README."],
  ["Core Web Vitals", "Server-rendered pages, next/image optimization, and lazy-loaded below-the-fold photography keep load fast."],
  ["Crawlability", "robots.ts explicitly disallows internal tool routes (portal, staff) while keeping content routes open."],
  ["Content updates", "Knowledge Hub articles are structured content (lib/content/articles.ts) so updates don't require template changes."],
];

export const NO_RANKING_PROMISE_SEO =
  "This is a demonstration of information architecture and technical SEO practice, not a ranking or traffic guarantee.";

export const AI_SEARCH_TOPICS: [string, string][] = [
  ["Question-based content", "Article titles and headings phrased as the questions investors actually ask, not just keyword phrases."],
  ["Structured answers", "Each article leads with a direct, concise answer before expanding — the format AI answer engines tend to extract cleanly."],
  ["Original calculations", "The DSCR/LTV/LTC/ARV calculators produce original, worked numeric examples — content that's harder to find duplicated elsewhere."],
  ["Authoritative educational content", "Plain-language explanations of DSCR, LTV and LTC concepts, written to be correct and citable on their own."],
  ["Internal linking", "Every article links to the calculator and funnel it supports, and back to related articles — reinforcing topical relationships."],
  ["Entity / context clarity", "Consistent naming (\"DSCR\", \"Atlas Capital Lending\", specific states) so answer engines can disambiguate the topic confidently."],
  ["Source transparency", "Formulas and assumptions are shown inline, not hidden behind a black-box score — the same information an AI Overview would need to summarize accurately."],
];

export const AI_SEARCH_EXAMPLE_QUESTIONS = [
  "What is a DSCR loan?",
  "What DSCR do lenders typically require?",
  "Can an LLC get a DSCR loan?",
  "How does DSCR affect borrowing capacity?",
  "Can I refinance a rental property with a DSCR loan?",
  "How is DSCR calculated?",
];

export const NO_GUARANTEE_AI_SEARCH =
  "No rankings, citations, AI visibility, or ad placement are guaranteed.";
