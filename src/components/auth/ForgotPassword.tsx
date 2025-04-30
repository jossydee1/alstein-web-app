"use client";

import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import { api, authRoutes, formatError, webRoutes } from "@/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { useScrollToID } from "@/hooks";

const ForgotPasswordContent = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useScrollToID(error, "error");
  useScrollToID(success, "success");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!email) {
      setError("Email is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = {
        email: email.trim().toLowerCase(),
      };

      const response = await api.post(
        "/client/public/api/v1/forgot-password",
        params,
      );

      if (response?.status === 200) {
        setSuccess(response?.data?.message);
        setCountdown(90);
        setEmail("");
        setError("");
      }
    } catch (error) {
      setError(
        formatError(error, "An error occurred while sending reset link"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <Banner />

      <div className={style.container}>
        <div className={style.topBar}>
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
            <h1 className={style.title}>Forgot Your Password?</h1>
            <hr className={style.hr} />
            <p className={style.subtitle}>
              Enter your registered email to reset your password.
            </p>
          </header>

          <form onSubmit={handleSubmit}>
            {error && (
              <p id="error" className={style.error}>
                {error}
              </p>
            )}
            {success && (
              <p id="success" className={style.success}>
                {success}
              </p>
            )}

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
                <Link className="text-brandColor" href={authRoutes?.login}>
                  Sign In
                </Link>
              </p>
            </div>

            <div className={style.inputGroup}>
              <Button
                type="submit"
                className={style.submitButton}
                disabled={isSubmitting || countdown > 0}
              >
                {isSubmitting
                  ? "Sending..."
                  : countdown > 0
                    ? `Resend in ${countdown}s`
                    : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ForgotPasswordContent;
