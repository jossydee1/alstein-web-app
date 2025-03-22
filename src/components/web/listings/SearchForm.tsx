"use client";

import React from "react";
import {
  SearchForm as CommonSearchForm,
  FilterMenu,
} from "@/components/common";
import { CategoryProps } from "@/types";

const Header = ({
  categories,
  equipment,
  setEquipment,
  region,
  setRegion,
  handleSearch,
  distances,
  ratings,
  insuranceOptions,
  selectedCategory,
  setSelectedCategory,
  selectedDistance,
  setSelectedDistance,
  selectedInsurance,
  setSelectedInsurance,
  selectedRatings,
  setSelectedRatings,
  availability,
  setAvailability,
  lease,
  setLease,
  onSite,
  setOnSite,
  handleFiltering,
  resetFilter,
  isFiltering,
}: {
  categories: CategoryProps[];
  equipment: string;
  setEquipment: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  handleSearch: () => void;
  distances: number[];
  ratings: number[];
  insuranceOptions: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDistance: number | null;
  setSelectedDistance: (distance: number | null) => void;
  selectedInsurance: string[];
  setSelectedInsurance: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRatings: number[];
  setSelectedRatings: React.Dispatch<React.SetStateAction<number[]>>;
  availability: boolean;
  setAvailability: (availability: boolean) => void;
  lease: boolean;
  setLease: (lease: boolean) => void;
  onSite: boolean;
  setOnSite: (onSite: boolean) => void;
  handleFiltering: (e: { preventDefault: () => void }) => void;
  resetFilter: () => void;
  isFiltering: boolean;
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
          distances={distances}
          ratings={ratings}
          insuranceOptions={insuranceOptions}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDistance={selectedDistance}
          setSelectedDistance={setSelectedDistance}
          selectedInsurance={selectedInsurance}
          setSelectedInsurance={setSelectedInsurance}
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
          availability={availability}
          setAvailability={setAvailability}
          lease={lease}
          setLease={setLease}
          onSite={onSite}
          setOnSite={setOnSite}
          handleFiltering={handleFiltering}
          resetFilter={resetFilter}
          isFiltering={isFiltering}
        />
      </header>
    </div>
  );
};

export default Header;
