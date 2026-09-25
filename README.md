# Atlas Capital Lending

Digital-first DSCR lending platform — portfolio project.

## Project overview

Atlas Capital Lending is a demonstration of what a modern, investor-focused real-estate
lending product could look like end to end: a marketing site, acquisition funnels, a
transparent calculator suite, a guided qualification flow, and the internal tooling
(borrower portal, broker portal, staff operations portal) that would sit behind it —
plus the growth layer (SEO, AI search, paid search, analytics) that would drive traffic
into it.

This is a **technology, UX and product-architecture portfolio project**, not a real
lender. No company history, funded volume, customer count, licenses, offices, employees,
testimonials, rankings, or campaign performance are claimed anywhere in the app, because
none exist for this demonstration. Every claim of that kind is explicitly labeled
illustrative in the product itself.

**Start here:** [`/case-study`](http://localhost:3000/case-study) is the main portfolio
presentation page — it links out to every piece described below.

## Features

- Marketing site with DSCR-focused messaging and professional real-estate photography
- Three acquisition funnels (rental purchase, cash-out, portfolio) plus a deeper,
  dedicated DSCR Rental Purchase funnel (calculator → 7-step qualification → lead
  capture → scenario summary → booking)
- Calculator suite: DSCR, LTV, LTC, ARV/refinance scenario, with visible formulas
- Borrower, Broker and Staff portals under `/portal`, sharing one live deal data model
- A named analytics event architecture (`lib/analytics.ts`)
- A 12-article Knowledge Hub and 6 state market pages
- A growth/case-study layer: `/technology`, `/growth/seo`, `/growth/ai-search`,
  `/growth/paid-search`, `/growth/analytics`, `/case-study`

## Architecture

This repository is the **application layer** of a larger, proposed architecture,
documented in full at [`/technology`](http://localhost:3000/technology):

```
Vercel
  ↓
Next.js Application
  ↓
Authentication / Authorization
  ↓
API Layer
  ↓
Database
  ↓
Document Storage
  ↓
CRM / LOS
  ↓
Email / SMS
  ↓
Analytics / Monitoring
```

Served by three portals: Borrower, Broker, Staff (`/portal/borrower`, `/portal/broker`,
`/portal/staff`).

**Only the frontend application exists today.** Everything above "Next.js Application" in
that diagram is proposed. The CRM, portals, and marketing dashboard run entirely in the
browser against an in-memory mock store (`lib/store.ts`) — no database, no auth, no real
third-party integrations.

## Routes

| Area | Routes |
|---|---|
| Marketing / funnels | `/`, `/loans/*`, `/calculators/*`, `/investors`, `/brokers`, `/how-it-works`, `/requirements`, `/funded-deals` |
| DSCR Rental Purchase funnel | `/loans/dscr-rental-purchase` (+ `/apply`, `/scenario`, `/book`) |
| Content | `/resources` (+ articles), `/markets` (+ states) |
| Portals | `/portal` (role chooser), `/portal/borrower`, `/portal/broker` (+ `/deals/new`, `/deals/[id]`), `/portal/staff` (+ `/deals/[id]`), `/portal/architecture` |
| Legacy CRM/marketing (kept, independent) | `/staff`, `/staff/marketing` |
| Growth & case study | `/case-study`, `/technology`, `/growth/seo`, `/growth/ai-search`, `/growth/paid-search`, `/growth/analytics`, `/case-studies/dscr-lending-platform` |
| Company / legal | `/about`, `/contact`, `/privacy`, `/terms`, `/disclosures` |
| SEO plumbing | `/sitemap.xml`, `/robots.txt` |

`/portal` and `/broker` are older routes now redirecting to `/portal/borrower` and
`/portal/broker` respectively.

## Demo functionality (implemented)

- In-memory shared store (`lib/store.ts`) powering leads, deals, documents, conditions,
  messages and events — persists across client-side navigation within one browser tab,
  resets on a hard reload (there is no database).
- Simulated document upload (a timed delay, then a status change — no file is ever
  transmitted).
- A scripted "Ask Atlas" assistant that answers only from approved content and always
  hands off to a human advisor.
- A demo role chooser at `/portal` standing in for authentication.
- Named analytics events, logged to the console and an in-app event stream.

## Proposed production architecture

See [`/technology`](http://localhost:3000/technology) for the full diagram and security
section, and [`/portal/architecture`](http://localhost:3000/portal/architecture) for a
system-by-system demo-vs-production table (auth, database, CRM, document storage,
email/SMS, analytics, LOS, identity verification, audit logging).

## Integrations

| Capability | Demo | Production option |
|---|---|---|
| Authentication | Role chooser, no real login | Auth0 / Clerk / custom OAuth |
| CRM | In-memory mock leads & deals | Salesforce, HubSpot, or LOS-native CRM |
| LOS | Mock fields on a Deal object | Licensed or custom LOS |
| Database | None (resets on reload) | Postgres |
| Document storage | Simulated upload | S3 behind signed URLs |
| Email / SMS | Not implemented | Postmark/SendGrid, Twilio |
| Analytics | Console + in-app log | GA4 / Segment / RudderStack |
| Monitoring | Not implemented | Sentry, Vercel Analytics |
| Scheduling | Static demo picker | Cal.com / Calendly API |

Full table with detail at `/technology`.

## SEO strategy

See [`/growth/seo`](http://localhost:3000/growth/seo). Content is organized into four
page groups (Core DSCR, Educational, State, Calculators), most of which already exist as
real routes in this app. Covers internal linking, structured data, canonical URLs, the
XML sitemap (`app/sitemap.ts`), metadata, Core Web Vitals and crawlability
(`app/robots.ts`). No rankings are promised.

## AI search strategy

See [`/growth/ai-search`](http://localhost:3000/growth/ai-search). Explains how
Knowledge Hub content is structured to be useful for AI Overviews/AI Mode and
conversational search — question-based headings, direct answers, original worked
calculations, and source transparency. No AI visibility or citations are guaranteed.

## Paid search strategy

See [`/growth/paid-search`](http://localhost:3000/growth/paid-search). An illustrative
Google Search campaign (ad groups, keywords, negative keywords, and the conversion path
from Search through Application) that would drive the DSCR Rental Purchase funnel. No
conversion rates, CPL, funded-loan counts, or ROI are claimed — clearly labeled
"Illustrative portfolio campaign — not historical performance."

## Security considerations

See [`/technology`](http://localhost:3000/technology) for the full list of proposed
controls (authentication, role-based authorization, server-side validation, encrypted
connections, secure document storage, signed URLs, audit logging, rate limiting, secrets
management, backup/recovery, error monitoring, consent tracking). None of these are
implemented in this demo beyond what's noted above.

**Production security requirements would be finalized based on the lender's application
system, CRM, vendors, data flows, and applicable regulatory requirements.** No regulatory
compliance is claimed by this project.

## Deployment (Vercel)

This project has no environment-variable requirements and no server-only dependencies —
it deploys to Vercel with the default Next.js settings:

1. Push this repository to a Git provider.
2. Import it into Vercel.
3. Framework preset: Next.js (auto-detected).
4. Deploy.

## Environment variables

None required. This demo has no external API keys, database connection strings, or
secrets — everything runs client-side against the in-memory mock store.

## Known limitations

- All state (leads, deals, documents, conditions, messages, events, saved scenarios)
  lives in memory in the browser tab and resets on a hard reload. It is never shared
  between devices, users, or sessions.
- There is no real authentication — the `/portal` role chooser lets anyone view any role.
- No file is ever actually uploaded anywhere; document "upload" is a timed UI simulation.
- Two independent mock "lead" concepts exist by design: a lightweight marketing-attribution
  CRM (`/staff`) and the deeper loan-file operations portal (`/portal/staff`) — this
  mirrors how marketing CRM and loan-operations systems are typically separate tools at a
  real lending company, rather than being an oversight.
- All campaign, funnel and financial figures throughout the app (including `/growth/*`)
  are illustrative demo data, not historical performance.

## Accessibility

Audited with [axe-core](https://github.com/dequelabs/axe-core) (WCAG 2.0/2.1 A & AA rule
sets) across every route in the app: **zero violations**, re-verified after each round of
new pages. This has caught and fixed several real issues during development — insufficient
text contrast (header/footer links, and a status-pill color combination), a prohibited
ARIA attribute on a progress indicator, a table-padding bug that ran columns together, and
a state-format data-model mismatch between a form and its consumer.

## Running locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
npm run start
```

```bash
npm run lint
```

## Project structure

```
app/                  Routes (App Router)
components/            Reusable UI, grouped by domain
lib/calculations/      Pure TypeScript calculation functions (DSCR, LTV, LTC, ARV)
lib/content/           Static content (markets, articles, FAQ, case study, SEO, security)
lib/mock-data/         Mock CRM/marketing/portal/deal/campaign data
lib/store.ts           Shared in-memory client store (leads, deals, documents, events)
lib/analytics.ts        Named analytics event abstraction
public/images/atlas/    Photography assets (WebP)
```
