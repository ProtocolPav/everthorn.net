import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {
    Timer,
    MapPinSimpleArea,
    HandGrabbing,
    Cube
} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";

interface RequirementProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
}

export function RequirementTimer({form, objective_index, objective}: RequirementProps) {
    return (
        <div className={"rounded-md border p-3 shadow-sm bg-secondary/60"}>
            <FormField
                control={form.control}
                name={`objectives.${objective_index}.require_timer`}
                render={({ field }) => (
                    <FormItem className={'flex justify-between'}>
                        <FormLabel className={'flex items-center gap-1'}>
                            <Timer size={20} weight={'fill'}/>
                            Require Timer
                        </FormLabel>
                        <FormControl>
                            <Switch
                                className="!m-0"
                                checked={objective.require_timer}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <div className={cn(!objective.require_timer ? "!hidden" : "", "mt-1 flex w-full justify-stretch gap-4")}>
                <FormField
                    control={form.control}
                    name={`objectives.${objective_index}.objective_timer`}
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Hours</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Hours" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}