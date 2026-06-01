import { describe, expect, it } from "vitest";
import {
    buildLaunchQuery,
    buildLaunchSort,
} from "@/features/launches/utils/build-launch-query";
import type { LaunchFilters } from "@/features/launches/types/filter.types";

const baseFilters: LaunchFilters = {
    search: "",
    status: "all",
    success: "all",
    startDate: "",
    endDate: "",
    sort: "date_desc",
};

describe("buildLaunchQuery", () => {
    it("returns an empty query when no filters are applied", () => {
        expect(buildLaunchQuery(baseFilters)).toEqual({});
    });

    it("adds case-insensitive mission name search", () => {
        expect(
            buildLaunchQuery({
                ...baseFilters,
                search: "falcon",
            })
        ).toEqual({
            name: {
                $regex: "falcon",
                $options: "i",
            },
        });
    });

    it("adds upcoming filter", () => {
        expect(
            buildLaunchQuery({
                ...baseFilters,
                status: "upcoming",
            })
        ).toEqual({
            upcoming: true,
        });
    });

    it("adds past filter", () => {
        expect(
            buildLaunchQuery({
                ...baseFilters,
                status: "past",
            })
        ).toEqual({
            upcoming: false,
        });
    });

    it("adds success filter", () => {
        expect(
            buildLaunchQuery({
                ...baseFilters,
                success: "success",
            })
        ).toEqual({
            success: true,
        });
    });

    it("adds failure filter", () => {
        expect(
            buildLaunchQuery({
                ...baseFilters,
                success: "failure",
            })
        ).toEqual({
            success: false,
        });
    });

    it("adds date range filter", () => {
        expect(
            buildLaunchQuery({
                ...baseFilters,
                startDate: "2020-01-01",
                endDate: "2020-12-31",
            })
        ).toEqual({
            date_utc: {
                $gte: new Date("2020-01-01").toISOString(),
                $lte: new Date("2020-12-31").toISOString(),
            },
        });
    });
});

describe("buildLaunchSort", () => {
    it("sorts by newest date by default", () => {
        expect(buildLaunchSort(baseFilters)).toEqual({
            date_utc: "desc",
        });
    });

    it("sorts by oldest date", () => {
        expect(
            buildLaunchSort({
                ...baseFilters,
                sort: "date_asc",
            })
        ).toEqual({
            date_utc: "asc",
        });
    });

    it("sorts by name ascending", () => {
        expect(
            buildLaunchSort({
                ...baseFilters,
                sort: "name_asc",
            })
        ).toEqual({
            name: "asc",
        });
    });

    it("sorts by name descending", () => {
        expect(
            buildLaunchSort({
                ...baseFilters,
                sort: "name_desc",
            })
        ).toEqual({
            name: "desc",
        });
    });
});