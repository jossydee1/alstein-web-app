/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
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
import { useSearchParams, useRouter } from "next/navigation";
import google from "@/public/images/logos/google.svg";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { useAuth } from "@/context";
import { useScrollToID } from "@/hooks";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LoadingState } from "../common";

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const idParam = searchParams.get("id");
  const type = searchParams.get("type");
  const comment = searchParams.get("comment");

  const { login } = useAuth();
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useScrollToID(error, "error");

  useEffect(() => {
    const handleSessionLogin = async () => {
      if (session?.user) {
        setIsSubmitting(true); // Show loading state
        try {
          const user = session.user;
          const payload = {
            email: user.email,
            first_name: user.name?.split(" ")[0] || "",
            last_name: user.name?.split(" ")[1] || "",
            auth_type: "google",
          };

          const response = await api.post(
            "/client/public/api/v1/oauth-handler",
            payload,
          );

          if (response?.status === 200) {
            const { id, token } = response.data;

            handleSuccessfulLogin(id, token);

            // Log in with auth context
            // await login({ id, token, user: userInfo });
          }
        } catch (error) {
          setError(formatError(error, "An error occurred during google login"));
        } finally {
          setIsSubmitting(false); // Hide loading state
        }
      }
    };

    handleSessionLogin();
  }, [session]);

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

    const params = {
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      const response = await api.post("/client/public/api/v1/login", params);

      if (response?.status === 200) {
        await handleSuccessfulLogin(response?.data?.id, response?.data?.token);
      }
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessfulLogin = async (id: string, token: string) => {
    try {
      // Get user info
      const response = await api.get("/client/api/v1/get-user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log in with auth context - this will fetch business profiles internally
      await login({ id, token, user: response?.data?.data });

      setEmail("");
      setPassword("");
      setError("");

      // After successful login and business profile check (which happens in login()),
      // redirect based on type or redirectUrl
      if (type === "client") {
        router.push(dashboardRoutes?.client_order_history);
        return;
      }

      if (type === "partner") {
        router.push(authRoutes?.partner_setup);
        return;
      }

      if (redirectUrl) {
        const url = decodeURIComponent(redirectUrl);
        const redirectWithParams = comment
          ? `${url}?comment=${encodeURIComponent(comment)}${idParam ? `#${idParam}` : ""}`
          : `${url}${idParam ? `#${idParam}` : ""}`;
        router.push(redirectWithParams);
      } else {
        router.push(dashboardRoutes?.client_order_history);
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error: any) => {
    if (error?.response?.status === 409) {
      router.push(
        `${authRoutes?.signup}?step=2&id=${error?.response?.data?.id}`,
      );
      return;
    }
    setError(formatError(error, "An error occurred during login"));
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/login" });
  };

  return (
    <>
      {isSubmitting && <LoadingState />}
      <div className={style.wrapper}>
        <Banner />

        <div className={style.container}>
          <div className={style.topBar}>
            <Link
              className={style.logoLink}
              href={webRoutes?.home}
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
            <header className={style.header}>
              <h1 className={style.title}>Welcome Back!</h1>
              <hr className={style.hr} />
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
                    href={authRoutes?.forgot_password}
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
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className={style.altBtn}
                >
                  <Image
                    src={google}
                    alt="Google Logo"
                    width={24}
                    height={24}
                  />
                  Continue with Google
                </button>
              </div>

              <p className={style.cta}>
                Don&apos;t have an account?{" "}
                <Link className={style.link} href={authRoutes?.register}>
                  Sign Up
                </Link>
              </p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
};

export default LoginContent;
