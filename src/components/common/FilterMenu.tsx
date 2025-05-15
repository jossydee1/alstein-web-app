"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Ratings } from "@/components/common";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { CategoryProps } from "@/types";
import { NIGERIAN_STATES_CITIES } from "@/utils";
// import { Switch } from "@/components/ui/switch";

export const FilterMenu = ({
  equipment,
  region,
  categories,
  selectedCategory,
  setSelectedCategory,
  ratings,
  selectedRatings,
  setSelectedRatings,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  handleFiltering,
  resetFilter,
  isFiltering,
  // distances,
  // selectedDistance,
  // setSelectedDistance,
  // availability,
  // setAvailability,
  // lease,
  // setLease,
  // onSite,
  // setOnSite,
}: {
  equipment: string;
  region: string;
  categories: CategoryProps[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  ratings: number[];
  selectedRatings: number[];
  setSelectedRatings: React.Dispatch<React.SetStateAction<number[]>>;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  handleFiltering: () => void;
  resetFilter: () => void;
  isFiltering: boolean;
  // distances: number[];
  // selectedDistance: number | null;
  // setSelectedDistance: (distance: number | null) => void;
  // availability: boolean;
  // setAvailability: (availability: boolean) => void;
  // lease: boolean;
  // setLease: (lease: boolean) => void;
  // onSite: boolean;
  // setOnSite: (onSite: boolean) => void;
}) => {
  const STYLES = {
    dropdownStyles:
      "flex items-center gap-2.5 rounded-xl border border-[#8B8B8B] px-3 pt-2 text-sm text-[#454545]",
    accordionItem: "px-4",
    accordionTrigger: "text-sm hover:!no-underline",
    accordionContentGrid: "grid grid-cols-2 gap-2 rounded-sm bg-[#F6F6F6] p-2",
    accordionContent: "grid grid-cols-1 gap-2 rounded-sm bg-[#F6F6F6] p-2",
    optionWrapper: "flex items-center space-x-2",
    optionLabel:
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap",
  };

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const parentRect =
        buttonRef.current.offsetParent instanceof HTMLElement
          ? buttonRef.current.offsetParent.getBoundingClientRect()
          : { left: 0, top: 0 };
      const rect = buttonRef.current.getBoundingClientRect();
      setModalStyle({
        position: "absolute",
        top: rect.bottom - parentRect.top + 8,
        left: rect.left - parentRect.left,
        zIndex: 50,
        width: 360,
        maxWidth: "90vw",
        boxShadow: "0px 4px 24px 0px #00000014",
        borderRadius: 16,
        background: "#fff",
      });
    }
  }, [isOpen]);

  const handleFilterSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleFiltering();
    setIsOpen(false);
  };

  const handleResetFilter = () => {
    resetFilter();
  };

  const hasActiveFilters = !!(
    equipment ||
    region ||
    selectedCategory ||
    selectedRatings.length > 0 ||
    selectedCountry ||
    selectedState
  );

  return (
    <>
      <div
        className="flex flex-wrap items-end justify-between gap-4 border-b border-[#BBBBBB] py-6"
        style={{ position: "relative" }}
      >
        <div className="flex flex-wrap items-start gap-2">
          <Button
            ref={buttonRef}
            variant="outline"
            type="button"
            className={STYLES.dropdownStyles}
            onClick={() => setIsOpen(v => !v)}
          >
            <SlidersHorizontal size={16} className="#8B8B8B mr-2" />
            All Filters
          </Button>
          {isOpen && (
            <div style={modalStyle}>
              <form
                className="w-full space-y-5 overflow-hidden rounded-2xl bg-white"
                style={{
                  maxHeight: 500,
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={handleFilterSubmit}
              >
                <X
                  size={16}
                  onClick={() => setIsOpen(false)}
                  className="absolute left-4 top-3 cursor-pointer text-[#1C1B1F]"
                />
                <div
                  className="!m-0 border-b border-[#E4E4E4] px-4 py-2.5"
                  style={{
                    boxShadow: "0px 1px 4px 0px #00000014",
                  }}
                >
                  <p className="text-center text-sm font-medium text-[#454545]">
                    Filter
                  </p>
                </div>
                <div style={{ overflowY: "auto", flex: 1 }}>
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value="category"
                      className={STYLES.accordionItem}
                    >
                      <AccordionTrigger className={STYLES.accordionTrigger}>
                        Category
                      </AccordionTrigger>
                      <AccordionContent>
                        <RadioGroup
                          className={STYLES.accordionContentGrid}
                          onValueChange={value => setSelectedCategory(value)}
                          value={selectedCategory || ""}
                        >
                          {categories?.map(c => (
                            <div
                              className={STYLES.optionWrapper}
                              key={c?.title_slug}
                            >
                              <RadioGroupItem
                                value={c?.title_slug}
                                id={c?.title_slug}
                              />
                              <Label
                                htmlFor={c?.title_slug}
                                className={STYLES.optionLabel}
                              >
                                {c?.title}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="country"
                      className={STYLES.accordionItem}
                    >
                      <AccordionTrigger className={STYLES.accordionTrigger}>
                        Country
                      </AccordionTrigger>
                      <AccordionContent>
                        <RadioGroup
                          className={STYLES.accordionContentGrid}
                          onValueChange={value => setSelectedCountry(value)}
                          value={selectedCountry || ""}
                        >
                          {["Nigeria"].map(country => (
                            <div key={country} className={STYLES.optionWrapper}>
                              <RadioGroupItem
                                value={country}
                                id={`country-${country}`}
                              />
                              <Label
                                htmlFor={`country-${country}`}
                                className={STYLES.optionLabel}
                              >
                                {country}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="state"
                      className={STYLES.accordionItem}
                    >
                      <AccordionTrigger className={STYLES.accordionTrigger}>
                        State
                      </AccordionTrigger>
                      <AccordionContent>
                        <RadioGroup
                          className={STYLES.accordionContentGrid}
                          onValueChange={value => setSelectedState(value)}
                          value={selectedState || ""}
                        >
                          {Object.keys(NIGERIAN_STATES_CITIES).map(state => (
                            <div key={state} className={STYLES.optionWrapper}>
                              <RadioGroupItem
                                value={state}
                                id={`state-${state}`}
                              />
                              <Label
                                htmlFor={`state-${state}`}
                                className={STYLES.optionLabel}
                              >
                                {state}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="ratings"
                      className={`${STYLES.accordionItem} !border-none`}
                    >
                      <AccordionTrigger className={STYLES.accordionTrigger}>
                        Ratings
                      </AccordionTrigger>
                      <AccordionContent>
                        <RadioGroup
                          className={STYLES.accordionContentGrid}
                          onValueChange={value =>
                            setSelectedRatings([Number(value)])
                          }
                          value={selectedRatings[0]?.toString() || ""}
                        >
                          {ratings.map(rating => (
                            <div key={rating} className={STYLES.optionWrapper}>
                              <RadioGroupItem
                                value={rating?.toString()}
                                id={`rating-${rating}`}
                              />
                              <Label
                                htmlFor={`rating-${rating}`}
                                className={STYLES.optionLabel}
                              >
                                <Ratings ratings={rating} size={16} />
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <footer
                  className="flex justify-between border-t border-t-[#E4E4E4] px-4 py-2.5"
                  style={{
                    boxShadow: "0px -1px 4px 0px #00000014",
                  }}
                >
                  <Button
                    className="px-0 py-0 text-sm text-[#454545] hover:bg-transparent hover:underline"
                    variant="ghost"
                    type="button"
                    onClick={handleResetFilter}
                    disabled={!hasActiveFilters}
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-md px-6 py-2 text-sm"
                    type="submit"
                    disabled={isFiltering}
                  >
                    Apply
                  </Button>
                </footer>
              </form>
            </div>
          )}
        </div>

        {/* <div className="flex flex-wrap items-start gap-2">
          <div className="flex items-center gap-2 text-[#8B8B8B]">
            <Switch
              checked={availability}
              onCheckedChange={() => setAvailability(!availability)}
            />
            Available Now
          </div>
          <div className="flex items-center gap-2 text-[#8B8B8B]">
            <Switch checked={lease} onCheckedChange={() => setLease(!lease)} />
            Available For Lease
          </div>
          <div className="flex items-center gap-2 text-[#8B8B8B]">
            <Switch
              checked={onSite}
              onCheckedChange={() => setOnSite(!onSite)}
            />
            Available On-Site Only
          </div>
        </div> */}
      </div>
    </>
  );
};
