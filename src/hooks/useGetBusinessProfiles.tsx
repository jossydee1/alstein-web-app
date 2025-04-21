"use client";

import { useAuth } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { ApiResponseProps, PartnerProps } from "@/types";
import { api } from "@/utils";

export const useGetBusinessProfiles = () => {
  const { token, setBusinessProfile } = useAuth();

  const { data, isLoading, error, refetch } = useQuery<PartnerProps[]>({
    queryKey: ["getBusinessProfiles"],
    queryFn: async () => {
      const response = await api.get<ApiResponseProps<PartnerProps[]>>(
        "//partner/api/v1/get-my-business-profiles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        throw new Error(
          response?.data?.message || "Failed to fetch business profiles",
        );
      }

      const firstProfile = response?.data?.data[0];
      setBusinessProfile(firstProfile);

      return response?.data?.data;
    },
    enabled: false, // Disable automatic fetching
  });

  return { data, isLoading, error, refetch };
};
