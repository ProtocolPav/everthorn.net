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
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox";
import {items} from "@/lib/minecraft/minecraft-data";

interface RequirementProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
}

const inputProps = {
    type: "number",
    className: 'h-fit w-14 p-1 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
}

export function RequirementMainhand({form, objective_index, objective}: RequirementProps) {
    return (
        <div className={cn(
            {hidden: objective.objective_type === "encounter" || objective.objective_type === ''},
            "rounded-md border bg-secondary/40 p-3 shadow-sm"
        )}>
            <FormField
                control={form.control}
                name={`objectives.${objective_index}.require_mainhand`}
                render={({ field }) => (
                    <FormItem>
                        <div className={'flex justify-between'}>
                            <FormLabel className={'flex items-center gap-1'}>
                                <HandGrabbing size={20} weight={'fill'}/>
                                Require Mainhand
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    className="!m-0"
                                    checked={objective.require_mainhand}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </div>
                    </FormItem>
                )}
            />

            <div className={cn(!objective.require_mainhand ? "!hidden" : "", "mt-1.5 flex flex-wrap items-center gap-1 text-sm")}>
                <FormField
                    control={form.control}
                    name={`objectives.${objective_index}.mainhand`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={'flex items-center gap-1'}>
                                    <VirtualizedCombobox
                                        className={'h-8'}
                                        options={items}
                                        searchPlaceholder="Item"
                                        onOptionSelect={(value: string) => {
                                            form.setValue(
                                                `objectives.${objective_index}.mainhand`,
                                                value
                                            )
                                        }}
                                        preselect={form.getValues(`objectives.${objective_index}.mainhand`)}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}