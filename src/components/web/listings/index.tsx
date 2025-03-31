"use client";

import React, { useEffect, useState } from "react";
import Listings from "./Listings";
import SearchForm from "./SearchForm";
import { CategoryProps, ListingsProps } from "@/types";
import { useClientFetch } from "@/hooks";
import { formatError } from "@/utils";
import { useSearchParams } from "next/navigation";

const ListingsContent = ({ categories }: { categories: CategoryProps[] }) => {
  const searchParams = useSearchParams();
  const [filteredListings, setFilteredListings] = useState<ListingsProps[]>([]);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [availability, setAvailability] = useState(false);
  const [lease, setLease] = useState(false);
  const [onSite, setOnSite] = useState(false);

  // Search form state
  const [equipment, setEquipment] = useState("");
  const [region, setRegion] = useState("");

  // Filter options
  const distances = [5, 10, 15, 20, 50, 100];
  const ratings = [5, 4, 3, 2, 1];
  const insuranceOptions = [
    "Insurance 1",
    "Insurance 2",
    "Insurance 3",
    "Insurance 4",
    "Insurance 5",
  ];

  // Check for category in URL params on load
  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [searchParams]);

  const {
    data: listings,
    isLoading,
    error,
  } = useClientFetch<ListingsProps[]>({
    endpoint: "/client/public/api/v1/equipments/get-equipments?skip=0&take=50",
  });

  // Fetch listings by category if a category is selected
  const {
    data: listingsByCategory,
    isLoading: listingsByCategoryLoading,
    // error: listingsByCategoryError,
  } = useClientFetch<ListingsProps[]>({
    endpoint: `/client/public/api/v1/equipments/get-equipment-by-category?skip=0&take=50&category_slug=${selectedCategory}`,
    enabled: !!selectedCategory,
  });

  // Set initial listings
  useEffect(() => {
    if (listings && !selectedCategory) {
      setFilteredListings(listings);
    }
  }, [listings, selectedCategory]);

  // Update listings when category changes
  useEffect(() => {
    if (selectedCategory && listingsByCategory) {
      setFilteredListings(listingsByCategory);
    }
  }, [selectedCategory, listingsByCategory]);

  // Handle search
  const handleSearch = () => {
    if (!listings) return;

    let filtered = [...listings];

    if (equipment) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(equipment.toLowerCase()),
      );
    }

    if (region) {
      filtered = filtered.filter(item =>
        item.address.toLowerCase().includes(region.toLowerCase()),
      );
    }

    setFilteredListings(filtered);
  };

  // Handle filtering
  const handleFiltering = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!listings) return;

    const filtered =
      selectedCategory && listingsByCategory
        ? [...listingsByCategory]
        : [...listings];

    // Filter by ratings
    // if (selectedRatings.length > 0) {
    //   filtered = filtered.filter(
    //     item =>
    //       item.rating && selectedRatings.includes(Math.round(item.rating)),
    //   );
    // }

    // Filter by insurance (assuming items have insurance property)
    // if (selectedInsurance.length > 0) {
    //   filtered = filtered.filter(
    //     item =>
    //       item.insurance &&
    //       selectedInsurance.some(ins => item.insurance.includes(ins)),
    //   );
    // }

    // Filter by availability flags
    // if (availability) {
    //   filtered = filtered.filter(item => item.isAvailable);
    // }

    // if (lease) {
    //   filtered = filtered.filter(item => item.isForLease);
    // }

    // if (onSite) {
    //   filtered = filtered.filter(item => item.isOnSiteOnly);
    // }

    // Apply distance filter if selected (would need geolocation to fully implement)
    // if (selectedDistance) {
    //   // This would require calculating actual distances
    //   console.log(`Filtering by distance: ${selectedDistance} miles`);
    // }

    setFilteredListings(filtered);
  };

  // Reset filters
  const resetFilter = () => {
    setSelectedCategory("");
    setSelectedDistance(null);
    setSelectedInsurance([]);
    setSelectedRatings([]);
    setAvailability(false);
    setLease(false);
    setOnSite(false);

    if (listings) {
      setFilteredListings(listings);
    }
  };

  return (
    <main>
      <SearchForm
        categories={categories}
        equipment={equipment}
        setEquipment={setEquipment}
        region={region}
        setRegion={setRegion}
        handleSearch={handleSearch}
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
        isFiltering={isLoading || listingsByCategoryLoading}
      />

      <Listings
        listings={filteredListings}
        isLoading={isLoading || listingsByCategoryLoading}
        error={error ? formatError(error) : null}
      />
    </main>
  );
};

export default ListingsContent;
