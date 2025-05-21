"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { api, formatError } from "@/utils";
import { ApiResponseProps, PaymentMethodHistoryProps } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "@/context";

const WithdrawFormAndMethods = ({
  setShowForm,
  data,
  refetch,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  data: PaymentMethodHistoryProps | undefined;
  refetch: () => void;
}) => {
  const { token } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);

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

  return (
    <main className="dashboard-section-card">
      <section>
        <header className="flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title">Withdrawal Methods</h1>
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

        <div className="mt-[50px] space-y-7">
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
        </div>
      </section>
    </main>
  );
};

export default WithdrawFormAndMethods;
