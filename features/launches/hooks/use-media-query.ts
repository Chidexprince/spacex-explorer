"use client";

import { useEffect, useState } from "react";

function getMatches(query: string): boolean {
    if (typeof window === "undefined") {
        return false;
    }

    return window.matchMedia(query).matches;
}

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => getMatches(query));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        function handleChange(event: MediaQueryListEvent) {
            setMatches(event.matches);
        }

        mediaQueryList.addEventListener("change", handleChange);

        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}