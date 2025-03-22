"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils";
import { ListingInfoProps } from "@/types";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Summary = ({
  listingInfo,
  date,
  setDate,
  numberOfDays,
}: {
  listingInfo: ListingInfoProps;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  numberOfDays: number;
}) => {
  const costPerDay = listingInfo?.price / 100;
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
                {date?.from?.toLocaleDateString()}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={date}
              onSelect={newDate => {
                setDate(newDate);
              }}
              numberOfMonths={2}
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
                {date?.to?.toLocaleDateString()}
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
