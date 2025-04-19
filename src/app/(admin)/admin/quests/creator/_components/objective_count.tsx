import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Input} from "@/components/ui/input";

interface ObjectiveProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    index: number
}

export function ObjectiveCount({ form, index }: ObjectiveProps) {
    return (
        <FormField
            control={form.control}
            name={`objectives.${index}.objective_type`}
            render={({ field }) => (
                <FormField
                    control={form.control}
                    name={`objectives.${index}.objective_count`}
                    render={({ field }) => (
                        <FormItem className={'md:w-20'}>
                            <FormControl>
                                <Input type="number" placeholder="43" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        />
    )
}