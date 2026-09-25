export interface DscrInputs {
  addr: string;
  type: string;
  price: number;
  value: number;
  rent: number;
  tax: number;
  ins: number;
  hoa: number;
  vac: number;
  loan: number;
  rate: number;
  term: number;
  amort: string;
  credit: string;
  cc: number;
}

export interface DscrResult {
  pi: number;
  pitia: number;
  eff: number;
  dscr: number;
  noi: number;
  ltv: number;
  cf: number;
  cash: number;
}

export const DEFAULT_DSCR_INPUTS: DscrInputs = {
  addr: "123 Main Street, Tampa, FL",
  type: "Single family",
  price: 425000,
  value: 430000,
  rent: 3100,
  tax: 4800,
  ins: 2100,
  hoa: 0,
  vac: 5,
  loan: 318750,
  rate: 7.25,
  term: 30,
  amort: "Fully amortizing",
  credit: "720–739",
  cc: 3,
};

/**
 * Core DSCR/PITIA calculation, ported directly from the original
 * calc() function. Formulas:
 *   P&I = L·r / (1 − (1+r)^−n)   (interest-only: L·r)
 *   PITIA = P&I + taxes/12 + insurance/12 + HOA
 *   Effective rent = rent × (1 − vacancy)
 *   DSCR = effective rent ÷ PITIA
 *   NOI = effective rent×12 − taxes − insurance − HOA×12
 *   LTV = loan ÷ lower of price or value
 *   Cash required = price − loan + closing-cost assumption
 */
export function calcDscr(v: DscrInputs): DscrResult {
  const r = v.rate / 1200;
  const n = v.term * 12;
  const io = v.amort !== "Fully amortizing";
  const pi = io ? v.loan * r : r ? (v.loan * r) / (1 - Math.pow(1 + r, -n)) : v.loan / n;
  const eff = v.rent * (1 - v.vac / 100);
  const pitia = pi + v.tax / 12 + v.ins / 12 + v.hoa;
  return {
    pi,
    pitia,
    eff,
    dscr: pitia ? eff / pitia : 0,
    noi: eff * 12 - v.tax - v.ins - v.hoa * 12,
    ltv: (v.loan / Math.min(v.price, v.value)) * 100,
    cf: eff - pitia,
    cash: v.price - v.loan + (v.price * v.cc) / 100,
  };
}

export interface CashOutInputs {
  val: number;
  bal: number;
  rent: number;
  cash: number;
  rate: number;
  oth: number;
}

export interface CashOutResult {
  loan: number;
  ltv: number;
  equity: number;
  pi: number;
  dscr: number;
  overLtv: boolean;
}

export const DEFAULT_CASHOUT_INPUTS: CashOutInputs = {
  val: 680000,
  bal: 320000,
  rent: 4200,
  cash: 100000,
  rate: 7.5,
  oth: 900,
};

/** Cash-out refinance scenario, ported from xo(). Assumes a 30-year fully amortizing loan. */
export function calcCashOut(x: CashOutInputs): CashOutResult {
  const loan = x.bal + x.cash;
  const ltv = (loan / x.val) * 100;
  const equity = x.val * 0.75 - x.bal;
  const r = x.rate / 1200;
  const pi = (loan * r) / (1 - Math.pow(1 + r, -360));
  const dscr = (x.rent * 0.95) / (pi + x.oth);
  return { loan, ltv, equity: Math.max(equity, 0), pi, dscr, overLtv: ltv > 75 };
}

export interface PortfolioInputs {
  n: number;
  val: number;
  debt: number;
  inc: number;
  dscr: number;
  acq: number;
}

export interface PortfolioResult {
  ltv: number;
  equity: number;
  incomePerProperty: number;
  avgDscr: number;
  propertiesAfterPlan: number;
}

export const DEFAULT_PORTFOLIO_INPUTS: PortfolioInputs = {
  n: 6,
  val: 2400000,
  debt: 1500000,
  inc: 186000,
  dscr: 1.26,
  acq: 2,
};

/** Portfolio blended metrics, ported from po(). */
export function calcPortfolio(p: PortfolioInputs): PortfolioResult {
  return {
    ltv: (p.debt / p.val) * 100 || 0,
    equity: p.val - p.debt,
    incomePerProperty: p.inc / Math.max(p.n, 1),
    avgDscr: p.dscr,
    propertiesAfterPlan: p.n + p.acq,
  };
}

export function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export interface LtcInputs {
  purchasePrice: number;
  renovationBudget: number;
  loanAmount: number;
}

export interface LtcResult {
  totalCost: number;
  ltc: number;
}

export const DEFAULT_LTC_INPUTS: LtcInputs = {
  purchasePrice: 300000,
  renovationBudget: 50000,
  loanAmount: 262500,
};

/** Loan-to-cost = loan amount ÷ (purchase price + renovation budget). */
export function calcLtc(v: LtcInputs): LtcResult {
  const totalCost = v.purchasePrice + v.renovationBudget;
  return { totalCost, ltc: totalCost ? (v.loanAmount / totalCost) * 100 : 0 };
}

export interface SimpleLtvInputs {
  value: number;
  loan: number;
}
export function calcSimpleLtv(v: SimpleLtvInputs): number {
  return v.value > 0 ? (v.loan / v.value) * 100 : 0;
}

export interface ArvInputs {
  purchasePrice: number;
  renovation: number;
  closingCosts: number;
  estimatedArv: number;
  loanAmount: number;
}
export interface ArvResult {
  totalProjectCost: number;
  estimatedEquity: number;
  ltvAtArv: number;
}
export const DEFAULT_ARV_INPUTS: ArvInputs = {
  purchasePrice: 300000,
  renovation: 50000,
  closingCosts: 9000,
  estimatedArv: 480000,
  loanAmount: 360000,
};
/** ARV / BRRRR-style refinance scenario, ported from the GC.arv formula. */
export function calcArv(v: ArvInputs): ArvResult {
  const totalProjectCost = v.purchasePrice + v.renovation + v.closingCosts;
  return {
    totalProjectCost,
    estimatedEquity: v.estimatedArv - totalProjectCost,
    ltvAtArv: v.estimatedArv > 0 ? (v.loanAmount / v.estimatedArv) * 100 : 0,
  };
}
