export interface Article {
  slug: string;
  title: string;
  minutes: number;
  excerpt: string;
  overview: string;
  example: string;
  image: string;
  alt: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "what-is-a-dscr-loan",
    title: "What Is a DSCR Loan?",
    minutes: 4,
    excerpt: "A DSCR loan qualifies the property, not the paycheck.",
    overview:
      "A DSCR loan is an investor loan where the property's rental income relative to its payment is the main qualifying measure, rather than personal employment income.",
    example:
      "A property renting for $3,100/month with a $2,313 PITIA payment has a DSCR of roughly 1.34x — the rent covers the payment with room to spare.",
    image: "/images/atlas/interiors/atlas-interior-open-kitchen-living.webp",
    alt: "Open-concept kitchen and living area in a rental property",
  },
  {
    slug: "how-dscr-is-calculated",
    title: "How DSCR Is Calculated",
    minutes: 5,
    excerpt: "Effective rent divided by PITIA, with the assumptions shown.",
    overview:
      "DSCR is calculated as effective monthly rent (rent adjusted for an assumed vacancy factor) divided by the full monthly payment, or PITIA: principal, interest, taxes, insurance and association dues.",
    example:
      "$3,100 rent at 5% vacancy = $2,945 effective rent. Divided by a $2,197 PITIA payment gives a DSCR of about 1.34x.",
    image: "/images/atlas/properties/atlas-rental-property-supporting.webp",
    alt: "Two-story rental property exterior with stone accents at dusk",
  },
  {
    slug: "dscr-vs-conventional-financing",
    title: "DSCR vs Conventional Financing",
    minutes: 6,
    excerpt: "Property cash flow versus personal income documentation.",
    overview:
      "Conventional financing typically reviews personal income, employment history and debt-to-income ratio. DSCR financing instead centers on whether the property's rent supports its own payment.",
    example:
      "An investor with strong rental income but non-traditional personal income documentation may find a DSCR program more straightforward to qualify for than a conventional loan.",
    image: "/images/atlas/interiors/atlas-interior-living-dining.webp",
    alt: "Living and dining area with kitchen beyond in a rental property",
  },
  {
    slug: "how-much-can-i-borrow",
    title: "How Much Can I Borrow?",
    minutes: 5,
    excerpt: "Two limits apply: loan-to-value and coverage.",
    overview:
      "Borrowing capacity in a DSCR scenario is generally bounded by two limits: the maximum loan-to-value (LTV) a program allows, and the minimum DSCR coverage the property must produce at that loan amount.",
    example:
      "At 75% LTV a $425,000 purchase supports roughly a $318,750 loan; that loan amount is then checked against the property's DSCR at the quoted rate.",
    image: "/images/atlas/properties/atlas-duplex-investment.webp",
    alt: "Duplex investment property with matching entrances and landscaped frontage",
  },
  {
    slug: "cash-out-refinance-guide",
    title: "Cash-Out Refinance Guide",
    minutes: 7,
    excerpt: "Replace a loan and take equity out, within limits.",
    overview:
      "A cash-out refinance replaces an existing loan with a larger one based on current property value, letting an investor take the difference as cash, subject to program LTV limits.",
    example:
      "A property valued at $680,000 with a $320,000 balance could support up to roughly $510,000 in new debt at a 75% LTV cap — about $190,000 in potential cash-out, before costs.",
    image: "/images/atlas/properties/atlas-cashout-property.webp",
    alt: "Single-story rental property with mature landscaping at sunset",
  },
  {
    slug: "understanding-ltv",
    title: "Understanding LTV",
    minutes: 3,
    excerpt: "Loan amount divided by property value.",
    overview:
      "Loan-to-value (LTV) is the loan amount divided by the lesser of purchase price or appraised value, expressed as a percentage. Lower LTV generally means more equity cushion and easier qualification.",
    example: "A $318,750 loan on a $425,000 purchase is a 75% LTV.",
    image: "/images/atlas/markets/atlas-market-pennsylvania.webp",
    alt: "Single-family rental property exterior in a Pennsylvania neighborhood at dusk",
  },
  {
    slug: "understanding-ltc",
    title: "Understanding LTC",
    minutes: 4,
    excerpt: "Loan amount divided by total project cost.",
    overview:
      "Loan-to-cost (LTC) compares the loan amount to the total cost of a project, including acquisition and planned improvements — commonly used for renovation or value-add scenarios rather than a simple purchase.",
    example:
      "A $300,000 purchase plus $50,000 in renovations is a $350,000 total cost; a $262,500 loan against that is 75% LTC.",
    image: "/images/atlas/markets/atlas-market-new-jersey.webp",
    alt: "Single-family rental property exterior in a New Jersey neighborhood",
  },
  {
    slug: "financing-multiple-rental-properties",
    title: "Financing Multiple Rental Properties",
    minutes: 6,
    excerpt: "Scale by portfolio metrics, not one deal at a time.",
    overview:
      "Portfolio financing can cover more than one rental property under a blended view of LTV, DSCR and equity, rather than underwriting each property in isolation.",
    example:
      "A 6-property, $2.4M portfolio with $1.5M in existing debt (62.5% LTV) and a 1.26x average DSCR gives a lender a single, blended risk picture.",
    image: "/images/atlas/properties/atlas-small-multifamily.webp",
    alt: "Modern low-rise multifamily investment property with balconies",
  },
  {
    slug: "dscr-rental-purchase",
    title: "DSCR Rental Purchase",
    minutes: 5,
    excerpt: "How buying a rental with property cash flow works.",
    overview:
      "A rental purchase financed on DSCR terms is qualified primarily on the subject property's projected rent versus its payment, rather than the buyer's personal income documentation.",
    example:
      "An investor buying a $425,000 rental projected to earn $3,100/month can model DSCR before writing an offer, using the same formula a lender would apply.",
    image: "/images/atlas/properties/atlas-duplex-investment.webp",
    alt: "Duplex investment property with matching entrances and landscaped frontage",
  },
  {
    slug: "rate-and-term-refinance",
    title: "Rate & Term Refinance",
    minutes: 5,
    excerpt: "Change the loan without taking cash out.",
    overview:
      "A rate-and-term refinance replaces an existing loan with a new one — often to improve the rate, adjust the term or change amortization — without extracting equity as cash.",
    example:
      "Refinancing from an interest-only loan to a fully amortizing 30-year term changes the monthly P&I and therefore the property's DSCR at the new payment.",
    image: "/images/atlas/markets/atlas-market-illinois.webp",
    alt: "Single-family rental property exterior in an Illinois neighborhood at dusk",
  },
  {
    slug: "understanding-arv",
    title: "Understanding ARV",
    minutes: 4,
    excerpt: "After-repair value and what it means for a refinance.",
    overview:
      "After-repair value (ARV) is the estimated value of a property once planned renovations are complete. It's commonly used to size a refinance once value-add work has been done.",
    example:
      "A property purchased for $300,000 and renovated to an ARV of $400,000 may support a larger refinance loan than the original purchase price would have.",
    image: "/images/atlas/markets/atlas-market-florida.webp",
    alt: "Single-family rental property exterior in a Florida neighborhood",
  },
  {
    slug: "portfolio-financing-guide",
    title: "Portfolio Financing Guide",
    minutes: 6,
    excerpt: "Blended metrics across several rentals.",
    overview:
      "Portfolio financing evaluates a group of properties together — blended LTV, average DSCR and total equity — which can simplify financing for investors scaling past a handful of doors.",
    example:
      "Modeling six properties together at a 1.26x average DSCR gives a clearer growth picture than reviewing each property's DSCR independently.",
    image: "/images/atlas/properties/atlas-small-multifamily.webp",
    alt: "Modern low-rise multifamily investment property with balconies",
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
