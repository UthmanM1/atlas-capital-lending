"use client";
import { useEffect, useRef } from "react";
import { track, FUNNEL_EVENTS } from "@/lib/analytics";

/** Fires landing_page_view once per mount. Renders nothing. */
export default function LandingViewTracker({ campaign = "dscr-rental-purchase" }: { campaign?: string }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(FUNNEL_EVENTS.LANDING_PAGE_VIEW, { campaign, page: "dscr-rental-purchase-landing" });
  }, [campaign]);
  return null;
}
