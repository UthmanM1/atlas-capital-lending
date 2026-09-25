import LtvCalculator from "@/components/calculators/LtvCalculator";
import CalculatorTabs from "@/components/calculators/CalculatorTabs";

export const metadata = {
  title: "LTV Calculator",
  description: "Estimate loan-to-value for a rental property purchase or refinance.",
};

export default function Page() {
  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2.2rem" }}>Calculators</h1>
      <CalculatorTabs active="/calculators/ltv" />
      <LtvCalculator />
    </section>
  );
}
