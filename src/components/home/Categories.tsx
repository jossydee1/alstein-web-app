import Image from "next/image";
import React from "react";
import arrow from "@/public/icons/long-arrow.svg";
import users from "@/public/icons/user-group-03.svg";
import { Button } from "../ui/button";

const Categories = () => {
  const STYLES = {
    card: "min-w-[260px] max-w-[260px] rounded-2xl px-4 py-7 text-white relative overflow-hidden",
    title: "mb-4 mt-3 text-[32px] leading-[40px]",
    lists: "list-inside list-disc",
  };

  const categories = [
    {
      title: "Medical and Clinical",
      bgImage: "url('/images/doctor.png')",
      lists: [
        "Laboratory Analyzers",
        "Patient Monitoring",
        "Devices Diagnostic",
        "Machines (e.g., ECG, X-Ray)",
      ],
      partners: 20,
      url: "#",
    },
    {
      title: "Dental",
      bgImage: "url('/images/doctor.png')",
      lists: [
        "Dental Chairs",
        "Dental Units",
        "Dental X-Ray Machines",
        "Dental Autoclaves",
      ],
      partners: 20,
      url: "#",
    },
    {
      title: "Veterinary",
      bgImage: "url('/images/doctor.png')",
      lists: [
        "Veterinary Anesthesia",
        "Veterinary Monitors",
        "Veterinary X-Ray",
        "Veterinary Ultrasound",
      ],
      partners: 20,
      url: "#",
    },
    {
      title: "Research",
      bgImage: "url('/images/doctor.png')",
      lists: [
        "Microscopes",
        "Centrifuges",
        "Laboratory Incubators",
        "Laboratory Ovens",
      ],
      partners: 20,
      url: "#",
    },
  ];

  return (
    <div className="bg-white">
      <section className="section-container">
        <div className="flex items-center gap-2.5 text-brandColor">
          <hr className="w-[22px] border border-brandColor" />
          <span className="mb-2.5 text-lg font-medium uppercase">
            Our Top Categories
          </span>
        </div>
        <h2 className="text-[40px] font-normal leading-[48px]">
          Explore Popular Categories
        </h2>

        <div className="scrollbar-hide mt-8 flex w-full flex-nowrap gap-7 overflow-x-auto">
          <article className="min-w-[362px] max-w-[362px] rounded-2xl bg-[#181818] px-6 py-8 text-white">
            <h3 className="text-[36px] font-light leading-[48px]">
              Compare providers, view equipment&apos;s state and book
              appointments effortlessly.
            </h3>
            <div className="relative mt-[64px]">
              <Image src={arrow} alt="arrow right" />
            </div>
          </article>

          {categories.map(category => (
            <article
              key={category.title}
              className={STYLES.card}
              style={{
                backgroundImage: "url('/images/doctor.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h2 className={STYLES.title}>{category.title}</h2>
              <ul className={STYLES.lists}>
                {category.lists.map(list => (
                  <li key={list}>{list}</li>
                ))}
              </ul>

              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-[#00000080] p-3">
                <span className="flex items-center gap-1 text-[12px] leading-[13px] text-white">
                  <Image src={users} alt="arrow right" />
                  {category.partners} Partners
                </span>
                <Button className="rounded-md bg-[#7F7F7F] px-7 py-1.5 text-sm leading-[16px] text-white hover:bg-white hover:text-[#0F0F0F]">
                  View & Book
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
