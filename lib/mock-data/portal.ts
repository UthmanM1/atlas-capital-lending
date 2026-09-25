export const APPLICATION_STAGES = [
  "Pre-qualification",
  "Application",
  "Documents",
  "Underwriting",
  "Approval",
  "Closing",
];

/** status: 0 = not started, 1 = in progress, 2 = received */
export interface DocTask {
  label: string;
  due: string;
  status: 0 | 1 | 2;
}

export const INITIAL_DOC_TASKS: DocTask[] = [
  { label: "Upload insurance declaration page", due: "Oct 2", status: 0 },
  { label: "Upload two months of bank statements", due: "Oct 5", status: 2 },
  { label: "Sign borrower authorization", due: "Sep 28", status: 2 },
];

export const BORROWER_LOAN_SUMMARY: [string, string][] = [
  ["Program", "DSCR Rental Purchase"],
  ["Est. loan", "$318,750"],
  ["DSCR / LTV", "1.34x / 75%"],
  ["Advisor", "A. Reyes"],
];

export interface PortfolioProperty {
  city: string;
  value: number;
  rent: number;
  debt: number;
  dscr: number;
}

/** Illustrative example portfolio, ported from PR. */
export const PORTFOLIO_PROPERTIES: PortfolioProperty[] = [
  { city: "Tampa, FL", value: 420000, rent: 3100, debt: 260000, dscr: 1.31 },
  { city: "Columbus, OH", value: 380000, rent: 2900, debt: 240000, dscr: 1.22 },
  { city: "Charlotte, NC", value: 350000, rent: 2600, debt: 210000, dscr: 1.28 },
  { city: "Phoenix, AZ", value: 410000, rent: 3000, debt: 260000, dscr: 1.24 },
  { city: "Atlanta, GA", value: 390000, rent: 2900, debt: 240000, dscr: 1.3 },
  { city: "Nashville, TN", value: 450000, rent: 3200, debt: 290000, dscr: 1.21 },
];

export const PORTFOLIO_IMAGES: { image: string; alt: string }[] = [
  { image: "/images/atlas/portfolio/atlas-portfolio-property-01.webp", alt: "Single-family rental property exterior, illustrative portfolio example" },
  { image: "/images/atlas/portfolio/atlas-portfolio-property-02.webp", alt: "Single-family rental property exterior, illustrative portfolio example" },
  { image: "/images/atlas/portfolio/atlas-portfolio-property-03.webp", alt: "Single-family rental property exterior at dusk, illustrative portfolio example" },
  { image: "/images/atlas/portfolio/atlas-portfolio-property-04.webp", alt: "Brick duplex rental property exterior, illustrative portfolio example" },
  { image: "/images/atlas/portfolio/atlas-portfolio-property-05.webp", alt: "Single-family rental property exterior at dusk, illustrative portfolio example" },
  { image: "/images/atlas/portfolio/atlas-portfolio-property-06.webp", alt: "Single-family rental property exterior, illustrative portfolio example" },
];
