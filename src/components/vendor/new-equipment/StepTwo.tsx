import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useEquipmentForm } from "@/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { X } from "lucide-react";

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
  // const [features, setFeatures] = useState<string[]>(formData.features || []);
  // const [featureInput, setFeatureInput] = useState(
  //   formData.features?.[0] || "",
  // );
  const [price, setPrice] = useState(formData.price || 0);
  const [error, setError] = useState("");

  // const handleFeatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFeatureInput(e.target.value);
  // };

  // const handleFeatureKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && featureInput.trim()) {
  //     e.preventDefault();
  //     setFeatures(prevFeatures => [...prevFeatures, featureInput.trim()]);
  //     setFeatureInput("");
  //   }
  // };

  const handleNext = () => {
    // if (features.length < 5) {
    //   setError("Please add at least 5 features.");
    //   return;
    // }

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
              Equipment Details
            </h1>
            <p className="dashboard-section-card-description">
              Add a name, description, and key features to help customers
              understand your equipment better.
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
                Price
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
            {/* <div className="w-full">
              <Label htmlFor="feature" className="mb-2">
                Key Features
              </Label>
              <Input
                className="max-w-[420px] border border-[#E5E7EB] p-5"
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
            </div> */}
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
