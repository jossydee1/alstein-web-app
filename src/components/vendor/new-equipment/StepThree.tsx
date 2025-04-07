/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Images, X } from "lucide-react";
import { useEquipmentForm } from "@/context";

const StepThree = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { formData, updateFormData } = useEquipmentForm();
  const [features, setFeatures] = useState<string[]>(formData.features || []);
  const [featureInput, setFeatureInput] = useState(
    formData.features?.[0] || "",
  );
  const [images, setImages] = useState<File[]>(formData.images || []);
  const [error, setError] = useState("");

  const handleFeatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureInput(e.target.value);
  };

  const handleFeatureKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && featureInput.trim()) {
      e.preventDefault();
      setFeatures(prevFeatures => [...prevFeatures, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (features.length < 5) {
      setError("Please add at least 5 features.");
      return;
    }
    if (images.length < 5) {
      setError("Please upload at least 5 images.");
      return;
    }

    setError("");

    updateFormData({ features, images });
    onNext();
  };

  return (
    <main className="space-y-9">
      <div className="dashboard-section-card">
        <header className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title text-[#172554]">
              Equipment Specification
            </h1>
            <p className="dashboard-section-card-description">
              Provide key technical details to help customers make informed
              decisions.
            </p>
          </div>
          <p className="text-3xl font-semibold text-[#172554]">Step 3</p>
        </header>

        <section className="mt-7 space-y-7">
          <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
            <div className="w-full max-w-[420px]">
              <Label htmlFor="feature" className="mb-4">
                Key Features
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="feature"
                name="feature"
                placeholder="e.g Durable"
                value={featureInput}
                onChange={handleFeatureInputChange}
                onKeyPress={handleFeatureKeyPress}
                required
              />
              <sup className="mt-4 block">Min of 5 Features</sup>

              <div className="mt-4 flex flex-wrap gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-[#6B7280]"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFeatures(prevFeatures =>
                          prevFeatures.filter((_, i) => i !== index),
                        )
                      }
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </section>
      </div>

      <div className="dashboard-section-card">
        <header className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title text-[#172554]">
              Add Images
            </h1>
            <p className="dashboard-section-card-description">
              Upload images of your equipment to showcase its features and
              condition. Minimum of 5 images required.
            </p>
          </div>
        </header>

        <section className="mt-7 space-y-7">
          <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
            <div className="w-full">
              <label htmlFor="images" className="mb-2">
                Upload Images
                <div className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-5 py-10 text-center">
                  <Images className="h-10 w-10 text-[#2563EB]" />
                  <p className="mt-4 text-sm text-[#1F2937]">
                    Drop your images here or{" "}
                    <span className="text-blue-600 underline">browse</span>
                  </p>
                  <p className="mt-2 text-xs text-[#9CA3AF]">
                    Maximum size: (JPG, PNG – Max 5MB)
                  </p>
                  <input
                    className="hidden"
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>{" "}
              </label>
            </div>
          </form>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg border border-[#E5E7EB] ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="h-[250px] w-full object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-white p-2"
                >
                  <X className="" size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {error && (
          <p className="my-7 w-full rounded-lg bg-red-100 p-4 text-center text-red-700">
            {error}
          </p>
        )}

        <div className="mt-7 flex flex-wrap justify-between gap-4">
          <Button variant="outline" type="button" onClick={onBack}>
            Back
          </Button>
          <Button className="buttonBlue2" type="button" onClick={handleNext}>
            Save and Continue
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StepThree;
