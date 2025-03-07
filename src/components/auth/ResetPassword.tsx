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

const ResetPasswordContent = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    //  validate password is btw 8 and 20 chaacters and pattern is matched
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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
              <Button type="submit" className={style.submitButton}>
                Reset Password
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ResetPasswordContent;
