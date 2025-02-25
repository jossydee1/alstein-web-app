import {
  CalendarCheck,
  FlaskConical,
  MapPin,
  Microscope,
  Search,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/images/doctor.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header
        className="section-container"
        // className="mx-auto w-full max-w-screen-2xl px-[24px] py-[40px] md:px-[50px] md:py-[40px] lg:px-[100px] lg:py-[66px] xl:px-[150px] xl:py-[88px]"
      >
        <div className="w-full max-w-[700px]">
          <section className="mb-20">
            <h1 className="leading-[72px mb-[30px] text-[57px] font-bold">
              Book Scientific and Diagnostic Laboratory Services
            </h1>
            <p className="max-w-[427px] text-2xl leading-8">
              Simplifying access to medical diagnostics and research tools. Find
              Laboratories, and Research Equipment Near You.
            </p>
          </section>

          <section className="flex flex-col gap-8">
            <form className="flex max-w-screen-sm flex-col items-center justify-between gap-1 rounded-lg bg-white p-1 text-[#454545] md:flex-row md:gap-0">
              <label
                htmlFor="equipment"
                className="flex min-h-[54px] w-full flex-1 items-center gap-3 rounded-sm border border-[#909090] pl-6 md:rounded-none md:border-y-0 md:border-l-0 md:border-r md:border-r-[#909090]"
              >
                <Microscope size="24" className="" />
                <input
                  className="w-full border-none p-0 focus:outline-none focus:ring-0"
                  type="text"
                  name="equipment"
                  id="equipment"
                  required
                  placeholder="Equipment/Analysis Name"
                />
              </label>
              <label
                htmlFor="region"
                className="flex min-h-[54px] w-full flex-1 items-center gap-3 rounded-sm border border-[#909090] pl-6 md:border-none"
              >
                <MapPin size="24" />
                <input
                  className="w-full border-none p-0 focus:outline-none focus:ring-0"
                  type="text"
                  name="region"
                  id="region"
                  required
                  placeholder="Any Region"
                />
              </label>

              <Button className="flex min-h-[54px] w-full items-center justify-center bg-brandColor px-6 py-4 md:w-auto">
                <Search size="40" className="" />
              </Button>
            </form>

            <div className="flex flex-wrap gap-5 md:gap-11">
              <div
                className="inline-flex items-center justify-between gap-4 rounded-lg px-6 py-4"
                style={{
                  backdropFilter: "blur(24px)",
                  background: "#FFFFFF29",
                }}
              >
                <div>
                  <p className="text-[64px] font-light leading-none">27</p>
                  <h2 className="text-lg leading-none">Partner Labs</h2>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DEDEDE] text-[#494A4A]">
                  <FlaskConical size="32" />
                </div>
              </div>

              <div
                className="inline-flex items-center justify-between gap-4 rounded-lg px-6 py-4"
                style={{
                  backdropFilter: "blur(24px)",
                  background: "#FFFFFF29",
                }}
              >
                <div>
                  <p className="text-[64px] font-light leading-none">537</p>
                  <h2 className="text-lg leading-none">Successful Bookings</h2>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DEDEDE] text-[#494A4A]">
                  <CalendarCheck size="32" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
};

export default Hero;
