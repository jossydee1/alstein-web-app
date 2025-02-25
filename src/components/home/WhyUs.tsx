"use client";

import {
  CalendarCheck,
  Handshake,
  ShieldCheck,
  HeartPulse,
  Globe,
  Users,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const WhyUs = () => {
  const slides = [
    {
      icon: CalendarCheck,
      title: "24/7 Booking Accessibility",
      description:
        "Schedule laboratory services at your convenience, day or night.",
      bg: "linear-gradient(59.63deg, #090909 1.29%, #6F6F6F 98.89%)",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments & Insurance Integration",
      description: "Pay securely online and easily use your health insurance.",
      bg: "linear-gradient(241.02deg, #1045E4 3.54%, #09267E 97.5%)",
    },
    {
      icon: Handshake,
      title: "Trusted Laboratory Partners",
      description:
        "Connect with certified laboratories and diagnostic centers.",
      bg: "linear-gradient(59.63deg, #090909 1.29%, #6F6F6F 98.89%)",
    },
    {
      icon: HeartPulse,
      title: "Advanced Medical Equipment",
      description:
        "Access cutting-edge medical technology for precise diagnostics.",
      bg: "linear-gradient(241.02deg, #E41045 3.54%, #7E0926 97.5%)",
    },
    {
      icon: Globe,
      title: "Global Network of Providers",
      description: "Find and book services from top labs around the world.",
      bg: "linear-gradient(59.63deg, #0A2342 1.29%, #4A6F91 98.89%)",
    },
    {
      icon: Users,
      title: "Patient-Centered Experience",
      description: "Personalized healthcare solutions tailored to your needs.",
      bg: "linear-gradient(241.02deg, #1045E4 3.54%, #09267E 97.5%)",
    },
  ];

  const totalSlides = slides.length;
  const slidesPerView = 3;
  const slideWidth = 390;
  const gap = 16;
  const transitionTime = 500; // ms

  // Duplicate slides for infinite effect
  const extendedSlides = [...slides, ...slides, ...slides];

  const [currentSlide, setCurrentSlide] = useState(totalSlides);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!slideRef.current) return;

    // Handle infinite loop reset
    if (currentSlide === totalSlides * 2) {
      setTimeout(() => {
        slideRef.current!.style.transition = "none";
        setCurrentSlide(totalSlides);
      }, transitionTime);
    } else if (currentSlide === totalSlides - 1) {
      setTimeout(() => {
        slideRef.current!.style.transition = "none";
        setCurrentSlide(totalSlides - 1);
      }, transitionTime);
    } else {
      slideRef.current!.style.transition = `transform ${transitionTime}ms ease-in-out`;
    }

    slideRef.current!.style.transform = `translateX(-${currentSlide * (slideWidth + gap)}px)`;
  }, [currentSlide, totalSlides]);

  return (
    <div className="bg-white">
      <section className="section-container">
        <h2 className="text-[40px] font-normal leading-[48px]">
          Why Choose <span className="text-brandColor">Alstein?</span>
        </h2>

        {/* SLIDER CONTAINER */}
        <div className="relative mt-8 w-full overflow-hidden">
          <div
            ref={slideRef}
            className="flex gap-4 transition-transform"
            style={{
              width: `${(extendedSlides.length / slidesPerView) * 100}%`,
            }}
          >
            {extendedSlides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `${slideWidth}px` }}
              >
                <article
                  className="max-w-[390px] rounded-md px-8 py-12 text-white"
                  style={{ background: slide.bg }}
                >
                  <slide.icon size="48" />
                  <h3 className="mb-4 mt-3 text-[32px] leading-[40px]">
                    {slide.title}
                  </h3>
                  <p className="text-[18px] leading-[20px] text-[#A4A4A4]">
                    {slide.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* DOT INDICATORS */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex gap-2 rounded-full bg-[#B1B1B180] p-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(totalSlides + index)}
                className={`h-4 w-4 rounded-full transition-all ${
                  index === currentSlide % totalSlides
                    ? "scale-125 bg-white"
                    : "bg-[#A6A6A6]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
