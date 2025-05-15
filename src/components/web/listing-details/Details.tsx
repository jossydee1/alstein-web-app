"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { BadgeCheck, Building2 } from "lucide-react";
import Link from "next/link";
import { formatDateTime, webRoutes } from "@/utils";
import { ListingInfoProps } from "@/types";
import DateTimePicker from "@/components/common/DateTimePicker";
import { useDateTime } from "@/context/DateTimeContext";

const Details = ({
  listingInfo,
  listingCount,
}: {
  listingInfo: ListingInfoProps;
  listingCount: number;
}) => {
  const {
    date,
    setDate,
    fromTime,
    setFromTime,
    toTime,
    setToTime,
    isPerSample,
    setIsPerSample,
  } = useDateTime();

  useEffect(() => {
    setIsPerSample(listingInfo?.bill_type === "per_Sample");
  }, [listingInfo?.bill_type, setIsPerSample]);

  // Fix: Ensure correct date/setDate types for DateTimePicker
  const singleDate = isPerSample
    ? date && "from" in date
      ? date.from
      : (date as Date | undefined)
    : undefined;
  const singleSetDate = (d: Date | undefined) => {
    // Always store as DateRange for context
    if (d) {
      setDate({ from: d, to: d });
    } else {
      setDate(undefined);
    }
  };

  return (
    <article>
      <section className="description">
        <h2 className="font-500 mb-4 text-2xl">Equipment Specifications:</h2>
        <div className="text-[#343434]">
          <p>{listingInfo?.description}</p>
          <ul className="mt-4 list-inside list-disc">
            <li>Brand: {listingInfo?.brand || "N/A"}</li>
            {listingInfo?.specifications.map(spec => (
              <li key={spec?.id}>{spec?.specification}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="business mt-16 flex items-end justify-between gap-4 rounded-md border p-4">
        <div className="flex items-center gap-3">
          {listingInfo?.partner?.logo ? (
            <Image
              src={listingInfo?.partner?.logo}
              alt="Business"
              className="h-[65px] w-[65px] rounded-full bg-[#ddd] object-cover"
            />
          ) : (
            <div className="flex h-[65px] w-[65px] items-center justify-center rounded-full bg-[#ddd]">
              <Building2 size={32} color="#676767" />
            </div>
          )}
          <div>
            <h3 className="mb-2 text-xl font-semibold text-[#161616]">
              {listingInfo?.partner?.name}
            </h3>
            <p className="font-medium text-[#8B8B8B]">
              {listingCount} Listings
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between gap-2">
          {!listingInfo?.partner?.is_verified && (
            <p className="flex items-center gap-1 text-sm font-medium text-[#8B8B8B]">
              <BadgeCheck className="fill-brandColor text-white" />
              Verified Partner
            </p>
          )}
          <Link
            href={`${webRoutes?.partners}/${listingInfo?.partner?.id}`}
            className="p-0 !py-0 text-sm font-medium text-[#8B8B8B] underline transition-all hover:bg-transparent hover:text-neutral-800"
          >
            View Profile
          </Link>
        </div>
      </section>

      <hr className="my-[57px] border border-[#EBEBEB]" />

      <section>
        <h2 className="font-500 mb-4 text-2xl">Service And Billing Type</h2>
        <div className="flex flex-wrap gap-4">
          <p className="w-fit rounded-md border border-[#676767] px-6 py-1.5 capitalize text-[#7A7A7A]">
            <span>{listingInfo?.service_type?.replace(/_/g, " ")}</span>
          </p>
          <p className="w-fit rounded-md border border-[#676767] px-6 py-1.5 capitalize text-[#7A7A7A]">
            <span>Billed {listingInfo?.bill_type?.replace(/_/g, " ")}</span>
          </p>
        </div>
      </section>

      <hr className="my-[57px] border border-[#EBEBEB]" />

      <section className="mb-[57px]">
        <h2 className="font-500 text-2xl">
          {!date ? "Select Booking Date" : "Booking Date"}
        </h2>
        <div className="flex flex-col gap-2">
          {isPerSample ? (
            <>
              <p className="text-[#343434]">
                Date:{" "}
                {singleDate
                  ? formatDateTime(singleDate as Date).replace(/ at .*/i, "")
                  : "Not selected"}
              </p>
              <div className="rounded-md border">
                <DateTimePicker
                  date={singleDate}
                  setDate={singleSetDate}
                  fromTime={fromTime}
                  setFromTime={setFromTime}
                  toTime={toTime}
                  setToTime={setToTime}
                  isSingleDate={true}
                />
              </div>
            </>
          ) : (
            <>
              <p className="text-[#343434]">
                From: {formatDateTime(date?.from, fromTime)} - To:{" "}
                {formatDateTime(date?.to, toTime)}
              </p>

              <div className="rounded-md border">
                <DateTimePicker
                  date={date}
                  setDate={setDate}
                  fromTime={fromTime}
                  setFromTime={setFromTime}
                  toTime={toTime}
                  setToTime={setToTime}
                  isSingleDate={false}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </article>
  );
};

export default Details;
