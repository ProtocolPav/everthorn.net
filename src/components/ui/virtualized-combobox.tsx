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

const VirtualizedCommand = React.memo(({
                                           options,
                                           placeholder,
                                           selectedOption,
                                           onSelectOption,
                                       }: VirtualizedCommandProps) => {
    const [filteredOptions, setFilteredOptions] = React.useState<Option[]>(options)
    const [searchValue, setSearchValue] = React.useState("")
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)

    // Update filtered options when options change
    React.useEffect(() => {
        setFilteredOptions(options)
    }, [options])

    // Debounced filtering to reduce lag
    const debouncedSearch = React.useMemo(
        () => {
            const timeoutRef = { current: null as NodeJS.Timeout | null }
            return (value: string) => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
                timeoutRef.current = setTimeout(() => {
                    if (!value.trim()) {
                        setFilteredOptions(options)
                    } else {
                        const searchWords = value.trim().toLowerCase().split(/\s+/)
                        const filtered = options.filter((option) =>
                            searchWords.every((word) =>
                                option.value.toLowerCase().includes(word) ||
                                option.label.toLowerCase().includes(word)
                            )
                        )
                        setFilteredOptions(filtered)
                    }
                }, 150)
            }
        },
        [options]
    )

    React.useEffect(() => {
        debouncedSearch(searchValue)
    }, [searchValue, debouncedSearch])

    const virtualizer = useVirtualizer({
        count: filteredOptions.length,
        getScrollElement: () => {
            const scrollArea = scrollAreaRef.current
            if (scrollArea) {
                const viewport = scrollArea.querySelector('[data-radix-scroll-area-viewport]')
                return viewport as HTMLElement
            }
            return null
        },
        estimateSize: () => 35,
        overscan: 3, // Reduced from 5 for better performance
        measureElement: (element) => element?.getBoundingClientRect().height ?? 35,
    })

    const items = virtualizer.getVirtualItems()

    const handleSearch = React.useCallback((value: string) => {
        setSearchValue(value)
    }, [])

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault()
        }
    }, [])

    return (
        <Command shouldFilter={false} onKeyDown={handleKeyDown}>
            <CommandInput
                onValueChange={handleSearch}
                placeholder={placeholder}
                value={searchValue}
            />
            <CommandEmpty>No item found.</CommandEmpty>
            <ScrollArea ref={scrollAreaRef} className="h-40 md:h-64">
                <div className="p-1 pr-2.5">
                    <div
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                            contain: "layout style paint",
                        }}
                    >
                        {items.map((virtualItem) => {
                            const option = filteredOptions[virtualItem.index]
                            if (!option) return null

                            return (
                                <VirtualizedItem
                                    key={option.value}
                                    virtualItem={virtualItem}
                                    option={option}
                                    selectedOption={selectedOption}
                                    onSelectOption={onSelectOption}
                                    measureElement={virtualizer.measureElement}
                                />
                            )
                        })}
                    </div>
                </div>
            </ScrollArea>
        </Command>
    )
})

VirtualizedCommand.displayName = "VirtualizedCommand"

// Separate memoized component for individual items
const VirtualizedItem = React.memo(({
                                        virtualItem,
                                        option,
                                        selectedOption,
                                        onSelectOption,
                                        measureElement,
                                    }: {
    virtualItem: any
    option: Option
    selectedOption: string
    onSelectOption?: (option: string) => void
    measureElement: (element: Element | null) => void
}) => {
    const handleSelect = React.useCallback(() => {
        onSelectOption?.(option.value)
    }, [onSelectOption, option.value])

    return (
        <div
            data-index={virtualItem.index}
            ref={measureElement}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `27px`,
                transform: `translateY(${virtualItem.start}px)`,
                willChange: "transform",
            }}
        >
            <CommandItem
                value={option.value}
                onSelect={handleSelect}
                className="w-full h-full flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-accent transition-colors duration-75"
            >
                <Check
                    className={cn(
                        "mr-2 h-4 w-4 transition-opacity duration-75",
                        selectedOption === option.value
                            ? "opacity-100"
                            : "opacity-0"
                    )}
                />
                <span className="truncate">{option.label}</span>
            </CommandItem>
        </div>
    )
})

VirtualizedItem.displayName = "VirtualizedItem"

interface VirtualizedComboboxProps {
    options: string[]
    searchPlaceholder?: string
    onOptionSelect: (selectOption: string) => void
    preselect?: string | null
    className?: string
    disabled?: boolean
}

export function VirtualizedCombobox({
                                        options,
                                        searchPlaceholder = "minecraft:creeper...",
                                        onOptionSelect,
                                        preselect,
                                        className,
                                        disabled
                                    }: VirtualizedComboboxProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [selectedOption, setSelectedOption] = React.useState<string>(preselect ?? "")

    // Update selected option when preselect changes
    React.useEffect(() => {
        setSelectedOption(preselect ?? "")
    }, [preselect])

    const formattedOptions = React.useMemo(() =>
        options.map((option) => ({
            value: option,
            label: capitalizeCase(
                option.replace("minecraft:", "").replaceAll("_", " ")
            ),
        })), [options]
    )

    const handleOptionSelect = React.useCallback((currentValue: string) => {
        const newValue = currentValue === selectedOption ? "" : currentValue
        setSelectedOption(newValue)
        setOpen(false)
        onOptionSelect(newValue)
    }, [selectedOption, onOptionSelect])

    const displayValue = React.useMemo(() =>
            selectedOption
                ? formattedOptions.find((option) => option.value === selectedOption)?.label || selectedOption
                : searchPlaceholder,
        [selectedOption, formattedOptions, searchPlaceholder]
    )

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("max-w-full justify-between", className)}
                >
                    <span className="truncate">{displayValue}</span>
                    <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] min-w-[200px] max-w-[400px] p-0"
                align="start"
                sideOffset={4}
            >
                <VirtualizedCommand
                    options={formattedOptions}
                    placeholder={searchPlaceholder}
                    selectedOption={selectedOption}
                    onSelectOption={handleOptionSelect}
                />
            </PopoverContent>
        </Popover>
    )
}
