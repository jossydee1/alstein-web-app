"use client";

import React, { useEffect, useState, useRef } from "react";
import Banner from "../../Banner";
import style from "../../style.module.scss";
import Link from "next/link";
import { ChevronLeft, Upload, Check, Loader2, X } from "lucide-react";
import { webRoutes, formatError, api, dashboardRoutes } from "@/utils";
import { Button } from "../../../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { CustomSelect, LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { ApiResponseProps, PartnerProps } from "@/types";
import { useAuth } from "@/context";

const steps = [
  {
    id: 1,
    label: "Business Information",
    body: "Kindly provide your business Information",
  },
  { id: 2, label: "Address", body: "Kindly provide your business address" },
  {
    id: 3,
    label: "Certificate",
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

// Document upload component
const DocumentUpload = ({
  document,
  partnerId,
  token,
  onUploadComplete,
  onUploadStart,
  onUploadFail,
}: {
  document: string;
  partnerId: string;
  token: string;
  onUploadComplete: (docName: string, url: string) => void;
  onUploadStart: (docName: string) => void;
  onUploadFail: (docName: string) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // Reset state before new upload
    setUploadFailed(false);
    setIsUploaded(false);

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
      // 1. Get the upload link
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

      if (!uploadLinkResponse.data?.data?.upload_url) {
        throw new Error("Failed to get upload URL");
      }

      const uploadUrl = uploadLinkResponse.data.data.upload_url;
      const fileUrl = uploadLinkResponse.data.data.file_url;

      // 2. Upload the file to the provided URL
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      // 3. Notify parent component of successful upload
      onUploadComplete(document, fileUrl);
      setIsUploaded(true);
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

const LaboratoryPageContent = () => {
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

  const [currentStep, setCurrentStep] = useState(3);
  const [formData, setFormData] = useState<PartnerProps>({
    id: id || "",
    name: "",
    logo: "",
    bio: "",
    website: "",
    city: "",
    state: "",
    country: "",
    address: "",
    longitude: "",
    latitude: "",
    type: type || "",
    specializations: "",
    mission: "",
    support_email: "",
    institutional_email: "",
    department: "",
    department_head_email: "",
    institution: "",
    documents: {},
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadingDocuments, setUploadingDocuments] = useState<string[]>([]);

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
  };

  const handleDocumentUploadComplete = (docName: string, url: string) => {
    setUploadingDocuments(prev => prev.filter(doc => doc !== docName));

    // Update formData with the document URL
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docName]: { title: docName, url },
      },
    }));
  };

  const handleDocumentUploadFail = (docName: string) => {
    setUploadingDocuments(prev => prev.filter(doc => doc !== docName));

    // Remove the document from formData if it exists and failed
    setFormData(prev => {
      const newDocuments = { ...prev.documents };
      if (newDocuments[docName]) {
        delete newDocuments[docName];
      }
      return {
        ...prev,
        documents: newDocuments,
      };
    });
  };

  const handleSaveAndContinue = async () => {
    // Don't proceed if documents are still uploading in step 3
    if (currentStep === 3 && uploadingDocuments.length > 0) {
      toast.info("Please wait for all documents to finish uploading");
      return;
    }

    setIsProcessing(true);

    // Ensure the `id` exists
    if (!formData.id) {
      toast.error("Partner ID is missing. Please try again.");
      setIsProcessing(false);
      return;
    }

    // Prepare data for the current step
    let stepData = {};
    switch (currentStep) {
      case 1:
        stepData = {
          id: formData.id,
          name: formData.name,
          support_email: formData.support_email,
          bio: formData.bio,
          specializations: formData.specializations,
          mission: formData.mission,
        };
        break;
      case 2:
        stepData = {
          id: formData.id,
          country: formData.country,
          city: formData.city,
          state: formData.state,
          address: formData.address,
        };
        break;
      case 3:
        stepData = { id: formData.id, documents: formData.documents };
        break;
      default:
        break;
    }

    try {
      const response = await api.post<ApiResponseProps<PartnerProps>>(
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
              <label htmlFor="business_name">Business Name</label>
              <input
                type="text"
                id="business_name"
                value={formData.name}
                onChange={e => handleChange(e, "name")}
                placeholder="Acme Labs"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="support_email">Contact Email</label>
              <input
                type="email"
                id="support_email"
                value={formData.support_email}
                onChange={e => handleChange(e, "support_email")}
                placeholder="acme@example.com"
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="business_description">Business Description</label>
              <textarea
                id="business_description"
                value={formData.bio}
                onChange={e => handleChange(e, "bio")}
                placeholder="We are a medical laboratory that specializes in..."
                rows={4}
              ></textarea>
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="specializations">Specialization</label>
              <input
                type="text"
                id="specializations"
                value={formData.specializations}
                onChange={e => handleChange(e, "specializations")}
                placeholder="We offer specialized equipment for Dentist, Optician..."
                required
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="mission">Mission</label>
              <textarea
                id="mission"
                value={formData.mission}
                onChange={e => handleChange(e, "mission")}
                placeholder="To empower healthcare professionals with innovative and reliable medical equipment..."
                rows={4}
              ></textarea>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={style.inputGroup}>
              <CustomSelect />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                value={formData.country}
                onChange={e => handleChange(e, "country")}
                placeholder="Ghana"
                required
              />
            </div>
            <div className="flex w-full justify-between space-x-2">
              <div className={style.inputGroup}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={e => handleChange(e, "city")}
                  placeholder="Ibadan"
                  required
                />
              </div>
            </div>
            <div className="flex w-full justify-between space-x-2">
              <div className={style.inputGroup}>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  value={formData.state}
                  onChange={e => handleChange(e, "state")}
                  placeholder="Ibadan"
                  required
                />
              </div>
            </div>
          </>
        );
      case 3:
        const documents = [
          "Business Registration Certificate", // CAC Certificate
          "Medical Laboratory Science License", // MLSCN License
          "Nigerian Institute of Science Laboratory Technology License", // NISLT License
          "Current Practicing License with Resident Medical Laboratory Scientist's Name", // Practicing license
        ];
        return (
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <DocumentUpload
                key={index}
                document={doc}
                partnerId={id || ""}
                token={token || ""}
                onUploadComplete={handleDocumentUploadComplete}
                onUploadStart={handleDocumentUploadStart}
                onUploadFail={handleDocumentUploadFail}
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
              onClick={() => router.back()}
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
                disabled={currentStep === 3 && uploadingDocuments.length > 0}
              >
                {currentStep === steps.length
                  ? "Submit for Review"
                  : "Save & Continue"}
                {currentStep === 3 && uploadingDocuments.length > 0 && (
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

export default LaboratoryPageContent;
