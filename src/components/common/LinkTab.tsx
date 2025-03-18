import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  title: string;
  link: string;
  icon?: React.ReactNode;
}

interface LinkTabProps {
  tabs: TabItem[];
  className?: string;
}

export const LinkTab = ({ tabs, className = "" }: LinkTabProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (tabsRef.current) {
        const { scrollWidth, clientWidth } = tabsRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [tabs]);

  const scroll = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {showScrollButtons && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      <div
        ref={tabsRef}
        className="scrollbar-hide flex justify-between gap-4 overflow-x-auto py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href={tab.link}
            className={`group flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 font-medium leading-6 transition-colors ${
              pathname === tab.link ? "bg-[#EFF6FF]" : "text-[#6B7280]"
            }`}
          >
            {tab.icon}
            <span
              className={`group-hover:text-brandColor ${
                pathname === tab.link ? "text-brandColor" : ""
              }`}
            >
              {tab.title}
            </span>
          </Link>
        ))}
      </div>

      {showScrollButtons && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};
