"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid3x3 } from "lucide-react";
import Image from "next/image";
import { ListingImageModal } from "@/components/common/modals";
import { DefaultSlide } from "@/components/common";
import { ListingInfoProps } from "@/types";
import { DOCUMENT_URL } from "@/utils";

const Header = ({ listingInfo }: { listingInfo: ListingInfoProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="">
        <div className="mb-[22px] flex flex-wrap items-center justify-between">
          <h1 className="font-500 text-2xl">{listingInfo?.name}</h1>
        </div>

        <div className="relative">
          {/* Show all photos button */}
          <Button
            type="button"
            variant="ghost"
            className="absolute bottom-6 right-6 rounded-md border border-[#676767] bg-white px-4 py-1.5 text-[#1F1F1F]"
            onClick={() => setIsModalOpen(true)}
          >
            <Grid3x3 size="16" /> Show all photos
          </Button>

          <div className="hidden gap-3 md:grid md:grid-cols-4">
            {listingInfo?.equipment_file.map((img, index) =>
              index < 5 ? (
                index === 0 ? (
                  <Image
                    key={index}
                    src={DOCUMENT_URL + img?.path}
                    alt={DOCUMENT_URL + img?.path}
                    className="h-full max-h-[400px] w-full cursor-pointer object-cover md:col-span-2 md:row-span-2"
                    width={1000}
                    height={1000}
                    onClick={() => setIsModalOpen(true)}
                  />
                ) : (
                  <Image
                    key={index}
                    src={DOCUMENT_URL + img?.path}
                    alt={DOCUMENT_URL + img?.path}
                    className="hidden aspect-square h-full max-h-[186px] w-full cursor-pointer object-cover md:block"
                    width={1000}
                    height={1000}
                    onClick={() => setIsModalOpen(true)}
                  />
                )
              ) : null,
            )}
          </div>

          <div className="relative md:hidden">
            <DefaultSlide
              images={listingInfo?.equipment_file?.map(
                img => DOCUMENT_URL + img?.path,
              )}
              onClick={() => setIsModalOpen(true)}
            />{" "}
            <Button
              type="button"
              variant="ghost"
              className="absolute bottom-6 right-6 rounded-md border border-[#676767] bg-white px-4 py-1.5 text-[#1F1F1F]"
              onClick={() => setIsModalOpen(true)}
            >
              <Grid3x3 size="16" /> Show all photos
            </Button>
          </div>
        </div>

        {isModalOpen && (
          <ListingImageModal
            images={listingInfo?.equipment_file}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </header>
    </div>
  );
};

export default Header;
