"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  // X,
} from "lucide-react";
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

  // const [isModalOpen, setIsModalOpen] = useState(false);

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
          {/* Show all photos button */}
          <Button
            variant="ghost"
            className="absolute bottom-6 right-6 rounded-md border border-[#676767] bg-white px-4 py-1.5 text-[#1F1F1F]"
            // onClick={() => setIsModalOpen(true)}
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
                    className="h-full max-h-[400px] w-full cursor-pointer object-cover md:col-span-2 md:row-span-2"
                    // onClick={() => setIsModalOpen(true)}
                  />
                ) : (
                  <Image
                    key={index}
                    src={img.url}
                    alt={`Photo ${index + 1}`}
                    className="hidden h-full w-full cursor-pointer object-cover md:block"
                    // onClick={() => setIsModalOpen(true)}
                  />
                )
              ) : null,
            )}
          </div>

          <div className="md:hidden">
            <ImageSlider images={images.map(img => img.url)} />
          </div>
        </div>

        {/* {isModalOpen && (
          <ImageModal images={images} onClose={() => setIsModalOpen(false)} />
        )} */}
      </header>
    </div>
  );
};

export default Header;

const ImageSlider = ({ images }: { images: StaticImageData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="relative overflow-hidden rounded-md">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
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

      {/* Image count */}
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

// IMAGE MODAL COMPONENT
// const ImageModal = ({
//   images,
//   onClose,
// }: {
//   images: { url: StaticImageData }[];
//   onClose: () => void;
// }) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       <div className="relative w-full max-w-5xl rounded-lg bg-white p-6">
//         {/* Close Button */}
//         <button
//           className="absolute right-4 top-4 text-gray-600 hover:text-black"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>

//         {/* Title */}
//         <h2 className="mb-4 text-lg font-semibold">All Photos</h2>

//         {/* Masonry Grid */}
//         <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
//           {images.map((img, index) => (
//             <Image
//               key={index}
//               src={img.url}
//               alt={`Photo ${index + 1}`}
//               className="h-auto w-full rounded-md object-cover"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
