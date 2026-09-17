import { useMemo, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const statusDot = {
  scheduled: "bg-gray-400",
  published: "bg-emerald-500",
  failed: "bg-red-500",
  draft: "bg-gray-300",
};

function postsByDay(posts, day) {
  return posts.filter(
    (p) => p.scheduledTime && isSameDay(parseISO(p.scheduledTime), day),
  );
}

// --- Month view: full weeks grid, current-month days highlighted ---
function MonthGrid({ posts, cursor, onSelectPost }) {
  const monthStart = startOfMonth(cursor);
  const monthEnd = endOfMonth(cursor);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
        <div key={d} className="text-[11px] text-gray-400 text-center pb-1">
          {d}
        </div>
      ))}

      {days.map((day) => {
        const dayPosts = postsByDay(posts, day);
        const inMonth = isSameMonth(day, cursor);

        return (
          <div
            key={day.toISOString()}
            className={`rounded-xl p-1.5 min-h-20 flex flex-col gap-1 ${
              inMonth ? "bg-white/60" : "bg-white/20"
            }`}
          >
            <span
              className={`text-[11px] w-5 h-5 flex items-center justify-center rounded-full ${
                isToday(day)
                  ? "bg-[#181818] text-white"
                  : inMonth
                    ? "text-gray-700"
                    : "text-gray-300"
              }`}
            >
              {format(day, "d")}
            </span>

            <div className="flex flex-col gap-0.5">
              {dayPosts.slice(0, 3).map((post) => (
                <button
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="flex items-center gap-1 text-[10px] text-gray-600 truncate hover:underline"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      statusDot[post.status] || statusDot.scheduled
                    }`}
                  />
                  <span className="truncate">
                    {post.platformContent[0]?.content ?? ""}
                  </span>
                </button>
              ))}
              {dayPosts.length > 3 && (
                <span className="text-[10px] text-gray-400">
                  +{dayPosts.length - 3} more
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Week view: one column per day, taller post cards ---
function WeekGrid({ posts, cursor, onSelectPost }) {
  const start = startOfWeek(cursor, { weekStartsOn: 1 });
  const end = endOfWeek(cursor, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const dayPosts = postsByDay(posts, day);

        return (
          <div key={day.toISOString()} className="flex flex-col gap-2">
            <div className="text-center">
              <div className="text-[11px] text-gray-400">
                {format(day, "EEE")}
              </div>
              <span
                className={`text-[12px] w-6 h-6 mx-auto flex items-center justify-center rounded-full ${
                  isToday(day) ? "bg-[#181818] text-white" : "text-gray-700"
                }`}
              >
                {format(day, "d")}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 min-h-24">
              {dayPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="text-left rounded-xl bg-white/60 hover:bg-white/90 p-2 transition"
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        statusDot[post.status] || statusDot.scheduled
                      }`}
                    />
                    <span className="text-[10px] text-gray-400">
                      {format(parseISO(post.scheduledTime), "h:mm a")}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-700 line-clamp-2">
                    {post.platformContent[0]?.content ?? ""}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CalendarView({ posts, onSelectPost = () => {} }) {
  const [view, setView] = useState("month"); // "month" | "week"
  const [cursor, setCursor] = useState(new Date());

  const title = useMemo(
    () =>
      view === "month"
        ? format(cursor, "MMMM yyyy")
        : `${format(startOfWeek(cursor, { weekStartsOn: 1 }), "d MMM")} – ${format(
            endOfWeek(cursor, { weekStartsOn: 1 }),
            "d MMM",
          )}`,
    [view, cursor],
  );

  function goPrev() {
    setCursor((c) => (view === "month" ? subMonths(c, 1) : subWeeks(c, 1)));
  }
  function goNext() {
    setCursor((c) => (view === "month" ? addMonths(c, 1) : addWeeks(c, 1)));
  }

  return (
    <div className="rounded-3xl bg-white/70 border border-white/60 p-5">
      {/* Header: nav + title on left, Weekly/Monthly toggle top-right */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/60 text-gray-600"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[14px] font-semibold text-gray-900 w-40">
            {title}
          </span>
          <button
            onClick={goNext}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/60 text-gray-600"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Weekly / Monthly toggle */}
        <div className="flex items-center bg-white/60 rounded-full p-1">
          {["week", "month"].map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-3 py-1 rounded-full text-[11.5px] font-medium capitalize transition ${
                view === mode
                  ? "bg-[#181818] text-white"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              {mode === "week" ? "Weekly" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      {view === "month" ? (
        <MonthGrid posts={posts} cursor={cursor} onSelectPost={onSelectPost} />
      ) : (
        <WeekGrid posts={posts} cursor={cursor} onSelectPost={onSelectPost} />
      )}
    </div>
  );
}
