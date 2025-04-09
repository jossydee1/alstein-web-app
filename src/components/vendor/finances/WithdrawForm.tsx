"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api, formatError } from "@/utils";
import { ApiResponseProps } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { Check, X } from "lucide-react";

const WithdrawForm = ({
  setShowForm,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { token } = useAuth();

  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    setIsProcessing(true);

    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/client/api/v1/update-bank-account-info",
        amount,
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

  const isActive = true;

  return (
    <main className="dashboard-section-card">
      <header className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div className="dashboard-section-card-header">
          <h1 className="dashboard-section-card-title">Withdrawal Method</h1>
          <p className="dashboard-section-card-description">
            Securely transfer your funds to your preferred payout method.
          </p>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={() => setShowForm(true)}
          disabled={isProcessing}
          className="border border-[#E5E7EB]"
        >
          Add new Method
        </Button>
      </header>

      {isSuccess && (
        <div className="relative mt-9 flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-green-50 p-4">
          <div className="rounded-full bg-[#CCFBF1] p-1 text-[#115E59]">
            <Check className="size-5" />
          </div>
          <p className="text-[#052E16]">
            Your withdrawal request has been processed successfully. Funds will
            be deposited into your account shortly
          </p>
          <X className="absolute right-3 top-3 size-5" />
        </div>
      )}

      {isError && (
        <div className="relative mt-9 flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-red-50 p-4">
          <div className="rounded-full bg-[#fbcccc] p-1 text-[#5e1111]">
            <X className="size-5" />
          </div>
          <p className="text-[#052E16]">
            Your withdrawal request has failed. Please check your account
            details and try again. If the issue persists, contact support for
            assistance.
          </p>
          <X className="absolute right-3 top-3 size-5" />
        </div>
      )}

      <section className="mt-[50px] flex flex-col gap-x-7 gap-y-3 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-7 md:flex-row">
        <div className="space-y-2.5">
          <h2 className="dashboard-section-card-title">Withdrawal Funds</h2>
          <p className="text-[#6B7280]">
            Withdrawal will be made directly to your preferred account
          </p>
          <p className="text-orange-600">
            NB. Withdrawal might take few hours to reflect in your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-w-[300px] max-w-[430px] flex-1 flex-col items-start justify-start gap-4"
        >
          <div className="w-full">
            <Label htmlFor="amount" className="mb-2">
              <Input
                className="w-full rounded-md border border-[#E5E7EB] bg-white p-5"
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                placeholder="Enter amount to withdraw"
                min={0}
                required
              />
            </Label>
          </div>
          <Button
            variant="outline"
            type="submit"
            disabled={isProcessing}
            className="buttonBlue2"
          >
            Withdraw
          </Button>
        </form>
      </section>

      <section className="mt-[50px] space-y-7">
        <div className="space-y-2.5 rounded-2xl border border-[#E5E7EB] bg-white p-7">
          <h2 className="dashboard-section-card-title">
            Direct to Bank Account - Account ending in 3456
          </h2>
          <p className={`${isActive ? "text-green-600" : "text-orange-600"}`}>
            Preferred
          </p>
          <div className="flex flex-row flex-wrap items-center justify-start gap-4">
            <Button
              variant="outline"
              type="button"
              disabled={isProcessing}
              className="border border-[#E5E7EB]"
            >
              {isActive ? "Deactivate" : "Activate"}
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isProcessing}
              className="border border-[#E5E7EB] text-red-600 hover:text-red-600"
            >
              Remove
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WithdrawForm;
