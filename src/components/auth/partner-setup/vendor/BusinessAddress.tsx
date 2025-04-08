"use client";

import React from "react";
import Banner from "../../Banner";
import style from "../../style.module.scss";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { webRoutes } from "@/utils";
// import { Progress } from "../ui/progress";
import { Button } from "../../../ui/button";
import { useRouter } from "next/navigation";
// import google from "@/public/images/logos/google.svg";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
// import { useState } from "react";
import { CustomSelect } from "@/components/global/CustomSelect";

// import { Checkbox } from "../ui/checkbox";

const steps = [
  { id: 1, label: "Business Info", ischecked: true },
  { id: 2, label: "Address", ischecked: true },
  { id: 3, label: "Certificate", ischecked: false },
];

export function Stepper() {
  // setCurrentStep
  //   const [currentStep] = useState(1);

  return (
    <div className="flex items-center justify-between space-x-6">
      {steps.map(step => (
        <div key={step.id} className="flex items-center space-x-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${step.ischecked ? "bg-blue-600" : "bg-gray-300"}`}
          >
            {step.id}
          </div>
          <span
            className={`text-sm font-medium ${step.ischecked ? "text-black" : "text-gray-400"}`}
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

  //   const [completedStepOne, setCompletedStepOne] = useState(false);

  //  return !completedStepOne ? (
  //     <PersonalDetails setCompletedStepOne={setCompletedStepOne} />
  //   ) : (
  //     <Security />
  //   );

  const handleSaveAndContinue = () => {
    router.push(`/partner-setup/vendor/documents`);
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
          <div className="w-full">
            <Stepper />
          </div>

          <header className="mb-4 mt-6 w-full">
            <h1 className="text-[20px] font-bold text-[#2D2D2D]">
              Buisness Address
            </h1>
            <p className="mt-0.5 font-visbymedium text-sm text-gray-400 antialiased">
              Kindly provide your business Information
            </p>
          </header>

          <form>
            <div className="w-full">
              <CustomSelect />
            </div>

            <div className="w-full">
              <label
                htmlFor="contact_email"
                className="mb-1 font-visbysemibold text-sm text-gray-800"
              >
                Country
              </label>
              <input
                type="text"
                id="contact_email"
                className="block w-full rounded-md border border-gray-300 p-2.5 outline-none placeholder:text-xs"
                name="business_name"
                placeholder="E.x, Ghana"
                required
              />
            </div>
            <div className="flex w-full justify-between space-x-2">
              <div className="w-full">
                <label
                  htmlFor="specialization"
                  className="mb-1 font-visbysemibold text-sm text-gray-800"
                >
                  City
                </label>
                <input
                  type="text"
                  id="specialization"
                  className="block w-full rounded-md border border-gray-300 p-2.5 outline-none placeholder:text-xs"
                  name="specialization"
                  placeholder="E.x, Ibadan"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="specialization"
                  className="mb-1 font-visbysemibold text-sm text-gray-800"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="specialization"
                  className="block w-full rounded-md border border-gray-300 p-2.5 outline-none placeholder:text-xs"
                  name="specialization"
                  placeholder="E.x, 110181"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleSaveAndContinue}
              className="w-full rounded-md bg-blue-600 py-2 text-center font-semibold text-white antialiased transition-all hover:bg-blue-700"
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
