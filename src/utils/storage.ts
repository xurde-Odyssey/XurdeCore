import {
  defaultAppState,
  type AppSettings,
  type AppState,
  type AppTheme,
  type CheckIn,
  type Reminder,
  type ReminderTone,
  type Routine,
  type RoutineStatus,
} from "../context/appTypes";

const APP_STORAGE_KEY = "personalcore-app-state";

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isRoutineStatus(value: unknown): value is RoutineStatus {
  return value === "Done" || value === "Pending";
}

function isAppTheme(value: unknown): value is AppTheme {
  return value === "light" || value === "dark" || value === "system";
}

function isReminderTone(value: unknown): value is ReminderTone {
  return (
    value === "Friendly" ||
    value === "Strict" ||
    value === "Motivational" ||
    value === "Minimal" ||
    value === "Funny"
  );
}

function isRoutine(value: unknown): value is Routine {
  return (
    isObject(value) &&
    isString(value.id) &&
    isString(value.name) &&
    isString(value.category) &&
    isString(value.frequency) &&
    isString(value.reminderTime) &&
    isRoutineStatus(value.status) &&
    isNumber(value.streak) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

function isReminder(value: unknown): value is Reminder {
  return (
    isObject(value) &&
    isString(value.id) &&
    isString(value.title) &&
    isString(value.message) &&
    isString(value.category) &&
    isString(value.date) &&
    isString(value.time) &&
    isString(value.repeat) &&
    isBoolean(value.isActive) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

function isCheckIn(value: unknown): value is CheckIn {
  return (
    isObject(value) &&
    isString(value.id) &&
    isString(value.date) &&
    isString(value.mood) &&
    isString(value.energy) &&
    isNumber(value.productivity) &&
    isString(value.notes) &&
    isString(value.completedToday) &&
    isString(value.delayedToday) &&
    isString(value.improveTomorrow) &&
    isString(value.gratefulFor) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

function isAppSettings(value: unknown): value is AppSettings {
  return (
    isObject(value) &&
    isAppTheme(value.theme) &&
    isString(value.accentColor) &&
    isBoolean(value.compactMode) &&
    isBoolean(value.notificationsEnabled) &&
    isString(value.dailyCheckInTime) &&
    isString(value.habitReminderTime) &&
    isString(value.quietHoursStart) &&
    isString(value.quietHoursEnd) &&
    isBoolean(value.weekendReminders) &&
    isReminderTone(value.reminderTone) &&
    isString(value.customReminderMessage) &&
    isString(value.dailyMotivationMessage) &&
    isString(value.profileName) &&
    isString(value.profileEmail) &&
    isString(value.profileFocus)
  );
}

function isAppState(value: unknown): value is AppState {
  return (
    isObject(value) &&
    Array.isArray(value.routines) &&
    value.routines.every(isRoutine) &&
    Array.isArray(value.reminders) &&
    value.reminders.every(isReminder) &&
    Array.isArray(value.checkIns) &&
    value.checkIns.every(isCheckIn) &&
    isAppSettings(value.settings)
  );
}

export function loadAppState(): AppState {
  try {
    const savedState = window.localStorage.getItem(APP_STORAGE_KEY);

    if (!savedState) {
      return defaultAppState;
    }

    const parsedState: unknown = JSON.parse(savedState);

    if (!isAppState(parsedState)) {
      return defaultAppState;
    }

    return parsedState;
  } catch {
    return defaultAppState;
  }
}

export function saveAppState(state: AppState) {
  try {
    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Persistence failure should not break the app UI.
  }
}

export function clearAppState() {
  try {
    window.localStorage.removeItem(APP_STORAGE_KEY);
  } catch {
    // Clearing storage is best-effort.
  }
}
