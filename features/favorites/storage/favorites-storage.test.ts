import { beforeEach, describe, expect, it, vi } from "vitest";
import {
    getStoredFavoriteIds,
    saveFavoriteIds,
} from "@/features/favorites/storage/favorites-storage";

const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: vi.fn((key: string) => store[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value;
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
    };
})();

describe("favorites storage", () => {
    beforeEach(() => {
        localStorageMock.clear();

        vi.stubGlobal("window", {
            localStorage: localStorageMock,
        });
    });

    it("returns an empty array when no favorites exist", () => {
        expect(getStoredFavoriteIds()).toEqual([]);
    });

    it("saves and reads favorite IDs", () => {
        saveFavoriteIds(["launch-1", "launch-2"]);

        expect(getStoredFavoriteIds()).toEqual(["launch-1", "launch-2"]);
    });

    it("ignores malformed stored values", () => {
        window.localStorage.setItem("spacex-explorer:favorites", "{bad-json");

        expect(getStoredFavoriteIds()).toEqual([]);
    });

    it("filters out non-string values", () => {
        window.localStorage.setItem(
            "spacex-explorer:favorites",
            JSON.stringify(["launch-1", 123, null, "launch-2"])
        );

        expect(getStoredFavoriteIds()).toEqual(["launch-1", "launch-2"]);
    });
});