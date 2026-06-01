import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api-client";
import { getRetryDelay } from "@/lib/retry";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                if (error instanceof ApiError) {
                    return (error.status === 429 || error.status >= 500) && failureCount < 3;
                }

                return failureCount < 3;
            },
            retryDelay: getRetryDelay,
        },
    },
});