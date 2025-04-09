"use client";

import p1 from "@/public/images/partners/adels.png";
import p2 from "@/public/images/partners/bsn.png";
import p3 from "@/public/images/partners/sageiq.png";
import p4 from "@/public/images/partners/science-ignite.png";
import p5 from "@/public/images/partners/tvf.png";
import Image from "next/image";

const Partners = () => {
  const partners = [
    {
      name: "Adels",
      image: p1,
      url: "#",
    },
    {
      name: "BSN",
      image: p2,
      url: "#",
    },
    {
      name: "SageIQ",
      image: p3,
      url: "#",
    },
    {
      name: "Science Ignite",
      image: p4,
      url: "#",
    },
    {
      name: "TVF",
      image: p5,
      url: "#",
    },
  ];

  return (
    <div className="bg-white">
      <section className="section-container">
        <div className="mx-auto w-full max-w-[1098px] rounded-md bg-[#F9F9F9] pb-12 pt-8 xl:px-[125px]">
          <h2 className="mb-6 text-center text-lg font-medium uppercase leading-[20px] text-[#949494]">
            Our Partners
          </h2>

          <div className="flex flex-wrap justify-center gap-12">
            {partners.map((p, index) => (
              <Image
                key={index}
                src={p.image}
                alt={p.name}
                className="h-[60px] w-auto"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
