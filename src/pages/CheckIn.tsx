import { useState } from "react";
import { Bed, Flame, Frown, Laugh, Meh, Smile, type LucideIcon } from "lucide-react";

type Mood = "Low" | "Fine" | "Good" | "Great" | "Vibrant";
type Energy = "High" | "Medium" | "Low";
type Productivity = 1 | 2 | 3 | 4 | 5;

interface CheckInData {
  date: string;
  mood: Mood;
  energy: Energy;
  productivity: Productivity;
  notes: string;
  completedToday: string;
  delayedToday: string;
  improveTomorrow: string;
  gratefulFor: string;
}

const moods: Array<{ label: Mood; icon: LucideIcon }> = [
  { label: "Low", icon: Frown },
  { label: "Fine", icon: Meh },
  { label: "Good", icon: Smile },
  { label: "Great", icon: Laugh },
  { label: "Vibrant", icon: Flame },
];

const productivityScores: Productivity[] = [1, 2, 3, 4, 5];

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const initialCheckIn: CheckInData = {
  date: today,
  mood: "Good",
  energy: "Medium",
  productivity: 3,
  notes: "",
  completedToday: "",
  delayedToday: "",
  improveTomorrow: "",
  gratefulFor: "",
};

function getEnergyFromScore(score: number): Energy {
  if (score >= 7) {
    return "High";
  }

  if (score >= 4) {
    return "Medium";
  }

  return "Low";
}

