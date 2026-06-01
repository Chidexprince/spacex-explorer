export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="h-12 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-32 animate-pulse rounded-3xl bg-slate-200" />

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </section>
      </div>
    </main>
  );
}
