import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, capitalizeCase } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check, CaretUpDown } from "@phosphor-icons/react";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Option = {
  value: string;
  label: string;
};

interface VirtualizedCommandProps {
  options: Option[];
  placeholder: string;
  selectedOption: string;
  onSelectOption?: (option: string) => void;
}

const VirtualizedCommand = ({
  options,
  placeholder,
  selectedOption,
  onSelectOption,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] =
    React.useState<Option[]>(options);
  const parentRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 5,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(search.toLowerCase() ?? [])
      )
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandGroup
        ref={parentRef}
        className='h-40 md:h-64 overflow-auto'
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualOptions.map((virtualOption) => (
            <CommandItem
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualOption.size}px`,
                transform: `translateY(${virtualOption.start}px)`,
              }}
              key={filteredOptions[virtualOption.index].value}
              value={filteredOptions[virtualOption.index].value}
              onSelect={onSelectOption}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedOption === filteredOptions[virtualOption.index].value
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
              {filteredOptions[virtualOption.index].label}
            </CommandItem>
          ))}
        </div>
      </CommandGroup>
    </Command>
  );
};

interface VirtualizedComboboxProps {
  options: string[];
  searchPlaceholder?: string;
  width?: string;
  height?: string;
}

export function VirtualizedCombobox({
  options,
  searchPlaceholder = "Search items...",
}: VirtualizedComboboxProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between max-w-full"
        >
          {selectedOption
            ? options.find((option) => option === selectedOption)
            : searchPlaceholder}
          <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 max-w-[350px]" align='start'>
        <VirtualizedCommand
          options={options.map((option) => ({ value: option, label: capitalizeCase(option.replace('minecraft:', '').replaceAll('_', ' ')) }))}
          placeholder={searchPlaceholder}
          selectedOption={selectedOption}
          onSelectOption={(currentValue) => {
            setSelectedOption(
              currentValue === selectedOption ? "" : currentValue
            );
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}