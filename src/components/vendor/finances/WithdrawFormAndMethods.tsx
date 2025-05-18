"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api, formatError, sanitizeLeadingZero } from "@/utils";
import { ApiResponseProps, BankDetailsHistoryProps } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { Check, X } from "lucide-react";

const WithdrawFormAndMethods = ({
  setShowForm,
  data,
  refetch,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  data: BankDetailsHistoryProps | undefined;
  refetch: () => void;
}) => {
  const { token, businessProfile } = useAuth();

  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSetDefault = async (bankId: string, partnerId: string) => {
    setIsProcessing(true);

    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/partner/api/v1/payment/select-prefered-account",
        { partner_id: partnerId, bank_account_id: bankId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        toast.error(response?.data?.message || "Failed to set default account");
        return;
      }

      refetch();
      toast.success("Default account set successfully");
      return response?.data?.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to set default account"));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = async (bankId: string) => {
    setIsProcessing(true);

    try {
      const response = await api.delete<ApiResponseProps<unknown>>(
        `/partner/api/v1/payment/delete-bank-account?bank_id=${bankId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        toast.error(response?.data?.message || "Failed to remove bank account");
        return;
      }

      refetch();
      toast.success("Bank account removed successfully");
      return response?.data?.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to remove bank account"));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    setIsProcessing(true);

    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/partner/api/v1/payment/initiate-debit-request",
        {
          amount: amount * 100,
          partner_id: businessProfile?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        toast.error(
          response?.data?.message || "Failed to initiate withdrawal request",
        );
        setIsError(true);
        return;
      }

      toast.success("Withdrawal request submitted successfully");
      setAmount(0);
      setIsSuccess(true);
      return response?.data?.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to initiate withdrawal request"));
      setIsError(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
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
              Your withdrawal request has been processed successfully. Funds
              will be deposited into your account shortly
            </p>
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
          </div>
        )}

        <section className="mt-[50px] flex flex-col gap-x-7 gap-y-3 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-7 md:flex-row">
          <div className="space-y-2.5">
            <h2 className="dashboard-section-card-title">Withdrawal Funds</h2>
            <p className="text-[#6B7280]">
              Withdrawal will be made directly to your preferred account
            </p>
            <p className="text-orange-600">
              NB. Withdrawal takes 5 working days to reflect in your account
            </p>
          </div>

          <form
            onSubmit={handleRequest}
            className="flex min-w-[300px] max-w-[430px] flex-1 flex-col items-start justify-start gap-4"
          >
            <div className="w-full">
              <Label htmlFor="amount" className="mb-2">
                <Input
                  className="w-full rounded-md border border-[#E5E7EB] bg-white p-5"
                  type="number"
                  id="amount"
                  name="amount"
                  value={sanitizeLeadingZero(String(amount))}
                  onChange={e =>
                    setAmount(Number(sanitizeLeadingZero(e.target.value)))
                  }
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
          {data?.data && data?.data?.length > 0
            ? data?.data?.map(item => (
                <div
                  key={item?.id}
                  className="space-y-2.5 rounded-2xl border border-[#E5E7EB] bg-white p-7"
                >
                  <h2 className="dashboard-section-card-title">
                    Direct to Bank Account - Account ending in{" "}
                    {item?.account_number.slice(-4)}
                  </h2>
                  <p
                    className={`${item?.is_prefered ? "text-green-600" : "text-orange-600"}`}
                  >
                    {item?.is_prefered ? "Default" : "Not Default"}
                  </p>
                  <div className="flex flex-row flex-wrap items-center justify-start gap-4">
                    {!item?.is_prefered && (
                      <Button
                        variant="outline"
                        type="button"
                        disabled={isProcessing}
                        className="border border-[#E5E7EB]"
                        onClick={() =>
                          handleSetDefault(item?.id, item?.partner_id)
                        }
                      >
                        Set As Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleRemove(item?.id)}
                      className="border border-[#E5E7EB] text-red-600 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            : ""}
        </section>
      </main>
    </>
  );
};

export default WithdrawFormAndMethods;
