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
import { useState, ChangeEvent } from "react";
import { Upload } from "lucide-react";

// import { Checkbox } from "../ui/checkbox";

const steps = [
  { id: 1, label: "Business Info", ischecked: true },
  { id: 2, label: "Address", ischecked: true },
  { id: 3, label: "Certificate", ischecked: true },
];

const documents = [
  "Business registration certificate",
  "Medical laboratory science license",
  "Nigerian institute of science laboratory license",
  "Name of Resident medical laboratory scientist with current practicing license",
];

type FileState = {
  [key: string]: File;
};
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

  //   const handleSaveAndContinue = () => {
  //     router.push(`/partner-setup/vendor/documents`);
  //   };
  const [files, setFiles] = useState<FileState>({});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, doc: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles({ ...files, [doc]: e.target.files[0] });
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
          <div className="w-full">
            <Stepper />
          </div>

          <header className="mb-4 mt-6 w-full">
            <h1 className="text-[20px] font-bold text-[#2D2D2D]">
              Upload Documents
            </h1>
            <p className="mt-0.5 font-visbymedium text-sm text-gray-400 antialiased">
              To ensure trust and compliance, please upload the necessary
              business verification documents
            </p>
          </header>
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
          <button className="mt-4 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Submit for Review
          </button>
        </main>
      </div>
    </div>
  );
};

export default PartnerSignupContent;
