"use client";

import React, { useEffect, useState } from "react";
import Listings from "./Listings";
import SearchForm from "./SearchForm";
import { CategoryProps, ListingProps, ListingsProps } from "@/types";
import { useClientFetch } from "@/hooks";
import { useSearchParams } from "next/navigation";

const ListingsContent = ({ categories }: { categories: CategoryProps[] }) => {
  const searchParams = useSearchParams();
  const [filteredListings, setFilteredListings] = useState<ListingProps[]>([]);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [filterQueryParams, setFilterQueryParams] = useState<string>("");
  // const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  // const [availability, setAvailability] = useState(false);
  // const [lease, setLease] = useState(false);
  // const [onSite, setOnSite] = useState(false);

  // Search form state
  const [equipment, setEquipment] = useState("");
  const [region, setRegion] = useState("");

  // Filter options
  const ratings = [5, 4, 3, 2, 1];
  // const distances = [5, 10, 15, 20, 50, 100];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  // Check for category in URL params on load
  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [searchParams]);

  // Handle search
  const handleSearch = () => {
    if (!listings) return;

    let filtered = [...listings?.data];

    if (equipment) {
      filtered = filtered.filter(item =>
        item?.name.toLowerCase().includes(equipment?.toLowerCase()),
      );
    }

    if (region) {
      filtered = filtered.filter(item =>
        item?.address.toLowerCase().includes(region?.toLowerCase()),
      );
    }

    setFilteredListings(filtered);
    setCurrentPage(1);
  };

  // Handle filtering
  const handleFiltering = () => {
    const queryParams = new URLSearchParams({
      skip: "0",
      take: itemsPerPage.toString(),
      ...(selectedCategory && { category: selectedCategory }),
      ...(selectedRatings.length > 0 && {
        rating: selectedRatings[0].toString(),
      }),
      ...(selectedState && { city: selectedState }),
      ...(selectedCountry && { country: selectedCountry }),
    });

    setFilterQueryParams(queryParams.toString());
  };

  // Fetch all listings
  const {
    data: listings,
    isLoading: fetchingListings,
    refetch: refetchListings,
  } = useClientFetch<ListingsProps>({
    endpoint: `/client/public/api/v1/equipments/filter-equipments?${filterQueryParams}`,
  });

  // Reset filters
  const resetFilter = () => {
    setSelectedCategory("");
    setSelectedRatings([]);
    setSelectedCountry("");
    setSelectedState("");
    setFilterQueryParams(`skip=0&take=${itemsPerPage}`);
    setFilteredListings([]);
    // setSelectedDistance(null);
    // setSelectedInsurance([]);
    // setAvailability(false);
    // setLease(false);
    // setOnSite(false);
    setCurrentPage(1);
  };

  // Trigger refetch when filterQueryParams changes
  useEffect(() => {
    if (filterQueryParams) {
      refetchListings();
    }
  }, [filterQueryParams, refetchListings]);

  // Update listings and total pages when data changes
  useEffect(() => {
    if (listings && listings?.data && !selectedCategory) {
      setFilteredListings(listings?.data);
      setTotalPages(Math.ceil(listings?.total_count / itemsPerPage));
    }
  }, [listings, selectedCategory]);

  useEffect(() => {
    if (selectedCategory && listings) {
      setFilteredListings(listings?.data);
      setTotalPages(Math.ceil(listings?.total_count / itemsPerPage));
    }
  }, [selectedCategory, listings]);

  // Refetch listings when currentPage changes
  useEffect(() => {
    setCurrentPage(1);
    refetchListings();
  }, [currentPage, refetchListings]);

  // Refetch listingsByCategory when currentPage or selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setCurrentPage(1);
      refetchListings();
    }
  }, [selectedCategory, refetchListings]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  console.log(filterQueryParams);

  return (
    <main>
      <SearchForm
        equipment={equipment}
        setEquipment={setEquipment}
        region={region}
        setRegion={setRegion}
        handleSearch={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        ratings={ratings}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        handleFiltering={handleFiltering}
        resetFilter={resetFilter}
        isFiltering={fetchingListings}
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

      <Listings
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        listings={filteredListings || []}
        isLoading={fetchingListings}
      />
    </main>
  );
};

export default ListingsContent;
