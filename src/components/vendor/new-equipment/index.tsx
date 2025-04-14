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
import ConfirmationModal from "./ConfirmationModal";
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

  const { formData, updateFormData } = useEquipmentForm();

  const [status, setStatus] = useState("success");
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    console.log("Form Data:", formData);

    if (!businessProfile?.id) {
      toast.error("Business Profile ID is missing. Please try again.");
      setIsProcessing(false);
      return;
    }

    const updatedFormData = {
      ...formData,
      partner_id: businessProfile.id,
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

      if (response.status !== 200 || !response.data) {
        toast.error(response.data.message || "Failed to update partner data");
        return;
      }

      setOpen(true);
      setStatus("success");
      updateFormData({
        name: "",
        description: "",
        address: "",
        longitude: "",
        latitude: "",
        city: "",
        country: "",
        service_type: "",
        price: 0,
        category_id: "",
        // features: [],
      });
    } catch (error) {
      toast.error(formatError(error, "Failed to update partner data"));
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
      onNext={() => setCurrentStep(4)}
      onBack={() => setCurrentStep(2)}
    />,
    <StepFour onSubmit={handleSubmit} onBack={() => setCurrentStep(3)} />,
  ];

  return (
    <>
      {isProcessing && <LoadingState />}
      <div className="space-y-9">
        <ConfirmationModal status={status} open={open} setOpen={setOpen} />
        {steps[currentStep]}
      </div>
    </>
  );
};

export default NewEquipmentContent;
