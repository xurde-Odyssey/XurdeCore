import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { appReducer } from "./appReducer";
import type { AppAction, AppState } from "./appTypes";
import { loadAppState, saveAppState } from "../utils/storage";

type AppContextValue = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadAppState);

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider.");
  }

  return context;
}
