"use client";

import React, { useEffect, useState } from "react";
import { Check, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api, formatError } from "@/utils";
import { ApiResponseProps } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import Image from "next/image";
import { BusinessProps } from "@/types";

const dummyBusinessData: BusinessProps = {
  name: "Tech Solutions Ltd",
  address: "123 Business Avenue, Tech City",
  email: "contact@techsolutions.com",
  phone_number: "+1234567890",
  documents: [
    { name: "Business Registration.pdf" },
    { name: "Tax Certificate.pdf" },
  ],
  logo: "https://picsum.photos/100/100",
};

const VendorSettingsContent = () => {
  const { token } = useAuth();
  const [business, setBusiness] = useState<BusinessProps>();

  useEffect(() => {
    setBusiness(dummyBusinessData);
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    email: string;
    phone_number: string;
    documents: { name: string; file?: File }[];
    logo: string;
  }>({
    name: "",
    address: "",
    email: "",
    phone_number: "",
    documents: [],
    logo: "",
  });

  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || "",
        address: business.address || "",
        email: business.email || "",
        phone_number: business.phone_number || "",
        documents: business.documents || [],
        logo: business.logo || "",
      });
    }
  }, [business]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDocumentDelete = (indexToDelete: number) => {
    setFormData(prevData => ({
      ...prevData,
      documents: prevData.documents.filter(
        (_, index) => index !== indexToDelete,
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);

    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/client/api/v1/update-business-info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200 || !response.data) {
        toast.error(response.data.message || "Failed to update business info");
        return;
      }

      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to update business info"));
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
          Update your business information and deactivate your account if needed
        </p>
      </header>
      <section className="mt-[50px] grid gap-6">
        <form onSubmit={handleSubmit}>
          {/* Change profile logo */}
          <div className="mb-10 flex items-center gap-4">
            {formData.logo ? (
              <Image
                src={formData.logo}
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
              >
                <Label htmlFor="logo" className="mb-2">
                  Change Logo
                </Label>
              </Button>
              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                className="border border-[#E5E7EB] p-2"
                hidden
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setFormData(prevData => ({
                        ...prevData,
                        logo: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter business name"
                required
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
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter last name"
                required
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="">
              <Label htmlFor="phone" className="mb-2">
                Business Phone Number
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="tel"
                id="phone"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* documents */}
          <div className="mb-8">
            <Label htmlFor="documents" className="mb-2">
              Business Documents
            </Label>
            <div className="my-2 flex flex-wrap gap-2">
              {formData.documents.length === 0 ? (
                formData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="border border-[#E5E7EB] text-xs"
                    >
                      {typeof doc === "string" ? doc : doc.name}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500"
                      onClick={() => handleDocumentDelete(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No documents uploaded yet</div>
              )}
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                className="border-brandColor text-xs text-brandColor"
                asChild
              >
                <Label htmlFor="documents">Upload Documents</Label>
              </Button>
              <input
                type="file"
                id="documents"
                name="documents"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                multiple
                className="hidden"
                onChange={e => {
                  const files = e.target.files;
                  if (files) {
                    const newDocuments = Array.from(files).map(file => ({
                      name: file.name,
                      file,
                    }));
                    setFormData(prevData => ({
                      ...prevData,
                      documents: [...prevData.documents, ...newDocuments],
                    }));
                  }
                }}
              />
            </div>
          </div>

          <Button
            variant="outline"
            type="submit"
            disabled={isProcessing}
            className="buttonBlue"
          >
            {isProcessing ? "Saving..." : "Save Changes"}
          </Button>
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

      <section className="">
        <div className="mt-10">
          <h2 className="dashboard-section-card-title !text-lg">
            Contact Support Unit
          </h2>
          <p className="dashboard-section-card-description">
            Reach out to our support team for assistance
          </p>
          <form
            onSubmit={e => {
              e.preventDefault();
              // Handle sending message logic here
              toast.success("Message sent successfully!");
            }}
            className="mt-6"
          >
            <div className="mb-4">
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
              ></textarea>
            </div>
            <Button type="submit" className="buttonBlue">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default VendorSettingsContent;
