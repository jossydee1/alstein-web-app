"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfileProps } from "@/types/user";
import { useAuth } from "@/context";
import { api, DOCUMENT_URL, formatError } from "@/utils";
import { ApiResponseProps } from "@/types";
import { toast } from "react-toastify";
import avatar from "@/public/icons/avatar.svg";
import Image from "next/image";
import { useClientFetch } from "@/hooks";

const AccountSettingsContent = () => {
  const { user, userId, token, setUser, logout } = useAuth();

  const url = "/client/api/v1/get-user-info";

  const { refetch: refetchUserDetails } = useClientFetch<UserProfileProps>({
    endpoint: url,
    token,
    enabled: !!token,
  });

  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [tempPhoto, setTempPhoto] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserProfileProps>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
        address: user?.address || "",
      });
      setProfilePhoto(user?.user_avatar || user?.profile_photo || null);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadAvatarToS3 = async (file: File) => {
    const temporaryPhoto = URL.createObjectURL(file); // Show the selected photo immediately
    setTempPhoto(temporaryPhoto);

    setIsUploading(true);
    try {
      const uploadLinkResponse = await api.post(
        "/client/api/v1/docs/create-upload-link",
        {
          client_id: userId,
          document_name: "profile_photo",
          file_type: file?.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!uploadLinkResponse?.data?.data?.upload_link) {
        throw new Error("Failed to get upload URL");
      }

      const uploadLink = uploadLinkResponse?.data?.data?.upload_link;

      // FIX: Remove any authorization headers for the S3 upload
      await api.put(uploadLink, file, {
        headers: {
          "Content-Type": file?.type,
        },
        // This ensures no auth headers are sent with this specific request
        transformRequest: [
          (data, headers) => {
            // Remove Authorization header if it exists
            if (headers && "Authorization" in headers) {
              delete headers.Authorization;
            }
            return data;
          },
        ],
      });

      // Refetch user details and update state
      const updatedUserDetails = await refetchUserDetails();
      if (updatedUserDetails) {
        if (updatedUserDetails?.data) {
          setProfilePhoto(updatedUserDetails?.data?.user_avatar ?? null);
        }
      }

      toast.success("Avatar uploaded successfully!");
    } catch (error) {
      toast.error(formatError(error, "Failed to upload user photo"));
      setTempPhoto(null);
    } finally {
      setIsUploading(false);
    }
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

      if (response?.status !== 200 || !response?.data) {
        toast.error(response?.data?.message || "Failed to update user info");
        return;
      }

      // Refetch user details and update state
      const updatedUserDetails = await refetchUserDetails();
      if (updatedUserDetails) {
        if (updatedUserDetails?.data) {
          setUser(updatedUserDetails.data);
        }
      }

      toast.success(response?.data?.message);

      return response?.data?.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to update user info"));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeactivate = async () => {
    setIsProcessing(true);

    try {
      const response = await api.delete("/client/api/v1/deactivate-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.status !== 200 || !response?.data) {
        toast.error(response?.data?.message || "Failed to deactivate account");
        return;
      }

      toast.success(response?.data?.message);
      logout();
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
            <div className="mt-6 flex gap-2.5">
              <Button
                variant="default"
                type="button"
                onClick={() => setShowForm(!showForm)}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="mb-8 flex items-center gap-4">
              <Image
                src={
                  tempPhoto
                    ? tempPhoto
                    : profilePhoto
                      ? DOCUMENT_URL + profilePhoto
                      : avatar
                }
                alt="Current Avatar"
                className="aspect-square rounded-md border-2 border-[#E5E7EB] bg-gray-50 object-cover"
                width={64}
                height={64}
                objectFit="contain"
              />

              <div>
                <Button
                  asChild
                  variant="outline"
                  className="border-brandColor text-xs text-brandColor disabled:cursor-not-allowed"
                  disabled={isUploading}
                >
                  <Label htmlFor="user_avatar" className="mb-2">
                    {isUploading ? "Uploading..." : "Change Avatar"}
                  </Label>
                </Button>
                <input
                  type="file"
                  id="user_avatar"
                  name="user_avatar"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  disabled={isUploading}
                  onChange={async e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Check file size (max 3MB)
                      const maxSizeInBytes = 3 * 1024 * 1024;
                      if (file?.size > maxSizeInBytes) {
                        toast.error(
                          `File size must be less than 3MB. Current size: ${(file?.size / (1024 * 1024)).toFixed(2)}MB`,
                        );
                        return;
                      }

                      // Check file type
                      if (
                        !["image/png", "image/jpeg", "image/jpg"].includes(
                          file?.type,
                        )
                      ) {
                        toast.error(
                          "Only PNG, JPEG, and JPG files are allowed",
                        );
                        return;
                      }

                      await uploadAvatarToS3(file);
                    }
                  }}
                />
              </div>
            </div>
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
                  value={formData?.first_name}
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
                  value={formData?.last_name}
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
                  value={formData?.email}
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
                  value={formData?.phone_number}
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
                  value={formData?.address}
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
              className="buttonBlue2"
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
                onClick={handleDeactivate}
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
