// Note: var(--amb) (#b7862b) only reaches ~2.7:1 on this pill's light background,
// short of the 4.5:1 WCAG AA minimum for text — so pending/in_review use a
// darker amber here specifically for text contrast, not the shared --amb token.
const STYLES: Record<string, { bg: string; color: string; label: string }> = {
  received: { bg: "var(--accbg)", color: "var(--acc)", label: "Received" },
  cleared: { bg: "var(--accbg)", color: "var(--acc)", label: "Cleared" },
  pending: { bg: "#efe9dd", color: "#7a5518", label: "Pending" },
  in_review: { bg: "#efe9dd", color: "#7a5518", label: "In review" },
  outstanding: { bg: "#f2e6e2", color: "var(--warn)", label: "Outstanding" },
  action_required: { bg: "#f2e6e2", color: "var(--warn)", label: "Action required" },
};

export default function StatusPill({ status }: { status: string }) {
  const s = STYLES[status] ?? { bg: "var(--line)", color: "var(--mut)", label: status };
  return (
    <span className="pill" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}
