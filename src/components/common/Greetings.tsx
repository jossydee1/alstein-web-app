"use client";

import React from "react";
import { useAuth } from "@/context";

const Greetings = () => {
  const { user } = useAuth();

  return <div>Welcome back, {user?.name}</div>;
};

export default Greetings;
