import { QueryClient } from '@tanstack/react-query';

// Centralized QueryClient instance with default configurations
// We export a function so it can be instantiated per request on the server (if using SSR),
// or used as a singleton on the client.
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 5 minutes
        staleTime: 5 * 60 * 1000,
        // Disable aggressive refetching for a cleaner dev experience and fewer API calls
        refetchOnWindowFocus: false,
        // Retry failed requests once before showing an error
        retry: 1,
      },
    },
  });
};
