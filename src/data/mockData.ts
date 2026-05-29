export type Habit = {
  id: number;
  name: string;
  status: "Done" | "Pending";
};

export type Reminder = {
  id: number;
  title: string;
  time: string;
  active: boolean;
};

export const dashboardStats = [
  { title: "Today's progress", value: "62%", helper: "Foundation habits are in motion" },
  { title: "Completed habits", value: "3", helper: "Workout, Coding, Reading" },
  { title: "Pending habits", value: "2", helper: "Business check and planning" },
  { title: "Current streak", value: "5 days", helper: "Keep the rhythm steady" },
];

export const habits: Habit[] = [
  { id: 1, name: "Workout", status: "Done" },
  { id: 2, name: "Coding", status: "Done" },
  { id: 3, name: "Reading", status: "Done" },
  { id: 4, name: "Business check", status: "Pending" },
  { id: 5, name: "Daily planning", status: "Pending" },
];

export const reminders: Reminder[] = [
  { id: 1, title: "Drink water", time: "09:30 AM", active: true },
  { id: 2, title: "Deep work block", time: "11:00 AM", active: true },
  { id: 3, title: "Evening review", time: "08:30 PM", active: false },
];
