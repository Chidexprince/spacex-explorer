export const launchKeys = {
    all: ["launches"] as const,

    lists: () => [...launchKeys.all, "list"] as const,

    list: (filters: unknown) => [...launchKeys.lists(), filters] as const,

    detail: (id: string) => [...launchKeys.all, "detail", id] as const,

    rocket: (id: string) => ["rocket", id] as const,

    launchpad: (id: string) => ["launchpad", id] as const,
};