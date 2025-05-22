"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { api, countriesList, formatError } from "@/utils";
import style from "../../auth/style.module.scss";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.countryCode ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    const params = {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      country_code: formData.countryCode.trim(),
      phone_number: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    try {
      const response = await api.post("", params);

      if (response?.status === 200) {
        await response?.data?.data;
      }
    } catch (error) {
      setError(formatError(error, "An error occurred during submission."));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main
      className={`w-full items-start justify-between gap-10 space-y-6 lg:flex lg:space-y-0`}
    >
      <section className="space-y-8 lg:max-w-[480px]">
        <div className="space-y-2 rounded-[20px] border p-6">
          <h2 className="text-sm text-[#696F79]">
            Partnership and collaborations
          </h2>
          <div className="flex items-center gap-2.5">
            <p>Get in Touch</p>
            <div className="inline-block rounded-full bg-black p-2">
              <ArrowUpRight size={20} color="white" />
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Image
            src="/images/lab-attendant.png"
            alt="Contact Us"
            width={500}
            height={500}
            className="aspect-square rounded-[20px] object-cover"
          />
        </div>
      </section>

      <section className={`flex-1 space-y-6`}>
        <h2 className="text-[30px] font-semibold text-blue-950">
          Fill the form Below
        </h2>

        {error && (
          <p className="my-2 rounded-[10px] bg-red-100 p-4 text-red-500">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className={`${style.form} !grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2`}
        >
          <div className={style.inputGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="John"
              value={formData?.firstName}
              onChange={handleChange}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="Doe"
              value={formData?.lastName}
              onChange={handleChange}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="john@doe.com"
              value={formData?.email}
              onChange={handleChange}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="phone">Phone Number</label>
            <div className={style.inputGroupPhone}>
              <div className={style.customSelect}>
                <select
                  name="countryCode"
                  id="countryCode"
                  required
                  value={formData?.countryCode}
                  onChange={handleChange}
                  data-display-type="flag-code"
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {countriesList.map(country => (
                    <option
                      key={country.code}
                      value={country.dial_code}
                      data-flag={country.flag}
                    >
                      {country.name} {country.flag} {country.dial_code}
                    </option>
                  ))}
                </select>
                <div className={style.selectedFlag}>
                  {formData?.countryCode ? (
                    <>
                      {
                        countriesList.find(
                          c => c.dial_code === formData?.countryCode,
                        )?.flag
                      }{" "}
                      {formData?.countryCode}
                    </>
                  ) : (
                    <>🌐 </>
                  )}
                </div>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="123-456-7890"
                value={formData?.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-span-1 w-full space-y-1 lg:col-span-2">
            <label
              className="block font-visbysemibold text-sm text-gray-800"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="h-[300px] w-full rounded-md border border-[#BCC0C7] p-2.5"
              id="message"
              name="message"
              required
              value={formData?.message}
              onChange={handleChange}
            />
          </div>

          <div className="w-full space-y-1">
            <Button
              type="submit"
              className="mt-4 w-full rounded-md text-center text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send your Message"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Form;
