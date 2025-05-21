/* eslint-disable react/jsx-key */
"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Intro from "./Intro";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import {
  EquipmentFormDataProvider,
  useAuth,
  useEquipmentForm,
} from "@/context";
import { toast } from "react-toastify";
import { api, formatError } from "@/utils";
import { LoadingState } from "@/components/common";

const NewEquipmentContent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <EquipmentFormDataProvider>
      <FormStepsWithContext
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </EquipmentFormDataProvider>
  );
};

const FormStepsWithContext = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const { token, businessProfile } = useAuth();
  const { formData } = useEquipmentForm();

  const [isProcessing, setIsProcessing] = useState(false);
  const [equipmentId, setEquipmentId] = useState<string | null>(null);

  const handleSubmit = async () => {
    console.log("Form Data:", formData);

    if (!businessProfile?.id) {
      toast.error("Business Profile ID is missing. Please try again.");
      setIsProcessing(false);
      return null;
    }

    const updatedFormData = {
      ...formData,
      price: (formData?.price || 0) * 100,
      partner_id: businessProfile?.id,
    };

    setIsProcessing(true);
    try {
      const response = await api.post(
        "/partner/api/v1/equipments/create-equipment",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        toast.error(response?.data?.message || "Failed to create equipment");
        return null;
      }

      return response?.data?.data?.id; // Return the created equipment ID
    } catch (error) {
      toast.error(formatError(error, "Failed to create equipment"));
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    <Intro onNext={() => setCurrentStep(1)} />,
    <StepOne
      onNext={() => setCurrentStep(2)}
      onBack={() => setCurrentStep(0)}
    />,
    <StepTwo
      onNext={() => setCurrentStep(3)}
      onBack={() => setCurrentStep(1)}
    />,
    <StepThree
      onNext={async () => {
        const id = await handleSubmit();
        if (id) {
          setEquipmentId(id);
          setCurrentStep(4);
        }
      }}
      onBack={() => setCurrentStep(2)}
    />,
    <StepFour equipmentId={equipmentId} onBack={() => setCurrentStep(3)} />,
  ];

  return (
    <>
      {isProcessing && <LoadingState />}
      <div className="space-y-9">{steps[currentStep]}</div>
    </>
  );
};

export default NewEquipmentContent;
