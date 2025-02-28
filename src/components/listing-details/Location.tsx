import { MapPin } from "lucide-react";
import React from "react";
import map from "@/public/images/google-map.png";
import Image from "next/image";

const Location = () => {
  return (
    <section>
      <hr className="my-6 border border-[#EBEBEB]" />

      <h2 className="font-500 mb-4 text-2xl">Location & Direction</h2>

      <p className="mb-2 flex justify-between gap-2 text-[#454545]">
        <span className="text-[#343434]">Yaba Lagos</span>{" "}
        <span className="flex items-center gap-1 text-brandColor">
          <MapPin size="12" />2 Iyalla street Alausa Ikeja Lagos
        </span>
      </p>

      <Image
        src={map}
        alt="Google Map"
        className="h-[380px] w-full object-cover"
      />
    </section>
  );
};

export default Location;
