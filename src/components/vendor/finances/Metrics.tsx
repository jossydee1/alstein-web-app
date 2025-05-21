"use client";

import { useAuth } from "@/context";
import { useClientFetch } from "@/hooks";
import { formatPrice } from "@/utils";
import React from "react";

const Metrics = () => {
  const { token, businessProfile } = useAuth();

  const url = `/partner/api/v1/payment/get-partner-payment-stat?partner_id=${businessProfile?.id}`;

  const { data } = useClientFetch<{
    total_revenue: number;
    available_balance: number;
    potential_earnings: number;
  }>({
    endpoint: url,
    token,
    enabled: !!token && !!businessProfile?.id,
  });

  return (
    <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      <SimpleCard
        title="Available for Payout"
        value={formatPrice(data?.available_balance || 0, "NGN")}
        className="!bg-brandColor !text-white"
      />
      <SimpleCard
        title="Pending Payout"
        value={formatPrice(data?.potential_earnings || 0, "NGN")}
      />
      <SimpleCard
        title="Total Revenue"
        value={formatPrice(data?.total_revenue || 0, "NGN")}
      />
    </section>
  );
};

export default Metrics;

type Props = {
  title: string;
  value: string;
  subText?: string;
  className?: string;
};

const SimpleCard = ({ title, value, subText, className }: Props) => {
  return (
    <div
      className={`flex flex-col rounded-xl border-[0.2px] border-gray-300 bg-white text-[#172554] shadow-sm sm:min-w-[200px] ${className}`}
    >
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="capitalize tracking-wide">{title}</p>
        </div>

        <div className="mt-1 items-center gap-x-2">
          <h3 className="text-xl font-medium sm:text-2xl">{value}</h3>
          {subText && (
            <p
              className={`mt-0.5 text-sm font-medium text-gray-500${className ? "text-white" : ""} `}
            >
              {subText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
