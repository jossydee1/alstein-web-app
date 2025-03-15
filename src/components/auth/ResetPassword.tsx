"use client";

import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import { api, authRoutes, formatError, webRoutes } from "@/utils";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | React.ReactNode>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;

  useEffect(() => {
    if (!token) {
      router.push(authRoutes.login);
    }
  }, [router, token]);

  useEffect(() => {
    if (error) {
      document.getElementById("error")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

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

    try {
      const params = {
        token: token,
        password: password,
      };

      const response = await api.post(
        "/client/public/api/v1/reset-password",
        params,
      );

      if (response.status === 200) {
        router.push(authRoutes.login);
      }
    } catch (error) {
      const errorMessage = formatError(
        error,
        "An error occurred while sending reset link",
      );
      if (errorMessage.toLowerCase().includes("jwt expired")) {
        setError(
          <>
            Your reset link has expired. Please request a new reset link.{" "}
            <Link className="underline" href={authRoutes.forgot_password}>
              Click here
            </Link>
          </>,
        );
      } else {
        setError(errorMessage);
      }
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
            href={webRoutes.home}
            aria-label="Brand"
          >
            <Image alt="Company Logo" src={logoLight} width={130} height={48} />
          </Link>
        </div>

        <main className={style.formWrapper}>
          <header className={style.header}>
            <h1 className={style.title}>Reset Your Password?</h1>
            <hr className={style.hr} />
            <p className={style.subtitle}>
              Create a new password for your account
            </p>
          </header>

          <form onSubmit={handleSubmit}>
            {error && <p className={style.error}>{error}</p>}

            <div className={style.inputGroup}>
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="confirm_password">Re-Enter Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <p className={style.info}>
                Back to{" "}
                <Link className="text-brandColor" href={authRoutes.login}>
                  Sign In
                </Link>
              </p>
            </div>

            <div className={style.inputGroup}>
              <Button
                type="submit"
                className={style.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ResetPasswordContent;
