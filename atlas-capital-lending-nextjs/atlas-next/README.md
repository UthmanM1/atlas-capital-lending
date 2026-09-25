# Atlas Capital Lending

Digital-first DSCR lending platform — portfolio project.

Atlas Capital Lending is a demonstration of what a modern, investor-focused real-estate
lending product could look like end to end: marketing site, acquisition funnels, a
transparent calculator suite, a guided qualification flow, and the internal tooling
(borrower portal, broker portal, staff CRM, marketing analytics) that would sit behind it.

This is a **technology and UX portfolio project**, not a real lender. No company history,
funded volume, customer count, licenses, offices, employees, or testimonials are claimed
anywhere in the app, because none exist for this demonstration.

## Features

- Marketing site with DSCR-focused messaging and professional real-estate photography
- Three acquisition funnels: Rental Purchase, Cash-Out Refinance, Portfolio
- Calculator suite: DSCR, LTV, LTC, and ARV/refinance scenario, with visible formulas
- A 6-step qualification flow that produces a saved scenario ID
- Borrower portal (application progress, document upload simulation, appointments)
- Broker portal (deal submission, pipeline, outstanding documents)
- Staff CRM (7-stage kanban pipeline, filtering, lead detail, attribution)
- Marketing dashboard (spend, CPL, cost/funded, funnel conversion, device/source/keyword
  breakdowns, live event stream)
- Ask Atlas — a scripted assistant that answers only from approved content and always
  hands off to a human advisor; it never approves, declines, or prices a loan
- Knowledge Hub with 12 articles
- 6 state market pages
- A case study route documenting the acquisition-to-funding architecture

## Architecture

This repository is the **application layer** of a larger, proposed architecture:

```
Google Search / Paid Ads
        ↓
Acquisition Funnels
        ↓
Qualification Engine
        ↓
Lead Attribution
        ↓
CRM
        ↓
Application
        ↓
Underwriting
        ↓
Funding
```

Supporting systems: Borrower Portal, Broker Portal, Knowledge Hub / SEO, Ask Atlas,
Marketing Analytics, Calculators.

**Only the frontend application exists today.** The CRM, borrower/broker portals, and
marketing dashboard run entirely in the browser against an in-memory mock store
(`lib/store.ts`) — there is no database, no auth, and no real integration with a CRM,
email/SMS provider, calendar, or document-storage system. Those are documented as a
*proposed* integration layer in the case study, not implemented.

## Technology

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- Plain CSS (no framework) — design tokens ported from the original implementation
- `next/image` for optimized, lazy-loaded photography

No other runtime dependencies. No backend, no database, no auth provider.

## Data

All financial figures, leads, CRM records, campaign metrics, and portfolio examples
shown in this application are **illustrative/mock data**, generated for demonstration
purposes. None of it represents a real lender, real customers, or real business
performance. This is stated in-product wherever it's relevant (calculator disclosures,
funded-deals page, marketing dashboard, About page).

## Project structure

```
app/                  Routes (App Router)
components/           Reusable UI, grouped by domain
lib/calculations/     Pure TypeScript calculation functions (DSCR, LTV, LTC, ARV)
lib/content/          Static content (markets, articles, FAQ, case study copy)
lib/mock-data/        Mock CRM/marketing/portal data
lib/store.ts          Lightweight shared client store (pub-sub) used by the
                       qualification flow, CRM, portal and broker portal so they
                       reflect the same in-memory state
public/images/atlas/   Photography assets (WebP)
```

## Accessibility

Audited with [axe-core](https://github.com/dequelabs/axe-core) (WCAG 2.0/2.1 A & AA
rule sets) across all 30 routes: **zero violations**. This caught and fixed two real
issues during development — insufficient text contrast on the header/footer ("Sign In"
link and copyright line) and a prohibited ARIA attribute on the qualification flow's
progress indicator (now a proper `role="progressbar"`).

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

## Deployment (Vercel)

This project has no environment-variable requirements and no server-only
dependencies — it's a static/SSR Next.js app that deploys to Vercel with the
default settings:

1. Push this repository to GitHub (or another Git provider).
2. Import it into Vercel.
3. Framework preset: Next.js (auto-detected). No environment variables required.
4. Deploy.

There are no hardcoded localhost URLs or filesystem assumptions outside the
standard Next.js `public/` directory.
