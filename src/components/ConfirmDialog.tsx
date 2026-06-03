type ConfirmDialogProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/35 px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
        <h2 className="text-lg font-bold text-core-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-core-muted">{message}</p>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-core-muted transition hover:border-slate-300 hover:text-core-ink"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
