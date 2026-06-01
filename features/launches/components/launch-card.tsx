"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Bookmark } from "lucide-react";
import type { Launch } from "@/features/launches/types/launch.types";

interface LaunchCardProps {
  launch: Launch;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function LaunchCard({
  launch,
  isFavorite = false,
  onToggleFavorite,
}: LaunchCardProps) {
  const patchImage = launch.links.patch.small ?? launch.links.patch.large;

  return (
    <article className="relative flex h-full flex-col rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      <Link
        href={`/launches/${launch.id}`}
        className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
        aria-label={`View details for ${launch.name}`}
      />
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {patchImage ? (
            <Image
              src={patchImage}
              alt=""
              fill
              sizes="64px"
              className="object-contain p-2"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              No image
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite?.(launch.id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${launch.name} from favorites`
              : `Add ${launch.name} to favorites`
          }
          className="relative z-10 rounded-full border p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <Bookmark
            aria-hidden="true"
            size={18}
            className={isFavorite ? "fill-slate-950 text-slate-950" : ""}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            {launch.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {format(new Date(launch.date_utc), "PPP")}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {launch.upcoming ? "Upcoming" : "Past"}
          </span>

          {launch.success !== null && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {launch.success ? "Success" : "Failure"}
            </span>
          )}
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {launch.details ?? "No launch details available."}
        </p>
      </div>
    </article>
  );
}
