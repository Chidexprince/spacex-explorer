interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load the data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="rounded-2xl border bg-white p-8 text-center">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
      >
        Retry
      </button>
    </div>
  );
}
