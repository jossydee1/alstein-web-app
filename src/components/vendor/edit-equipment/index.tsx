"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useClientFetch } from "@/hooks";
import { LoadingState } from "@/components/common";
import { EquipmentFormDataProvider, useAuth } from "@/context";
import EditEquipmentForm from "./EditEquipmentForm";
import { ListingInfoProps } from "@/types";
import { formatError } from "@/utils";

const EditEquipmentContent = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [equipmentData, setEquipmentData] = useState<ListingInfoProps | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const {
    data: listingInfo,
    isLoading: fetchingListing,
    error: listingError,
  } = useClientFetch<ListingInfoProps>({
    endpoint: `/partner/api/v1/equipments/get-equipment?equipment_id=${id}`,
    token,
    enabled: !!id && !!token,
  });

  useEffect(() => {
    if (listingError) {
      setError(formatError(listingError));
      setIsLoading(false);
    } else if (listingInfo && !fetchingListing) {
      setEquipmentData(listingInfo);
      setIsLoading(false);
    }
  }, [listingInfo, fetchingListing, listingError]);

  if (isLoading || fetchingListing) {
    return <LoadingState />;
  }

  if (error || !equipmentData) {
    return (
      <div className="dashboard-section-card p-6">
        <h1 className="text-xl font-semibold text-red-500">
          Error loading equipment data
        </h1>
        <p className="mt-2">{error || "Equipment not found"}</p>
      </div>
    );
  }

  return (
    <EquipmentFormDataProvider
      initialData={{
        id: equipmentData.id,
        name: equipmentData.name,
        brand: equipmentData.brand,
        description: equipmentData.description,
        price: equipmentData.price / 100, // Convert from cents to actual amount
        address: equipmentData.address || "",
        service_type: equipmentData.service_type,
        category_id: equipmentData.category_id,
        partner_id: equipmentData.partner_id,
        city: equipmentData.city || "",
        country: equipmentData.country || "",
        latitude: equipmentData.latitude || "",
        longitude: equipmentData.longitude || "",
      }}
    >
      <EditEquipmentForm equipmentData={equipmentData} />
    </EquipmentFormDataProvider>
  );
};

export default EditEquipmentContent;
