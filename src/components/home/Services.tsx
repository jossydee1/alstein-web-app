"use client";

import React from "react";
import Link from "next/link";
import { webRoutes } from "@/utils";
import { servicesData } from "@/database/servicesData";
import { ServicesList } from "../common";

const Services = () => {
  return (
    <div className="bg-white">
      <section className="section-container">
        <div>
          <div className="mb-2.5 flex items-center justify-center gap-2.5 text-brandColor">
            <hr className="w-[22px] border-2 border-brandColor" />
            <span className="text-lg font-medium uppercase">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-center text-[40px] font-normal leading-[48px]">
            Find the Right Equipment & Service for Your Needs
          </h2>

          <ServicesList services={servicesData} />
        </div>

        <div className="mt-[64px] flex justify-center">
          <Link
            href={webRoutes.services}
            className="h-auto rounded-md bg-brandColor px-[74px] py-4 font-Groteskbold text-lg font-normal text-white"
          >
            View All
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
