import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  createdAt: string;
};

type ToastContextValue = {
  toasts: Toast[];
  exitingToastIds: string[];
  showToast: (type: ToastType, title: string, message?: string) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);
const toastDuration = 3000;
const exitDuration = 180;

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [exitingToastIds, setExitingToastIds] = useState<string[]>([]);
  const timers = useRef<Record<string, number>>({});
  const exitTimers = useRef<Record<string, number>>({});

  const removeToast = useCallback((id: string) => {
    window.clearTimeout(timers.current[id]);
    delete timers.current[id];

    if (exitTimers.current[id]) {
      return;
    }

    setExitingToastIds((currentIds) =>
      currentIds.includes(id) ? currentIds : [...currentIds, id],
    );

    exitTimers.current[id] = window.setTimeout(() => {
      delete exitTimers.current[id];
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
      setExitingToastIds((currentIds) => currentIds.filter((toastId) => toastId !== id));
    }, exitDuration);
  }, []);

  const showToast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = crypto.randomUUID();
      const toast: Toast = {
        id,
        type,
        title,
        message,
        createdAt: new Date().toISOString(),
      };

      setToasts((currentToasts) => [toast, ...currentToasts]);
      timers.current[id] = window.setTimeout(() => removeToast(id), toastDuration);
    },
    [removeToast],
  );

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((timerId) => window.clearTimeout(timerId));
      Object.values(exitTimers.current).forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      exitingToastIds,
      showToast,
      removeToast,
    }),
    [toasts, exitingToastIds, showToast, removeToast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }

  return context;
}
