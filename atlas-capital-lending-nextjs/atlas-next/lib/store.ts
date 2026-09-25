"use client";
import { useSyncExternalStore } from "react";
import { INITIAL_LEADS, INITIAL_EVENTS, Lead, EventLogEntry, BROKER_PIPELINE } from "@/lib/mock-data/crm";
import { INITIAL_DOC_TASKS, DocTask } from "@/lib/mock-data/portal";

interface State {
  leads: Lead[];
  events: EventLogEntry[];
  docTasks: DocTask[];
  brokerPipeline: [string, number][];
  savedScenarioId: string | null;
}

let state: State = {
  leads: INITIAL_LEADS,
  events: INITIAL_EVENTS,
  docTasks: INITIAL_DOC_TASKS,
  brokerPipeline: BROKER_PIPELINE.map((p) => [...p] as [string, number]),
  savedScenarioId: null,
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

export function useStore(): State {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
