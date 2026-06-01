export interface LaunchLinks {
    webcast?: string | null;
    wikipedia?: string | null;
    article?: string | null;
    patch: {
        small?: string | null;
        large?: string | null;
    };
}

export interface Launch {
    id: string;
    name: string;
    details: string | null;
    success: boolean | null;
    upcoming: boolean;
    date_utc: string;
    rocket: string;
    launchpad: string;
    links: LaunchLinks;
}

export interface Rocket {
    id: string;
    name: string;
    description: string;
    country: string;
    company: string;
}

export interface Launchpad {
    id: string;
    name: string;
    full_name: string;
    locality: string;
    region: string;
    status: string;
}

export interface PaginatedResponse<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    nextPage?: number | null;
    hasPrevPage: boolean;
    prevPage?: number | null;
}