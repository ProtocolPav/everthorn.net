import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../../../app/(admin)/admin/quests/editor/_types/schema";
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

export function QuestDates({form, disable}: {form: UseFormReturn<z.infer<typeof formSchema>>, disable?: boolean}) {
    return (
        <FormField
            control={form.control}
            name="range"
            render={({ field }) => (
                <FormItem className="my-4 md:w-1/2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    disabled={disable}
                                    className={cn(
                                        "w-full justify-between text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value?.from ? (
                                        field.value.to ? (
                                            <>
                                                {format(field.value.from, "LLL dd, y haaa")} - {' '}
                                                {format(field.value.to, "LLL dd, y haaa")}
                                            </>
                                        ) : (
                                            format(field.value.from, "LLL dd, y haaa")
                                        )
                                    ) : (
                                        <span>When does the quest start and end?</span>
                                    )}
                                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                weekStartsOn={1}
                                defaultMonth={field.value?.from}
                                selected={field.value}
                                onSelect={(e) => {
                                    if (e?.from && e?.to) {
                                        e.from.setHours(16 - e.from.getTimezoneOffset()/60)
                                        e.to.setHours(16 - e.to.getTimezoneOffset()/60)
                                    }
                                    field.onChange(e)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}