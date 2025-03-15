"use client";

import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import {
  api,
  authRoutes,
  dashboardRoutes,
  formatError,
  webRoutes,
} from "@/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import google from "@/public/images/logos/google.svg";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { useAuth } from "@/context";

const LoginContent = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!email || !password) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = {
        email: email.trim().toLowerCase(),
        password: password,
      };

      const response = await api.post("/client/public/api/v1/login", params);

      if (response.status === 200) {
        login(response.data.id, response.data.token);
        setEmail("");
        setPassword("");
        router.push(dashboardRoutes.overview);
      }
    } catch (error) {
      setError(formatError(error, "An error occurred during login"));
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
            <h1 className={style.title}>Welcome Back!</h1>
            <hr className={style.hr} />
          </header>

          <form onSubmit={handleSubmit}>
            {error && <p className={style.error}>{error}</p>}

            <div className={style.inputGroup}>
              <label htmlFor="email">Email/Phone Number</label>
              <input
                type="text"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <p className={style.info}>
                <Link
                  className="text-[#FF7D31]"
                  href={authRoutes.forgot_password}
                >
                  Forgotten Password?
                </Link>
              </p>
            </div>

            <div className={style.inputGroup}>
              <Button
                type="submit"
                className={style.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
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
              Don&apos;t have an account?{" "}
              <Link className={style.link} href={authRoutes.register}>
                Sign Up
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default LoginContent;
