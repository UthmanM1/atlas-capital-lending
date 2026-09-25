/**
 * A single, shared "loan file" data model used by the Borrower, Broker and
 * Staff portals under /portal. This is intentionally a separate, richer
 * model from the lighter marketing-attribution Lead used by the original
 * /staff CRM (lib/mock-data/crm.ts) — the two represent genuinely different
 * internal tools a real lending company would run (growth/marketing CRM vs.
 * loan operations), so they're kept independent rather than forced together.
 *
 * All data here is fictional and for demonstration only.
 */

/** Ordered master pipeline. Broker sees stages 1–7; Staff's dashboard buckets
 *  stage 0 as "New Leads" and groups 1–3 as "Applications". */
export const DEAL_STAGES = [
  "New Lead",
  "Draft",
  "Submitted",
  "Initial Review",
  "Underwriting",
  "Conditions",
  "Clear to Close",
  "Funded",
] as const;

export type DealStage = (typeof DEAL_STAGES)[number];

export interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Broker {
  id: string;
  name: string;
  email: string;
  company: string;
}

export type DocStatus = "received" | "pending" | "action_required";

export interface DealDocument {
  id: string;
  label: string;
  status: DocStatus;
  required: boolean;
  date: string | null;
}

export type ConditionStatus = "outstanding" | "in_review" | "cleared";

export interface DealCondition {
  id: string;
  label: string;
  status: ConditionStatus;
  requestedDate: string;
  dueDate: string;
  assignedTo: string;
}

export interface DealMessage {
  id: string;
  from: string;
  role: "Loan Advisor" | "Borrower" | "Broker" | "Staff";
  body: string;
  date: string;
}

export interface ActivityEvent {
  id: string;
  label: string;
  date: string;
  actor: string;
}

export interface Deal {
  id: string;
  borrower: Borrower;
  broker: Broker | null;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyType: string;
  purpose: string;
  purchasePrice: number;
  loanAmount: number;
  monthlyRent: number;
  rate: number;
  dscr: number;
  ltv: number;
  creditRange: string;
  entityType: string;
  stage: number; // index into DEAL_STAGES
  assignedTo: string;
  lastUpdated: string;
  loanOfficer: string;
  estimatedClosing: string;
  brokerNotes?: string;
  applicationChecklist: { label: string; done: boolean }[];
  documents: DealDocument[];
  conditions: DealCondition[];
  messages: DealMessage[];
  activity: ActivityEvent[];
  appointment?: { type: string; date: string; advisor: string };
}

const BORROWERS: Borrower[] = [
  { id: "B-1", name: "Michael Johnson", email: "michael.johnson@example.com", phone: "(813) 555-0142" },
  { id: "B-2", name: "Elena Torres", email: "elena.torres@example.com", phone: "(215) 555-0198" },
  { id: "B-3", name: "Devon Marsh", email: "devon.marsh@example.com", phone: "(704) 555-0113" },
  { id: "B-4", name: "Priya Chandran", email: "priya.chandran@example.com", phone: "(602) 555-0177" },
];

const BROKERS: Broker[] = [
  { id: "K-1", name: "Sarah Williams", email: "sarah.williams@brokerpartners.example", company: "Williams Lending Partners" },
  { id: "K-2", name: "Marcus Lee", email: "marcus.lee@apexcapital.example", company: "Apex Capital Brokerage" },
];

export const DEMO_BROKER = BROKERS[0];

