"use client";
import React from "react";
import Image from "next/image";
import { BadgeCheck, Building2 } from "lucide-react";
import Link from "next/link";
import { formatDateTime, webRoutes } from "@/utils";
import { ListingInfoProps } from "@/types";
import DateTimePicker from "@/components/common/DateTimePicker";
import { useDateTime } from "@/context/DateTimeContext";

const Details = ({ listingInfo }: { listingInfo: ListingInfoProps }) => {
  const { date, setDate, fromTime, setFromTime, toTime, setToTime } =
    useDateTime();
  return (
    <article>
      <section className="description">
        <h2 className="font-500 mb-4 text-2xl">Equipment Specifications:</h2>
        <div className="text-[#343434]">
          <p>{listingInfo?.description}</p>
          <ul className="mt-4 list-inside list-disc">
            {listingInfo?.specifications.map(spec => (
              <li key={spec.id}>{spec.specification}</li>
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
            <p className="font-medium text-[#8B8B8B]">3 Listings</p>
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
            href={`${webRoutes.partners}/${listingInfo?.partner?.id}`}
            className="p-0 !py-0 text-sm font-medium text-[#8B8B8B] underline transition-all hover:bg-transparent hover:text-neutral-800"
          >
            View Profile
          </Link>
        </div>
      </section>

      <hr className="my-[57px] border border-[#EBEBEB]" />

      <section>
        <h2 className="font-500 mb-4 text-2xl">Service Type</h2>
        <p className="w-fit rounded-md border border-[#676767] px-6 py-1.5 capitalize text-[#7A7A7A]">
          <span>{listingInfo?.service_type}</span>
        </p>
      </section>

      <hr className="my-[57px] border border-[#EBEBEB]" />

      <section className="mb-[57px]">
        <h2 className="font-500 text-2xl">
          {!date ? "Select Booking Date" : "Booking Date"}
        </h2>
        <div className="flex flex-col gap-2">
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
            />
          </div>
        </div>
      </section>
    </article>
  );
};

export default Details;
