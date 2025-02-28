"use client";

import React, { FormEvent, useState } from "react";
import { SearchForm } from "../common";
import { Button } from "../ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

const Header = () => {
  const [equipment, setEquipment] = useState("");
  const [region, setRegion] = useState("");
  const [availabilty, setAvailbility] = useState(false);
  const [lease, setLease] = useState(false);
  const [onSite, setOnSite] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(equipment, region);
  };

  const dropdownStyles =
    "flex items-center gap-2.5 rounded-xl border border-[#8B8B8B] px-3 pt-2 text-sm text-[#454545]";

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

        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#BBBBBB] py-6">
          <div className="flex flex-wrap items-start gap-2">
            {/* Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={dropdownStyles}>
                  <SlidersHorizontal size={16} className="#8B8B8B mr-2" />
                  All Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Distance */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={dropdownStyles}>
                  Distance
                  <ChevronDown size={16} className="#8B8B8B" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Categories */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={dropdownStyles}>
                  Categories
                  <ChevronDown size={16} className="#8B8B8B" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap items-start gap-2">
            <div className="flex items-center gap-2 text-[#8B8B8B]">
              <Switch
                checked={availabilty}
                onCheckedChange={() => setAvailbility(!availabilty)}
              />
              Available Now
            </div>
            <div className="flex items-center gap-2 text-[#8B8B8B]">
              <Switch
                checked={lease}
                onCheckedChange={() => setLease(!lease)}
              />
              Available For Lease
            </div>
            <div className="flex items-center gap-2 text-[#8B8B8B]">
              <Switch
                checked={onSite}
                onCheckedChange={() => setOnSite(!onSite)}
              />
              Available On-Site Only
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
