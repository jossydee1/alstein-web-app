"use client";
import { MapPin } from "lucide-react";
import React, { useMemo } from "react";
import { ListingInfoProps } from "@/types";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const Location = ({ listingInfo }: { listingInfo: ListingInfoProps }) => {
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(
    () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
    [],
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    [],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as "places"[],
  });

  if (!isLoaded) return <div>Loading...</div>; // Ensure the map only renders after loading

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

      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={window.google.maps.MapTypeId.ROADMAP} // Access google from window
        mapContainerStyle={{ width: "100%", height: "380px" }}
        onLoad={() => console.log("Map Component Loaded...")}
      />
    </section>
  );
};

export default Location;
