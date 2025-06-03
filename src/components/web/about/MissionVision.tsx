import React from "react";
import mission from "@/public/images/about/mission.svg";
import vision from "@/public/images/about/vision.svg";
import Image from "next/image";

const MissionVision = () => {
  return (
    <div className="section-container">
      <section className="grid grid-cols-1 gap-x-5 gap-y-10 text-center md:grid-cols-2">
        <div className="space-y-2.5">
          <div className="flex items-center justify-center gap-2.5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-50 p-2">
              <Image src={mission} alt="" width="48" height="48" />
            </div>
            <h2 className="text-5xl font-semibold text-blue-950">
              Our Mission
            </h2>
          </div>
          <p className="m-6 text-2xl text-[#6B7280]">
            To democratize access to diagnostic technologies, scientific tools,
            and innovation ecosystems— driving research, smarter healthcare, and
            inclusive growth across Africa and beyond.
          </p>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-center gap-2.5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-50 p-2">
              <Image src={vision} alt="" width="48" height="48" />
            </div>
            <h2 className="text-5xl font-semibold text-blue-950">Our Vision</h2>
          </div>
          <p className="m-6 text-2xl text-[#6B7280]">
            To become Africa&apos;s leading innovation platform for accessible,
            intelligent, and impactful science and healthcare
            technologies—fueling a healthier, smarter, and more resilient
            continent.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MissionVision;
