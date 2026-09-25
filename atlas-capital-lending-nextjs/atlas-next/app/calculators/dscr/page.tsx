import DscrCalculator from "@/components/calculators/DscrCalculator";
import CalculatorTabs from "@/components/calculators/CalculatorTabs";

export const metadata = {
  title: "DSCR Calculator",
  description: "Estimate DSCR, LTV, PITIA and cash flow for a rental purchase with transparent, editable formulas.",
};

export default function Page() {
  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2.2rem" }}>Calculators</h1>
      <CalculatorTabs active="/calculators/dscr" />
      <DscrCalculator />
    </section>
  );
}
