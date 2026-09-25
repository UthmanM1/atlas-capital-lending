export interface Market {
  slug: string;
  name: string;
  context: string;
  example: string;
  considerations: string;
  image: string;
  alt: string;
}

export const MARKETS: Market[] = [
  {
    slug: "new-jersey",
    name: "New Jersey",
    context: "Dense, transit-linked demand where 2–4 unit properties are common.",
    example: "$389K duplex · $3,900 combined rent",
    considerations: "Property taxes weigh heavily on PITIA and can lower DSCR.",
    image: "/images/atlas/markets/atlas-market-new-jersey.webp",
    alt: "Single-family rental property exterior in a New Jersey neighborhood",
  },
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    context: "Lower price points and strong small-multifamily activity.",
    example: "$210K rowhome · $1,800 rent",
    considerations: "Rent-to-price ratios can look strong, so check tax reassessment.",
    image: "/images/atlas/markets/atlas-market-pennsylvania.webp",
    alt: "Single-family rental property exterior in a Pennsylvania neighborhood at dusk",
  },
  {
    slug: "new-york",
    name: "New York",
    context: "Wide range from upstate single-family to downstate multifamily.",
    example: "$340K single family · $2,700 rent",
    considerations: "Entity structures and closing costs differ meaningfully by county.",
    image: "/images/atlas/markets/atlas-market-new-york.webp",
    alt: "Brick duplex rental property exterior in a New York neighborhood",
  },
  {
    slug: "illinois",
    name: "Illinois",
    context: "Established rental markets with higher property-tax burdens.",
    example: "$265K condo · $2,100 rent",
    considerations: "Taxes and HOA dues are key DSCR variables.",
    image: "/images/atlas/markets/atlas-market-illinois.webp",
    alt: "Single-family rental property exterior in an Illinois neighborhood at dusk",
  },
  {
    slug: "florida",
    name: "Florida",
    context: "Population growth and short- and long-term rental demand.",
    example: "$425K single family · $3,100 rent",
    considerations: "Insurance costs can move PITIA sharply.",
    image: "/images/atlas/markets/atlas-market-florida.webp",
    alt: "Single-family rental property exterior in a Florida neighborhood",
  },
  {
    slug: "california",
    name: "California",
    context: "High values and lower rent-to-price ratios.",
    example: "$780K duplex · $5,200 rent",
    considerations: "DSCR can be tight at higher prices, so lower leverage matters.",
    image: "/images/atlas/markets/atlas-market-california.webp",
    alt: "Single-family rental property exterior in a California neighborhood",
  },
];

export const MARKET_DISCLAIMER =
  "Illustrative market page. State availability and licensing must be confirmed before launch.";
