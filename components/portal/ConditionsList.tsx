import { DealCondition } from "@/lib/mock-data/deals";
import StatusPill from "./StatusPill";

export default function ConditionsList({ conditions }: { conditions: DealCondition[] }) {
  if (conditions.length === 0) {
    return (
      <div className="card">
        <h3>Conditions</h3>
        <p className="mut">No outstanding conditions on this file.</p>
      </div>
    );
  }
  return (
    <div className="card">
      <h3>Conditions</h3>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Condition</th>
              <th>Status</th>
              <th>Requested</th>
              <th>Due</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {conditions.map((c) => (
              <tr key={c.id}>
                <td>{c.label}</td>
                <td><StatusPill status={c.status} /></td>
                <td>{c.requestedDate}</td>
                <td>{c.dueDate}</td>
                <td>{c.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
