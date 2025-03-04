import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Ratings } from "../common";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

// interface FilterOptions {
//   availabilty: boolean;
//   lease: boolean;
//   onSite: boolean;
//   categories: string[];
//   distance: number | null;
//   insuranceOptions: string[];
//   ratings: number[];
// }

const FilterMenu = () => {
  const STYLES = {
    dropdownStyles:
      "flex items-center gap-2.5 rounded-xl border border-[#8B8B8B] px-3 pt-2 text-sm text-[#454545]",
    accordionItem: "px-4",
    accordionTrigger: "text-sm",
    accordionContentGrid: "grid grid-cols-2 gap-2 rounded-sm bg-[#F6F6F6] p-2",
    accordionContent: "grid grid-cols-1 gap-2 rounded-sm bg-[#F6F6F6] p-2",
    optionWrapper: "flex items-center space-x-2",
    optionLabel:
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  };

  const distances = [5, 10, 15, 20, 50, 100];
  const ratings = [5, 4, 3, 2, 1];
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
  ];
  const insuranceOptions = [
    "Insurance 1",
    "Insurance 2",
    "Insurance 3",
    "Insurance 4",
    "Insurance 5",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [availabilty, setAvailbility] = useState(false);
  const [lease, setLease] = useState(false);
  const [onSite, setOnSite] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // toggle selection for categories and insurance
  const toggleSelection = (
    item: string,
    setFunction: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setFunction(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  // toggle rating
  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating],
    );
  };

  // handle availabilty, lease, onSite
  useEffect(() => {
    console.log("availabilty: ", availabilty);
  }, [availabilty]);

  useEffect(() => {
    console.log("lease: ", lease);
  }, [lease]);

  useEffect(() => {
    console.log("onSite: ", onSite);
  }, [onSite]);

  // handle filtering
  const handleFiltering = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({
      categories: selectedCategories,
      distance: selectedDistance,
      insuranceOptions: selectedInsurance,
      ratings: selectedRatings,
    });
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#BBBBBB] py-6">
        <div className="flex flex-wrap items-start gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={STYLES.dropdownStyles}>
                <SlidersHorizontal size={16} className="#8B8B8B mr-2" />
                All Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[100vw] max-w-[300px] overflow-hidden rounded-2xl p-0 sm:w-[429px] sm:max-w-[429px]"
            >
              <form
                className="w-full space-y-5 overflow-hidden rounded-2xl bg-white"
                onSubmit={handleFiltering}
              >
                <X
                  size={16}
                  onClick={() => setIsOpen(false)}
                  className="absolute left-4 top-3 cursor-pointer text-[#1C1B1F]"
                />
                <header
                  className="!m-0 border-b border-[#E4E4E4] px-4 py-2.5"
                  style={{
                    boxShadow: "0px 1px 4px 0px #00000014",
                  }}
                >
                  <h2 className="text-center text-sm font-medium text-[#454545]">
                    Filter
                  </h2>
                </header>

                <Accordion
                  type="single"
                  collapsible
                  className="border-b border-b-[#F6F6F6]"
                >
                  <AccordionItem
                    value="category"
                    className={STYLES.accordionItem}
                  >
                    <AccordionTrigger className={STYLES.accordionTrigger}>
                      Category
                    </AccordionTrigger>
                    <AccordionContent className={STYLES.accordionContentGrid}>
                      {categories.map(category => (
                        <div className={STYLES.optionWrapper} key={category}>
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() =>
                              toggleSelection(category, setSelectedCategories)
                            }
                          />
                          <label
                            htmlFor={category}
                            className={STYLES.optionLabel}
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="distance"
                    className={STYLES.accordionItem}
                  >
                    <AccordionTrigger className={STYLES.accordionTrigger}>
                      Distance
                    </AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup
                        className={STYLES.accordionContentGrid}
                        onValueChange={value =>
                          setSelectedDistance(Number(value))
                        }
                        value={selectedDistance?.toString() || ""}
                      >
                        {distances.map(distance => (
                          <div className={STYLES.optionWrapper} key={distance}>
                            <RadioGroupItem
                              value={distance.toString()}
                              id={distance.toString()}
                            />
                            <Label
                              htmlFor={distance.toString()}
                              className={STYLES.optionLabel}
                            >
                              {distance} miles
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="insurance"
                    className={STYLES.accordionItem}
                  >
                    <AccordionTrigger className={STYLES.accordionTrigger}>
                      Health Insurance
                    </AccordionTrigger>
                    <AccordionContent className={STYLES.accordionContent}>
                      {insuranceOptions.map(ins => (
                        <div key={ins} className={STYLES.optionWrapper}>
                          <Checkbox
                            id={ins}
                            checked={selectedInsurance.includes(ins)}
                            onCheckedChange={() =>
                              toggleSelection(ins, setSelectedInsurance)
                            }
                          />
                          <label htmlFor={ins} className={STYLES.optionLabel}>
                            {ins}
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="ratings"
                    className={STYLES.accordionItem}
                  >
                    <AccordionTrigger className={STYLES.accordionTrigger}>
                      Ratings
                    </AccordionTrigger>
                    <AccordionContent className={STYLES.accordionContent}>
                      {ratings.map(rating => (
                        <div key={rating} className={STYLES.optionWrapper}>
                          <Checkbox
                            id={rating.toString()}
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={() => toggleRating(rating)}
                          />
                          <label
                            htmlFor={rating.toString()}
                            className={STYLES.optionLabel}
                          >
                            <Ratings ratings={rating} size={16} />
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <footer
                  className="flex justify-between border-t border-t-[#E4E4E4] px-4 py-2.5"
                  style={{
                    boxShadow: "0px -1px 4px 0px #00000014",
                  }}
                >
                  <Button
                    className="px-0 py-0 text-sm text-[#454545]"
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedDistance(null);
                      setSelectedInsurance([]);
                      setSelectedRatings([]);
                      setIsOpen(false);
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="rounded-lg bg-[#454545] px-6 py-2 text-sm"
                    type="submit"
                  >
                    Apply
                  </Button>
                </footer>
              </form>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-wrap items-start gap-2">
          <div className="flex items-center gap-2 text-[#8B8B8B]">
            <Switch
              checked={availabilty}
              onCheckedChange={() => setAvailbility(!availabilty)}
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
        </div>
      </div>
    </>
  );
};

export default FilterMenu;
