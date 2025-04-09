"use client";

import { listingsData } from "@/database/listingsData";
import { ListingProps } from "@/types";
import { formatPrice, webRoutes } from "@/utils";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

export const ListingsList = ({ listings }: { listings: ListingProps[] }) => {
  if (listings?.length === 0) return <p>No listings found</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings?.map((l, index) => (
        <article
          key={index}
          className="group grid gap-2 overflow-hidden rounded-md bg-[#F5F5F5] p-3 transition-shadow hover:bg-[#F5F5F5] hover:shadow-[0px_0px_16px_2px_#00000033]"
        >
          {/* TODO: Update this to use the actual images */}
          <ImageSlider images={listingsData[0]?.images} />

          <div>
            <h3 className="pb-0.5 font-medium leading-[20px] text-[#161616]">
              {l?.name}
            </h3>
            <p className="mb-1 text-xs text-[#474747]">
              {l?.description.slice(0, 100)}...
            </p>
            <p className="flex items-center gap-2.5 text-xs text-[#8B8B8B] transition-colors group-hover:text-brandColor">
              <MapPin size="12" /> {l?.address}
            </p>

            <p className="mb-4 text-[#161616]">
              {formatPrice(l?.price, "NGN")}
            </p>

            <Link
              href={`${webRoutes.listings}/${l?.id}`}
              className="rounded-md bg-[#7F7F7F] px-7 py-1.5 text-sm leading-[16px] text-white transition-colors group-hover:bg-brandColor group-hover:text-white"
            >
              View Details
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

const ImageSlider = ({ images }: { images: StaticImageData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;

      if (deltaX > 50) {
        // Swiped left -> Next slide
        setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : prev));
      } else if (deltaX < -50) {
        // Swiped right -> Previous slide
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
    }
    // Reset touch values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!images || images?.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-md">
      <div className="absolute right-1.5 top-2.5 z-10 flex items-center rounded-md p-1 text-white">
        <Heart fill="" size={24} />
      </div>

      <div
        ref={slideRef}
        className="relative flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `100%`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="aspect-square h-auto w-full flex-shrink-0"
          >
            <Image
              src={img}
              alt=""
              className="aspect-square h-auto w-full rounded-md object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === currentIndex ? "scale-125 bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* PREV & NEXT BUTTONS */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-[#C3C3C38F] p-1 opacity-0 transition hover:bg-[#dedede] disabled:hidden disabled:hover:bg-[#C3C3C38F] group-hover:opacity-100"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} className="text-black/80 hover:text-black" />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-[#C3C3C38F] p-1 opacity-0 transition hover:bg-[#dedede] disabled:hidden disabled:hover:bg-[#C3C3C38F] group-hover:opacity-100"
        onClick={nextSlide}
        disabled={currentIndex === images.length - 1}
      >
        <ChevronRight size={20} className="text-black/80 hover:text-black" />
      </button>
    </div>
  );
};
