"use client";

import React, { createContext, useContext, useState } from "react";

interface FormData {
  category: string;
  availability: string;
  name: string;
  description: string;
  features: string[];
  images: File[];
  address: string;
  documents: File[];
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
    category: "",
    availability: "",
    name: "",
    description: "",
    features: [],
    images: [],
    address: "",
    documents: [],
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
