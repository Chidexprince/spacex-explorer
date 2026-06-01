"use client";

import { useMemo, useState } from "react";
import {
    getStoredFavoriteIds,
    saveFavoriteIds,
} from "@/features/favorites/storage/favorites-storage";

export function useFavorites() {
    const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
        getStoredFavoriteIds()
    );

    function toggleFavorite(id: string) {
        setFavoriteIds((current) => {
            const next = current.includes(id)
                ? current.filter((favoriteId) => favoriteId !== id)
                : [...current, id];

            saveFavoriteIds(next);
            return next;
        });
    }

    function removeFavorite(id: string) {
        setFavoriteIds((current) => {
            const next = current.filter((favoriteId) => favoriteId !== id);
            saveFavoriteIds(next);
            return next;
        });
    }

    const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

    return {
        favoriteIds,
        favoriteIdSet,
        toggleFavorite,
        removeFavorite,
        isFavorite: (id: string) => favoriteIdSet.has(id),
    };
}