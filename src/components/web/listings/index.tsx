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

  // Fetch all listings
  const {
    data: listings,
    isLoading: fetchingListings,
    refetch: refetchListings,
  } = useClientFetch<ListingsProps>({
    endpoint: `/client/public/api/v1/equipments/get-equipments?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`,
  });

  // Fetch listings by category if a category is selected
  const {
    data: listingsByCategory,
    isLoading: fetchingListingsByCategory,
    refetch: refetchListingsByCategory,
  } = useClientFetch<ListingsProps>({
    endpoint: `/client/public/api/v1/equipments/get-equipment-by-category?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}&category_slug=${selectedCategory}`,
    enabled: !!selectedCategory,
  });

  // Refetch listings when currentPage changes
  useEffect(() => {
    // setCurrentPage(1);
    refetchListings();
  }, [currentPage, refetchListings]);

  // Refetch listingsByCategory when currentPage or selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setCurrentPage(1);
      refetchListingsByCategory();
    }
  }, [selectedCategory, refetchListingsByCategory]);

  // Update listings and total pages when data changes
  useEffect(() => {
    if (listings && listings?.data && !selectedCategory) {
      setFilteredListings(listings?.data);
      setTotalPages(Math.ceil(listings?.total_count / itemsPerPage));
    }
  }, [listings, selectedCategory]);

  useEffect(() => {
    if (selectedCategory && listingsByCategory) {
      setFilteredListings(listingsByCategory?.data);
      setTotalPages(Math.ceil(listingsByCategory?.total_count / itemsPerPage));
    }
  }, [selectedCategory, listingsByCategory]);

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
  const handleFiltering = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!listings) return;

    const filtered =
      selectedCategory && listingsByCategory
        ? [...listingsByCategory.data]
        : [...listings?.data];

    setFilteredListings(filtered);
    setCurrentPage(1);
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
    setCurrentPage(1);
    if (listings) {
      setFilteredListings(listings?.data);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
        isFiltering={fetchingListings || fetchingListingsByCategory}
      />

      <Listings
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        listings={filteredListings || []}
        isLoading={fetchingListings || fetchingListingsByCategory}
      />
    </main>
  );
};

export default ListingsContent;
