"use client";

import React, { useState } from "react";
import AddWithdrawalMethod from "./AddWithdrawalMethod";
import WithdrawFormAndMethods from "./WithdrawFormAndMethods";
import { useClientFetch } from "@/hooks";
import { BankDetailsHistoryProps } from "@/types";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import { formatError } from "@/utils";
import { LoadingState } from "@/components/common";

const WithdrawalMethods = () => {
  const { token, businessProfile } = useAuth();

  const [showForm, setShowForm] = useState(false);

  const getBankAccUrl = `/partner/api/v1/payment/get-bank-account?skip=0&take=10&partner_id=${businessProfile?.id}`;

  const { data, isLoading, error, refetch } =
    useClientFetch<BankDetailsHistoryProps>({
      endpoint: getBankAccUrl,
      token,
      enabled: !!token && !!businessProfile?.id,
    });

  if (error) {
    toast.error(formatError(error, "Failed to fetch bank account details"));
  }

  return (
    <>
      {isLoading && <LoadingState />}

      {showForm ? (
        <AddWithdrawalMethod setShowForm={setShowForm} refetch={refetch} />
      ) : (
        <WithdrawFormAndMethods
          data={data}
          setShowForm={setShowForm}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default WithdrawalMethods;
