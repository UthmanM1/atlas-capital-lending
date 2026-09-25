import Link from "next/link";

const TABS: [string, string][] = [
  ["DSCR / Scenario", "/calculators/dscr"],
  ["LTV", "/calculators/ltv"],
  ["LTC", "/calculators/ltc"],
  ["ARV", "/calculators/arv"],
];

export default function CalculatorTabs({ active }: { active: string }) {
  return (
    <div role="tablist" style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0 24px" }}>
      {TABS.map(([label, href]) => (
        <Link
          key={href}
          role="tab"
          aria-selected={href === active}
          className={`btn sm ${href === active ? "" : "ghost"}`}
          href={href}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
