import { formatPrice } from "@/utils";
import React from "react";

const Metrics = () => {
  return (
    <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      <SimpleCard
        title="Available to Payout"
        value={formatPrice(500000000, "NGN")}
        subText="Payout"
        className="!bg-brandColor !text-white"
      />
      <SimpleCard
        title="Total Revenue"
        value={formatPrice(500000000, "NGN")}
        subText={205 + " Orders"}
      />
      <SimpleCard
        title="Pending Bookings"
        value={formatPrice(500000000, "NGN")}
        subText={205 + " Bookings"}
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
