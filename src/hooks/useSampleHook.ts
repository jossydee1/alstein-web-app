import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponseProps, SampleProps } from "@/types";

// Sample React Query hook using API
export const useSampleHook = (queryParam?: string) => {
  return useQuery({
    queryKey: ["fetch-sample", queryParam],
    queryFn: async (): Promise<SampleProps> => {
      const response = await axios.get<ApiResponseProps<SampleProps>>(
        `/api/sample-endpoint?queryParam=${queryParam}`,
      );

      if (response.data.code !== "success" || !response.data.data) {
        throw new Error(response.data.message || "No data found");
      }

      return response.data.data; // Returns query object for data, isLoading, error, refetch, etc.
    },
    enabled: Boolean(queryParam?.trim()), // Ensure queryParam is valid before running
  });
};
