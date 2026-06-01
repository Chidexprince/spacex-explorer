const FAVORITES_STORAGE_KEY = "spacex-explorer:favorites";

export function getStoredFavoriteIds(): string[] {
    if (typeof window === "undefined") return [];

    try {
        const value = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

        if (!value) return [];

        const parsed = JSON.parse(value);

        return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
    } catch {
        return [];
    }
}

export function saveFavoriteIds(ids: string[]): void {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
}