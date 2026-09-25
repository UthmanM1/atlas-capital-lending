export const CAMPAIGN_NAME = "DSCR Rental Purchase";

export interface AdGroup {
  name: string;
  keywords: string[];
  headline: string;
  description: string;
  finalUrl: string;
}

/** Illustrative ad content only — never actually served. */
export const AD_GROUPS: AdGroup[] = [
  {
    name: "DSCR Rental Loans",
    keywords: ["dscr rental loan", "dscr loan for rental property", "rental property dscr financing"],
    headline: "DSCR Rental Property Loans | Qualify on Rent, Not W-2s",
    description:
      "Finance a rental purchase using property cash flow. See your estimated DSCR and loan amount in minutes.",
    finalUrl: "/loans/dscr-rental-purchase",
  },
  {
    name: "DSCR Investment Property Loans",
    keywords: ["dscr investment property loan", "investment property loan no income", "buy rental without w2"],
    headline: "Investment Property Financing | DSCR Loans for Investors",
    description:
      "A guided scenario tool for rental investors: purchase price, rent and estimated DSCR, side by side.",
    finalUrl: "/loans/dscr-rental-purchase",
  },
  {
    name: "DSCR Loans Florida",
    keywords: ["dscr loan florida", "florida rental property loan", "florida investment property financing"],
    headline: "Florida DSCR Rental Loans | Illustrative Investor Scenarios",
    description: "See how a Florida rental purchase could be structured on property cash flow.",
    finalUrl: "/loans/dscr-rental-purchase",
  },
  {
    name: "DSCR Loans New Jersey",
    keywords: ["dscr loan new jersey", "nj rental property loan", "new jersey investment property financing"],
    headline: "New Jersey DSCR Rental Loans | Illustrative Investor Scenarios",
    description: "Model a New Jersey duplex or single-family rental purchase on property cash flow.",
    finalUrl: "/loans/dscr-rental-purchase",
  },
];

export const NEGATIVE_KEYWORDS = ["jobs", "careers", "free", "personal loan", "FHA", "owner occupied"];

export const CONVERSION_PATH = [
  "Search",
  "Landing Page",
  "Calculator",
  "Qualification",
  "Lead",
  "CRM",
  "Appointment",
  "Application",
];

export const ILLUSTRATIVE_CAMPAIGN_NOTE = "Illustrative portfolio campaign — not historical performance.";
