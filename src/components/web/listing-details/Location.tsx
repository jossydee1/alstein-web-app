import { MapPin } from "lucide-react";
import React from "react";
import map from "@/public/images/google-map.png";
import Image from "next/image";
import { ListingInfoProps } from "@/types";

const Location = ({ listingInfo }: { listingInfo: ListingInfoProps }) => {
  return (
    <section>
      <hr className="my-6 border border-[#EBEBEB]" />

      <h2 className="font-500 mb-4 text-2xl">Location & Direction</h2>

      <p className="mb-2 flex flex-wrap justify-between gap-2 capitalize text-[#454545]">
        <span className="text-[#343434]">
          {listingInfo?.city}, {listingInfo?.country}
        </span>
        <span className="flex items-center gap-1 text-brandColor">
          <MapPin size="12" />
          {listingInfo?.address}
        </span>
      </p>

      <Image
        src={map}
        alt="Google Map"
        className="mb-[90px] h-[380px] w-full object-cover"
      />
    </section>
  );
};

export default Location;
