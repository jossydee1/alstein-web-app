"use client";

import React, { useState } from "react";
import AddWithdrawalMethod from "./AddWithdrawalMethod";
import WithdrawFormAndMethods from "./WithdrawFormAndMethods";

const WithdrawEarnings = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {showForm ? (
        <AddWithdrawalMethod setShowForm={setShowForm} />
      ) : (
        <WithdrawFormAndMethods setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default WithdrawEarnings;
