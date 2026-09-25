import Link from "next/link";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Loans",
    links: [
      ["DSCR loans", "/loans/dscr"],
      ["Rental purchase", "/loans/rental-purchase"],
      ["Cash-out", "/loans/cash-out"],
      ["Rate & term", "/loans/rate-term"],
      ["Portfolio", "/loans/portfolio"],
    ],
  },
  {
    title: "Investors",
    links: [
      ["Calculators", "/calculators/dscr"],
      ["Markets", "/markets"],
      ["Funded deals", "/funded-deals"],
      ["How it works", "/how-it-works"],
      ["Requirements", "/requirements"],
    ],
  },
  {
    title: "Brokers",
    links: [
      ["Broker program", "/brokers"],
      ["Broker portal", "/broker"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Knowledge hub", "/resources"],
      ["FAQ", "/contact#faq"],
      ["Case study", "/case-studies/dscr-lending-platform"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Disclosures", "/disclosures"],
      ["Staff CRM", "/staff"],
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="grid g4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))" }}>
          {COLUMNS.map((c) => (
            <div key={c.title} className="fcol">
              <h4>{c.title}</h4>
              {c.links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <p className="mut-dark" style={{ fontSize: 13, marginTop: 28 }}>
          © 2026 Atlas Capital Lending. All rights reserved. Programs, requirements, rates and terms are
          subject to change. Calculator results are illustrative estimates, not offers or commitments to
          lend.
        </p>
      </div>
    </footer>
  );
}
