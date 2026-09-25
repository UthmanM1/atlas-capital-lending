import Link from "next/link";

export const metadata = {
  title: "Broker Program",
  description: "Submit investor deals, follow every stage and see referrals in one workspace.",
};

const POINTS: [string, string][] = [
  ["Submit fast", "Scenario in minutes."],
  ["Track everything", "Pipeline and status."],
  ["One advisor", "A named account manager."],
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Broker Program</h1>
          <p>Submit investor deals, follow every stage and see referrals in one workspace.</p>
        </div>
      </section>
      <section className="wrap sec pane">
        <div className="grid g3">
          {POINTS.map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p className="mut">{d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 16 }}>
          <Link className="btn" href="/broker">
            Open broker portal
          </Link>
        </p>
      </section>
    </>
  );
}
