import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon} from "lucide-react";

export function QuestDates({form}: {form: UseFormReturn<z.infer<typeof formSchema>>}) {
    return (
        <FormField
            control={form.control}
            name="range"
            render={({ field }) => (
                <FormItem className="my-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-between text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value?.from ? (
                                        field.value.to ? (
                                            <>
                                                {format(field.value.from, "LLL dd, y")} - {' '}
                                                {format(field.value.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(field.value.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                showOutsideDays={false}
                                mode="range"
                                defaultMonth={field.value?.from}
                                selected={field.value}
                                onSelect={field.onChange}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}