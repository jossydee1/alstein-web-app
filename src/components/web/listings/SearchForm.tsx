"use client";

import React from "react";
import {
  SearchForm as CommonSearchForm,
  FilterMenu,
} from "@/components/common";
import { CategoryProps } from "@/types";

const Header = ({
  equipment,
  setEquipment,
  region,
  setRegion,
  handleSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  ratings,
  selectedRatings,
  setSelectedRatings,
  handleFiltering,
  resetFilter,
  isFiltering,
  // distances,
  // selectedDistance,
  // setSelectedDistance,
  // availability,
  // setAvailability,
  // lease,
  // setLease,
  // onSite,
  // setOnSite,
}: {
  equipment: string;
  setEquipment: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  handleSearch: () => void;
  categories: CategoryProps[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  ratings: number[];
  selectedRatings: number[];
  setSelectedRatings: React.Dispatch<React.SetStateAction<number[]>>;
  handleFiltering: () => void;
  resetFilter: () => void;
  isFiltering: boolean;
  // distances: number[];
  // selectedDistance: number | null;
  // setSelectedDistance: (distance: number | null) => void;
  // availability: boolean;
  // setAvailability: (availability: boolean) => void;
  // lease: boolean;
  // setLease: (lease: boolean) => void;
  // onSite: boolean;
  // setOnSite: (onSite: boolean) => void;
}) => {
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
            <CommonSearchForm
              equipment={equipment}
              region={region}
              setEquipment={setEquipment}
              setRegion={setRegion}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        <FilterMenu
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          ratings={ratings}
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
          handleFiltering={handleFiltering}
          resetFilter={resetFilter}
          isFiltering={isFiltering}
          // distances={distances}
          // selectedDistance={selectedDistance}
          // setSelectedDistance={setSelectedDistance}
          // availability={availability}
          // setAvailability={setAvailability}
          // lease={lease}
          // setLease={setLease}
          // onSite={onSite}
          // setOnSite={setOnSite}
        />
      </header>
    </div>
  );
};

export default Header;
