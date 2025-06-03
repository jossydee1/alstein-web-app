import Image from "next/image";
import React from "react";
import scientist from "@/public/images/about/scientist.jpg";
import professionals from "@/public/images/about/professionals.jpg";
import hardware from "@/public/images/about/hardware.jpg";
import universities from "@/public/images/about/universities.jpg";
import health from "@/public/images/about/health.jpg";
import agencies from "@/public/images/about/agencies.jpg";

const WhoWeServe = () => {
  return (
    <div className="section-container">
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-blue-950">Who We Serve</h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2.5">
            <h3 className="text-2xl font-semibold text-blue-950 md:max-w-[250px]">
              Scientists & Researchers
            </h3>
            <Image
              src={scientist}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="text-2xl font-semibold text-blue-950 md:max-w-[250px]">
              Medical Professionals & Diagnostic Labs
            </h3>
            <Image
              src={professionals}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="text-2xl font-semibold text-blue-950 md:max-w-[250px]">
              Hardware & Health-tech Startups
            </h3>
            <Image
              src={hardware}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="text-2xl font-semibold text-blue-950 md:max-w-[250px]">
              Universities & Innovation Hubs
            </h3>
            <Image
              src={universities}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="text-2xl font-semibold text-blue-950 md:max-w-[250px]">
              Public Health Projects & NGOs
            </h3>
            <Image
              src={health}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="text-2xl font-semibold text-blue-950 md:max-w-[250px]">
              Development Agencies & Donors
            </h3>
            <Image
              src={agencies}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeServe;
