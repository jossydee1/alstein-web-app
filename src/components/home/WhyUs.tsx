import { CalendarCheck, Handshake, ShieldCheck } from "lucide-react";
import React from "react";

const WhyUs = () => {
  const STYLES = {
    card: "rounded-md px-8 py-12 text-white",
    icon: "48",
    title: "mb-4 mt-3 text-[32px] leading-[40px]",
    description: "text-[#A4A4A4] text-[18px] leading-[20px]",
  };
  return (
    <div className="bg-white">
      <section className="section-container">
        <h2 className="text-[40px] font-normal leading-[48px]">
          Why Choose <span className="text-brandColor">Alstein?</span>
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <article
            className={STYLES.card}
            style={{
              background:
                "linear-gradient(59.63deg, #090909 1.29%, #6F6F6F 98.89%)",
            }}
          >
            <CalendarCheck size={STYLES.icon} />
            <h3 className={STYLES.title}>24/7 Booking Accessibility</h3>
            <p className={STYLES.description}>
              Schedule laboratory services at your convenience, day or night.
            </p>
          </article>

          <article
            className={STYLES.card}
            style={{
              background:
                "linear-gradient(241.02deg, #1045E4 3.54%, #09267E 97.5%)",
            }}
          >
            <ShieldCheck size={STYLES.icon} />
            <h3 className={STYLES.title}>
              Secure Payments & Insurance Integration
            </h3>
            <p className={STYLES.description}>
              Pay securely online and easily use your health insurance{" "}
            </p>
          </article>

          <article
            className={STYLES.card}
            style={{
              background:
                "linear-gradient(59.63deg, #090909 1.29%, #6F6F6F 98.89%)",
            }}
          >
            <Handshake size={STYLES.icon} />
            <h3 className={STYLES.title}>Trusted Laboratory Partners</h3>
            <p className={STYLES.description}>
              Connect with certified laboratories and diagnostic centers.{" "}
            </p>
          </article>
        </div>

        <div className="flex w-full justify-center">
          <div className="mx-auto mt-6 inline-flex gap-1.5 rounded-full bg-[#B1B1B180] p-2">
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-[#A6A6A6]"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
