import Link from "next/link";

export const metadata = {
  title: "Portal Architecture Notes",
  description: "What is implemented in this demo versus what a real production lending platform would require.",
};

interface Row {
  system: string;
  demo: string;
  production: string;
}

const ROWS: Row[] = [
  {
    system: "Authentication",
    demo: "None. The role chooser at /portal links directly to each portal — anyone can view any role.",
    production: "A real identity provider (e.g. Auth0, Clerk, or a custom OAuth/OIDC flow) with per-role sessions, MFA for staff, and borrower/broker account verification.",
  },
  {
    system: "Database",
    demo: "An in-memory JavaScript store (lib/store.ts) seeded from mock data. State resets on a hard page reload and is never shared between browser sessions or devices.",
    production: "A persistent database (e.g. Postgres) with proper schema, migrations, and access control per role.",
  },
  {
    system: "CRM",
    demo: "Two independent mock datasets: a lightweight marketing-lead kanban (/staff) and this deal-file operations portal. Neither is a real third-party CRM.",
    production: "A real CRM (e.g. Salesforce, HubSpot) or purpose-built LOS CRM module, with the two lead/deal views above reconciled into one system of record.",
  },
  {
    system: "Document storage",
    demo: "The Upload control in each Documents section simulates a network delay, then marks the document Received. No file is ever actually transmitted or stored.",
    production: "Encrypted object storage (e.g. S3) behind signed upload URLs, with virus scanning, retention policy, and audit trail per file.",
  },
  {
    system: "Email / SMS",
    demo: "The Messages panel is a local, in-memory thread. Sending a message only updates the in-browser store.",
    production: "A transactional messaging provider (e.g. Twilio, SendGrid/Postmark) with delivery tracking and opt-out compliance.",
  },
  {
    system: "Analytics",
    demo: "lib/analytics.ts logs named events to the in-memory event stream and the browser console. See the DSCR Rental Purchase funnel for the fullest example.",
    production: "GA4 or a CDP (Segment/RudderStack) receiving the same named events, plus server-side event capture for anything that shouldn't rely on the client.",
  },
  {
    system: "Application / LOS",
    demo: "Deal stage, documents, conditions and checklist are mock fields on a single Deal object, editable directly in the browser.",
    production: "A licensed or custom Loan Origination System (LOS) as the system of record for underwriting state, with this portal as its front-end.",
  },
  {
    system: "Identity verification",
    demo: "Not implemented. Driver's license \"upload\" only changes a status pill.",
    production: "A KYC/identity verification provider (e.g. Persona, Plaid Identity) integrated into the document step.",
  },
  {
    system: "Audit logging",
    demo: "The Activity timeline is a static/mock list per deal; actions taken in this demo session (stage moves, uploads) are appended to it in memory only.",
    production: "An immutable, queryable audit log (who did what, when) retained per regulatory requirements for lending records.",
  },
];

export default function ArchitectureNotesPage() {
  return (
    <section className="wrap sec pane">
      <h1>Portal Architecture Notes</h1>
      <p className="mut" style={{ maxWidth: 680 }}>
        The Borrower, Broker and Staff portals under <Link href="/portal">/portal</Link> are a UX and
        product-architecture demonstration. Nothing described as &quot;demo&quot; below is connected to a
        real lender, bank, credit bureau, CRM, underwriting system, or document provider.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th style={{ width: "18%" }}>System</th>
              <th>Implemented in demo</th>
              <th>Proposed production integration</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.system}>
                <td><b>{r.system}</b></td>
                <td className="mut">{r.demo}</td>
                <td className="mut">{r.production}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 24 }}>
        <Link className="btn ghost" href="/case-studies/dscr-lending-platform">
          See the full technical architecture case study
        </Link>
      </p>
    </section>
  );
}
