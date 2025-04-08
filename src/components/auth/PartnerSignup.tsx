"use client";

import React from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { webRoutes } from "@/utils";
// import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
// import google from "@/public/images/logos/google.svg";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { useState } from "react";
import {
  CheckCircle,
  User,
  BriefcaseMedical,
  ShoppingCart,
} from "lucide-react";
// import { Checkbox } from "../ui/checkbox";

const options = [
  {
    id: "vendor",
    title: "I'm an Equipment Vendor",
    description:
      "Partner with Alstein as an equipment vendor and expand your reach.",
    icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
  },
  {
    id: "practitioner",
    title: "I'm a Practitioner",
    description:
      "Join Alstein as a practitioner and connect with researchers, healthcare professionals.",
    icon: <User className="h-6 w-6 text-gray-500" />,
  },
  {
    id: "provider",
    title: "I'm a Service Provider",
    description:
      "Register as a service provider on Alstein and offer your medical or scientific services.",
    icon: <BriefcaseMedical className="h-6 w-6 text-gray-500" />,
  },
];

const PartnerSignupContent = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("vendor");

  //   const [completedStepOne, setCompletedStepOne] = useState(false);

  //  return !completedStepOne ? (
  //     <PersonalDetails setCompletedStepOne={setCompletedStepOne} />
  //   ) : (
  //     <Security />
  //   );

  const handleCreatePartnerType = () => {
    router.push(`/partner-setup/${selected}/information`);
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
            <Image alt="Alstein Logo" src={logoLight} width={130} height={48} />
          </Link>
        </div>

        <main className={style.formWrapper}>
          <header className="w-full px-6">
            <h1 className="text-[30px] font-bold text-[#2D2D2D]">
              Partnership Type
            </h1>
            <p className="mt-0.5 font-visbymedium text-gray-400 antialiased">
              Kindly select how you will like to partner with us!
            </p>
          </header>

          <div className="w-full max-w-lg space-y-4 p-6">
            {options.map(option => (
              <div
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition-all ${
                  selected === option.id
                    ? "border-red-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div>{option.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {option.title}
                    </h3>
                    <p className="font-visbymedium text-sm text-gray-500 antialiased">
                      {option.description}
                    </p>
                  </div>
                </div>
                {selected === option.id && (
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                )}
              </div>
            ))}
            <button
              onClick={handleCreatePartnerType}
              className="w-full rounded-md bg-blue-600 py-2 text-center font-semibold text-white antialiased transition-all hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerSignupContent;

// const PersonalDetails = ({
//   setCompletedStepOne,
// }: {
//   setCompletedStepOne: (value: boolean) => void;
// }) => {
//   const router = useRouter();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   // Form submission handler
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     if (!firstName || !lastName || !phone || !email) {
//       setError("All fields are required");
//       return;
//     }

//     // Handle signup logic here
//     console.warn("Form submitted with:", { firstName, lastName, phone, email });

//     // Update parent state to show next step
//     setCompletedStepOne(true);

//     // Reset form inputs after submission
//     setFirstName("");
//     setLastName("");
//     setPhone("");
//     setEmail("");
//   };

//   return (
//     <div className={style.wrapper}>
//       <Banner />

//       <div className={style.container}>
//         <div className={style.topBar}>
//           <Button
//             variant="ghost"
//             type="button"
//             onClick={() => router.back()}
//             className={style.backButton}
//           >
//             <ChevronLeft />
//             Back
//           </Button>

//           <Link
//             className={style.logoLink}
//             href={webRoutes.home}
//             aria-label="Brand"
//           >
//             <Image alt="Alstein Logo" src={logoLight} width={130} height={48} />
//           </Link>
//         </div>

//         <main className={style.formWrapper}>
//           <header className={style.header}>
//             <p className={style.step}>STEP 1 of 2</p>
//             <Progress value={50} />
//             <h1 className={style.title}>Personal Information</h1>
//             <hr className={style.hr} />
//           </header>

//           <form onSubmit={handleSubmit}>
//             {error && <p className={style.error}>{error}</p>}

//             <div className={style.inputGroup}>
//               <label htmlFor="first_name">First Name*</label>
//               <input
//                 type="text"
//                 id="first_name"
//                 name="first_name"
//                 required
//                 placeholder="John"
//                 value={firstName}
//                 onChange={e => setFirstName(e.target.value)}
//               />
//             </div>
//             <div className={style.inputGroup}>
//               <label htmlFor="last_name">Last Name*</label>
//               <input
//                 type="text"
//                 id="last_name"
//                 name="last_name"
//                 required
//                 placeholder="Doe"
//                 value={lastName}
//                 onChange={e => setLastName(e.target.value)}
//               />
//             </div>
//             <div className={style.inputGroup}>
//               <label htmlFor="phone">Phone Number*</label>
//               <div className={style.phoneWrapper}>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   required
//                   placeholder="123-456-7890"
//                   value={phone}
//                   onChange={e => setPhone(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className={style.inputGroup}>
//               <label htmlFor="email">Email Address*</label>
//               <div className={style.emailWrapper}>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   placeholder="john@doe.com"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className={style.inputGroup}>
//               <Button type="submit" className={style.submitButton}>
//                 Continue
//               </Button>
//             </div>
//           </form>

//           <footer className={style.footer}>
//             <div className={style.or}>
//               <hr className={style.hr} /> Or <hr className={style.hr} />
//             </div>

//             <div className={style.altBtns}>
//               <button type="button" className={style.altBtn}>
//                 <Image src={google} alt="Google Logo" width={24} height={24} />
//                 Sign up with Google
//               </button>
//             </div>

//             <p className={style.cta}>
//               Already have an account?{" "}
//               <Link className={style.link} href={authRoutes.login}>
//                 Sign In
//               </Link>
//             </p>
//           </footer>
//         </main>
//       </div>
//     </div>
//   );
// };

// const Security = () => {
//   const router = useRouter();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [acceptTOC, setAcceptTOC] = useState(false);
//   const [error, setError] = useState("");

//   const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;

//   // Form submission handler
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     //  validate password is btw 8 and 20 chaacters and pattern is matched
//     if (!passwordPattern.test(password)) {
//       setError(
//         "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter",
//       );
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (!acceptTOC) {
//       setError("Please accept the terms & conditions");
//       return;
//     }

//     // Handle signup logic here
//     console.warn("Form submitted with:", { password, confirmPassword });

//     // Reset form inputs after submission
//     setPassword("");
//     setConfirmPassword("");

//     router.push(authRoutes.login);
//   };

//   return (
//     <div className={style.wrapper}>
//       <Banner />

//       <div className={style.container}>
//         <div className={style.topBar}>
//           <Button
//             variant="ghost"
//             type="button"
//             onClick={() => router.back()}
//             className={style.backButton}
//           >
//             <ChevronLeft />
//             Back
//           </Button>

//           <Link
//             className={style.logoLink}
//             href={webRoutes.home}
//             aria-label="Brand"
//           >
//             <Image alt="Alstein Logo" src={logoLight} width={130} height={48} />
//           </Link>
//         </div>

//         <main className={style.formWrapper}>
//           <header className={style.header}>
//             <p className={style.step}>STEP 2 of 2</p>
//             <Progress value={100} />
//             <h1 className={style.title}>Personal Information</h1>
//             <hr className={style.hr} />
//           </header>

//           <form onSubmit={handleSubmit}>
//             {error && <p className={style.error}>{error}</p>}

//             <div className={style.inputGroup}>
//               <label htmlFor="password">Create Password*</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 required
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//               />
//             </div>

//             <div className={style.inputGroup}>
//               <label htmlFor="confirm_password">Re-Enter Password *</label>
//               <input
//                 type="password"
//                 id="confirm_password"
//                 name="confirm_password"
//                 required
//                 value={confirmPassword}
//                 onChange={e => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             <div className={style.inputGroupCheckbox}>
//               <Checkbox
//                 id="accept_toc"
//                 name="accept_toc"
//                 required
//                 checked={acceptTOC}
//                 onCheckedChange={checked => setAcceptTOC(checked === true)}
//               />
//               <label htmlFor="accept_toc">I agree to terms & conditions</label>
//             </div>

//             <div className={style.inputGroup}>
//               <Button type="submit" className={style.submitButton}>
//                 Register Account
//               </Button>
//             </div>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// };
