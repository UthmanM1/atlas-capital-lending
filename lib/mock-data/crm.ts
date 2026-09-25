export const PIPELINE_STAGES = [
  "New Lead",
  "Qualified",
  "Application",
  "Processing",
  "Underwriting",
  "Approved",
  "Funded",
] as const;

export interface Lead {
  id: string;
  name: string;
  source: string;
  campaign: string;
  type: string;
  amount: number;
  dscr: number;
  ltv: number;
  state: string;
  rep: string;
  stage: number;
  activity: string;
}

/** Illustrative/mock leads. Not real customers. */
export const INITIAL_LEADS: Lead[] = [
  ["Daniel Okafor", "Google", "dscr-rental-purchase", "Purchase", 318750, 1.34, 75, "FL", "A. Reyes", 0, "Today"],
  ["Priya Nair", "Google", "dscr-cash-out", "Cash-Out", 476000, 1.18, 70, "NJ", "J. Kim", 1, "Yesterday"],
  ["Tom Whitcomb", "Broker", "broker-referral", "Portfolio", 2100000, 1.27, 68, "PA", "A. Reyes", 2, "2h ago"],
  ["Lena Fischer", "Meta", "portfolio-growth", "Portfolio", 1450000, 1.22, 72, "IL", "J. Kim", 3, "3d ago"],
  ["Marcus Hale", "Google", "dscr-rental-purchase", "Purchase", 262500, 1.41, 75, "FL", "A. Reyes", 4, "Today"],
  ["Sofia Marin", "Organic", "kb-dscr-guide", "Rate & Term", 389000, 1.31, 65, "NY", "S. Patel", 5, "1w ago"],
  ["Owen Brooks", "Google", "dscr-cash-out", "Cash-Out", 540000, 1.16, 70, "CA", "S. Patel", 6, "2w ago"],
  ["Ava Chen", "Google", "dscr-rental-purchase", "Purchase", 301000, 1.29, 75, "NJ", "J. Kim", 0, "Today"],
].map(
  (l, i): Lead => ({
    id: "L-" + (1041 + i),
    name: l[0] as string,
    source: l[1] as string,
    campaign: l[2] as string,
    type: l[3] as string,
    amount: l[4] as number,
    dscr: l[5] as number,
    ltv: l[6] as number,
    state: l[7] as string,
    rep: l[8] as string,
    stage: l[9] as number,
    activity: l[10] as string,
  })
);

export const LOAN_TYPES = ["Purchase", "Cash-Out", "Rate & Term", "Portfolio"];

export const BROKER_PIPELINE: [string, number][] = [
  ["Lead", 4],
  ["Submitted", 3],
  ["Under Review", 2],
  ["Underwriting", 2],
  ["Approved", 1],
  ["Funded", 5],
];

export interface EventLogEntry {
  time: string;
  name: string;
  meta: string;
}

export const INITIAL_EVENTS: EventLogEntry[] = [
  { time: "09:10", name: "calculator_completed", meta: "Mobile · /invest/rental-purchase" },
  { time: "09:17", name: "qualification_started", meta: "Mobile · /invest/rental-purchase" },
  { time: "09:24", name: "lead_submitted", meta: "Desktop · /invest/cash-out" },
  { time: "09:31", name: "document_uploaded", meta: "Portal · M. Rivera" },
  { time: "09:38", name: "appointment_booked", meta: "Portal · M. Rivera" },
];
