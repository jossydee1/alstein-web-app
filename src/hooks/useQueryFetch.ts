import { api, formatError } from "@/utils";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { ApiResponseProps } from "@/types";
export function useQueryFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | null>,
  enabled: boolean = true,
  options?: Partial<QueryOptions<T>>,
) {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: async (): Promise<T> => {
      try {
        const response = await api.get<ApiResponseProps<T>>(endpoint, {
          params,
        });

        if (response.status !== 200 || !response.data) {
          throw new Error(response.data.message || "No data found");
        }

        return response.data.data;
      } catch (error) {
        throw new Error(formatError(error, "Failed to fetch data"));
      }
    },
    enabled,
    ...options,
  });
}
