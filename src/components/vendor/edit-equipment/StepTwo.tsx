import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useEquipmentForm } from "@/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { acceptedCurrencies, formatCurrencySymbol } from "@/utils";
import { ListingInfoProps } from "@/types";

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
  equipmentData: ListingInfoProps;
}

const StepTwo = ({ onNext, onBack, equipmentData }: StepTwoProps) => {
  const { formData, updateFormData } = useEquipmentForm();
  const [name, setName] = useState(formData?.name || equipmentData.name || "");
  const [description, setDescription] = useState(
    formData?.description || equipmentData.description || "",
  );
  const [price, setPrice] = useState(
    formData?.price || equipmentData.price / 100 || 0,
  );
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!name || !description) {
      setError("Please enter a name and description option.");
      return;
    }
    setError("");

    updateFormData({ name, description, price });
    onNext();
  };

  return (
    <div className="space-y-9">
      <main className="dashboard-section-card">
        <header className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title text-[#172554]">
              Edit Equipment Details
            </h1>
            <p className="dashboard-section-card-description">
              Update the name, description, and price to help customers better
              understand your equipment.
            </p>
          </div>
          <p className="text-3xl font-semibold text-[#172554]">Step 2</p>
        </header>

        <section className="mt-7 space-y-7">
          <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
            <div className="w-full max-w-[420px]">
              <Label htmlFor="equipment-name" className="mb-2">
                Name of Equipment
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="equipment-name"
                name="equipment-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g High-Precision PCR Machine"
                required
              />
            </div>
            <div className="w-full max-w-[420px]">
              <Label htmlFor="equipment-description" className="mb-2">
                Description of the Equipment
              </Label>
              <Textarea
                id="equipment-description"
                name="equipment-description"
                placeholder="e.g This PCR machine offers high precision and accuracy for all your laboratory needs. It is equipped with advanced features to ensure reliable results."
                className="h-[150px]"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="w-full max-w-[420px]">
              <Label htmlFor="price" className="mb-2">
                Price ({formatCurrencySymbol[acceptedCurrencies[0]]})
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                placeholder="10000"
                min={0}
                required
              />
            </div>
          </form>

          {error && (
            <p className="w-full rounded-md bg-red-100 p-4 text-center text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-wrap justify-between gap-4">
            <Button variant="outline" type="button" onClick={onBack}>
              Back
            </Button>
            <Button className="buttonBlue2" type="button" onClick={handleNext}>
              Save and Continue
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StepTwo;
