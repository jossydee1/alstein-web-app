"use client";

import React, { useState } from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { authRoutes, webRoutes } from "@/utils";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import google from "@/public/images/logos/google.svg";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { Checkbox } from "../ui/checkbox";

const Signup = () => {
  const [completedStepOne, setCompletedStepOne] = useState(false);

  return !completedStepOne ? (
    <PersonalDetails setCompletedStepOne={setCompletedStepOne} />
  ) : (
    <Security />
  );
};

export default Signup;

const PersonalDetails = ({
  setCompletedStepOne,
}: {
  setCompletedStepOne: (value: boolean) => void;
}) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle signup logic here
    console.warn("Form submitted with:", { firstName, lastName, phone, email });

    // Update parent state to show next step
    setCompletedStepOne(true);

    // Reset form inputs after submission
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
  };

  return (
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
            <Image alt="Company Logo" src={logoLight} width={130} height={48} />
          </Link>
        </div>

        <main className={style.formWrapper}>
          <header className={style.header}>
            <p className={style.step}>STEP 1 of 2</p>
            <Progress value={50} />
            <h1 className={style.title}>Personal Information</h1>
            <hr className={style.hr} />
          </header>

          <form onSubmit={handleSubmit}>
            <div className={style.inputGroup}>
              <label htmlFor="first_name">First Name*</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                placeholder="John"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="last_name">Last Name*</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                placeholder="Doe"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="phone">Phone Number*</label>
              <div className={style.phoneWrapper}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="123-456-7890"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="email">Email Address*</label>
              <div className={style.emailWrapper}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@doe.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={style.inputGroup}>
              <Button type="submit" className={style.submitButton}>
                Continue
              </Button>
            </div>
          </form>

          <footer className={style.footer}>
            <div className={style.or}>
              <hr className={style.hr} /> Or <hr className={style.hr} />
            </div>

            <div className={style.altBtns}>
              <button type="button" className={style.altBtn}>
                <Image src={google} alt="Google Logo" width={24} height={24} />
                Sign up with Google
              </button>
            </div>

            <p className={style.cta}>
              Already have an account?{" "}
              <Link className={style.link} href={authRoutes.login}>
                Sign In
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

const Security = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTOC, setAcceptTOC] = useState(false);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle signup logic here
    console.warn("Form submitted with:", { password, confirmPassword });

    // Reset form inputs after submission
    setPassword("");
    setConfirmPassword("");

    router.push(authRoutes.login);
  };

  return (
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
            <Image alt="Company Logo" src={logoLight} width={130} height={48} />
          </Link>
        </div>

        <main className={style.formWrapper}>
          <header className={style.header}>
            <p className={style.step}>STEP 2 of 2</p>
            <Progress value={100} />
            <h1 className={style.title}>Personal Information</h1>
            <hr className={style.hr} />
          </header>

          <form onSubmit={handleSubmit}>
            <div className={style.inputGroup}>
              <label htmlFor="password">Create Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="confirm_password">Re-Enter Password *</label>
              <input
                type="confirm_password"
                id="confirm_password"
                name="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className={style.inputGroupCheckbox}>
              <Checkbox
                id="accept_toc"
                name="accept_toc"
                checked={acceptTOC}
                onCheckedChange={checked => setAcceptTOC(checked === true)}
              />
              <label htmlFor="accept_toc">I agree to terms & conditions</label>
            </div>

            <div className={style.inputGroup}>
              <Button type="submit" className={style.submitButton}>
                Register Account
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
