import { useMemo, useState } from "react";
import type { PageKey } from "../components/Sidebar";
import { useAppContext } from "../context/AppContext";

interface QuoteState {
  quote: string;
  author: string;
  loading: boolean;
  error: string;
}

interface ZenQuoteResponse {
  q: string;
  a: string;
}

type DashboardProps = {
  onNavigate: (page: PageKey) => void;
};

const fallbackQuotes = [
  {
    quote: "Small actions repeated daily become identity.",
    author: "XurdeCore",
  },
  {
    quote: "Discipline is choosing what matters over what is easy.",
    author: "XurdeCore",
  },
  {
    quote: "Win the day before the day controls you.",
    author: "XurdeCore",
  },
  {
    quote: "Progress is built in quiet, repeated effort.",
    author: "XurdeCore",
  },
];

const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

function formatTime(time: string) {
  if (!time) {
    return "";
  }

  const [hour = 0, minute = 0] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function Dashboard({ onNavigate }: DashboardProps) {
  const {
    state: { routines, reminders, checkIns },
    dispatch,
  } = useAppContext();
  const [todayQuote, setTodayQuote] = useState<QuoteState>({
    quote: fallbackQuotes[0].quote,
    author: fallbackQuotes[0].author,
    loading: false,
    error: "",
  });

  const completedCount = useMemo(() => {
    return routines.filter((routine) => routine.status === "Done").length;
  }, [routines]);

  const activeReminders = useMemo(() => {
    return reminders.filter((reminder) => reminder.isActive);
  }, [reminders]);

  const upcomingReminders = useMemo(() => {
    return [...activeReminders].sort((a, b) => a.time.localeCompare(b.time));
  }, [activeReminders]);

  const progressPercent =
    routines.length > 0 ? Math.round((completedCount / routines.length) * 100) : 0;

  const highestStreak = routines.reduce(
    (highest, routine) => Math.max(highest, routine.streak),
    0,
  );

  const todayCheckIn = checkIns.find((checkIn) => checkIn.date === currentDate);

  const stats = [
    {
      id: 1,
      label: "Today's Progress",
      value: `${progressPercent}%`,
      helper:
        routines.length > 0
          ? `${completedCount} of ${routines.length} routines completed`
          : "Add a routine to start tracking progress",
      icon: "↗",
    },
    {
      id: 2,
      label: "Completed Routines",
      value: `${completedCount}/${routines.length}`,
      helper: routines.length > 0 ? "Shared routine data" : "No routines yet",
      icon: "✓",
    },
    {
      id: 3,
      label: "Active Reminders",
      value: String(activeReminders.length),
      helper:
        upcomingReminders.length > 0
          ? `Next reminder at ${formatTime(upcomingReminders[0].time)}`
          : "No active reminders",
      icon: "•",
    },
    {
      id: 4,
      label: "Current Streak",
      value: `${highestStreak} days`,
      helper: "Highest routine streak",
      icon: "∞",
    },
  ];

  function toggleRoutineStatus(id: string) {
    dispatch({ type: "TOGGLE_ROUTINE_STATUS", payload: { id } });
  }

  function getRandomFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  }

  async function handleChangeTone() {
    setTodayQuote((currentQuote) => ({
      ...currentQuote,
      loading: true,
      error: "",
    }));

    try {
      const response = await fetch("https://zenquotes.io/api/random");

      if (!response.ok) {
        throw new Error("Quote service unavailable.");
      }

      const data = (await response.json()) as ZenQuoteResponse[];
      const randomQuote = data[0];

      if (!randomQuote?.q || !randomQuote?.a) {
        throw new Error("Quote response was not valid.");
      }

      setTodayQuote({
        quote: randomQuote.q,
        author: randomQuote.a,
        loading: false,
        error: "",
      });
    } catch {
      const fallbackQuote = getRandomFallbackQuote();

      setTodayQuote({
        quote: fallbackQuote.quote,
        author: fallbackQuote.author,
        loading: false,
        error: "Showing a local quote because the online quote could not be loaded.",
      });
    }
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-core-accent">
            {currentDate}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-core-ink">Dashboard</h1>
          <p className="mt-3 text-base leading-7 text-core-muted">
            Welcome back. Let&apos;s keep today focused.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("habits")}
          className="rounded-lg bg-core-accent px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Add Routine
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-core-muted">{stat.label}</p>
                <h2 className="mt-3 text-3xl font-bold text-core-ink">{stat.value}</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-core-accent">
                {stat.icon}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-core-muted">{stat.helper}</p>
          </article>
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-core-ink">Today&apos;s Focus</h2>
                <p className="mt-2 text-sm text-core-muted">
                  {completedCount} of {routines.length} focus routines completed.
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-core-accent">
                Today
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {routines.map((routine) => {
                const isDone = routine.status === "Done";

                return (
                  <div
                    key={routine.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => toggleRoutineStatus(routine.id)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition ${
                          isDone
                            ? "border-core-success bg-green-50 text-core-success"
                            : "border-slate-300 bg-white text-slate-400 hover:border-core-accent hover:text-core-accent"
                        }`}
                        aria-label={`Mark ${routine.name} ${isDone ? "pending" : "done"}`}
                      >
                        {isDone ? "✓" : ""}
                      </button>
                      <div>
                        <h3 className="font-semibold text-core-ink">{routine.name}</h3>
                        <p className="mt-1 text-sm text-core-muted">{routine.category}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRoutineStatus(routine.id)}
                      className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                        isDone
                          ? "bg-green-50 text-core-success hover:bg-green-100"
                          : "bg-amber-50 text-core-warning hover:bg-amber-100"
                      }`}
                    >
                      {routine.status}
                    </button>
                  </div>
                );
              })}

              {routines.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-core-muted">
                  No routines yet. Add one to build today&apos;s focus list.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-core-ink">Weekly Progress</h2>
                <p className="mt-2 text-sm text-core-muted">
                  A simple view of the systems you are building.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <ProgressBar label="Routines" percent={progressPercent} />
              <ProgressBar
                label="Check-ins"
                percent={Math.min(100, Math.round((checkIns.length / 7) * 100))}
              />
              <ProgressBar
                label="Active reminders"
                percent={
                  reminders.length > 0
                    ? Math.round((activeReminders.length / reminders.length) * 100)
                    : 0
                }
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-core-ink">Today&apos;s Check-in</h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Metric label="Mood" value={todayCheckIn?.mood ?? "Not set"} highlight />
              <Metric label="Energy" value={todayCheckIn?.energy ?? "Not set"} />
              <Metric
                label="Productivity"
                value={todayCheckIn ? `${todayCheckIn.productivity}/5` : "Not set"}
              />
            </div>
            <button
              type="button"
              onClick={() => onNavigate("checkIn")}
              className="mt-5 w-full rounded-lg bg-core-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Open Check-in
            </button>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-core-ink">Upcoming Reminders</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-core-muted">
                {upcomingReminders.length} active
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {upcomingReminders.slice(0, 4).map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-core-ink">{reminder.title}</p>
                  <p className="text-sm font-bold text-core-accent">{formatTime(reminder.time)}</p>
                </div>
              ))}

              {upcomingReminders.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-core-muted">
                  No active reminders.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-core-accent">
              Today&apos;s Message
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-core-ink">
              {todayQuote.quote}
            </h2>
            <p className="mt-3 text-sm font-semibold text-core-muted">- {todayQuote.author}</p>
            {todayQuote.error && (
              <p className="mt-3 rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs font-medium text-core-muted">
                {todayQuote.error}
              </p>
            )}
            <button
              type="button"
              onClick={handleChangeTone}
              disabled={todayQuote.loading}
              className="mt-5 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-core-accent transition hover:border-core-accent"
            >
              {todayQuote.loading ? "Loading..." : "Change Tone"}
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}

type ProgressBarProps = {
  label: string;
  percent: number;
};

function ProgressBar({ label, percent }: ProgressBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-core-ink">{label}</span>
        <span className="text-sm font-bold text-core-accent">{percent}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-core-accent" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function Metric({ label, value, highlight = false }: MetricProps) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-blue-50" : "bg-slate-50"}`}>
      <p className="text-xs font-semibold text-core-muted">{label}</p>
      <p className={`mt-1 font-bold ${highlight ? "text-core-accent" : "text-core-ink"}`}>
        {value}
      </p>
    </div>
  );
}

export default Dashboard;
