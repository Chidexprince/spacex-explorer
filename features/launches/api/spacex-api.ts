import { apiFetch } from "@/lib/api-client";
import type { Launch, Launchpad, PaginatedResponse, Rocket } from "@/features/launches/types/launch.types";
import { LaunchSchema, LaunchpadSchema, RocketSchema } from "@/features/launches/schemas/launch.schema";

export interface LaunchQueryBody {
    page: number;
    limit: number;
    query?: Record<string, unknown>;
    sort?: Record<string, "asc" | "desc">;
}

export async function queryLaunches(
    body: LaunchQueryBody
): Promise<PaginatedResponse<Launch>> {
    const data = await apiFetch<PaginatedResponse<Launch>>("/launches/query", {
        method: "POST",
        body: JSON.stringify({
            query: body.query ?? {},
            options: {
                page: body.page,
                limit: body.limit,
                sort: body.sort ?? {
                    date_utc: "desc",
                },
            },
        }),
    });

    return {
        ...data,
        docs: data.docs.map((launch) => LaunchSchema.parse(launch)),
    };
}

export async function getLaunch(id: string): Promise<Launch> {
    const data = await apiFetch<Launch>(`/launches/${id}`);
    return LaunchSchema.parse(data);
}

export async function getRocket(id: string): Promise<Rocket> {
    const data = await apiFetch<Rocket>(`/rockets/${id}`);
    return RocketSchema.parse(data);
}

export async function getLaunchpad(id: string): Promise<Launchpad> {
    const data = await apiFetch<Launchpad>(`/launchpads/${id}`);
    return LaunchpadSchema.parse(data);
}