import { z } from "zod";

export const LaunchSchema = z.object({
    id: z.string(),
    name: z.string(),
    details: z.string().nullable(),
    success: z.boolean().nullable(),
    upcoming: z.boolean(),
    date_utc: z.string(),
    rocket: z.string(),
    launchpad: z.string(),
    links: z.object({
        webcast: z.string().nullable().optional(),
        wikipedia: z.string().nullable().optional(),
        article: z.string().nullable().optional(),

        patch: z.object({
            small: z.string().nullable().optional(),
            large: z.string().nullable().optional(),
        }),
    }),
});

export const RocketSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    country: z.string(),
    company: z.string(),
});

export const LaunchpadSchema = z.object({
    id: z.string(),
    name: z.string(),
    full_name: z.string(),
    locality: z.string(),
    region: z.string(),
    status: z.string(),
});