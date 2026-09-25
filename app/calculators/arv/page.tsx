import ArvCalculator from "@/components/calculators/ArvCalculator";
import CalculatorTabs from "@/components/calculators/CalculatorTabs";

export const metadata = {
  title: "ARV / Refinance Calculator",
  description: "Estimate total project cost, equity and LTV at after-repair value for a refinance scenario.",
};

export default function Page() {
  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2.2rem" }}>Calculators</h1>
      <CalculatorTabs active="/calculators/arv" />
      <ArvCalculator />
    </section>
  );
}
