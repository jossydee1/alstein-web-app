"use client";

import React, { useState } from "react";
import WithdrawalMethod from "./AddWithdrawalMethod";
import WithdrawForm from "./WithdrawForm";

const WithdrawEarnings = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {showForm ? (
        <WithdrawalMethod setShowForm={setShowForm} />
      ) : (
        <WithdrawForm setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default WithdrawEarnings;
