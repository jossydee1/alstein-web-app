/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Images, X } from "lucide-react";
import { useEquipmentForm } from "@/context";

const StepFive = ({
  onSubmit,
  onBack,
}: {
  onSubmit: () => void;
  onBack: () => void;
}) => {
  const { formData, updateFormData } = useEquipmentForm();
  const [documents, setDocuments] = useState<File[]>(formData.documents || []);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setDocuments(prevdocuments => prevdocuments.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (documents.length < 1) {
      setError("Please upload at least one document.");
      return;
    }
    setError("");

    updateFormData({ documents });
    onSubmit();
  };

  return (
    <main className="space-y-9">
      <div className="dashboard-section-card">
        <header className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title text-[#172554]">
              Documents
            </h1>
            <p className="dashboard-section-card-description">
              Upload necessary certifications and maintenance records to ensure
              compliance and reliability
            </p>
          </div>
          <p className="text-3xl font-semibold text-[#172554]">Step 5</p>
        </header>

        <section className="mt-7 space-y-7">
          <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
            <div className="w-full">
              <label htmlFor="documents" className="mb-2">
                Upload documents
                <div className="flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-[#E5E7EB] bg-[#F8FAFC] p-5 py-10 text-center">
                  <Images className="h-10 w-10 text-[#2563EB]" />
                  <p className="mt-4 text-sm text-[#1F2937]">
                    Drop your documents here or{" "}
                    <span className="text-blue-600 underline">browse</span>
                  </p>
                  <p className="mt-2 text-xs text-[#9CA3AF]">
                    Maximum size: (JPG, PNG – Max 5MB)
                  </p>
                  <input
                    className="hidden"
                    type="file"
                    id="documents"
                    name="documents"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>{" "}
              </label>
            </div>
          </form>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-md border border-[#E5E7EB] ${
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
          <p className="mb-7 w-full rounded-md bg-red-100 p-4 text-center text-red-700">
            {error}
          </p>
        )}

        <div className="mt-7 flex flex-wrap justify-between gap-4">
          <Button variant="outline" type="button" onClick={onBack}>
            Back
          </Button>
          <Button className="buttonBlue2" type="button" onClick={handleSubmit}>
            Submit for Review
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StepFive;
