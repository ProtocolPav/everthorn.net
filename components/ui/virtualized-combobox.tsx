import * as React from "react"
import { CaretUpDown, Check } from "@phosphor-icons/react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { capitalizeCase, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

type Option = {
  value: string
  label: string
}

interface VirtualizedCommandProps {
  options: Option[]
  placeholder: string
  selectedOption: string
  onSelectOption?: (option: string) => void
}

const VirtualizedCommand = ({
  options,
  placeholder,
  selectedOption,
  onSelectOption,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] =
    React.useState<Option[]>(options)
  const parentRef = React.useRef(null)

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 5,
  })

  const virtualOptions = virtualizer.getVirtualItems()

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options.filter((option) => {
        const searchWords: string[] = search.trim().toLowerCase().split(/\s+/)

        return searchWords.every((word) =>
          option.value.toLowerCase().includes(word)
        )
      })
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
    }
  }

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandGroup ref={parentRef} className="h-40 overflow-auto md:h-64">
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
                  "mr-2 size-4",
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
  )
}

interface VirtualizedComboboxProps {
  options: string[]
  searchPlaceholder?: string
  onOptionSelect: (selectOption: string) => void
  preselect?: string | null
  width?: string
  height?: string
}

export function VirtualizedCombobox({
  options,
  searchPlaceholder = "Search items...",
  onOptionSelect,
  preselect,
}: VirtualizedComboboxProps) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [selectedOption, setSelectedOption] = React.useState<string>(preselect ?? "")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-full justify-between"
        >
          {selectedOption
            ? options.find((option) => option === selectedOption)
            : searchPlaceholder}
          <CaretUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* Longest item name is 36 characters. Set size to 40 for good measure. On mobile, it'll stretch to fill the available width*/}
      <PopoverContent
        className="w-[calc(100vw-116px)] p-0 md:w-[40ch]"
        align="start"
      >
        <VirtualizedCommand
          options={options.map((option) => ({
            value: option,
            label: capitalizeCase(
              option.replace("minecraft:", "").replaceAll("_", " ")
            ),
          }))}
          placeholder={searchPlaceholder}
          selectedOption={selectedOption}
          onSelectOption={(currentValue) => {
            setSelectedOption(
              currentValue === selectedOption ? "" : currentValue
            )
            setOpen(false)
            onOptionSelect(currentValue)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
