import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

type ReminderCategory = "Fitness" | "Work" | "Learning" | "Health" | "Personal" | "Business";
type ReminderRepeat = "None" | "Daily" | "Weekdays" | "Weekly" | "Monthly";
type StatusFilter = "All" | "Active" | "Inactive";

interface Reminder {
  id: number;
  title: string;
  message: string;
  category: ReminderCategory;
  date: string;
  time: string;
  repeat: ReminderRepeat;
  isActive: boolean;
}

const categories: ReminderCategory[] = [
  "Fitness",
  "Work",
  "Learning",
  "Health",
  "Personal",
  "Business",
];
const repeatOptions: ReminderRepeat[] = ["None", "Daily", "Weekdays", "Weekly", "Monthly"];
const statusOptions: StatusFilter[] = ["All", "Active", "Inactive"];

const initialReminders: Reminder[] = [
  {
    id: 1,
    title: "Workout Check",
    message: "Have you completed your workout today?",
    category: "Fitness",
    date: "2026-05-29",
    time: "07:00",
    repeat: "Daily",
    isActive: true,
  },
  {
    id: 2,
    title: "Coding Session",
    message: "Code for at least one focused hour.",
    category: "Work",
    date: "2026-05-29",
    time: "20:00",
    repeat: "Daily",
    isActive: true,
  },
  {
    id: 3,
    title: "Daily Planning",
    message: "Plan tomorrow before sleeping.",
    category: "Personal",
    date: "2026-05-29",
    time: "22:00",
    repeat: "Daily",
    isActive: false,
  },
];

const emptyForm = {
  title: "",
  message: "",
  category: "Personal" as ReminderCategory,
  date: "2026-05-29",
  time: "09:00",
  repeat: "None" as ReminderRepeat,
  isActive: true,
};

function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const filteredReminders = useMemo(() => {
    return reminders.filter((reminder) => {
      const matchesSearch = reminder.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && reminder.isActive) ||
        (statusFilter === "Inactive" && !reminder.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [reminders, searchTerm, statusFilter]);

  function handleSaveReminder() {
    const reminderTitle = formData.title.trim();

    if (!reminderTitle) {
      return;
    }

    const newReminder: Reminder = {
      id: Date.now(),
      title: reminderTitle,
      message: formData.message.trim(),
      category: formData.category,
      date: formData.date,
      time: formData.time,
      repeat: formData.repeat,
      isActive: formData.isActive,
    };

    setReminders((currentReminders) => [newReminder, ...currentReminders]);
    setFormData(emptyForm);
    setIsAddingReminder(false);
  }

  function handleCancel() {
    setFormData(emptyForm);
    setIsAddingReminder(false);
  }

  function handleToggleReminder(id: number) {
    setReminders((currentReminders) =>
      currentReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder,
      ),
    );
  }

  function handleDeleteReminder(id: number) {
    setReminders((currentReminders) =>
      currentReminders.filter((reminder) => reminder.id !== id),
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Reminders"
          description="Create personal reminders to stay consistent with your goals."
        />

        <div className="flex w-full flex-col gap-3 lg:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => setIsAddingReminder(true)}
            className="rounded-lg bg-core-accent px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Add Reminder
          </button>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search reminder"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-core-ink outline-none transition placeholder:text-slate-400 focus:border-core-accent focus:ring-2 focus:ring-blue-100 sm:w-72"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-core-muted outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isAddingReminder && (
        <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-core-ink">Add new reminder</h2>
              <p className="mt-1 text-sm text-core-muted">
                Set a simple local reminder plan. Notifications can be added later.
              </p>
            </div>

            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-core-muted">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    isActive: event.target.checked,
                  }))
                }
                className="h-4 w-4 accent-blue-600"
              />
              Active
            </label>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-core-muted">Reminder title</span>
              <input
                type="text"
                value={formData.title}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    title: event.target.value,
                  }))
                }
                placeholder="Evening review"
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
                    category: event.target.value as ReminderCategory,
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
              <span className="text-sm font-medium text-core-muted">Repeat</span>
              <select
                value={formData.repeat}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    repeat: event.target.value as ReminderRepeat,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
              >
                {repeatOptions.map((repeat) => (
                  <option key={repeat} value={repeat}>
                    {repeat}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-core-muted">Reminder date</span>
              <input
                type="date"
                value={formData.date}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    date: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-core-muted">Reminder time</span>
              <input
                type="time"
                value={formData.time}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    time: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block md:col-span-2 lg:col-span-3">
              <span className="text-sm font-medium text-core-muted">Reminder message</span>
              <textarea
                value={formData.message}
                onChange={(event) =>
                  setFormData((currentForm) => ({
                    ...currentForm,
                    message: event.target.value,
                  }))
                }
                placeholder="Write the reminder message..."
                className="mt-2 min-h-24 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm leading-6 outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSaveReminder}
              className="rounded-lg bg-core-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Save Reminder
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
        {filteredReminders.map((reminder) => (
          <article
            key={reminder.id}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-core-accent">{reminder.category}</p>
                <h2 className="mt-1 text-lg font-semibold text-core-ink">{reminder.title}</h2>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  reminder.isActive
                    ? "bg-green-50 text-core-success"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {reminder.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <p className="mt-4 min-h-12 text-sm leading-6 text-core-muted">
              {reminder.message || "No message added."}
            </p>

            <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium text-core-muted">Date</dt>
                <dd className="mt-1 font-semibold text-core-ink">{reminder.date}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium text-core-muted">Time</dt>
                <dd className="mt-1 font-semibold text-core-ink">{reminder.time}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium text-core-muted">Repeat</dt>
                <dd className="mt-1 font-semibold text-core-ink">{reminder.repeat}</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleToggleReminder(reminder.id)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  reminder.isActive
                    ? "bg-slate-100 text-core-muted hover:bg-slate-200 hover:text-core-ink"
                    : "bg-core-ink text-white hover:bg-slate-700"
                }`}
              >
                Mark {reminder.isActive ? "Inactive" : "Active"}
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-core-muted transition hover:border-slate-300 hover:text-core-ink"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteReminder(reminder.id)}
                className="rounded-lg border border-red-100 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>

      {filteredReminders.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-core-ink">No reminders found</h2>
          <p className="mt-2 text-sm text-core-muted">
            Try a different search term or status filter.
          </p>
        </div>
      )}
    </div>
  );
}

export default Reminders;
