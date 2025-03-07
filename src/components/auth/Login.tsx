"use client";

import React, { useState } from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { authRoutes, webRoutes } from "@/utils";
import logoLight from "@/public/logo-rectangle-light.svg";

const LoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle login logic here
    console.warn("Form submitted with:", { email, password, rememberMe });

    // Reset form inputs after submission
    setEmail("");
    setPassword("");
    setRememberMe(false);
    setIsPasswordVisible(false);
  };

  return (
    <div className={style.wrapper}>
      <Banner />

      <div className={style.container}>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 md:justify-end">
          <Link href={webRoutes.home} className="md:hidden">
            <Image alt="Company Logo" src={logoLight} width={130} height={48} />
          </Link>
          <p className="text-right text-lg text-[#8692A6]">
            Already have an account?{" "}
            <Link href={authRoutes.register} className="text-brandColor">
              Sign In
            </Link>
          </p>
        </div>

        <main className={style.formWrapper}>
          <header>
            <h1 className={style.title}>Join Us!</h1>
            <p className={style.subtitle}>
              To begin this journey, tell us what type of account you will be
              opening.
            </p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className={style.inputGroup}>
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="hello@mail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="password">Password*</label>
              <div className={style.passwordWrapper}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={style.togglePasswordButton}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  aria-label={
                    isPasswordVisible ? "Hide password" : "Show password"
                  }
                >
                  {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={style.formFooter}>
              <div className={style.checkboxGroup}>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <p className={style.forgotPassword}>
                <Link href={authRoutes.forgot_password}>
                  Forgot your password?
                </Link>
              </p>
            </div>

            <button type="submit" className={style.submitButton}>
              Login
            </button>
          </form>

          <footer>
            <p className={style.info}>
              Don&apos;t have an account?{" "}
              <Link className={style.link} href={authRoutes.register}>
                Sign up
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default LoginContent;
