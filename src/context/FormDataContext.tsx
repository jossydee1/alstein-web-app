"use client";

import React, { createContext, useContext, useState } from "react";

interface FormData {
  name: string;
  description: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  city?: string;
  country?: string;
  service_type: string;
  price: number;
  partner_id: string;
  category_id: string;
  // features: string[];
}

interface EquipmentFormContextProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const EquipmentFormContext = createContext<
  EquipmentFormContextProps | undefined
>(undefined);

export const EquipmentFormDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    address: "",
    longitude: "",
    latitude: "",
    city: "",
    country: "",
    service_type: "",
    price: 0,
    partner_id: "",
    category_id: "",
    // features: [],
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <EquipmentFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </EquipmentFormContext.Provider>
  );
};

export const useEquipmentForm = () => {
  const context = useContext(EquipmentFormContext);
  if (!context) {
    throw new Error(
      "useEquipmentForm must be used within a EquipmentFormDataProvider",
    );
  }
  return context;
};
