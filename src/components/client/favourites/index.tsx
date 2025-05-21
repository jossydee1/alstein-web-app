"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context";
import { useClientFetch } from "@/hooks";
import { ListingProps, ListingHistoryProps } from "@/types";
import Listings from "./Listings";
import { LoadingState } from "@/components/common";

const FavouritesPageContent = () => {
  const { token } = useAuth();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);
  const [listings, setListings] = useState<ListingProps[]>([]);

  const url = `/client/public/api/v1/equipments/get-favourite-equipments?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`;

  // Fetch all listings
  const { data, isLoading, error } = useClientFetch<ListingHistoryProps>({
    endpoint: url,
    token,
  });

  // Update listings and total pages when data changes
  useEffect(() => {
    if (data && data?.data) {
      setListings(data?.data);
      setTotalPages(Math.ceil(data?.total_count / itemsPerPage));
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {isLoading && <LoadingState />}

      <main className="dashboard-section-card">
        <header className="dashboard-section-card-header mb-[50px]">
          <h1 className="dashboard-section-card-title">
            Favourited Equipments
          </h1>
          <p className="dashboard-section-card-description">
            Manage your favourite equipments for quick access and easy
            navigation.
          </p>
        </header>

        {error && (
          <div className="mt-[50px] flex items-center justify-center">
            <p className="text-red-500">Error fetching equipments</p>
          </div>
        )}

        {listings && listings?.length > 0 ? (
          <Listings
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            listings={listings || []}
            isLoading={isLoading}
          />
        ) : (
          !error && (
            <div className="mt-[50px] flex items-center justify-center">
              <p className="text-gray-500">No favourite equipments available</p>
            </div>
          )
        )}
      </main>
    </>
  );
};

export default FavouritesPageContent;
