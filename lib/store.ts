"use client";
import { useSyncExternalStore } from "react";
import { INITIAL_LEADS, INITIAL_EVENTS, Lead, EventLogEntry, BROKER_PIPELINE } from "@/lib/mock-data/crm";
import { INITIAL_DOC_TASKS, DocTask } from "@/lib/mock-data/portal";
import {
  MOCK_DEALS,
  Deal,
  DealDocument,
  DealCondition,
  DealMessage,
  DocStatus,
  ConditionStatus,
} from "@/lib/mock-data/deals";

export interface RPQualification {
  propertyState: string;
  propertyType: string;
  purpose: string;
  purchasePrice: number;
  monthlyRent: number;
  creditRange: string;
  experience: string;
}

export interface RPLead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
}

export interface RPAppointment {
  date: string;
  time: string;
  type: string;
  advisor: string;
}

export interface RPScenario {
  id: string;
  qualification: RPQualification;
  lead: RPLead;
  loanAmount: number;
  dscr: number;
  ltv: number;
  createdAt: string;
  appointment?: RPAppointment;
}

interface State {
  leads: Lead[];
  events: EventLogEntry[];
  docTasks: DocTask[];
  brokerPipeline: [string, number][];
  savedScenarioId: string | null;
  rpScenario: RPScenario | null;
  deals: Deal[];
}

let state: State = {
  leads: INITIAL_LEADS,
  events: INITIAL_EVENTS,
  docTasks: INITIAL_DOC_TASKS,
  brokerPipeline: BROKER_PIPELINE.map((p) => [...p] as [string, number]),
  savedScenarioId: null,
  rpScenario: null,
  deals: MOCK_DEALS,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function logEvent(name: string, meta = "Website") {
  state = { ...state, events: [{ time: nowLabel(), name, meta }, ...state.events] };
  emit();
}

export function addLead(partial: Omit<Lead, "id">) {
  const id = "L-" + (1100 + state.leads.length);
  state = { ...state, leads: [{ id, ...partial }, ...state.leads] };
  emit();
  return id;
}

export function advanceLeadStage(id: string) {
  state = {
    ...state,
    leads: state.leads.map((l) => (l.id === id && l.stage < 6 ? { ...l, stage: l.stage + 1, activity: "Just now" } : l)),
  };
  emit();
}

export function setDocTaskStatus(index: number, status: DocTask["status"]) {
  state = {
    ...state,
    docTasks: state.docTasks.map((t, i) => (i === index ? { ...t, status } : t)),
  };
  emit();
}

export function submitBrokerDeal() {
  state = {
    ...state,
    brokerPipeline: state.brokerPipeline.map((p, i) => (i === 1 ? [p[0], p[1] + 1] : p)) as [string, number][],
  };
  logEvent("lead_submitted", "Broker portal");
  addLead({
    name: "Broker sample deal",
    source: "Broker",
    campaign: "broker-referral",
    type: "Purchase",
    amount: 410000,
    dscr: 1.3,
    ltv: 72,
    state: "TX",
    rep: "J. Kim",
    stage: 0,
    activity: "Just now",
  });
}

export function saveScenario(details: { name: string; goal: string; loan: number; dscr: number; ltv: number }) {
  const id = "ATL-" + Math.floor(100000 + Math.random() * 900000);
  state = { ...state, savedScenarioId: id };
  logEvent("qualification_completed");
  logEvent("lead_submitted");
  addLead({
    name: details.name,
    source: "Direct",
    campaign: "dscr-qualification",
    type: details.goal,
    amount: details.loan,
    dscr: +details.dscr.toFixed(2),
    ltv: Math.round(details.ltv),
    state: "FL",
    rep: "Unassigned",
    stage: 0,
    activity: "Just now",
  });
  emit();
  return id;
}

/**
 * Creates the DSCR Rental Purchase funnel's scenario: generates a Scenario ID,
 * creates the corresponding CRM lead (source: Google Search / campaign:
 * DSCR Rental Purchase, matching the campaign demo page), and stores the full
 * scenario so the Scenario Summary and Booking pages can read it back.
 */
export function saveRentalPurchaseScenario(
  qualification: RPQualification,
  lead: RPLead,
  calc: { loanAmount: number; dscr: number; ltv: number }
): RPScenario {
  const id = "ATLAS-" + Math.floor(10000 + Math.random() * 90000);
  const scenario: RPScenario = {
    id,
    qualification,
    lead,
    loanAmount: calc.loanAmount,
    dscr: calc.dscr,
    ltv: calc.ltv,
    createdAt: nowLabel(),
  };
  state = { ...state, rpScenario: scenario };
  addLead({
    name: `${lead.firstName} ${lead.lastName}`.trim(),
    source: "Google Search",
    campaign: "dscr-rental-purchase",
    type: qualification.purpose || "Purchase",
    amount: Math.round(calc.loanAmount),
    dscr: +calc.dscr.toFixed(2),
    ltv: Math.round(calc.ltv),
    state: qualification.propertyState || "—",
    rep: "Unassigned",
    stage: 0,
    activity: "Just now",
  });
  emit();
  return scenario;
}

export function bookRentalPurchaseAppointment(appointment: RPAppointment) {
  if (!state.rpScenario) return;
  state = { ...state, rpScenario: { ...state.rpScenario, appointment } };
  emit();
}

export function clearRentalPurchaseScenario() {
  state = { ...state, rpScenario: null };
  emit();
}

function updateDeal(id: string, fn: (d: Deal) => Deal) {
  state = { ...state, deals: state.deals.map((d) => (d.id === id ? fn(d) : d)) };
  emit();
}

/** Moves a deal to an adjacent pipeline stage (used by the Broker deal pipeline). */
export function moveDealStage(id: string, direction: 1 | -1) {
  updateDeal(id, (d) => {
    const next = Math.max(1, Math.min(7, d.stage + direction));
    return {
      ...d,
      stage: next,
      lastUpdated: "Just now",
      activity: [{ id: "a" + Date.now(), label: `Moved to ${next}`, date: "Just now", actor: "Demo user" }, ...d.activity],
    };
  });
  logEvent("deal_stage_changed", id);
}

export function updateDocumentStatus(dealId: string, docId: string, status: DocStatus) {
  updateDeal(dealId, (d) => ({
    ...d,
    documents: d.documents.map((doc: DealDocument) =>
      doc.id === docId ? { ...doc, status, date: status === "received" ? "Just now" : doc.date } : doc
    ),
    lastUpdated: "Just now",
  }));
  logEvent("document_uploaded", dealId);
}

export function updateConditionStatus(dealId: string, conditionId: string, status: ConditionStatus) {
  updateDeal(dealId, (d) => ({
    ...d,
    conditions: d.conditions.map((c: DealCondition) => (c.id === conditionId ? { ...c, status } : c)),
    lastUpdated: "Just now",
  }));
}

export function sendDealMessage(dealId: string, from: string, role: DealMessage["role"], body: string) {
  updateDeal(dealId, (d) => ({
    ...d,
    messages: [...d.messages, { id: "m" + Date.now(), from, role, body, date: "Just now" }],
  }));
}

export function addDeal(deal: Deal) {
  state = { ...state, deals: [deal, ...state.deals] };
  emit();
}

export function useStore(): State {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
