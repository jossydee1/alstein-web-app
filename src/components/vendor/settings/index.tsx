"use client";

import React, { useEffect, useState } from "react";
import { Check, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api, DOCUMENT_URL, formatError } from "@/utils";
import { DocumentProps, PartnerProps } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import Image from "next/image";
import { useClientFetch } from "@/hooks";
import { LoadingState } from "@/components/common";
import Link from "next/link";

const VendorSettingsContent = () => {
  const { token, businessProfile, setBusinessProfile, logout } = useAuth();

  const url = `/partner/public/api/v1/get-partner?id=${businessProfile?.id}`;

  const {
    data: partnerDetails,
    isLoading: fetchingPartnerDetails,
    refetch: refetchPartnerDetails,
  } = useClientFetch<PartnerProps>({
    endpoint: url,
    token,
    enabled: !!token && !!businessProfile?.id,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [tempPhoto, setTempPhoto] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    address: string;
    documents: DocumentProps[];
  }>({
    name: "",
    email: "",
    address: "",
    documents: [],
  });

  const [supportMessage, setSupportMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    if (partnerDetails) {
      setFormData({
        name: partnerDetails?.name || "",
        address: partnerDetails?.address || "",
        email:
          partnerDetails?.support_email ||
          partnerDetails?.institutional_email ||
          "",
        documents: partnerDetails?.partner_doc
          ? partnerDetails?.partner_doc.map(doc => ({
              ...doc,
              path: doc?.path,
              name: doc?.name || "Unnamed Document",
            }))
          : [],
      });
    }
  }, [partnerDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadLogoToS3 = async (file: File) => {
    const temporaryPhoto = URL.createObjectURL(file); // Show the selected photo immediately
    setTempPhoto(temporaryPhoto);

    setIsUploading(true);
    try {
      const uploadLinkResponse = await api.post(
        "/partner/api/v1/docs/create-upload-link",
        {
          partner_id: businessProfile?.id,
          document_name: "logo",
          category: "utility",
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

      const fileUrl =
        uploadLinkResponse?.data?.data?.file_url || uploadLink.split("?")[0];

      setFormData(prevData => ({
        ...prevData,
        logo: fileUrl,
      }));

      toast.success("Logo uploaded successfully!");
      await refetchPartnerDetails();
      if (partnerDetails) {
        setBusinessProfile(partnerDetails);
      }

      // Refetch user details and update state
      const updatedPartnerDetails = await refetchPartnerDetails();
      if (updatedPartnerDetails) {
        if (updatedPartnerDetails?.data) {
          setBusinessProfile(updatedPartnerDetails?.data);
        }
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to upload logo"));
      setTempPhoto(null);
      // Clear the file input if upload fails
      const input = document.getElementById("logo") as HTMLInputElement | null;
      if (input) input.value = "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file?.type)) {
        toast.error("Only PNG, JPEG, and JPG files are allowed");
        return;
      }

      await uploadLogoToS3(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDeactivate = async () => {
    setIsProcessing(true);

    try {
      const response = await api.delete(
        `/partner/api/v1/deactivate-account?partner_id=${businessProfile?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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

  const handleSupportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSendingMessage(true);

    try {
      const response = await api.post(
        "/partner/api/v1/notifications/contact-us-by-partner",
        {
          partner_id: businessProfile?.id,
          message: supportMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status === 200) {
        toast.success("Message sent successfully!");
        setSupportMessage(""); // Clear the form
      } else {
        throw new Error(response?.data?.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to send message"));
    } finally {
      setIsSendingMessage(false);
    }
  };

  // if a for each doc object in partner_doc array has a name of logo, get the path
  const logo =
    partnerDetails?.partner_doc?.find(doc => doc?.name === "logo")?.path || "";

  return (
    <>
      {fetchingPartnerDetails && <LoadingState />}
      <main className="dashboard-section-card">
        <header className="dashboard-section-card-header">
          <h1 className="dashboard-section-card-title">Account Settings</h1>
          <p className="dashboard-section-card-description">
            Update your partnerDetails information and deactivate your account
            if needed
          </p>
        </header>
        <section className="mt-[50px] grid gap-6">
          <form onSubmit={handleSubmit}>
            {/* Change profile logo */}
            <div className="mb-10 flex items-center gap-4">
              {tempPhoto || logo ? (
                <Image
                  src={tempPhoto ? tempPhoto : DOCUMENT_URL + logo}
                  alt="Current Logo"
                  className="h-16 w-16 rounded-md bg-gray-200 object-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200">
                  <User className="text-gray-500" size={32} />
                </div>
              )}
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="border-brandColor text-xs text-brandColor"
                  disabled={isUploading}
                >
                  <Label htmlFor="logo" className="mb-2">
                    {isUploading ? "Uploading..." : "Change Logo"}{" "}
                  </Label>
                </Button>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/png, image/jpeg, image/jpg"
                  className="border border-[#E5E7EB] p-2 disabled:cursor-not-allowed"
                  hidden
                  onChange={handleUpdateLogo}
                  disabled={isUploading}
                />
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
              <div className="">
                <Label htmlFor="name" className="mb-2">
                  Business Name
                </Label>
                <Input
                  className="border border-[#E5E7EB] p-5"
                  type="text"
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="Enter business name"
                  required
                  readOnly
                />
              </div>
              <div className="">
                <Label htmlFor="address" className="mb-2">
                  Business Address
                </Label>
                <Input
                  className="border border-[#E5E7EB] p-5"
                  type="text"
                  id="address"
                  name="address"
                  value={formData?.address}
                  onChange={handleChange}
                  placeholder="Enter business address"
                  required
                  readOnly
                />
              </div>
              <div className="">
                <Label htmlFor="email" className="mb-2">
                  Business Email
                </Label>
                <Input
                  className="border border-[#E5E7EB] p-5"
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder="Enter business email"
                  required
                  readOnly
                />
              </div>
            </div>

            {/* documents */}
            <div className="mb-8">
              <Label htmlFor="documents" className="mb-2">
                Business Documents
              </Label>
              <div className="my-2 flex flex-wrap gap-2">
                {formData?.documents?.length > 0 ? (
                  formData?.documents?.map(
                    (doc, index) =>
                      doc?.name !== "logo" && (
                        <div key={index} className="flex items-center gap-2">
                          <Link
                            href={DOCUMENT_URL + doc?.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-[#E5E7EB] px-4 py-2 text-xs capitalize text-blue-600 hover:underline"
                          >
                            {doc?.name?.replace(/-/g, " ") ||
                              "Download Document"}
                          </Link>
                        </div>
                      ),
                  )
                ) : (
                  <div className="text-gray-500">No documents uploaded yet</div>
                )}
              </div>
            </div>
          </form>

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

        <section className="">
          <div className="mt-10">
            <h2 className="dashboard-section-card-title !text-lg">
              Contact Support Unit
            </h2>
            <p className="dashboard-section-card-description">
              Reach out to our support team for assistance
            </p>
            <form onSubmit={handleSupportSubmit} className="mt-6">
              <div className="mb-2">
                <Label htmlFor="supportMessage" className="mb-2">
                  Your Message
                </Label>
                <textarea
                  id="supportMessage"
                  name="supportMessage"
                  rows={4}
                  className="w-full rounded-md border border-[#E5E7EB] p-4"
                  placeholder="Type your message here..."
                  required
                  value={supportMessage}
                  onChange={e => setSupportMessage(e.target.value)}
                ></textarea>
              </div>
              <Button
                type="submit"
                className="buttonBlue2"
                disabled={isSendingMessage}
              >
                {isSendingMessage ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default VendorSettingsContent;
