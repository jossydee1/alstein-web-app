import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEquipmentForm } from "@/context";

const StepOne = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { formData, updateFormData } = useEquipmentForm();
  const [category, setCategory] = useState(formData.category || "");
  const [availability, setAvailability] = useState(formData.availability || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!category || !availability) {
      setError("Please select a category and availability option.");
      return;
    }
    setError("");

    updateFormData({ category, availability });
    onNext();
  };

  const categories = [
    {
      label: "Laboratory Instruments",
      value: "laboratory-instruments",
    },
    {
      label: "Medical Equipment",
      value: "medical-equipment",
    },
    {
      label: "Diagnostic Tools",
      value: "diagnostic-tools",
    },
    {
      label: "Research Equipment",
      value: "research-equipment",
    },
  ];

  return (
    <div className="space-y-9">
      <main className="dashboard-section-card">
        <header className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title text-[#172554]">
              Category & Availability
            </h1>
            <p className="dashboard-section-card-description">
              Choose the right category and how your equipment can be accessed.
            </p>
          </div>
          <p className="text-3xl font-semibold text-[#172554]">Step 1</p>
        </header>

        <section className="mt-7 space-y-7">
          <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
            <div className="w-full max-w-[420px]">
              <Label htmlFor="category" className="mb-2">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full" id="category" name="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label htmlFor="availability" className="mb-2">
                Availability
              </Label>
              <RadioGroup
                value={availability}
                onValueChange={setAvailability}
                className="flex flex-wrap gap-3"
                id="availability"
                name="availability"
              >
                <div className="flex w-full max-w-[300px] items-center gap-2.5 rounded-md border border-[#E5E7EB] p-4 focus-within:border-brandColor">
                  <RadioGroupItem value="rent" id="rent" />
                  <Label htmlFor="rent">Rent</Label>
                </div>
                <div className="flex w-full max-w-[300px] items-center gap-2.5 rounded-md border border-[#E5E7EB] p-4 focus-within:border-brandColor">
                  <RadioGroupItem value="onsite" id="onsite" />
                  <Label htmlFor="onsite">Onsite</Label>
                </div>
                <div className="flex w-full max-w-[300px] items-center gap-2.5 rounded-md border border-[#E5E7EB] p-4 focus-within:border-brandColor">
                  <RadioGroupItem value="lease" id="lease" />
                  <Label htmlFor="lease">Lease</Label>
                </div>
              </RadioGroup>
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

export default StepOne;
