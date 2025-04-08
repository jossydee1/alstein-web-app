"use client";

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
    <div className="fixed inset-0 z-50 bg-black/30 p-4 py-10" onClick={onClose}>
      <section
        className="relative m-auto overflow-auto rounded-2xl bg-white"
        style={{
          width: "calc(100vw - 32px)",
          maxWidth: "1400px",
          height: "calc(100vh - 80px)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <header className="sticky left-0 top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-b-[#ECECEC] bg-white px-6 py-3 lg:py-6">
          <h2 className="text-2xl font-semibold text-[#161616]">Images</h2>

          {/* Image Count */}
          <div className="flex items-center justify-center">
            <p className="text-center">
              {currentIndex + 1} of {images.length}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-[#F5F5F5]"
          >
            <X size={24} />
          </button>
        </header>

        <div className="mx-8 my-6 flex flex-col-reverse gap-6">
          {/* Full-Screen Image View */}
          <div className="relative h-auto w-full">
            <Image
              src={images[currentIndex].url}
              alt={`Photo ${currentIndex + 1}`}
              className="m-auto h-auto w-full flex-1"
            />

            {/* PREV & NEXT BUTTONS */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-[#C3C3C38F] p-1 transition hover:bg-[#dedede] disabled:opacity-50 disabled:hover:bg-[#C3C3C38F]"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft
                size={20}
                className="text-black/80 hover:text-black"
              />
            </button>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-[#C3C3C38F] p-1 transition hover:bg-[#dedede] disabled:opacity-50 disabled:hover:bg-[#C3C3C38F]"
              onClick={nextSlide}
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight
                size={20}
                className="text-black/80 hover:text-black"
              />
            </button>
          </div>

          {/* Thumbnail Preview Row */}
          <div className="flex flex-wrap items-center gap-3 overflow-y-auto bg-neutral-100/50 px-6 py-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-15 relative w-16 flex-shrink-0 rounded-md border ${
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
      </section>
    </div>
  );
};
