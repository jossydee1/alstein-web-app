"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const DefaultSlide = ({
  images,
  onClick,
}: {
  images: string[];
  onClick: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev < images?.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  // Handle left/right keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex(prev => (prev < images?.length - 1 ? prev + 1 : prev));
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === "Escape") {
        onClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [images?.length, onClick]);

  return (
    <div className="relative overflow-hidden rounded-md">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images?.map((img, index) => (
          <div key={index} className="aspect-video h-auto w-full flex-shrink-0">
            <Image
              src={img}
              alt=""
              className="aspect-video h-auto w-full rounded-md bg-neutral-50 object-cover"
              width={1000}
              height={1000}
              onClick={onClick}
            />
          </div>
        ))}
      </div>

      {/* Image count */}
      <div className="absolute bottom-3 right-3 rounded-md bg-black/30 px-2 py-1">
        <p className="text-center text-sm text-white">
          {currentIndex + 1} of {images?.length}
        </p>
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
        className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-[#C3C3C38F] p-1 transition hover:bg-[#dedede] disabled:opacity-50 disabled:hover:bg-[#C3C3C38F]"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} className="text-black/80 hover:text-black" />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-[#C3C3C38F] p-1 transition hover:bg-[#dedede] disabled:opacity-50 disabled:hover:bg-[#C3C3C38F]"
        onClick={nextSlide}
        disabled={currentIndex === images?.length - 1}
      >
        <ChevronRight size={20} className="text-black/80 hover:text-black" />
      </button>
    </div>
  );
};
