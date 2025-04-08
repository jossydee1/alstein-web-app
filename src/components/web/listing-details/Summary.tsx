"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice, webRoutes } from "@/utils";
import { ListingInfoProps } from "@/types";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

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

  const formatDateTime = (
    date: Date | undefined,
    time: { hours: string; minutes: string },
  ) => {
    if (!date) return "";
    return `${date.toLocaleDateString()} at ${time.hours}:${time.minutes}`;
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

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
            <div className="rounded-md border">
              <div className="mx-4 mt-2 flex flex-wrap gap-x-4 gap-y-2 border-b py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#676767]">
                    From:
                  </span>
                  <div className="flex items-center gap-1 p-1">
                    <Clock size={16} className="text-[#676767]" />
                    <select
                      value={fromTime.hours}
                      onChange={e =>
                        setFromTime(prev => ({
                          ...prev,
                          hours: e.target.value,
                        }))
                      }
                      className="w-14 rounded-md border-gray-300 px-1 py-0.5 text-sm outline-none"
                    >
                      {hours.map(h => (
                        <option key={`from-h-${h}`} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      value={fromTime.minutes}
                      onChange={e =>
                        setFromTime(prev => ({
                          ...prev,
                          minutes: e.target.value,
                        }))
                      }
                      className="w-14 rounded-md border-gray-300 px-1 py-0.5 text-sm outline-none"
                    >
                      {minutes.map(m => (
                        <option key={`from-m-${m}`} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#676767]">
                    To:
                  </span>
                  <div className="flex items-center gap-1 p-1">
                    <Clock size={16} className="text-[#676767]" />
                    <select
                      value={toTime.hours}
                      onChange={e =>
                        setToTime(prev => ({ ...prev, hours: e.target.value }))
                      }
                      className="w-14 rounded-md border-gray-300 px-1 py-0.5 text-sm outline-none"
                    >
                      {hours.map(h => (
                        <option key={`to-h-${h}`} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      value={toTime.minutes}
                      onChange={e =>
                        setToTime(prev => ({
                          ...prev,
                          minutes: e.target.value,
                        }))
                      }
                      className="w-14 rounded-md border-gray-300 px-1 py-0.5 text-sm outline-none"
                    >
                      {minutes.map(m => (
                        <option key={`to-m-${m}`} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                classNames={
                  {
                    // day_selected: `bg-gray-50 border-gray-50 text-gray-400 rounded-none `,
                  }
                }
                numberOfMonths={2}
              />
            </div>
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
