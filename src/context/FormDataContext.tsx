"use client";

import { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the equipment form data
interface EquipmentFormData {
  id?: string;
  name?: string;
  brand?: string;
  description?: string;
  price?: number;
  service_type?: string;
  bill_type?: string;
  category_id?: string;
  partner_id?: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
}

// Define the shape of the context
interface EquipmentFormContextProps {
  formData: EquipmentFormData;
  updateFormData: (data: Partial<EquipmentFormData>) => void;
}

// Define the provider props type
interface EquipmentFormProviderProps {
  children: ReactNode;
  initialData?: EquipmentFormData;
}

// Create the context
const EquipmentFormContext = createContext<
  EquipmentFormContextProps | undefined
>(undefined);

// Create the provider component
export const EquipmentFormDataProvider = ({
  children,
  initialData = {},
}: EquipmentFormProviderProps) => {
  const [formData, setFormData] = useState<EquipmentFormData>(initialData);

  const updateFormData = (data: Partial<EquipmentFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <EquipmentFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </EquipmentFormContext.Provider>
  );
};

// Create and export the hook
export const useEquipmentForm = () => {
  const context = useContext(EquipmentFormContext);
  if (context === undefined) {
    throw new Error(
      "useEquipmentForm must be used within a EquipmentFormDataProvider",
    );
  }
  return context;
};
