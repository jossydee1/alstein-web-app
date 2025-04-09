"use client";

import React, { useState } from "react";
import Banner from "../Banner";
import style from "../style.module.scss";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { webRoutes } from "@/utils";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import {
  CheckCircle,
  ShoppingCart,
  // User,
  // BriefcaseMedical,
} from "lucide-react";

const options = [
  {
    id: "vendor",
    title: "I'm a Vendor",
    description:
      "Partner with Alstein as an equipment vendor and expand your reach.",
    icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
    subOptions: [
      { name: "Laboratory", id: "laboratory" },
      { name: "Professional", id: "professional" },
    ],
  },
  // {
  //   id: "practitioner",
  //   title: "I'm a Practitioner",
  //   description:
  //     "Join Alstein as a practitioner and connect with researchers, healthcare professionals.",
  //   icon: <User className="h-6 w-6 text-gray-500" />,
  // },
  // {
  //   id: "provider",
  //   title: "I'm a Service Provider",
  //   description:
  //     "Register as a service provider on Alstein and offer your medical or scientific services.",
  //   icon: <BriefcaseMedical className="h-6 w-6 text-gray-500" />,
  // },
];

const PartnerSetupContent = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("vendor");
  const [selectedSubOption, setSelectedSubOption] = useState("");

  const handleCreatePartnerType = () => {
    router.push(`/partner-setup/${selected}?type=${selectedSubOption}`);
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
          <header className="w-full px-6">
            <h1 className="text-[30px] font-bold text-[#2D2D2D]">
              Partnership Type
            </h1>
            <p className="mt-0.5 font-visbymedium text-gray-400 antialiased">
              Kindly select how you will like to partner with us!
            </p>
          </header>

          <section className="w-full max-w-lg space-y-4 p-6">
            {options.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setSelected(option.id);
                  setSelectedSubOption(""); // Reset sub-option when a new option is selected
                }}
                className={`block cursor-pointer rounded-md border p-4 text-left transition-all ${
                  selected === option.id
                    ? "border-red-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>{option.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {option.title}
                      </h3>
                      <p className="font-visbymedium text-sm text-gray-500 antialiased">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  {selected === option.id && (
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  )}
                </div>

                {selected === option.id && option.subOptions && (
                  <div className="mt-4">
                    <h4 className="mb-2 pl-9 pr-1 text-sm font-semibold text-gray-900">
                      Select type
                    </h4>
                    <div className="mt-3 grid grid-cols-2 gap-3 pl-9 pr-1">
                      {option.subOptions.map(subOption => {
                        const isSelected = selectedSubOption === subOption.id;
                        return (
                          <label
                            key={subOption.id}
                            className={`flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow transition-all ${
                              isSelected
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-gray-300 text-gray-700 hover:border-blue-400"
                            }`}
                          >
                            <input
                              type="radio"
                              name="subOption"
                              value={subOption.id}
                              checked={isSelected}
                              onChange={() =>
                                setSelectedSubOption(subOption.id)
                              }
                              className="hidden"
                            />
                            {subOption.name}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </button>
            ))}
            <Button
              onClick={handleCreatePartnerType}
              className="w-full"
              disabled={
                !selected || (selected === "vendor" && !selectedSubOption)
              }
            >
              Continue
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PartnerSetupContent;
