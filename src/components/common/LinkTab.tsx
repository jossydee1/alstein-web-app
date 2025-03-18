import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <nav className={`relative w-full ${className}`}>
      {showScrollButtons && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft size="24" />
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
            <h1
              className={`group-hover:text-brandColor ${
                pathname === tab.link ? "text-brandColor" : ""
              }`}
            >
              {tab.title}
            </h1>
          </Link>
        ))}
      </div>

      {showScrollButtons && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight size="24" />
        </button>
      )}
    </nav>
  );
};
