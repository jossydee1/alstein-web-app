"use client";
import React from "react";
import photo from "@/public/images/business.png";
import Image from "next/image";
import { BadgeCheck, Clock } from "lucide-react";
import Link from "next/link";
import { webRoutes } from "@/utils";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

const Details = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const [fromTime, setFromTime] = React.useState({
    hours: "09",
    minutes: "00",
  });
  const [toTime, setToTime] = React.useState({ hours: "17", minutes: "00" });

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
          <p>
            Reliable and accurate equipment for testing blood sugar levels,
            ideal for clinical and personal use. This state-of-the-art analyzer
            delivers precise results within seconds, ensuring high reliability
            for diagnostic and monitoring purposes.
          </p>
          <ul className="mt-4 list-inside list-disc">
            <li>Measurement Range: 20-600 mg/dL</li>
            <li>Power Source: Battery-operated (4x AA)</li>
            <li>Accuracy: ±5%</li>
            <li>Dimensions: 15cm x 10cm x 5cm</li>
            <li>Weight: 500g</li>
          </ul>
        </div>
      </section>

      <section className="business mt-16 flex items-center justify-between gap-4 rounded-md border p-4">
        <div className="flex items-center gap-3">
          <Image
            src={photo}
            alt="Business"
            className="h-[65px] w-[65px] rounded-full bg-[#ddd] object-cover"
          />
          <div>
            <h3 className="mb-2 text-xl font-semibold text-[#161616]">
              HealthPro Labs
            </h3>
            <p className="font-medium text-[#8B8B8B]">
              Partner- 3 Listing. Verified
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between gap-2">
          <p className="flex items-center gap-1 text-sm font-medium text-[#8B8B8B]">
            <BadgeCheck className="fill-brandColor text-white" />
            Verified Partner
          </p>
          <Link
            href={`${webRoutes.partners}/healthpro-labs`}
            className="p-0 !py-0 text-sm font-medium text-[#8B8B8B] transition-all hover:bg-transparent hover:text-neutral-800 hover:underline"
          >
            View Profile
          </Link>
        </div>
      </section>

      <hr className="my-[57px] border border-[#EBEBEB]" />

      <section>
        <h2 className="font-500 mb-4 text-2xl">Availability</h2>
        <ul className="flex gap-5">
          {["For Rent", "On-Site User", "For Lease"].map(item => (
            <li
              key={item}
              className="rounded-md border border-[#676767] px-6 py-1.5 text-[#7A7A7A]"
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="my-[57px] border border-[#EBEBEB]" />

      <section className="mb-[57px]">
        <h2 className="font-500 mb-4 text-2xl">Schedule</h2>
        <div className="mb-4 flex flex-col gap-2">
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
              numberOfMonths={2}
            />
          </div>
        </div>
      </section>
    </article>
  );
};

export default Details;
