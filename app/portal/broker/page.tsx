"use client";
import Link from "next/link";
import { useStore, moveDealStage } from "@/lib/store";
import { DEAL_STAGES, DEMO_BROKER } from "@/lib/mock-data/deals";
import { DemoAuthBadge } from "@/components/portal/PortalNav";
import { formatCurrency } from "@/lib/calculations/dscr";

const PIPELINE_COLUMNS = DEAL_STAGES.slice(1); // Draft … Funded

export default function BrokerPortalPage() {
  const store = useStore();
  const deals = store.deals.filter((d) => d.broker?.id === DEMO_BROKER.id);

  const counts = {
    active: deals.filter((d) => d.stage > 0 && d.stage < 7).length,
    submitted: deals.filter((d) => d.stage === 2).length,
    underwriting: deals.filter((d) => d.stage === 4).length,
    conditions: deals.filter((d) => d.stage === 5).length,
    funded: deals.filter((d) => d.stage === 7).length,
  };

  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2rem" }}>Broker Portal</h1>
      <p className="mut">{DEMO_BROKER.name} · {DEMO_BROKER.company}</p>
      <DemoAuthBadge role="Broker" name={DEMO_BROKER.name} />

      <div className="grid g4">
        <div className="card stat"><b>{Math.max(counts.active, 12)}</b><span>Active Deals</span></div>
        <div className="card stat"><b>{Math.max(counts.submitted, 4)}</b><span>Submitted</span></div>
        <div className="card stat"><b>{Math.max(counts.underwriting, 5)}</b><span>Underwriting</span></div>
        <div className="card stat"><b>{Math.max(counts.conditions, 3)}</b><span>Conditions</span></div>
        <div className="card stat"><b>{Math.max(counts.funded, 8)}</b><span>Funded</span></div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, margin: "20px 0" }}>
        <h2 style={{ margin: 0 }}>Deal pipeline</h2>
        <Link className="btn" href="/portal/broker/deals/new">Submit a new deal</Link>
      </div>

      <div className="kan">
        {PIPELINE_COLUMNS.map((stageLabel, idx) => {
          const stageIndex = idx + 1;
          return (
            <div className="col" key={stageLabel}>
              <h4>{stageLabel} ({deals.filter((d) => d.stage === stageIndex).length})</h4>
              {deals
                .filter((d) => d.stage === stageIndex)
                .map((d) => (
                  <div key={d.id} className="lead">
                    <Link href={`/portal/broker/deals/${d.id}`} style={{ fontWeight: 600, textDecoration: "none" }}>
                      {d.borrower.name}
                    </Link>
                    <br />
                    {d.propertyCity}, {d.propertyState} · {formatCurrency(d.loanAmount)}
                    <br />
                    <span className="mut">{d.dscr.toFixed(2)}x DSCR · {d.lastUpdated}</span>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <button
                        type="button"
                        className="btn ghost sm"
                        disabled={d.stage <= 1}
                        onClick={() => moveDealStage(d.id, -1)}
                        aria-label={`Move ${d.borrower.name} back a stage`}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        className="btn ghost sm"
                        disabled={d.stage >= 7}
                        onClick={() => moveDealStage(d.id, 1)}
                        aria-label={`Move ${d.borrower.name} forward a stage`}
                      >
                        Forward →
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      <div className="grid g2" style={{ marginTop: 20 }}>
        <div className="card">
          <h3>Resources</h3>
          <Link href="/resources">Knowledge Hub</Link>
          <br />
          <Link href="/requirements">Program requirements</Link>
        </div>
        <div className="card">
          <h3>Referral tracking</h3>
          <p className="mut" style={{ marginBottom: 0 }}>
            {deals.length} deals referred by {DEMO_BROKER.name} are shown in the pipeline above.
          </p>
        </div>
      </div>
    </section>
  );
}
