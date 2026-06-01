export type LaunchStatusFilter = "all" | "upcoming" | "past";
export type LaunchSuccessFilter = "all" | "success" | "failure";
export type LaunchSort = "date_desc" | "date_asc" | "name_asc" | "name_desc";

export interface LaunchFilters {
    search: string;
    status: LaunchStatusFilter;
    success: LaunchSuccessFilter;
    startDate: string;
    endDate: string;
    sort: LaunchSort;
}