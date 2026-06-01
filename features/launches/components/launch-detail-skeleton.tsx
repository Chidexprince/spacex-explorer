export function LaunchDetailSkeleton() {
  return (
    <main
      className="min-h-screen bg-slate-50 px-4 py-8 md:px-8"
      aria-busy="true"
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />

        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-5 w-40 animate-pulse rounded bg-slate-200" />

          <div className="mt-6 flex gap-3">
            <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
          </div>

          <div className="mt-8 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-slate-200" />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="h-48 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-48 animate-pulse rounded-3xl bg-slate-200" />
        </section>
      </div>
    </main>
  );
}
