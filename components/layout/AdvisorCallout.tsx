import Link from "next/link";

export function AdvisorCallout() {
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h3>Speak with an advisor</h3>
      <p className="mut">Save your scenario and an advisor can walk through the numbers with you.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link className="btn" href="/qualify">
          Check My Scenario
        </Link>
        <Link className="btn ghost" href="/contact">
          Ask a question
        </Link>
      </div>
    </div>
  );
}

export function FinalCta({ label = "Check My Scenario" }: { label?: string }) {
  return (
    <section className="wrap sec" style={{ paddingTop: 0 }}>
      <div className="card" style={{ background: "var(--accbg)", borderColor: "var(--acc)", textAlign: "center" }}>
        <h3 style={{ marginTop: 0 }}>Ready to see your numbers?</h3>
        <Link className="btn" href="/qualify">
          {label}
        </Link>
      </div>
    </section>
  );
}

export function FaqList({ items }: { items: [string, string][] }) {
  return (
    <div style={{ marginTop: 16 }}>
      {items.map(([q, a]) => (
        <details key={q} className="card" style={{ marginBottom: 8 }}>
          <summary style={{ cursor: "pointer", fontWeight: 600 }}>{q}</summary>
          <p className="mut" style={{ marginTop: 8 }}>
            {a}
          </p>
        </details>
      ))}
    </div>
  );
}
