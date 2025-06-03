import { FlaskConical, GraduationCap, ToyBrick } from "lucide-react";
import React from "react";
import collab from "@/public/images/about/collab.svg";
import Image from "next/image";

const Services = () => {
  return (
    <div className="section-container">
      <section className="space-y-12">
        <div className="mx-auto max-w-[670px] space-y-2.5 text-center">
          <h2 className="text-4xl font-bold text-blue-950">
            What You Can Do on Alstein
          </h2>
          <p className="text-2xl leading-8 text-[#6B7280]">
            Empower your research and innovation journey with seamless access to
            cutting-edge laboratory equipment, expert collaboration, and
            comprehensive support
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 text-left md:grid-cols-2">
          <div className="space-y-7 rounded-[30px] bg-[#F5F5F5] px-7 py-20">
            <div className="flex items-center justify-start gap-2.5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 p-3">
                <FlaskConical size={36} className="text-white" />
              </div>
              <h3 className="max-w-[230px] text-left text-2xl font-semibold text-blue-950">
                Book Laboratory Equipment
              </h3>
            </div>
            <p className="text-2xl text-blue-950">
              Instantly find and reserve advanced scientific equipment for
              research, testing, prototyping, and product development.
            </p>
          </div>
          <div className="space-y-7 rounded-[30px] bg-[#F5F5F5] px-7 py-20">
            <div className="flex items-center justify-start gap-2.5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 p-3">
                <ToyBrick size={36} className="text-white" />
              </div>
              <h3 className="max-w-[230px] text-left text-2xl font-semibold text-blue-950">
                Access Diagnostic Equipment
              </h3>
            </div>
            <p className="text-2xl text-blue-950">
              Alstein connects you to diagnostic equipment for clinics, labs,
              and mobile initiatives—on-demand and affordable.
            </p>
          </div>
          <div className="space-y-7 rounded-[30px] bg-[#F5F5F5] px-7 py-20">
            <div className="flex items-center justify-start gap-2.5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 p-3">
                <Image src={collab} alt="" width="36" height="36" />
              </div>
              <h3 className="max-w-[230px] text-left text-2xl font-semibold text-blue-950">
                Collaborate & Co-Innovate
              </h3>
            </div>
            <p className="text-2xl text-blue-950">
              Connect with researchers, clinicians, engineers, and innovators
              tackling some of the world&apos;s biggest challenges.
            </p>
          </div>
          <div className="space-y-7 rounded-[30px] bg-[#F5F5F5] px-7 py-20">
            <div className="flex items-center justify-start gap-2.5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 p-3">
                <GraduationCap size={36} className="text-white" />
              </div>
              <h3 className="max-w-[230px] text-left text-2xl font-semibold text-blue-950">
                Learn & Grow
              </h3>
            </div>
            <p className="text-2xl text-blue-950">
              Explore curated learning paths in diagnostics, robotics, AI, lab
              automation, and scientific entrepreneurship
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
