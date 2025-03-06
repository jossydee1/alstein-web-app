"use client";

import { MapPin, Microscope, Search } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  equipment: string;
  region: string;
  setEquipment: (value: string) => void;
  setRegion: (value: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchForm = ({
  equipment,
  region,
  setEquipment,
  setRegion,
  handleSearch,
}: SearchFormProps) => {
  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full flex-col items-center justify-between gap-1 rounded-lg bg-white p-1 text-[#454545] lg:flex-row lg:gap-0"
    >
      <label
        htmlFor="equipment"
        className="flex min-h-[54px] w-full flex-1 items-center gap-3 rounded-sm border border-[#909090] pl-6 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:border-r-[#909090]"
      >
        <Microscope size="24" className="" />
        <input
          className="w-full border-none p-0 focus:outline-none focus:ring-0"
          type="text"
          name="equipment"
          id="equipment"
          value={equipment}
          onChange={e => setEquipment(e.target.value)}
          required
          placeholder="Equipment/Analysis Name"
        />
      </label>
      <label
        htmlFor="region"
        className="flex min-h-[54px] w-full flex-1 items-center gap-3 rounded-sm border border-[#909090] pl-6 lg:border-none"
      >
        <MapPin size="24" />
        <input
          className="w-full border-none p-0 focus:outline-none focus:ring-0"
          type="text"
          name="region"
          id="region"
          value={region}
          onChange={e => setRegion(e.target.value)}
          required
          placeholder="Any Region"
        />
      </label>

      <Button className="flex min-h-[54px] w-full items-center justify-center bg-brandColor px-6 py-4 lg:w-auto">
        <Search size="40" className="" />
      </Button>
    </form>
  );
};
