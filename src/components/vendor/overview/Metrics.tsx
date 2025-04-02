import { formatPrice } from "@/utils";
import React from "react";

const Metrics = () => {
  return (
    <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      <SimpleCard title="Total Orders" value={formatPrice(1200, "NGN")} />
      <SimpleCard title="Upcoming Bookings" value={(14).toString()} />
      <SimpleCard title="Pending Approvals" value={(34).toString()} />
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
