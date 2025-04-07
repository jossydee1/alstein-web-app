import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useEquipmentForm } from "@/context";

const StepTwo = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { formData, updateFormData } = useEquipmentForm();
  const [name, setName] = useState(formData.name || "");
  const [description, setDescription] = useState(formData.description || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!name || !description) {
      setError("Please enter a name and description option.");
      return;
    }
    setError("");

    updateFormData({ name, description });
    onNext();
  };

  return (
    <div className="space-y-9">
      <main className="dashboard-section-card">
        <header className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title text-[#172554]">
              Equipment Details
            </h1>
            <p className="dashboard-section-card-description">
              Add a name and description to highlight key features.
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
            <div className="">
              <Label htmlFor="equipment-description" className="mb-2">
                Description of the Equipment
              </Label>
              <Textarea
                id="equipment-description"
                name="equipment-description"
                placeholder="e.g This PCR machine offers high precision and accuracy for all your laboratory needs. It is equipped with advanced features to ensure reliable results."
                className="h-[300px]"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
          </form>

          {error && (
            <p className="w-full rounded-lg bg-red-100 p-4 text-center text-red-700">
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
