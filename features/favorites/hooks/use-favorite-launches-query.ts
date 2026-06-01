"use client";

import { useQueries } from "@tanstack/react-query";
import { getLaunch } from "@/features/launches/api/spacex-api";
import { launchKeys } from "@/features/launches/api/query-keys";

export function useFavoriteLaunchesQuery(favoriteIds: string[]) {
    return useQueries({
        queries: favoriteIds.map((id) => ({
            queryKey: launchKeys.detail(id),
            queryFn: () => getLaunch(id),
            enabled: Boolean(id),
        })),
    });
}