import { useMemo, useState } from "react";

interface StatCard {
  id: number;
  label: string;
  value: string;
  helper: string;
  icon: string;
}

interface FocusItem {
  id: number;
  name: string;
  category: string;
  status: "Done" | "Pending";
}

interface ReminderItem {
  id: number;
  title: string;
  time: string;
}

interface WeeklyProgressItem {
  id: number;
  label: string;
  percent: number;
}

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

const fallbackQuotes = [
  {
    quote: "Small actions repeated daily become identity.",
    author: "PersonalCore",
  },
  {
    quote: "Discipline is choosing what matters over what is easy.",
    author: "PersonalCore",
  },
  {
    quote: "Win the day before the day controls you.",
    author: "PersonalCore",
  },
  {
    quote: "Progress is built in quiet, repeated effort.",
    author: "PersonalCore",
  },
];

const stats: StatCard[] = [
  {
    id: 1,
    label: "Today's Progress",
    value: "68%",
    helper: "A steady day in motion",
    icon: "↗",
  },
  {
    id: 2,
    label: "Completed Routines",
    value: "4/6",
    helper: "Two routines left today",
    icon: "✓",
  },
  {
    id: 3,
    label: "Active Reminders",
    value: "5",
    helper: "Next reminder at 7:00 AM",
    icon: "•",
  },
  {
    id: 4,
    label: "Current Streak",
    value: "8 days",
    helper: "Consistency is compounding",
    icon: "∞",
  },
];

const initialFocusItems: FocusItem[] = [
  { id: 1, name: "Workout", category: "Fitness", status: "Pending" },
  { id: 2, name: "Code for 1 hour", category: "Work", status: "Done" },
  { id: 3, name: "Daily planning", category: "Personal", status: "Pending" },
];

const reminders: ReminderItem[] = [
  { id: 1, title: "Workout Check", time: "7:00 AM" },
  { id: 2, title: "Coding Session", time: "8:00 PM" },
  { id: 3, title: "Plan Tomorrow", time: "10:00 PM" },
];

const weeklyProgress: WeeklyProgressItem[] = [
  { id: 1, label: "Routines", percent: 78 },
  { id: 2, label: "Check-ins", percent: 85 },
  { id: 3, label: "Focus Time", percent: 62 },
];

const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

function Dashboard() {
  const [focusItems, setFocusItems] = useState<FocusItem[]>(initialFocusItems);
  const [todayQuote, setTodayQuote] = useState<QuoteState>({
    quote: fallbackQuotes[0].quote,
    author: fallbackQuotes[0].author,
    loading: false,
    error: "",
  });

  const completedCount = useMemo(() => {
    return focusItems.filter((item) => item.status === "Done").length;
  }, [focusItems]);

  function toggleFocusItem(id: number) {
    setFocusItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Done" ? "Pending" : "Done" }
          : item,
      ),
    );
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
                  {completedCount} of {focusItems.length} focus routines completed.
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-core-accent">
                Today
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {focusItems.map((item) => {
                const isDone = item.status === "Done";

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => toggleFocusItem(item.id)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition ${
                          isDone
                            ? "border-core-success bg-green-50 text-core-success"
                            : "border-slate-300 bg-white text-slate-400 hover:border-core-accent hover:text-core-accent"
                        }`}
                        aria-label={`Mark ${item.name} ${isDone ? "pending" : "done"}`}
                      >
                        {isDone ? "✓" : ""}
                      </button>
                      <div>
                        <h3 className="font-semibold text-core-ink">{item.name}</h3>
                        <p className="mt-1 text-sm text-core-muted">{item.category}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFocusItem(item.id)}
                      className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                        isDone
                          ? "bg-green-50 text-core-success hover:bg-green-100"
                          : "bg-amber-50 text-core-warning hover:bg-amber-100"
                      }`}
                    >
                      {item.status}
                    </button>
                  </div>
                );
              })}
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
              {weeklyProgress.map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-core-ink">{item.label}</span>
                    <span className="text-sm font-bold text-core-accent">{item.percent}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-core-accent"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-core-ink">Today&apos;s Check-in</h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Metric label="Mood" value="Good" highlight />
              <Metric label="Energy" value="Medium" />
              <Metric label="Productivity" value="4/5" />
            </div>
            <button
              type="button"
              className="mt-5 w-full rounded-lg bg-core-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Open Check-in
            </button>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-core-ink">Upcoming Reminders</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-core-muted">
                3 today
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-core-ink">{reminder.title}</p>
                  <p className="text-sm font-bold text-core-accent">{reminder.time}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-core-accent">
              Today&apos;s Message
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-core-ink">
              {todayQuote.quote}
            </h2>
            <p className="mt-3 text-sm font-semibold text-core-muted">— {todayQuote.author}</p>
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
