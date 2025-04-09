"use client";

import React, { useState } from "react";
import Banner from "../../Banner";
import style from "../../style.module.scss";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { webRoutes, countriesList } from "@/utils";
import { Button } from "../../../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { Upload } from "lucide-react";
import { CustomSelect } from "@/components/common";

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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    contactEmail: "",
    specialization: "",
    mission: "",
    phone: "",
    countryCode: "",
    country: "",
    city: "",
    postalCode: "",
    documents: {},
  });

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
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, [doc]: e.target.files?.[0] || null },
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
  };

  // const handleSubmit = () => {
  //   console.log("Form submitted:", formData);
  //   router.push(webRoutes.home);
  // };

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
                value={formData.businessName}
                onChange={e => handleChange(e, "businessName")}
                placeholder="Acme Labs"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="contact_email">Contact Email</label>
              <input
                type="email"
                id="contact_email"
                value={formData.contactEmail}
                onChange={e => handleChange(e, "contactEmail")}
                placeholder="acme@example.com"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                id="specialization"
                value={formData.specialization}
                onChange={e => handleChange(e, "specialization")}
                placeholder="We offer specialized equipment for Dentist and Optician"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="mission">Mission</label>
              <textarea
                id="mission"
                value={formData.mission}
                onChange={e => handleChange(e, "mission")}
                placeholder="To empower healthcare professionals with innovative and reliable medical equipment, ensuring better healthcare delivery worldwide."
                rows={4}
              ></textarea>
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="phone">Phone Number*</label>
              <div className={style.inputGroupPhone}>
                <div className={style.customSelect}>
                  <select
                    name="countryCode"
                    id="countryCode"
                    required
                    value={formData.countryCode}
                    onChange={e => handleChange(e, "countryCode")}
                    data-display-type="flag-code"
                  >
                    <option value="" disabled>
                      Select country
                    </option>
                    {countriesList.map(country => (
                      <option
                        key={country.code}
                        value={country.dial_code}
                        data-flag={country.flag}
                      >
                        {country.name} {country.flag} {country.dial_code}
                      </option>
                    ))}
                  </select>
                  <div className={style.selectedFlag}>
                    {formData.countryCode ? (
                      <>
                        {
                          countriesList.find(
                            c => c.dial_code === formData.countryCode,
                          )?.flag
                        }{" "}
                        {formData.countryCode}
                      </>
                    ) : (
                      <>🌐 Select</>
                    )}
                  </div>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={e => handleChange(e, "phone")}
                />
              </div>
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
              <div className={style.inputGroup}>
                <label htmlFor="postal_code">Postal Code</label>
                <input
                  type="text"
                  id="postal_code"
                  value={formData.postalCode}
                  onChange={e => handleChange(e, "postalCode")}
                  placeholder="110181"
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
                <span className="flex-1 text-sm text-gray-600">{doc}</span>
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
            <Image alt="Alstein Logo" src={logoLight} width={130} height={48} />
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
              onClick={handleNext}
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
  );
};

export default LaboratoryPageContent;
