import ConnectionStatusPanel from "../components/ConnectionStatusPanel";
import { connections as baseConnections } from "../data/connections";

// Sample status overlay for the mockup — shows all three states.
// Swap this for real mock-backend state later.
const connections = [
  { ...baseConnections[0] }, // facebook — connected: true
  { ...baseConnections[1] }, // instagram — connected: true
  {
    ...baseConnections[2], // tiktok — force a Failed state for the demo
    connected: true,
    failed: true,
    failReason: "Session expired — reconnect required",
  },
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5">
      <div className="lg:col-span-1">
        <ConnectionStatusPanel connections={connections} />
      </div>
    </div>
  );
}
