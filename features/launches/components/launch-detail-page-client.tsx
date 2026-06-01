"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Bookmark, ExternalLink } from "lucide-react";
import { ErrorState } from "@/components/common/error-state";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { useLaunchDetailQuery } from "@/features/launches/hooks/use-launch-detail-query";
import { LaunchDetailSkeleton } from "@/features/launches/components/launch-detail-skeleton";
import { InfoCard } from "@/features/launches/components/info-card";

interface LaunchDetailPageClientProps {
  launchId: string;
}

export function LaunchDetailPageClient({
  launchId,
}: LaunchDetailPageClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const { launchQuery, rocketQuery, launchpadQuery } =
    useLaunchDetailQuery(launchId);

  if (launchQuery.isLoading) {
    return <LaunchDetailSkeleton />;
  }

  if (launchQuery.isError || !launchQuery.data) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <ErrorState
            title="Could not load launch"
            description="The selected launch could not be fetched from the SpaceX API."
            onRetry={() => void launchQuery.refetch()}
          />
        </div>
      </main>
    );
  }

  const launch = launchQuery.data;
  const patchImage = launch.links.patch.large ?? launch.links.patch.small;
  const favorite = isFavorite(launch.id);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link
          href="/launches"
          className="inline-flex text-sm font-medium text-slate-600 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          ← Back to launches
        </Link>

        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-5">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                {patchImage ? (
                  <Image
                    src={patchImage}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-contain p-3"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    No image
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  SpaceX Launch
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                  {launch.name}
                </h1>

                <p className="mt-3 text-slate-600">
                  {format(new Date(launch.date_utc), "PPPP p")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(launch.id)}
              aria-pressed={favorite}
              aria-label={
                favorite
                  ? `Remove ${launch.name} from favorites`
                  : `Add ${launch.name} to favorites`
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <Bookmark
                aria-hidden="true"
                size={18}
                className={favorite ? "fill-slate-950 text-slate-950" : ""}
              />
              {favorite ? "Saved" : "Save"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {launch.upcoming ? "Upcoming" : "Past"}
            </span>

            {launch.success !== null && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {launch.success ? "Success" : "Failure"}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-4xl leading-7 text-slate-700">
            {launch.details ?? "No details are available for this launch."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {launch.links.webcast && (
              <a
                href={launch.links.webcast}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Watch webcast
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            )}

            {launch.links.wikipedia && (
              <a
                href={launch.links.wikipedia}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                Wikipedia
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            )}

            {launch.links.article && (
              <a
                href={launch.links.article}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                Article
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            )}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <InfoCard title="Rocket">
            {rocketQuery.isLoading && <p>Loading rocket...</p>}

            {rocketQuery.isError && (
              <button
                type="button"
                onClick={() => void rocketQuery.refetch()}
                className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                Retry rocket
              </button>
            )}

            {rocketQuery.data && (
              <div className="space-y-3">
                <p>
                  <strong className="text-slate-950">Name:</strong>{" "}
                  {rocketQuery.data.name}
                </p>
                <p>
                  <strong className="text-slate-950">Company:</strong>{" "}
                  {rocketQuery.data.company}
                </p>
                <p>
                  <strong className="text-slate-950">Country:</strong>{" "}
                  {rocketQuery.data.country}
                </p>
                <p>{rocketQuery.data.description}</p>
              </div>
            )}
          </InfoCard>

          <InfoCard title="Launchpad">
            {launchpadQuery.isLoading && <p>Loading launchpad...</p>}

            {launchpadQuery.isError && (
              <button
                type="button"
                onClick={() => void launchpadQuery.refetch()}
                className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                Retry launchpad
              </button>
            )}

            {launchpadQuery.data && (
              <div className="space-y-3">
                <p>
                  <strong className="text-slate-950">Name:</strong>{" "}
                  {launchpadQuery.data.full_name}
                </p>
                <p>
                  <strong className="text-slate-950">Location:</strong>{" "}
                  {launchpadQuery.data.locality}, {launchpadQuery.data.region}
                </p>
                <p>
                  <strong className="text-slate-950">Status:</strong>{" "}
                  {launchpadQuery.data.status}
                </p>
              </div>
            )}
          </InfoCard>
        </section>
      </div>
    </main>
  );
}
