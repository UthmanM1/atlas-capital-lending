import { ActivityEvent } from "@/lib/mock-data/deals";

export default function ActivityTimeline({ activity }: { activity: ActivityEvent[] }) {
  return (
    <div className="card">
      <h3>Activity</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {activity.map((a, i) => (
          <div
            key={a.id}
            style={{
              display: "flex",
              gap: 12,
              padding: "8px 0",
              borderBottom: i < activity.length - 1 ? "1px solid var(--line)" : "none",
            }}
          >
            <span aria-hidden="true" style={{ color: "var(--acc)" }}>●</span>
            <div>
              <div>{a.label}</div>
              <div className="mut" style={{ fontSize: 12 }}>{a.date} · {a.actor}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
