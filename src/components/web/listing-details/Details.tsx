"use client";
import React from "react";
import Image from "next/image";
import { BadgeCheck, Building2, Clock } from "lucide-react";
import Link from "next/link";
import { webRoutes } from "@/utils";
import { Calendar } from "@/components/ui/calendar";
import { ListingInfoProps } from "@/types";
import { DateRange } from "react-day-picker";

type Time = {
  hours: string;
  minutes: string;
};

const Details = ({
  listingInfo,
  date,
  setDate,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
}: {
  listingInfo: ListingInfoProps;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  fromTime: Time;
  setFromTime: React.Dispatch<React.SetStateAction<Time>>;
  toTime: Time;
  setToTime: React.Dispatch<React.SetStateAction<Time>>;
}) => {
  // Create time options
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const formatDateTime = (
    date: Date | undefined,
    time: { hours: string; minutes: string },
  ) => {
    if (!date) return "";
    return `${date.toLocaleDateString()} at ${time.hours}:${time.minutes}`;
  };

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
                      setFromTime(prev => ({ ...prev, hours: e.target.value }))
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
                <span className="text-sm font-medium text-[#676767]">To:</span>
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
                      setToTime(prev => ({ ...prev, minutes: e.target.value }))
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
        </div>
      </section>
    </article>
  );
};

export default Details;
