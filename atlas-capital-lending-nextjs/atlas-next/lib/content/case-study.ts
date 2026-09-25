export const CASE_STUDY_SECTIONS: [string, string][] = [
  ["Challenge", "Fragmented investor acquisition, qualification and follow-up."],
  ["Strategy", "One connected acquisition-to-funding ecosystem."],
  ["Acquisition", "Three dedicated DSCR funnels for purchase, cash-out and portfolio investors."],
  ["Qualification", "Guided scenario intake that saves inputs and produces a Scenario ID."],
  ["Analysis", "DSCR, LTV, LTC and ARV tools with visible formulas and editable assumptions."],
  ["Borrower", "Application progress, document requests, messages and appointments."],
  ["Broker", "Submission, referral and pipeline workflow feeding the CRM."],
  ["Operations", "CRM pipeline, attribution and stage progression for staff."],
  ["Marketing", "Attribution and funnel analytics from click to funded loan."],
  ["AI", "Controlled knowledge-based assistant with human advisor handoff."],
  ["Architecture", "Six layers, proposed below."],
  ["Mobile", "One-handed navigation, responsive forms and persistent CTAs."],
];

export const CONVERSION_JOURNEY = [
  "Google Search / Paid Campaign",
  "Landing Page",
  "Check My Scenario",
  "Qualification",
  "Scenario ID",
  "CRM",
  "Application",
  "Underwriting",
  "Funding",
];

export interface DiagramNode {
  title: string;
  note?: string;
}

export const ARCHITECTURE_DIAGRAM: {
  acquisitionToFunding: DiagramNode[];
  connectedSurfaces: DiagramNode[];
  searchAndAi: DiagramNode[];
  measurement: DiagramNode[];
  measurementNote: string;
} = {
  acquisitionToFunding: [
    { title: "Paid Search" },
    { title: "Acquisition Funnels" },
    { title: "Qualification Engine" },
    { title: "Lead Attribution" },
    { title: "CRM" },
    { title: "Application" },
    { title: "Underwriting" },
    { title: "Funding" },
  ],
  connectedSurfaces: [
    { title: "Borrower Portal", note: "Connected to the CRM and application layer" },
    { title: "CRM / Application" },
    { title: "Broker Portal", note: "Submits scenarios into the CRM" },
  ],
  searchAndAi: [
    { title: "Knowledge Hub", note: "SEO and AI-search content" },
    { title: "Ask Atlas", note: "Approved knowledge only" },
    { title: "Human Advisor", note: "Handoff" },
  ],
  measurement: [{ title: "Marketing Analytics", note: "Reads acquisition and CRM events" }],
  measurementNote:
    "Events: calculator_started, qualification_completed, lead_submitted, application_started, document_uploaded, appointment_booked.",
};

export const PRODUCTION_LAYERS: [string, string][] = [
  ["Frontend", "Next.js App Router application today; deployable to Vercel."],
  ["Application layer", "Qualification, calculators, borrower and broker portals."],
  ["Data layer", "Lead records, attribution and loan scenarios."],
  ["Integration layer", "Proposed: CRM, email/SMS, calendar and document storage."],
  ["AI / knowledge layer", "Approved content, assistant and human handoff."],
  ["Analytics layer", "Event tracking and campaign attribution."],
];
