import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

type HabitCategory = "Fitness" | "Work" | "Learning" | "Health" | "Personal";
type HabitFrequency = "Daily" | "Weekdays" | "Weekly";
type HabitStatus = "Done" | "Pending";

interface Habit {
  id: number;
  name: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  reminderTime: string;
  status: HabitStatus;
  streak: number;
}

const categories: HabitCategory[] = ["Fitness", "Work", "Learning", "Health", "Personal"];
const frequencies: HabitFrequency[] = ["Daily", "Weekdays", "Weekly"];

const initialHabits: Habit[] = [
  {
    id: 1,
    name: "Workout",
    category: "Fitness",
    frequency: "Daily",
    reminderTime: "07:00",
    status: "Pending",
    streak: 4,
  },
  {
    id: 2,
    name: "Code for 1 hour",
    category: "Work",
    frequency: "Daily",
    reminderTime: "20:00",
    status: "Done",
    streak: 8,
  },
  {
    id: 3,
    name: "Read 10 pages",
    category: "Learning",
    frequency: "Daily",
    reminderTime: "22:00",
    status: "Pending",
    streak: 2,
  },
];

const emptyForm = {
  name: "",
  category: "Fitness" as HabitCategory,
  frequency: "Daily" as HabitFrequency,
  reminderTime: "08:00",
};

function Habits() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) =>
      habit.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );
  }, [habits, searchTerm]);

  function handleSaveHabit() {
    const habitName = formData.name.trim();

    if (!habitName) {
      return;
    }

    const newHabit: Habit = {
      id: Date.now(),
      name: habitName,
      category: formData.category,
      frequency: formData.frequency,
      reminderTime: formData.reminderTime,
      status: "Pending",
      streak: 0,
    };

    setHabits((currentHabits) => [newHabit, ...currentHabits]);
    setFormData(emptyForm);
    setIsAddingHabit(false);
  }

  function handleCancel() {
    setFormData(emptyForm);
    setIsAddingHabit(false);
  }

  function handleMarkDone(id: number) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              status: "Done",
              streak: habit.status === "Done" ? habit.streak : habit.streak + 1,
            }
          : habit,
      ),
    );
  }

  function handleDeleteHabit(id: number) {
    setHabits((currentHabits) => currentHabits.filter((habit) => habit.id !== id));
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Growth Tasks"
          description="Track your daily routines and build consistency."
        />

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => setIsAddingHabit(true)}
            className="rounded-lg bg-core-accent px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Add Habit
          </button>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search habit"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-core-ink outline-none transition placeholder:text-slate-400 focus:border-core-accent focus:ring-2 focus:ring-blue-100 sm:w-72"
          />
        </div>
      </div>

      {isAddingHabit && (
        <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-core-ink">Add new habit</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-core-muted">Habit name</span>
              <input
                type="text"
                value={formData.name}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    name: event.target.value,
                  }))
                }
                placeholder="Morning walk"
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-core-muted">Category</span>
              <select
                value={formData.category}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    category: event.target.value as HabitCategory,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-core-muted">Frequency</span>
              <select
                value={formData.frequency}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    frequency: event.target.value as HabitFrequency,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
              >
                {frequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-core-muted">Reminder time</span>
              <input
                type="time"
                value={formData.reminderTime}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    reminderTime: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSaveHabit}
              className="rounded-lg bg-core-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Save Habit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-core-muted transition hover:border-slate-300 hover:text-core-ink"
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      <section className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
        {filteredHabits.map((habit) => (
          <article
            key={habit.id}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-core-ink">{habit.name}</h2>
                <p className="mt-1 text-sm text-core-muted">{habit.category}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  habit.status === "Done"
                    ? "bg-green-50 text-core-success"
                    : "bg-amber-50 text-core-warning"
                }`}
              >
                {habit.status}
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium text-core-muted">Frequency</dt>
                <dd className="mt-1 font-semibold text-core-ink">{habit.frequency}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium text-core-muted">Reminder</dt>
                <dd className="mt-1 font-semibold text-core-ink">{habit.reminderTime}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium text-core-muted">Streak</dt>
                <dd className="mt-1 font-semibold text-core-ink">{habit.streak} days</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleMarkDone(habit.id)}
                className="rounded-lg bg-core-ink px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={habit.status === "Done"}
              >
                Mark Done
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-core-muted transition hover:border-slate-300 hover:text-core-ink"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteHabit(habit.id)}
                className="rounded-lg border border-red-100 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>

      {filteredHabits.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-core-muted">
          No habits found.
        </div>
      )}
    </div>
  );
}

export default Habits;
