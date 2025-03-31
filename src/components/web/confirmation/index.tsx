"use client";

import { ApiResponseProps } from "@/types";
import { formatError, PAYSTACK_TEST_KEY } from "@/utils";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CONTAINER_STYLES = {
  bg: "relative mb-16",
  pt: "section-container",
};

const ConfirmationPageContent = () => {
  const searchParams = useSearchParams();
  const trxref = searchParams.get("trxref");

  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  console.log("trxref", trxref);

  useEffect(() => {
    if (!trxref) {
      setError("Transaction reference not found.");
      return;
    }

    const verifyUrl = `https://api.paystack.co/transaction/verify/${trxref}`;

    const verifyTransaction = async () => {
      setIsVerifying(true);
      setError("");

      try {
        const response = await axios.get<ApiResponseProps<unknown>>(verifyUrl, {
          headers: {
            Authorization: `Bearer ${PAYSTACK_TEST_KEY}`,
          },
        });

        if (response.status !== 200 || !response.data) {
          setError(response.data.message || "Could not verify transaction");
        }

        console.log("response", response);
        return response.data.data;
      } catch (error) {
        setError(formatError(error, "Failed to verify transaction"));
      } finally {
        setIsVerifying(false);
      }
    };

    if (trxref) {
      verifyTransaction();
    }
  }, [trxref]);

  if (error) {
    return (
      <div className={CONTAINER_STYLES.bg}>
        <main className={CONTAINER_STYLES.pt}>
          <p>{error}</p>
        </main>
      </div>
    );
  }

  if (trxref && isVerifying)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <main className={CONTAINER_STYLES.pt}>
          <p>Verifying transaction...</p>
        </main>
      </div>
    );

  return (
    <div className={CONTAINER_STYLES.bg}>
      <main className={CONTAINER_STYLES.pt}>
        <p>Payment was successfull!</p>
      </main>
    </div>
  );
};

export default ConfirmationPageContent;
