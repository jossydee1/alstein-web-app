"use client";
import { useAuth } from "@/context";
import { useClientFetch } from "@/hooks";
import React from "react";

const Metrics = () => {
  const { token, businessProfile } = useAuth();

  const { data } = useClientFetch<{
    approved_booking: number;
    pending_booking: number;
    declined_booking: number;
    all_booking: number;
  }>({
    endpoint: `/partner/api/v1/booking/get-partner-booking-statistics?partner_id=${businessProfile?.id}`,
    token,
    enabled: !!token && !!businessProfile?.id,
  });

  return (
    <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      <SimpleCard
        title="Approved Bookings"
        value={(data?.approved_booking ?? 0).toString()}
      />
      <SimpleCard
        title="Potential Bookings"
        value={(data?.pending_booking ?? 0).toString()}
      />
      <SimpleCard
        title="Declined Bookings"
        value={(data?.declined_booking ?? 0).toString()}
      />
      <SimpleCard
        title="All Bookings"
        value={(data?.all_booking ?? 0).toString()}
      />
    </section>
  );
};

export default Metrics;

type Props = {
  title: string;
  value: string;
};

const SimpleCard = ({ title, value }: Props) => {
  return (
    <div className="flex flex-col rounded-xl border-[0.2px] border-gray-300 bg-white shadow-sm sm:min-w-[200px]">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="capitalize tracking-wide text-[#172554]">{title}</p>
        </div>

        <div className="mt-1 items-center gap-x-2">
          <h3 className="text-xl font-medium text-[#172554] sm:text-2xl">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
};
