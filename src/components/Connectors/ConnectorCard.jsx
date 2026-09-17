import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { RefreshCw, Unplug, Plug } from "lucide-react";

const platformIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

function actionFor(conn) {
  if (conn.failed)
    return { label: "Reconnect", icon: RefreshCw, style: "dark" };
  if (conn.connected)
    return { label: "Disconnect", icon: Unplug, style: "outline" };
  return { label: "Connect", icon: Plug, style: "dark" };
}

export default function ConnectorCard({ conn }) {
  const Icon = platformIcons[conn.platform];
  const action = actionFor(conn);
  const ActionIcon = action.icon;

  return (
    <div className="rounded-3xl bg-white/70 border border-white/60 p-5 flex flex-col gap-4">
      {/* Logo + name */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#181818] text-white flex items-center justify-center shrink-0">
          {Icon && <Icon size={20} />}
        </div>
        <div>
          <p className="text-[14px] font-semibold text-gray-900">{conn.name}</p>
          {conn.connected && !conn.failed && (
            <p className="text-[11px] text-emerald-600">
              Connected as @{conn.mockAccount ?? "your_account"}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-[12.5px] text-gray-500 flex-1">{conn.description}</p>

      {/* Failure reason, if any */}
      {conn.failed && conn.failReason && (
        <p className="text-[11.5px] text-red-600 -mt-2">{conn.failReason}</p>
      )}

      {/* Action button */}
      <button
        className={`h-10 rounded-full text-[12.5px] font-medium flex items-center justify-center gap-2 transition ${
          action.style === "dark"
            ? "bg-[#181818] text-white hover:bg-black"
            : "border border-gray-200 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <ActionIcon size={14} strokeWidth={2} />
        {action.label}
      </button>
    </div>
  );
}
