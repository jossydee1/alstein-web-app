import React, { useState } from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { authRoutes, webRoutes } from "@/utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle login logic here
    console.warn("Form submitted with:", { email });

    // Reset form inputs after submission
    setEmail("");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <main className={style.formWrapper}>
          <header>
            <Link href={webRoutes.home} className={style.logo}>
              <Image
                src="/logo-large-white.svg"
                alt="logo"
                width={113}
                height={48}
              />
            </Link>

            <h1 className={style.title}>Forgot your Password?</h1>
            <p className={style.subtitle}>
              Enter your email address below to reset your password.
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

            <button type="submit" className={style.submitButton}>
              Request Password Reset
            </button>
          </form>

          <footer>
            <p className={style.info}>
              Remember your password?{" "}
              <Link href={authRoutes.login} className={style.link}>
                Login
              </Link>
            </p>
          </footer>
        </main>
      </div>

      <Banner />
    </div>
  );
};

export default ForgotPassword;
