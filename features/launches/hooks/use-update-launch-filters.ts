"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { LaunchFilters } from "@/features/launches/types/filter.types";

export function useUpdateLaunchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    return function updateFilters(nextFilters: Partial<LaunchFilters>) {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(nextFilters).forEach(([key, value]) => {
            if (!value || value === "all" || value === "date_desc") {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });

        router.push(`/launches?${params.toString()}`, {
            scroll: false,
        });
    };
}