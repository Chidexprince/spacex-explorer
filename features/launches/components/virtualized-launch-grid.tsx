"use client";

import { useMemo } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { LaunchCard } from "@/features/launches/components/launch-card";
import { useMediaQuery } from "@/features/launches/hooks/use-media-query";
import type { Launch } from "@/features/launches/types/launch.types";

interface VirtualizedLaunchGridProps {
  launches: Launch[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

const ESTIMATED_CARD_HEIGHT = 310;

export function VirtualizedLaunchGrid({
  launches,
  isFavorite,
  onToggleFavorite,
}: VirtualizedLaunchGridProps) {
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isMedium = useMediaQuery("(min-width: 768px)");

  const columnCount = isLarge ? 3 : isMedium ? 2 : 1;

  const rows = useMemo(() => {
    const result: Launch[][] = [];

    for (let index = 0; index < launches.length; index += columnCount) {
      result.push(launches.slice(index, index + columnCount));
    }

    return result;
  }, [launches, columnCount]);

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => ESTIMATED_CARD_HEIGHT,
    overscan: 4,
  });

  const gridClassName =
    columnCount === 3
      ? "grid-cols-3"
      : columnCount === 2
        ? "grid-cols-2"
        : "grid-cols-1";

  return (
    <section aria-label="Launch results">
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];

          return (
            <div
              key={virtualRow.key}
              ref={rowVirtualizer.measureElement}
              data-index={virtualRow.index}
              className={`absolute left-0 top-0 grid w-full gap-4 pb-4 ${gridClassName}`}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {row.map((launch) => (
                <LaunchCard
                  key={launch.id}
                  launch={launch}
                  isFavorite={isFavorite(launch.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
