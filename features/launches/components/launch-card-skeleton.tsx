export function LaunchCardSkeleton() {
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-sm"
      aria-hidden="true"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="h-16 w-16 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="flex gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
