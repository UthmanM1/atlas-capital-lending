"use client";
import { logEvent } from "@/lib/store";

/**
 * Analytics abstraction for the DSCR Rental Purchase funnel.
 *
 * NOT CONNECTED to a real analytics provider. Every call here does two things:
 *   1. Writes to the in-memory event log (`lib/store.ts`), which is what powers
 *      the visible "Event stream" on the Marketing Dashboard (/staff/marketing)
 *      and the CRM Handoff card on the scenario summary page.
 *   2. Logs to the browser console, so the event names/payloads are inspectable
 *      in dev tools exactly as they'd appear in a real analytics debugger.
 *
 * WHERE A REAL INTEGRATION WOULD GO:
 * In a production build, `track()` below is the single place to add a call to
 * GA4 (`window.gtag('event', name, params)`), a CDP (Segment/RudderStack
 * `.track()`), or a server-side event API — without touching any call site in
 * the funnel. That's the point of routing every event through one function
 * instead of scattering analytics calls through components.
 */

export const FUNNEL_EVENTS = {
  LANDING_PAGE_VIEW: "landing_page_view",
  CALCULATOR_STARTED: "calculator_started",
  CALCULATOR_COMPLETED: "calculator_completed",
  QUALIFICATION_STARTED: "qualification_started",
  QUALIFICATION_STEP: "qualification_step",
  QUALIFICATION_COMPLETED: "qualification_completed",
  LEAD_STARTED: "lead_started",
  LEAD_SUBMITTED: "lead_submitted",
  APPOINTMENT_STARTED: "appointment_started",
  APPOINTMENT_BOOKED: "appointment_booked",
  APPLICATION_STARTED: "application_started",
} as const;

export type FunnelEventName = (typeof FUNNEL_EVENTS)[keyof typeof FUNNEL_EVENTS];

export function track(name: FunnelEventName, meta: Record<string, string | number | undefined> = {}) {
  const metaLabel =
    Object.entries(meta)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${v}`)
      .join(" · ") || "DSCR Rental Purchase funnel";

  // 1. Visible in-app event log (Marketing Dashboard, CRM handoff)
  logEvent(name, metaLabel);

  // 2. Inspectable in the browser console, standing in for a real analytics call
  console.info(`[analytics] ${name}`, meta);

  // 3. Real integration point (intentionally inert in this demo):
  // if (typeof window !== "undefined" && typeof window.gtag === "function") {
  //   window.gtag("event", name, meta);
  // }
}