function CheckIn() {
  const [checkInData, setCheckInData] = useState<CheckInData>(initialCheckIn);
  const [savedCheckIn, setSavedCheckIn] = useState<CheckInData | null>(null);
  const [energyScore, setEnergyScore] = useState(7);
  const [sleptWell, setSleptWell] = useState(true);

  function updateCheckIn<K extends keyof CheckInData>(field: K, value: CheckInData[K]) {
    setCheckInData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleEnergyChange(value: number) {
    setEnergyScore(value);
    updateCheckIn("energy", getEnergyFromScore(value));
  }

  function handleSaveCheckIn() {
    setSavedCheckIn(checkInData);
  }

  function handleReset() {
    setCheckInData(initialCheckIn);
    setSavedCheckIn(null);
    setEnergyScore(7);
    setSleptWell(true);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-normal text-core-ink">
          How are you feeling, Alex?
        </h1>
        <p className="mt-3 text-lg text-core-muted">
          Take a moment to reflect and tune into your inner state.
        </p>
      </header>

      <section className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-core-ink">Current Mood</h2>
          <p className="text-sm font-semibold text-core-muted">{checkInData.date}</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-5">
          {moods.map((mood) => {
            const Icon = mood.icon;

            return (
              <button
                key={mood.label}
                type="button"
                onClick={() => updateCheckIn("mood", mood.label)}
                className={`rounded-xl border px-4 py-5 text-center transition ${
                  checkInData.mood === mood.label
                    ? "border-core-accent bg-blue-100 text-core-accent shadow-sm"
                    : "border-slate-200 bg-white text-core-muted hover:border-core-accent hover:bg-blue-50"
                }`}
              >
                <Icon className="mx-auto h-8 w-8" strokeWidth={2.2} />
                <span className="mt-3 block text-sm font-bold">{mood.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-core-ink">Energy Level</h2>
            <span className="text-3xl font-bold text-core-accent">{energyScore}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={energyScore}
            onChange={(event) => handleEnergyChange(Number(event.target.value))}
            className="mt-6 h-2 w-full cursor-pointer accent-blue-600"
          />
          <div className="mt-3 flex justify-between text-xs font-bold text-core-muted">
            <span>Exhausted</span>
            <span>Hyper-focused</span>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Bed size={24} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-core-ink">Did you sleep well?</h3>
                <p className="mt-1 text-sm font-semibold text-core-muted">
                  Rest is the foundation of high performance.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSleptWell((currentValue) => !currentValue)}
              className={`flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition ${
                sleptWell ? "bg-core-accent" : "bg-slate-300"
              }`}
            >
              <span
                className={`h-6 w-6 rounded-full bg-white shadow transition ${
                  sleptWell ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <label className="mt-10 block">
          <span className="text-xl font-bold text-core-ink">What are you grateful for today?</span>
          <textarea
            value={checkInData.gratefulFor}
            onChange={(event) => updateCheckIn("gratefulFor", event.target.value)}
            placeholder="Writing down three things can shift your neurochemistry..."
            className="mt-4 min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-6 text-core-ink outline-none transition placeholder:text-slate-400 focus:border-core-accent focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <div className="mt-8 border-t border-slate-100 pt-7">
          <div className="mx-auto flex max-w-sm gap-3">
            <button
              type="button"
              onClick={handleSaveCheckIn}
              className="flex-1 rounded-xl bg-core-accent px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Save Check-in →
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-200 px-5 py-4 text-sm font-bold text-core-muted transition hover:border-slate-300 hover:text-core-ink"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-indigo-600">
            Performance Tip
          </p>
          <p className="mt-3 text-base leading-6 text-slate-700">
            High achievers use check-ins to identify patterns. Your energy peaks typically occur 3
            hours after waking.
          </p>
        </section>

        <section className="rounded-xl border border-purple-100 bg-purple-50 p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-purple-600">
            Daily Affirmation
          </p>
          <p className="mt-3 text-base leading-6 text-slate-700">
            "I am focused, resilient, and capable of navigating today's challenges with clarity."
          </p>
        </section>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-core-ink">Accountability Notes</h2>
          <p className="mt-2 text-sm text-core-muted">
            Capture the practical details behind today's check-in.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <QuestionField
              label="What did I complete today?"
              value={checkInData.completedToday}
              onChange={(value) => updateCheckIn("completedToday", value)}
            />
            <QuestionField
              label="What did I avoid or delay?"
              value={checkInData.delayedToday}
              onChange={(value) => updateCheckIn("delayedToday", value)}
            />
            <QuestionField
              label="What should I improve tomorrow?"
              value={checkInData.improveTomorrow}
              onChange={(value) => updateCheckIn("improveTomorrow", value)}
            />
            <QuestionField
              label="Daily notes"
              value={checkInData.notes}
              onChange={(value) => updateCheckIn("notes", value)}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-core-ink">Productivity Rating</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {productivityScores.map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => updateCheckIn("productivity", score)}
                  className={`h-11 w-11 rounded-lg border text-sm font-bold transition ${
                    checkInData.productivity === score
                      ? "border-core-accent bg-core-accent text-white"
                      : "border-slate-200 bg-white text-core-muted hover:border-core-accent hover:text-core-accent"
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-core-ink">Saved Preview</h2>

          {savedCheckIn ? (
            <div className="mt-5 space-y-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-core-muted">
                  Date
                </p>
                <p className="mt-1 font-semibold text-core-ink">{savedCheckIn.date}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Metric label="Mood" value={savedCheckIn.mood} highlight />
                <Metric label="Energy" value={savedCheckIn.energy} />
                <Metric label="Score" value={`${savedCheckIn.productivity}/5`} />
              </div>

              <PreviewSection label="Notes" value={savedCheckIn.notes} />
              <PreviewSection label="Completed today" value={savedCheckIn.completedToday} />
              <PreviewSection
                label="Improvement for tomorrow"
                value={savedCheckIn.improveTomorrow}
              />
            </div>
          ) : (
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-core-muted">
              Save your check-in to see a clean summary here.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

type QuestionFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function QuestionField({ label, value, onChange }: QuestionFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-core-muted">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-24 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-core-accent focus:bg-white focus:ring-2 focus:ring-blue-100"
      />
    </label>
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
      <p className="text-xs font-medium text-core-muted">{label}</p>
      <p className={`mt-1 font-bold ${highlight ? "text-core-accent" : "text-core-ink"}`}>
        {value}
      </p>
    </div>
  );
}

type PreviewSectionProps = {
  label: string;
  value: string;
};

function PreviewSection({ label, value }: PreviewSectionProps) {
  return (
    <div>
      <p className="text-sm font-bold text-core-ink">{label}</p>
      <p className="mt-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm leading-6 text-core-muted">
        {value || "No response added."}
      </p>
    </div>
  );
}

export default CheckIn;
