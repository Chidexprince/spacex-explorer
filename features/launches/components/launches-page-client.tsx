"use client";

import { useMemo } from "react";
import { LaunchFilters } from "@/features/launches/components/launch-filters";
import { LaunchCardSkeleton } from "@/features/launches/components/launch-card-skeleton";
import { useLaunchFilters } from "@/features/launches/hooks/use-launch-filters";
import { useDebounce } from "@/features/launches/hooks/use-debounce";
import { useLaunchesQuery } from "@/features/launches/hooks/use-launches-query";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import type { LaunchFilters as LaunchFiltersType } from "@/features/launches/types/filter.types";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import Link from "next/link";
import { VirtualizedLaunchGrid } from "./virtualized-launch-grid";

export function LaunchesPageClient() {
  const rawFilters = useLaunchFilters();
  const { isFavorite, toggleFavorite } = useFavorites();

  const debouncedSearch = useDebounce(rawFilters.search, 500);

  const filters: LaunchFiltersType = useMemo(
    () => ({
      ...rawFilters,
      search: debouncedSearch,
    }),
    [rawFilters, debouncedSearch],
  );

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLaunchesQuery(filters);

  const launches = useMemo(() => {
    return data?.pages.flatMap((page) => page.docs) ?? [];
  }, [data]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            SpaceX Explorer
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Explore SpaceX Launches
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Browse launches using server-side pagination, filters, sorting,
                search, and cached API requests.
              </p>
            </div>
          </div>

          <Link
            href="/favorites"
            className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
          >
            View favorites
          </Link>
        </header>

        <LaunchFilters filters={rawFilters} />

        {isLoading && (
          <section
            aria-label="Loading launches"
            aria-busy="true"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 9 }).map((_, index) => (
              <LaunchCardSkeleton key={index} />
            ))}
          </section>
        )}

        {isError && (
          <ErrorState
            title="Could not load launches"
            description="The SpaceX API request failed. This may be temporary."
            onRetry={() => void refetch()}
          />
        )}

        {!isLoading && !isError && launches.length === 0 && (
          <EmptyState
            title="No launches found"
            description="Try adjusting your search, filters, or date range."
          />
        )}

        {!isLoading && !isError && launches.length > 0 && (
          <>
            <VirtualizedLaunchGrid
              launches={launches}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />

            <div className="flex justify-center pt-4">
              {hasNextPage ? (
                <button
                  type="button"
                  onClick={() => void fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : "Load more launches"}
                </button>
              ) : (
                <p className="text-sm text-slate-500">
                  You have reached the end.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
