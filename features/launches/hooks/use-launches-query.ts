"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { queryLaunches } from "@/features/launches/api/spacex-api";
import { launchKeys } from "@/features/launches/api/query-keys";
import type { LaunchFilters } from "@/features/launches/types/filter.types";
import { buildLaunchQuery, buildLaunchSort } from "@/features/launches/utils/build-launch-query";

const LAUNCHES_PAGE_LIMIT = 20;

export function useLaunchesQuery(filters: LaunchFilters) {
    return useInfiniteQuery({
        queryKey: launchKeys.list(filters),
        initialPageParam: 1,
        queryFn: ({ pageParam }) => {
            return queryLaunches({
                page: pageParam,
                limit: LAUNCHES_PAGE_LIMIT,
                query: buildLaunchQuery(filters),
                sort: buildLaunchSort(filters),
            });
        },
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.nextPage : undefined;
        },
    });
}