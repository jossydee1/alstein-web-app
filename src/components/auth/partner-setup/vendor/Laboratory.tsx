"use client";

import React, { useState } from "react";
import Banner from "../../Banner";
import style from "../../style.module.scss";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { webRoutes, formatError, api } from "@/utils";
import { Button } from "../../../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { Upload } from "lucide-react";
import { CustomSelect, LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { ApiResponseProps, PartnerProps } from "@/types";
import { useAuth } from "@/context";

const steps = [
  {
    id: 1,
    label: "Business Infomation",
    body: "Kindly provide your business Information",
  },
  { id: 2, label: "Address", body: "Kindly provide your business address" },
  {
    id: 3,
    label: "Certificate",
    body: "To ensure trust and compliance, please upload the necessary business verification documents",
  },
];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between space-x-6">
      {steps.map(step => (
        <div key={step.id} className="flex items-center space-x-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
              step.id <= currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            {step.id}
          </div>
          <span
            className={`text-sm font-medium ${
              step.id <= currentStep ? "text-black" : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const LaboratoryPageContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();
  const { token } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PartnerProps>({
    name: "",
    logo: "",
    bio: "",
    website: "",
    city: "",
    state: "",
    country: "",
    address: "",
    longitude: "",
    latitude: "",
    type: type || "",
    specializations: "",
    mission: "",
    support_email: "",
    institutional_email: "",
    department: "",
    department_head_email: "",
    institution: "",
    documents: {},
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: string,
  ) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    doc: string,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [doc]: { title: doc, image: file.name }, // Update the document with the file name
        },
      }));
    }
  };

  const handleSaveAndContinue = async () => {
    setIsProcessing(true);

    // Prepare data for the current step
    let stepData = {};
    switch (currentStep) {
      case 1:
        stepData = {
          name: formData.name,
          support_email: formData.support_email,
          bio: formData.bio,
          specializations: formData.specializations,
          mission: formData.mission,
        };
        break;
      case 2:
        stepData = {
          country: formData.country,
          city: formData.city,
          state: formData.state,
          address: formData.address,
        };
        break;
      case 3:
        stepData = {
          documents: formData.documents,
        };
        break;
      default:
        break;
    }

    try {
      const response = await api.post<ApiResponseProps<PartnerProps>>(
        "/partner/api/v1/update-partner",
        stepData,
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

      toast.success("Step data saved successfully!");

      // Move to the next step if not the last step
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        toast.success("All steps completed!");
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to update partner data"));
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className={style.inputGroup}>
              <label htmlFor="business_name">Business Name</label>
              <input
                type="text"
                id="business_name"
                value={formData.name}
                onChange={e => handleChange(e, "name")}
                placeholder="Acme Labs"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="support_email">Contact Email</label>
              <input
                type="email"
                id="support_email"
                value={formData.support_email}
                onChange={e => handleChange(e, "support_email")}
                placeholder="acme@example.com"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="business_description">Business Description</label>
              <textarea
                id="business_description"
                value={formData.bio}
                onChange={e => handleChange(e, "bio")}
                placeholder="We are a medical laboratory that specializes in..."
                rows={4}
              ></textarea>
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="specializations">Specialization</label>
              <input
                type="text"
                id="specializations"
                value={formData.specializations}
                onChange={e => handleChange(e, "specializations")}
                placeholder="We offer specialized equipment for Dentist, Optician..."
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="mission">Mission</label>
              <textarea
                id="mission"
                value={formData.mission}
                onChange={e => handleChange(e, "mission")}
                placeholder="To empower healthcare professionals with innovative and reliable medical equipment..."
                rows={4}
              ></textarea>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={style.inputGroup}>
              <CustomSelect />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                value={formData.country}
                onChange={e => handleChange(e, "country")}
                placeholder="Ghana"
                required
              />
            </div>
            <div className="flex w-full justify-between space-x-2">
              <div className={style.inputGroup}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={e => handleChange(e, "city")}
                  placeholder="Ibadan"
                  required
                />
              </div>
            </div>
            <div className="flex w-full justify-between space-x-2">
              <div className={style.inputGroup}>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  value={formData.state}
                  onChange={e => handleChange(e, "state")}
                  placeholder="Ibadan"
                  required
                />
              </div>
            </div>
          </>
        );
      case 3:
        const documents = [
          "Business registration certificate",
          "Medical laboratory science license",
          "Nigerian institute of science laboratory license",
          "Name of Resident medical laboratory scientist with current practicing license",
        ];
        return (
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <label
                key={index}
                className="flex min-h-16 cursor-pointer items-center space-x-3 rounded-md border bg-gray-50 p-3"
              >
                <Upload className="text-gray-400" />
                <span className="flex-1 text-sm text-gray-600">
                  {formData.documents[doc]?.image
                    ? `Selected: ${formData.documents[doc]?.image}`
                    : doc}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={e => handleFileChange(e, doc)}
                />
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isProcessing && <LoadingState />}
      <div className={style.wrapper}>
        <Banner />
        <div className={style.container}>
          <div className={style.topBar}>
            <Button
              variant="ghost"
              type="button"
              onClick={() => router.back()}
              className={style.backButton}
            >
              <ChevronLeft />
              Back
            </Button>
            <Link
              className={style.logoLink}
              href={webRoutes.home}
              aria-label="Brand"
            >
              <Image
                alt="Alstein Logo"
                src={logoLight}
                width={130}
                height={48}
              />
            </Link>
          </div>
          <main className={style.formWrapper}>
            <div className={style.inputGroup}>
              <Stepper currentStep={currentStep} />
            </div>
            <header className="mb-4 mt-6 w-full">
              <h1 className="text-[20px] font-bold text-[#2D2D2D]">
                {steps[currentStep - 1].label}
              </h1>
              <p className="mt-0.5 font-visbymedium text-sm text-gray-400 antialiased">
                {steps[currentStep - 1].body}
              </p>
            </header>
            <form>
              {renderStepContent()}
              <Button
                type="button"
                onClick={handleSaveAndContinue}
                className={style.inputGroup}
              >
                {currentStep === steps.length
                  ? "Submit for Review"
                  : " Save & Continue"}
              </Button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default LaboratoryPageContent;
