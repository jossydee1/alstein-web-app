"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatPrice, webRoutes } from "@/utils";
import { ListingInfoProps } from "@/types";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import DateTimePicker from "@/components/common/DateTimePicker";

type Time = {
  hours: string;
  minutes: string;
};

const Summary = ({
  listingInfo,
  date,
  setDate,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  numberOfDays,
}: {
  listingInfo: ListingInfoProps;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  fromTime: Time;
  setFromTime: React.Dispatch<React.SetStateAction<Time>>;
  toTime: Time;
  setToTime: React.Dispatch<React.SetStateAction<Time>>;
  numberOfDays: number;
}) => {
  const router = useRouter();
  const costPerDay = listingInfo?.price;
  const serviceFee = 0;
  const totalCost = costPerDay * numberOfDays + serviceFee;
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <section className="sticky top-40 grid gap-6 rounded-md border border-[#DEDEDE] bg-[#F9F9F9] p-6">
      <p className="text-[#161616]">
        <span className="text-xl font-semibold text-[#343434]">
          {formatPrice(costPerDay, "NGN")}
        </span>{" "}
        per Day
      </p>

      <div className="flex w-full">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button className="grid flex-1 rounded-l-md border border-[#DEDEDE] p-2 text-left">
              <span className="text-[10px] font-semibold uppercase text-[#343434]">
                Start Date
              </span>
              <span className="text-sm font-semibold uppercase">
                {formatDateTime(date?.from, fromTime)}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <DateTimePicker
              date={date}
              setDate={setDate}
              fromTime={fromTime}
              setFromTime={setFromTime}
              toTime={toTime}
              setToTime={setToTime}
            />
          </PopoverContent>
        </Popover>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button className="grid flex-1 rounded-r-md border border-[#DEDEDE] p-2 text-left">
              <span className="text-[10px] font-semibold uppercase text-[#343434]">
                End Date
              </span>
              <span className="text-sm font-semibold uppercase">
                {formatDateTime(date?.to, toTime)}
              </span>
            </button>
          </PopoverTrigger>
        </Popover>
      </div>

      <div>
        <Button
          type="button"
          className="h-auto w-full !p-3"
          style={{
            background: "linear-gradient(90deg, #1045E4 0%, #09267E 100%)",
          }}
          disabled={!date?.from || !date?.to}
          onClick={() => {
            router.push(
              `${`${webRoutes.checkout}?id=${listingInfo?.id}&startDate=${date?.from?.toLocaleDateString()}&endDate=${date?.to?.toLocaleDateString()}`}`,
            );
          }}
        >
          Proceed to Checkout
        </Button>
        <p className="mt-3 text-center text-sm leading-[16px] text-[#73A90D]">
          No payment required yet
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <p className="flex justify-between space-x-4 text-[#454545]">
          <span>
            {formatPrice(costPerDay, "NGN")} x {numberOfDays} days
          </span>{" "}
          <span>{formatPrice(totalCost, "NGN")}</span>
        </p>
        <p className="flex justify-between space-x-4 text-[#454545]">
          <span>Service Fee</span> <span>{formatPrice(serviceFee, "NGN")}</span>
        </p>

        <hr className="my-6 border border-[#EBEBEB]" />

        <p className="flex justify-between space-x-4 font-semibold text-[#454545]">
          <span>Total</span> <span>{formatPrice(totalCost, "NGN")}</span>
        </p>
      </div>
    </section>
  );
};

export default Summary;
