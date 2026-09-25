import Link from "next/link";
import { FUNNEL_EVENTS } from "@/lib/analytics";
import { CAMPAIGNS, totalMarketing } from "@/lib/mock-data/marketing";
import { formatCurrency } from "@/lib/calculations/dscr";

export const metadata = {
  title: "Analytics Framework",
  description: "The funnel measurement architecture behind Atlas Capital Lending, from lead source to funded loan.",
};

const FULL_EVENT_LIST = [
  "landing_page_view",
  "calculator_started",
  "calculator_completed",
  "qualification_started",
  "qualification_completed",
  "lead_submitted",
  "appointment_booked",
  "application_started",
  "application_completed",
  "document_uploaded",
  "loan_funded",
];

const IMPLEMENTED = new Set<string>(Object.values(FUNNEL_EVENTS));

const REPORTING_CHAIN = ["Lead source", "Lead", "Application", "Approval", "Funding"];

export default function AnalyticsPage() {
  const t = totalMarketing();
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Funnel Measurement Architecture</h1>
          <p>
            The named events and reporting chain that would let Atlas measure cost per funded loan, not
            just cost per lead.
          </p>
        </div>
      </section>

      <section className="wrap sec pane">
        <h2>Event architecture</h2>
        <p className="mut" style={{ maxWidth: 640 }}>
          Every event below is a named, reusable function — see <code>lib/analytics.ts</code>. Events
          marked &ldquo;Tracked in demo&rdquo; actually fire in this project (inspectable in the browser
          console throughout the{" "}
          <Link href="/loans/dscr-rental-purchase">DSCR Rental Purchase funnel</Link>); the rest are named
          here to show where production tracking would extend to.
        </p>
        <div className="grid g3">
          {FULL_EVENT_LIST.map((e) => (
            <div className="card" key={e}>
              <code>{e}</code>
              <div style={{ marginTop: 6 }}>
                {IMPLEMENTED.has(e) ? (
                  <span className="pill">Tracked in demo</span>
                ) : (
                  <span className="pill" style={{ background: "#efe9dd", color: "#7a5518" }}>Proposed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>Example funnel visualization <span className="pill">Demo data</span></h2>
        <p className="mut">Illustrative — not real campaign performance.</p>
        <div className="grid g4">
          <div className="card stat"><b>{formatCurrency(t.spend)}</b><span>Spend</span></div>
          <div className="card stat"><b>{t.leads}</b><span>Leads</span></div>
          <div className="card stat"><b>{t.applications}</b><span>Applications</span></div>
          <div className="card stat"><b>{t.funded}</b><span>Funded</span></div>
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <table>
            <thead><tr><th>Campaign</th><th>Leads</th><th>Applications</th><th>Funded</th><th>Cost / funded (demo)</th></tr></thead>
            <tbody>
              {CAMPAIGNS.map((c) => (
                <tr key={c.campaign}>
                  <td>{c.campaign}</td>
                  <td>{c.leads}</td>
                  <td>{c.applications}</td>
                  <td>{c.funded}</td>
                  <td>{formatCurrency(c.spend / c.funded)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12 }}>
          <Link href="/staff/marketing">See the full live demo dashboard →</Link>
        </p>
      </section>

      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>Production reporting chain</h2>
        <p className="mut" style={{ maxWidth: 640 }}>
          To measure true cost per funded loan — the client requirement this directly demonstrates —
          production reporting should connect:
        </p>
        <div className="card">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            {REPORTING_CHAIN.map((step, i) => (
              <span key={step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="pill">{step}</span>
                {i < REPORTING_CHAIN.length - 1 && <span aria-hidden="true" style={{ color: "var(--acc)" }}>→</span>}
              </span>
            ))}
          </div>
        </div>
        <p style={{ marginTop: 20 }}>
          <Link className="btn ghost" href="/growth/paid-search">See the paid search case study</Link>
        </p>
      </section>
    </>
  );
}
