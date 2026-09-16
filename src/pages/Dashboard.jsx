import ConnectionStatusPanel from "../components/ConnectionStatusPanel";
import { connections } from "../data/connections";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5">
      <div className="lg:col-span-1">
        <ConnectionStatusPanel connections={connections} />
      </div>
    </div>
  );
}