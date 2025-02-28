import React from "react";
import { Button } from "../ui/button";
import { BookmarkPlus } from "lucide-react";
import image from "@/public/images/blood-sugar-analyser.png";
import Image from "next/image";

const Header = () => {
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

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Image
            src={image}
            alt="Blood Sugar Analyzer"
            className="h-full w-full object-cover md:col-span-2 md:row-span-2"
          />
          <Image
            src={image}
            alt="Blood Sugar Analyzer"
            className="h-full w-full object-cover"
          />
          <Image
            src={image}
            alt="Blood Sugar Analyzer"
            className="h-full w-full object-cover"
          />
          <Image
            src={image}
            alt="Blood Sugar Analyzer"
            className="h-full w-full object-cover"
          />
          <Image
            src={image}
            alt="Blood Sugar Analyzer"
            className="h-full w-full object-cover"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
