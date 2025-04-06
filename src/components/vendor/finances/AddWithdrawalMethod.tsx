"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api, formatError } from "@/utils";
import { ApiResponseProps } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "@/context";

const AddWithdrawalMethod = ({
  setShowForm,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState<{
    bankName: string;
    bankAccount: string;
    accountName: string;
    bankCode: string;
  }>({
    bankName: "",
    bankAccount: "",
    accountName: "",
    bankCode: "",
  });
  const [defaultMethod, setDefaultMethod] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);

    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/client/api/v1/update-bank-account-info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200 || !response.data) {
        toast.error(response.data.message || "Failed to add new bank account");
        return;
      }

      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to add new bank account"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="dashboard-section-card">
      <header className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div className="dashboard-section-card-header">
          <h1 className="dashboard-section-card-title">
            Add a Withdrawal Method
          </h1>
          <p className="dashboard-section-card-description">
            Add a secure withdrawal account to receive your earnings seamlessly.
          </p>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={() => setShowForm(false)}
          disabled={isProcessing}
          className="border border-[#E5E7EB]"
        >
          Cancel
        </Button>
      </header>

      <section className="mt-[50px] grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            <div className="">
              <Label htmlFor="account-name" className="mb-2">
                Account Holder Name
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="account-name"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                placeholder="Enter account name"
                required
              />
            </div>
            <div className="">
              <Label htmlFor="bank-name" className="mb-2">
                Bank Name
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="bank-name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
                required
              />
            </div>
            <div className="">
              <Label htmlFor="account-number" className="mb-2">
                Account Number{" "}
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="tel"
                id="account-number"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                placeholder="Enter account number"
                minLength={10}
                maxLength={10}
                pattern="\d{10}"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              type="submit"
              disabled={isProcessing}
              className="buttonBlue"
            >
              {isProcessing ? "Saving..." : "Save Payout Method"}
            </Button>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="default-payout"
                checked={defaultMethod}
                onCheckedChange={checked => setDefaultMethod(checked === true)}
              />
              <label
                htmlFor="default-payout"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Set as Default Payout Method
              </label>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddWithdrawalMethod;
