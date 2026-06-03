import { defaultAppState, type AppAction, type AppState } from "./appTypes";

function timestamp() {
  return new Date().toISOString();
}

function createId() {
  return crypto.randomUUID();
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_ROUTINE": {
      const now = timestamp();

      return {
        ...state,
        routines: [
          {
            ...action.payload,
            id: createId(),
            createdAt: now,
            updatedAt: now,
          },
          ...state.routines,
        ],
      };
    }

    case "UPDATE_ROUTINE":
      return {
        ...state,
        routines: state.routines.map((routine) =>
          routine.id === action.payload.id
            ? { ...routine, ...action.payload.updates, updatedAt: timestamp() }
            : routine,
        ),
      };

    case "DELETE_ROUTINE":
      return {
        ...state,
        routines: state.routines.filter((routine) => routine.id !== action.payload.id),
      };

    case "TOGGLE_ROUTINE_STATUS":
      return {
        ...state,
        routines: state.routines.map((routine) => {
          if (routine.id !== action.payload.id) {
            return routine;
          }

          const nextStatus = routine.status === "Done" ? "Pending" : "Done";

          return {
            ...routine,
            status: nextStatus,
            streak: nextStatus === "Done" ? routine.streak + 1 : Math.max(0, routine.streak - 1),
            updatedAt: timestamp(),
          };
        }),
      };

    case "ADD_REMINDER": {
      const now = timestamp();

      return {
        ...state,
        reminders: [
          {
            ...action.payload,
            id: createId(),
            createdAt: now,
            updatedAt: now,
          },
          ...state.reminders,
        ],
      };
    }

    case "UPDATE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder.id === action.payload.id
            ? { ...reminder, ...action.payload.updates, updatedAt: timestamp() }
            : reminder,
        ),
      };

    case "DELETE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.filter((reminder) => reminder.id !== action.payload.id),
      };

    case "TOGGLE_REMINDER_ACTIVE":
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder.id === action.payload.id
            ? { ...reminder, isActive: !reminder.isActive, updatedAt: timestamp() }
            : reminder,
        ),
      };

    case "SAVE_CHECKIN": {
      const now = timestamp();

      return {
        ...state,
        checkIns: [
          {
            ...action.payload,
            id: createId(),
            createdAt: now,
            updatedAt: now,
          },
          ...state.checkIns,
        ],
      };
    }

    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };

    case "RESET_APP_DATA":
      return defaultAppState;

    default:
      return state;
  }
}
