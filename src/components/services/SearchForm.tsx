"use client";

import React, { FormEvent, useState } from "react";
import { SearchForm } from "../common";

const Header = () => {
  const [equipment, setEquipment] = useState("");
  const [region, setRegion] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(equipment, region);
  };

  return (
    <div className="bg-white">
      <header className="section-container">
        <div
          className="flex min-h-[260px] flex-col items-center justify-center gap-6 overflow-hidden rounded-md px-[112px] py-11 text-white"
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
      </header>
    </div>
  );
};

export default Header;
