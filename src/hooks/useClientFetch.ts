"use client";

import { api, formatError } from "@/utils";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { ApiResponseProps } from "@/types";
import { useAuth } from "@/context";

export function useClientFetch<T>({
  endpoint,
  params,
  enabled = true,
  options,
  token,
}: {
  endpoint: string;
  params?: Record<string, string | number | boolean | null>;
  enabled?: boolean;
  options?: Partial<QueryOptions<T>>;
  token?: string | null;
}) {
  const { logout } = useAuth();

  return useQuery({
    queryKey: [endpoint, params],
    queryFn: async (): Promise<T> => {
      try {
        const response = await api.get<ApiResponseProps<T>>(endpoint, {
          params,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        });

        if (response?.status !== 200 || !response?.data) {
          throw new Error(response?.data?.message || "No data found");
        }

        return response?.data?.data;
      } catch (error: unknown) {
        const axiosError = error as { response?: { status: number } };
        if (axiosError.response?.status === 403) {
          logout();
          throw new Error("Unauthorized access");
        }
        throw new Error(formatError(error, "Failed to fetch data"));
      }
    },
    enabled,
    ...options,
  });
}
