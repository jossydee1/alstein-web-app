"use client";

import { DocumentProps, ListingProps } from "@/types";
import {
  api,
  DOCUMENT_URL,
  formatError,
  formatPrice,
  webRoutes,
} from "@/utils";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context";

export const ListingsList = ({ listings }: { listings: ListingProps[] }) => {
  if (!listings || listings?.length === 0)
    return (
      <p>
        No listings found. Please check back later or try a different search.
      </p>
    );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings &&
        listings?.length > 0 &&
        listings?.map((l, index) => (
          <article
            key={index}
            className="group grid gap-2 overflow-hidden rounded-md bg-[#F5F5F5] p-3 transition-shadow hover:bg-[#F5F5F5] hover:shadow-[0px_0px_16px_2px_#00000033]"
          >
            <ImageSlider images={l?.equipment_file} equipmentId={l?.id} />

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
                href={`${webRoutes?.listings}/${l?.id}`}
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

const ImageSlider = ({
  images,
  equipmentId,
}: {
  images: DocumentProps[];
  equipmentId: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false); // Track favorite state
  const slideRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const toggleFavorite = async () => {
    if (!user) {
      toast.info("Please log in to add to favorites.");
      router.push("/login");
      return;
    }

    try {
      const response = await api.post(
        "/client/api/v1/equipments/add-favourite-equipments",
        {
          equipment_id: equipmentId,
        },
      );

      if (response?.data?.data) {
        setIsFavorite(!isFavorite);
        toast.success(
          isFavorite
            ? "Removed from favorites successfully!"
            : "Added to favorites successfully!",
        );
      }
    } catch (error) {
      toast.error(
        formatError(error, "An error occurred while updating favorites."),
      );
    }
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev < images?.length - 1 ? prev + 1 : prev));
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
        setCurrentIndex(prev => (prev < images?.length - 1 ? prev + 1 : prev));
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
      <div
        className="absolute right-1.5 top-2.5 z-10 flex cursor-pointer items-center rounded-md p-1 text-white"
        onClick={toggleFavorite}
      >
        <Heart fill={isFavorite ? "red" : ""} size={24} />
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
        {images?.map((img, index) => (
          <div
            key={index}
            className="aspect-square h-auto w-full flex-shrink-0"
          >
            <Image
              src={DOCUMENT_URL + img?.path}
              alt={DOCUMENT_URL + img?.path}
              className="aspect-square h-auto w-full rounded-md bg-neutral-50 object-cover"
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images?.map((_, index) => (
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
        disabled={currentIndex === images?.length - 1}
      >
        <ChevronRight size={20} className="text-black/80 hover:text-black" />
      </button>
    </div>
  );
};
