"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { BookmarkPlus, Grid3x3 } from "lucide-react";
import image from "@/public/images/blood-sugar-analyser.png";
import Image from "next/image";
import { ListingImageModal } from "../common/modals";
import { DefaultSlide } from "../common";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

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
            onClick={() => setIsModalOpen(true)}
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
                    onClick={() => setIsModalOpen(true)}
                  />
                ) : (
                  <Image
                    key={index}
                    src={img.url}
                    alt={`Photo ${index + 1}`}
                    className="hidden h-full w-full cursor-pointer object-cover md:block"
                    onClick={() => setIsModalOpen(true)}
                  />
                )
              ) : null,
            )}
          </div>

          <div className="md:hidden">
            <DefaultSlide
              images={images.map(img => img.url)}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {isModalOpen && (
          <ListingImageModal
            images={images}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </header>
    </div>
  );
};

export default Header;
