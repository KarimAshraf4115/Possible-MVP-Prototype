import { Globe, Camera, Music2, RefreshCw, Settings2 } from "lucide-react";

const platformIcons = {
  facebook: Globe,
  instagram: Camera,
  tiktok: Music2,
};

// connections: array from src/data/connections.js, each optionally
// carrying { connected: bool, failed: bool, failReason: string }
function statusFor(conn) {
  if (conn.failed) {
    return {
      label: "Failed",
      dot: "bg-red-500",
      badge: "bg-red-50 text-red-700",
    };
  }
  if (conn.connected) {
    return {
      label: "Connected",
      dot: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700",
    };
  }
  return {
    label: "Disconnected",
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-600",
  };
}

function ConnectionStatusPanel({ connections }) {
  return (
    <div className="rounded-3xl bg-white/70 border border-white/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-gray-900">Connections</h3>
        <span className="text-[12px] text-gray-500">
          {connections.filter((c) => c.connected && !c.failed).length}/
          {connections.length} connected
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {connections.map((conn) => {
          const Icon = platformIcons[conn.platform];
          const status = statusFor(conn);
          const needsAction = conn.failed || !conn.connected;

          return (
            <div
              key={conn.id}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/60 hover:bg-white/90 transition"
            >
              {/* Icon + name */}
              <div className="w-10 h-10 rounded-full bg-[#181818] text-white flex items-center justify-center shrink-0">
                {Icon && <Icon size={18} strokeWidth={1.8} />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-medium text-gray-900">
                  {conn.name}
                </p>

                {conn.failed && conn.failReason ? (
                  <p className="text-[12px] text-red-600 mt-0.5 truncate">
                    {conn.failReason}
                  </p>
                ) : (
                  <p className="text-[12px] text-gray-500 mt-0.5">
                    {status.label}
                  </p>
                )}
              </div>

              {/* Status badge */}
              <span
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium ${status.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>

              {/* Action */}
              <button
                className={`shrink-0 h-8 px-3 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition ${
                  needsAction
                    ? "bg-[#181818] text-white hover:bg-black"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {needsAction ? (
                  <>
                    <RefreshCw size={13} strokeWidth={2} />
                    Reconnect
                  </>
                ) : (
                  <>
                    <Settings2 size={13} strokeWidth={2} />
                    Manage
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConnectionStatusPanel;
