"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils";

const Summary = () => {
  return (
    <section className="sticky top-40 grid gap-6 rounded-md border border-[#DEDEDE] bg-[#F9F9F9] p-6">
      <p className="text-[#161616]">
        <span className="text-xl font-semibold text-[#343434]">#3000</span> per
        Day
      </p>

      <div className="border border-[#DEDEDE] p-4">
        <p className="text-xs font-semibold uppercase text-[#343434]">
          Booking Date
        </p>
        <p className="text-sm text-[#454545]">Mar 12, 2024 - Mar 14, 2024 </p>
      </div>

      <div>
        <Button
          type="button"
          className="h-auto w-full !p-3"
          style={{
            background: "linear-gradient(90deg, #1045E4 0%, #09267E 100%)",
          }}
        >
          Book Now
        </Button>
        <p className="mt-3 text-center text-sm leading-[16px] text-[#73A90D]">
          No payment required yet
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <p className="flex justify-between text-[#454545]">
          <span>#3000 x 2days</span> <span>{formatPrice(6000, "NGN")}</span>
        </p>
        <p className="flex justify-between text-[#454545]">
          <span>Service Fee</span> <span>{formatPrice(0, "NGN")}</span>
        </p>

        <hr className="my-6 border border-[#EBEBEB]" />

        <p className="flex justify-between font-semibold text-[#454545]">
          <span>Total</span> <span>{formatPrice(6000, "NGN")}</span>
        </p>
      </div>
    </section>
  );
};

export default Summary;
