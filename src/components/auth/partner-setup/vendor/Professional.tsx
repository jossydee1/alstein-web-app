"use client";

import React, { useEffect, useState, useRef } from "react";
import Banner from "../../Banner";
import style from "../../style.module.scss";
import Link from "next/link";
import { ChevronLeft, Upload, Check, Loader2, X } from "lucide-react";
import {
  webRoutes,
  formatError,
  api,
  dashboardRoutes,
  authRoutes,
} from "@/utils";
import { Button } from "../../../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { ApiResponseProps, UpdatePartnerProps } from "@/types";
import { useAuth } from "@/context";
import axios from "axios";

const steps = [
  {
    id: 1,
    label: "Professional Information",
    body: "Please provide your professional information",
  },
  {
    id: 2,
    label: "Documents",
    body: "To ensure trust and compliance, please upload the necessary business verification documents",
  },
];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between space-x-6">
      {steps.map(step => (
        <div key={step.id} className="flex items-center space-x-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
              step.id <= currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            {step.id}
          </div>
          <span
            className={`text-sm font-medium ${
              step.id <= currentStep ? "text-black" : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// Type for document status tracking
type DocumentStatus = {
  url?: string;
  isUploaded: boolean;
  isUploading: boolean;
};

// Document upload component
const DocumentUpload = ({
  document,
  partnerId,
  token,
  onUploadComplete,
  onUploadStart,
  onUploadFail,
  isUploaded,
}: {
  document: string;
  partnerId: string;
  token: string;
  onUploadComplete: (docName: string, url: string) => void;
  onUploadStart: (docName: string) => void;
  onUploadFail: (docName: string) => void;
  isUploaded: boolean;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [fileName, setFileName] = useState("");

  // Format document name for API
  const formatDocName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  // Convert bytes to MB
  const bytesToMB = (bytes: number) => {
    return bytes / (1024 * 1024);
  };

  // Function to directly upload to S3 using pre-signed URL with axios
  const uploadFileToS3 = async (file: File, uploadLink: string) => {
    try {
      // Create an axios PUT request to the pre-signed URL with the file
      const response = await axios.put(uploadLink, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status !== 200) {
        console.error("S3 upload error:", response.status, response.data);
        throw new Error(
          `S3 upload failed: ${response.status} ${response.statusText}`,
        );
      }

      // If we get here, the upload was successful
      return true;
    } catch (error) {
      console.error("Upload error details:", error);
      throw error;
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // Reset state before new upload
    setUploadFailed(false);

    // Check if file is PDF
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      // Reset the file input value
      if (e.target) e.target.value = "";
      return;
    }

    // Check file size (max 3MB)
    const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSizeInBytes) {
      toast.error(
        `File size must be less than 3MB. Current size: ${bytesToMB(file.size).toFixed(2)}MB`,
      );
      // Reset the file input value
      if (e.target) e.target.value = "";
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    onUploadStart(document);

    try {
      // 1. Get the upload link from your API
      const formattedDocName = formatDocName(document);
      const uploadLinkResponse = await api.post(
        "/partner/api/v1/docs/create-upload-link",
        {
          partner_id: partnerId,
          document_name: formattedDocName,
          category: "utility",
          file_type: "application/pdf",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!uploadLinkResponse.data?.data?.upload_link) {
        throw new Error("Failed to get upload URL");
      }

      const uploadLink = uploadLinkResponse.data.data.upload_link;

      // 2. Upload the file directly to S3 using our helper function
      await uploadFileToS3(file, uploadLink);

      // 3. Construct the final URL for the file
      const fileUrl =
        uploadLinkResponse.data.data.file_url || uploadLink.split("?")[0]; // Remove the query parameters to get the base URL

      // Success handling
      onUploadComplete(document, fileUrl);
      toast.success(`${document} uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(formatError(error, `Failed to upload ${document}`));
      setUploadFailed(true);
      onUploadFail(document);

      // Reset the file input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Reference to the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allow retry if upload failed
  const resetUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadFailed(false);
    setFileName("");

    // Reset the file input value first
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Trigger the file selection dialog after a short delay
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 100);
  };

  return (
    <label
      className={`flex min-h-16 cursor-pointer items-center space-x-3 rounded-md border ${
        isUploaded
          ? "border-green-500 bg-green-50"
          : uploadFailed
            ? "border-red-300 bg-red-50"
            : "bg-gray-50"
      } p-3 ${isUploading ? "opacity-70" : ""}`}
    >
      {isUploading ? (
        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      ) : isUploaded ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : uploadFailed ? (
        <X className="h-5 w-5 text-red-500" />
      ) : (
        <Upload className="h-5 w-5 text-gray-400" />
      )}

      <span
        className={`flex-1 text-sm ${uploadFailed ? "text-red-500" : "text-gray-600"}`}
      >
        {fileName
          ? uploadFailed
            ? `Failed to upload: ${fileName}`
            : `Selected: ${fileName}`
          : document}
      </span>

      {uploadFailed && (
        <button
          onClick={resetUpload}
          className="mr-2 rounded-md bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
        >
          Retry
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept="application/pdf"
        disabled={isUploading || isUploaded}
      />
    </label>
  );
};

const ProfessionalPageContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("partner_type");
  const subType = searchParams.get("sub_type");
  const id = searchParams.get("partner_id");

  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!type || !subType || !id) {
      router.push("/partner-setup");
      return;
    }
  }, [id, router, subType, type]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UpdatePartnerProps>({
    id: id || "",
    name: "",
    institution: "",
    institutional_email: "",
    department: "",
    department_head_email: "",
  });

  // Separate state for tracking document uploads
  const [documentStatus, setDocumentStatus] = useState<
    Record<string, DocumentStatus>
  >({});
  const [uploadingDocuments, setUploadingDocuments] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: string,
  ) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentUploadStart = (docName: string) => {
    setUploadingDocuments(prev => [...prev, docName]);
    setDocumentStatus(prev => ({
      ...prev,
      [docName]: {
        ...prev[docName],
        isUploading: true,
        isUploaded: false,
      },
    }));
  };

  const handleDocumentUploadComplete = (docName: string, url: string) => {
    setUploadingDocuments(prev => prev.filter(doc => doc !== docName));
    setDocumentStatus(prev => ({
      ...prev,
      [docName]: {
        url,
        isUploaded: true,
        isUploading: false,
      },
    }));
  };

  const handleDocumentUploadFail = (docName: string) => {
    setUploadingDocuments(prev => prev.filter(doc => doc !== docName));
    setDocumentStatus(prev => ({
      ...prev,
      [docName]: {
        isUploaded: false,
        isUploading: false,
      },
    }));
  };

  const requiredDocuments = ["Professional ID Card"];

  // Check if all required documents are uploaded
  const areAllDocumentsUploaded = () => {
    // If we're not on step 2 (documents), return true as it's not relevant
    if (currentStep !== 2) return true;

    // For step 2, check if all required documents have been uploaded
    return requiredDocuments.every(doc => documentStatus[doc]?.isUploaded);
  };

  const handleSaveAndContinue = async () => {
    // Don't proceed if documents are still uploading in step 2
    if (currentStep === 2 && uploadingDocuments.length > 0) {
      toast.info("Please wait for all documents to finish uploading");
      return;
    }

    // If on last step, check if all documents are uploaded
    if (currentStep === 2 && !areAllDocumentsUploaded()) {
      toast.error("Please upload all required documents before submitting");
      return;
    }

    setIsProcessing(true);

    // Ensure the `id` exists
    if (!formData.id) {
      toast.error("Partner ID is missing. Please try again.");
      setIsProcessing(false);
      return;
    }

    // Prepare data for the current step - no documents included
    let stepData = {};
    switch (currentStep) {
      case 1:
        stepData = {
          id: formData.id,
          name: formData.name,
          institution: formData.institution,
          institutional_email: formData.institutional_email,
          department: formData.department,
          department_head_email: formData.department_head_email,
        };
        break;
      case 2:
        // Just send the partner ID for documents step
        stepData = { id: formData.id };
        break;
      default:
        break;
    }

    try {
      const response = await api.post<ApiResponseProps<UpdatePartnerProps>>(
        "/partner/api/v1/update-partner",
        stepData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200 || !response.data) {
        toast.error(response.data.message || "Failed to update partner data");
        return;
      }

      toast.success("Step data saved successfully!");

      // Move to the next step if not the last step
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        toast.success("All steps completed!");
        router.push(dashboardRoutes.vendor_overview);
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to update partner data"));
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className={style.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={e => handleChange(e, "name")}
                placeholder="John Doe"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="institution">Institution</label>
              <input
                type="text"
                id="institution"
                value={formData.institution}
                onChange={e => handleChange(e, "institution")}
                placeholder="Acme University"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="institutional_email">Institution Email</label>
              <input
                type="email"
                id="institutional_email"
                value={formData.institutional_email}
                onChange={e => handleChange(e, "institutional_email")}
                placeholder="john.doe@acme.com"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                value={formData.department}
                onChange={e => handleChange(e, "department")}
                placeholder="Department of Medicine"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="department_head_email">
                Department Head Email
              </label>
              <input
                type="text"
                id="department_head_email"
                value={formData.department_head_email}
                onChange={e => handleChange(e, "department_head_email")}
                placeholder="hod@acme.com"
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <div className="space-y-3">
            {requiredDocuments.map((doc, index) => (
              <DocumentUpload
                key={index}
                document={doc}
                partnerId={id || ""}
                token={token || ""}
                onUploadComplete={handleDocumentUploadComplete}
                onUploadStart={handleDocumentUploadStart}
                onUploadFail={handleDocumentUploadFail}
                isUploaded={!!documentStatus[doc]?.isUploaded}
              />
            ))}
            <div className="mt-2 text-sm text-gray-500">
              <p>* Only PDF files are allowed (Max size: 3MB)</p>
              {uploadingDocuments.length > 0 && (
                <p className="mt-1 flex items-center text-blue-500">
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Uploading {uploadingDocuments.length} document(s)...
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isProcessing && <LoadingState />}
      <div className={style.wrapper}>
        <Banner />
        <div className={style.container}>
          <div className={style.topBar}>
            <Button
              variant="ghost"
              type="button"
              onClick={() => router.push(authRoutes.partner_setup)}
              className={style.backButton}
            >
              <ChevronLeft />
              Back
            </Button>
            <Link
              className={style.logoLink}
              href={webRoutes.home}
              aria-label="Brand"
            >
              <Image
                alt="Alstein Logo"
                src={logoLight}
                width={130}
                height={48}
              />
            </Link>
          </div>
          <main className={style.formWrapper}>
            <div className={style.inputGroup}>
              <Stepper currentStep={currentStep} />
            </div>
            <header className="mb-4 mt-6 w-full">
              <h1 className="text-[20px] font-bold text-[#2D2D2D]">
                {steps[currentStep - 1].label}
              </h1>
              <p className="mt-0.5 font-visbymedium text-sm text-gray-400 antialiased">
                {steps[currentStep - 1].body}
              </p>
            </header>
            <form>
              {renderStepContent()}
              <Button
                type="button"
                onClick={handleSaveAndContinue}
                className={style.inputGroup}
                disabled={
                  currentStep === 2 &&
                  (uploadingDocuments.length > 0 || !areAllDocumentsUploaded())
                }
              >
                {currentStep === steps.length
                  ? "Submit for Review"
                  : "Save & Continue"}
                {currentStep === 2 && uploadingDocuments.length > 0 && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfessionalPageContent;
