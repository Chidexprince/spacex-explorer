"use client";

import { useQuery, useQueries } from "@tanstack/react-query";
import {
    getLaunch,
    getLaunchpad,
    getRocket,
} from "@/features/launches/api/spacex-api";
import { launchKeys } from "@/features/launches/api/query-keys";

export function useLaunchDetailQuery(launchId: string) {
    const launchQuery = useQuery({
        queryKey: launchKeys.detail(launchId),
        queryFn: () => getLaunch(launchId),
        enabled: Boolean(launchId),
    });

    const relatedQueries = useQueries({
        queries: [
            {
                queryKey: launchQuery.data?.rocket
                    ? launchKeys.rocket(launchQuery.data.rocket)
                    : ["rocket", "empty"],
                queryFn: () => getRocket(launchQuery.data!.rocket),
                enabled: Boolean(launchQuery.data?.rocket),
            },
            {
                queryKey: launchQuery.data?.launchpad
                    ? launchKeys.launchpad(launchQuery.data.launchpad)
                    : ["launchpad", "empty"],
                queryFn: () => getLaunchpad(launchQuery.data!.launchpad),
                enabled: Boolean(launchQuery.data?.launchpad),
            },
        ],
    });

    const [rocketQuery, launchpadQuery] = relatedQueries;

    return {
        launchQuery,
        rocketQuery,
        launchpadQuery,
    };
}