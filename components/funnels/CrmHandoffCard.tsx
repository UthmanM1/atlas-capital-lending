import { RPScenario } from "@/lib/store";

export default function CrmHandoffCard({ scenario }: { scenario: RPScenario }) {
  const rows = [
    "Lead created",
    "Source: Google Search",
    "Campaign: DSCR Rental Purchase",
    "Funnel: Rental Purchase",
    `Scenario ID: ${scenario.id}`,
  ];
  return (
    <div className="card" style={{ borderColor: "var(--acc)" }}>
      <span className="pill">CRM Handoff</span>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {rows.map((r) => (
          <div key={r}>
            <span style={{ color: "var(--acc)" }}>✓</span> {r}
          </div>
        ))}
      </div>
      <p className="mut" style={{ marginTop: 10, fontSize: 13 }}>
        Demo state only — this reflects the in-memory mock CRM used throughout this portfolio project
        (visible on the{" "}
        <a href="/staff">Staff CRM</a> and <a href="/staff/marketing">Marketing Dashboard</a>), not a
        real third-party CRM connection.
      </p>
    </div>
  );
}
