"use client";

import type { ChangeEvent } from "react";
import type { LaunchFilters } from "@/features/launches/types/filter.types";
import { useUpdateLaunchFilters } from "@/features/launches/hooks/use-update-launch-filters";

interface LaunchFiltersProps {
  filters: LaunchFilters;
}

export function LaunchFilters({ filters }: LaunchFiltersProps) {
  const updateFilters = useUpdateLaunchFilters();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    updateFilters({
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form className="grid gap-4 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="search" className="text-sm font-medium text-slate-700">
          Search mission
        </label>
        <input
          id="search"
          name="search"
          type="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Falcon, Starlink..."
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="success" className="text-sm font-medium text-slate-700">
          Outcome
        </label>
        <select
          id="success"
          name="success"
          value={filters.success}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="startDate"
          className="text-sm font-medium text-slate-700"
        >
          Start date
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="endDate" className="text-sm font-medium text-slate-700">
          End date
        </label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sort" className="text-sm font-medium text-slate-700">
          Sort
        </label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="date_desc">Newest first</option>
          <option value="date_asc">Oldest first</option>
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
        </select>
      </div>
    </form>
  );
}
