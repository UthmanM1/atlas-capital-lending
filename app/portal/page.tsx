import Link from "next/link";

export const metadata = {
  title: "Sign In",
  description: "Choose a demo role to explore the Atlas Capital Lending borrower, broker and staff portals.",
};

const ROLES: { title: string; blurb: string; href: string; name: string }[] = [
  { title: "Borrower", blurb: "Track your application, upload documents, and message your loan advisor.", href: "/portal/borrower", name: "Michael Johnson" },
  { title: "Broker", blurb: "Submit deals, track your pipeline, and manage referrals.", href: "/portal/broker", name: "Sarah Williams" },
  { title: "Staff", blurb: "Internal operations: leads, applications, underwriting and conditions.", href: "/portal/staff", name: "Operations team" },
];

export default function PortalChooserPage() {
  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2rem" }}>Sign In</h1>
      <p className="mut" style={{ maxWidth: 560 }}>
        This is a portfolio demonstration. There is no real authentication — choose a role below to
        explore that portal with realistic demo data. Nothing here is connected to a real lender, bank,
        credit bureau, CRM, underwriting system or document provider.
      </p>
      <div className="grid g3" style={{ marginTop: 16 }}>
        {ROLES.map((r) => (
          <Link key={r.href} className="card" style={{ textDecoration: "none" }} href={r.href}>
            <span className="pill">Demo role</span>
            <h3 style={{ marginTop: 8 }}>{r.title}</h3>
            <p className="mut">{r.blurb}</p>
            <b>Continue as {r.name} →</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
