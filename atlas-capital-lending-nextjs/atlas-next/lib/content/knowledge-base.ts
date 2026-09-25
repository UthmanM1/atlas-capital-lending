export const FAQ: [string, string][] = [
  [
    "Do I need W-2 income?",
    "DSCR analysis centers on the property's rent versus its payment. Programs differ on what else they review.",
  ],
  [
    "What DSCR is enough?",
    "It varies by program. 1.25x is treated as strong in this example, not as a lending standard.",
  ],
  [
    "Is this an approval?",
    "No. Everything here is an illustrative estimate and not an approval or commitment to lend.",
  ],
];

export const FAQ_EXTENDED: [string, string][] = [
  ...FAQ,
  ["Can I finance multiple rentals?", "Portfolio financing can cover more than one property; terms vary by program."],
  ["What documents do I need?", "Typically a lease, insurance page and bank statements."],
];

interface KbEntry {
  pattern: string;
  answer: string;
  link?: string;
  linkLabel?: string;
}

/**
 * Ask Atlas answers only from this approved content. Order matters — guardrail
 * entries (rates/approval/eligibility) are checked first, same as the original.
 */
export const ASK_ATLAS_KB: KbEntry[] = [
  {
    pattern: "\\brates?\\b|approv|guarantee|eligib",
    answer:
      "I can't quote rates, approve or decline loans, or confirm eligibility. An advisor can review your scenario.",
    link: "/contact",
    linkLabel: "Contact an advisor",
  },
  {
    pattern: "calculat|formula|ltv|ltc|arv|noi",
    answer:
      "The calculators show DSCR (rent after vacancy ÷ PITIA), LTV (loan ÷ value), LTC (loan ÷ purchase plus renovation) and ARV equity. Formulas and assumptions appear beside each result.",
    link: "/calculators/dscr",
    linkLabel: "Open the calculators",
  },
  {
    pattern: "apply|application|steps|process",
    answer:
      "The path is: analyze the deal, save a scenario, complete the application, upload documents, then underwriting and closing review.",
    link: "/how-it-works",
    linkLabel: "See how it works",
  },
  {
    pattern: "dscr loan|what is",
    answer:
      "A DSCR loan is an investor loan where the property's rental income relative to its payment is the main qualifying measure, rather than personal employment income.",
    link: "/resources/what-is-a-dscr-loan",
    linkLabel: "Read: What Is a DSCR Loan?",
  },
  {
    pattern: "what dscr|need|ratio",
    answer:
      "Minimum DSCR varies by program. In this example, 1.25x or higher is shown as strong, but requirements vary and actual lender methodology may differ.",
    link: "/resources/how-dscr-is-calculated",
    linkLabel: "Read: How DSCR Is Calculated",
  },
  {
    pattern: "cash-out|cash out",
    answer:
      "A cash-out refinance replaces an existing loan with a larger one based on property value and lets an investor take the difference as cash, subject to program limits.",
    link: "/loans/cash-out",
    linkLabel: "Explore Cash-Out Refinance",
  },
  {
    pattern: "document",
    answer:
      "Typical documents include the lease, insurance declaration page, bank statements and entity documents. The list varies by program.",
    link: "/requirements",
    linkLabel: "See requirements",
  },
  {
    pattern: "multiple|portfolio",
    answer: "Portfolio financing can cover more than one rental property. Terms and eligibility vary by program.",
    link: "/loans/portfolio",
    linkLabel: "Explore Portfolio Loans",
  },
];

export const ASK_ATLAS_FALLBACK =
  "I can only answer from approved Atlas information. Try a suggested question or speak with an advisor.";

export const ASK_ATLAS_SUFFIX = "Requirements vary by program, and I do not make lending decisions.";

export const ASK_ATLAS_PROMPTS = [
  "What is DSCR?",
  "What documents are required?",
  "How does cash-out work?",
  "Can I finance multiple rentals?",
];

export function askAtlas(question: string): { answer: string; link?: string; linkLabel?: string } {
  const hit = ASK_ATLAS_KB.find((k) => new RegExp(k.pattern, "i").test(question));
  return hit
    ? { answer: hit.answer, link: hit.link, linkLabel: hit.linkLabel }
    : { answer: ASK_ATLAS_FALLBACK, link: "/contact", linkLabel: "Speak with a Loan Advisor" };
}
