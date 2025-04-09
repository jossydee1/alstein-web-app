"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api, formatError } from "@/utils";
import { toast } from "react-toastify";
import { useAuth } from "@/context";

const ManagePasswordContent = () => {
  const { token } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter",
      );
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = {
        password: password,
      };

      const response = await api.post(
        "/client/api/v1/update-password",
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        toast.success("Password updated succesfully");
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to update password"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="dashboard-section-card">
      <header className="dashboard-section-card-header mb-9 !gap-2">
        <h1 className="dashboard-section-card-title">
          Keep Your Account Secure
        </h1>
        <p className="dashboard-section-card-description">
          Update your password regularly to protect your data and ensure account
          safety.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-[50px] grid max-w-[580px] gap-8"
      >
        {error && (
          <p className="w-full rounded-md bg-red-100 p-4 text-center text-red-700">
            {error}
          </p>
        )}
        <div className="">
          <Label htmlFor="new-password" className="mb-2">
            New Password
          </Label>
          <Input
            className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
            type="password"
            id="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="">
          <Label htmlFor="confirm-password" className="mb-2">
            Confirm New Password
          </Label>
          <Input
            className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brandColor !p-5 text-white"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </main>
  );
};

export default ManagePasswordContent;
