import Link from "next/link";
import Pic from "@/components/property/Pic";
import ArchitectureDiagram from "@/components/case-study/ArchitectureDiagram";
import { CASE_STUDY_SECTIONS, CONVERSION_JOURNEY, PRODUCTION_LAYERS } from "@/lib/content/case-study";
import { HERO_IMG, MULTIFAMILY_IMG, INTERIOR_1, CASE_STUDY_WIDE_IMG } from "@/lib/content/images";

export const metadata = {
  title: "Case Study — Digital DSCR Lending Platform",
  description:
    "A connected acquisition, qualification and lending experience for real estate investors, built as a Next.js portfolio project.",
};

const EXPLORE_LINKS: [string, string][] = [
  ["Home", "/"],
  ["Rental funnel", "/loans/rental-purchase"],
  ["Cash-out funnel", "/loans/cash-out"],
  ["Portfolio funnel", "/loans/portfolio"],
  ["Calculators", "/calculators/dscr"],
  ["Portal", "/portal"],
  ["Broker", "/broker"],
  ["CRM", "/staff"],
  ["Marketing", "/staff/marketing"],
];

export default function CaseStudyPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Atlas Capital Lending</h1>
          <h2 className="serif">Digital DSCR Lending Platform</h2>
          <p>A connected acquisition, qualification and lending experience for real estate investors.</p>
        </div>
      </section>
      <section className="wrap sec pane">
        <p className="note">
          This portfolio case study covers the Next.js implementation and a proposed production
          architecture. Integrations shown are proposed, not deployed. Property photography illustrates
          the investor experience; the product screens linked below are the real, working application.
        </p>

        <div className="grid g3">
          <Pic src={HERO_IMG.src} alt={HERO_IMG.alt} ratio="r43" />
          <Pic src={MULTIFAMILY_IMG.src} alt={MULTIFAMILY_IMG.alt} ratio="r43" />
          <Pic src={INTERIOR_1.src} alt={INTERIOR_1.alt} ratio="r43" />
        </div>

        <h2 style={{ marginTop: 32 }}>Conversion journey</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CONVERSION_JOURNEY.map((step, i) => (
            <span key={step} className="mut" style={{ fontSize: 13 }}>
              {step}
              {i < CONVERSION_JOURNEY.length - 1 ? " →" : ""}
            </span>
          ))}
        </div>

        <div className="grid g2" style={{ marginTop: 24 }}>
          {CASE_STUDY_SECTIONS.map(([title, desc], i) => (
            <div className="card" key={title}>
              <h3>
                {String(i + 1).padStart(2, "0")} {title}
              </h3>
              <p className="mut">{desc}</p>
            </div>
          ))}
        </div>

        <figure className="brk">
          <Pic src={CASE_STUDY_WIDE_IMG.src} alt={CASE_STUDY_WIDE_IMG.alt} ratio="r219" />
          <figcaption>
            Illustrative rental property — the acquisition funnels are built around real properties like
            this one.
          </figcaption>
        </figure>

        <h2 style={{ marginTop: 32 }}>Architecture diagram</h2>
        <div className="card">
          <ArchitectureDiagram />
        </div>

        <h2 style={{ marginTop: 32 }}>Proposed production architecture</h2>
        <div className="grid g3">
          {PRODUCTION_LAYERS.map(([title, desc]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p className="mut">{desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: 32 }}>Explore the prototype</h2>
        <p className="mut">
          These are the real, interactive product surfaces referenced above — DSCR/LTV/LTC/ARV
          calculators, the qualification flow, the borrower and broker portals, the staff CRM, the
          marketing dashboard and the Ask Atlas assistant — not static images.
        </p>
        <p>
          {EXPLORE_LINKS.map(([label, href]) => (
            <Link key={href} className="btn ghost sm" href={href} style={{ marginRight: 6, marginBottom: 6, display: "inline-block" }}>
              {label}
            </Link>
          ))}
        </p>
      </section>
    </>
  );
}
