import { useMemo, useState } from "react";
import {
  format,
  isToday,
  isSameDay,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  getHours,
  getMinutes,
  parseISO,
} from "date-fns";
import { Globe, Camera, Music2, Clock } from "lucide-react";

const platformIcons = {
  facebook: Globe,
  instagram: Camera,
  tiktok: Music2,
};

const statusStyle = {
  scheduled: "bg-white/60",
  published: "bg-emerald-50",
  failed: "bg-red-50",
  draft: "bg-gray-100",
};

function PostChip({ post }) {
  const platforms = post.platformContent.map((p) => p.platform);
  const caption = post.platformContent[0]?.content ?? "";
  const time = post.scheduledTime
    ? format(parseISO(post.scheduledTime), "h:mm a")
    : "Draft";

  return (
    <div
      className={`rounded-2xl px-3 py-2.5 ${statusStyle[post.status] || "bg-white/60"}`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        {platforms.map((p) => {
          const Icon = platformIcons[p];
          return Icon ? (
            <Icon key={p} size={12} strokeWidth={2} className="text-gray-500" />
          ) : null;
        })}
        <span className="text-[10px] text-gray-500 ml-auto">{time}</span>
      </div>
      <p className="text-[12.5px] text-gray-800 line-clamp-2">{caption}</p>
      {post.status === "failed" && (
        <p className="text-[10.5px] text-red-600 mt-1">Failed — retry needed</p>
      )}
    </div>
  );
}

// Bucket posts into hour slots for "today"
function useTodaySchedule(posts, today) {
  return useMemo(() => {
    const todays = posts
      .filter((p) => p.scheduledTime && isSameDay(parseISO(p.scheduledTime), today))
      .sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));

    const buckets = {};
    todays.forEach((post) => {
      const d = parseISO(post.scheduledTime);
      const hourKey = getHours(d) + (getMinutes(d) >= 30 ? 0.5 : 0);
      if (!buckets[hourKey]) buckets[hourKey] = [];
      buckets[hourKey].push(post);
    });

    return Object.keys(buckets)
      .sort((a, b) => a - b)
      .map((hourKey) => ({
        label: format(
          new Date().setHours(Math.floor(hourKey), hourKey % 1 ? 30 : 0),
          "h:mm a"
        ),
        posts: buckets[hourKey],
      }));
  }, [posts, today]);
}

// Bucket posts into days for "this week"
function useWeekSchedule(posts, today) {
  return useMemo(() => {
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });

    return days.map((day) => ({
      day,
      posts: posts
        .filter(
          (p) =>
            p.scheduledTime &&
            isWithinInterval(parseISO(p.scheduledTime), { start, end }) &&
            isSameDay(parseISO(p.scheduledTime), day)
        )
        .sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime)),
    }));
  }, [posts, today]);
}

export default function ScheduleColumn({ posts }) {
  const [view, setView] = useState("today"); // "today" | "week"
  // Computed fresh on every mount/render — no stale "today" ever gets baked in,
  // so this naturally rolls over at midnight the next time the app is open.
  const today = new Date();
  const todaySchedule = useTodaySchedule(posts, today);
  const weekSchedule = useWeekSchedule(posts, today);

  return (
    <div className="rounded-3xl bg-white/70 border border-white/60 p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[15px] font-semibold text-gray-900">Schedule</h3>

        <div className="flex items-center bg-white/60 rounded-full p-1">
          {["today", "week"].map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-3 py-1 rounded-full text-[11.5px] font-medium capitalize transition ${
                view === mode
                  ? "bg-[#181818] text-white"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              {mode === "today" ? "Today" : "This week"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[12px] text-gray-500 mb-4">
        {format(today, "EEEE, d MMM")}
      </p>

      {/* Body */}
      <div className="flex-1 overflow-auto flex flex-col gap-3">
        {view === "today" ? (
          todaySchedule.length === 0 ? (
            <EmptyState label="Nothing scheduled today" />
          ) : (
            todaySchedule.map(({ label, posts }) => (
              <div key={label} className="flex gap-3">
                <div className="w-14 shrink-0 pt-2.5 text-[11px] text-gray-400 flex items-start gap-1">
                  <Clock size={11} className="mt-0.5" />
                  {label}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  {posts.map((post) => (
                    <PostChip key={post.id} post={post} />
                  ))}
                </div>
              </div>
            ))
          )
        ) : weekSchedule.every((d) => d.posts.length === 0) ? (
          <EmptyState label="Nothing scheduled this week" />
        ) : (
          weekSchedule.map(({ day, posts }) => (
            <div key={day.toISOString()} className="flex gap-3">
              <div className="w-14 shrink-0 pt-2.5 text-[11px] text-gray-400">
                <div className={isToday(day) ? "text-[#181818] font-semibold" : ""}>
                  {format(day, "EEE")}
                </div>
                <div>{format(day, "d MMM")}</div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {posts.length === 0 ? (
                  <div className="text-[11px] text-gray-300 pt-2.5">—</div>
                ) : (
                  posts.map((post) => <PostChip key={post.id} post={post} />)
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="flex-1 flex items-center justify-center text-[12.5px] text-gray-400 py-10">
      {label}
    </div>
  );
}