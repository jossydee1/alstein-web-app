"use client";

import React, { useEffect, useState } from "react";
import Listings from "./Listings";
import SearchForm from "./SearchForm";
import { CategoryProps, ListingProps, ListingsProps } from "@/types";
import { useClientFetch } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { api, formatError } from "@/utils";
import { toast } from "react-toastify";

const ListingsContent = ({ categories }: { categories: CategoryProps[] }) => {
  const searchParams = useSearchParams();
  const [filteredListings, setFilteredListings] = useState<ListingProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUsingSearchResults, setIsUsingSearchResults] =
    useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  // Filter options
  const ratings = [5, 4, 3, 2, 1];
  // const distances = [5, 10, 15, 20, 50, 100];

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  // TODO: set default to country Nigeria
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [filterQueryParams, setFilterQueryParams] = useState<string>(
    `skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`,
  );
  // const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  // const [availability, setAvailability] = useState(false);
  // const [lease, setLease] = useState(false);
  // const [onSite, setOnSite] = useState(false);

  // Search form state
  const [equipment, setEquipment] = useState<string>(
    searchParams.get("search_text") || "",
  );
  const [region, setRegion] = useState<string>(searchParams.get("city") || "");

  // Check for category in URL params on load
  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [searchParams]);

  // Handle search
  const handleSearch = async () => {
    if (!equipment && !region) {
      toast.error("Please provide search text or region to search.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.get(
        `/client/public/api/v1/equipments/search-equipments`,
        {
          params: {
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            search_text: equipment,
            city: region,
          },
        },
      );

      if (response?.status === 200) {
        setFilteredListings(response?.data?.data?.data || []);
        setTotalPages(
          Math.ceil(response?.data?.data?.total_count / itemsPerPage),
        );
        setCurrentPage(1);
        setIsUsingSearchResults(true); // Mark that we're using search results
      }
    } catch (error) {
      toast.error(formatError(error, "Error fetching search results"));
    } finally {
      setIsLoading(false);
    }
  };

  // Call handleSearch on page load if city and search_text are in the URL
  useEffect(() => {
    if (equipment || region) {
      handleSearch();
    } else {
      refetchListings();
    }
  }, []); // Empty dependency array to only run once on mount

  // Handle filtering
  const handleFiltering = () => {
    // Switch to filter mode when user explicitly filters
    setIsUsingSearchResults(false);

    const queryParams = new URLSearchParams({
      skip: ((currentPage - 1) * itemsPerPage).toString(),
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
    enabled: !!filterQueryParams && !isUsingSearchResults, // Only enable if not using search results
  });

  // Reset filters
  const resetFilter = () => {
    setEquipment("");
    setRegion("");
    setSelectedCategory("");
    setSelectedRatings([]);
    setSelectedCountry("");
    setSelectedState("");
    setFilterQueryParams(
      `skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`,
    );
    setIsUsingSearchResults(false); // Switch back to filter mode
    // setSelectedDistance(null);
    // setSelectedInsurance([]);
    // setAvailability(false);
    // setLease(false);
    // setOnSite(false);
    setCurrentPage(1);
  };

  // Trigger refetch when filterQueryParams changes
  useEffect(() => {
    if (filterQueryParams && !isUsingSearchResults) {
      refetchListings();
    }
  }, [filterQueryParams, refetchListings, isUsingSearchResults]);

  // Update listings and total pages when data changes
  useEffect(() => {
    if (listings && listings?.data && !isUsingSearchResults) {
      setFilteredListings(listings?.data);
      setTotalPages(Math.ceil(listings?.total_count / itemsPerPage));
    }
  }, [listings, isUsingSearchResults]);

  // Update filterQueryParams when currentPage changes
  useEffect(() => {
    setFilterQueryParams(
      `skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}${
        selectedCategory ? `&category=${selectedCategory}` : ""
      }${selectedRatings.length > 0 ? `&rating=${selectedRatings[0]}` : ""}${
        selectedState ? `&city=${selectedState}` : ""
      }${selectedCountry ? `&country=${selectedCountry}` : ""}`,
    );
  }, [
    currentPage,
    selectedCategory,
    selectedRatings,
    selectedState,
    selectedCountry,
    itemsPerPage,
  ]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
        isFiltering={fetchingListings || isLoading}
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
        isLoading={fetchingListings || isLoading}
      />
    </main>
  );
};

export default ListingsContent;
