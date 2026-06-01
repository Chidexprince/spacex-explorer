"use client";

import Link from "next/link";
import { useMemo } from "react";
import { LaunchCard } from "@/features/launches/components/launch-card";
import { LaunchCardSkeleton } from "@/features/launches/components/launch-card-skeleton";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { useFavoriteLaunchesQuery } from "@/features/favorites/hooks/use-favorite-launches-query";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import type { Launch } from "@/features/launches/types/launch.types";

export function FavoritesPageClient() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const favoriteLaunchQueries = useFavoriteLaunchesQuery(favoriteIds);

  const isLoading =
    favoriteIds.length > 0 &&
    favoriteLaunchQueries.some((query) => query.isLoading);

  const isError = favoriteLaunchQueries.some((query) => query.isError);

  const launches = useMemo<Launch[]>(() => {
    return favoriteLaunchQueries
      .map((query) => query.data)
      .filter((launch): launch is Launch => Boolean(launch));
  }, [favoriteLaunchQueries]);

  function retryFailedQueries() {
    favoriteLaunchQueries.forEach((query) => {
      if (query.isError) {
        void query.refetch();
      }
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-4">
          <Link
            href="/launches"
            className="inline-flex text-sm font-medium text-slate-600 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            ← Back to launches
          </Link>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              SpaceX Explorer
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Favorite Launches
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Your saved launches are stored locally in your browser and
              refreshed from the SpaceX API when this page loads.
            </p>
          </div>
        </header>

        {favoriteIds.length === 0 && (
          <EmptyState
            title="No favorites yet"
            description="Go back to the launches page and bookmark launches you want to revisit."
          />
        )}

        {isLoading && (
          <section
            aria-label="Loading favorite launches"
            aria-busy="true"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: Math.min(favoriteIds.length, 6) }).map(
              (_, index) => (
                <LaunchCardSkeleton key={index} />
              ),
            )}
          </section>
        )}

        {isError && (
          <ErrorState
            title="Could not load some favorites"
            description="Some saved launches could not be fetched from the SpaceX API."
            onRetry={retryFailedQueries}
          />
        )}

        {!isLoading && !isError && launches.length > 0 && (
          <section
            aria-label="Favorite launches"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {launches.map((launch) => (
              <LaunchCard
                key={launch.id}
                launch={launch}
                isFavorite={isFavorite(launch?.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
