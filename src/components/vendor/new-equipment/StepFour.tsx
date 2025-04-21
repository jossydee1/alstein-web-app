/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Images, X } from "lucide-react";
import { useAuth } from "@/context";
import { api, formatError } from "@/utils";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import { LoadingState } from "@/components/common";

const StepFour = ({
  equipmentId,
  onBack,
}: {
  equipmentId: string | null;
  onBack: () => void;
}) => {
  const { token, businessProfile } = useAuth();

  const [specifications, setSpecifications] = useState<string[]>([]);
  const [specInput, setSpecInput] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("success");
  const [open, setOpen] = useState(false);

  const handleFeatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecInput(e.target.value);
  };

  const handleFeatureKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && specInput.trim()) {
      e.preventDefault();
      setSpecifications(prevFeatures => [...prevFeatures, specInput.trim()]);
      setSpecInput("");
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

  const handleComplete = async () => {
    if (specifications.length < 5) {
      setError("Please add at least 5 specifications.");
      return;
    }
    if (images.length < 5) {
      setError("Please upload at least 5 images.");
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      // Step 1: Submit specifications
      if (!equipmentId) {
        toast.error("Equipment ID is missing. Please try again.");
        setIsProcessing(false);
        return;
      }

      const specsResponse = await api.post(
        "/partner/api/v1/equipments/add-equipment-specification",
        {
          equipment_id: equipmentId,
          specifications,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (specsResponse.status !== 200) {
        toast.error("Failed to set specifications");
        setIsProcessing(false);
        return;
      }

      toast.success("Specifications saved successfully");

      // Step 2: Upload all images
      let allImagesUploaded = true;

      for (const image of images) {
        try {
          // 1. Get the upload link from the API
          const uploadLinkResponse = await api.post(
            "/partner/api/v1/equipments/create-equipment-img-upload-link",
            {
              equipment_id: equipmentId,
              partner_id: businessProfile?.id,
              file_type: image?.type,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!uploadLinkResponse?.data?.data?.upload_link) {
            throw new Error("Failed to get upload URL");
          }

          const uploadLink = uploadLinkResponse?.data.data.upload_link;

          // 2. Upload the file directly to S3
          const response = await fetch(uploadLink, {
            method: "PUT",
            body: image,
            headers: {
              "Content-Type": image?.type,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to upload image to S3");
          }
        } catch (error) {
          console.error(`Failed to upload image: ${image?.name}`, error);
          toast.error(
            formatError(error, `Failed to upload image: ${image?.name}`),
          );
          allImagesUploaded = false;
          break;
        }
      }

      // Only show success if both specifications and all images were uploaded
      if (allImagesUploaded) {
        toast.success("All images uploaded successfully");
        setOpen(true);
        setStatus("success");
      } else {
        toast.error("Some images failed to upload. Please try again.");
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to complete equipment setup"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <ConfirmationModal status={status} open={open} setOpen={setOpen} />
      {isProcessing && <LoadingState />}

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
            <p className="text-3xl font-semibold text-[#172554]">Step 4</p>
          </header>

          <section className="mt-7 space-y-7">
            <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
              <div className="w-full">
                <Label htmlFor="feature" className="mb-4">
                  Key Features
                </Label>
                <Input
                  className="max-w-[420px] border border-[#E5E7EB] p-5"
                  type="text"
                  id="feature"
                  name="feature"
                  placeholder="e.g Flow rate: 1-5 L/min"
                  value={specInput}
                  onChange={handleFeatureInputChange}
                  onKeyPress={handleFeatureKeyPress}
                  required
                />
                <sup className="mt-4 block">Min of 5 Features</sup>

                <div className="mt-4 flex flex-wrap gap-4">
                  {specifications.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-[#6B7280]"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setSpecifications(prevFeatures =>
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
                Upload images of your equipment to showcase its specifications
                and condition. Minimum of 5 images required.
              </p>
            </div>
          </header>

          <section className="mt-7 space-y-7">
            <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
              <div className="w-full">
                <label htmlFor="images" className="mb-2">
                  Upload Images
                  <div className="flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-[#E5E7EB] bg-[#F8FAFC] p-5 py-10 text-center">
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
            <p className="my-7 w-full rounded-md bg-red-100 p-4 text-center text-red-700">
              {error}
            </p>
          )}

          <div className="mt-7 flex flex-wrap justify-between gap-4">
            <Button variant="outline" type="button" onClick={onBack}>
              Back
            </Button>
            <Button
              className="buttonBlue2"
              type="button"
              onClick={handleComplete}
            >
              Save and Complete
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default StepFour;
