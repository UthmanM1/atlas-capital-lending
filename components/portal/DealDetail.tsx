import Link from "next/link";
import { Deal, DEAL_STAGES } from "@/lib/mock-data/deals";
import { formatCurrency } from "@/lib/calculations/dscr";
import DocumentList from "./DocumentList";
import ConditionsList from "./ConditionsList";
import MessageThread from "./MessageThread";
import ActivityTimeline from "./ActivityTimeline";

export default function DealDetail({
  deal,
  role,
  asName,
  backHref,
  backLabel,
}: {
  deal: Deal;
  role: "Broker" | "Staff";
  asName: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <section className="wrap sec">
      <Link href={backHref}>← {backLabel}</Link>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 8 }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", marginBottom: 4 }}>{deal.id}</h1>
          <p className="mut" style={{ margin: 0 }}>{deal.borrower.name} · {deal.propertyCity ? `${deal.propertyCity}, ` : ""}{deal.propertyState}</p>
        </div>
        <span className="pill">{DEAL_STAGES[deal.stage]}</span>
      </div>

      <div className="grid g3" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Borrower</h3>
          <table>
            <tbody>
              <tr><th scope="row">Name</th><td>{deal.borrower.name}</td></tr>
              <tr><th scope="row">Email</th><td>{deal.borrower.email}</td></tr>
              <tr><th scope="row">Phone</th><td>{deal.borrower.phone}</td></tr>
              <tr><th scope="row">Entity</th><td>{deal.entityType}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Property</h3>
          <table>
            <tbody>
              <tr><th scope="row">Address</th><td>{deal.propertyAddress}</td></tr>
              <tr><th scope="row">State</th><td>{deal.propertyState}</td></tr>
              <tr><th scope="row">Type</th><td>{deal.propertyType}</td></tr>
              <tr><th scope="row">Purpose</th><td>{deal.purpose}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Financing</h3>
          <table>
            <tbody>
              <tr><th scope="row">Purchase price</th><td>{formatCurrency(deal.purchasePrice)}</td></tr>
              <tr><th scope="row">Loan amount</th><td>{formatCurrency(deal.loanAmount)}</td></tr>
              <tr><th scope="row">Rent</th><td>{formatCurrency(deal.monthlyRent)}/mo</td></tr>
              <tr><th scope="row">DSCR / LTV</th><td>{deal.dscr.toFixed(2)}x / {deal.ltv.toFixed(0)}%</td></tr>
              <tr><th scope="row">Credit range</th><td>{deal.creditRange}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Underwriting summary</h3>
        {deal.applicationChecklist.map((c) => (
          <div key={c.label} style={{ padding: "6px 0", borderBottom: "1px solid var(--line)" }}>
            {c.done ? "✓" : "○"} {c.label}
          </div>
        ))}
        <p className="mut" style={{ marginTop: 8, marginBottom: 0 }}>
          Assigned to {deal.assignedTo} · Estimated closing {deal.estimatedClosing}
        </p>
      </div>

      {deal.broker && (
        <div className="card" style={{ marginTop: 16 }}>
          <h3>Broker referral information</h3>
          <table>
            <tbody>
              <tr><th scope="row">Broker</th><td>{deal.broker.name}</td></tr>
              <tr><th scope="row">Company</th><td>{deal.broker.company}</td></tr>
              <tr><th scope="row">Email</th><td>{deal.broker.email}</td></tr>
              {deal.brokerNotes && <tr><th scope="row">Notes</th><td>{deal.brokerNotes}</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid g2" style={{ marginTop: 16 }}>
        <DocumentList dealId={deal.id} documents={deal.documents} />
        <ConditionsList conditions={deal.conditions} />
      </div>

      <div className="grid g2" style={{ marginTop: 16 }}>
        <MessageThread dealId={deal.id} messages={deal.messages} asRole={role} asName={asName} />
        <ActivityTimeline activity={deal.activity} />
      </div>
    </section>
  );
}
