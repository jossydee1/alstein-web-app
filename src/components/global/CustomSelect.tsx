"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/utils/others/cn-utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "123 Maple Street, Springfield, IL 62704, USA",
    label: "123 Maple Street, Springfield, IL 62704, USA",
  },
  {
    value: "456 Oak Avenue, Vancouver, BC V5K 1Z3, Canada",
    label: "456 Oak Avenue, Vancouver, BC V5K 1Z3, Canada",
  },
  {
    value: "789 Pine Road, Manchester M1 2AB, UK",
    label: "789 Pine Road, Manchester M1 2AB, UK",
  },
  {
    value: "321 Cedar Lane, Sydney, NSW 2000, Australia",
    label: "321 Cedar Lane, Sydney, NSW 2000, Australia",
  },
  {
    value: "654 Birch Boulevard, Cape Town 8001, South Africa",
    label: "654 Birch Boulevard, Cape Town 8001, South Africa",
  },
];

export function CustomSelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between px-2.5 py-[1.3rem]"
        >
          {value
            ? frameworks.find(framework => framework.value === value)?.label
            : "Search for address..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={6}
        align="start"
        className="!max-w-[213%] rounded-xl p-0"
      >
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9 w-full border-none outline-none ring-0 focus:outline-none focus:ring-0"
          />
          <CommandList className="font-visbymedium text-gray-500 antialiased">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="">
              {frameworks.map(framework => (
                <CommandItem
                  className="text-gray-500"
                  key={framework.value}
                  value={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
