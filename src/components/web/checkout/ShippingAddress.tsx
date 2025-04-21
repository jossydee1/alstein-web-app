import React from "react";
import { FormData } from "./index";

const ShippingAddress = ({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: (formData: FormData) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="dashboard-section-card">
      <h1 className="hidden">Checkout</h1>

      <h2 className="mb-8 text-lg font-semibold text-[#172554]">
        Shipping Details
      </h2>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="inputGroup">
          <label htmlFor="fullname">Full Name*</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required
            disabled={!!formData?.fullname}
            placeholder="John"
            value={formData?.fullname}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="phone">Phone Number*</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            disabled={!!formData?.phone}
            placeholder="+2348060000000"
            value={formData?.phone}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email Address*</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={!!formData?.email}
            placeholder="john@doe.com"
            value={formData?.email}
            onChange={handleChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Physical Address*</label>
          <input
            type="text"
            id="address"
            name="address"
            required
            placeholder="123 Example St, Anytown, Nigeria"
            value={formData?.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
