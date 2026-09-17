import ConnectorCard from "../components/Connectors/ConnectorCard";
import { connections } from "../data/connections";

export default function Connectors() {
  return (
    <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {connections.map((conn) => (
        <ConnectorCard key={conn.id} conn={conn} />
      ))}
    </div>
  );
}
