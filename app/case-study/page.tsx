import Link from "next/link";
import Pic from "@/components/property/Pic";
import { HERO_IMG, MULTIFAMILY_IMG, INTERIOR_1, CASE_STUDY_WIDE_IMG } from "@/lib/content/images";

export const metadata = {
  title: "Case Study — End-to-End Digital Lending Experience",
  description:
    "How Atlas Capital Lending connects investor acquisition, qualification, borrower experience, broker workflows and lending operations in one system.",
};

function SectionCard({ href, label }: { href: string; label: string }) {
  return (
    <Link className="card" style={{ textDecoration: "none" }} href={href}>
      {label} →
    </Link>
  );
}

const BUILT: string[] = [
  "Marketing site with DSCR-focused messaging and real property photography",
  "Three acquisition funnels (rental purchase, cash-out, portfolio) plus a deeper, dedicated DSCR Rental Purchase funnel",
  "A visible-formula calculator suite: DSCR, LTV, LTC, ARV",
  "A guided, multi-step qualification wizard producing a saved scenario ID",
  "Lead capture, CRM handoff visualization, and a demo appointment booker",
  "Borrower, Broker and Staff portals sharing one live deal data model",
  "A 12-article Knowledge Hub and 6 state market pages",
  "A named analytics event architecture, inspectable in the browser console",
  "SEO metadata, sitemap, and robots configuration across the whole app",
];

const TO_INTEGRATE: string[] = [
  "Real authentication and role-based authorization (client's identity provider)",
  "A persistent database and real CRM / LOS system of record",
  "Encrypted document storage with signed upload URLs",
  "Email/SMS delivery and a real calendar integration",
  "Production analytics (GA4/CDP) and error monitoring",
  "Regulatory and compliance review specific to the client's lending programs and states",
];

