import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { X, Globe, Camera, Music2, CalendarClock } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const platformMeta = {
  facebook: { label: "Facebook", icon: Globe },
  instagram: { label: "Instagram", icon: Camera },
  tiktok: { label: "TikTok", icon: Music2 },
  youtube: { label: "Youtube", icon: FaYoutube },
};

// Builds a fresh, blank form — pulled out so "Reset" and "initial state"
// aren't two different sources of truth for what an empty form looks like.
function emptyForm() {
  return { caption: "", platforms: [], date: "", time: "" };
}

export default function NewPostModal({ open, onClose, onCreate, connections }) {
  const [form, setForm] = useState(emptyForm);

  if (!open) return null;

  function togglePlatform(platform) {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(platform)
        ? f.platforms.filter((p) => p !== platform)
        : [...f.platforms, platform],
    }));
  }

  function buildPost(status) {
    const scheduledTime =
      status === "draft"
        ? null
        : form.date && form.time
          ? `${form.date}T${form.time}:00`
          : null;

    return {
      id: uuidv4(),
      platformContent: form.platforms.map((platform) => ({
        platform,
        content: form.caption,
        mediaUrls: [],
      })),
      tags: [],
      scheduledTime,
      status,
      createdAt: new Date().toISOString(),
    };
  }

  function handleSubmit(status) {
    if (!form.caption.trim() || form.platforms.length === 0) return;
    if (status === "scheduled" && (!form.date || !form.time)) return;

    onCreate(buildPost(status));
    setForm(emptyForm());
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-semibold text-gray-900">New Post</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={16} />
          </button>
        </div>

        {/* Platform picker */}
        <div className="flex gap-2 mb-4">
          {connections.map((conn) => {
            const meta = platformMeta[conn.platform];
            if (!meta) return null;
            const Icon = meta.icon;
            const active = form.platforms.includes(conn.platform);
            const disabled = !conn.connected || conn.failed;

            return (
              <button
                key={conn.id}
                disabled={disabled}
                onClick={() => togglePlatform(conn.platform)}
                title={disabled ? "Reconnect this platform first" : meta.label}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-medium border transition
                  ${
                    disabled
                      ? "opacity-40 cursor-not-allowed border-gray-200 text-gray-400"
                      : active
                        ? "bg-[#181818] text-white border-[#181818]"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Icon size={13} strokeWidth={2} />
                {meta.label}
              </button>
            );
          })}
        </div>

        {/* Caption */}
        <textarea
          value={form.caption}
          onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
          placeholder="What do you want to share?"
          rows={4}
          className="w-full resize-none rounded-2xl border border-gray-200 p-3 text-[13.5px] outline-none focus:border-gray-400 mb-4"
        />

        {/* Date & time */}
        <div className="flex items-center gap-2 mb-1">
          <CalendarClock size={14} className="text-gray-400" />
          <span className="text-[12px] text-gray-500">Schedule for</span>
        </div>
        <div className="flex gap-2 mb-5">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-[12.5px] outline-none focus:border-gray-400"
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-[12.5px] outline-none focus:border-gray-400"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => handleSubmit("draft")}
            className="flex-1 h-11 rounded-full border border-gray-200 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit("scheduled")}
            className="flex-1 h-11 rounded-full bg-[#181818] text-white text-[13px] font-medium hover:bg-black"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
