import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { useToast, type Toast, type ToastType } from "../context/ToastContext";

const toastStyles: Record<
  ToastType,
  {
    border: string;
    background: string;
    iconBackground: string;
    iconColor: string;
    Icon: typeof CheckCircle2;
  }
> = {
  success: {
    border: "border-emerald-200",
    background: "bg-emerald-50",
    iconBackground: "bg-emerald-100",
    iconColor: "text-emerald-700",
    Icon: CheckCircle2,
  },
  error: {
    border: "border-red-200",
    background: "bg-red-50",
    iconBackground: "bg-red-100",
    iconColor: "text-red-600",
    Icon: AlertCircle,
  },
  warning: {
    border: "border-amber-200",
    background: "bg-amber-50",
    iconBackground: "bg-amber-100",
    iconColor: "text-amber-700",
    Icon: TriangleAlert,
  },
  info: {
    border: "border-blue-200",
    background: "bg-blue-50",
    iconBackground: "bg-blue-100",
    iconColor: "text-blue-700",
    Icon: Info,
  },
};

function ToastItem({ toast }: { toast: Toast }) {
  const { exitingToastIds, removeToast } = useToast();
  const style = toastStyles[toast.type];
  const Icon = style.Icon;
  const isExiting = exitingToastIds.includes(toast.id);

  return (
    <div
      className={`toast-enter pointer-events-auto flex w-full items-start gap-3 rounded-lg border ${style.border} ${style.background} p-4 shadow-lg shadow-slate-900/10 transition duration-200 ease-out ${
        isExiting ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
      }`}
      role="status"
    >
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.iconBackground} ${style.iconColor}`}
      >
        <Icon size={18} strokeWidth={2.4} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-core-ink">{toast.title}</p>
        {toast.message && (
          <p className="mt-1 text-sm leading-5 text-core-muted">{toast.message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        className="rounded-md p-1 text-core-muted transition hover:bg-white/70 hover:text-core-ink"
        aria-label="Close notification"
      >
        <X size={16} strokeWidth={2.4} />
      </button>
    </div>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-50 flex w-[min(380px,calc(100vw-2.5rem))] flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

export default ToastContainer;
