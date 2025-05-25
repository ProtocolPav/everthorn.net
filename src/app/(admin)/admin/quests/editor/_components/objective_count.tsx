import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Input} from "@/components/ui/input";

interface ObjectiveProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    index: number
    disable?: boolean
}

export function ObjectiveCount({ form, index, disable }: ObjectiveProps) {
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
                                <Input disabled={disable} type="number" placeholder="12" {...field} value={field.value === 0 ? '' : field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        />
    )
}