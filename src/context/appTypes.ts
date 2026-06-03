export type RoutineStatus = "Done" | "Pending";
export type AppTheme = "light" | "dark" | "system";
export type ReminderTone = "Friendly" | "Strict" | "Motivational" | "Minimal" | "Funny";

export type Routine = {
  id: string;
  name: string;
  category: string;
  frequency: string;
  reminderTime: string;
  status: RoutineStatus;
  streak: number;
  createdAt: string;
  updatedAt: string;
};

export type Reminder = {
  id: string;
  title: string;
  message: string;
  category: string;
  date: string;
  time: string;
  repeat: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CheckIn = {
  id: string;
  date: string;
  mood: string;
  energy: string;
  productivity: number;
  notes: string;
  completedToday: string;
  delayedToday: string;
  improveTomorrow: string;
  gratefulFor: string;
  createdAt: string;
  updatedAt: string;
};

export type AppSettings = {
  theme: AppTheme;
  accentColor: string;
  compactMode: boolean;
  notificationsEnabled: boolean;
  dailyCheckInTime: string;
  habitReminderTime: string;
  quietHoursStart: string;
  quietHoursEnd: string;
  weekendReminders: boolean;
  reminderTone: ReminderTone;
  customReminderMessage: string;
  dailyMotivationMessage: string;
  profileName: string;
  profileEmail: string;
  profileFocus: string;
};

export type AppState = {
  routines: Routine[];
  reminders: Reminder[];
  checkIns: CheckIn[];
  settings: AppSettings;
};

export type AppAction =
  | {
      type: "ADD_ROUTINE";
      payload: Omit<Routine, "id" | "createdAt" | "updatedAt">;
    }
  | {
      type: "UPDATE_ROUTINE";
      payload: { id: string; updates: Partial<Omit<Routine, "id" | "createdAt">> };
    }
  | { type: "DELETE_ROUTINE"; payload: { id: string } }
  | { type: "TOGGLE_ROUTINE_STATUS"; payload: { id: string } }
  | {
      type: "ADD_REMINDER";
      payload: Omit<Reminder, "id" | "createdAt" | "updatedAt">;
    }
  | {
      type: "UPDATE_REMINDER";
      payload: { id: string; updates: Partial<Omit<Reminder, "id" | "createdAt">> };
    }
  | { type: "DELETE_REMINDER"; payload: { id: string } }
  | { type: "TOGGLE_REMINDER_ACTIVE"; payload: { id: string } }
  | {
      type: "SAVE_CHECKIN";
      payload: Omit<CheckIn, "id" | "createdAt" | "updatedAt">;
    }
  | { type: "UPDATE_SETTINGS"; payload: Partial<AppSettings> }
  | { type: "RESET_APP_DATA" };

const now = "2026-05-31T00:00:00.000Z";

export const defaultAppState: AppState = {
  routines: [
    {
      id: "routine-workout",
      name: "Workout",
      category: "Fitness",
      frequency: "Daily",
      reminderTime: "07:00",
      status: "Pending",
      streak: 4,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "routine-coding",
      name: "Code for 1 hour",
      category: "Work",
      frequency: "Daily",
      reminderTime: "20:00",
      status: "Done",
      streak: 8,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "routine-reading",
      name: "Read 10 pages",
      category: "Learning",
      frequency: "Daily",
      reminderTime: "22:00",
      status: "Pending",
      streak: 2,
      createdAt: now,
      updatedAt: now,
    },
  ],
  reminders: [
    {
      id: "reminder-workout",
      title: "Workout Check",
      message: "Have you completed your workout today?",
      category: "Fitness",
      date: "2026-05-31",
      time: "07:00",
      repeat: "Daily",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "reminder-coding",
      title: "Coding Session",
      message: "Code for at least one focused hour.",
      category: "Work",
      date: "2026-05-31",
      time: "20:00",
      repeat: "Daily",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "reminder-planning",
      title: "Daily Planning",
      message: "Plan tomorrow before sleeping.",
      category: "Personal",
      date: "2026-05-31",
      time: "22:00",
      repeat: "Daily",
      isActive: false,
      createdAt: now,
      updatedAt: now,
    },
  ],
  checkIns: [],
  settings: {
    theme: "system",
    accentColor: "#2563EB",
    compactMode: false,
    notificationsEnabled: true,
    dailyCheckInTime: "21:00",
    habitReminderTime: "07:00",
    quietHoursStart: "22:30",
    quietHoursEnd: "07:00",
    weekendReminders: false,
    reminderTone: "Friendly",
    customReminderMessage: "Small progress still counts. Take the next useful step.",
    dailyMotivationMessage: "Stay consistent today and make tomorrow easier.",
    profileName: "Sanjeeb Bhattarai",
    profileEmail: "sanjeeb@example.com",
    profileFocus: "Personal development",
  },
};
