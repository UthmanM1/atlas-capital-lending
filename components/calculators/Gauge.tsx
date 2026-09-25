export default function Gauge({ dscr }: { dscr: number }) {
  const color = dscr < 1 ? "var(--warn)" : dscr < 1.25 ? "var(--amb)" : "var(--acc)";
  const p = Math.max(0, Math.min(dscr / 2, 1));
  return (
    <svg
      viewBox="0 0 120 72"
      role="img"
      aria-label={`DSCR ${dscr.toFixed(2)}x`}
      style={{ width: "100%", maxWidth: 260 }}
    >
      <path d="M10 62A50 50 0 0 1 110 62" fill="none" stroke="var(--line)" strokeWidth={10} />
      <path
        d="M10 62A50 50 0 0 1 110 62"
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeDasharray={`${p * 157} 157`}
      />
      <text x={60} y={56} textAnchor="middle" fontSize={20} fill="currentColor" fontFamily="Georgia">
        {dscr.toFixed(2)}x
      </text>
    </svg>
  );
}
