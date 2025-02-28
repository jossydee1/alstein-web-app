import React from "react";
import photo from "@/public/images/business.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { BadgeCheck } from "lucide-react";

const Details = () => {
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
          <Button
            variant="ghost"
            className="p-0 !py-0 text-sm font-medium text-[#8B8B8B]"
          >
            View Profile
          </Button>
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
        <p className="text-[#343434]">Mar 12, 2024 - Mar 14, 2024</p>
        <p>Calendar goes here</p>
      </section>
    </article>
  );
};

export default Details;
