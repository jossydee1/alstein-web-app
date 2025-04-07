/* eslint-disable react/jsx-key */
"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Intro from "./Intro";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { EquipmentFormDataProvider, useEquipmentForm } from "@/context";
import { useRouter } from "next/navigation";
import { dashboardRoutes } from "@/utils";

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
  const router = useRouter();
  const { formData, updateFormData } = useEquipmentForm();

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
    <StepFour
      onNext={() => setCurrentStep(5)}
      onBack={() => setCurrentStep(3)}
    />,
    <StepFive
      onSubmit={() => {
        console.log("Form Data:", formData);
        updateFormData({
          category: "",
          availability: "",
          name: "",
          description: "",
          features: [],
          images: [],
          address: "",
          documents: [],
        });
        router.push(dashboardRoutes.vendor_equipments);
      }}
      onBack={() => setCurrentStep(4)}
    />,
  ];

  return <div className="space-y-9">{steps[currentStep]}</div>;
};

export default NewEquipmentContent;
