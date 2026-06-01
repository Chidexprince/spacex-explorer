import type { LaunchFilters } from "@/features/launches/types/filter.types";

export function buildLaunchQuery(filters: LaunchFilters): Record<string, unknown> {
    const query: Record<string, unknown> = {};

    if (filters.search.trim()) {
        query.name = {
            $regex: filters.search.trim(),
            $options: "i",
        };
    }

    if (filters.status === "upcoming") {
        query.upcoming = true;
    }

    if (filters.status === "past") {
        query.upcoming = false;
    }

    if (filters.success === "success") {
        query.success = true;
    }

    if (filters.success === "failure") {
        query.success = false;
    }

    if (filters.startDate || filters.endDate) {
        query.date_utc = {};

        if (filters.startDate) {
            Object.assign(query.date_utc as Record<string, string>, {
                $gte: new Date(filters.startDate).toISOString(),
            });
        }

        if (filters.endDate) {
            Object.assign(query.date_utc as Record<string, string>, {
                $lte: new Date(filters.endDate).toISOString(),
            });
        }
    }

    return query;
}

export function buildLaunchSort(filters: LaunchFilters): Record<string, "asc" | "desc"> {
    switch (filters.sort) {
        case "date_asc":
            return { date_utc: "asc" };

        case "name_asc":
            return { name: "asc" };

        case "name_desc":
            return { name: "desc" };

        case "date_desc":
        default:
            return { date_utc: "desc" };
    }
}