"use client";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-red-500">
          Application error
        </p>

        <h1 className="mt-3 text-2xl font-bold text-slate-950">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          {error.message || "An unexpected error occurred."}
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
