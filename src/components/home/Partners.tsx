import Image from "next/image";
import React from "react";
import image from "@/public/images/doctor.png";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";

const Partners = () => {
  const partners = [
    {
      name: "Osmolality Measurement",
      equipment: "Membrane Osmometers",
      address: "2 Iyalla street Alausa Ikeja Lagos",
      count: 300,
      images: [
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
      ],
      ratings: 3,
      url: "#",
    },
    {
      name: "Osmolality Measurement",
      equipment: "Membrane Osmometers",
      address: "2 Iyalla street Alausa Ikeja Lagos",
      count: 300,
      images: [
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
      ],
      ratings: 3,
      url: "#",
    },
    {
      name: "Osmolality Measurement",
      equipment: "Membrane Osmometers",
      address: "2 Iyalla street Alausa Ikeja Lagos",
      count: 300,
      images: [
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
      ],
      ratings: 3,
      url: "#",
    },
    {
      name: "Osmolality Measurement",
      equipment: "Membrane Osmometers",
      address: "2 Iyalla street Alausa Ikeja Lagos",
      count: 300,
      images: [
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
        "url('/images/doctor.png')",
      ],
      ratings: 3,
      url: "#",
    },
  ];

  return (
    <div className="bg-white">
      <section className="section-container">
        <div className="mb-2.5 flex items-center justify-center gap-2.5 text-brandColor">
          <hr className="w-[22px] border-2 border-brandColor" />
          <span className="text-lg font-medium uppercase">
            Trusted Partners
          </span>
        </div>
        <h2 className="text-center text-[40px] font-normal leading-[48px]">
          Find the Right Equipment & Service for Your Needs
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {partners.map(p => (
            <article
              key={p.name}
              className="group grid gap-2 overflow-hidden rounded-md bg-[#F5F5F5] p-3 transition-shadow hover:bg-[#F5F5F5] hover:shadow-[0px_0px_16px_2px_#00000033]"
            >
              <div className="relative">
                <div className="absolute right-1.5 top-2.5 flex items-center rounded-lg bg-[#00000033] p-1 text-white">
                  <Star className="" fill="#FFD700" size={20} stroke="0" />
                  |30
                </div>
                <Image
                  src={image}
                  alt=""
                  className="aspect-[4.9/5] rounded-md"
                />
              </div>

              <div>
                <h3 className="pb-0.5 font-medium leading-[20px] text-[#161616]">
                  {p.name}
                </h3>
                <p className="mb-1 text-xs text-[#474747]">
                  Equipment: {p.equipment}
                </p>
                <p className="flex items-center gap-2.5 text-xs text-[#8B8B8B] transition-colors group-hover:text-brandColor">
                  <MapPin size="12" /> {p.address}
                </p>

                <p className="mb-4 text-[#161616]">#{p.count} Day</p>

                <Link
                  href={p.url}
                  className="rounded-md bg-[#7F7F7F] px-7 py-1.5 text-sm leading-[16px] text-white transition-colors group-hover:bg-brandColor group-hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Partners;
