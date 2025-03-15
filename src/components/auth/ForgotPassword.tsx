"use client";

import React, { useState } from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import { authRoutes, webRoutes } from "@/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";

const ForgotPasswordContent = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    // Handle signup logic here
    console.warn("Form submitted with:", { email });

    // Reset form inputs after submission
    setEmail("");

    router.push(authRoutes.reset_password);
  };

  return (
    <div className={style.wrapper}>
      <Banner />

      <div className={style.container}>
        <div className={style.topBar}>
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
            <h1 className={style.title}>Forgot Your Password?</h1>
            <hr className={style.hr} />
            <p className={style.subtitle}>
              Enter your registered email or phone number to reset your
              password.
            </p>
          </header>

          <form onSubmit={handleSubmit}>
            {error && <p className={style.error}>{error}</p>}

            <div className={style.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <p className={style.info}>
                Back to{" "}
                <Link className="text-brandColor" href={authRoutes.login}>
                  Sign In
                </Link>
              </p>
            </div>

            <div className={style.inputGroup}>
              <Button type="submit" className={style.submitButton}>
                Send Reset Link
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ForgotPasswordContent;
