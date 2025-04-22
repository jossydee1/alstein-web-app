"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api, formatError } from "@/utils";
import { ApiResponseProps } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { useClientFetch } from "@/hooks";

const AddWithdrawalMethod = ({
  setShowForm,
  refetch,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) => {
  const { token, businessProfile } = useAuth();

  const [formData, setFormData] = useState<{
    bank_name: string;
    account_name: string;
    account_number: string;
    cbn_code: string;
  }>({
    bank_name: "",
    account_name: "",
    account_number: "",
    cbn_code: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const url = "/partner/api/v1/payment/get-banks-list";

  const {
    data: bankData,
    isLoading: loadingBanks,
    error: loadingBanksError,
  } = useClientFetch<{
    data: { data: { code: string; name: string }[] };
  }>({
    endpoint: url,
    token,
    enabled: !!token,
  });

  const bankList = bankData?.data?.data;

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
        "/partner/api/v1/payment/add-bank-account",
        { partner_id: businessProfile?.id, ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        toast.error(
          response?.data?.message || "Failed to add new bank account",
        );
        return;
      }

      refetch();
      setShowForm(false);

      setFormData({
        bank_name: "",
        account_name: "",
        account_number: "",
        cbn_code: "",
      });
      toast.success("Bank account added successfully");
      return response?.data?.data;
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
              <Label htmlFor="account_name" className="mb-2">
                Account Holder Name
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="account_name"
                name="account_name"
                value={formData?.account_name}
                onChange={handleChange}
                placeholder="Enter account name"
                required
              />
            </div>
            <div className="">
              <Label htmlFor="bank_name" className="mb-2">
                Bank Name
              </Label>
              <div>
                <select
                  id="bank_name"
                  name="bank_name"
                  className="w-full rounded-md border border-[#E5E7EB] shadow-sm focus-within:border-brandColor"
                  value={formData?.bank_name}
                  onChange={e => {
                    const selectedBank = bankList?.find(
                      b => b?.code === e.target.value,
                    );
                    setFormData(prevData => ({
                      ...prevData,
                      bank_name: selectedBank?.name || "",
                      cbn_code: e.target.value,
                    }));
                  }}
                  required
                >
                  <option value="" disabled>
                    Enter bank name
                  </option>
                  {loadingBanks ? (
                    <option>Loading...</option>
                  ) : loadingBanksError ? (
                    <option disabled>
                      {formatError(loadingBanksError?.message) ||
                        "Failed to load banks"}
                    </option>
                  ) : (
                    bankList?.map(b => (
                      <option key={b?.code} value={b?.code}>
                        {b?.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="">
              <Label htmlFor="account_number" className="mb-2">
                Account Number{" "}
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="tel"
                id="account_number"
                name="account_number"
                value={formData?.account_number}
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
              className="buttonBlue2"
            >
              {isProcessing ? "Saving..." : "Save Payout Method"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddWithdrawalMethod;
