"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Banner from "./Banner";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  api,
  authRoutes,
  countriesList,
  formatError,
  webRoutes,
} from "@/utils";
import style from "./style.module.scss";
import google from "@/public/images/logos/google.svg";
import logoLight from "@/public/logo-rectangle-light.svg";
import { useScrollToID } from "@/hooks";
import { signIn } from "next-auth/react";

// Main component
const SignupContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState("");
  const [redirectErrorMessage, setRedirectErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const step = searchParams.get("step");

  useEffect(() => {
    if (id && step === "2") {
      setCurrentStep(2);
      setUserId(id);
      setRedirectErrorMessage(
        "Your account is not activated. An OTP has been sent to your email",
      );
    }
  }, [id, step]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetails
            nextStep={() => setCurrentStep(2)}
            setUserId={setUserId}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        );
      case 2:
        return (
          <OTP
            nextStep={() => setCurrentStep(3)}
            userId={userId}
            setUserId={setUserId}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            redirectErrorMessage={redirectErrorMessage}
          />
        );
      case 3:
        return (
          <Security
            userId={userId}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            type={type}
          />
        );
      default:
        return null;
    }
  };

  return renderStep();
};

export default SignupContent;
// Common layout component
const FormLayout = ({
  children,
  step,
  title,
}: {
  children: React.ReactNode;
  step: number;
  title: string;
}) => {
  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <Banner />
      <div className={style.container}>
        <div className={style.topBar}>
          <Button
            variant="ghost"
            type="button"
            onClick={() => router.push(authRoutes?.register)}
            className={style.backButton}
          >
            <ChevronLeft />
            Back
          </Button>

          <Link
            className={style.logoLink}
            href={webRoutes?.home}
            aria-label="Brand"
          >
            <Image alt="Alstein Logo" src={logoLight} width={130} height={48} />
          </Link>
        </div>

        <main className={style.formWrapper}>
          <header className={style.header}>
            <p className={style.step}>STEP {step} of 3</p>
            <Progress value={step * 33.33} />
            <h1 className={style.title}>{title}</h1>
            <hr className={style.hr} />
          </header>
          {children}
        </main>
      </div>
    </div>
  );
};

// Error component
const ErrorMessage = ({ error }: { error: string }) => {
  if (!error) return null;

  return (
    <p id="error" className={style.error}>
      {error}
    </p>
  );
};

