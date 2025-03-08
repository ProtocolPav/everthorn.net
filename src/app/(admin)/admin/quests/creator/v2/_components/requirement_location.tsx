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

const inputProps = {
    type: "number",
    className: 'h-fit w-14 p-1 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
}

export function RequirementLocation({form, objective_index, objective}: RequirementProps) {
    return (
        <div className={cn({hidden: objective.objective_type === "encounter"}, "rounded-md border bg-secondary/40 p-3 shadow-sm")}>
            <FormField
                control={form.control}
                name={`objectives.${objective_index}.require_location`}
                render={({ field }) => (
                    <FormItem>
                        <div className={'flex justify-between'}>
                            <FormLabel className={'flex items-center gap-1'}>
                                <MapPinSimpleArea size={20} weight={'fill'}/>
                                Require Location
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    className="!m-0"
                                    checked={objective.require_location}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </div>
                    </FormItem>
                )}
            />

            <div className={cn(!objective.require_location ? "!hidden" : "", "mt-1.5 flex flex-wrap items-center gap-1 text-sm")}>
                <FormField
                    control={form.control}
                    name={`objectives.${objective_index}.location`}
                    render={({ field }) => (
                        <>
                            <FormField
                                control={form.control}
                                name={`objectives.${objective_index}.location.0`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className={'flex items-center gap-1'}>
                                                Around <Input placeholder={'x'} {...inputProps} {...field} />,
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`objectives.${objective_index}.location.1`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className={'flex items-center'}>
                                                <Input placeholder={'y'} {...inputProps} {...field} />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`objectives.${objective_index}.location_radius`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className={'flex items-center gap-1'}>
                                                ( radius <Input placeholder={'0'} {...inputProps} {...field} />)
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormMessage/>
                        </>
                    )}
                />
            </div>
        </div>
    )
}