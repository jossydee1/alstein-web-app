/* eslint-disable react/jsx-key */
"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { useAuth, useEquipmentForm } from "@/context";
import { toast } from "react-toastify";
import { api, formatError } from "@/utils";
import { LoadingState } from "@/components/common";
import { ListingInfoProps } from "@/types";

interface EditEquipmentFormProps {
  equipmentData: ListingInfoProps;
}

const EditEquipmentForm = ({ equipmentData }: EditEquipmentFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <FormStepsWithContext
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      equipmentData={equipmentData}
    />
  );
};

const FormStepsWithContext = ({
  currentStep,
  setCurrentStep,
  equipmentData,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  equipmentData: ListingInfoProps;
}) => {
  const { token, businessProfile } = useAuth();
  const { formData } = useEquipmentForm();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!businessProfile?.id) {
      toast.error("Business Profile ID is missing. Please try again.");
      return null;
    }

    const updatedFormData = {
      ...formData,
      price: (formData?.price || 0) * 100, // Convert to cents
      partner_id: businessProfile?.id,
    };

    setIsProcessing(true);
    try {
      const response = await api.post(
        "/partner/api/v1/equipments/update-equipment",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        toast.error(response?.data?.message || "Failed to update equipment");
        return null;
      }

      return equipmentData.id;
    } catch (error) {
      toast.error(formatError(error, "Failed to update equipment"));
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    <StepOne onNext={() => setCurrentStep(1)} equipmentData={equipmentData} />,
    <StepTwo
      onNext={() => setCurrentStep(2)}
      onBack={() => setCurrentStep(0)}
      equipmentData={equipmentData}
    />,
    <StepThree
      onNext={async () => {
        const id = await handleSubmit();
        if (id) {
          setCurrentStep(3);
        }
      }}
      onBack={() => setCurrentStep(1)}
      equipmentData={equipmentData}
    />,
    <StepFour
      equipmentId={equipmentData.id}
      onBack={() => setCurrentStep(2)}
      equipmentData={equipmentData}
    />,
  ];

  return (
    <>
      {isProcessing && <LoadingState />}
      <div className="space-y-9">{steps[currentStep]}</div>
    </>
  );
};

export default EditEquipmentForm;