// Step 1: Personal Details
const PersonalDetails = ({
  nextStep,
  setUserId,
  isSubmitting,
  setIsSubmitting,
}: {
  nextStep: () => void;
  setUserId: (userId: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    countryCode: "",
    email: "",
  });
  const [error, setError] = useState("");

  useScrollToID(error, "error");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { firstName, lastName, countryCode, phone, email } = formData;

    // Validate required fields
    if (!firstName || !lastName || !countryCode || !phone || !email) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone_number: `${countryCode}${phone}`,
        email: email.trim().toLowerCase(),
        auth_type: "email",
        password: "",
      };

      const response = await api.post("/client/public/api/v1/signup", params);

      if (response.status === 200) {
        setUserId(response.data.id);
        nextStep();
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          countryCode: "",
          email: "",
        });
        setError("");
      }
    } catch (error) {
      setError(formatError(error, "An error occurred during signup"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/login" });
  };

  return (
    <FormLayout step={1} title="Personal Information">
      <form onSubmit={handleSubmit} className={style.form}>
        <ErrorMessage error={error} />

        <div className={style.inputGroup}>
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder="John"
            value={formData?.firstName}
            onChange={handleChange}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            placeholder="Doe"
            value={formData?.lastName}
            onChange={handleChange}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="phone">Phone Number*</label>
          <div className={style.inputGroupPhone}>
            <div className={style.customSelect}>
              <select
                name="countryCode"
                id="countryCode"
                required
                value={formData?.countryCode}
                onChange={handleChange}
                data-display-type="flag-code"
              >
                <option value="" disabled>
                  Select country
                </option>
                {countriesList.map(country => (
                  <option
                    key={country.code}
                    value={country.dial_code}
                    data-flag={country.flag}
                  >
                    {country.name} {country.flag} {country.dial_code}
                  </option>
                ))}
              </select>
              <div className={style.selectedFlag}>
                {formData?.countryCode ? (
                  <>
                    {
                      countriesList.find(
                        c => c.dial_code === formData?.countryCode,
                      )?.flag
                    }{" "}
                    {formData?.countryCode}
                  </>
                ) : (
                  <>🌐 Select</>
                )}
              </div>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="123-456-7890"
              value={formData?.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="email">Email Address*</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="john@doe.com"
            value={formData?.email}
            onChange={handleChange}
          />
        </div>

        <div className={style.inputGroup}>
          <Button
            type="submit"
            className={style.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Register Account"}
          </Button>
        </div>
      </form>

      <footer className={style.footer}>
        <div className={style.or}>
          <hr className={style.hr} /> Or <hr className={style.hr} />
        </div>

        <div className={style.altBtns}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={style.altBtn}
          >
            <Image src={google} alt="Google Logo" width={24} height={24} />
            Continue with Google
          </button>
        </div>

        <p className={style.cta}>
          Already have an account?{" "}
          <Link className={style.link} href={authRoutes?.login}>
            Sign In
          </Link>
        </p>
      </footer>
    </FormLayout>
  );
};

// Step 2: OTP Verification
const OTP = ({
  nextStep,
  userId,
  isSubmitting,
  setIsSubmitting,
  redirectErrorMessage,
}: {
  nextStep: () => void;
  userId: string;
  setUserId: (userId: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  redirectErrorMessage: string;
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const otpPattern = /^\d{4}$/;

  useScrollToID(error, "error");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!otpPattern.test(otp)) {
      setError("OTP must be 4 digits");
      setIsSubmitting(false);
      return;
    }

    if (!userId) {
      setError("User ID not found");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = {
        id: userId,
        otp: otp,
      };

      const response = await api.post(
        "/client/public/api/v1/activate-profile",
        params,
      );

      if (response.status === 200) {
        nextStep();
      }
    } catch (error) {
      setError(formatError(error, "An error occurred while verifying OTP"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout step={2} title="Verify OTP">
      <form onSubmit={handleSubmit} className={style.form}>
        <ErrorMessage error={redirectErrorMessage} />
        <ErrorMessage error={error} />

        <div className={style.inputGroup}>
          <label htmlFor="otp">Enter OTP*</label>
          <input
            type="text"
            id="otp"
            name="otp"
            required
            placeholder="Enter 4-digit OTP"
            maxLength={4}
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
        </div>

        <div className={style.inputGroup}>
          <Button
            type="submit"
            className={style.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Verify OTP"}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};

// Step 3: Security
const Security = ({
  userId,
  isSubmitting,
  setIsSubmitting,
  type,
}: {
  userId: string;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  type: string | null;
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [acceptTOC, setAcceptTOC] = useState(false);
  const [error, setError] = useState("");

  const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;

  useScrollToID(error, "error");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { password, confirmPassword } = formData;

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

    if (!acceptTOC) {
      setError("Please accept the terms & conditions");
      setIsSubmitting(false);
      return;
    }

    if (!userId) {
      setError("Account verification failed");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = {
        id: userId,
        password: password,
      };

      const response = await api.post(
        "/client/public/api/v1/set-password",
        params,
      );

      if (response.status === 200) {
        router.push(authRoutes?.login + `?type=${type}`);
      }
    } catch (error) {
      setError(formatError(error, "An error occurred while setting password"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout step={3} title="Create Password">
      <form onSubmit={handleSubmit} className={style.form}>
        <ErrorMessage error={error} />

        <div className={style.inputGroup}>
          <label htmlFor="password">Create Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter password"
            value={formData?.password}
            onChange={handleChange}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="confirmPassword">Re-Enter Password*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            placeholder="Re-enter password"
            value={formData?.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className={style.inputGroupCheckbox}>
          <Checkbox
            id="acceptTOC"
            name="acceptTOC"
            required
            checked={acceptTOC}
            onCheckedChange={checked => setAcceptTOC(checked === true)}
          />
          <label htmlFor="acceptTOC">I agree to terms & conditions</label>
        </div>

        <div className={style.inputGroup}>
          <Button
            type="submit"
            className={style.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Set Password"}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};
