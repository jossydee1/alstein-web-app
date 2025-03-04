"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

export const ListingImageModal = ({
  images,
  onClose,
}: {
  images: { url: StaticImageData }[];
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  // Handle left/right keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : prev));
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70 text-white">
      {/* Close Button */}
      <Button
        variant="ghost"
        className="absolute left-8 top-4 flex items-center gap-2"
        onClick={onClose}
      >
        <X size={20} />
        Close
      </Button>

      {/* PREV & NEXT BUTTONS */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-[#C3C3C38F] p-1 transition hover:bg-[#dedede] disabled:opacity-50 disabled:hover:bg-[#C3C3C38F]"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} className="text-black/80 hover:text-black" />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-[#C3C3C38F] p-1 transition hover:bg-[#dedede] disabled:opacity-50 disabled:hover:bg-[#C3C3C38F]"
        onClick={nextSlide}
        disabled={currentIndex === images.length - 1}
      >
        <ChevronRight size={20} className="text-black/80 hover:text-black" />
      </button>

      {/* Image Count */}
      <div className="mt-6 flex items-center justify-center">
        <p className="text-center text-sm font-semibold">
          {currentIndex + 1} of {images.length}
        </p>
      </div>

      {/* Full-Screen Image View */}
      <div className="mx-6 my-4 flex flex-1 items-center justify-center">
        <Image
          src={images[currentIndex].url}
          alt={`Photo ${currentIndex + 1}`}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Thumbnail Preview Row */}
      <div className="flex items-center gap-3 overflow-x-auto bg-black/10 px-6 py-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative h-20 w-24 flex-shrink-0 rounded-md border ${
              index === currentIndex
                ? "border-2 border-brandColor"
                : "border-transparent"
            }`}
          >
            <Image
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full rounded-md object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
