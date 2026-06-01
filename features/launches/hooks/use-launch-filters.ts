"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type {
    LaunchFilters,
    LaunchSort,
    LaunchStatusFilter,
    LaunchSuccessFilter,
} from "@/features/launches/types/filter.types";

const statusValues: LaunchStatusFilter[] = ["all", "upcoming", "past"];
const successValues: LaunchSuccessFilter[] = ["all", "success", "failure"];
const sortValues: LaunchSort[] = ["date_desc", "date_asc", "name_asc", "name_desc"];

function getAllowedValue<T extends string>(
    value: string | null,
    allowedValues: T[],
    fallback: T
): T {
    if (value && allowedValues.includes(value as T)) {
        return value as T;
    }

    return fallback;
}

export function useLaunchFilters(): LaunchFilters {
    const searchParams = useSearchParams();

    return useMemo(
        () => ({
            search: searchParams.get("search") ?? "",
            status: getAllowedValue(searchParams.get("status"), statusValues, "all"),
            success: getAllowedValue(searchParams.get("success"), successValues, "all"),
            startDate: searchParams.get("startDate") ?? "",
            endDate: searchParams.get("endDate") ?? "",
            sort: getAllowedValue(searchParams.get("sort"), sortValues, "date_desc"),
        }),
        [searchParams]
    );
}