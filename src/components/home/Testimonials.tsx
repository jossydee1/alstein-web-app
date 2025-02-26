"use client";

import Image from "next/image";
import image from "@/public/images/doctor.png";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      title: "Convenience & Efficiency",
      description:
        "I never thought booking a laboratory test could be so seamless. With just a few clicks, I booked a time that suited me, and got everything confirmed instantly. This platform saves me so much time and hassle!",
      avatar: image,
      name: "Jane Doe",
      position: "CEO, Company Name",
    },
    {
      title: "Great Service & Support",
      description:
        "I was impressed by the level of customer service and support I received from the team. They were always available to answer my questions and provide guidance throughout the process. Highly recommended!",
      avatar: image,
      name: "John Doe",
      position: "CTO, Company Name",
    },
    {
      title: "Excellent Experience",
      description:
        "I had a great experience using this platform to book my laboratory tests. The process was simple, the staff were friendly, and the results were delivered quickly. I will definitely be using this service again!",
      avatar: image,
      name: "Alice Doe",
      position: "COO, Company Name",
    },
    {
      title: "Convenience & Efficiency",
      description:
        "I never thought booking a laboratory test could be so seamless. With just a few clicks, I booked a time that suited me, and got everything confirmed instantly. This platform saves me so much time and hassle!",
      avatar: image,
      name: "Jane Doe",
      position: "CEO, Company Name",
    },
    {
      title: "Great Service & Support",
      description:
        "I was impressed by the level of customer service and support I received from the team. They were always available to answer my questions and provide guidance throughout the process. Highly recommended!",
      avatar: image,
      name: "John Doe",
      position: "CTO, Company Name",
    },
    {
      title: "Excellent Experience",
      description:
        "I had a great experience using this platform to book my laboratory tests. The process was simple, the staff were friendly, and the results were delivered quickly. I will definitely be using this service again!",
      avatar: image,
      name: "Alice Doe",
      position: "COO, Company Name",
    },
  ];

  const totalSlides = testimonials.length;
  const slidesPerView = 3;
  const slideWidth = 390;
  const gap = 16;
  const transitionTime = 500;

  const extendedSlides = [...testimonials, ...testimonials, ...testimonials];

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

  const nextSlide = () => {
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev - 1);
  };

  return (
    <div
      className="relative bg-white"
      style={{
        backgroundImage: "url('/images/testimonials.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="section-container z-100 bg-black bg-opacity-70">
        <div className="mb-2.5 flex items-center justify-center gap-2.5 text-white">
          <hr className="w-[22px] border-2 border-white" />
          <span className="text-lg font-medium uppercase">Testimonials</span>
        </div>
        <h2 className="text-center text-[40px] font-normal leading-[48px] text-white">
          Hear What Our Users and Partners Have to Say
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
                  className="max-w-[390px] rounded-lg p-8 text-white"
                  style={{
                    background:
                      "linear-gradient(236.19deg, rgba(0, 0, 0, 0.2) 1.47%, rgba(0, 0, 0, 0.2) 97.28%)",
                  }}
                >
                  <h3 className="mb-7 text-lg font-bold leading-[24px]">
                    &ldquo;{slide.title}&rdquo;
                  </h3>
                  <p className="mb-8 text-[15px] leading-[25px] text-[#D5D5D5]">
                    {slide.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <Image
                      src={slide.avatar}
                      alt={slide.name}
                      width={50}
                      height={50}
                      className="aspect-square min-h-[50px] min-w-[50px] max-w-[50px] rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-[15px] font-bold leading-[17px]">
                        {slide.name}
                      </h4>
                      <p className="mt-2.5 text-[15px] leading-[17px] text-[#D5D5D5]">
                        {slide.position}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* PREV & NEXT BUTTONS */}
        <div className="ml-auto mt-8 flex justify-end gap-2">
          <button
            className="rounded-full bg-[#C3C3C38F] p-2 transition hover:bg-[#dedede]"
            onClick={prevSlide}
          >
            <ChevronLeft size={32} className="text-black/60 hover:text-black" />
          </button>
          <button
            className="rounded-full bg-[#C3C3C38F] p-2 transition hover:bg-[#dedede]"
            onClick={nextSlide}
          >
            <ChevronRight
              size={32}
              className="text-black/60 hover:text-black"
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
