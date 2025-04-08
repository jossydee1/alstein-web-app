"use client";

import { ListingProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import image from "@/public/images/doctor.png";
import { authRoutes, webRoutes, formatPrice } from "@/utils";
import { Clock, Edit3 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaystackButton } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { useRouter } from "next/navigation";

type Time = {
  hours: string;
  minutes: string;
};

const OrderDetails = ({
  listingInfo,
  numberOfDays,
  date,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  setDate,
  costPerDay,
  serviceFee,
  totalCost,
  paystackProps,
  isPaystackDisabled,
  user,
  address,
}: {
  listingInfo: ListingProps;
  numberOfDays: number;
  date: DateRange | undefined;
  fromTime: Time;
  setFromTime: React.Dispatch<React.SetStateAction<Time>>;
  toTime: Time;
  setToTime: React.Dispatch<React.SetStateAction<Time>>;
  setDate: (date: DateRange | undefined) => void;
  costPerDay: number;
  serviceFee: number;
  totalCost: number;
  paystackProps: PaystackProps;
  isPaystackDisabled: boolean;
  address: string;
  user: boolean;
}) => {
  const router = useRouter();
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

  const redirectUrl = `${authRoutes.login}?redirect=${encodeURIComponent(`${webRoutes.checkout}?id=${listingInfo.id}&address=${address}&startDate=${date?.from?.toLocaleDateString()}&endDate=${date?.to?.toLocaleDateString()}`)}`;

  return (
    <div className="dashboard-section-card space-y-8">
      <header className="">
        <h2 className="mb-3 text-lg font-semibold text-[#172554]">
          Proceed for seamless transactions.
        </h2>
        <p className="text-[#6B7280]">
          Your payment details are encrypted and safely stored for future
          withdrawals and purchases
        </p>
      </header>

      <div>
        <h2 className="mb-5 text-lg font-semibold text-[#172554]">
          Order Review
        </h2>

        <div className="flex gap-5">
          <Image
            src={image}
            alt={listingInfo?.name}
            width={100}
            height={100}
            className="h-auto w-full rounded-l-lg object-cover"
          />
          <div>
            <h3 className="mb-4 font-semibold uppercase text-[#172554]">
              {listingInfo.name}
            </h3>
            <p className="text-[#6B7280]">
              {listingInfo.description.slice(0, 150)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="flex justify-between space-x-4 text-[#454545]">
          <span className="font-medium text-[#6B7280]">Date</span>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger className="inline-flex items-center gap-1">
              <span className="font-medium text-[#172554]">
                {formatDateTime(date?.from, fromTime)} -{" "}
                {formatDateTime(date?.to, toTime)}
              </span>

              <Edit3 size={16} color="#172554" />
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
                          setToTime(prev => ({
                            ...prev,
                            hours: e.target.value,
                          }))
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
        </p>
        <p className="flex justify-between space-x-4 text-[#454545]"></p>
        <p className="flex justify-between space-x-4 text-[#454545]">
          <span className="font-medium text-[#6B7280]">
            {formatPrice(costPerDay, "NGN")} x {numberOfDays} days
          </span>{" "}
          <span className="font-medium text-[#172554]">
            {formatPrice(totalCost, "NGN")}
          </span>
        </p>
        <p className="flex justify-between space-x-4 text-[#454545]">
          <span className="font-medium text-[#6B7280]">Service Fee</span>{" "}
          <span className="font-medium text-[#172554]">
            {formatPrice(serviceFee, "NGN")}
          </span>
        </p>

        <hr className="my-6 border border-[#EBEBEB]" />

        <p className="flex justify-between space-x-4 font-semibold text-[#454545]">
          <span className="font-medium text-[#6B7280]">Total</span>{" "}
          <span className="font-medium text-[#172554]">
            {formatPrice(totalCost, "NGN")}
          </span>
        </p>
      </div>

      <div className="rounded-md bg-orange-50 p-4 font-medium text-orange-600">
        <p>
          Note: A refundable ₦50 will be charged to verify your card. Payment is
          only deducted upon booking completion.
        </p>
      </div>
      {user ? (
        <PaystackButton
          {...paystackProps}
          className="h-auto w-full rounded-[15px] bg-[#2563EB] !p-3 text-white ring-2 ring-[#3B82F640] disabled:cursor-not-allowed disabled:bg-[#3B82F640] disabled:text-[#3B82F6] disabled:opacity-50 disabled:ring-[#3B82F640]"
          disabled={!isPaystackDisabled}
        />
      ) : (
        <button
          className="h-auto w-full rounded-[15px] bg-[#2563EB] !p-3 text-white ring-2 ring-[#3B82F640] disabled:cursor-not-allowed disabled:bg-[#3B82F640] disabled:text-[#3B82F6] disabled:opacity-50 disabled:ring-[#3B82F640]"
          disabled={isPaystackDisabled}
          onClick={() => router.push(redirectUrl)}
          type="button"
        >
          Login to pay
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
