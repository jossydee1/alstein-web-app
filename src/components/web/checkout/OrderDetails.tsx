"use client";

import { ListingProps } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  authRoutes,
  webRoutes,
  formatPrice,
  formatDateTime,
  DOCUMENT_URL,
} from "@/utils";
import { Edit3 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaystackConsumer } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { useRouter } from "next/navigation";
import DateTimePicker from "@/components/common/DateTimePicker";
import { useDateTime } from "@/context/DateTimeContext";

const OrderDetails = ({
  listingInfo,
  costPerDay,
  serviceFee,
  paystackProps,
  isPaystackDisabled,
  user,
  onInitiateBooking,
  paystackTrigger,
}: {
  listingInfo: ListingProps;
  costPerDay: number;
  serviceFee: number;
  paystackProps: PaystackProps;
  isPaystackDisabled: boolean;
  user: boolean;
  onInitiateBooking: () => Promise<void>;
  paystackTrigger: boolean;
}) => {
  const router = useRouter();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const {
    date,
    setDate,
    fromTime,
    setFromTime,
    toTime,
    setToTime,
    numberOfDays,
    isPerSample,
    setIsPerSample,
    numberOfSamples,
    setNumberOfSamples,
  } = useDateTime();
  const initializePaymentRef = useRef<(() => void) | null>(null);

  // Set isPerSample based on listingInfo
  useEffect(() => {
    setIsPerSample(listingInfo?.bill_type === "per_Sample");
  }, [listingInfo?.bill_type, setIsPerSample]);

  // Handle single date logic
  const singleDate = isPerSample
    ? date && "from" in date
      ? date.from
      : (date as Date | undefined)
    : undefined;
  const singleSetDate = (d: Date | undefined) => {
    if (d) {
      setDate({ from: d, to: d });
    } else {
      setDate(undefined);
    }
  };

  // Calculate total cost
  const computedTotalCost = isPerSample
    ? costPerDay * (numberOfSamples || 1) + serviceFee
    : costPerDay * numberOfDays + serviceFee;

  const handleCheckoutRedirect = () => {
    if (!user) {
      // Redirect to login with a redirect URL back to the listing page
      const redirectUrl = `${webRoutes?.listings}/${listingInfo?.id}`;
      router.push(
        `${authRoutes?.login}?redirect=${encodeURIComponent(redirectUrl)}`,
      );
    }
  };

  // When paystackTrigger becomes true, call initializePayment
  useEffect(() => {
    if (paystackTrigger && initializePaymentRef.current) {
      initializePaymentRef.current();
    }
  }, [paystackTrigger]);

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
          <div className="w-1/2 rounded-l-lg">
            <Image
              src={DOCUMENT_URL + listingInfo?.equipment_file[0]?.path}
              alt={listingInfo?.name}
              width={100}
              height={100}
              className="max-h-[150px] w-full rounded-l-lg bg-neutral-50 object-cover"
            />
          </div>
          <div className="w-1/2">
            <h3 className="mb-4 font-semibold uppercase text-[#172554]">
              {listingInfo?.name}
            </h3>
            <p className="text-[#6B7280]">
              {listingInfo?.description.slice(0, 150)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="flex justify-between space-x-4 text-[#454545]">
          <span className="font-medium text-[#6B7280]">
            {isPerSample ? "Date" : "Date Range"}
          </span>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger className="inline-flex items-center gap-1">
              <span className="text-right font-medium text-[#172554]">
                {isPerSample
                  ? singleDate
                    ? formatDateTime(singleDate as Date).replace(/ at .*/i, "")
                    : "Select date"
                  : `${formatDateTime(date?.from, fromTime)} - ${formatDateTime(
                      date?.to,
                      toTime,
                    )}`}
              </span>
              <Edit3 size={16} color="#172554" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              {isPerSample ? (
                <DateTimePicker
                  date={singleDate}
                  setDate={singleSetDate}
                  fromTime={fromTime}
                  setFromTime={setFromTime}
                  toTime={toTime}
                  setToTime={setToTime}
                  isSingleDate={true}
                />
              ) : (
                <DateTimePicker
                  date={date}
                  setDate={setDate}
                  fromTime={fromTime}
                  setFromTime={setFromTime}
                  toTime={toTime}
                  setToTime={setToTime}
                  isSingleDate={false}
                />
              )}
            </PopoverContent>
          </Popover>
        </p>
        {isPerSample && setNumberOfSamples && (
          <p className="flex justify-between space-x-4 text-[#454545]">
            <span className="font-medium text-[#6B7280]">
              Number of Samples
            </span>
            <input
              type="number"
              min={1}
              value={numberOfSamples}
              onChange={e =>
                setNumberOfSamples(Math.max(1, Number(e.target.value)))
              }
              className="w-24 rounded-md border border-gray-300 px-2 py-1 text-right text-sm outline-none"
            />
          </p>
        )}
        <p className="flex justify-between space-x-4 text-[#454545]">
          <span className="font-medium text-[#6B7280]">
            {isPerSample
              ? `${formatPrice(costPerDay, "NGN")} x ${numberOfSamples} samples`
              : `${formatPrice(costPerDay, "NGN")} x ${numberOfDays} days`}
          </span>
          <span className="font-medium text-[#172554]">
            {formatPrice(computedTotalCost, "NGN")}
          </span>
        </p>

        <hr className="my-6 border border-[#EBEBEB]" />

        <p className="flex justify-between space-x-4 font-semibold text-[#454545]">
          <span className="font-medium text-[#6B7280]">Total</span>{" "}
          <span className="font-medium text-[#172554]">
            {formatPrice(computedTotalCost, "NGN")}
          </span>
        </p>
      </div>

      {user ? (
        <>
          <button
            className="h-auto w-full rounded-[15px] bg-[#2563EB] !p-3 text-white ring-2 ring-[#3B82F640] disabled:cursor-not-allowed disabled:bg-[#3B82F640] disabled:text-[#3B82F6] disabled:opacity-50 disabled:ring-[#3B82F640]"
            disabled={isPaystackDisabled}
            onClick={onInitiateBooking}
            type="button"
          >
            Complete Booking
          </button>
          {/* Hidden PaystackConsumer, triggers payment programmatically */}
          <div style={{ display: "none" }}>
            <PaystackConsumer {...paystackProps}>
              {({ initializePayment }) => {
                initializePaymentRef.current = initializePayment;
                return <span />;
              }}
            </PaystackConsumer>
          </div>
        </>
      ) : (
        <button
          className="h-auto w-full rounded-[15px] bg-[#2563EB] !p-3 text-white ring-2 ring-[#3B82F640] disabled:cursor-not-allowed disabled:bg-[#3B82F640] disabled:text-[#3B82F6] disabled:opacity-50 disabled:ring-[#3B82F640]"
          disabled={isPaystackDisabled}
          onClick={handleCheckoutRedirect}
          type="button"
        >
          Login to pay
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
