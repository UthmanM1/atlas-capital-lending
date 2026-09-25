import { FaqList } from "@/components/layout/AdvisorCallout";
import { FAQ } from "@/lib/content/knowledge-base";

export const metadata = {
  title: "Requirements",
  description: "Illustrative program requirements. Actual requirements vary by program.",
};

const ROWS: [string, string][] = [
  ["Minimum DSCR", "Varies by program"],
  ["Maximum LTV", "Illustrative 75% purchase"],
  ["Credit score", "Ranges affect terms"],
  ["Documents", "Lease, insurance, bank statements, entity docs"],
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Requirements</h1>
          <p>Illustrative program requirements. Actual requirements vary by program.</p>
        </div>
      </section>
      <section className="wrap sec pane">
        <table>
          <tbody>
            {ROWS.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <FaqList items={FAQ} />
      </section>
    </>
  );
}
