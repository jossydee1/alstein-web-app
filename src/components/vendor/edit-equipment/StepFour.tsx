/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { Images, X, Plus } from "lucide-react";
import { useAuth, useEquipmentForm } from "@/context";
import { api, DOCUMENT_URL, formatError } from "@/utils";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import { LoadingState } from "@/components/common";
import { ListingInfoProps } from "@/types";
import { useRouter } from "next/navigation";

interface StepFourProps {
  equipmentId: string;
  onBack: () => void;
  equipmentData: ListingInfoProps;
}

const StepFour = ({ equipmentId, onBack, equipmentData }: StepFourProps) => {
  const router = useRouter();
  const { token } = useAuth();
  const { updateFormData } = useEquipmentForm();

  const [specifications, setSpecifications] = useState<
    { id: string; specification: string }[]
  >([]);
  const [pendingSpecs, setPendingSpecs] = useState<string[]>([]);
  const [specInput, setSpecInput] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<
    { path: string; id?: string }[]
  >([]);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState("success");
  const [open, setOpen] = useState(false);
  const [editingSpecId, setEditingSpecId] = useState<string | null>(null);
  const [editSpecValue, setEditSpecValue] = useState("");

  // Load existing specifications and images
  useEffect(() => {
    if (equipmentData) {
      setSpecifications(equipmentData.specifications || []);
      setExistingImages(equipmentData.equipment_file || []);
    }
  }, [equipmentData]);

  const handleFeatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecInput(e.target.value);
  };

  const handleFeatureKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && specInput.trim()) {
      e.preventDefault();
      addToPendingSpecs();
    }
  };

  // Add specification to pending list
  const addToPendingSpecs = () => {
    if (!specInput.trim()) return;

    setPendingSpecs([...pendingSpecs, specInput.trim()]);
    setSpecInput("");
  };

  // Remove specification from pending list
  const removeFromPendingSpecs = (index: number) => {
    setPendingSpecs(pendingSpecs.filter((_, i) => i !== index));
  };

  // Submit all pending specifications at once
  const submitPendingSpecs = async () => {
    if (pendingSpecs.length === 0) return;

    setIsProcessing(true);

    // Store current specifications before any changes
    const originalSpecs = [...specifications];

    try {
      // Make the API call
      const response = await api.post(
        "/partner/api/v1/equipments/add-equipment-specification",
        {
          equipment_id: equipmentId,
          specifications: pendingSpecs, // Send array of specifications
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // If successful, clear pending specs
        setPendingSpecs([]);
        toast.success("Specifications added successfully");

        // Add temporary specs since we know the API call succeeded
        // These will be displayed until we can fetch the actual IDs
        const tempNewSpecs = pendingSpecs.map(spec => ({
          id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          specification: spec,
        }));

        // Add the new specs to our existing specs
        setSpecifications([...originalSpecs, ...tempNewSpecs]);
      }
    } catch (error) {
      // If the main API call fails, show the error
      toast.error(formatError(error, "Failed to add specifications"));
      // Keep the pending specs so user can try again
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to refresh specifications from the server
  const refreshSpecifications = async () => {
    try {
      const response = await api.get(
        `/partner/api/v1/equipments/get-equipment?equipment_id=${equipmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 && response.data) {
        // Check that we have specifications in the response and it's an array
        if (
          response.data.specifications &&
          Array.isArray(response.data.specifications) &&
          response.data.specifications.length > 0
        ) {
          // Update specifications with the data from the server
          setSpecifications(response.data.specifications);
        }
      }
    } catch (error) {
      console.error("Error refreshing specifications:", error);
    }
  };

  // Add useEffect to refresh specifications periodically or after key operations
  useEffect(() => {
    // Initial load
    refreshSpecifications();

    // Optional: Set up periodic refresh
    // const interval = setInterval(refreshSpecifications, 10000); // every 10 seconds
    // return () => clearInterval(interval);
  }, [equipmentId, token]); // Add dependencies as needed

  const handleDeleteSpecification = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await api.delete(
        `/partner/api/v1/equipments/delete-equipment-specification?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setSpecifications(prevSpecs =>
          prevSpecs.filter(spec => spec.id !== id),
        );
        toast.success("Specification deleted successfully");
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to delete specification"));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateSpecification = async (
    id: string,
    newSpecification: string,
  ) => {
    setIsProcessing(true);
    try {
      const response = await api.patch(
        "/partner/api/v1/equipments/update-equipment-specification",
        {
          id,
          specification: newSpecification,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setSpecifications(prevSpecs =>
          prevSpecs.map(spec =>
            spec.id === id
              ? { ...spec, specification: newSpecification }
              : spec,
          ),
        );
        toast.success("Specification updated successfully");
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to update specification"));
    } finally {
      setIsProcessing(false);
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
    // First submit any pending specifications
    if (pendingSpecs.length > 0) {
      await submitPendingSpecs();
    }

    // Refresh specifications to ensure we have the latest data
    await refreshSpecifications();

    if (specifications.length < 5) {
      setError("Please add at least 5 specifications.");
      return;
    }

    if (existingImages.length + images.length < 5) {
      setError(
        "Please ensure you have at least 5 images (existing + new uploads).",
      );
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      // Upload any new images if there are any
      // ... existing code for image upload ...

      // Clear form context
      updateFormData({
        id: undefined,
        name: undefined,
        description: undefined,
        price: undefined,
        address: undefined,
        service_type: undefined,
        category_id: undefined,
        partner_id: undefined,
        city: undefined,
        country: undefined,
        latitude: undefined,
        longitude: undefined,
      });

      // Show success message
      setOpen(true);
      setStatus("success");
      setTimeout(() => {
        router.push("/vendor/equipment");
      }, 3000);
    } catch (error) {
      toast.error(formatError(error, "Failed to complete equipment update"));
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
                Edit Equipment Specifications
              </h1>
              <p className="dashboard-section-card-description">
                Update or add key technical details to help customers make
                informed decisions.
              </p>
            </div>
            <p className="text-3xl font-semibold text-[#172554]">Step 4</p>
          </header>

          <section className="mt-7 space-y-7">
            <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
              <div className="w-full">
                <Label htmlFor="feature" className="mb-4">
                  Key Features (Add multiple before submitting)
                </Label>
                <div className="flex max-w-[420px] gap-2">
                  <Input
                    className="border border-[#E5E7EB] p-5"
                    type="text"
                    id="feature"
                    name="feature"
                    placeholder="e.g Flow rate: 1-5 L/min"
                    value={specInput}
                    onChange={handleFeatureInputChange}
                    onKeyPress={handleFeatureKeyPress}
                  />
                  <Button
                    type="button"
                    onClick={addToPendingSpecs}
                    disabled={!specInput.trim()}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <sup className="mt-4 block text-red-500">Min of 5 Features</sup>

                {/* Pending specifications */}
                {pendingSpecs.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">
                      New Specifications to Add:
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {pendingSpecs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2 text-sm font-medium text-[#6B7280]"
                        >
                          <span>{spec}</span>
                          <button
                            type="button"
                            onClick={() => removeFromPendingSpecs(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      onClick={submitPendingSpecs}
                      disabled={isProcessing}
                      className="mt-3"
                    >
                      Submit New Specifications
                    </Button>
                  </div>
                )}

                {/* Existing specifications */}
                {specifications.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-medium">
                      Existing Specifications:
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {specifications.map(feature => (
                        <div
                          key={feature.id}
                          className="flex items-center rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-[#6B7280]"
                        >
                          {editingSpecId === feature.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={editSpecValue}
                                onChange={e => setEditSpecValue(e.target.value)}
                                className="h-8 w-auto min-w-[150px] border-none p-0 px-1 focus-visible:border-brandColor focus-visible:ring-brandColor"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                type="button"
                                className="h-6 p-0 px-1 text-blue-500 hover:text-blue-700"
                                onClick={() => {
                                  handleUpdateSpecification(
                                    feature.id,
                                    editSpecValue,
                                  );
                                  setEditingSpecId(null);
                                }}
                                disabled={isProcessing}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                type="button"
                                className="h-6 p-0 px-1 text-gray-500"
                                onClick={() => {
                                  setEditingSpecId(null);
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <>
                              <span>{feature.specification}</span>
                              <div className="ml-2 flex items-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingSpecId(feature.id);
                                    setEditSpecValue(feature.specification);
                                  }}
                                  className="ml-1 text-blue-500 hover:text-blue-700"
                                  disabled={isProcessing}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteSpecification(feature.id)
                                  }
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  disabled={isDeleting || isProcessing}
                                >
                                  <X size={15} />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </section>
        </div>

        <div className="dashboard-section-card">
          <header className="flex flex-row flex-wrap items-start justify-between gap-4">
            <div className="dashboard-section-card-header">
              <h1 className="dashboard-section-card-title text-[#172554]">
                Edit Images
              </h1>
              <p className="dashboard-section-card-description">
                Upload additional images or keep the existing ones to showcase
                your equipment.{" "}
                <span className="text-sm text-red-500">
                  Minimum of 5 images required in total.
                </span>
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

            <div>
              {images.length > 0 && (
                <>
                  <h3 className="mb-3 font-medium">New Images to Upload</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-md border border-[#E5E7EB]"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`New upload ${index + 1}`}
                          className="h-[250px] w-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute right-2 top-2 rounded-full bg-white p-2"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 className="mb-3 font-medium">Existing Images</h3>
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {existingImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-md border border-[#E5E7EB] ${
                      index === 0 ? "lg:col-span-2" : ""
                    }`}
                  >
                    <img
                      src={DOCUMENT_URL + image.path}
                      alt={`Equipment image ${index + 1}`}
                      className="h-[250px] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
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
              disabled={isProcessing}
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
