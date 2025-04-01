"use client";

import React from "react";
import Banner from "../../Banner";
import style from "../../style.module.scss";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { countriesList, webRoutes } from "@/utils";
// import { Progress } from "../ui/progress";
import { Button } from "../../../ui/button";
import { useRouter } from "next/navigation";
// import google from "@/public/images/logos/google.svg";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { useState } from "react";

// import { Checkbox } from "../ui/checkbox";

const steps = [
  { id: 1, label: "Business Info" },
  { id: 2, label: "Address" },
  { id: 3, label: "Certificate" },
];

export function Stepper() {
  // setCurrentStep
  const [currentStep] = useState(1);

  return (
    <div className="flex items-center justify-between space-x-6">
      {steps.map(step => (
        <div key={step.id} className="flex items-center space-x-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${step.id === currentStep ? "bg-blue-600" : "bg-gray-300"}`}
          >
            {step.id}
          </div>
          <span
            className={`text-sm font-medium ${step.id === currentStep ? "text-black" : "text-gray-400"}`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const PartnerSignupContent = () => {
  const router = useRouter();
  //   const [selected, setSelected] = useState("vendor");
  const [formData, setFormData] = useState({
    phone: "",
    countryCode: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //   const [completedStepOne, setCompletedStepOne] = useState(false);

  //  return !completedStepOne ? (
  //     <PersonalDetails setCompletedStepOne={setCompletedStepOne} />
  //   ) : (
  //     <Security />
  //   );

  const handleSaveAndContinue = () => {
    router.push(`/partner-setup/vendor/address`);
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
            <Image alt="Company Logo" src={logoLight} width={130} height={48} />
          </Link>
        </div>

        <main className={style.formWrapper}>
          <div className="w-full">
            <Stepper />
          </div>

          <header className="mb-4 mt-6 w-full">
            <h1 className="text-[20px] font-bold text-[#2D2D2D]">
              Buisness Information
            </h1>
            <p className="mt-0.5 font-visbymedium text-sm text-gray-400 antialiased">
              Kindly provide your business Information
            </p>
          </header>

          <form>
            <div className="w-full">
              <label
                htmlFor="business_name"
                className="mb-1 font-visbysemibold text-sm text-gray-800"
              >
                Business Name
              </label>
              <input
                type="text"
                id="business_name"
                className="block w-full rounded-lg border border-gray-300 p-2.5 outline-none placeholder:text-xs"
                name="business_name"
                placeholder="E.x, Alstein Equipment"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="contact_email"
                className="mb-1 font-visbysemibold text-sm text-gray-800"
              >
                Contact Email
              </label>
              <input
                type="text"
                id="contact_email"
                className="block w-full rounded-lg border border-gray-300 p-2.5 outline-none placeholder:text-xs"
                name="business_name"
                placeholder="E.x, contact@medtechsolutions.com"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="specialization"
                className="mb-1 font-visbysemibold text-sm text-gray-800"
              >
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                className="block w-full rounded-lg border border-gray-300 p-2.5 outline-none placeholder:text-xs"
                name="specialization"
                placeholder="E.x, We offer specialize equipment for Dentist, and Optician"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="mission"
                className="mb-1 font-visbysemibold text-sm text-gray-800"
              >
                Mission
              </label>
              <textarea
                name=""
                className="block w-full rounded-lg border border-gray-300 p-2.5 outline-none placeholder:text-xs"
                placeholder="Ex. To empower healthcare professionals with innovative and reliable medical equipment, ensuring better healthcare delivery worldwide."
                id="mission"
              ></textarea>
            </div>
            <div className="flex w-full space-x-2">
              <div className="">
                <label htmlFor="phone">Phone Number*</label>
                <div className={style.inputGroupPhone}>
                  <div className={style.customSelect}>
                    <select
                      name="countryCode"
                      id="countryCode"
                      required
                      value={formData.countryCode}
                      onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="specialization"
                  className="mb-1 font-visbysemibold text-sm text-gray-800"
                >
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 outline-none placeholder:text-xs"
                  name="specialization"
                  placeholder="E.x, We offer specialize equipment for Dentist, and Optician"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleSaveAndContinue}
              className="w-full rounded-lg bg-blue-600 py-2 text-center font-semibold text-white antialiased transition-all hover:bg-blue-700"
            >
              Save & Continue
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default PartnerSignupContent;
