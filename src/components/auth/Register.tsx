import React, { useState } from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { authRoutes, webRoutes } from "@/utils";

const RegisterContent = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPasswordError(false);

    // Validate passwords match
    if (password !== confirmPassword) {
      setShowPasswordError(true);
      return;
    }

    // Handle registration logic here
    console.warn("Form submitted with:", {
      fullName,
      phoneNumber,
      email,
      password,
    });

    // Reset form inputs after submission
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsPasswordVisible(false);
    setIsConfirmPasswordVisible(false);
    setShowPasswordError(false);
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

            <h1 className={style.title}>Sign-up to PayScrow</h1>
            <p className={style.subtitle}>The safest way to trade online </p>
          </header>

          <form onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className={style.inputGroup}>
              <label htmlFor="fullName">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="John Doe"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>

            {/* Phone Number Input */}
            <div className={style.inputGroup}>
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="08012345678"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
            <div className={style.inputGroup}>
              <label htmlFor="password">Password*</label>
              <div className={style.passwordWrapper}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="********"
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

            {/* Confirm Password Input */}
            <div className={style.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <div className={style.passwordWrapper}>
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder="********"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={style.togglePasswordButton}
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  aria-label={
                    isConfirmPasswordVisible ? "Hide password" : "Show password"
                  }
                >
                  {isConfirmPasswordVisible ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {showPasswordError && (
                <p className={style.passwordError}>
                  Passwords do not match. Please try again.
                </p>
              )}
            </div>

            <button type="submit" className={style.submitButton}>
              Register
            </button>
          </form>

          <footer>
            <p className={style.info}>
              Already have an account?{" "}
              <Link className={style.link} href={authRoutes.login}>
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

export default RegisterContent;
