import LtcCalculator from "@/components/calculators/LtcCalculator";
import CalculatorTabs from "@/components/calculators/CalculatorTabs";

export const metadata = {
  title: "LTC Calculator",
  description: "Estimate loan-to-cost for a purchase-plus-renovation rental scenario.",
};

export default function Page() {
  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2.2rem" }}>Calculators</h1>
      <CalculatorTabs active="/calculators/ltc" />
      <LtcCalculator />
    </section>
  );
}
