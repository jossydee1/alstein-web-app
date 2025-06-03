import Image from "next/image";
import React from "react";
import image3 from "@/public/images/about/about-image-3.png";

const WhoWeServe = () => {
  return (
    <div className="section-container">
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-blue-950">Who We Serve</h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2.5">
            <h3 className="max-w-[250px] text-2xl font-semibold text-blue-950">
              Scientists & Researchers
            </h3>
            <Image
              src={image3}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="max-w-[250px] text-2xl font-semibold text-blue-950">
              Medical Professionals & Diagnostic Labs
            </h3>
            <Image
              src={image3}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="max-w-[250px] text-2xl font-semibold text-blue-950">
              Hardware & Health-tech Startups
            </h3>
            <Image
              src={image3}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="max-w-[250px] text-2xl font-semibold text-blue-950">
              Universities & Innovation Hubs
            </h3>
            <Image
              src={image3}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="max-w-[250px] text-2xl font-semibold text-blue-950">
              Public Health Projects & NGOs
            </h3>
            <Image
              src={image3}
              alt=""
              width="276"
              height="276"
              className="aspect-video h-auto w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="space-y-2.5">
            <h3 className="max-w-[250px] text-2xl font-semibold text-blue-950">
              Development Agencies & Donors
            </h3>
            <Image
              src={image3}
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