export const MOCK_DEALS: Deal[] = [
  {
    id: "ATLAS-4471",
    borrower: BORROWERS[0],
    broker: BROKERS[0],
    propertyAddress: "1234 Ocean View Drive",
    propertyCity: "Tampa",
    propertyState: "FL",
    propertyType: "Single family",
    purpose: "Purchase",
    purchasePrice: 525000,
    loanAmount: 393750,
    monthlyRent: 3450,
    rate: 7.25,
    dscr: 1.28,
    ltv: 75,
    creditRange: "720–739",
    entityType: "LLC",
    stage: 4,
    assignedTo: "A. Reyes",
    lastUpdated: "Today",
    loanOfficer: "A. Reyes",
    estimatedClosing: "Oct 24",
    applicationChecklist: [
      { label: "Personal information", done: true },
      { label: "Property information", done: true },
      { label: "Loan request", done: true },
      { label: "Financial information", done: true },
      { label: "Final review", done: false },
    ],
    documents: [
      { id: "d1", label: "Driver's license", status: "received", required: true, date: "Sep 14" },
      { id: "d2", label: "Bank statements", status: "received", required: true, date: "Sep 16" },
      { id: "d3", label: "Purchase contract", status: "received", required: true, date: "Sep 18" },
      { id: "d4", label: "Lease agreement", status: "pending", required: true, date: null },
      { id: "d5", label: "Insurance declaration", status: "action_required", required: true, date: null },
    ],
    conditions: [
      { id: "c1", label: "Insurance declaration page", status: "outstanding", requestedDate: "Sep 20", dueDate: "Oct 2", assignedTo: "A. Reyes" },
      { id: "c2", label: "Updated bank statement (most recent month)", status: "outstanding", requestedDate: "Sep 22", dueDate: "Oct 5", assignedTo: "A. Reyes" },
      { id: "c3", label: "Signed borrower authorization", status: "cleared", requestedDate: "Sep 12", dueDate: "Sep 20", assignedTo: "A. Reyes" },
    ],
    messages: [
      { id: "m1", from: "A. Reyes", role: "Loan Advisor", body: "Your application has moved to underwriting. We still need the updated insurance declaration.", date: "Today, 9:12 AM" },
      { id: "m2", from: "Michael Johnson", role: "Borrower", body: "Got it — I'll upload that today.", date: "Today, 9:40 AM" },
    ],
    activity: [
      { id: "a1", label: "Lead created", date: "Sep 10", actor: "System" },
      { id: "a2", label: "Qualification completed", date: "Sep 10", actor: "Michael Johnson" },
      { id: "a3", label: "Application started", date: "Sep 11", actor: "Michael Johnson" },
      { id: "a4", label: "Documents uploaded", date: "Sep 18", actor: "Michael Johnson" },
      { id: "a5", label: "Submitted to underwriting", date: "Sep 19", actor: "A. Reyes" },
      { id: "a6", label: "Condition requested: Insurance declaration", date: "Sep 20", actor: "A. Reyes" },
    ],
    appointment: { type: "Phone call", date: "Thu, Oct 2 · 10:30 AM", advisor: "A. Reyes" },
  },
  {
    id: "ATLAS-4482",
    borrower: BORROWERS[1],
    broker: BROKERS[0],
    propertyAddress: "88 Independence Row",
    propertyCity: "Philadelphia",
    propertyState: "PA",
    propertyType: "2–4 unit",
    purpose: "Purchase",
    purchasePrice: 340000,
    loanAmount: 255000,
    monthlyRent: 3100,
    rate: 7.4,
    dscr: 1.19,
    ltv: 75,
    creditRange: "680–719",
    entityType: "Individual",
    stage: 2,
    assignedTo: "J. Kim",
    lastUpdated: "2d ago",
    loanOfficer: "J. Kim",
    estimatedClosing: "Nov 8",
    applicationChecklist: [
      { label: "Personal information", done: true },
      { label: "Property information", done: true },
      { label: "Loan request", done: true },
      { label: "Financial information", done: false },
      { label: "Final review", done: false },
    ],
    documents: [
      { id: "d1", label: "Driver's license", status: "received", required: true, date: "Sep 20" },
      { id: "d2", label: "Bank statements", status: "pending", required: true, date: null },
      { id: "d3", label: "Purchase contract", status: "received", required: true, date: "Sep 21" },
      { id: "d4", label: "Lease agreement", status: "pending", required: false, date: null },
      { id: "d5", label: "Insurance declaration", status: "pending", required: true, date: null },
    ],
    conditions: [],
    messages: [
      { id: "m1", from: "J. Kim", role: "Loan Advisor", body: "Thanks for the purchase contract — next we need two months of bank statements.", date: "2 days ago" },
    ],
    activity: [
      { id: "a1", label: "Lead created", date: "Sep 18", actor: "System" },
      { id: "a2", label: "Qualification completed", date: "Sep 18", actor: "Elena Torres" },
      { id: "a3", label: "Application started", date: "Sep 19", actor: "Elena Torres" },
      { id: "a4", label: "Submitted to underwriting", date: "Sep 21", actor: "J. Kim" },
    ],
  },
  {
    id: "ATLAS-4493",
    borrower: BORROWERS[2],
    broker: BROKERS[1],
    propertyAddress: "5510 Whitfield Court",
    propertyCity: "Charlotte",
    propertyState: "NC",
    propertyType: "Single family",
    purpose: "Cash-Out",
    purchasePrice: 410000,
    loanAmount: 307500,
    monthlyRent: 2950,
    rate: 7.6,
    dscr: 1.12,
    ltv: 75,
    creditRange: "760+",
    entityType: "LLC",
    stage: 5,
    assignedTo: "S. Patel",
    lastUpdated: "Yesterday",
    loanOfficer: "S. Patel",
    estimatedClosing: "Oct 15",
    applicationChecklist: [
      { label: "Personal information", done: true },
      { label: "Property information", done: true },
      { label: "Loan request", done: true },
      { label: "Financial information", done: true },
      { label: "Final review", done: true },
    ],
    documents: [
      { id: "d1", label: "Driver's license", status: "received", required: true, date: "Sep 2" },
      { id: "d2", label: "Bank statements", status: "received", required: true, date: "Sep 3" },
      { id: "d3", label: "Purchase contract", status: "received", required: true, date: "Sep 3" },
      { id: "d4", label: "Lease agreement", status: "received", required: true, date: "Sep 5" },
      { id: "d5", label: "Insurance declaration", status: "action_required", required: true, date: null },
    ],
    conditions: [
      { id: "c1", label: "Insurance declaration", status: "outstanding", requestedDate: "Sep 15", dueDate: "Sep 29", assignedTo: "S. Patel" },
      { id: "c2", label: "Lease agreement", status: "cleared", requestedDate: "Sep 4", dueDate: "Sep 10", assignedTo: "S. Patel" },
      { id: "c3", label: "Updated bank statement", status: "in_review", requestedDate: "Sep 18", dueDate: "Sep 25", assignedTo: "S. Patel" },
    ],
    messages: [
      { id: "m1", from: "S. Patel", role: "Loan Advisor", body: "Just the insurance declaration left before we can clear to close.", date: "Yesterday" },
    ],
    activity: [
      { id: "a1", label: "Lead created", date: "Aug 28", actor: "System" },
      { id: "a2", label: "Qualification completed", date: "Aug 28", actor: "Devon Marsh" },
      { id: "a3", label: "Application started", date: "Aug 29", actor: "Devon Marsh" },
      { id: "a4", label: "Documents uploaded", date: "Sep 5", actor: "Devon Marsh" },
      { id: "a5", label: "Submitted to underwriting", date: "Sep 6", actor: "S. Patel" },
      { id: "a6", label: "Condition requested: Insurance declaration", date: "Sep 15", actor: "S. Patel" },
      { id: "a7", label: "Condition received: Lease agreement", date: "Sep 10", actor: "Devon Marsh" },
    ],
  },
  {
    id: "ATLAS-4501",
    borrower: BORROWERS[3],
    broker: BROKERS[1],
    propertyAddress: "217 Desert Bloom Ave",
    propertyCity: "Phoenix",
    propertyState: "AZ",
    propertyType: "Townhome",
    purpose: "Purchase",
    purchasePrice: 389000,
    loanAmount: 291750,
    monthlyRent: 2600,
    rate: 7.35,
    dscr: 1.05,
    ltv: 75,
    creditRange: "640–679",
    entityType: "Individual",
    stage: 1,
    assignedTo: "Unassigned",
    lastUpdated: "3h ago",
    loanOfficer: "Unassigned",
    estimatedClosing: "TBD",
    applicationChecklist: [
      { label: "Personal information", done: true },
      { label: "Property information", done: true },
      { label: "Loan request", done: false },
      { label: "Financial information", done: false },
      { label: "Final review", done: false },
    ],
    documents: [
      { id: "d1", label: "Driver's license", status: "pending", required: true, date: null },
      { id: "d2", label: "Bank statements", status: "pending", required: true, date: null },
      { id: "d3", label: "Purchase contract", status: "pending", required: true, date: null },
      { id: "d4", label: "Lease agreement", status: "pending", required: false, date: null },
      { id: "d5", label: "Insurance declaration", status: "pending", required: true, date: null },
    ],
    conditions: [],
    messages: [],
    activity: [
      { id: "a1", label: "Lead created", date: "Today", actor: "System" },
    ],
  },
  {
    id: "ATLAS-4460",
    borrower: BORROWERS[0],
    broker: null,
    propertyAddress: "902 Lakeshore Terrace",
    propertyCity: "Orlando",
    propertyState: "FL",
    propertyType: "Condo",
    purpose: "Purchase",
    purchasePrice: 298000,
    loanAmount: 223500,
    monthlyRent: 2100,
    rate: 7.5,
    dscr: 1.31,
    ltv: 75,
    creditRange: "720–739",
    entityType: "LLC",
    stage: 7,
    assignedTo: "A. Reyes",
    lastUpdated: "1w ago",
    loanOfficer: "A. Reyes",
    estimatedClosing: "Funded Sep 5",
    applicationChecklist: [
      { label: "Personal information", done: true },
      { label: "Property information", done: true },
      { label: "Loan request", done: true },
      { label: "Financial information", done: true },
      { label: "Final review", done: true },
    ],
    documents: [
      { id: "d1", label: "Driver's license", status: "received", required: true, date: "Aug 10" },
      { id: "d2", label: "Bank statements", status: "received", required: true, date: "Aug 11" },
      { id: "d3", label: "Purchase contract", status: "received", required: true, date: "Aug 12" },
      { id: "d4", label: "Lease agreement", status: "received", required: true, date: "Aug 14" },
      { id: "d5", label: "Insurance declaration", status: "received", required: true, date: "Aug 20" },
    ],
    conditions: [
      { id: "c1", label: "Insurance declaration", status: "cleared", requestedDate: "Aug 15", dueDate: "Aug 22", assignedTo: "A. Reyes" },
    ],
    messages: [
      { id: "m1", from: "A. Reyes", role: "Loan Advisor", body: "Congratulations — this loan funded on September 5th.", date: "Sep 5" },
    ],
    activity: [
      { id: "a1", label: "Lead created", date: "Jul 20", actor: "System" },
      { id: "a2", label: "Submitted to underwriting", date: "Aug 12", actor: "A. Reyes" },
      { id: "a3", label: "Clear to close", date: "Aug 28", actor: "A. Reyes" },
      { id: "a4", label: "Funded", date: "Sep 5", actor: "A. Reyes" },
    ],
  },
];

export function getDeal(id: string): Deal | undefined {
  return MOCK_DEALS.find((d) => d.id === id);
}

/** The demo "signed-in" borrower — a stand-in for real auth. */
export const DEMO_BORROWER_DEAL_ID = "ATLAS-4471";
