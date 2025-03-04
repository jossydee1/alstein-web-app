"use client";

import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { BookmarkPlus, ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react";
import image from "@/public/images/blood-sugar-analyser.png";
import Image, { StaticImageData } from "next/image";

const Header = () => {
  const images = [
    { url: image },
    { url: image },
    { url: image },
    { url: image },
    { url: image },
    { url: image },
    { url: image },
    { url: image },
    { url: image },
    { url: image },
  ];
  return (
    <div className="bg-white">
      <header className="section-container !pb-9 !pt-0">
        <div className="mb-[22px] flex flex-wrap items-center justify-between">
          <h1 className="font-500 text-2xl">
            High-Precision Blood Sugar Analyzer
          </h1>
          <Button variant="ghost" className="px-0 text-[#1F1F1F]">
            <BookmarkPlus size="16" /> Save For Later
          </Button>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            className="absolute bottom-6 right-6 rounded-md border border-[#676767] bg-white px-4 py-1.5 text-[#1F1F1F]"
          >
            <Grid3x3 size="16" /> Show all photos
          </Button>

          <div className="hidden gap-3 md:grid md:grid-cols-4">
            {images.map((img, index) =>
              index < 5 ? (
                index === 0 ? (
                  <Image
                    key={index}
                    src={img.url}
                    alt={`Photo ${index + 1}`}
                    className="h-full max-h-[400px] w-full object-cover md:col-span-2 md:row-span-2"
                  />
                ) : (
                  <Image
                    key={index}
                    src={image}
                    alt={`Photo ${index + 1}`}
                    className="hidden h-full w-full object-cover md:block"
                  />
                )
              ) : null,
            )}
          </div>

          <div className="md:hidden">
            <ImageSlider images={images.map(img => img.url)} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

const ImageSlider = ({ images }: { images: StaticImageData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  const nextSlide = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="overflow-hidden rounded-md">
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
          <div key={index} className="aspect-video h-auto w-full flex-shrink-0">
            <Image
              src={img}
              alt=""
              className="aspect-video h-auto w-full rounded-md object-cover"
            />
          </div>
        ))}
      </div>

      {/* image count */}
      <div className="absolute bottom-3 right-3 rounded-md bg-black/30 px-2 py-1">
        <p className="text-center text-sm text-white">
          {currentIndex + 1} of {images.length}
        </p>
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
        disabled={currentIndex === images.length - 1}
      >
        <ChevronRight size={20} className="text-black/80 hover:text-black" />
      </button>

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
    </div>
  );
};
