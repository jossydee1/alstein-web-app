"use client";

import React, { useState } from "react";
import { SearchForm } from "@/components/common";
import FilterMenu from "@/components/common/FilterMenu";
import { CategoryProps } from "@/types";

const Header = ({ categories }: { categories: CategoryProps[] }) => {
  const [equipment, setEquipment] = useState("");
  const [region, setRegion] = useState("");

  const handleSearch = () => {
    console.log("searching...");
  };

  return (
    <div className="bg-white">
      <header className="section-container !pb-0 !pt-3">
        <div
          className="flex min-h-[260px] flex-col items-center justify-center gap-6 overflow-hidden rounded-md px-[40px] py-11 text-white lg:px-[80px] xl:px-[112px]"
          style={{
            backgroundImage: "url('/images/search-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <div className="mb-2.5 flex items-center justify-center gap-2.5 text-[#B1C4FF]">
              <hr className="w-[22px] border-2 border-[#B1C4FF]" />
              <span className="text-lg font-medium uppercase">
                Refine Your Search
              </span>
            </div>
            <h1 className="text-center text-[40px] font-normal leading-[48px]">
              Find Laboratory Services Tailored to Your Needs{" "}
            </h1>
          </div>

          <div className="w-full">
            <SearchForm
              equipment={equipment}
              region={region}
              setEquipment={setEquipment}
              setRegion={setRegion}
              handleSearch={handleSearch}
            />
          </div>
        </div>

        <FilterMenu categories={categories} />
      </header>
    </div>
  );
};

export default Header;
