export const ARCHITECTURE_LAYERS = [
  "Vercel",
  "Next.js Application",
  "Authentication / Authorization",
  "API Layer",
  "Database",
  "Document Storage",
  "CRM / LOS",
  "Email / SMS",
  "Analytics / Monitoring",
];

export const PORTAL_SURFACES = ["Borrower Portal", "Broker Portal", "Staff Portal"];

export const SECURITY_CONTROLS: [string, string][] = [
  ["Authentication", "A real identity provider with per-role sessions, replacing the demo role chooser at /portal."],
  ["Role-based authorization", "Server-enforced permissions per role (borrower/broker/staff), not just hidden navigation."],
  ["Server-side validation", "All qualification, submission and document logic re-validated server-side, not trusted from the client."],
  ["Encrypted connections", "TLS everywhere, including between internal services."],
  ["Secure document storage", "Encrypted object storage with per-tenant access boundaries."],
  ["Signed document URLs", "Time-limited, single-use upload/download URLs rather than public file paths."],
  ["Audit logging", "An immutable, queryable record of who did what and when, for every loan file."],
  ["Rate limiting", "Abuse and brute-force protection on public forms and API routes."],
  ["Secrets management", "Provider credentials and keys held in a secrets manager, never in source or client code."],
  ["Backup and recovery", "Regular, tested database and document-store backups with a defined recovery objective."],
  ["Error monitoring", "Server and client error tracking (e.g. Sentry) with alerting."],
  ["Consent tracking", "A recorded, timestamped consent trail for contact and data use, per applicable law."],
];

export const SECURITY_DISCLAIMER =
  "Production security requirements would be finalized based on the lender's application system, CRM, vendors, data flows, and applicable regulatory requirements.";

export interface IntegrationRow {
  capability: string;
  demo: string;
  production: string;
}

export const INTEGRATION_MAP: IntegrationRow[] = [
  { capability: "Authentication", demo: "Role chooser at /portal — no real login", production: "Auth0, Clerk, or custom OAuth/OIDC" },
  { capability: "CRM", demo: "In-memory mock leads and deals (lib/store.ts)", production: "Salesforce, HubSpot, or a purpose-built LOS CRM module" },
  { capability: "Loan Origination System", demo: "Deal stage/documents/conditions as fields on a mock object", production: "A licensed or custom LOS as the system of record" },
  { capability: "Database", demo: "None — state resets on reload", production: "Postgres or similar, with migrations and access control" },
  { capability: "Document Storage", demo: "Simulated upload; no file is transmitted", production: "Encrypted object storage (e.g. S3) behind signed URLs" },
  { capability: "Email", demo: "Not implemented", production: "Postmark, SendGrid, or similar transactional email" },
  { capability: "SMS", demo: "Not implemented", production: "Twilio or similar, with opt-out compliance" },
  { capability: "Analytics", demo: "Console + in-app event log (lib/analytics.ts)", production: "GA4 and/or a CDP (Segment, RudderStack)" },
  { capability: "Monitoring", demo: "Not implemented", production: "Sentry (errors) + Vercel Analytics or Datadog (performance)" },
  { capability: "Scheduling", demo: "Static demo date/time picker, no real calendar", production: "A real calendar integration (e.g. Cal.com, Calendly API)" },
];
