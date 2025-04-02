"use client";

import React, { useEffect, useState } from "react";
import { Check, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserDetailsProps } from "@/types/user";
import { useAuth } from "@/context";
import { api, formatError } from "@/utils";
import { ApiResponseProps } from "@/types";
import { toast } from "react-toastify";

const AccountSettingsContent = () => {
  const { user, token } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<UserDetailsProps>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);

    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/client/api/v1/update-user-info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200 || !response.data) {
        toast.error(response.data.message || "Failed to update user info");
        return;
      }

      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to update user info"));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);

    try {
      const response = await api.delete("/client/api/v1/deactivate-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 || !response.data) {
        toast.error(response.data.message || "Failed to deactivate account");
        return;
      }

      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to deactivate account"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="dashboard-section-card">
      <header className="dashboard-section-card-header">
        <h1 className="dashboard-section-card-title">Account Settings</h1>
        <p className="dashboard-section-card-description">
          Update your personal details, security settings, and preferences to
          keep your account safe and tailored to your needs
        </p>
      </header>
      <section className="mt-[50px] grid gap-6">
        <div className="flex items-start gap-5 py-4">
          <div className="flex items-center justify-center rounded-md border-[5px] border-[#EFF6FF] bg-[#DBEAFE] p-1">
            <Check className="text-brandColor" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="dashboard-section-card-title !text-lg">
              Profile Information
            </h2>
            <p className="dashboard-section-card-description">
              Edit your name, email, and contact details to keep your profile up
              to date.
            </p>
          </div>

          <button type="button" onClick={() => setShowForm(!showForm)}>
            <Edit className="text-[#9CA3AF]" size={17} />
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
              <div className="">
                <Label htmlFor="first_name" className="mb-2">
                  First Name
                </Label>
                <Input
                  className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="">
                <Label htmlFor="last_name" className="mb-2">
                  Last Name
                </Label>
                <Input
                  className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div className="">
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="">
                <Label htmlFor="phone" className="mb-2">
                  Phone Number
                </Label>
                <Input
                  className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
                  type="tel"
                  id="phone"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="">
                <Label htmlFor="address" className="mb-2">
                  Physical Address
                </Label>
                <Input
                  className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter physical address"
                  required
                />
              </div>
            </div>
            <Button
              variant="outline"
              type="submit"
              disabled={isProcessing}
              className="border border-[#E5E7EB] bg-brandColor text-white hover:bg-brandColor/70 hover:text-white"
            >
              {isProcessing ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        )}

        <div className="flex items-start gap-5 py-4">
          <div className="flex items-center justify-center rounded-md border-[5px] border-[#EFF6FF] bg-[#DBEAFE] p-1">
            <Check className="text-brandColor" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="dashboard-section-card-title !text-lg">
              Deactivate Account
            </h2>
            <p className="dashboard-section-card-description">
              Take a break from your account if needed
            </p>

            <div className="mt-6 flex gap-2.5">
              <Button
                variant="outline"
                type="button"
                onClick={handleDelete}
                disabled={isProcessing}
                className="border border-[#E5E7EB] bg-red-500 text-white hover:bg-red-500/70 hover:text-white"
              >
                {isProcessing ? "Deactivating" : "Deactivate"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AccountSettingsContent;
