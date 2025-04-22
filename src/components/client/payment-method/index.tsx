"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { useClientFetch } from "@/hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PaymentMethodsHistoryProps } from "@/types";

const PaymentMethodContent = () => {
  const { token } = useAuth();

  const url = `/client/api/v1/payments/get-payment-methods`;

  const { data } = useClientFetch<PaymentMethodsHistoryProps>({
    endpoint: url,
    token,
    enabled: !!token,
  });

  console.log(data);

  return (
    <main className="dashboard-section-card grid grid-cols-2 gap-6">
      <div className="">
        <section className="dashboard-section-card-header">
          <h1 className="dashboard-section-card-title">Payment Method</h1>
          <p className="dashboard-section-card-description">
            Manage your payment options for smooth and hassle-free transactions.
          </p>
          <Button type="button" className="w-fit">
            <Plus className="" size={17} />
            Add new card
          </Button>
        </section>

        <section className="dashboard-section-card-header mt-7">
          <h2 className="dashboard-section-card-title">Billing Contact</h2>
          <p className="dashboard-section-card-description">
            You can add a second billing contact email
          </p>

          <form className="grid max-w-[580px] gap-8">
            <div className="max-w-[400px]">
              <Label htmlFor="email" className="mb-2 hidden">
                Email
              </Label>
              <Input
                className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
                type="email"
                id="email"
                placeholder="Enter contact email"
                required
              />
            </div>
          </form>
        </section>
      </div>

      <div className="gap-6 rounded-[25px] border-[0.2px] border-[#9CA3AF] p-8">
        <h2 className="dashboard-section-card-title">My Payment cards</h2>
      </div>
    </main>
  );
};

export default PaymentMethodContent;