export default function CaseStudyPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Atlas Capital Lending</h1>
          <h2 className="serif">End-to-End Digital Lending Experience</h2>
          <p>
            A portfolio demonstration of how investor acquisition, qualification, borrower experience,
            broker workflows and lending operations could connect in one system.
          </p>
        </div>
      </section>

      {/* 01 Challenge */}
      <section className="wrap sec pane">
        <h2>01 — Challenge</h2>
        <p style={{ maxWidth: 680 }}>
          Real estate investors researching financing, and the lenders trying to reach them, are usually
          served by disconnected pieces: a marketing site, a separate calculator, a phone-based
          qualification process, and internal tools that don&apos;t share data with any of it. The result is
          slow follow-up, lost attribution, and no clear view of cost per funded loan — the metric that
          actually matters.
        </p>
      </section>

      {/* 02 Strategy */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>02 — Strategy</h2>
        <p style={{ maxWidth: 680, marginBottom: 16 }}>
          Connect one journey — acquisition → qualification → application → funding — through a single
          product, so a lead created by a search ad is the same record a loan advisor, a broker, and
          operations staff all see.
        </p>
        <div className="card">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            {["Acquisition", "Qualification", "Application", "Funding"].map((s, i, arr) => (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="pill">{s}</span>
                {i < arr.length - 1 && <span aria-hidden="true" style={{ color: "var(--acc)" }}>→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 03 Acquisition */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>03 — Acquisition</h2>
        <div className="grid g2" style={{ alignItems: "center" }}>
          <Pic src={HERO_IMG.src} alt={HERO_IMG.alt} ratio="r43" />
          <div>
            <p>
              A dedicated DSCR Rental Purchase funnel carries a visitor from a landing page through a
              buying-power calculator, a 7-step qualification wizard, and lead capture — with every step
              firing a named analytics event.
            </p>
            <div className="grid g2">
              <SectionCard href="/loans/dscr-rental-purchase" label="View the funnel" />
              <SectionCard href="/growth/paid-search" label="See the campaign it's built for" />
            </div>
          </div>
        </div>
      </section>

      {/* 04 Qualification */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>04 — Qualification</h2>
        <p style={{ maxWidth: 680 }}>
          DSCR, LTV, LTC and ARV calculators show every formula and assumption inline — nothing is a
          black-box score. The qualification wizard saves a scenario and produces a Scenario ID, the same
          way a real intake flow would.
        </p>
        <div className="grid g2">
          <SectionCard href="/calculators/dscr" label="Open the calculator suite" />
          <SectionCard href="/qualify" label="Try the qualification flow" />
        </div>
      </section>

      {/* 05 Borrower Experience */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>05 — Borrower Experience</h2>
        <div className="grid g2" style={{ alignItems: "center" }}>
          <div>
            <p>
              A tabbed portal — Overview, Application, Documents, Messages, Appointments — built around one
              realistic active loan scenario (DSCR Rental Purchase, Tampa FL, Underwriting stage).
            </p>
            <SectionCard href="/portal/borrower" label="Open the borrower portal" />
          </div>
          <Pic src={INTERIOR_1.src} alt={INTERIOR_1.alt} ratio="r43" />
        </div>
      </section>

      {/* 06 Broker Experience */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>06 — Broker Experience</h2>
        <p style={{ maxWidth: 680 }}>
          A 7-stage deal pipeline brokers can move deals through, a submission form with live LTV/DSCR
          calculation, and a deal detail view shared with staff.
        </p>
        <div className="grid g2">
          <SectionCard href="/portal/broker" label="Open the broker portal" />
          <SectionCard href="/portal/broker/deals/new" label="Try the deal submission form" />
        </div>
      </section>

      {/* 07 Operations */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>07 — Operations</h2>
        <div className="grid g2" style={{ alignItems: "center" }}>
          <Pic src={MULTIFAMILY_IMG.src} alt={MULTIFAMILY_IMG.alt} ratio="r43" />
          <div>
            <p>
              A staff dashboard with a searchable, filterable deal table — by state, stage, loan type and
              assignee — backed by the same shared deal data as the borrower and broker portals.
            </p>
            <SectionCard href="/portal/staff" label="Open the staff portal" />
          </div>
        </div>
      </section>

      {/* 08 Search & AI */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>08 — Search &amp; AI</h2>
        <p style={{ maxWidth: 680 }}>
          Content organized into core, educational, state and calculator page groups — written to answer
          questions directly, the format both traditional SEO and AI-generated answers favor.
        </p>
        <div className="grid g2">
          <SectionCard href="/growth/seo" label="See the SEO strategy" />
          <SectionCard href="/growth/ai-search" label="See the AI search strategy" />
        </div>
      </section>

      {/* 09 Technology */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>09 — Technology</h2>
        <figure className="brk">
          <Pic src={CASE_STUDY_WIDE_IMG.src} alt={CASE_STUDY_WIDE_IMG.alt} ratio="r219" />
          <figcaption>Illustrative property photography used throughout the demo funnels.</figcaption>
        </figure>
        <p style={{ maxWidth: 680 }}>
          A Next.js application designed around a proposed production stack: authentication, an API layer,
          a database, document storage, a CRM/LOS, messaging, and analytics — each clearly separated from
          what&apos;s implemented in this demo.
        </p>
        <SectionCard href="/technology" label="See the full architecture" />
      </section>

      {/* 10 What Was Built */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>10 — What Was Built</h2>
        <ul style={{ paddingLeft: 18, lineHeight: 1.9, maxWidth: 680 }}>
          {BUILT.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </section>

      {/* 11 What Would Be Integrated */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>11 — What Would Be Integrated</h2>
        <p className="mut" style={{ maxWidth: 680 }}>Systems that depend on the client&apos;s own vendors and infrastructure:</p>
        <ul style={{ paddingLeft: 18, lineHeight: 1.9, maxWidth: 680 }}>
          {TO_INTEGRATE.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <SectionCard href="/portal/architecture" label="See the full demo-vs-production breakdown" />
      </section>

      {/* 12 Outcome */}
      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>12 — Outcome</h2>
        <div className="card" style={{ maxWidth: 680 }}>
          <p style={{ margin: 0 }}>
            Designed as a portfolio demonstration of how a digital lending platform could connect
            acquisition, qualification, borrower experience, broker workflows, and lending operations in
            one system.
          </p>
        </div>
        <p style={{ marginTop: 20 }}>
          <Link className="btn" href="/">Explore the site from the homepage</Link>
        </p>
      </section>
    </>
  );
}
