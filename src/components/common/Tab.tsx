"use client";
import React, { useRef, useEffect, useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface TabItem {
  key: string;
  title: string | ReactNode;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabProps {
  tabs: TabItem[];
  className?: string;
  queryParam?: string;
}

export const Tab = ({ tabs, className = "", queryParam }: TabProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get(queryParam || "tab");
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const tabsRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  useEffect(() => {
    if (queryParam && query) {
      const tabKey = query as string;
      if (tabs.some(tab => tab?.key === tabKey)) {
        setActiveTab(tabKey);
      }
    }
  }, [query, queryParam, tabs]);

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
    <div className="w-full space-y-6 overflow-x-auto">
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
          className="scrollbar-hide flex justify-start gap-6 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map(tab => (
            <button
              key={tab?.key}
              type="button"
              onClick={() => setActiveTab(tab?.key)}
              className={`text-body-semibold-16 group flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-3 transition-colors ${
                activeTab === tab?.key
                  ? "bg-brandColor text-white"
                  : "bg-[#EFF6FF] text-brandColor"
              }`}
            >
              {tab?.icon}
              <h2>{tab?.title}</h2>
            </button>
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

      {tabs.find(tab => tab?.key === activeTab)?.content}
    </div>
  );
};
