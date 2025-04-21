"use client";

import React from "react";
import Image from "next/image";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  MapPin,
  PhoneCall,
  Mail,
  Earth,
  ArrowRight,
  Loader,
} from "lucide-react";
import { api, webRoutes } from "@/utils";
import Link from "next/link";
import logoLight from "@/public/logo-rectangle-light.svg";
import site from "@/site.metadata";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const quickLinks = [
  { name: "About Us", href: webRoutes?.about },
  {
    name: "Listings",
    href: webRoutes?.listings,
  },
  { name: "Blog", href: webRoutes?.blog },
];

export const Footer = () => {
  const titleStyle = "text-lg text-[#8B8B8B] mb-3";
  const itemStyle =
    "cursor-pointer text-sm font-medium leading-[24px] transition-colors hover:text-white";
  const contactItemStyle =
    "cursor-pointer text-sm font-medium leading-[24px] transition-colors hover:text-white flex items-center gap-2";
  const iconStyle = "transition-colors hover:text-white";

  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    const response = await api.post(
      `/client/public/api/v1/meta/add-email-to-mailing-list`,
      {
        email,
      },
    );

    if (response?.status === 200) {
      toast.success("You have successfully subscribed to our newsletter");
      setEmail("");
      setIsLoading(false);
    } else {
      toast.error("Failed to submit email");
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#181818]">
      <footer className="section-container text-gray-300">
        <section className="grid grid-cols-6 gap-11 lg:grid-cols-7">
          <div className="col-span-6 lg:col-span-2">
            <Link
              className="w-[130px] flex-none text-xl font-semibold"
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

          <div className="col-span-6 md:col-span-2 lg:col-span-1">
            <h2 className={titleStyle}>Quick Links</h2>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link?.href} className={itemStyle}>
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 lg:col-span-2">
            <h2 className={titleStyle}>Contact Us</h2>
            <ul className="space-y-4">
              <li className={contactItemStyle}>
                <span>
                  <MapPin size="14" />
                </span>
                <span>{site?.contacts?.address}</span>
              </li>
              <li className={contactItemStyle}>
                <span>
                  <PhoneCall size="14" />
                </span>
                <Link href={`tel:${site?.contacts?.phone}`}>
                  {site?.contacts?.phone}
                </Link>
              </li>
              <li className={contactItemStyle}>
                <span>
                  <Mail size="14" />
                </span>
                <Link href={`mailto:${site?.contacts?.email}`}>
                  {site?.contacts?.email}
                </Link>
              </li>
              <li className={contactItemStyle}>
                <span>
                  <Earth size="14" />
                </span>
                <Link href={site?.url}>{site?.url}</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 lg:col-span-2">
            <p className={titleStyle}>Follow Us</p>
            <div className="mb-12 flex gap-4">
              <Link
                href={site?.social_handles?.instagram}
                className={iconStyle}
              >
                <Instagram size={24} />
              </Link>
              <Link href={site?.social_handles?.facebook} className={iconStyle}>
                <Facebook size={24} />
              </Link>
              <Link href={site?.social_handles?.twitter} className={iconStyle}>
                <Twitter size={24} />
              </Link>
              <Link href={site?.social_handles?.linkedin} className={iconStyle}>
                <Linkedin size={24} />
              </Link>
            </div>

            <h2 className={titleStyle}>Newsletter Signup</h2>
            <form
              className="flex max-w-screen-sm items-center justify-between gap-1 rounded-md border border-[#454545] p-1 text-white focus-within:border-[#8B8B8B]"
              onSubmit={e => handleSubmit(e)}
            >
              <label
                htmlFor="email"
                className="w-full flex-1 rounded-sm border-none"
              >
                <input
                  className="w-full border-none bg-transparent focus:outline-none focus:ring-0"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="email@example.com"
                />
              </label>

              <Button
                type="submit"
                disabled={isLoading}
                className="flex min-h-[44px] max-w-[44px] items-center justify-center bg-brandColor px-6 py-4 hover:bg-white hover:text-[#454545] md:w-auto"
              >
                {isLoading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <ArrowRight size="40" className="" />
                )}
              </Button>
            </form>
          </div>
        </section>

        <hr className="col-span-6 my-12 border-[#F1F1F133]" />

        <section className="flex flex-wrap items-center justify-between text-sm">
          <p> © {currentYear} ALSTEIN All rights reserved.</p>
          <div>
            <Link href={webRoutes?.terms} className={itemStyle}>
              Terms and Conditions
            </Link>{" "}
            |{" "}
            <Link href={webRoutes?.privacy} className={itemStyle}>
              Privacy
            </Link>
          </div>
        </section>
      </footer>
    </div>
  );
};
